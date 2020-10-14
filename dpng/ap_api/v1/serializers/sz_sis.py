# DJANGO
from django.contrib.auth.models import User
import uuid

# REST
from rest_framework import serializers

# Local
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer
from ap_base.models import *





# GeoIsla
class Sis_CatalogoSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = SisCatalogo
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SisCatalogo)
        return item

    def update(self, instance, validated_data):
        # Campos GeoIsla

        instance.label = validated_data.get('label', instance.label)
        instance.valor = validated_data.get('valor', instance.valor)
        instance.observacionesdba = validated_data.get('observacionesdba', instance.observacionesdba)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.categoria = validated_data.get('categoria', instance.categoria)


        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Sis_CatalogoSerializer_short(CommonFieldsSerializer):
    class Meta:
        model = SisCatalogo
        fields = ['id','label','valor','categoria']

# SisSecuencia
class Sis_SecuenciaSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = SisSecuencia
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GeoIsla)
        return item

    def update(self, instance, validated_data):
        # Campos GeoIsla

        instance.valor = validated_data.get('valor', instance.valor)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Sis_SecuenciaSerializer_short(CommonFieldsSerializer):
    class Meta:
        model = SisSecuencia
        fields = ['id','codigo','valor','descripcion']


# Parametro Configuracion

class SisParametrosConfigSerializer(CommonFieldsSerializer):

    class Meta:
        model = SisParametrosConfig
        fields = '__all__'

    def create(self, validated_data):

        item = CommonFieldsSerializer.create(self, validated_data, SisParametrosConfig)
        return item

    def update(self, instance, validated_data):

        # Campos GthCargoFuncional
        instance.valor = validated_data.get('valor', instance.valor)
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.categoria = validated_data.get('categoria', instance.categoria)
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)

        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class SisParametrosConfigSerializer_list(CommonFieldsSerializer):


    class Meta:
        model = SisParametrosConfig
        fields = '__all__'


    
class SisParametrosConfigSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = SisParametrosConfig
        fields = ['id','descripcion','valor','nombre']