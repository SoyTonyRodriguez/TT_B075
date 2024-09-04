from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework import status
from rest_framework.exceptions import PermissionDenied

from .serializer import RegisterTaskSerializer, TaskSerializer
from .models import Task

# Create your views here.
class RegisterTaskView(APIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    permission_classes = (IsAuthenticated,)
    queryset = Task.objects.all()
    serializer_class = RegisterTaskSerializer

    def post(self, request):
        print(request.data)
        serializer = RegisterTaskSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class GetTasksView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = TaskSerializer

    def get_queryset(self):
        account_id = self.kwargs['account_id']
        return Task.objects.filter(account_id=account_id)
    
class EditTaskView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RegisterTaskSerializer
    lookup_field = 'id'

    def get_queryset(self):
        # Restrict the queryset to only the tasks that belong to the authenticated user's account
        return Task.objects.filter(account_id=self.request.user.id)

    def perform_update(self, serializer):
        # Ensure that the task belongs to the authenticated user's account before updating
        task = self.get_object()
        if task.account_id != self.request.user.id:
            raise PermissionDenied("You do not have permission to edit this task.")
        serializer.save()

class DeleteTaskView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RegisterTaskSerializer
    lookup_field = 'id'

    def get_queryset(self):
        # Only return tasks that belong to the authenticated user
        return Task.objects.filter(account_id=self.request.user.id)

    def perform_destroy(self, instance):
        # Check if the task belongs to the authenticated user
        if instance.account_id != self.request.user.id:
            raise PermissionDenied("You do not have permission to delete this task.")
        instance.delete()