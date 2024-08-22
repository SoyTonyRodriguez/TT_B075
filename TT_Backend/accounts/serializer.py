from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Accounts
from rest_framework.exceptions import ValidationError

class AccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = ['id', 'name', 'email', 'password', 'date_joined', 'category', 'employee_number']
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True},
        }
    def create(self, validated_data):
        # Hash the password before saving
        validated_data['password'] = make_password(validated_data.get('password'))
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # If the password is being updated, hash it before saving
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data.get('password'))
        return super().update(instance, validated_data)
