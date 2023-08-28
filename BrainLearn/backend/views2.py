from django.contrib.auth import authenticate, login
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, CardSerializer, DeckSerializer
from .models import User, Card, Deck
from django.utils import timezone
from rest_framework.authtoken.views import ObtainAuthToken

@api_view(['POST'])
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

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserRegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {"user": UserSerializer(user, context=self.get_serializer_context()).data},
            status=status.HTTP_201_CREATED,
        )

class DeckListView(generics.ListCreateAPIView):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DeckDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer
    permission_classes = [permissions.IsAuthenticated]

class CardListView(generics.ListCreateAPIView):
    # serializer_class = CardSerializer
    # permission_classes = [permissions.IsAuthenticated]

    # def get_queryset(self):
        # return Card.objects.filter(deck__user=self.request.user)

    # def perform_create(self, serializer):
        # serializer.save()

    queryset = Card.objects.all()
    serializer_class = CardSerializer

class CardDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Card.objects.filter(deck__user=self.request.user)


#Jayk
#class CardCreateView(generics.CreateAPIView):
#    serializer_class = CardSerializer
#
#    def create(self, request, *args, **kwargs):
#        serializer = self.get_serializer(data=request.data)
#        serializer.is_valid(raise_exception=True)
#        card = serializer.save()
#        return Response(
#            {"card": CardSerializer(card, context=self.get_serializer_context()).data},
#            status=status.HTTP_201_CREATED,
#        )



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
#
#
#
class CardListCreateView(generics.ListCreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer



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
#
#
#
class CardDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer



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
        request.data['user'] = request.user.id #############################################################

        # Utilizamos el serializador para validar
        decks_serializer = DeckSerializer(data=request.data)
        if decks_serializer.is_valid():
            decks_serializer.save()
            return Response(decks_serializer.data, status=status.HTTP_201_CREATED)
        return Response(decks_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
#
class DeckListCreateView(generics.ListCreateAPIView):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer

    # def perform_create(self, serializer):
        # Agregamos el usuario autenticado como propietario del mazo
        #serializer.save(user=self.request.user)



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
#
#
#
class DeckDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer    



# vista de login
class Login(ObtainAuthToken):
    def post(self,request,*args,**kwargs):
        # self.serializer_class() ya está definido en ObtainAuthToken
        # el serializador "serializer_class()" tiene un campo 'username' y uno llamado 'password'
        login_serializer = self.serializer_class(data = request.data, contex = {'request':request})
        if login_serializer.is_valid():
            print("Pasó validación")
        return Response({'mensaje':'Hola desde response'}, status = status.HTTP_200_OK)