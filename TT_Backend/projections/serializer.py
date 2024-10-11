from django.forms import ValidationError
from rest_framework import serializers
from .models import Projection
from datetime import datetime

class RegisterProjectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projection
        fields = ['id', 'account_id', 'products', 'start_date', 'end_date']
        extra_kwargs = {
            'id': {'read_only': True},
            'account_id': {'read_only': True},
            'products': {'required': False}
        }
    
    def create(self, validated_data):
        request = self.context.get('request')
        account_id = request.auth.get('user_id') if request.auth else request.user.id
        validated_data['account_id'] = account_id
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        # Validar que el usuario que intenta actualizar sea el dueño del producto
        validated_data['account_id'] = instance.account_id
        self.validate(validated_data)
        
        # Actualizar otros campos normalmente
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)

        # Manejar la actualización de la lista de tareas
        new_products = validated_data.get('products', [])
        if new_products:
            # Evitar sobrescribir las tareas, en lugar de eso, agregar nuevas
            instance.products = list(set(instance.products + new_products))  # Evitar duplicados
        instance.save()

        return instance
    
    def validate(self, data):
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        if end_date and start_date and end_date < start_date:
            raise serializers.ValidationError("La fecha de término no puede ser menor a la fecha de inicio.")
        return data
    
# serializer to get all task from an user
class ProjectionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Projection
        fields = "__all__"