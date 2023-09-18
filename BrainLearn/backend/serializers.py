from .models import User, Deck, Card
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer

class UserTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

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
        # fields = ['id', 'question', 'answer', 'question_image_url', 'answer_image_url', 'created_at', 'modified_at', 'deck']
        fields = ['id', 'question', 'answer', 'question_image_url', 'answer_image_url', 'created_at', 'rating', 'modified_at']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

class DeckSerializer(serializers.ModelSerializer):
    #cards = CardSerializer(many=True, read_only=True)
    class Meta:
        model = Deck
        fields = ['id', 'name', 'created_at', 'modified_at']        


# Jayk:
class TestUserSerializer(serializers.Serializer):
    username  = serializers.CharField(max_length = 200)
    email = serializers.EmailField()

    def validate_name(self,value):                        
        print(value)
        return value
    
    def validate_email(self,value):
        if value == '':
            raise serializers.ValidationError('Campo vacío')
        print(value)
        return value
    
    def validate(self, data):
        print("Validate general")        
        return data
    
    def create(self, validated_data):
        return User.objects.create(**validated_data)