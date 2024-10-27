from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Categories
from .serializers import CategorySerializer
from django.shortcuts import get_object_or_404

class CategoryView(APIView):

    def get(self, request, pk=None):
        if pk:
            proyeccion = get_object_or_404(Categories, pk=pk)
            serializer = CategorySerializer(proyeccion)
        else:
            proyecciones = Categories.objects.all()
            serializer = CategorySerializer(proyecciones, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        proyeccion = get_object_or_404(Categories, pk=pk)
        serializer = CategorySerializer(proyeccion, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
