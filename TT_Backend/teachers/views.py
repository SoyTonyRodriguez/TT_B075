from rest_framework import viewsets
from .serializer import TeachersSerializer
from .models import Teachers

# Create your views here.
class TeacherView(viewsets.ModelViewSet):
  serializer_class = TeachersSerializer
  queryset = Teachers.objects.all()