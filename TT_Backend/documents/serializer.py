from rest_framework import serializers
from .models import Document

class RegisterDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'file_name', 'file_type', 'size', 'account_id', 'projection_id', 'file']
        extra_kwargs = {
            'id': {'read_only': True},
            'account_id': {'read_only': True},
            'upload_date': {'read_only': True}
        }
    
    def create(self, validated_data):
        request = self.context.get('request')
        account_id = request.auth.get('user_id') if request.auth else request.user.id
        validated_data['account_id'] = account_id
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        # Ensure the account_id cannot be changed during update
        validated_data['account_id'] = instance.account_id

        # Apply validation logic for dates
        self.validate(validated_data)
        
        # Update the Task instance
        return super().update(instance, validated_data)

    def validate(self, data):
        # Agrega validaciones personalizadas si es necesario
        if 'file' not in data:
            raise serializers.ValidationError("Debe subir un archivo.")
        return data

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"
