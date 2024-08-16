from rest_framework import routers
from django.urls import path, include
from teachers import views

# api versioning
router = routers.DefaultRouter()
router.register(r'teachers', views.TeacherView, 'teachers')

urlpatterns = [
  path('api/v1/', include(router.urls))
]
