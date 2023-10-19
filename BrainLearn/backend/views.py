# Create your views here.
from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Deck, Card
from .serializers import UserSerializer, LoginSerializer, DeckSerializer, CardSerializer

@api_view(['GET', 'POST'])
def mazos(request):
    if request.method == "GET":
        if request.user is None:
            return Response({"message": "No se han proporcionado credenciales"}, status=status.HTTP_401_UNAUTHORIZED)

        user_decks = Deck.objects.filter(user=request.user)
        serializer = DeckSerializer(user_decks, many=True)
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
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": "Invalid token."}, status=status.HTTP_401_UNAUTHORIZED)
