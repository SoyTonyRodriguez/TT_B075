from djongo import models

class Conditions_Max(models.Model):
    configuracion = models.JSONField()

    def __str__(self):
        return "Configuración de Actividades"
