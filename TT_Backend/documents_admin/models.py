import os
import shutil
from django.conf import settings
from django.db import models
from django.core.exceptions import ValidationError

def validate_file_extension(value):
    """
    Valida que el archivo subido sea un PDF.
    """
    ext = os.path.splitext(value.name)[1]
    if ext.lower() != '.pdf':
        raise ValidationError('El archivo debe ser un PDF.')

class DocumentsAdmin(models.Model):
    TITLE_CHOICES = [
        ('Convocatoria', 'Convocatoria'),
        ('Cronograma', 'Cronograma'),
        ('Reglamento', 'Reglamento'),
        ('Valoracion', 'Valoración'),
        ('Gaceta', 'Gaceta'),
    ]

    title = models.CharField(
        max_length=50,
        choices=TITLE_CHOICES,
        verbose_name="Título"
    )
    file = models.FileField(
        upload_to='',
        validators=[validate_file_extension],
        verbose_name="Archivo"
    )
    uploaded_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de subida")

    class Meta:
        verbose_name = "Documento oficial"
        verbose_name_plural = "Documentos oficiales"
        

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Verificar si ya existe un archivo con el mismo nombre en la base de datos
        if self.file:
            ext = os.path.splitext(self.file.name)[1]  # Obtener la extensión del archivo
            self.file.name = f"{self.title}{ext}"  # Renombrar el archivo según el título

            # Verificar si existe otro archivo con el mismo nombre en la carpeta media
            file_path = os.path.join(settings.MEDIA_ROOT, self.file.name)
            if os.path.exists(file_path):
                os.remove(file_path)  # Eliminar el archivo anterior si existe

        # Manejar el caso de eliminación del archivo anterior asociado a esta instancia
        try:
            existing_document = DocumentsAdmin.objects.get(pk=self.pk)
            if existing_document.file and existing_document.file != self.file:
                # Eliminar el archivo anterior asociado a esta instancia
                existing_document.file.delete(save=False)
        except DocumentsAdmin.DoesNotExist:
            pass  # No hay archivo previo, nada que eliminar

        super().save(*args, **kwargs)

        # Copiar el archivo al frontend web
        # web_frontend_directory = settings.FRONTEND_WEB_PDFS_PATH
        # os.makedirs(web_frontend_directory, exist_ok=True)
        # web_frontend_path = os.path.join(web_frontend_directory, self.file.name)
        # shutil.copy(self.file.path, web_frontend_path)

        # # Copiar el archivo al frontend móvil
        # mobile_frontend_directory = settings.FRONTEND_MOBILE_PDFS_PATH
        # os.makedirs(mobile_frontend_directory, exist_ok=True)
        # mobile_frontend_path = os.path.join(mobile_frontend_directory, self.file.name)
        # shutil.copy(self.file.path, mobile_frontend_path)

    def delete(self, *args, **kwargs):
        """
        Elimina el archivo asociado al borrar el registro.
        """
        if self.file:
            self.file.delete(save=False)

        super().delete(*args, **kwargs)
