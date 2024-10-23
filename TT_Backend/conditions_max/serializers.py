from rest_framework import serializers
from .models import Conditions_Max
import json


class Conditions_MaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conditions_Max
        fields = ['id', 'configuracion']

    def validate_configuracion(self, value):
        # Si el valor es un string, intentamos convertirlo a un diccionario
        if isinstance(value, str):
            try:
                value = json.loads(value)  # Convertir string a JSON (dict)
            except json.JSONDecodeError:
                raise serializers.ValidationError("El campo 'configuracion' contiene JSON inválido.")
        
        if not isinstance(value, dict):
            raise serializers.ValidationError("El campo 'configuracion' debe ser un diccionario.")
        
        return value