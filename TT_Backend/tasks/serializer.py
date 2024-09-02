from django.forms import ValidationError
from rest_framework import serializers
from .models import Task
from datetime import datetime

class RegisterTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'start_date', 'end_date']
        extra_kwargs = {
            'id': {'read_only': True},
        }

    def validate(self, data):
        start_date = data.get('start_date')
        end_date = data.get('end_date')

        # Validate start_date is higher to the current date
        if start_date and start_date < datetime.now().date():
            raise serializers.ValidationError({
                "error": "La fecha de inicio debe ser mayor o igual a la fecha actual."
            })
        
        # validate end_date could not be lower to start_date
        if end_date and start_date and end_date < start_date:
            raise serializers.ValidationError({
                "error": "La fecha de terminó no puede ser menor a la fecha de inicio de la tarea."
            })
        return data