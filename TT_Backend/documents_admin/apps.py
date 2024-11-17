from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

class DocumentsAdminConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'documents_admin'
    verbose_name = _('Documentos oficiales')  # Traducción al español
