# urls.py
from django.urls import path
from .views import UserRegisterView, UserLoginView, UserLogoutView, testview, cartas

urlpatterns = [
    path('test/', testview, name='test' ),
    path('cartas/', cartas, name='cartas'),
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    # Other URLs for your application
]
