from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ProductCheck
from products.models import Products

@receiver(post_save, sender=Products)
def update_product_check(sender, instance, **kwargs):
    account_id = instance.account_id
    activity_name = instance.activity
    units = instance.units

    # Obtener o crear un ProductCheck para la cuenta
    product_check, created = ProductCheck.objects.get_or_create(account_id=account_id)

    # Actualizar las actividades dentro de ProductCheck
    if activity_name in product_check.activities:
        product_check.activities[activity_name]['length'] += 1
        product_check.activities[activity_name]['up'] += units
    else:
        product_check.activities[activity_name] = {
            'length': 1,
            'up': units
        }

    # Guardar los cambios
    product_check.save()
