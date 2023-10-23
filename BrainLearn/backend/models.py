from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class User(AbstractUser):
    pass


# question: pregunta
# answer: respuesta
# deck: {
#     name: nombre de deck
# }

class Card(models.Model):
    question = models.CharField(max_length=200)
    answer = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(auto_now=True) 
    modified_at = models.DateTimeField(auto_now=True)    
    rating = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)])
    deck = models.ForeignKey('Deck', related_name='cards', on_delete=models.CASCADE, blank=True, null=True)
    def __str__(self):
        return f"{self.question} {self.rating}"


class Deck(models.Model):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='decks', on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)