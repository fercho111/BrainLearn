from django.urls import path
from . import api

urlpatterns = [
    path('usuarios/', api.UserAPIView.as_view(), name = 'usuario_api')
]