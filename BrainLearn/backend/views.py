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