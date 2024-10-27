from django.urls import path
from .views import RegisterProductView, GetProductCheckView

urlpatterns = [
    path('api/v1/product_check/register/', RegisterProductView.as_view(), name='register-product'),
    path('api/v1/product_check/<str:account_id>/', GetProductCheckView.as_view(), name='get-product-check'),
]
