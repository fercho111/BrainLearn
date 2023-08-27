from django.contrib.auth import authenticate, login
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import views, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, CardSerializer, DeckSerializer
from .models import User, Card, Deck

# revisar vistas genericas de rest_framework para las vistas
# ej genericAPIView, CreateAPIView

@api_view(['POST'])
class user_login(views.APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username,password=password)
        if user:
            login(request, user)
            return Response(UserSerializer(user).data, status = status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class user_list(views.APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)


class user_detail(views.APIView):
    def get(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        if request.user != user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    # def post(self, request, pk):
    #     user = get_object_or_404(User, pk=pk)
    #     serializer = UserSerializer(data=request.data)
    #     if serializer.is_valid():
    #         if not user.check_password(request.data['password']):
    #             return Response(status=status.HTTP_401_UNAUTHORIZED)
    #         login(request, user)
    #         return Response(serializer.data)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class deck_list(views.APIView):
    def get(self, request):
        decks = Deck.objects.filter(user=request.user)
        serializer = DeckSerializer(decks, many=True)
        return Response(serializer.data)

class deck_detail(views.APIView):
    def get(self, request, pk):
        deck = get_object_or_404(Deck, pk=pk)
        if request.user != deck.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = DeckSerializer(deck)
        return Response(serializer.data)

class card_list(views.APIView):
    def get(self, request):
        cards = Card.objects.filter(deck__user=request.user)
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data)

class card_detail(views.APIView):
    def get(self, request, pk):
        card = get_object_or_404(Card, pk=pk)
        serializer = CardSerializer(card)
        return Response(serializer.data)