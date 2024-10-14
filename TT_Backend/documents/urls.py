from django.urls import path
from .views import DocumentListCreateAPIView, DocumentUploadAPIView, DocumentReplace, DocumentDeleteAPIView

urlpatterns = [
    path('api/v1/document/upload/', DocumentUploadAPIView.as_view(), name='document-upload'),
    path('api/v1/documents/<str:account_id>/', DocumentListCreateAPIView.as_view(), name='document-list'),
    path('api/v1/document/<str:id>/replace/', DocumentReplace.as_view(), name='document-replace'),
    path('api/v1/document/<str:id>/delete/', DocumentDeleteAPIView.as_view(), name='document-delete'),
]
