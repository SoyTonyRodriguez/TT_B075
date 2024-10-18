from django.db import models
from djongo import models
import uuid
from django.utils.translation import gettext_lazy as _
import random

def generate_product_id():
    return 'product_' + str(uuid.uuid4())

def generate_pastel_color():
    # Genera valores aleatorios entre 127 y 255 para obtener colores claros (pastel)
    red = random.randint(127, 255)
    green = random.randint(127, 255)
    blue = random.randint(127, 255)
    return f'#{red:02X}{green:02X}{blue:02X}'

# Create your models here.
class Products(models.Model):
    id = models.CharField(
        max_length=40,
        primary_key=True,
        default=generate_product_id,
        editable=False
    )
    account_id = models.CharField(max_length=255)
    projection_id = models.CharField(max_length=255, default="test")  # Aqui es product_id, pero da hueva cambiarlo
    function = models.CharField(max_length=255)
    activity = models.CharField(max_length=255)
    role = models.CharField(max_length=255, blank=True, null=True)
    scope = models.CharField(max_length=255, blank=True, null=True)
    tasks = models.JSONField(
        models.CharField(max_length=255),  # IDs de tareas
        blank=True, 
        null=True
    )
    documents_required = models.TextField(blank=True, null=True)
    documents_uploaded = models.JSONField(
        models.CharField(max_length=255),  # IDs de tareas
        blank=True, 
        null=True,
        default=list
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    units_str = models.CharField(max_length=255, blank=True, null=True)
    units = models.FloatField(null=True, blank=True, default=0) # Unidades de la proyección
    priority = models.CharField(max_length=255, blank=True, null=True)
    color = models.CharField(max_length=7, default=generate_pastel_color, blank=True)
    progress = models.FloatField(default=0)

    def __str__(self):
        return self.function

    class Meta:
        verbose_name = _('product')
        verbose_name_plural = _('products')
        db_table = 'products'