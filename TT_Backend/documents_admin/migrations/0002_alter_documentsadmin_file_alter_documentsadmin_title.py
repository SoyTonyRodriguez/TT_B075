# Generated by Django 4.1.13 on 2024-11-17 19:58

from django.db import migrations, models
import documents_admin.models


class Migration(migrations.Migration):

    dependencies = [
        ('documents_admin', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='documentsadmin',
            name='file',
            field=models.FileField(upload_to='documents/', validators=[documents_admin.models.validate_file_extension], verbose_name='Archivo'),
        ),
        migrations.AlterField(
            model_name='documentsadmin',
            name='title',
            field=models.CharField(choices=[('Convocatoria', 'Convocatoria'), ('Cronograma', 'Cronograma'), ('Reglamento', 'Reglamento'), ('Valoracion', 'Valoración'), ('Gaceta', 'Gaceta')], max_length=50, verbose_name='Título'),
        ),
    ]