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
        verbose_name = _('admin-default projection date')
        verbose_name_plural = _('admin-default projection dates')
        db_table = 'admin-default_projection_dates'

    def __str__(self):
        return f"Fechas por defecto: {self.start_date} - {self.end_date}"
