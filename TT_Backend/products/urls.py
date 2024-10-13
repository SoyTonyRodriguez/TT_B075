from django.urls import path
from .views import RegisterProductView, GetProductsView, EditProductView, DeleteProductView

urlpatterns = [
    path('api/v1/product/register/', RegisterProductView.as_view(), name='product_register'),
    path('api/v1/products/<str:account_id>/', GetProductsView.as_view(), name='products_list'),
    path('api/v1/products/<str:id>/edit/', EditProductView.as_view(), name='edit_product'),
    path('api/v1/products/<str:id>/delete/', DeleteProductView.as_view(), name='delete_product'),
]