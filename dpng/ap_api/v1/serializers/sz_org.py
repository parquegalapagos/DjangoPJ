# DJANGO
import uuid
from datetime import datetime
from django.contrib.auth.models import User
from django.conf import settings

# REST
from rest_framework import serializers

# LOCAL
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer
from ap_base.models import OrgOrganizacion,OrgTipo

# VARIABLES GLOBALES
ALERTA_RANGO_DIAS = getattr(settings, "ALERTA_RANGO_DIAS", None)


# OrgTipo
class Org_TipoSerializer_short(CommonFieldsSerializer):
    
    class Meta:
        model = OrgTipo
        fields = ['id','nombre']


# OrgOrganizacion
class Org_OrganizacionSerializer(CommonFieldsSerializer):
    tipo_id = Org_TipoSerializer_short()

    class Meta:
        model = OrgOrganizacion
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, OrgOrganizacion)
        return item

    def update(self, instance, validated_data):
        # Campos PerPersona

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Org_OrganizacionSerializer_short(CommonFieldsSerializer):
    tipo_id = Org_TipoSerializer_short()
    class Meta:
        model = OrgOrganizacion
        fields = ['id','nombre_comercial','tipo_id','modulo']


