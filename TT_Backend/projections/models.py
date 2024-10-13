from django.db import models
from djongo import models
from django.utils.translation import gettext_lazy as _
import uuid
from django.utils import timezone

def generate_projection_id():
    return 'projection_' + str(uuid.uuid4())

# Create your models here.
class Projection(models.Model):
    id = models.CharField(
        max_length=40,
        primary_key=True,
        default=generate_projection_id,
        editable=False
    )
    account_id = models.CharField(max_length=255)
    products = models.JSONField(
        models.CharField(max_length=255),  # IDs de productos
        blank=True, 
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)

    def save(self, *args, **kwargs):
        # Se importa aquí para evitar ciclos de importación
        from default_Projection_Dates.models import DefaultProjectionDates

        # Obtener las fechas por defecto
        default_dates = DefaultProjectionDates.objects.first()

        # Se coloca la fecha por defecto que haya colocado el administrador
        if not self.start_date and default_dates:
            self.start_date = default_dates.start_date
        if not self.end_date and default_dates:
            self.end_date = default_dates.end_date
        
        super().save(*args, **kwargs)

    def __str__(self):
        return self.id

    class Meta:
        verbose_name = _('projection')
        verbose_name_plural = _('projections')
        db_table = 'projections'
        indexes = [
            models.Index(fields=['start_date', 'end_date']),
        ]
