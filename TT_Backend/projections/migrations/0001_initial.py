# Generated by Django 4.1.13 on 2024-10-03 01:01

from django.db import migrations, models
import djongo.models.fields
import projections.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Projection',
            fields=[
                ('id', models.CharField(default=projections.models.generate_projection_id, editable=False, max_length=40, primary_key=True, serialize=False)),
                ('account_id', models.CharField(max_length=255)),
                ('function', models.CharField(max_length=255)),
                ('activity', models.CharField(max_length=255)),
                ('role', models.CharField(max_length=255)),
                ('scope', models.CharField(max_length=255)),
                ('tasks', djongo.models.fields.JSONField(blank=True, null=True, verbose_name=models.CharField(max_length=255))),
                ('documents_required', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
            ],
            options={
                'verbose_name': 'projection',
                'verbose_name_plural': 'projections',
                'db_table': 'projections',
            },
        ),
        migrations.AddIndex(
            model_name='projection',
            index=models.Index(fields=['start_date', 'end_date'], name='projections_start_d_a5f5b9_idx'),
        ),
    ]
