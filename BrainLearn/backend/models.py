from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

# Creamos una clase por cada tabla que va a tener la base de datos
# tambien se conoce como modelos
class Card(models.Model):
    question = models.CharField(max_length=200)
    answer = models.CharField(max_length=200)
    question_image_url = models.URLField(blank=True, null=True)
    answer_image_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(auto_now=True) 
    modified_at = models.DateTimeField(auto_now=True)    
    rating = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)])
    #deck = models.ForeignKey('Deck', related_name='cards', on_delete=models.CASCADE, blank=True, null=True)
    def __str__(self):
        return f"{self.question}"