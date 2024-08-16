from rest_framework import viewsets
from .serializer import AccountsSerializer
from .models import Accounts

# Create your views here.
class AccountsView(viewsets.ModelViewSet):
  serializer_class = AccountsSerializer
  queryset = Accounts.objects.all()