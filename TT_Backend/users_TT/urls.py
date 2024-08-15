from rest_framework import routers
from django.urls import path, include
from users_TT import views

# api versioning
router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'users')

urlpatterns = [
  path('api/v1/', include(router.urls))
]
