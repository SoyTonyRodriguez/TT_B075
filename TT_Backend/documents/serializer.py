from rest_framework import serializers
from .models import Document

class RegisterDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'file_name', 'file_type', 'size', 'account_id', 'projection_id', 'activity', 'file'] 
        extra_kwargs = {
            'id': {'read_only': True},
            'account_id': {'read_only': True},
            'upload_date': {'read_only': True}
        }
    
    def create(self, validated_data):
        request = self.context.get('request')
        file = request.FILES.get('file')  # Asegúrate de obtener el archivo correctamente

        if not file:
            raise serializers.ValidationError({"file": "Debe subir un archivo válido."})

        validated_data['file_name'] = file.name
        validated_data['file_type'] = file.content_type
        validated_data['size'] = file.size
        validated_data['projection_id'] = request.data.get('projection_id', None)
        validated_data['activity'] = request.data.get('activity', None)
        validated_data['file'] = file.read()  # Leer como binario

        account_id = request.auth.get('user_id') if request.auth else request.user.id
        validated_data['account_id'] = account_id

        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        # No permitir cambiar el account_id durante la actualización
        validated_data['account_id'] = instance.account_id

        # Reemplazar el archivo si se sube uno nuevo
        new_file = self.context.get('request').FILES.get('file', None)
        if new_file:
            validated_data['file_name'] = new_file.name
            validated_data['file_type'] = new_file.content_type
            validated_data['size'] = new_file.size
            validated_data['projection_id'] = new_file.projection_id
            validated_data['activity'] = new_file.activity
            validated_data['file'] = new_file.read()  # Lee el nuevo archivo

        # Actualiza el objeto
        return super().update(instance, validated_data)

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"
