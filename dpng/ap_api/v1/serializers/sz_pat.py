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
from ap_api.v1.serializers.sz_tpr import Tpr_EmbarcacionSerializer_short

# Modelos
from ap_dup_operacionturistica.models import PatPatente
from ap_talentohumano.models import PerFuncionarioAuth
from ap_base.models import GeoIsla


# PatPatente
class Pat_PatenteSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = PatPatente
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, PatPatente)
        return item

    def update(self, instance, validated_data):
        # Campos PatPatente
        
        instance.c_telefono = validated_data.get('c_telefono', instance.c_telefono)
        instance.c_nproceso = validated_data.get('c_nproceso', instance.c_nproceso)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()

        return item


class Pat_PatenteSerializer_list(CommonFieldsSerializer):
    embarcacion_id = Tpr_EmbarcacionSerializer_short()
    
    class Meta:
        model = PatPatente
        fields = ['id','embarcacion_id','num_patente','fecha_vigencia','fecha_caducidad','estado','fecha_expedicion']
        #Freddy anadio num_patente

class Pat_PatenteSerializer_short(CommonFieldsSerializer):
    embarcacion_id = Tpr_EmbarcacionSerializer_short()

    class Meta:
        model = PatPatente
        fields = ['id','embarcacion_id','fecha_vigencia','fecha_caducidad','estado','fecha_expedicion']
