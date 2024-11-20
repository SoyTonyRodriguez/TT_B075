from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

class CalendarDatesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'calendar_dates'
    verbose_name = _('Fechas en calendario')  # Traducción al español