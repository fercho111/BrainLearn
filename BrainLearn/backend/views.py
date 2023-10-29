# Create your views here.
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Deck, Card
from .serializers import UserSerializer, LoginSerializer, DeckSerializer, DeckSerializerReturn, CardSerializer
from django.utils import timezone



# pendientes los delete
@api_view(['GET', 'POST'])
def mazos(request):
    if request.method == "GET":
        if request.user is None:
            return Response({"message": "No se han proporcionado credenciales"}, status=status.HTTP_401_UNAUTHORIZED)
        user_decks = Deck.objects.filter(user=request.user)
        serializer = DeckSerializerReturn(user_decks, many=True)
        return Response(serializer.data)
    if request.method == "POST":
        if request.user is None:
            return Response({"message": "No se han proporcionado credenciales"}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = DeckSerializer(data=request.data)
        if serializer.is_valid():
            deck_name = serializer.validated_data.get("name")
            user_decks = Deck.objects.filter(user=request.user, name=deck_name)
            if user_decks.exists():
                return Response({"error": "El mazo ya existe para este usuario"}, status=status.HTTP_400_BAD_REQUEST)

            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
 
@api_view(['PUT', 'DELETE'])
def actualizar_eliminar_mazo(request, mazo_id):
    try:
        mazo = Deck.objects.get(pk=mazo_id, user=request.user)
    except Deck.DoesNotExist:
        return Response({"error": "El mazo no existe para este usuario"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "PUT":
        new_name = request.data.get("name")
        if new_name:
            mazo.name = new_name
            mazo.save()
            return Response({"message": "Nombre del mazo actualizado correctamente"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "El nuevo nombre del mazo no ha sido proporcionado"}, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "DELETE":
        mazo.delete()
        return Response({"message": "Mazo eliminado correctamente"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def cartas(request):
    if request.method == "GET":
        if request.user is None:
            return Response({"message": "No se han proporcionado credenciales"}, status=status.HTTP_401_UNAUTHORIZED)
        deck_name = request.query_params.get('deck_name')
        if not deck_name:
            return Response({"error": "El nombre del mazo no ha sido proporcionado"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            mazo = Deck.objects.get(user=request.user, name=deck_name)
        except Deck.DoesNotExist:
            return Response({"error": "El mazo no existe para este usuario"}, status=status.HTTP_404_NOT_FOUND)

        user_cards = Card.objects.filter(deck=mazo).order_by('rating')

        cards_to_show = user_cards[:5]

        for card in user_cards[5:]:
            card.rating = max(0, card.rating - 1)
            card.save()

        serializer = CardSerializer(cards_to_show, many=True)
        return Response(serializer.data)
    if request.method == "POST":
        if request.user is None:
            return Response({"message": "No se han proporcionado credenciales"}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            mazos = Deck.objects.filter(user=request.user)
            try:
                mazo = mazos.get(name=serializer.validated_data["deck"]["name"])
            except Deck.DoesNotExist:
                return Response({"error": "El mazo no existe"}, status=status.HTTP_404_NOT_FOUND)
            print(mazo)
            serializer.save(deck=mazo)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def actualizar_eliminar_carta(request, card_id):
    if request.user is None:
        return Response({"message": "No se han proporcionado credenciales"}, status=status.HTTP_401_UNAUTHORIZED)
        
    try:
        card = Card.objects.get(pk=card_id)
    except Card.DoesNotExist:
        return Response({"error": "La carta no existe"}, status=status.HTTP_404_NOT_FOUND)

    if request.user != card.deck.user:
        return Response({"error": "No tienes permiso para modificar esta carta"}, status=status.HTTP_403_FORBIDDEN)    
    if request.method == "PUT":

        if 'rating' in request.data:
            try:
                new_rating = None
                rating_str = request.data.get("rating")  # Cambio aquí a request.data
                if rating_str is not None:
                    new_rating = int(rating_str)
            except ValueError:
                return Response({"error": "La calificación debe ser un número"}, status=status.HTTP_400_BAD_REQUEST)
                # Check that the new_rating is within the valid range (0 to 10)
            if new_rating is None or (new_rating < 0 or new_rating > 10):
                return Response({"error": "La calificación debe estar en el rango de 0 a 10"}, status=status.HTTP_400_BAD_REQUEST)
            
            card.rating = new_rating 
        if 'question' in request.data:
            card.question = request.data['question']
        if 'answer' in request.data:
            card.answer = request.data['answer']

        card.modified_at = timezone.now()
        card.save()    
        return Response({"message": "Carta actualizada correctamente"}, status=status.HTTP_200_OK)
    if request.method == "DELETE":
        card.delete()
        return Response({"message": "Carta eliminada correctamente"}, status=status.HTTP_204_NO_CONTENT)


 

# esto tambien hay que entender como funciona
class UserRegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

class UserLoginView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Instead of 'user', use 'validated_data'
        refresh = RefreshToken.for_user(serializer.validated_data['user'])
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)

class UserLogoutView(generics.GenericAPIView):
    # permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": "Invalid token."}, status=status.HTTP_401_UNAUTHORIZED)
