from django.db import models

# Create your models here.
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

class DefaultProjectionDates(models.Model):
    start_date = models.DateField(
        default=timezone.now,
        help_text=_('Fecha de inicio por defecto para las proyecciones')
    )
    end_date = models.DateField(
        default=timezone.now,
        help_text=_('Fecha de fin por defecto para las proyecciones')
    )

    class Meta:
        verbose_name = _('Fecha de proyección por defecto')
        verbose_name_plural = _('Fechas de proyección por defecto')
        db_table = 'admin-default_projection_dates'

    def __str__(self):
        return f"Fechas por defecto: {self.start_date} - {self.end_date}"
