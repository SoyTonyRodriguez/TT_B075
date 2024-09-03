from rest_framework import routers
from django.urls import path, include
from accounts import views
from .views import RegisterAccountsView, CustomTokenObtainPairView, CustomTokenRefreshView, AccountView, TaskViewSet

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# api versioning
router = routers.DefaultRouter()
router.register(r'accounts', views.AccountsView, 'accounts')
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('api/v1/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/login/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/register/', RegisterAccountsView.as_view()),
    path('api/v1/account/<str:id>/', AccountView.as_view(), name='user_detail'),

]
