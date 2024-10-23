from .models import ProductCheck
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework import status
from products.serializer import RegisterProductSerializer

class RegisterProductView(APIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = RegisterProductSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        product = serializer.save()

        # Obtener el account_id y la actividad
        account_id = product.account_id
        activity_name = product.activity
        units = product.units

        # Verificar si ya existe un ProductCheck para la cuenta
        product_check, created = ProductCheck.objects.get_or_create(account_id=account_id)

        # Actualizar o agregar la actividad dentro de 'activities'
        if activity_name in product_check.activities:
            product_check.activities[activity_name]['length'] += 1
            product_check.activities[activity_name]['up'] += units
        else:
            product_check.activities[activity_name] = {
                'length': 1,
                'up': units
            }

        product_check.save()  # Guardar los cambios

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class GetProductCheckView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, account_id):
        try:
            product_check = ProductCheck.objects.get(account_id=account_id)
            return Response({
                "id": product_check.id,
                "account_id": product_check.account_id,
                "activities": product_check.activities
            }, status=status.HTTP_200_OK)
        except ProductCheck.DoesNotExist:
            return Response(
                {"detail": "Product Check not found."},
                status=status.HTTP_404_NOT_FOUND
            )