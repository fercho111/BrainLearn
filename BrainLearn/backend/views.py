# Create your views here.
from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Deck, Card
from .serializers import UserSerializer, LoginSerializer, DeckSerializer, CardSerializer

@api_view(['GET', 'POST'])
def testview(request):
    print(request.user)
    return Response({"a": "2"})

@api_view(['GET', 'POST'])
def cartas(request):
    if request.method == "POST":
        if request.user is None:
            return Response({"message": "No se han proporcionado credenciales"}, status=status.HTTP_401_UNAUTHORIZED)
        mazos = Deck.objects.filter(user=request.user)
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.validated_data["deck"])
            # Ensure the user of the deck is the same as the user making the request
            if serializer.validated_data['deck'].user != request.user:
                return Response({"message": "Usuario no autorizado para agregar una carta a este mazo"}, status=status.HTTP_403_FORBIDDEN)

            serializer.save()
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
