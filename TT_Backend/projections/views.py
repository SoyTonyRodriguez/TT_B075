from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework import status
from rest_framework.exceptions import PermissionDenied

from .serializer import RegisterProjectionSerializer, ProjectionSerializer
from .models import Projection

# Create your views here.
class RegisterProjectionView(APIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    permission_classes = (IsAuthenticated,)
    queryset = Projection.objects.all()
    serializer_class = RegisterProjectionSerializer

    def post(self, request):
        print(request.data)
        serializer = RegisterProjectionSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
class GetProjectionsView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProjectionSerializer

    def get_queryset(self):
        account_id = self.kwargs['account_id']
        return Projection.objects.filter(account_id=account_id)

class EditProjectionView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RegisterProjectionSerializer
    lookup_field = 'id'

    def get_queryset(self):
        # Restrict the queryset to only the projections that belong to the authenticated user's account
        return Projection.objects.filter(account_id=self.request.user.id)
    
    def perform_update(self, serializer):
        projection = self.get_object()
        if projection.account_id != self.request.user.id:
            raise PermissionDenied("You do not have permission to edit this projection.")
        serializer.save()

class DeleteProjectionView(DestroyAPIView):
    # Permitir acceso sin autenticación
    permission_classes = []  # O usar (AllowAny,) si necesitas una clase de permiso explícita
    serializer_class = RegisterProjectionSerializer
    lookup_field = 'id'

    def get_queryset(self):
        # Devolver todas las proyecciones sin restricciones
        return Projection.objects.all()

    def perform_destroy(self, instance):
        # Simplemente elimina la proyección
        print(f"Deleting projection: {instance.id}")
        instance.delete()