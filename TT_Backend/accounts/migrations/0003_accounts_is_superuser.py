# Generated by Django 4.1.13 on 2024-11-25 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_alter_accounts_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='accounts',
            name='is_superuser',
            field=models.BooleanField(default=False, verbose_name='superuser status'),
        ),
    ]