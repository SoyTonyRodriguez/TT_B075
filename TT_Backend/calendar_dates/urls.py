from django.urls import path, include
from .views import RegisterDate, GetAllDates, GetActivitiesByStartDate, CheckAndSendEmailsView

urlpatterns = [
    path('api/v1/calendar_date/register/', RegisterDate.as_view(), name='date_register'),
    path('api/v1/calendar_date/', GetAllDates.as_view(), name='tasks_list'),
    path('api/v1/calendar_date/start_date/<str:start_date>/', GetActivitiesByStartDate.as_view(), name='activities_by_start_date'),
    path('api/v1/check-send-emails/', CheckAndSendEmailsView.as_view(), name='check_send_emails'),
]