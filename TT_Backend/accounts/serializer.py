from rest_framework import serializers
from .models import Accounts

class AccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'date_joined', 'category', 'employee_number']

