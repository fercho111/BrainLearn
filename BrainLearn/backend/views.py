from django.contrib.auth import authenticate, login
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import views, status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from .serializers import CardSerializer, CardRatingUpdateSerializer
from .models import Card

# revisar vistas genericas de rest_framework para las vistas
# ej genericAPIView, CreateAPIView
class CardListView(generics.ListCreateAPIView):
    serializer_class = CardSerializer

    def get_queryset(self):
        rating = self.request.query_params.get('rating', None)
        queryset = Card.objects.all()

        if rating is not None:
            queryset = queryset.filter(Q(rating__lt=rating) | Q(rating__isnull=True))

        return queryset

    def perform_create(self, serializer):
        serializer.save()

class CardUpdateView(generics.UpdateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardRatingUpdateSerializer