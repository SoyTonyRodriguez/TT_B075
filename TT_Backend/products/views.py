from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework import status
from rest_framework.exceptions import PermissionDenied

from .serializer import RegisterProductSerializer, ProductSerializer
from .models import Products

# Create your views here.
class RegisterProductView(APIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    permission_classes = (IsAuthenticated,)
    queryset = Products.objects.all()
    serializer_class = RegisterProductSerializer

    def post(self, request):
        print(request.data)
        serializer = RegisterProductSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
class GetProductsView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProductSerializer

    def get_queryset(self):
        account_id = self.kwargs['account_id']
        return Products.objects.filter(account_id=account_id)

class EditProductView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RegisterProductSerializer
    lookup_field = 'id'

    def get_queryset(self):
        # Restrict the queryset to only the projections that belong to the authenticated user's account
        return Products.objects.filter(account_id=self.request.user.id)
    
    def perform_update(self, serializer):
        product = self.get_object()
        if product.account_id != self.request.user.id:
            raise PermissionDenied("You do not have permission to edit this product.")
        serializer.save()

class DeleteProductView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RegisterProductSerializer
    lookup_field = 'id'

    def get_queryset(self):
        # Only return projections that belong to the authenticated user
        return Products.objects.filter(account_id=self.request.user.id)
    
    def perform_destroy(self, instance):
        # Check if the projection belongs to the authenticated user
        if instance.account_id != self.request.user.id:
            raise PermissionDenied("You do not have permission to delete this product.")
        instance.delete()