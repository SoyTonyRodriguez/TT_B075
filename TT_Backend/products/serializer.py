from django.forms import ValidationError
from rest_framework import serializers
from .models import Products
from datetime import datetime

class RegisterProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ['id', 'account_id', 'function', 'activity', 'role', 'scope', 
                  'tasks', 'documents_required', 'documents_number', 'documents_uploaded', 'units', 'color', 'progress', 'projection_id']
        extra_kwargs = {
            'id': {'read_only': True},
            'account_id': {'read_only': True},
            'tasks': {'required': False},
            'documents_uploaded': {'required': False}
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
        instance.function = validated_data.get('function', instance.function)
        instance.activity = validated_data.get('activity', instance.activity)
        instance.role = validated_data.get('role', instance.role)
        instance.scope = validated_data.get('scope', instance.scope)
        instance.documents_required = validated_data.get('documents_required', instance.documents_required)
        instance.progress = validated_data.get('progress', instance.progress)  # Ensure progress is updated
        instance.units = validated_data.get('units', instance.units)
        instance.color = validated_data.get('color', instance.color)
        instance.projection_id = validated_data.get('projection_id', instance.projection_id)
        instance.documents_uploaded = validated_data.get('documents_uploaded', instance.documents_uploaded)
        
        # Manejar la actualización de la lista de tareas
        new_tasks = validated_data.get('tasks', [])
        if new_tasks:
            # Evitar sobrescribir las tareas, en lugar de eso, agregar nuevas
            instance.tasks = list(set(instance.tasks + new_tasks))  # Evitar duplicados
        instance.save()

        new_documents = validated_data.get('documents_uploaded', [])
        if new_documents:
            instance.documents_uploaded = list(set(instance.documents_uploaded + new_documents))
        instance.save()

        return instance
    
    # def validate(self, data):
    #     start_date = data.get('start_date')
    #     end_date = data.get('end_date')
    #     if end_date and start_date and end_date < start_date:
    #         raise serializers.ValidationError("La fecha de término no puede ser menor a la fecha de inicio.")
    #     return data
    
# serializer to get all task from an user
class ProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Products
        fields = "__all__"