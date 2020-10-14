# DJANGO
import uuid
from datetime import datetime,date
from django.contrib.auth.models import User
from django.conf import settings

# REST
from rest_framework import serializers

# Serializador
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer
from ap_api.v1.serializers.sz_per import Per_PersonaSerializer_short

# Modelos
from ap_usuarioexterno.models import TrmTramites,TrmTramitesDetalles
#from ap_talentohumano.models import PerFuncionarioAuth
from ap_base.models import GeoIsla


# TrmTramitesDetalles
class Trm_TramitesDetallesSerializer(CommonFieldsSerializer):

    class Meta:
        model = TrmTramitesDetalles
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, TrmTramitesDetalles)
        return item



    def update(self, instance, validated_data):
        # Campos TrmTramitesDetalles
        
        instance.trm_tramites_id = validated_data.get('trm_tramites_id', instance.trm_tramites_id)
        instance.per_persona_id = validated_data.get('per_persona_id', instance.per_persona_id)
        instance.fecha_observacion = validated_data.get('fecha_observacion', instance.fecha_observacion)
        instance.estado_tramite = validated_data.get('estado_tramite', instance.estado_tramite)
        instance.tipo_tramite = validated_data.get('tipo_tramite', instance.tipo_tramite)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Trm_TramitesDetallesSerializer_short(CommonFieldsSerializer):
    per_persona_id = Per_PersonaSerializer_short()
    
    fecha_ingreso = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",required=False)

    class Meta:
        model = TrmTramitesDetalles
        fields = ['id','trm_tramites_id','per_persona_id','fecha_observacion','observacion','fecha_ingreso','estado_tramite','tipo_tramite','eliminado']

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, TrmTramitesDetalles)
        return item



    def update(self, instance, validated_data):
        # Campos TrmTramitesDetalles
        
        instance.trm_tramites_id = validated_data.get('trm_tramites_id', instance.trm_tramites_id)
        instance.per_persona_id = validated_data.get('per_persona_id', instance.per_persona_id)
        instance.fecha_observacion = validated_data.get('fecha_observacion', instance.fecha_observacion)
        instance.observacion = validated_data.get('observacion', instance.observacion)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


# TrmTramites
class Trm_TramitesSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = TrmTramites
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, TrmTramites)
        return item

    def update(self, instance, validated_data):
        # Campos TrmTramites
        
        instance.per_solicitante_id = validated_data.get('per_solicitante_id', instance.per_solicitante_id)
        instance.secuencia = validated_data.get('secuencia', instance.secuencia)
        instance.tipo_tramite = validated_data.get('tipo_tramite', instance.tipo_tramite)
        instance.fecha_solicitud = validated_data.get('fecha_solicitud', instance.fecha_solicitud)
        instance.ap_aprobador = validated_data.get('ap_aprobador', instance.ap_aprobador)
        instance.ap_revisor = validated_data.get('ap_revisor', instance.ap_revisor)
        instance.archivos = validated_data.get('archivos', instance.archivos)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.estado_tramite = validated_data.get('estado_tramite', instance.estado_tramite)
        instance.isla_tramite = validated_data.get('isla_tramite', instance.isla_tramite)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class Trm_TramitesSerializer_list(CommonFieldsSerializer):
    per_solicitante_id = Per_PersonaSerializer_short()
    det_tramites = serializers.SerializerMethodField()
    
    class Meta:
        model = TrmTramites
        fields = ['id','secuencia','fecha_solicitud','per_solicitante_id','estado_tramite','det_tramites','archivos','tipo_tramite','ap_aprobador','ap_revisor','isla_tramite']

    def get_det_tramites(self, instance):
        print("*********************************************")
        print(instance)
        items = instance.det_tramites.all().filter(eliminado='f').order_by('-fecha_ingreso')
        return Trm_TramitesDetallesSerializer_short(items, many=True).data

