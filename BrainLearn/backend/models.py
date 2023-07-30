from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.conf import settings

class User(AbstractUser):
    pass

class Card(models.Model):
    question = models.CharField(max_length=200)
    answer = models.CharField(max_length=200)
    question_image_url = models.URLField(blank=True, null=True)
    answer_image_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(auto_now=True)
    rating = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    deck = models.ForeignKey('Deck', related_name='cards', on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.question}"

class Deck(models.Model):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='decks', on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(auto_now=True)