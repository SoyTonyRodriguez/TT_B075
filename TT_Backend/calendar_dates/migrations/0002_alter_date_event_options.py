# Generated by Django 4.1.13 on 2024-11-17 21:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_dates', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='date_event',
            options={'verbose_name': 'Fecha en calendario', 'verbose_name_plural': 'Fechas en calendario'},
        ),
    ]