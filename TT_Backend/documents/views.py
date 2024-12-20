from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, DestroyAPIView, RetrieveAPIView
from rest_framework.views import APIView
from .models import Document
from .serializer import DocumentSerializer, RegisterDocumentSerializer
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
import os
from django.conf import settings
from django.core.exceptions import PermissionDenied
import base64
from django.core.files.base import ContentFile
from products.models import Products

from django.db.models.signals import post_save, post_delete
from products.signals import update_product_check

class DocumentUploadAPIView(APIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    permission_classes = (IsAuthenticated,)
    
    def post(self, request, *args, **kwargs):
        try:
            # Desconectar la señal temporalmente si es un POST
            if self.request.method == 'POST':
                post_save.disconnect(update_product_check, sender=Products)
            file_name = request.data['file_name']
            file_type = request.data['file_type']
            size = request.data['size']
            account_id = request.data['account_id']
            projection_id = request.data['projection_id']
            activity = request.data['activity']

            # Decodificar archivo Base64
            binary_file = base64.b64decode(request.data['file'])

            # Guardar documento en la base de datos
            document = Document.objects.create(
                file_name=file_name,
                file_type=file_type,
                size=size,
                account_id=account_id,
                projection_id=projection_id,
                file=binary_file,
                activity=activity
            )

            # Reconectar la señal
            if self.request.method == 'POST':
                post_save.connect(update_product_check, sender=Products)

            return Response({"message": "¡Documento subido exitosamente!"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DocumentListCreateAPIView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DocumentSerializer

    def get_queryset(self):
        account_id = self.kwargs['account_id']
        return Document.objects.filter(account_id=account_id)

from rest_framework.parsers import MultiPartParser, FormParser

class DocumentReplace(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RegisterDocumentSerializer
    lookup_field = 'id'
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        return Document.objects.filter(account_id=self.request.user.id)

    def update(self, request, *args, **kwargs):
        document = self.get_object()

        # Verificar permisos
        if document.account_id != self.request.user.id:
            raise PermissionDenied("No tienes permiso para editar este documento.")

        response = super().update(request, *args, **kwargs)

        return Response({"message": "Documento actualizado correctamente."}, status=status.HTTP_200_OK)


    
class DocumentDeleteAPIView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    lookup_field = 'id'
    queryset = Document.objects.all()

    def perform_destroy(self, instance):
        if instance.account_id != self.request.user.id:
            raise PermissionDenied("No tienes permiso para eliminar este documento.")
        
        # Desconectar la señal temporalmente si es un POST
        if self.request.method == 'DELETE':
            post_save.disconnect(update_product_check, sender=Products)

        # Solo eliminamos la entrada en MongoDB, no hay archivos en el sistema
        instance.delete()

        # Reconectar la señal
        if self.request.method == 'DELETE':
            post_save.connect(update_product_check, sender=Products)

class DocumentRetrieveAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DocumentSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Document.objects.filter(account_id=self.request.user.id)

    def get_object(self):
        document = super().get_object()
        if document.account_id != self.request.user.id:
            raise PermissionDenied("No tienes permiso para ver este documento.")
        return document