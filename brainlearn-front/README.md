# *BrainLearn*

# Actualizaciones Jayk:
Lo que hice es que creé el crud de los mazos y las cartas; en el de las cartas podemos editarlas solo poniendo el dato que desamos modifica (ningún campo es obligario a la hora de editar).
Lo que no hice fue que guardara la pk del mazo

También hice el crud de los mazos, igualmente se puede iditar solo poniendo el campo que desaomos cambiar, pero no gurda la pk del usuario que la creó, pero dejé comentada la función que nos permite a los datos del usario autenticado si estamos utilizando autenticación por tokens
```python
request.data['user'] = request.user.id
```

### 10/09/2023
Usamos Auth token para el login.

Tambien utilizamos Postman.
Postman es una plataforma que permite y hace más sencilla la creación y el uso de APIs. Esta herramienta es muy útil para programar porque da la posibilidad hacer pruebas y comprobar el correcto funcionamiento de los proyectos que realizan los desarrolladores web.

### ¿Qué es CORS headers?

El intercambio de recursos de origen cruzado (CORS, por sus siglas en inglés), es un mecanismo basado en cabeceras HTTP que permite a un servidor indicar cualquier dominio, esquema o puerto con un origen (en-US) distinto del suyo desde el que un navegador debería permitir la carga de recursos.

# Actualizaciones Camilo:
Se añadio el archivo home.html, css, el smooth scroll de javaScripts, aun no esta conectado con Dajngo REST

# Actualizaciones Jose:
Solucionado el problema de las peticiones del front al back, conectado el front mediante la librería Axios.
Se corrigió el modelo de usuario para registro
