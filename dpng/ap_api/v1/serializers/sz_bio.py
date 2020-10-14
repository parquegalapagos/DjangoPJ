# DJANGO
from django.contrib.auth.models import User
import uuid

# REST
from rest_framework import serializers

# Local
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer
from ap_talentohumano.models import *
from ap_especiesnativas.models import *
from ap_api.v1.serializers.sz_sis import Sis_CatalogoSerializer_short
from ap_api.v1.serializers.sz_geo import *
from ap_api.v1.serializers.sz_bio import *


# GthCargoFuncional
class Bio_EspeciesSerializer(CommonFieldsSerializer):

    class Meta:
        model = BioEspecie
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, BioEspecie)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.nombre_comun = validated_data.get('nombre_comun', instance.nombre_comun)
        instance.nombre_cientifico = validated_data.get('nombre_cientifico', instance.nombre_cientifico)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.tipo_especie = validated_data.get('tipo_especie', instance.tipo_especie)
        instance.categoria = validated_data.get('categoria', instance.categoria)
        instance.clasificacion = validated_data.get('clasificacion', instance.clasificacion)
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Bio_EspeciesSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = BioEspecie
        fields = '__all__'


class Bio_EspeciesSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = BioEspecie
        fields = ["id","nombre_comun"]
