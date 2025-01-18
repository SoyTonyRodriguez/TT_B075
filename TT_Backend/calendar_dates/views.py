from rest_framework import viewsets
from .models import Date_Event
from .serializer import DateSerializer
from rest_framework import status
from rest_framework.generics import ListAPIView
from django.utils.dateparse import parse_date

from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated, AllowAny

from django.utils.timezone import now
from rest_framework.response import Response
from datetime import datetime, time
import pytz
from accounts.models import Accounts
from django.core.mail import send_mail


class RegisterDate(APIView):
    permission_classes = [AllowAny]  # Allow access to all users
    def post(self, request, *args, **kwargs):
        serializer = DateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetAllDates(ListAPIView):
    permission_classes = [AllowAny]  # Allow access to all users
    queryset = Date_Event.objects.all()
    serializer_class = DateSerializer

class GetActivitiesByStartDate(ListAPIView):
    permission_classes = [AllowAny]  # Allow access to all users
    serializer_class = DateSerializer

    def get_queryset(self):
        start_date = self.kwargs['start_date']
        parsed_date = parse_date(start_date)  # Convertir la cadena a objeto de fecha
        return Date_Event.objects.filter(start_date=parsed_date)

from django.core.mail import BadHeaderError
from django.http import HttpResponse
from django.conf import settings

# class CheckAndSendEmailsView(APIView):
#     permission_classes = [AllowAny]  # Permitir acceso a todos los usuarios

#     def get(self, request, *args, **kwargs):
#         # Asegúrate de que la fecha tenga la hora en medianoche (UTC)
#         utc_timezone = pytz.UTC
#         today_midnight = datetime.combine(now().date(), time(0, 0, 0), tzinfo=utc_timezone)
#         formatted_date = today_midnight.isoformat(timespec='milliseconds')
#         print(f'Fecha actual formateada: {formatted_date}')

#         # Buscar el evento con la fecha de inicio igual a la fecha actual formateada
#         try:
#             date_event = Date_Event.objects.get(start_date=formatted_date)
#         except Date_Event.DoesNotExist:
#             return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

#         # Serializa el objeto
#         serializer = DateSerializer(date_event)

#         # print(f'Actividad encontrada: {serializer.data.get("activity")}')
#         if not serializer.data:
#             return Response({"error": "No events found"}, status=status.HTTP_404_NOT_FOUND)

#         # Obtener a todos los usuarios registrados
#         registered_users = Accounts.objects.all()
#         print(registered_users)

#         # Iterar por las actividades coincidentes y enviar correos
#         for user in registered_users:
#             print(f'Enviando correo a {user} para la actividad: {serializer.data.get("activity")}')
#             try:

#                 # Crear la plantilla de correo HTML
#                 html_message = f"""
#                 <html>
#                 <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
#                     <h2 style="color: #0056b3;">Notificación: {serializer.data.get("activity")}</h2>
#                     <p>Hola <strong>{user.name}</strong>,</p>
#                     <p>Te notificamos sobre la siguiente actividad programada:</p>
#                     <ul style="list-style-type: none; padding: 0;">
#                         <li><strong>Actividad:</strong> {serializer.data.get("activity")}</li>
#                         <li><strong>Fecha:</strong> {serializer.data.get("start_date")}</li>
#                         <li><strong>Responsable:</strong> {serializer.data.get("responsible")}</li>
#                         <li><strong>Duración:</strong> {serializer.data.get("duration")} día(s)</li>
#                     </ul>
#                     <p style="margin-top: 20px;">Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.</p>
#                     <p style="margin-top: 30px;">Saludos cordiales,</p>
#                     <p><strong>Tu Equipo de TT-B075</strong></p>
#                 </body>
#                 </html>
#                 """
#                 send_mail(
#                     subject=f'Notificación: {serializer.data.get("activity")}',
#                     message='',  # Mensaje en texto plano (puede dejarse vacío si usas HTML)
#                     html_message=html_message,  # Plantilla HTML
#                     from_email=settings.EMAIL_HOST_USER,
#                     recipient_list=[user],
#                     fail_silently=False,
#                 )
#             except BadHeaderError:
#                 return HttpResponse('Encabezado de correo no válido.')
#             except Exception as e:
#                 # Registra el error para inspección
#                 print(f"Error al enviar correo: {e}")
#                 return HttpResponse(f'Error al enviar correo: {e}')
#         return Response(serializer.data, status=status.HTTP_200_OK)
#         # return Response({'message': f'Correos enviados para {matching_activities.count()} actividades.'}, status=200)