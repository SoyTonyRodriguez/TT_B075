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
        # Verificar si ya existe una instancia previa
        try:
            existing_document = DocumentsAdmin.objects.get(pk=self.pk)
            if existing_document.file and existing_document.file != self.file:
                # Eliminar el archivo anterior
                existing_document.file.delete(save=False)
        except DocumentsAdmin.DoesNotExist:
            pass  # No hay archivo previo, nada que eliminar

        # Cambiar el nombre del archivo al título seleccionado
        if self.file:
            ext = os.path.splitext(self.file.name)[1]
            new_filename = f"{self.title}{ext}"
            self.file.name = new_filename

        super().save(*args, **kwargs)

        # Copiar el archivo al frontend web
        web_frontend_directory = settings.FRONTEND_WEB_PDFS_PATH
        os.makedirs(web_frontend_directory, exist_ok=True)
        web_frontend_path = os.path.join(web_frontend_directory, self.file.name)
        shutil.copy(self.file.path, web_frontend_path)

        # Copiar el archivo al frontend móvil
        mobile_frontend_directory = settings.FRONTEND_MOBILE_PDFS_PATH
        os.makedirs(mobile_frontend_directory, exist_ok=True)
        mobile_frontend_path = os.path.join(mobile_frontend_directory, self.file.name)
        shutil.copy(self.file.path, mobile_frontend_path)

    def delete(self, *args, **kwargs):
        """
        Elimina el archivo asociado al borrar el registro.
        """
        if self.file:
            self.file.delete(save=False)

            # Eliminar el archivo del frontend web
            web_frontend_path = os.path.join(settings.FRONTEND_WEB_PDFS_PATH, self.file.name)
            if os.path.exists(web_frontend_path):
                os.remove(web_frontend_path)

            # Eliminar el archivo del frontend móvil
            mobile_frontend_path = os.path.join(settings.FRONTEND_MOBILE_PDFS_PATH, self.file.name)
            if os.path.exists(mobile_frontend_path):
                os.remove(mobile_frontend_path)

        super().delete(*args, **kwargs)
