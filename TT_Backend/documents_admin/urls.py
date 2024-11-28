from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from django.contrib import admin
from .views import delete_gaceta_files

urlpatterns = [
    path('admin/', admin.site.urls),
    path('docs/delete/', delete_gaceta_files, name='delete_gaceta_files'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
