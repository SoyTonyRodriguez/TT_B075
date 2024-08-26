from rest_framework import routers
from django.urls import path, include
from accounts import views

from .views import RegisterAccountsView, CustomTokenObtainPairView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# api versioning
router = routers.DefaultRouter()
router.register(r'accounts', views.AccountsView, 'accounts')

urlpatterns = [
  path('api/v1/', include(router.urls)),
  path('api/v1/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('api/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('api/v1/register/', RegisterAccountsView.as_view()),
]
