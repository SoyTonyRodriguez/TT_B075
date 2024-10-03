
from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import Task
from projections.models import Projection

@receiver(post_delete, sender=Task)
def remove_task_from_projections(sender, instance, **kwargs):
    # Buscar todas las proyecciones que contienen la tarea eliminada
    projections = Projection.objects.filter(tasks__contains=instance.id)
    for projection in projections:
        # Eliminar el ID de la tarea de la lista
        projection.tasks.remove(instance.id)
        # Guardar los cambios en la proyección
        projection.save()