from django.urls import path, include

from .api import api
from . import views2

urlpatterns = [
    path('login/', views2.UserLoginView, name = "Login"),
    path('register/', views2.UserRegisterView.as_view(), name = "UserRegister"),
    path('userList/', views2.UserListView.as_view(), name = "UserList"),
    path('userDetail/<int:pk>/', views2.UserDetailView.as_view(), name = "UserDetail"),
    path('deckList/', views2.DeckListView.as_view(), name = "DeckList"),
    path('deckDetail/', views2.DeckDetailView.as_view(), name = "DeckDetail"),
    path('cardList/', views2.CardListView.as_view(), name = "CardList"),
    path('cardDetail/', views2.CardDetailView.as_view(), name = "CardDetail"),

    #Jayk: Probando
    path('usuario/', include('backend.api.urls')),    
    path('card/', views2.CardListCreateView.as_view(), name = "CreateCard"),
    path('card/<int:pk>', views2.CardDetailAPIView.as_view(), name = "card"),            
    path('deck/', views2.DeckListCreateView.as_view(), name = "CreateDeck"),      
    path('deck/<int:pk>', views2.DeckDetailAPIView.as_view(), name = "deck"), 
    path('', views2.Login.as_view(), name = "Login"), 
    path('logout/', views2.Logout.as_view(), name = "Logout"), 

]