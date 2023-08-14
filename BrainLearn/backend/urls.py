from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home, name = "home"),
    path('login/', views.user_login.as_view(), name = "Login"),
    path('userList/', views.user_list.as_view(), name = "UserList"),
    path('userDetail/<int:pk>/', views.user_detail.as_view(), name = "UserDetail"),
    path('deckList/', views.deck_list.as_view(), name = "DeckList"),
    path('deckDetail/', views.deck_detail.as_view(), name = "DeckDetail"),
    path('cardList/', views.card_list.as_view(), name = "CardList"),
    path('cardDetail/', views.card_detail.as_view(), name = "CardDetail"),
]