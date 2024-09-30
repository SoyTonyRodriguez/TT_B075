
from rest_framework import viewsets
from .models import Date_Event
from .serializer import DateSerializer
from rest_framework import status
from rest_framework.generics import ListAPIView
from django.utils.dateparse import parse_date

from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated, AllowAny


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