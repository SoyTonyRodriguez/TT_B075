from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from .models import Document  # Importa el modelo de Document desde la app documents
from products.models import Products  # Importa el modelo Products

# Variable global para almacenar el product_id anterior
old_product_id = None

# Señal para guardar el product_id antiguo antes de actualizar
@receiver(pre_save, sender=Document)
def store_old_product(sender, instance, **kwargs):
    global old_product_id
    # Obtener el valor previo de product_id si se está actualizando
    if instance.pk:  # Solo si es una actualización
        old_instance = Document.objects.filter(pk=instance.pk).first()
        if old_instance:
            old_product_id = old_instance.projection_id  # Cambia a tu campo relacionado en Document
        else:
            old_product_id = None

# Señal para eliminar un producto de las proyecciones cuando se elimina el documento
@receiver(post_delete, sender=Document)
def remove_document_from_products(sender, instance, **kwargs):
    # Buscar todos los productos que contengan el documento eliminado
    products = Products.objects.filter(documents__contains=instance.id)
    for product in products:
        # Eliminar el ID del documento de la lista de productos
        product.documents_uploaded.remove(instance.id)
        # Guardar los cambios en el producto
        product.save()

# Señal para actualizar o crear un nuevo documento en productos
@receiver(post_save, sender=Document)
def update_product_document(sender, instance, created, **kwargs):
    global old_product_id
    new_product_id = instance.projection_id  # Campo en Document relacionado con la proyección

    # Si el documento es nuevo, lo añadimos al producto nuevo
    if created:
        try:
            product = Products.objects.get(id=new_product_id)
            product.documents_uploaded.append(instance.id)
            product.save()
        except Products.DoesNotExist:
            print(f"Product con ID {new_product_id} no existe.")
    else:
        # Si el product_id ha cambiado
        if old_product_id != new_product_id:
            # Eliminar el documento del producto anterior
            if old_product_id:
                try:
                    old_product = Products.objects.get(id=old_product_id)
                    old_product.documents_uploaded.remove(instance.id)
                    old_product.save()
                except Products.DoesNotExist:
                    print(f"Product con ID {old_product_id} no existe o ya fue eliminado.")

            # Añadir el documento al nuevo producto
            try:
                new_product = Products.objects.get(id=new_product_id)
                new_product.documents_uploaded.append(instance.id)
                new_product.save()
            except Products.DoesNotExist:
                print(f"Product con ID {new_product_id} no existe.")
    
    # Resetear la variable global old_product_id después de usarla
    old_product_id = None
