from django.contrib import admin
from projections.models import Projection
from .models import DefaultProjectionDates

# Register your models here.
@admin.register(DefaultProjectionDates)
class DefaultProjectionDatesAdmin(admin.ModelAdmin):
    list_display = ('start_date', 'end_date')