from .models import User, Deck, Card
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer

#(NombreDeModelo)Serializer
#Recibe ModelSerializer porque vamos a hacer un serializador basado en un modelo
class UserSerializer(serializers.ModelSerializer):    
    class Meta:
        #El modelo que vamos a serializar en User
        model = User
        #Solo serializamos los campos que queremos retornar al cliente (frontend)
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