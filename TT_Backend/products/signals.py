from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from .models import Products
from projections.models import Projection
from check_products.models import ProductCheck
from accounts.models import Accounts

# Variable global para almacenar el projection_id anterior
old_product_id = None
@receiver(post_save, sender=Products)
def update_product_check(sender, instance, created, **kwargs):
    if created:
        print(f"Signal triggered for {instance.id}")  # Verificar si la señal se activa
        account_id = instance.account_id
        activity_name = instance.activity
        units = instance.units
        category_name = instance.function

        # Buscar o crear un ProductCheck para la cuenta
        product_check, _ = ProductCheck.objects.get_or_create(account_id=account_id)

        # Inicializar la categoría si no existe
        if category_name not in product_check.categories:
            product_check.categories[category_name] = {}

        # Inicializar la actividad si no existe
        if activity_name not in product_check.categories[category_name]:
            product_check.categories[category_name][activity_name] = {
                'length': 0,
                'up': 0
            }

        # Actualizar los valores de la actividad
        product_check.categories[category_name][activity_name]['length'] += 1
        product_check.categories[category_name][activity_name]['up'] += units

        # Calcular el total de 'up' para la categoría
        total_category_up = sum(
            activity.get('up', 0) for key, activity in product_check.categories[category_name].items()
            if isinstance(activity, dict)
        )
        product_check.categories[category_name]['total'] = total_category_up

        # Calcular el total general de 'up' para todas las categorías
        total_up = sum(
            category.get('total', 0) for key, category in product_check.categories.items()
            if isinstance(category, dict) and 'total' in category
        )
        product_check.categories['total_up'] = total_up

        account = Accounts.objects.get(id=account_id)
        account.units_projection = total_up
        account.save()

        # Guardar los cambios en el ProductCheck
        product_check.save()

@receiver(post_save, sender=Products)
def update_product_projection(sender, instance, created, **kwargs):
    # Si el producto es creado, revisa la longitud de products en Projection
    if created:
        try:
            projection = Projection.objects.get(id=instance.projection_id)
            # Si products está vacío, asigna el valor deseado a type
            if not projection.products:  # Verifica si products está vacío
                projection.type = instance.type  # O el campo que quieres usar
                projection.save()
                
            # Luego agrega el ID del producto a la lista de products en Projection
            # projection.products.append(instance.id)
            # projection.save()
        except Projection.DoesNotExist:
            print(f"Projection con ID {instance.projection_id} no existe.")

@receiver(pre_save, sender=Products)
def store_old_projection(sender, instance, **kwargs):
    global old_product_id
    # Obtener el valor previo del projection_id
    if instance.pk:  # Solo si es una actualización
        old_instance = Products.objects.filter(pk=instance.pk).first()
        if old_instance:
            old_product_id = old_instance.projection_id
        else:
            old_product_id = None

# @receiver(post_delete, sender=Products)
# def remove_product_from_projections(sender, instance, **kwargs):
#     # Buscar todas las proyecciones que contienen la tarea eliminada
#     product = Projection.objects.filter(tasks__contains=instance.id)
#     for projection in product:
#         # Eliminar el ID de la tarea de la lista
#         projection.products.remove(instance.id)
#         # Guardar los cambios en la proyección
#         projection.save()

@receiver(post_save, sender=Products)
def update_product_projection(sender, instance, created, **kwargs):
    global old_product_id
    new_product_id = instance.projection_id

    # Si la tarea es nueva, simplemente la añadimos a la nueva proyección
    if created:
        try:
            projection = Projection.objects.get(id=new_product_id)
            projection.products.append(instance.id)
            projection.save()
        except Projection.DoesNotExist:
            print(f"Product con ID {new_product_id} no existe.")
    else:
        # Si la proyección cambió
        if old_product_id != new_product_id:
            # Eliminar la tarea de la proyección anterior
            if old_product_id:
                try:
                    old_product = Projection.objects.get(id=old_product_id)
                    old_product.products.remove(instance.id)
                    old_product.save()
                except Projection.DoesNotExist:
                    print(f"Product con ID {old_product_id} no existe o ya fue eliminada.")

            # Añadir la tarea a la nueva proyección
            try:
                new_product = Projection.objects.get(id=new_product_id)
                new_product.products.append(instance.id)
                new_product.save()
            except Projection.DoesNotExist:
                print(f"Product con ID {new_product_id} no existe.")
    
    # Resetear el valor global old_projection_id después de usarlo
    old_product_id = None

