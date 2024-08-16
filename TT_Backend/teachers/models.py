from django.contrib.auth.models import AbstractUser
from django.db import models

class Teachers(AbstractUser):
    # Add additional fields here
    category = models.CharField(max_length=100, blank=False)
    employee_number = models.CharField(max_length=255, blank=False)

    class Meta:
        db_table = 'teachers'  # This changes the table name to 'teachers'

    def __str__(self):
        return self.username
