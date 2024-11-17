from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from projections.models import Projection
from accounts.models import Accounts
from products.models import Products

# Variable global para almacenar el projection_id anterior
old_projection_id = None

@receiver(pre_save, sender=Projection)
def store_old_projection(sender, instance, **kwargs):
    global old_projection_id
    # Obtener el valor previo del projection_id
    if instance.pk:  # Solo si es una actualización
        old_instance = Projection.objects.filter(pk=instance.pk).first()
        if old_instance:
            old_projection_id = old_instance.id  # Guardamos el ID de la proyección anterior
        else:
            old_projection_id = None

@receiver(post_delete, sender=Projection)
def remove_projection_from_account(sender, instance, **kwargs):
    # Eliminar la proyección del campo projection_id en el modelo Accounts
    try:
        account = Accounts.objects.get(id=instance.account_id)
        account.projection_id = ""  # Limpiamos el campo projection_id
        account.save()
    except Accounts.DoesNotExist:
        print(f"Account con ID {instance.account_id} no existe.")

@receiver(post_save, sender=Projection)
def update_account_projection(sender, instance, created, **kwargs):
    global old_projection_id

    # Si la proyección es nueva, simplemente la añadimos al account
    if created:
        try:
            account = Accounts.objects.get(id=instance.account_id)
            account.projection_id = instance.id  # Actualizamos el campo projection_id
            account.save()
        except Accounts.DoesNotExist:
            print(f"Account con ID {instance.account_id} no existe.")
    else:
        # Si la proyección cambió
        if old_projection_id != instance.id:
            # Actualizar el campo projection_id en el account correspondiente
            try:
                account = Accounts.objects.get(id=instance.account_id)
                account.projection_id = instance.id  # Actualizamos el campo projection_id
                account.save()
            except Accounts.DoesNotExist:
                print(f"Account con ID {instance.account_id} no existe.")

    # Resetear el valor global old_projection_id después de usarlo
    old_projection_id = None

@receiver(post_delete, sender=Products)
def remove_product_from_projections(sender, instance, **kwargs):
    # Buscar todas las proyecciones que contienen el producto eliminado
    projections = Projection.objects.filter(products__contains=instance.id)

    for projection in projections:
        # Eliminar el producto de la lista `products`
        if instance.id in projection.products:
            projection.products.remove(instance.id)
            projection.save()