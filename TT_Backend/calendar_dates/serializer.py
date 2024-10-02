from rest_framework import serializers
from .models import Date_Event

class DateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Date_Event
        fields = ['id', 'activity', 'responsible', 'duration', 'start_date', 'end_date']
        extra_kwargs = {
            'id': {'read_only': True},
        }
