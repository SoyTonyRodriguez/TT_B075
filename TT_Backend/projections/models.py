from django.db import models
from djongo import models
import uuid
from django.utils.translation import gettext_lazy as _
import random

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
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.function

    class Meta:
        verbose_name = _('projection')
        verbose_name_plural = _('projections')
        db_table = 'projections'
        indexes = [
            models.Index(fields=['start_date', 'end_date']),
        ]