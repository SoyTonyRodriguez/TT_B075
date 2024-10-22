from django.db import models
from djongo import models
from django.utils.translation import gettext_lazy as _

class RangoUP(models.Model):
    min = models.FloatField()
    max = models.FloatField()

    class Meta:
        abstract = True

class ActividadSimpleItem(models.Model):
    up = models.EmbeddedField(model_container=RangoUP)

    class Meta:
        abstract = True

class ActividadSimple(models.Model):
    tecnico_docente_auxiliar = models.EmbeddedField(model_container=ActividadSimpleItem)
    tecnico_docente_asociado = models.EmbeddedField(model_container=ActividadSimpleItem)
    tecnico_docente_titular = models.EmbeddedField(model_container=ActividadSimpleItem)
    profesor_asistente = models.EmbeddedField(model_container=ActividadSimpleItem)
    profesor_asociado = models.EmbeddedField(model_container=ActividadSimpleItem)
    profesor_titular = models.EmbeddedField(model_container=ActividadSimpleItem)
    profesor_asignatura = models.EmbeddedField(model_container=ActividadSimpleItem)
    tecnico_docente_asignatura = models.EmbeddedField(model_container=ActividadSimpleItem)

    class Meta:
        abstract = True

class RangoHoras(models.Model):
    min = models.FloatField()
    max = models.FloatField()

    class Meta:
        abstract = True

class TipoTiempo(models.Model):
    horas = models.EmbeddedField(model_container=RangoHoras)
    up = models.EmbeddedField(model_container=RangoUP)

    class Meta:
        abstract = True

class NivelDocente(models.Model):
    medio_tiempo = models.EmbeddedField(model_container=TipoTiempo)
    tres_cuartos_tiempo = models.EmbeddedField(model_container=TipoTiempo)
    tiempo_completo = models.EmbeddedField(model_container=TipoTiempo)

    class Meta:
        abstract = True

class CargaAcademica(models.Model):
    tecnico_docente_auxiliar = models.EmbeddedField(model_container=NivelDocente)
    tecnico_docente_asociado = models.EmbeddedField(model_container=NivelDocente)
    tecnico_docente_titular = models.EmbeddedField(model_container=NivelDocente)
    profesor_asistente = models.EmbeddedField(model_container=NivelDocente)
    profesor_asociado = models.EmbeddedField(model_container=NivelDocente)
    profesor_titular = models.EmbeddedField(model_container=NivelDocente)
    profesor_asignatura = models.EmbeddedField(model_container=NivelDocente)
    tecnico_docente_asignatura = models.EmbeddedField(model_container=NivelDocente)

    class Meta:
        abstract = True

class Categories(models.Model):
    carga_academica = models.EmbeddedField(model_container=CargaAcademica)
    otras_actividades = models.EmbeddedField(model_container=ActividadSimple)
    investigacion = models.EmbeddedField(model_container=ActividadSimple)
    superacion_academica = models.EmbeddedField(model_container=ActividadSimple)
    actividades_complementarias = models.EmbeddedField(model_container=ActividadSimple)
    actividades_extension = models.EmbeddedField(model_container=ActividadSimple)

    class Meta:
        verbose_name = _('condition_category')
        verbose_name_plural = _('conditions_categories')
        db_table = 'conditions_categories'

