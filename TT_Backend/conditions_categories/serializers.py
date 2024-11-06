from rest_framework import serializers
from .models import Categories

class RangoUPSerializer(serializers.Serializer):
    min = serializers.FloatField()
    max = serializers.FloatField()

class RangoHorasSerializer(serializers.Serializer):
    min = serializers.FloatField()
    max = serializers.FloatField()

class TipoTiempoSerializer(serializers.Serializer):
    horas = RangoHorasSerializer()
    up = RangoUPSerializer()

class NivelDocenteSerializer(serializers.Serializer):
    medio_tiempo = TipoTiempoSerializer()
    tres_cuartos_tiempo = TipoTiempoSerializer()
    tiempo_completo = TipoTiempoSerializer()

class ActividadSimpleItemSerializer(serializers.Serializer):
    up = RangoUPSerializer()

class ActividadSimpleSerializer(serializers.Serializer):
    tecnico_docente_auxiliar = ActividadSimpleItemSerializer()
    tecnico_docente_asociado = ActividadSimpleItemSerializer()
    tecnico_docente_titular = ActividadSimpleItemSerializer()
    profesor_asistente = ActividadSimpleItemSerializer()
    profesor_asociado = ActividadSimpleItemSerializer()
    profesor_titular = ActividadSimpleItemSerializer()
    profesor_de_asignatura = ActividadSimpleItemSerializer()
    tecnico_docente_de_asignatura = ActividadSimpleItemSerializer()

class CargaAcademicaSerializer(serializers.Serializer):
    tecnico_docente_auxiliar = NivelDocenteSerializer()
    tecnico_docente_asociado = NivelDocenteSerializer()
    tecnico_docente_titular = NivelDocenteSerializer()
    profesor_asistente = NivelDocenteSerializer()
    profesor_asociado = NivelDocenteSerializer()
    profesor_titular = NivelDocenteSerializer()
    profesor_de_asignatura = NivelDocenteSerializer()
    tecnico_docente_de_asignatura = NivelDocenteSerializer()

class CategorySerializer(serializers.ModelSerializer):
    carga_academica = CargaAcademicaSerializer()
    otras_actividades = ActividadSimpleSerializer()
    investigacion = ActividadSimpleSerializer()
    superacion_academica = ActividadSimpleSerializer()
    actividades_complementarias = ActividadSimpleSerializer()
    actividades_extension = ActividadSimpleSerializer()

    class Meta:
        model = Categories
        fields = '__all__'
