from rest_framework.response import Response
from rest_framework.views import APIView
from backend.models import User
from backend.serializers import UserSerializer
#un decorador
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
        return Response(users_serializer.data)
    
    # request.data guarda la información del post
    elif request.method == 'POST':

        #Utilizamos el serializador para validar
        #Aquí cómo la pasamos un JSON compara si considen las caracteristicas del modelo
        users_serializer = UserSerializer(data = request.data)
        if users_serializer.is_valid():
            users_serializer.save()
            return Response(users_serializer.data)
        return Response(users_serializer.errors)



