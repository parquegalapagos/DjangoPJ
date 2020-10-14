# DJANGO
import uuid
from datetime import datetime,date
from django.contrib.auth.models import User
from django.conf import settings

# REST
from rest_framework import serializers

# Serializador
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer
from ap_api.v1.serializers.sz_per import Per_FuncionarioSerializer_short, Per_GuiaSerializer_short 

# Modelos
from ap_dup_guias.models import LicGuia,LicGuiaEspecializacion,VwUltimaslicenciasGuias
from ap_talentohumano.models import PerFuncionarioAuth
from ap_base.models import GeoIsla


# LicGuia
class Lic_GuiaSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = LicGuia
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, LicGuia)
        return item

    def update(self, instance, validated_data):
        # Campos LicGuia
        
        instance.c_telefono = validated_data.get('c_telefono', instance.c_telefono)
        instance.c_nproceso = validated_data.get('c_nproceso', instance.c_nproceso)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()

        return item

class Lic_GuiaEspecializacionSerializer_list(CommonFieldsSerializer):
    
    class Meta:
        model = LicGuiaEspecializacion
        fields = ['id','nombre']

class Lic_GuiaSerializer_list(CommonFieldsSerializer):
    guia_id = Per_GuiaSerializer_short()
    
    class Meta:
        model = LicGuia
        fields = ['id','guia_id','fecha_emision','fecha_caducidad','estado','num_licencia']


#####Freddy Lituma############
class LicGuiaEspecializacion_short(CommonFieldsSerializer):
    class Meta:
        model = LicGuiaEspecializacion
        fields = ['id','nombre']


#####Modificado Freddy Lituma
class Lic_GuiaSerializer_short(CommonFieldsSerializer):
    guia_id = Per_GuiaSerializer_short()
    especializacion_id = LicGuiaEspecializacion_short()
    class Meta:
        model = LicGuia
        fields = ['id','especializacion_id','guia_id','num_licencia','fecha_emision','fecha_caducidad','estado']


class Lic_GuiaSerializer_app(CommonFieldsSerializer):
    class Meta:
        model = VwUltimaslicenciasGuias
        fields = ['id','identificacion','nombres','apellidos','nombre_completo','num_licencia','especializacion','fecha_emision','fecha_caducidad','tipo_tramite','estado','eliminado']

