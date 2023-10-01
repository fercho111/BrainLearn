from django.urls import path, include
from . import views

urlpatterns = [
    # path('', views2.HomeView.as_view(), name = "Home"),
    path('', views.CardListView.as_view(), name="Card"),
    path('<int:pk>/', views.CardUpdateView.as_view(), name="Update")
]