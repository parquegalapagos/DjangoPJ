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
from ap_daf_certificaciones.models import DafCertificaciones,DafCertificacionesDetalles
from ap_talentohumano.models import PerFuncionarioAuth
from ap_base.models import GeoIsla


# DafCertificacionesDetalles
class Daf_CertificacionesDetallesSerializer(CommonFieldsSerializer):

    class Meta:
        model = DafCertificacionesDetalles
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, DafCertificacionesDetalles)
        return item



    def update(self, instance, validated_data):
        # Campos DafCertificacionesDetalles
        
        instance.daf_certificaciones_id = validated_data.get('daf_certificaciones_id', instance.daf_certificaciones_id)
        instance.funcionario_id = validated_data.get('funcionario_id', instance.funcionario_id)
        instance.fecha_observacion = validated_data.get('fecha_observacion', instance.fecha_observacion)
        instance.estado_tramite = validated_data.get('estado_tramite', instance.estado_tramite)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Daf_CertificacionesDetallesSerializer_short(CommonFieldsSerializer):
    funcionario_id = Per_FuncionarioSerializer_short()
    
    fecha_ingreso = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",required=False)

    class Meta:
        model = DafCertificacionesDetalles
        fields = ['id','daf_certificaciones_id','funcionario_id','fecha_observacion','observacion','fecha_ingreso','estado_tramite','eliminado']

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, DafCertificacionesDetalles)
        return item



    def update(self, instance, validated_data):
        # Campos DafCertificacionesDetalles
        
        instance.daf_certificaciones_id = validated_data.get('daf_certificaciones_id', instance.daf_certificaciones_id)
        instance.funcionario_id = validated_data.get('funcionario_id', instance.funcionario_id)
        instance.fecha_observacion = validated_data.get('fecha_observacion', instance.fecha_observacion)
        instance.observacion = validated_data.get('observacion', instance.observacion)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


# DafCertificaciones
class Daf_CertificacionesSerializer(CommonFieldsSerializer):
    #daf_certificaciones_id = Daf_CertificacionesDetallesSerializer(many=True)
    titulo = serializers.CharField(required=False)
    
    class Meta:
        model = DafCertificaciones
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, DafCertificaciones)
        return item

    def update(self, instance, validated_data):
        # Campos DafCertificaciones
        
        instance.func_solicitante_id = validated_data.get('func_solicitante_id', instance.func_solicitante_id)
        instance.secuencia = validated_data.get('secuencia', instance.secuencia)
        instance.tipo = validated_data.get('tipo', instance.tipo)
        instance.tipo_revision = validated_data.get('tipo_revision', instance.tipo_revision)
        instance.titulo = validated_data.get('titulo', instance.titulo)
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.monto = validated_data.get('monto', instance.monto)
        instance.fecha_solicitud = validated_data.get('fecha_solicitud', instance.fecha_solicitud)
        instance.obs_solicitante = validated_data.get('obs_solicitante', instance.obs_solicitante)
        instance.func_dirarea_id = validated_data.get('func_dirarea_id', instance.func_dirarea_id)
        instance.aprobar_dirarea = validated_data.get('aprobar_dirarea', instance.aprobar_dirarea)
        instance.aprobar_tic = validated_data.get('aprobar_tic', instance.aprobar_tic)
        instance.aprobar_obracivil = validated_data.get('aprobar_obracivil', instance.aprobar_obracivil)
        instance.aprobar_mantenimiento = validated_data.get('aprobar_mantenimiento', instance.aprobar_mantenimiento)
        #instance.aprobar_bodega = validated_data.get('aprobar_bodega', instance.aprobar_bodega)
        instance.aprobar_compraspub = validated_data.get('aprobar_compraspub', instance.aprobar_compraspub)
        instance.aprobar_respac = validated_data.get('aprobar_respac', instance.aprobar_respac)
        instance.aprobar_planificacion = validated_data.get('aprobar_planificacion', instance.aprobar_planificacion)
        instance.aprobar_presupuesto = validated_data.get('aprobar_presupuesto', instance.aprobar_presupuesto)
        instance.aprobar_adminfinanciero = validated_data.get('aprobar_adminfinanciero', instance.aprobar_adminfinanciero)
        instance.archivos = validated_data.get('archivos', instance.archivos)
        instance.archivos_proformas = validated_data.get('archivos_proformas', instance.archivos_proformas)
        instance.archivos_certificacion = validated_data.get('archivos_certificacion', instance.archivos_certificacion)
        instance.archivos_otros = validated_data.get('archivos_otros', instance.archivos_otros)
        instance.catalogo_elect = validated_data.get('catalogo_elect', instance.catalogo_elect)
        instance.func_reasignado_id = validated_data.get('func_reasignado_id', instance.func_reasignado_id)
        instance.doc_tic = validated_data.get('doc_tic', instance.doc_tic)
        instance.doc_mantenimiento = validated_data.get('doc_mantenimiento', instance.doc_mantenimiento)
        instance.doc_obracivil = validated_data.get('doc_obracivil', instance.doc_obracivil)

        instance.estado_tramite = validated_data.get('estado_tramite', instance.estado_tramite)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class Daf_CertificacionesSerializer_list(CommonFieldsSerializer):
    func_solicitante_id = Per_FuncionarioSerializer_short()
    func_dirarea_id = Per_FuncionarioSerializer_short()
    func_reasignado_id = Per_FuncionarioSerializer_short()
    #daf_certificaciones_id = Daf_CertificacionesDetallesSerializer_short(many=True,read_only=True)
    det_certificaciones = serializers.SerializerMethodField()
    #icaciones = Daf_CertificacionesDetallesSerializer(many=True, read_only=True)
    
    class Meta:
        model = DafCertificaciones
        fields = ['id','secuencia','tipo','titulo','descripcion','monto','fecha_solicitud','func_solicitante_id','func_dirarea_id','estado_tramite','det_certificaciones','archivos','archivos_certificacion','archivos_otros','tipo_revision','aprobar_dirarea','aprobar_compraspub','aprobar_respac','aprobar_planificacion','aprobar_presupuesto','aprobar_adminfinanciero','aprobar_tic','aprobar_mantenimiento','aprobar_obracivil','catalogo_elect','func_reasignado_id','archivos_proformas','doc_tic','doc_mantenimiento','doc_obracivil','isla_usuario_ingreso_id']

    def get_det_certificaciones(self, instance):
        print("*********************************************")
        print(instance)
        items = instance.det_certificaciones.all().filter(eliminado='f').order_by('-fecha_ingreso')
        return Daf_CertificacionesDetallesSerializer_short(items, many=True).data




