from django.contrib import admin
from .models import DocumentsAdmin

@admin.register(DocumentsAdmin)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'uploaded_at')
    search_fields = ('title',)
    list_filter = ('title',)
