from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

class DefaultProjectionDatesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'default_Projection_Dates'
    verbose_name = _('Fechas de Proyección por Defecto')