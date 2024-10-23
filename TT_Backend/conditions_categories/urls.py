from django.urls import path
from .views import CategoryView

urlpatterns = [
    path('api/v1/category_conditions/', CategoryView.as_view()),  # Listar y crear
]
