# Generated by Django 4.1.13 on 2024-11-17 21:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projections', '0002_projection_type'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='projection',
            options={'verbose_name': 'Proyeccion', 'verbose_name_plural': 'Proyecciones'},
        ),
    ]