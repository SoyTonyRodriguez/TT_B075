from rest_framework import viewsets
from .serializer import RegisterSerializer, CustomTokenObtainPairSerializer, CustomTokenRefreshSerializer, AccountSerializer
from .models import Accounts
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .email_utils import enviar_correo_bienvenida
from smtplib import SMTP
from email.mime.text import MIMEText
from django.http import JsonResponse
from django.conf import settings

# Create your views here.
class AccountsView(viewsets.ModelViewSet):
  permission_classes = (IsAuthenticated,)
  serializer_class = RegisterSerializer
  queryset = Accounts.objects.all()

class RegisterAccountsView(APIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    permission_classes = [AllowAny]  # Permitir acceso a todos los usuarios

    def post(self, request):
        print(request.data)
        
        # Serialización y validación
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Guardar el usuario y obtener la instancia creada
        user = serializer.save()
        
        # Enviar correo de bienvenida usando el correo del usuario
        enviar_correo_bienvenida(user.email)
        
        return Response(serializer.data)

class AccountView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, id, format=None):
        try:
            user = Accounts.objects.get(id=id)  # Assuming 'id' is the username
            serializer = AccountSerializer(user)
            return Response(serializer.data)
        except Accounts.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        # Método para actualizar la información del usuario
    def patch(self, request, id, format=None):
        try:
            user = Accounts.objects.get(id=id)  # Obtener el usuario por su ID
        except Accounts.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # Serializar y validar los datos
        serializer = AccountSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()  # Guardar los cambios en la base de datos
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer

from django.core.mail import send_mail
from django.http import JsonResponse

def prueba_envio_correo(request):
    try:
        # Configurar el mensaje MIME
        msg = MIMEText("Este es un correo enviado desde Django usando Outlook SMTP.")
        msg['Subject'] = "Correo de Prueba"
        msg['From'] = settings.EMAIL_HOST_USER
        msg['To'] = "destinatario@ejemplo.com"

        # Conexión SMTP manual
        with SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT) as server:
            server.ehlo()  # Identificación con el servidor
            server.starttls()  # Iniciar TLS
            server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
            server.sendmail(settings.EMAIL_HOST_USER, ["destinatario@ejemplo.com"], msg.as_string())

        return JsonResponse({'mensaje': 'Correo enviado exitosamente'})
    except Exception as e:
        return JsonResponse({'error': str(e)})