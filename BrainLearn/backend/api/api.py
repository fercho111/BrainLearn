from rest_framework.response import Response
from rest_framework.views import APIView
from backend.models import User
from backend.serializers import UserSerializer

#Vista de rest framework que va a retornar un JSON con la infor de todos los usuarios
class UserAPIView(APIView):
    #Este método recive la petición get que envíe el frontend
    def get(self, request):
        #En la variable users se guarda una lista de usuarios
        users = User.objects.all()
        #Cuando le pasamos el listado al serializador tenemos que poner el atributo many = True para que sepa que son varios
        users_serializer = UserSerializer(users, many = True)
        #hacemos un return de una instancia de la clase response, obligatoriamente debemos
        #pasar la información que se va a retornar en formata JSON a la solicitud del cliente
        #y esa variable tiene atributo llamado "data" que es donde se encuntra la informacion
        return Response(users_serializer.data)

