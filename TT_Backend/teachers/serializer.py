from rest_framework import serializers
from .models import Teachers

class TeachersSerializer(serializers.ModelSerializer):
  class Meta:
    model = Teachers
    fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'date_joined', 'category', 'employee_number']