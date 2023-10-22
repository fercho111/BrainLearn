# Create your views here.
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Deck, Card
from .serializers import UserSerializer, LoginSerializer, DeckSerializer, CardSerializer



# pendientes los delete
@api_view(['GET', 'POST'])
def mazos(request):
    if request.method == "GET":
        if request.user is None:
            return Response({"message": "No se han proporcionado credenciales"}, status=status.HTTP_401_UNAUTHORIZED)

        user_decks = Deck.objects.filter(user=request.user)
        serializer = DeckSerializer(user_decks, many=True)
        print(serializer.data)
        return Response(serializer.data)
    if request.method == "POST":
        if request.user is None:
            return Response({"message": "No se han proporcionado credenciales"}, status=status.HTTP_401_UNAUTHORIZED)
        print(request.data)
        serializer = DeckSerializer(data=request.data)
        if serializer.is_valid():
            deck_name = serializer.validated_data.get("title")
            user_decks = Deck.objects.filter(user=request.user, title=deck_name)
            if user_decks.exists():
                return Response({"error": "El mazo ya existe para este usuario"}, status=status.HTTP_400_BAD_REQUEST)

            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'POST', 'PUT'])
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

        user_cards = Card.objects.filter(deck=mazo)
        serializer = CardSerializer(user_cards, many=True)
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


@api_view(['PUT'])
def actualizar_carta(request, card_id):
    if request.method == "PUT":
        # Check if the user is authenticated
        if request.user is None:
            return Response({"message": "No se han proporcionado credenciales"}, status=status.HTTP_401_UNAUTHORIZED)

        # Get the card with the specified ID
        try:
            card = Card.objects.get(id=card_id)
        except Card.DoesNotExist:
            return Response({"error": "La tarjeta no existe"}, status=status.HTTP_404_NOT_FOUND)

        # Check if the card's deck belongs to the authenticated user
        if card.deck.user != request.user:
            return Response({"error": "No tiene permiso para actualizar esta tarjeta"}, status=status.HTTP_403_FORBIDDEN)

        # Extract the new rating from the request data
        new_rating = request.data.get("rating")

        # Check that the new_rating is within the valid range (0 to 10)
        if new_rating is not None and (new_rating < 0 or new_rating > 10):
            return Response({"error": "La calificación debe estar en el rango de 0 a 10"}, status=status.HTTP_400_BAD_REQUEST)

        card.rating = new_rating
        card.save()

        return Response({"message": "La tarjeta se ha actualizado correctamente"}, status=status.HTTP_200_OK)


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
