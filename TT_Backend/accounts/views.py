from rest_framework import viewsets
from .serializer import AccountsSerializer, CustomTokenObtainPairSerializer
from .models import Accounts

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
class AccountsView(viewsets.ModelViewSet):
  permission_classes = (IsAuthenticated,)
  serializer_class = AccountsSerializer
  queryset = Accounts.objects.all()

class RegisterAccountsView(APIView):
  parser_classes = [JSONParser, MultiPartParser, FormParser]
  permission_classes = [AllowAny]  # Allow access to all users
  
  def post(self, request):
    print(request.data)
    serializer = AccountsSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
  
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer