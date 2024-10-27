from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from .models import Products
from projections.models import Projection
from check_products.models import ProductCheck

# Variable global para almacenar el projection_id anterior
old_product_id = None

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

@receiver(post_delete, sender=Products)
def remove_product_from_projections(sender, instance, **kwargs):
    # Buscar todas las proyecciones que contienen la tarea eliminada
    product = Projection.objects.filter(tasks__contains=instance.id)
    for projection in product:
        # Eliminar el ID de la tarea de la lista
        projection.products.remove(instance.id)
        # Guardar los cambios en la proyección
        projection.save()

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

@receiver(post_save, sender=Products)
def update_product_check(sender, instance, **kwargs):
    account_id = instance.account_id
    activity_name = instance.activity
    units = instance.units

    # Buscar o crear un ProductCheck para la cuenta
    product_check, created = ProductCheck.objects.get_or_create(account_id=account_id)

    # Actualizar las actividades en ProductCheck
    if activity_name in product_check.activities:
        product_check.activities[activity_name]['length'] += 1
        product_check.activities[activity_name]['up'] += units
    else:
        product_check.activities[activity_name] = {
            'length': 1,
            'up': units
        }

    product_check.save()  # Guardar los cambios