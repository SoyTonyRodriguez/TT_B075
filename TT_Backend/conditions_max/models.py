from django.db import models
from djongo.models.fields import JSONField

class Conditions_Max(models.Model):
    configuracion = models.JSONField()

    def __str__(self):
        return "Configuración de Actividades"
