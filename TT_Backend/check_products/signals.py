# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from .models import ProductCheck
# from products.models import Products
# from accounts.models import Accounts

# @receiver(post_save, sender=Products)
# def update_product_check(sender, instance, **kwargs):
#     account_id = instance.account_id
#     activity_name = instance.activity
#     units = instance.units

#     # Obtener o crear un ProductCheck para la cuenta
#     product_check, created = ProductCheck.objects.get_or_create(account_id=account_id)

#     # Actualizar las actividades dentro de ProductCheck
#     if activity_name in product_check.categories:
#         product_check.categories[activity_name]['length'] += 1
#         product_check.categories[activity_name]['up'] += units
#     else:
#         product_check.categories[activity_name] = {
#             'length': 1,
#             'up': units
#         }

#     account = Accounts.objects.get(id=account_id)
#     print(account)
#     account.units_projection = product_check.categories['total_up']
#     account.save()

#     # Guardar los cambios
#     product_check.save()


# # @receiver(post_save, sender=ProductCheck)
# # def update_units_projection(sender, instance, **kwargs):
# #     try:
# #         account_id = instance.account_id
# #         # Calcula el total_up a partir de las categorías (aquí debes definir cómo se calcula exactamente)
# #         total_up = sum(
# #             sum(activity['value'] for activity in category['activities'])
# #             for category in instance.categories.values()
# #             if 'activities' in category
# #         )
        
# #         # Busca la cuenta asociada por account_id y actualiza units_projection
# #         account = Accounts.objects.get(id=instance.account_id)
# #         account.units_projection = total_up
# #         account.save()
# #     except Accounts.DoesNotExist:
# #         # Maneja el caso donde no se encuentra la cuenta
# #         print(f"No se encontró la cuenta con id {instance.account_id}")
