# serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Deck, Card


class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = ['name']

class CardSerializer(serializers.ModelSerializer):
    deck = DeckSerializer()

    class Meta:
        model = Card
        fields = ['id', 'question', 'answer', 'question_image_url', 'answer_image_url',
                  'created_at', 'reviewed_at', 'modified_at', 'rating', 'deck']

# no tocar hasta saber como funciona esta vuelta
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        user = get_user_model().objects.filter(username=username).first()

        if user and user.check_password(password):
            data['user'] = user
        else:
            raise serializers.ValidationError("Invalid credentials")

        return data