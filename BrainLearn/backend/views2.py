from datetime import datetime
from django.utils import timezone
from django.contrib.sessions.models import Session
from django.contrib.auth import authenticate, login
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from .models import User, Card, Deck
from .authentication_mixins import Authentication
from .serializers import UserSerializer, CardSerializer, DeckSerializer, UserTokenSerializer, RegisterSerializer


@api_view(['POST'])

# Vistas de Usuario
class UserLoginView(generics.CreateAPIView):


    def create(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return Response(UserSerializer(user).data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
class UserRegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {"user": RegisterSerializer(user, context=self.get_serializer_context()).data},
            status=status.HTTP_201_CREATED,
        )
class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


# Vistas de Cartas
class CardListCreateView(Authentication, generics.ListCreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
class CardDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Card.objects.filter(deck__user=self.request.user)
class CardDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer


# Vistas de Mazos
class DeckListView(generics.ListCreateAPIView):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# Vistas de Auntenticación
class Login(ObtainAuthToken):
    def post(self,request,*args,**kwargs):
        print(request.user)
        # self.serializer_class() ya está definido en ObtainAuthToken
        # el serializador "serializer_class()" tiene un campo 'username' y uno llamado 'password'
        login_serializer = self.serializer_class(data = request.data, context = {'request':request})
        if login_serializer.is_valid():            
            user = login_serializer.validated_data['user']          

            if user.is_active:
                # si el usuario está activo creamos un token
                # recibimos el token en la variable token y en created un true o false si se crea el token
                token,created = Token.objects.get_or_create(user = user) 
                user_serializer = UserTokenSerializer(user)                            
                if created:
                    return Response({
                        'token': token.key,
                        'user': user_serializer.data,
                        'message': 'Inicio de sesión exitoso'
                    }, status=status.HTTP_201_CREATED)
                else:
                    
                    # Cuando iniciamos sesión otra vez se borra la sesión actual y se
                    # crea un nuevo token
                    all_sessions = Session.objects.filter(expire_date__gte = datetime.now())
                    if all_sessions.exists():
                        for session in all_sessions:
                            session_data = session.get_decoded()
                            if user.id == int(session_data.get('_auth_user_id')):
                                session.delete()
                    # Actualizamos token
                    token.delete()
                    token = Token.objects.create(user = user)
                                        
                    return Response({
                        'token': token.key,
                        'user': user_serializer.data,
                        'message': 'Inicio de sesión exitoso'
                    }, status=status.HTTP_201_CREATED)
                    

                    """
                    # No permitir iniciar sesión si ya se ha iniciado sesión
                    token.delete()
                    return Response({
                        'error': 'Ya se ha iniciado sesión con este usuario'
                    }, status=status.HTTP_409_CONFLICT)
                    """
            else:
                return Response({'error':'Este usuario no puede iniciar sesión.'}, status = status.HTTP_401_UNAUTHORIZED)
            
        else:
            return Response({'error':'Nombre de usuario o contraseña incorrectos.'}, status=status.HTTP_400_BAD_REQUEST)            
class Logout(APIView):
    def get(self,request,*args,**kwargs):
        try:
            token = request.GET.get('token')                    
            token = Token.objects.filter(key = token).first()
            if token:
                user = token.user
                # Cuando iniciamos sesión otra vez se borra la sesión actual y se
                # crea un nuevo token
                all_sessions = Session.objects.filter(expire_date__gte = datetime.now())
                if all_sessions.exists():
                    for session in all_sessions:
                        session_data = session.get_decoded()
                    if user.id == int(session_data.get('_auth_user_id')):
                        session.delete()

                token.delete()
                session_message = 'Sesiones de usuario eliminadas.'
                token_message = 'Token eliminado'
                return Response({'token_message': token_message, 'session_message': session_message}, status=status.HTTP_200_OK)
            
            return Response({'error': 'No se ha encontrado un usuario con estas credenciales.'}, status=status.HTTP_400_BAD_REQUEST)
        except:  
            return Response({'error': 'No se ha encontrado token en la petición.'}, status=status.HTTP_409_CONFLICT)
class UserToken(APIView):
    def get(self, request, *args, **kwargs):
        username = request.GET.get('username')
        try:
            user_token = Token.objects.get(
                user = UserTokenSerializer().Meta.model.objects.filter(username = username).first()
            )
            return Response({
                'token':user_token.key
            })
        except:
            return Response({
                'error': 'Credenciales enviadas incorrectas'
            }, status = status.HTTP_400_BAD_REQUEST)
  


@api_view(['GET', 'POST'])
def card_api_view(request):

    # Si el método HTTP que se está usando es GET, retornamos la lista
    if request.method == 'GET':
        # En la variable cards se guarda una lista de cartas
        cards = Card.objects.all()

        # Cuando le pasamos el listado al serializador, tenemos que poner el atributo many = True para que sepa que son varias
        cards_serializer = CardSerializer(cards, many=True)

        # Retornamos una instancia de la clase Response con la información en formato JSON
        return Response(cards_serializer.data, status=status.HTTP_200_OK)
    
    # Create
    # request.data guarda la información del POST
    elif request.method == 'POST':

        # Utilizamos el serializador para validar
        cards_serializer = CardSerializer(data=request.data)
        if cards_serializer.is_valid():
            cards_serializer.save()
            return Response(cards_serializer.data, status=status.HTTP_201_CREATED)
        return Response(cards_serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


@api_view(['GET', 'PUT', 'DELETE'])
def card_detail_api_view(request, pk=None):
    # Realizamos la consulta
    card = Card.objects.filter(id=pk).first()

    # Validación
    if card:
        # Retrieve
        if request.method == 'GET':
            # Serializamos un solo dato
            card_serializer = CardSerializer(card)
            return Response(card_serializer.data, status=status.HTTP_200_OK)

        # Update
        elif request.method == 'PUT':
            request.data['modified_at'] = timezone.now()  # Agrega la fecha actual
            # Le pasamos la carta que se va a actualizar y la información nueva
            card_serializer = CardSerializer(card, data=request.data, partial=True)  # Usa partial=True para permitir campos no obligatorios
            if card_serializer.is_valid():
                card_serializer.save()
                return Response(card_serializer.data, status=status.HTTP_200_OK)
            return Response(card_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Delete
        elif request.method == 'DELETE':
            card.delete()
            return Response({'message': 'Carta eliminada correctamente'}, status=status.HTTP_200_OK)

    return Response({'message': 'No se ha encontrado una carta con estos datos'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def deck_api_view(request):

    # Si el método HTTP que se está usando es GET, retornamos la lista
    if request.method == 'GET':
        # En la variable decks se guarda una lista de mazos
        decks = Deck.objects.all()

        # Cuando le pasamos el listado al serializador, tenemos que poner el atributo many = True para que sepa que son varios
        decks_serializer = DeckSerializer(decks, many=True)

        # Retornamos una instancia de la clase Response con la información en formato JSON
        return Response(decks_serializer.data, status=status.HTTP_200_OK)
    
    # Create
    # request.data guarda la información del POST
    elif request.method == 'POST':
        # Agregamos el usuario autenticado como propietario del mazo
        # request.data['user'] = request.user.id #############################################################

        # Utilizamos el serializador para validar
        decks_serializer = DeckSerializer(data=request.data)
        if decks_serializer.is_valid():
            decks_serializer.save()
            return Response(decks_serializer.data, status=status.HTTP_201_CREATED)
        return Response(decks_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def deck_detail_api_view(request, pk=None):
    # Realizamos la consulta
    deck = Deck.objects.filter(id=pk).first()

    # Validación
    if deck:
        # Retrieve
        if request.method == 'GET':
            # Serializamos un solo dato
            deck_serializer = DeckSerializer(deck)
            return Response(deck_serializer.data, status=status.HTTP_200_OK)

        # Update
        elif request.method == 'PUT':
            request.data['modified_at'] = timezone.now()  # Agrega la fecha actual
            # Le pasamos el mazo que se va a actualizar y la información nueva
            deck_serializer = DeckSerializer(deck, data=request.data, partial=True)  # Usa partial=True para permitir campos no obligatorios
            if deck_serializer.is_valid():
                deck_serializer.save()
                return Response(deck_serializer.data, status=status.HTTP_200_OK)
            return Response(deck_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Delete
        elif request.method == 'DELETE':
            deck.delete()
            return Response({'message': 'Mazo eliminado correctamente'}, status=status.HTTP_200_OK)

    return Response({'message': 'No se ha encontrado un mazo con estos datos'}, status=status.HTTP_400_BAD_REQUEST)
