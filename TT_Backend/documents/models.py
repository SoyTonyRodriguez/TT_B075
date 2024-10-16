from django.db import models
# from django.core.files.storage import FileSystemStorage
from djongo import models
from django.utils.translation import gettext_lazy as _
import uuid

def generate_document_id():
    return 'doc_' + str(uuid.uuid4())

class Document(models.Model):
    id = models.CharField(
        max_length=40, 
        primary_key=True, 
        default=generate_document_id, 
        editable=False
    )
    account_id = models.CharField(max_length=255)  # Relacionado con el usuario que sube el documento
    file_name = models.CharField(max_length=255)  # Nombre del archivo
    file_type = models.CharField(max_length=50)   # Tipo MIME del archivo
    size = models.IntegerField()                  # Tamaño del archivo en bytes
    projection_id = models.CharField(max_length=255) 
    upload_date = models.DateTimeField(auto_now_add=True)  # Fecha de subida
    # file = models.FileField(upload_to='documents/', verbose_name="Archivo del documento")  # Ruta donde se almacenan los archivos
    file = models.BinaryField()  # Almacena el archivo como datos binarios

    def __str__(self):
        return f"{self.file_name} ({self.file_type})"

    class Meta:
        verbose_name = _('document')
        verbose_name_plural = _('documents')
        db_table = 'documents'
