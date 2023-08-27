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
    path('createCard/', views2.CardCreateView.as_view(), name = "CreateCard"),
]