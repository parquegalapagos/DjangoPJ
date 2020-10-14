# DJANGO
import uuid
from datetime import datetime,date
from django.contrib.auth.models import User
from django.conf import settings

# REST
from rest_framework import serializers

# Serializador
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer
from ap_api.v1.serializers.sz_per import Per_FuncionarioSerializer_short,Per_GuiaSerializer_short

# Modelos
from ap_dup_operacionturistica.models import *
from ap_talentohumano.models import PerFuncionarioAuth
from ap_base.models import GeoIsla


# TprEmbarcacion
class Tpr_EmbarcacionSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = TprEmbarcacion
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, TprEmbarcacion)
        return item

    def update(self, instance, validated_data):
        # Campos TprEmbarcacion
        
        instance.c_telefono = validated_data.get('c_telefono', instance.c_telefono)
        instance.c_nproceso = validated_data.get('c_nproceso', instance.c_nproceso)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()

        return item


class Tpr_EmbarcacionSerializer_list(CommonFieldsSerializer):
    
    class Meta:
        model = TprEmbarcacion
        fields = ['id','nombre','num_matricula','es_nacional','estado']


class Tpr_EmbarcacionSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = TprEmbarcacion
        fields = ['id','nombre','num_matricula','es_nacional','estado']


# TprEmbarcacion
class TprEmbarcacionActividadSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = TprEmbarcacionActividad
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, TprEmbarcacionActividad)
        return item

    def update(self, instance, validated_data):
        # Campos TprEmbarcacion
        
        instance.c_telefono = validated_data.get('nombre', instance.c_telefono)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()

        return item


class TprEmbarcacionActividadSerializer_list(CommonFieldsSerializer):
    
    class Meta:
        model = TprEmbarcacionActividad
        fields = '__all__'