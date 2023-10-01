from .models import Card
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        # fields = ['id', 'question', 'answer', 'question_image_url', 'answer_image_url', 'created_at', 'modified_at', 'deck']
        fields = ['id', 'question', 'answer', 'question_image_url', 'answer_image_url', 'created_at', 'rating', 'modified_at']

class CardRatingUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['rating']