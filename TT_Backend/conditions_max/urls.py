from django.urls import path
from .views import ActividadListCreateView

urlpatterns = [
    path('api/v1/max_conditions/', ActividadListCreateView.as_view(), name='actividad-list-create'),
]
