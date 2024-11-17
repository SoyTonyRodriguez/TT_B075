from django.db.models.signals import post_delete
from django.dispatch import receiver
from products.models import Products
from .models import ProductCheck
from accounts.models import Accounts

@receiver(post_delete, sender=Products)
def update_product_check_on_delete(sender, instance, **kwargs):
    # Verificar si el campo progress es 100
    if instance.progress == 100:
        return  # No ejecutar la señal si el progreso es 100

    account_id = instance.account_id
    activity_name = instance.activity
    category_name = instance.function
    units = instance.units

    # Buscar el ProductCheck asociado
    try:
        product_check = ProductCheck.objects.get(account_id=account_id)
    except ProductCheck.DoesNotExist:
        return  # No hay ProductCheck asociado, no es necesario realizar cambios

    # Verificar si la categoría y la actividad existen en el ProductCheck
    if category_name in product_check.categories:
        if activity_name in product_check.categories[category_name]:
            # Reducir valores en la actividad
            product_check.categories[category_name][activity_name]['length'] -= 1
            product_check.categories[category_name][activity_name]['up'] -= units

            # Eliminar la actividad si su `length` llega a 0
            if product_check.categories[category_name][activity_name]['length'] <= 0:
                del product_check.categories[category_name][activity_name]

        # Recalcular el total de la categoría
        total_category_up = sum(
            activity.get('up', 0) for key, activity in product_check.categories[category_name].items()
            if isinstance(activity, dict)
        )
        product_check.categories[category_name]['total'] = total_category_up

        # Eliminar la categoría si ya no tiene actividades
        if not product_check.categories[category_name]:
            del product_check.categories[category_name]

    # Recalcular el total general de 'up'
    total_up = sum(
        category.get('total', 0) for key, category in product_check.categories.items()
        if isinstance(category, dict) and 'total' in category
    )
    product_check.categories['total_up'] = total_up

    # Actualizar el total en la cuenta
    try:
        account = Accounts.objects.get(id=account_id)
        account.units_projection = total_up
        account.save()
    except Accounts.DoesNotExist:
        pass  # Si la cuenta no existe, no se realiza ninguna acción

    # Guardar los cambios en el ProductCheck
    product_check.save()
