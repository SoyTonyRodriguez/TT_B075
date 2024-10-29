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
        category_name = product.function

        # Verificar si ya existe un ProductCheck para la cuenta
        product_check, created = ProductCheck.objects.get_or_create(account_id=account_id)

        # Inicializar la categoría si no existe
        if category_name not in product_check.categories:
            product_check.categories[category_name] = {}

        # Inicializar la actividad si no existe
        if activity_name not in product_check.categories[category_name]:
            product_check.categories[category_name][activity_name] = {
                'length': 0,
                'up': 0
            }

        # Actualizar los valores de la actividad
        product_check.categories[category_name][activity_name]['length'] += 1
        product_check.categories[category_name][activity_name]['up'] += units

        # Calcular el total de 'up' para la categoría
        total_category_up = sum(
            activity.get('up', 0) for key, activity in product_check.categories[category_name].items()
            if isinstance(activity, dict)
        )
        product_check.categories[category_name]['total'] = total_category_up

        # Calcular el total general de 'up' para todas las categorías
        total_up = sum(
            category.get('total', 0) for key, category in product_check.categories.items()
            if isinstance(category, dict) and 'total' in category
        )
        product_check.categories['total_up'] = total_up

        # Guardar los cambios en el ProductCheck
        product_check.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class GetProductCheckView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, account_id):
        try:
            product_check = ProductCheck.objects.get(account_id=account_id)
            return Response({
                "id": product_check.id,
                "account_id": product_check.account_id,
                **product_check.categories
            }, status=status.HTTP_200_OK)
        except ProductCheck.DoesNotExist:
            # Retornar un objeto vacío si no se encuentra el ProductCheck
            return Response({}, status=status.HTTP_200_OK)