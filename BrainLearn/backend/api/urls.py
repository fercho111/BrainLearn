from django.urls import path
from . import api

urlpatterns = [
    path('usuarios/', api.user_api_view, name = 'usuario_api')
]