#cabecera detalle informe campo
class DafCertificacionesCabDetSerializer(CommonFieldsSerializer):
    #migrar =  serializers.BooleanField(required=False)
    det_certificaciones = Daf_CertificacionesDetallesSerializer(many=True)

    class Meta:
        model = DafCertificaciones
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        detalle_data = validated_data.pop('det_certificaciones')
        cabecera = CommonFieldsSerializer.create(self, validated_data, DafCertificaciones)
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_data:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            DafCertificacionesDetalles.objects.create(daf_certificaciones_id=cabecera, **detalle)
        return cabecera

    def update(self, instance, validated_data):
        print("--------------->>>>>>")
        print(validated_data)
        print("--------------->>>>>>IIIIIIIIIIIIIIII")
        print(instance)
        # Campos PerPersona
        
        instance.func_solicitante_id = validated_data.get('func_solicitante_id', instance.func_solicitante_id)
        instance.secuencia = validated_data.get('secuencia', instance.secuencia)
        instance.tipo = validated_data.get('tipo', instance.tipo)
        instance.tipo_revision = validated_data.get('tipo_revision', instance.tipo_revision)
        instance.titulo = validated_data.get('titulo', instance.titulo)
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.monto = validated_data.get('monto', instance.monto)
        instance.fecha_solicitud = validated_data.get('fecha_solicitud', instance.fecha_solicitud)
        instance.obs_solicitante = validated_data.get('obs_solicitante', instance.obs_solicitante)
        instance.func_dirarea_id = validated_data.get('func_dirarea_id', instance.func_dirarea_id)
        instance.aprobar_dirarea = validated_data.get('aprobar_dirarea', instance.aprobar_dirarea)
        instance.aprobar_tic = validated_data.get('aprobar_tic', instance.aprobar_tic)
        instance.aprobar_obracivil = validated_data.get('aprobar_obracivil', instance.aprobar_obracivil)
        instance.aprobar_mantenimiento = validated_data.get('aprobar_mantenimiento', instance.aprobar_mantenimiento)
        instance.aprobar_compraspub = validated_data.get('aprobar_compraspub', instance.aprobar_compraspub)
        instance.aprobar_respac = validated_data.get('aprobar_respac', instance.aprobar_respac)
        instance.aprobar_planificacion = validated_data.get('aprobar_planificacion', instance.aprobar_planificacion)
        instance.aprobar_presupuesto = validated_data.get('aprobar_presupuesto', instance.aprobar_presupuesto)
        instance.aprobar_adminfinanciero = validated_data.get('aprobar_adminfinanciero', instance.aprobar_adminfinanciero)
        instance.archivos = validated_data.get('archivos', instance.archivos)
        instance.archivos_proformas = validated_data.get('archivos_proformas', instance.archivos_proformas)
        instance.archivos_certificacion = validated_data.get('archivos_certificacion', instance.archivos_certificacion)
        instance.archivos_otros = validated_data.get('archivos_otros', instance.archivos_otros)
        instance.catalogo_elect = validated_data.get('catalogo_elect', instance.catalogo_elect)
        instance.func_reasignado_id = validated_data.get('func_reasignado_id', instance.func_reasignado_id)
        instance.doc_tic = validated_data.get('doc_tic', instance.doc_tic)
        instance.doc_mantenimiento = validated_data.get('doc_mantenimiento', instance.doc_mantenimiento)
        instance.doc_obracivil = validated_data.get('doc_obracivil', instance.doc_obracivil)
        instance.estado_tramite = validated_data.get('estado_tramite', instance.estado_tramite)

        print("--------------->>>>>>2222")

        detalle_data = validated_data.pop('det_certificaciones')
        cabecera = CommonFieldsSerializer.update(self, instance, validated_data)
        print("--------------->>>>>>detalle data");
        print(cabecera);
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_data:
            #CAMPOS INFORMACION DEL USUARIO
            #id_detalle = detalle.pop('daf_certificaciones')
            id_detalle = uuid.uuid4()
            #DafCertificacionesDetalles.objects.filter(id=id_detalle).update(id=id_detalle, **detalle) 
            #detalle['id'] = uuid.uuid4()
            #detalle['id'] = id_detalle
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            #DafCertificacionesDetalles.objects.create(daf_certificaciones_id=cabecera, **detalle)
            #DafCertificacionesDetalles.objects.update(id=id_detalle, **detalle)

            DafCertificacionesDetalles.objects.create(id=id_detalle, **detalle)
        
        return cabecera