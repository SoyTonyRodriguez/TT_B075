from rest_framework import viewsets
from .serializer import RegisterSerializer, CustomTokenObtainPairSerializer, CustomTokenRefreshSerializer, AccountSerializer
from .models import Accounts
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Create your views here.
class AccountsView(viewsets.ModelViewSet):
  permission_classes = (IsAuthenticated,)
  serializer_class = RegisterSerializer
  queryset = Accounts.objects.all()

class RegisterAccountsView(APIView):
  parser_classes = [JSONParser, MultiPartParser, FormParser]
  permission_classes = [AllowAny]  # Allow access to all users
  
  def post(self, request):
    print(request.data)
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)

class AccountView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, id, format=None):
        try:
            user = Accounts.objects.get(id=id)  # Assuming 'id' is the username
            serializer = AccountSerializer(user)
            return Response(serializer.data)
        except Accounts.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer