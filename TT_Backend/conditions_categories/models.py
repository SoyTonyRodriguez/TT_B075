from django.db import models
from djongo.models.fields import JSONField
from django.utils.translation import gettext_lazy as _

class Categories(models.Model):
    carga_academica = JSONField()
    otras_actividades = JSONField()
    investigacion = JSONField()
    superacion_academica = JSONField()
    actividades_complementarias = JSONField()
    actividades_extension = JSONField()

    class Meta:
        verbose_name = _('condition_category')
        verbose_name_plural = _('conditions_categories')
        db_table = 'conditions_categories'