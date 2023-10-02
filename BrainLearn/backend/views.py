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
        queryset = Card.objects.all().order_by('?')

        if rating is not None:
            queryset = queryset.filter(Q(rating__lte=rating) | Q(rating__isnull=True))

        return queryset

    def perform_create(self, serializer):
        serializer.save()


class CardUpdateView(views.APIView):
    def put(self, request, pk):
        try:
            card = Card.objects.get(pk=pk)
        except Card.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        feedback = request.data.get('feedback')
        if feedback == 'bad':
            card.rating = 0
        elif feedback == 'normal':
            pass  
        elif feedback == 'great':
            card.rating += 1
        else:
            return Response({"error": "Invalid feedback"}, status=status.HTTP_400_BAD_REQUEST)

        card.save()
        return Response({"message": "Box updated successfully"}, status=status.HTTP_200_OK)