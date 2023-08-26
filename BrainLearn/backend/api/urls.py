from django.urls import path
from . import api

urlpatterns = [
    path('usuario/', api.user_api_view, name = 'usuario_api'),
    path('usuario/<int:pk>', api.user_datil_api_view, name = 'usuario_datail_api_view'),
]