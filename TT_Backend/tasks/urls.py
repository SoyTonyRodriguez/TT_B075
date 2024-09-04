from django.urls import path, include
from .views import RegisterTaskView, GetTasksView, EditTaskView, DeleteTaskView

urlpatterns = [
    path('api/v1/task/register/', RegisterTaskView.as_view(), name='task_register'),
    path('api/v1/tasks/<str:account_id>/', GetTasksView.as_view(), name='tasks_list'),
    path('api/v1/tasks/<str:id>/edit/', EditTaskView.as_view(), name='edit_task'),
    path('api/v1/tasks/<str:id>/delete/', DeleteTaskView.as_view(), name='delete_task'),
]