from django.urls import path, include
from .views import RegisterTaskView

urlpatterns = [
    path('api/v1/task/register/', RegisterTaskView.as_view(), name='task_register'),
]