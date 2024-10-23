# models.py
from django.db import models
from djongo import models  # Si usas Djongo para MongoDB, mantenemos esto.
import uuid

def generate_check_id():
    return 'check_' + str(uuid.uuid4())

class ProductCheck(models.Model):
    id = models.CharField(
        max_length=40,
        primary_key=True,
        default=generate_check_id,
        editable=False
    )
    account_id = models.CharField(max_length=255, unique=True)  # Un solo registro por cuenta.
    activities = models.JSONField(default=dict)  # Contendrá las actividades como objetos JSON.

    def __str__(self):
        return f"ProductCheck for {self.account_id}"

    class Meta:
        verbose_name = "Product Check"
        verbose_name_plural = "Product Checks"
        db_table = 'product_check'

