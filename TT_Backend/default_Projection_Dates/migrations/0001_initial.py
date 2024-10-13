# Generated by Django 4.1.13 on 2024-10-12 23:42

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DefaultProjectionDates',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField(default=django.utils.timezone.now, help_text='Fecha de inicio por defecto para las proyecciones')),
                ('end_date', models.DateField(default=django.utils.timezone.now, help_text='Fecha de fin por defecto para las proyecciones')),
            ],
            options={
                'verbose_name': 'admin-default projection date',
                'verbose_name_plural': 'admin-default projection dates',
                'db_table': 'admin-default_projection_dates',
            },
        ),
    ]
