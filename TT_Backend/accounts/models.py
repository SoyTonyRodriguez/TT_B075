import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.translation import gettext_lazy as _
from pymongo import MongoClient
from rest_framework.exceptions import ValidationError


class AccountManager(BaseUserManager):
 def create_user(self, email, password=None, **extra_fields):
    if not email:
        raise ValueError(_("The Email field must be set"))
    email = self.normalize_email(email)
    user = self.model(email=email, **extra_fields)
    user.set_password(password)
    user.save(using=self._db)
    return user
 def create_superuser(self, email, password=None, **extra_fields):
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)
    return self.create_user(email, password, **extra_fields)


def generate_account_id():
    return 'acc_' + str(uuid.uuid4())

# Nota para TONY
# If you had already executed any migrations before 
# making the UUID change, it is crucial to delete the tables and recreate the migrations.
# Ref. https://stackoverflow.com/questions/32311048/change-the-type-of-user-id-to-uuid
class Accounts(AbstractBaseUser):
  # Override the default `id` field with a custom account ID
  id = models.CharField(
      max_length=40, 
      primary_key=True, 
      default=generate_account_id, 
      editable=False
  )
  email = models.EmailField(_('email address'), unique=False)
  first_name = models.CharField(_('first name'), max_length=30, blank=True)
  last_name = models.CharField(_('last name'), max_length=30, blank=True)
  is_active = models.BooleanField(_('active'), default=True)
  is_staff = models.BooleanField(_('staff status'), default=False)
  date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
  name = models.CharField(_('full name'), max_length=100, blank=False)
  category = models.CharField(max_length=100, blank=False)
  employee_number = models.CharField(max_length=255, blank=False)

  objects = AccountManager()

  USERNAME_FIELD = 'id'
  REQUIRED_FIELDS = []

  class Meta:
    verbose_name = _('account')
    verbose_name_plural = _('accounts')

  def save(self, *args, **kwargs):
    client = MongoClient('mongodb://localhost:27017/')
    db = client['TT_DB']
    collection = db['accounts_accounts']
    # Manually check if email is unique
    if collection.find_one({"email": self.email}):
        raise ValidationError({"email": "El email ya ha sido registrado"})
    
    # If email is unique, save using Djongo
    super(Accounts, self).save(*args, **kwargs)

  def __str__(self):
    return self.email
