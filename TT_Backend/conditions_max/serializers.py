from rest_framework import serializers
from .models import Conditions_Max
import collections
import json

class Conditions_MaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conditions_Max
        fields = ['id', 'configuracion']

    def to_representation(self, instance):
        """
        Convertir OrderedDict a dict para una respuesta más legible.
        """
        data = super().to_representation(instance)
        data['configuracion'] = self._convert_to_dict(data['configuracion'])
        return data

    def _convert_to_dict(self, value):
        """
        Recursivamente convierte cualquier OrderedDict a dict.
        """
        if isinstance(value, collections.OrderedDict):
            return {k: self._convert_to_dict(v) for k, v in value.items()}
        elif isinstance(value, list):
            return [self._convert_to_dict(v) for v in value]
        return value

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