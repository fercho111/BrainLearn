# urls.py
from django.urls import path
from .views import UserRegisterView, UserLoginView, UserLogoutView, cartas, mazos, actualizar_eliminar_mazo, actualizar_eliminar_carta

urlpatterns = [
    path('deckList/', mazos, name='mazos'),
    path('mazos/', mazos, name='mazos_alt'),
    path('mazos/<int:mazo_id>/', actualizar_eliminar_mazo, name='mazos'),
    path('cartas/<int:card_id>/', actualizar_eliminar_carta, name='cartas'),    
    path('cartas/', cartas, name='cartas'),
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
]
