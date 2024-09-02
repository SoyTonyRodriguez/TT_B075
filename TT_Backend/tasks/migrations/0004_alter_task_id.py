# Generated by Django 4.1.13 on 2024-09-02 05:46

from django.db import migrations, models
import tasks.models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0003_task_delete_tasks_task_tasks_status_031d4c_idx_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='id',
            field=models.CharField(default=tasks.models.generate_task_id, editable=False, max_length=40, primary_key=True, serialize=False),
        ),
    ]
