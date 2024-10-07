from django.forms import ValidationError
from rest_framework import serializers
from .models import Projection
from datetime import datetime

class RegisterProjectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projection
        fields = ['id', 'account_id', 'function', 'activity', 'role', 'scope', 
                  'tasks', 'documents_required', 'start_date', 'end_date', 'units', 'priority']
        extra_kwargs = {
            'id': {'read_only': True},
            'account_id': {'read_only': True},
            'tasks': {'required': False}
        }
    
    def create(self, validated_data):
        request = self.context.get('request')
        account_id = request.auth.get('user_id') if request.auth else request.user.id
        validated_data['account_id'] = account_id
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        # Validar que el usuario que intenta actualizar sea el dueño de la proyección
        validated_data['account_id'] = instance.account_id
        self.validate(validated_data)

        # Actualizar otros campos normalmente
        instance.function = validated_data.get('function', instance.function)
        instance.activity = validated_data.get('activity', instance.activity)
        instance.role = validated_data.get('role', instance.role)
        instance.scope = validated_data.get('scope', instance.scope)
        instance.documents_required = validated_data.get('documents_required', instance.documents_required)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)

        # Manejar la actualización de la lista de tareas
        new_tasks = validated_data.get('tasks', [])
        if new_tasks:
            # Evitar sobrescribir las tareas, en lugar de eso, agregar nuevas
            instance.tasks = list(set(instance.tasks + new_tasks))  # Evitar duplicados
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