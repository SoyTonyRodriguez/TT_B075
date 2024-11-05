# Generated by Django 4.1.13 on 2024-10-22 20:48

from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('carga_academica', djongo.models.fields.JSONField()),
                ('otras_actividades', djongo.models.fields.JSONField()),
                ('investigacion', djongo.models.fields.JSONField()),
                ('superacion_academica', djongo.models.fields.JSONField()),
                ('actividades_complementarias', djongo.models.fields.JSONField()),
                ('actividades_extension', djongo.models.fields.JSONField()),
            ],
            options={
                'verbose_name': 'condition_category',
                'verbose_name_plural': 'conditions_categories',
                'db_table': 'conditions_categories',
            },
        ),
    ]
