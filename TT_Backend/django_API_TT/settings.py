"""
Django settings for django_API_TT project.

Generated by 'django-admin startproject' using Django 4.1.13.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
import environ
import os
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-xgfgrzmo%+$(c!f-2exu&s9x_bre07ue@=7$y2tlyw8@!@*&=&'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',    # To coneect backend and frontend
    'rest_framework', # To create API
    'rest_framework_simplejwt', # Create token authentication
    'rest_framework_simplejwt.token_blacklist', #  List of tokens that have been revoked or expired
    'accounts',
    'tasks',
    'calendar_dates',
    'projections',
    'products',
    'default_Projection_Dates',
    'documents',
    'conditions_categories'
]

# REST_FRAMEWORK settings (change the authentication for JWT)
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

# Settigs for JWT
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=120),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'django_API_TT.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'django_API_TT.wsgi.application'

MIGRATION_MODULES = {
    'token_blacklist': None,
}

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

# Local host conection
#DATABASES = {
#  'default': {
#      'ENGINE': 'djongo',
#      'NAME': 'TT_DB',  # Replace with your MongoDB database name
#      'host': 'localhost',  # Replace with your MongoDB host
#      'port': 27017,  # Replace with your MongoDB port
#  }
#}

# Cluster conection
DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'TT_DB',  # The name of your MongoDB database
        'CLIENT': {
            'host': 'mongodb+srv://rodriguezfloresantonioo:<db_password>@clustertt.txd45.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTT',
            'username': 'rodriguezfloresantonioo',  # Replace with your MongoDB username
            'password': 'FXue6Nm47gbDniW3',  # Replace with your MongoDB password
        }
    }
}

# Initialise environment variables
env = environ.Env()

# Specify the path to the database.env file
env_file = os.path.join(os.path.dirname(__file__), 'database.env')

environ.Env.read_env(env_file)  # Reads the .env file

# Example of getting the connection string
MONGO_CONNECTION_STRING = env('MONGO_CONNECTION_STRING')
DB_CLIENT = env('DB_CLIENT')

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

MEDIA_URL = '/docs/'  # La URL base para acceder a archivos subidos
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')  # Directorio donde se almacenarán los archivos

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Put the url from frontend here
CORS_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:8081",
  'http://192.168.100.97:8000',
  'http://192.168.100.97:8081',
  'http://0.0.0.0:8000',
]

ALLOWED_HOSTS = ["*"]
CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_ALLOW = True
CORS_ALLOW_ALL_ORIGINS = True

AUTH_USER_MODEL='accounts.Accounts'