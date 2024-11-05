from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Conditions_Max
from .serializers import Conditions_MaxSerializer

class ActividadListCreateView(APIView):
    """
    Vista para obtener y actualizar la configuración de actividades.
    """

    def get(self, request):
        config = Conditions_Max.objects.first()
        if not config:
            return Response({"detail": "No se encontró ninguna configuración."}, status=status.HTTP_404_NOT_FOUND)

        serializer = Conditions_MaxSerializer(config)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        config = Conditions_Max.objects.first()
        if config:
            serializer = Conditions_MaxSerializer(config, data=request.data)
        else:
            serializer = Conditions_MaxSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)