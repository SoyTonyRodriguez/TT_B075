from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from .serializer import RegisterTaskSerializer

from .models import Task

# Create your views here.
class RegisterTaskView(APIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    permission_classes = [AllowAny]  # Allow access to all users
    queryset = Task.objects.all()
    serializer_class = RegisterTaskSerializer

    def post(self, request):
        print(request.data)
        serializer = RegisterTaskSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)