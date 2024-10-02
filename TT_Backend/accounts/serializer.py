from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Accounts
from pymongo import MongoClient
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth import authenticate


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = ['id', 'name', 'email', 'password', 'date_joined', 'category', 'employee_number', 'is_staff']
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True},
        }

    # # Use validate_<field_name> methods to add custom validation logic.
    def validate_email(self, value):
        print(f"self.instance --> {self.instance}")

        # Do the validation only when an account is created and the email is updated
        if self.instance is None or self.instance.email != value:
            client = MongoClient(settings.MONGO_CONNECTION_STRING)
            db = client[settings.DB_CLIENT]

            # Check manually if email is already in use
            if db.accounts.find_one({"email": value}):
                raise serializers.ValidationError("El email ya ha sido registrado")
            return value

    # Create in django it's the same POST method
    def create(self, validated_data):
        # Hash the password before saving
        validated_data['password'] = make_password(validated_data.get('password'))
        return super().create(validated_data)
    
    # Update in django it's the same PUT or PATCH methods
    def update(self, instance, validated_data):
        print(f"validated_data {validated_data}")
        # If the password is being updated, hash it before saving
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data.get('password'))
        return super().update(instance, validated_data)

# serializer to get an user with an id
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = "__all__"

# Custom serializer to get a token
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        print(attrs)
        email = attrs.get('email')
        password = attrs.get('password')

        # Connect to MongoDB and find the account by email
        client = MongoClient(settings.MONGO_CONNECTION_STRING)
        db = client[settings.DB_CLIENT]
        account = db.accounts.find_one({"email": email})

        # Check if the account exists
        if account is None:
            raise serializers.ValidationError('Correo y/o contraseña inválidos\nIntente nuevamente')

        # Authenticate the user
        user = authenticate(id=account['id'], password=password)

        if user is None:
            raise serializers.ValidationError('Correo y/o contraseña inválidos\nIntente nuevamente')
        
        # Manually generate tokens
        refresh = RefreshToken.for_user(user)
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            #'email': user.email,
        }
        return data

# Custom serializer to get an refresh token
class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        refresh_token = attrs.get('refresh')

        # Decode and validate the refresh token
        try:
            refresh = RefreshToken(refresh_token)
        except TokenError as e:
            raise serializers.ValidationError({'refresh': 'Token is invalid or expired'})

        # Manually generate a new access token
        access_token = refresh.access_token

        # Prepare the data with the new access token
        data = {
            'access': str(access_token),
        }

        # Optionally include the new refresh token if you want to rotate it
        data['refresh'] = str(refresh)

        # Add any custom logic here, like including user-specific data
        # For example, you could include the user's email or other information:
        #data['email'] = refresh.get('user_id')  # Assuming user_id is available

        return data