from django.forms import ValidationError
from rest_framework import serializers
from .models import Task
from datetime import datetime

class RegisterTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'account_id','title', 'description', 'status', 'priority', 'start_date', 'end_date', 'projection_id']
        extra_kwargs = {
            'id': {'read_only': True},
            'account_id': {'read_only': True}
        }

    def create(self, validated_data):
        # Extract account ID from the JWT token payload
        request = self.context.get('request')
        
        # Assuming the user_id is in the JWT token
        account_id = request.auth.get('user_id') if request.auth else request.user.id
        
        # Add the account_id to the validated data
        validated_data['account_id'] = account_id
        
        # Create and return the Task instance
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Ensure the account_id cannot be changed during update
        validated_data['account_id'] = instance.account_id

        # Apply validation logic for dates
        self.validate(validated_data)
        
        # Update the Task instance
        return super().update(instance, validated_data)

    def validate(self, data):
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        
        # validate end_date could not be lower to start_date
        if end_date and start_date and end_date < start_date:
            raise serializers.ValidationError("La fecha de terminó no puede ser menor a la fecha actual.")
        return data
    
# serializer to get all task from an user
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"