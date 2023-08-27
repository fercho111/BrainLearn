from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from backend.models import User
from backend.serializers import UserSerializer, TestUserSerializer
from rest_framework.decorators import api_view

#Vista de rest framework que va a retornar un JSON con la infor de todos los usuarios
#Al decorador le vamos a pasar los metodos http que va a tener la función 
@api_view(['GET', 'POST'])
def user_api_view(request):

    #Si el método http que se está usando es get retornamos la lista
    if request.method == 'GET':
        #En la variable users se guarda una lista de usuarios
        users = User.objects.all()

        #Cuando le pasamos el listado al serializador tenemos que poner el atributo many = True para que sepa que son varios
        users_serializer = UserSerializer(users, many = True) 

        #hacemos un return de una instancia de la clase response, obligatoriamente debemos
        #pasar la información que se va a retornar en formata JSON a la solicitud del cliente
        #y esa variable tiene atributo llamado "data" que es donde se encuntra la informacion
        return Response(users_serializer.data, status = status.HTTP_200_OK)
    
    # create
    # request.data guarda la información del post
    elif request.method == 'POST':

        #Utilizamos el serializador para validar
        #Aquí cómo la pasamos un JSON compara si considen las caracteristicas del modelo
        users_serializer = UserSerializer(data = request.data)
        if users_serializer.is_valid():
            users_serializer.save()
            return Response(users_serializer.data, status = status.HTTP_201_CREATED)
        return Response(users_serializer.errors)



@api_view(['GET', 'PUT', 'DELETE'])
def user_datil_api_view(request, pk = None):
    # hacemos la consulta
    user = User.objects.filter(id = pk).first()

    # validación
    if user:

        # retrive
        if request.method == 'GET':
            #vamos a serializar un solo dato
            user_serializer = UserSerializer(user)
            return Response(user_serializer.data, status = status.HTTP_200_OK)
        
        # update
        elif request.method == 'PUT':
            #Le pasamos el usuario que se va a actualizar y la información nueva
            user_serializer = UserSerializer(user, data = request.data)
            if user_serializer.is_valid():
                user_serializer.save()
                return Response(user_serializer.data, status = status.HTTP_200_OK)
            return Response(user_serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    
        # delete
        elif request.method == 'DELETE':
            user.delete()
            return Response({'message':'Usuario eliminado correctamente'}, status = status.HTTP_200_OK)
        
    return Response({'message':'No se ha encontrado un usuario con estos datos'}, status = status.HTTP_400_BAD_REQUEST)
