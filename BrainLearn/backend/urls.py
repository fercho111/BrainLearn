# urls.py
from django.urls import path
from .views import UserRegisterView, UserLoginView, UserLogoutView, cartas, mazos, actualizar_carta, update_card

urlpatterns = [
    path('deckList/', mazos, name='mazos'),
    path('mazos/', mazos, name='mazos_alt'),
    path('cartas/rating/<int:card_id>/', actualizar_carta, name='cartas'),
    path('cartas/actualizar/<int:card_id>/', update_card, name='cartas'),    
    path('cartas/', cartas, name='cartas'),
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
]
