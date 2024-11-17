from django.db import models
import uuid
from django.utils.translation import gettext_lazy as _

def generate_date_id():
    return 'date_' + str(uuid.uuid4())

class Date_Event(models.Model):
    id = models.CharField(
        max_length=40,
        primary_key=True,
        default=generate_date_id,
        editable=False
    )
    activity = models.CharField(max_length=255)
    responsible = models.CharField(max_length=255)
    duration = models.IntegerField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    def __str__(self):
        return self.activity
    
    class Meta:
        verbose_name = _('Fecha en calendario')
        verbose_name_plural = _('Fechas en calendario')
        db_table = 'dates'
        indexes = [
            models.Index(fields=['start_date', 'end_date']),
        ]

