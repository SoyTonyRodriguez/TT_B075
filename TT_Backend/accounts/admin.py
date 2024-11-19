from django.contrib import admin
from .models import Accounts

# Register your models here.
admin.site.register(Accounts)

from django.contrib import admin
from django.contrib.auth.models import Group
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken

# Desregistrar el modelo Group
admin.site.unregister(Group)

# Desregistrar los modelos de la lista negra de tokens
admin.site.unregister(BlacklistedToken)
admin.site.unregister(OutstandingToken)
