from rest_framework import routers
from django.urls import path, include
from accounts import views

# api versioning
router = routers.DefaultRouter()
router.register(r'accounts', views.AccountsView, 'accounts')

urlpatterns = [
  path('api/v1/', include(router.urls))
]
