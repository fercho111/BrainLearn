# urls.py
from django.urls import path
from .views import UserRegisterView, UserLoginView, UserLogoutView, cartas, mazos, actualizar_eliminar_mazo, actualizar_eliminar_carta, memocartas

urlpatterns = [
    path('deckList/', mazos, name='mazos'),

    # Mazos
    path('mazos/', mazos, name='mazos_alt'),
    path('mazos/<int:mazo_id>/', actualizar_eliminar_mazo, name='mazos'),

    # Cartas
    path('cartas/', cartas, name='cartas'),
    path('memocartas/', memocartas, name='cartas'),
    path('cartas/<int:card_id>/', actualizar_eliminar_carta, name='cartas'),    
    path('listaCartas/', cartas, name='crear_cartas'),
    path('listaCartas/<int:card_id>/', actualizar_eliminar_carta, name='crear_cartas'),

    # Usuarios
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
]
