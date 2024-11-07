# from django.db.models.signals import pre_save, post_save, post_delete
# from django.dispatch import receiver
# from .models import Task
# from products.models import Products
# from products.signals import update_product_check

# # Variable global para almacenar el projection_id anterior
# old_product_id = None

# @receiver(pre_save, sender=Task)
# def store_old_projection(sender, instance, **kwargs):
#     global old_product_id
#     # Obtener el valor previo del projection_id
#     if instance.pk:  # Solo si es una actualización
#         old_instance = Task.objects.filter(pk=instance.pk).first()
#         if old_instance:
#             old_product_id = old_instance.projection_id
#         else:
#             old_product_id = None

# @receiver(post_delete, sender=Task)
# def remove_task_from_projections(sender, instance, **kwargs):
#     # Buscar todas las proyecciones que contienen la tarea eliminada
#     product = Products.objects.filter(tasks__contains=instance.id)

#     for projection in product:
#         post_delete.disconnect(update_product_check, sender=Products)
#         # Eliminar el ID de la tarea de la lista
#         projection.tasks.remove(instance.id)
            
#         # Guardar los cambios en la proyección
#         projection.save()
#         post_delete.connect(update_product_check, sender=Products)


# @receiver(post_save, sender=Task)
# def update_task_projection(sender, instance, created, **kwargs):
#     global old_product_id
#     new_product_id = instance.projection_id

#     # Si la tarea es nueva, simplemente la añadimos a la nueva proyección
#     if created:
#         try:
#             projection = Products.objects.get(id=new_product_id)
#             projection.tasks.append(instance.id)
#             projection.save()
#         except Products.DoesNotExist:
#             print(f"Product con ID {new_product_id} no existe.")
#     else:
#         # Si la proyección cambió
#         if old_product_id != new_product_id:
#             # Eliminar la tarea de la proyección anterior
#             if old_product_id:
#                 try:
#                     old_product = Products.objects.get(id=old_product_id)
#                     old_product.tasks.remove(instance.id)
#                     old_product.save()
#                 except Products.DoesNotExist:
#                     print(f"Product con ID {old_product_id} no existe o ya fue eliminada.")

#             # Añadir la tarea a la nueva proyección
#             try:
#                 new_product = Products.objects.get(id=new_product_id)
#                 new_product.tasks.append(instance.id)
#                 new_product.save()
#             except Products.DoesNotExist:
#                 print(f"Product con ID {new_product_id} no existe.")
    
#     # Resetear el valor global old_projection_id después de usarlo
#     old_product_id = None
