# Generated by Django 4.1.13 on 2024-10-14 03:27

from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_alter_products_projection_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='products',
            name='documents_uploaded',
            field=djongo.models.fields.JSONField(blank=True, null=True, verbose_name=models.CharField(max_length=255)),
        ),
    ]
