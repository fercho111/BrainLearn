from rest_framework.renderers import JSONRenderer
from rest_framework import serializers
from .models import User, Deck, Card

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'question', 'answer', 'question_image_url', 'answer_image_url', 'created_at', 'modified_at', 'deck']

class DeckSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True, read_only=True)
    class Meta:
        model = Deck
        fields = ['id', 'name', 'cards', 'created_at', 'modified_at']
