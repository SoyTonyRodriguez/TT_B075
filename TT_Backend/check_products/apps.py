from django.apps import AppConfig


class CheckProductsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'check_products'

    # def ready(self):
    #     import check_products.signals
