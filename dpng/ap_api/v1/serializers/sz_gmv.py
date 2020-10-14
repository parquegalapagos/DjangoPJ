# DJANGO
import uuid
from datetime import datetime,date
from django.contrib.auth.models import User
from django.conf import settings

# REST
from rest_framework import serializers

# Serializador
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer
from ap_api.v1.serializers.sz_per import Per_FuncionarioSerializer_short

# Modelos
from ap_cuem_manejopesquero.models import *

# GthCargoFuncional
class GmvEspeciesCantidadesSerializer(CommonFieldsSerializer):

    class Meta:
        model = GmvEspeciesCantidades
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GmvEspeciesCantidades)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.especie = validated_data.get('especie', instance.especie)
        instance.tipo = validated_data.get('tipo', instance.tipo)
        instance.lib_entero = validated_data.get('lib_entero', instance.lib_entero)
        instance.ind_entero = validated_data.get('ind_entero', instance.ind_entero)
        instance.lib_colas_filetes = validated_data.get('lib_colas_filetes', instance.lib_colas_filetes)
        instance.ind_colas_filetes = validated_data.get('ind_colas_filetes', instance.ind_colas_filetes)
        instance.ind_entero_or_lb_colas = validated_data.get('ind_entero_or_lb_colas', instance.ind_entero_or_lb_colas)
        instance.bloquear_cant_vacias = validated_data.get('bloquear_cant_vacias', instance.bloquear_cant_vacias)
        instance.periodo_inicio = validated_data.get('periodo_inicio', instance.periodo_inicio)
        instance.periodo_fin = validated_data.get('periodo_fin', instance.periodo_fin)
        instance.periodo = validated_data.get('periodo', instance.periodo)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class GmvEspeciesCantidadesSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = GmvEspeciesCantidades
        fields = '__all__'


# GmvGuiadomProductos
class GmvGuiadomProductosSerializer(CommonFieldsSerializer):

    class Meta:
        model = GmvGuiadomProductos
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GmvGuiadomProductos)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.lib_entero = validated_data.get('lib_entero', instance.lib_entero)
        instance.ind_entero = validated_data.get('ind_entero', instance.ind_entero)
        instance.lib_colas_filetes = validated_data.get('lib_colas_filetes', instance.lib_colas_filetes)
        instance.ind_colas_filetes = validated_data.get('ind_colas_filetes', instance.ind_colas_filetes)
        instance.especie_id = validated_data.get('especie_id', instance.especie_id)
        instance.guiamovdom_id = validated_data.get('guiamovdom_id', instance.guiamovdom_id)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observaciones0 = validated_data.get('observaciones0', instance.observaciones0)
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class GmvGuiadomProductosSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = GmvGuiadomProductos
        fields = '__all__'

# GmvGuiadomProductosPescado
class GmvGuiadomProductosPescadoSerializer(CommonFieldsSerializer):

    class Meta:
        model = GmvGuiadomProductospescado
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GmvGuiadomProductospescado)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.peso = validated_data.get('peso', instance.peso)
        instance.individuos = validated_data.get('individuos', instance.individuos)
        instance.especie_id = validated_data.get('especie_id', instance.especie_id)
        instance.guiamovdom_id = validated_data.get('guiamovdom_id', instance.guiamovdom_id)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.estados_especie_id = validated_data.get('estados_especie_id', instance.estados_especie_id)
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class GmvGuiadomProductosPescadoSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = GmvGuiadomProductospescado
        fields = '__all__'

# GmvGuiadom
class GmvGuiadomSerializer(CommonFieldsSerializer):

    class Meta:
        model = GmvGuiadom
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GmvGuiadom)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.nguiadomestica = validated_data.get('nguiadomestica', instance.nguiadomestica)
        instance.fechaemision = validated_data.get('fechaemision', instance.fechaemision)
        instance.hora_emision = validated_data.get('hora_emision', instance.hora_emision)
        instance.lugaremision = validated_data.get('lugaremision', instance.lugaremision)
        instance.tipo_transporte = validated_data.get('tipo_transporte', instance.tipo_transporte)
        instance.totaltransportadolib = validated_data.get('totaltransportadolib', instance.totaltransportadolib)
        instance.totaltransportadoind = validated_data.get('totaltransportadoind', instance.totaltransportadoind)
        instance.provincia_id = validated_data.get('provincia_id', instance.provincia_id)
        instance.ciudad_id = validated_data.get('ciudad_id', instance.ciudad_id)
        instance.puerto_id = validated_data.get('puerto_id', instance.puerto_id)
        instance.persona_id = validated_data.get('persona_id', instance.persona_id)
        instance.remoto_id = validated_data.get('remoto_id', instance.remoto_id)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observaciones0 = validated_data.get('observaciones0', instance.observaciones0)
        emitidapor_persona_id = validated_data.get('emitidapor_persona_id', instance.emitidapor_persona_id)
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class GmvGuiadomSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = GmvGuiadom
        fields = '__all__'