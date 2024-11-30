from rest_framework import serializers
from .models import Document
import base64
import binascii

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
        request = self.context.get('request')

        # No permitir cambiar el account_id durante la actualización
        validated_data['account_id'] = instance.account_id

        # Obtener el archivo del request
        new_file = request.FILES.get('file', None)
        if new_file:
            # Leer los datos del nuevo archivo
            validated_data['file_name'] = new_file.name
            validated_data['file_type'] = new_file.content_type
            validated_data['size'] = new_file.size
            validated_data['file'] = new_file.read()
        else:
            # Si no hay un nuevo archivo, mantener los valores existentes
            validated_data['file_name'] = instance.file_name
            validated_data['file_type'] = instance.file_type
            validated_data['size'] = instance.size
            validated_data['file'] = instance.file

        # Obtener otros campos (si se proporcionan)
        projection_id = request.data.get('projection_id', instance.projection_id)
        activity = request.data.get('activity', instance.activity)
        validated_data['projection_id'] = projection_id
        validated_data['activity'] = activity

        # Actualizar el objeto
        return super().update(instance, validated_data)


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"
