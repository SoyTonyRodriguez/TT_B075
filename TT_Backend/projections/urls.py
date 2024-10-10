from django.urls import path
from .views import RegisterProjectionView, GetProjectionsView, EditProjectionView, DeleteProjectionView

urlpatterns = [
    path('api/v1/projection/register/', RegisterProjectionView.as_view(), name='projection_register'),
    path('api/v1/projections/<str:id>/', GetProjectionsView.as_view(), name='projections_list'),
    path('api/v1/projections/<str:id>/edit/', EditProjectionView.as_view(), name='edit_projection'),
    path('api/v1/projections/<str:id>/delete/', DeleteProjectionView.as_view(), name='delete_projection'),
]