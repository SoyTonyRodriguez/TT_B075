from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

class ProjectionsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'projections'
    verbose_name = _('Proyecciones')

    def ready(self):
        import projections.signals