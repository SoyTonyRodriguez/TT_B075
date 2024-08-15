from rest_framework import viewsets
from .serilalizer import UsersSerializer
from django.contrib.auth.models import User

# Create your views here.
class UserView(viewsets.ModelViewSet):
  serializer_class = UsersSerializer
  queryset = User.objects.all()