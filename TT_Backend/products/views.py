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

from django.db.models.signals import post_save, post_delete
from products.signals import update_product_check

class EditProductView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RegisterProductSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Products.objects.filter(account_id=self.request.user.id)

    def perform_update(self, serializer):
        product = self.get_object()
        if product.account_id != self.request.user.id:
            raise PermissionDenied("You do not have permission to edit this product.")

        # Desconectar la señal temporalmente si es un PATCH
        if self.request.method == 'PATCH':
            post_save.disconnect(update_product_check, sender=Products)

        serializer.save()

        # Reconectar la señal
        if self.request.method == 'PATCH':
            post_save.connect(update_product_check, sender=Products)

class DeleteProductView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RegisterProductSerializer
    lookup_field = 'id'

    def get_queryset(self):
        # Retornar solo los productos del usuario autenticado
        return Products.objects.filter(account_id=self.request.user.id)

    def perform_destroy(self, instance):
        # Verificar que el usuario tenga permiso para eliminar el producto
        if instance.account_id != self.request.user.id:
            raise PermissionDenied("You do not have permission to delete this product.")

        # if self.request.method == 'DELETE':
        #     post_save.disconnect(update_product_check, sender=Products)
        #     post_delete.disconnect(update_product_check, sender=Products)


        # Desconectar la señal temporalmente si es un PATCH
        if self.request.method == 'DELETE':
            post_save.disconnect(update_product_check, sender=Products)

        # Eliminar el producto
        instance.delete()

        # Reconectar la señal
        if self.request.method == 'DELETE':
            post_save.connect(update_product_check, sender=Products)

