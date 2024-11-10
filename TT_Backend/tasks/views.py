from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework import status
from rest_framework.exceptions import PermissionDenied

from .serializer import RegisterTaskSerializer, TaskSerializer
from .models import Task
from products.models import Products
# Create your views here.

from django.db.models.signals import post_save, post_delete
from products.signals import update_product_check
class RegisterTaskView(APIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    permission_classes = (IsAuthenticated,)
    queryset = Task.objects.all()
    serializer_class = RegisterTaskSerializer

    def post(self, request):
        print(request.data)
        serializer = RegisterTaskSerializer(data=request.data, context={'request': request})
                # Desconectar la señal temporalmente si es un PATCH
        if self.request.method == 'POST':
            post_save.disconnect(update_product_check, sender=Products)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # if self.request.method == 'POST':
        #     post_save.connect(update_product_check, sender=Products)
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
        
        # Desconectar la señal temporalmente si es un PATCH
        if self.request.method == 'PATCH':
            post_save.disconnect(update_product_check, sender=Products)
            post_save.disconnect(update_product_check, sender=Products)
        
        if self.request.method == 'OPTIONS':
            post_save.disconnect(update_product_check, sender=Products)
            post_delete.disconnect(update_product_check, sender=Products)
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
                # Desconectar la señal temporalmente si es un PATCH
        if self.request.method == 'DELETE':
            post_save.disconnect(update_product_check, sender=Products)
            post_delete.disconnect(update_product_check, sender=Products)
        
        if self.request.method == 'OPTIONS':
            post_save.disconnect(update_product_check, sender=Products)
            post_delete.disconnect(update_product_check, sender=Products)

        if self.request.method == 'PATCH':
            post_save.disconnect(update_product_check, sender=Products)
            post_delete.disconnect(update_product_check, sender=Products)
        
        if self.request.method == 'GET':
            post_save.disconnect(update_product_check, sender=Products)
            post_delete.disconnect(update_product_check, sender=Products)


        instance.delete()