from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from .models import Task
from projections.models import Projection

# Variable global para almacenar el projection_id anterior
old_projection_id = None

@receiver(pre_save, sender=Task)
def store_old_projection(sender, instance, **kwargs):
    global old_projection_id
    # Obtener el valor previo del projection_id
    if instance.pk:  # Solo si es una actualización
        old_instance = Task.objects.filter(pk=instance.pk).first()
        if old_instance:
            old_projection_id = old_instance.projection_id
        else:
            old_projection_id = None

@receiver(post_delete, sender=Task)
def remove_task_from_projections(sender, instance, **kwargs):
    # Buscar todas las proyecciones que contienen la tarea eliminada
    projections = Projection.objects.filter(tasks__contains=instance.id)
    for projection in projections:
        # Eliminar el ID de la tarea de la lista
        projection.tasks.remove(instance.id)
        # Guardar los cambios en la proyección
        projection.save()

@receiver(post_save, sender=Task)
def update_task_projection(sender, instance, created, **kwargs):
    global old_projection_id
    new_projection_id = instance.projection_id

    # Si la tarea es nueva, simplemente la añadimos a la nueva proyección
    if created:
        try:
            projection = Projection.objects.get(id=new_projection_id)
            projection.tasks.append(instance.id)
            projection.save()
        except Projection.DoesNotExist:
            print(f"Proyección con ID {new_projection_id} no existe.")
    else:
        # Si la proyección cambió
        if old_projection_id != new_projection_id:
            # Eliminar la tarea de la proyección anterior
            if old_projection_id:
                try:
                    old_projection = Projection.objects.get(id=old_projection_id)
                    old_projection.tasks.remove(instance.id)
                    old_projection.save()
                except Projection.DoesNotExist:
                    print(f"Proyección con ID {old_projection_id} no existe o ya fue eliminada.")

            # Añadir la tarea a la nueva proyección
            try:
                new_projection = Projection.objects.get(id=new_projection_id)
                new_projection.tasks.append(instance.id)
                new_projection.save()
            except Projection.DoesNotExist:
                print(f"Proyección con ID {new_projection_id} no existe.")
    
    # Resetear el valor global old_projection_id después de usarlo
    old_projection_id = None
