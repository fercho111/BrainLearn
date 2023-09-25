from django.urls import path, include

from .api import api
from . import views2

urlpatterns = [
    # path('', views2.HomeView.as_view(), name = "Home"),

    # Vistas de Usuario
    # path('login/', views2.UserLoginView, name = "Login"),
    path('register/', views2.UserRegisterView.as_view(), name = "UserRegister"),
    path('userDetail/<int:pk>/', views2.UserDetailView.as_view(), name = "UserDetail"),

    # Vistas de Cartas
    path('card/', views2.CardListCreateView.as_view(), name = "CreateCard"),   # lista de cartas
    path('cardDetail/', views2.CardDetailView.as_view(), name = "CardDetail"), # datos de una carta con la función para saber de que usuario es
    path('card/<int:pk>', views2.CardDetailAPIView.as_view(), name = "card"),  # datos de una carta        

    # Vistas de Mazos
    path('deckList/', views2.DeckListView.as_view(), name = "DeckList"), # lista de mazos 

    # Vistas de Autenticación
    path('usuario/', include('backend.api.urls')),    
    path('login/', views2.Login.as_view(), name = "Login"), 
    path('logout/', views2.Logout.as_view(), name = "Logout"), 
    path('refresh-token/', views2.UserToken.as_view(), name = "refresh_token"), 
]