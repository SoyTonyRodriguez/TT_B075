from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

def generate_account_id():
    return 'acc_' + str(uuid.uuid4())

# Nota para TONY
# If you had already executed any migrations before 
# making the UUID change, it is crucial to delete the tables and recreate the migrations.
# Ref. https://stackoverflow.com/questions/32311048/change-the-type-of-user-id-to-uuid
class Accounts(AbstractUser):
    # Override the default `id` field with a custom account ID
    id = models.CharField(max_length=255, primary_key=True, default=generate_account_id, editable=False, unique=True)

    # Additional fields
    category = models.CharField(max_length=100, blank=False)
    employee_number = models.CharField(max_length=255, blank=False)

    class Meta:
        db_table = 'accounts'

    def __str__(self):
        return self.username
