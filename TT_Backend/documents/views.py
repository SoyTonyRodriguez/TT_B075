from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, DestroyAPIView
from rest_framework.views import APIView
from .models import Document
from .serializer import DocumentSerializer, RegisterDocumentSerializer
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
import os
from django.conf import settings
from django.core.exceptions import PermissionDenied


class DocumentUploadAPIView(APIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    permission_classes = (IsAuthenticated,)
    queryset = Document.objects.all()
    serializer_class = RegisterDocumentSerializer

    def post(self, request):
        print(request.data)
        serializer = RegisterDocumentSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class DocumentListCreateAPIView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DocumentSerializer

    def get_queryset(self):
        account_id = self.kwargs['account_id']
        return Document.objects.filter(account_id=account_id)

class DocumentReplace(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RegisterDocumentSerializer
    lookup_field = 'id'

    def get_queryset(self):
        # Restrict the queryset to only the tasks that belong to the authenticated user's account
        return Document.objects.filter(account_id=self.request.user.id)

    def perform_update(self, serializer):
        # Ensure that the document belongs to the authenticated user's account before updating
        document = self.get_object()
        if document.account_id != self.request.user.id:
            raise PermissionDenied("You do not have permission to edit this document.")

        # Check if a new file is being uploaded
        new_file = self.request.FILES.get('file', None)
        if new_file:
            # Delete the old file from the filesystem if a new one is being uploaded
            if document.file:
                old_file_path = os.path.join(settings.MEDIA_ROOT, document.file.name)
                if os.path.isfile(old_file_path):
                    os.remove(old_file_path)

        # Proceed with the update
        serializer.save()
    
class DocumentDeleteAPIView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    lookup_field = 'id'
    queryset = Document.objects.all()  # Para poder encontrar el documento

    def perform_destroy(self, instance):
        # Asegúrate de que el documento pertenece al usuario autenticado
        if instance.account_id != self.request.user.id:
            raise PermissionDenied("No tienes permiso para eliminar este documento.")
        
        # Eliminar el archivo del sistema de archivos
        if instance.file:
            file_path = os.path.join(settings.MEDIA_ROOT, instance.file.name)
            if os.path.isfile(file_path):
                os.remove(file_path)

        # Llamar a la eliminación del objeto de la base de datos
        instance.delete()