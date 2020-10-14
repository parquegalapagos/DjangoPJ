# DJANGO
import uuid
from datetime import datetime,date
from django.contrib.auth.models import User
from django.conf import settings

# REST
from rest_framework import serializers

# Serializador
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer
from ap_api.v1.serializers.sz_sis import Sis_CatalogoSerializer_short,SisParametrosConfigSerializer_short
from ap_api.v1.serializers.sz_per import Per_FuncionarioSerializer_short, Per_PersonaSerializer_short
from ap_api.v1.serializers.sz_geo import *
from ap_api.v1.serializers.sz_cuem import *
from ap_api.v1.serializers.sz_lic import *
from ap_api.v1.serializers.sz_pat import *
from ap_api.v1.serializers.sz_bsa import *
from ap_api.v1.serializers.sz_tpr import *
# Modelos
from ap_cuem_manejopesquero.models import *
from ap_serv_ambientales.models import *
from ap_cuso_controlmarino.models import *
from ap_cuso_controlinsular.models import *
from ap_talentohumano.models import PerFuncionarioAuth




# AppFdT_licenciaparma
class CmnActavisitainspecEmbPescaTripulacionSerializer(CommonFieldsSerializer):
    #parma_id = AppFdT_licenciaparmaSerializer_list()
    class Meta:
        model = CmnActavisitainspecEmbPescaTripulacion
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,  )
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion
        
        instance.parma_id = validated_data.get('parma_id', instance.parma_id)
        instance.cab_actpescaemb_id = validated_data.get('cab_actpescaemb_id', instance.cab_actpescaemb_id)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class CmnActavisitainspecEmbPescaTripulacionSerializer_list(CommonFieldsSerializer):
    parma_id = AppFdT_licenciaparmaSerializer_list()
    class Meta:
        model = CmnActavisitainspecEmbPescaTripulacion
        fields = '__all__'



# AppFdT_licenciaparma
class CmnActavisitainspecEmbPescaObservacionesSerializer(CommonFieldsSerializer):
    #observacion_id = Sis_CatalogoSerializer_short()
    #observacion_id = serializers.UUIDField(format='hex_verbose',required=False)
    class Meta:
        model = CmnActavisitainspecEmbPescaObservaciones
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,  )
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion
        
        instance.cab_actpescaemb_id = validated_data.get('cab_actpescaemb_id', instance.cab_actpescaemb_id)
        instance.observacion_id = validated_data.get('observacion_id', instance.observacion_id)
        instance.respuesta = validated_data.get('respuesta', instance.respuesta)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class CmnActavisitainspecEmbPescaObservacionesSerializer_list(CommonFieldsSerializer):
    observacion_id = Sis_CatalogoSerializer_short()
    class Meta:
        model = CmnActavisitainspecEmbPescaObservaciones
        fields = '__all__'
        #fields = ['id','observacion_id','respuesta','observaciones','cab_actpescaemb_id']


# AppFdT_datospescador
class CmnActavisitainspecEmbpescaSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CmnActavisitainspecEmbpesca
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CmnActavisitainspecEmbpesca)
        return item

    def update(self, instance, validated_data):
        # Campos AppFdTdatospescador

        instance.secuencia = validated_data.get('secuencia', instance.secuencia)
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.proceso_estatuto_id = validated_data.get('proceso_estatuto_id', instance.proceso_estatuto_id)
        instance.subproceso_estatuto_id = validated_data.get('subproceso_estatuto_id', instance.subproceso_estatuto_id)
        instance.sitio_inspeccion_id = validated_data.get('sitio_inspeccion_id', instance.sitio_inspeccion_id)
        instance.referencia = validated_data.get('referencia', instance.referencia)
        instance.latitud = validated_data.get('latitud', instance.latitud)
        instance.longitud = validated_data.get('longitud', instance.longitud)
        instance.permisopesca_id = validated_data.get('permisopesca_id', instance.permisopesca_id)
        instance.capitan_id = validated_data.get('capitan_id', instance.capitan_id)
        instance.num_tripulantes = validated_data.get('num_tripulantes', instance.num_tripulantes)
        instance.ultimopuertovisitado_id = validated_data.get('ultimopuertovisitado_id', instance.ultimopuertovisitado_id)
        instance.guardaparque_id = validated_data.get('guardaparque_id', instance.guardaparque_id)
        instance.autoridadmaritima_id = validated_data.get('autoridadmaritima_id', instance.autoridadmaritima_id)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class CmnActavisitainspecEmbpescaSerializer_list(CommonFieldsSerializer):
    det_tripulacion = CmnActavisitainspecEmbPescaTripulacionSerializer_list(many=True, read_only=True)
    det_observaciones = CmnActavisitainspecEmbPescaObservacionesSerializer_list(many=True, read_only=True)
    capitan_id = Per_PersonaSerializer_short()
    sitio_inspeccion_id = Geo_SitioSerializer_short()
    ultimopuertovisitado_id = Geo_SitioSerializer_short()
    guardaparque_id = Per_FuncionarioSerializer_short()
    autoridadmaritima_id = Per_PersonaSerializer_short()
    permisopesca_id = AppFdTpermisopescaSerializer_list()

    class Meta:
        model = CmnActavisitainspecEmbpesca
        fields = '__all__'


#cabecera detalle informe campo
class CmnActavisitainspecEmbpescaCabDetSerializer(CommonFieldsSerializer):
    #migrar =  serializers.BooleanField(required=False)
    det_observaciones = CmnActavisitainspecEmbPescaObservacionesSerializer(many=True)
    det_tripulacion   = CmnActavisitainspecEmbPescaTripulacionSerializer(many=True)


    class Meta:
        model = CmnActavisitainspecEmbpesca
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        detalle_dataO = validated_data.pop('det_observaciones')
        detalle_dataT = validated_data.pop('det_tripulacion')
        cabecera = CommonFieldsSerializer.create(self, validated_data, CmnActavisitainspecEmbpesca)
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_dataO:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            CmnActavisitainspecEmbPescaObservaciones.objects.create(cab_actpescaemb_id=cabecera, **detalle)

        for detalle in detalle_dataT:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            CmnActavisitainspecEmbPescaTripulacion.objects.create(cab_actpescaemb_id=cabecera, **detalle)

        return cabecera

    def update(self, instance, validated_data):
        print("--------------->>>>>>")
        print(validated_data)
        print("--------------->>>>>>IIIIIIIIIIIIIIII")
        print(instance)
        # Campos PerPersona
        
        instance.secuencia = validated_data.get('secuencia', instance.secuencia)
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.proceso_estatuto_id = validated_data.get('proceso_estatuto_id', instance.proceso_estatuto_id)
        instance.subproceso_estatuto_id = validated_data.get('subproceso_estatuto_id', instance.subproceso_estatuto_id)
        instance.sitio_inspeccion_id = validated_data.get('sitio_inspeccion_id', instance.sitio_inspeccion_id)
        instance.referencia = validated_data.get('referencia', instance.referencia)
        instance.latitud = validated_data.get('latitud', instance.latitud)
        instance.longitud = validated_data.get('longitud', instance.longitud)
        instance.permisopesca_id = validated_data.get('permisopesca_id', instance.permisopesca_id)
        instance.capitan_id = validated_data.get('capitan_id', instance.capitan_id)
        instance.num_tripulantes = validated_data.get('num_tripulantes', instance.num_tripulantes)
        instance.ultimopuertovisitado_id = validated_data.get('ultimopuertovisitado_id', instance.ultimopuertovisitado_id)
        instance.guardaparque_id = validated_data.get('guardaparque_id', instance.guardaparque_id)
        instance.autoridadmaritima_id = validated_data.get('autoridadmaritima_id', instance.autoridadmaritima_id)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        
        print("--------------->>>>>>2222")
        detalle_dataO = validated_data.pop('det_observaciones')
        detalle_dataT = validated_data.pop('det_tripulacion')

        print(detalle_dataT)

        cabecera = CommonFieldsSerializer.update(self, instance, validated_data)
        
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_dataO:
            #CAMPOS INFORMACION DEL USUARIO
            id_detalle = detalle.pop('id')
            #detalle.observacion_id = SisCatalogo(id=detalle.observacion_id)
            CmnActavisitainspecEmbPescaObservaciones.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)

        for detalle in detalle_dataT:
            #CAMPOS INFORMACION DEL USUARIO
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle != 0:
                CmnActavisitainspecEmbPescaTripulacion.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)
            else:                    
                detalle['id'] = uuid.uuid4()
                CmnActavisitainspecEmbPescaTripulacion.objects.filter(cab_actpescaemb_id=detalle['cab_actpescaemb_id']).create(**detalle)   
        
        return cabecera


# AppFdT_licenciaparma
class CmnActaInspecEmbarTuristicaTripulacionSerializer(CommonFieldsSerializer):
    #parma_id = AppFdT_licenciaparmaSerializer_list()
    class Meta:
        model = CmnActaInspecEmbarTuristicaTripulacion
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,  )
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion
        
        instance.licguia_id = validated_data.get('licguia_id', instance.licguia_id)
        instance.cab_actinspecemb_id = validated_data.get('cab_actinspecemb_id', instance.cab_actinspecemb_id)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class CmnActaInspecEmbarTuristicaTripulacionSerializer_list(CommonFieldsSerializer):
    licguia_id = Lic_GuiaSerializer_list()
    class Meta:
        model = CmnActaInspecEmbarTuristicaTripulacion
        fields = '__all__'



# AppFdT_licenciaparma
class CmnActaInspecEmbarTuristicaObservacionesSerializer(CommonFieldsSerializer):
    #observacion_id = Sis_CatalogoSerializer_short()
    #observacion_id = serializers.UUIDField(format='hex_verbose',required=False)
    class Meta:
        model = CmnActaInspecEmbarTuristicaObservaciones
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,  )
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion
        
        instance.cab_actinspecemb_id = validated_data.get('cab_actinspecemb_id', instance.cab_actinspecemb_id)
        instance.observacion_id = validated_data.get('observacion_id', instance.observacion_id)
        instance.respuesta = validated_data.get('respuesta', instance.respuesta)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class CmnActaInspecEmbarTuristicaObservacionesSerializer_list(CommonFieldsSerializer):
    observacion_id = Sis_CatalogoSerializer_short()
    class Meta:
        model = CmnActaInspecEmbarTuristicaObservaciones
        fields = '__all__'
        #fields = ['id','observacion_id','respuesta','observaciones','cab_actpescaemb_id']


# AppFdT_datospescador
class CmnActaInspecEmbarTuristicaSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CmnActaInspecEmbarTuristica
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CmnActaInspecEmbarTuristica)
        return item

    def update(self, instance, validated_data):
        # Campos AppFdTdatospescador

        instance.secuencia = validated_data.get('secuencia', instance.secuencia)
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.proceso_estatuto_id = validated_data.get('proceso_estatuto_id', instance.proceso_estatuto_id)
        instance.subproceso_estatuto_id = validated_data.get('subproceso_estatuto_id', instance.subproceso_estatuto_id)
        instance.sitio_inspeccion_id = validated_data.get('sitio_inspeccion_id', instance.sitio_inspeccion_id)
        instance.referencia = validated_data.get('referencia', instance.referencia)
        instance.latitud = validated_data.get('latitud', instance.latitud)
        instance.longitud = validated_data.get('longitud', instance.longitud)
        instance.embarcacion_id = validated_data.get('embarcacion_id', instance.embarcacion_id)
        instance.capitan_id = validated_data.get('capitan_id', instance.capitan_id)
        instance.num_tripulantes = validated_data.get('num_tripulantes', instance.num_tripulantes)
        instance.ultimopuertovisitado_id = validated_data.get('ultimopuertovisitado_id', instance.ultimopuertovisitado_id)
        instance.guardaparque_id = validated_data.get('guardaparque_id', instance.guardaparque_id)
        instance.autoridadmaritima_id = validated_data.get('autoridadmaritima_id', instance.autoridadmaritima_id)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class CmnActaInspecEmbarTuristicaSerializer_list(CommonFieldsSerializer):
    det_tripulacion = CmnActaInspecEmbarTuristicaTripulacionSerializer_list(many=True, read_only=True)
    det_observaciones = CmnActaInspecEmbarTuristicaObservacionesSerializer_list(many=True, read_only=True)
    capitan_id = Per_PersonaSerializer_short()
    sitio_inspeccion_id = Geo_SitioSerializer_short()
    ultimopuertovisitado_id = Geo_SitioSerializer_short()
    guardaparque_id = Per_FuncionarioSerializer_short()
    autoridadmaritima_id = Per_PersonaSerializer_short()
    embarcacion_id = Pat_PatenteSerializer_list()

    class Meta:
        model = CmnActaInspecEmbarTuristica
        fields = '__all__'


#cabecera detalle informe campo
class CmnActaInspecEmbarTuristicaCabDetSerializer(CommonFieldsSerializer):
    #migrar =  serializers.BooleanField(required=False)
    det_observaciones = CmnActaInspecEmbarTuristicaObservacionesSerializer(many=True)
    det_tripulacion   = CmnActaInspecEmbarTuristicaTripulacionSerializer(many=True)


    class Meta:
        model = CmnActaInspecEmbarTuristica
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        detalle_dataO = validated_data.pop('det_observaciones')
        detalle_dataT = validated_data.pop('det_tripulacion')
        cabecera = CommonFieldsSerializer.create(self, validated_data, CmnActaInspecEmbarTuristica)
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_dataO:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            CmnActaInspecEmbarTuristicaObservaciones.objects.create(cab_actinspecemb_id=cabecera, **detalle)

        for detalle in detalle_dataT:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            CmnActaInspecEmbarTuristicaTripulacion.objects.create(cab_actinspecemb_id=cabecera, **detalle)

        return cabecera

    def update(self, instance, validated_data):
        print("--------------->>>>>>")
        print(validated_data)
        print("--------------->>>>>>IIIIIIIIIIIIIIII")
        print(instance)
        # Campos PerPersona
        
        instance.secuencia = validated_data.get('secuencia', instance.secuencia)
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.proceso_estatuto_id = validated_data.get('proceso_estatuto_id', instance.proceso_estatuto_id)
        instance.subproceso_estatuto_id = validated_data.get('subproceso_estatuto_id', instance.subproceso_estatuto_id)
        instance.sitio_inspeccion_id = validated_data.get('sitio_inspeccion_id', instance.sitio_inspeccion_id)
        instance.referencia = validated_data.get('referencia', instance.referencia)
        instance.latitud = validated_data.get('latitud', instance.latitud)
        instance.longitud = validated_data.get('longitud', instance.longitud)
        instance.embarcacion_id = validated_data.get('embarcacion_id', instance.embarcacion_id)
        instance.capitan_id = validated_data.get('capitan_id', instance.capitan_id)
        instance.num_tripulantes = validated_data.get('num_tripulantes', instance.num_tripulantes)
        instance.ultimopuertovisitado_id = validated_data.get('ultimopuertovisitado_id', instance.ultimopuertovisitado_id)
        instance.guardaparque_id = validated_data.get('guardaparque_id', instance.guardaparque_id)
        instance.autoridadmaritima_id = validated_data.get('autoridadmaritima_id', instance.autoridadmaritima_id)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        
        print("--------------->>>>>>2222")
        detalle_dataO = validated_data.pop('det_observaciones')
        detalle_dataT = validated_data.pop('det_tripulacion')

        print(detalle_dataT)

        cabecera = CommonFieldsSerializer.update(self, instance, validated_data)
        
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_dataO:
            #CAMPOS INFORMACION DEL USUARIO
            id_detalle = detalle.pop('id')
            #detalle.observacion_id = SisCatalogo(id=detalle.observacion_id)
            CmnActaInspecEmbarTuristicaObservaciones.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)

        for detalle in detalle_dataT:
            #CAMPOS INFORMACION DEL USUARIO
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle != 0:
                CmnActaInspecEmbarTuristicaTripulacion.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)        
            else:                    
                detalle['id'] = uuid.uuid4()
                CmnActaInspecEmbarTuristicaTripulacion.objects.filter(cab_actinspecemb_id=detalle['cab_actinspecemb_id']).create(**detalle)

        return cabecera


#InformenovedadesDetalle    
class CmnInformeNovedadesDetalleSerializer(CommonFieldsSerializer):

    class Meta:
        model = CmnInformeNovedadesDetalle
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, CmnInformeNovedadesDetalle)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.cab_infnovedades_id = validated_data.get('cab_infnovedades_id', instance.cab_infnovedades_id)
        instance.foto = validated_data.get('foto', instance.foto)
        instance.orden = validated_data.get('orden', instance.orden)
        instance.comentario = validated_data.get('comentario', instance.comentario)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class CmnInformeNovedadesDetalleSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = CmnInformeNovedadesDetalle
        fields = '__all__'

#InformenovedadesDetalle    
class CmnInformeNovedadesParticipantesSerializer(CommonFieldsSerializer):

    class Meta:
        model = CmnInformeNovedadesParticipantes
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, CmnInformeNovedadesParticipantes)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.cab_infnovedades_id = validated_data.get('cab_infnovedades_id', instance.cab_infnovedades_id)
        instance.funcionario_id = validated_data.get('funcionario_id', instance.funcionario_id)
        instance.persona_id = validated_data.get('persona_id', instance.persona_id)
        instance.tipo = validated_data.get('tipo', instance.tipo)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class CmnInformeNovedadesParticipantesSerializer_list(CommonFieldsSerializer):
    funcionario_id = Per_FuncionarioSerializer_short()
    persona_id = Per_PersonaSerializer_short()
    class Meta:
        model = CmnInformeNovedadesParticipantes
        fields = '__all__'


#InformeCampoCab    
class CmnInformeNovedadesSerializer(CommonFieldsSerializer):

    class Meta:
        model = CmnInformeNovedades
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, CmnInformeNovedades)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.proceso = validated_data.get('proceso', instance.proceso)
        instance.subproceso = validated_data.get('subproceso', instance.subproceso)
        instance.numero = validated_data.get('numero', instance.numero)
        instance.sitio_id = validated_data.get('sitio_id', instance.sitio_id)
        instance.actividad = validated_data.get('actividad', instance.actividad)
        instance.oficina_id = validated_data.get('oficina_id', instance.oficina_id)
        instance.fecha_elaboracion = validated_data.get('fecha_elaboracion', instance.fecha_elaboracion)
        instance.transporte_id = validated_data.get('transporte_id', instance.transporte_id)
        instance.embarcacion_id = validated_data.get('embarcacion_id', instance.embarcacion_id)
        instance.transporte_otro = validated_data.get('transporte_otro', instance.transporte_otro)
        instance.introduccion = validated_data.get('introduccion', instance.introduccion)
        instance.objetivos_gen = validated_data.get('objetivos_gen', instance.objetivos_gen)
        instance.objetivos_esp = validated_data.get('objetivos_esp', instance.objetivos_esp)
        instance.materiales = validated_data.get('materiales', instance.materiales)
        instance.metodologia = validated_data.get('metodologia', instance.metodologia)
        instance.desarrollo = validated_data.get('desarrollo', instance.desarrollo)
        instance.resultados = validated_data.get('resultados', instance.resultados)
        instance.consclusiones = validated_data.get('consclusiones', instance.consclusiones)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class CmnInformeNovedadesSerializer_list(CommonFieldsSerializer):
    det_infnovedades_cuso = CmnInformeNovedadesDetalleSerializer(many=True, read_only=True)
    det_infnovedadespar_cuso = CmnInformeNovedadesParticipantesSerializer_list(many=True, read_only=True)
    sitio_id = Geo_SitioSerializer_short()
    oficina_id = Geo_IslaSerializer_short()
    transporte_id = TrpVehiculoSerializer_list()
    class Meta:
        model = CmnInformeNovedades
        fields = '__all__'


#cabecera detalle informe campo
class CmnInformeNovedadesCabDetSerializer(CommonFieldsSerializer):
    #migrar =  serializers.BooleanField(required=False)
    det_infnovedades_cuso = CmnInformeNovedadesDetalleSerializer(many=True)
    det_infnovedadespar_cuso = CmnInformeNovedadesParticipantesSerializer(many=True)

    class Meta:
        model = CmnInformeNovedades
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        detalle_data = validated_data.pop('det_infnovedades_cuso')
        detalle_participantes = validated_data.pop('det_infnovedadespar_cuso')

        cabecera = CommonFieldsSerializer.create(self, validated_data, CmnInformeNovedades)
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_data:
            #CAMPOS INFORMACION DEL USUARIO
            if(detalle['foto']!=""):
                detalle['id'] = uuid.uuid4()
                detalle['usuario_ingreso'] = self.context['request'].user.username
                detalle['isla_usuario_ingreso_id'] = isla_obj
                #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
                CmnInformeNovedadesDetalle.objects.create(cab_infnovedades_id=cabecera, **detalle)

        for detalle in detalle_participantes:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            print("**********CmnParticipantesActaRetencion")
            #print(detalle)
            CmnInformeNovedadesParticipantes.objects.create(cab_infnovedades_id=cabecera, **detalle)
        return cabecera

    def update(self, instance, validated_data):
        print("--------------->>>>>>")
        print(validated_data)
        print("--------------->>>>>>IIIIIIIIIIIIIIII")
        print(instance)
        # Campos PerPersona
        
        instance.proceso = validated_data.get('proceso', instance.proceso)
        instance.subproceso = validated_data.get('subproceso', instance.subproceso)
        instance.numero = validated_data.get('numero', instance.numero)
        instance.sitio_id = validated_data.get('sitio_id', instance.sitio_id)
        instance.actividad = validated_data.get('actividad', instance.actividad)
        instance.oficina_id = validated_data.get('oficina_id', instance.oficina_id)
        instance.fecha_elaboracion = validated_data.get('fecha_elaboracion', instance.fecha_elaboracion)
        instance.transporte_id = validated_data.get('transporte_id', instance.transporte_id)
        instance.embarcacion_id = validated_data.get('embarcacion_id', instance.embarcacion_id)
        instance.transporte_otro = validated_data.get('transporte_otro', instance.transporte_otro)
        instance.introduccion = validated_data.get('introduccion', instance.introduccion)
        instance.objetivos_gen = validated_data.get('objetivos_gen', instance.objetivos_gen)
        instance.objetivos_esp = validated_data.get('objetivos_esp', instance.objetivos_esp)
        instance.materiales = validated_data.get('materiales', instance.materiales)
        instance.metodologia = validated_data.get('metodologia', instance.metodologia)
        instance.desarrollo = validated_data.get('desarrollo', instance.desarrollo)
        instance.resultados = validated_data.get('resultados', instance.resultados)
        instance.consclusiones = validated_data.get('consclusiones', instance.consclusiones)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)
        
        print("--------------->>>>>>2222")

        detalle_data = validated_data.pop('det_infnovedades_cuso')
        detalle_participantes = validated_data.pop('det_infnovedadespar_cuso')

        cabecera = CommonFieldsSerializer.update(self, instance, validated_data)
        
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_data:
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle != 0:
                CmnInformeNovedadesDetalle.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)           
            else:                    
                detalle['id'] = uuid.uuid4()
                CmnInformeNovedadesDetalle.objects.filter(cab_infnovedades_id=detalle['cab_infnovedades_id']).create(**detalle)

        for detalle in detalle_participantes:
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle != 0:
                CmnInformeNovedadesParticipantes.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)           
            else:                    
                detalle['id'] = uuid.uuid4()
                CmnInformeNovedadesParticipantes.objects.filter(cab_infnovedades_id=detalle['cab_infnovedades_id']).create(**detalle)  
        
        return cabecera


#InformenovedadesDetalle    
class CmnInformeMonitoreoDetalleSerializer(CommonFieldsSerializer):

    class Meta:
        model = CmnInformeMonitoreoDetalle
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, CmnInformeMonitoreoDetalle)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.cab_infmonitoreo_id = validated_data.get('cab_infmonitoreo_id', instance.cab_infmonitoreo_id)
        instance.foto = validated_data.get('foto', instance.foto)
        instance.orden = validated_data.get('orden', instance.orden)
        instance.comentario = validated_data.get('comentario', instance.comentario)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class CmnInformeMonitoreoDetalleSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = CmnInformeMonitoreoDetalle
        fields = '__all__'

#InformeMonitoreoCab    
class CmnInformeMonitoreoSerializer(CommonFieldsSerializer):

    class Meta:
        model = CmnInformeMonitoreo
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, CmnInformeMonitoreo)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.direccion = validated_data.get('direccion', instance.direccion)
        instance.proceso = validated_data.get('proceso', instance.proceso)
        instance.subproceso = validated_data.get('subproceso', instance.subproceso)
        instance.numero = validated_data.get('numero', instance.numero)
        instance.asunto = validated_data.get('asunto', instance.asunto)
        instance.funcionario_id = validated_data.get('funcionario_id', instance.funcionario_id)
        instance.fecha_presentacion = validated_data.get('fecha_presentacion', instance.fecha_presentacion)
        instance.introduccion = validated_data.get('introduccion', instance.introduccion)
        instance.desarrollo = validated_data.get('desarrollo', instance.desarrollo)
        instance.actividad_observada = validated_data.get('actividad_observada', instance.actividad_observada)
        instance.observacionesR = validated_data.get('observacionesR', instance.observacionesR)      
        instance.conclusiones = validated_data.get('conclusiones', instance.conclusiones)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class CmnInformeMonitoreoSerializer_list(CommonFieldsSerializer):
    det_infmonitoreo_id = CmnInformeMonitoreoDetalleSerializer(many=True, read_only=True)
    funcionario_id = Per_FuncionarioSerializer_short()
    class Meta:
        model = CmnInformeMonitoreo
        fields = '__all__'


#cabecera detalle informe campo
class CmnInformeMonitoreoCabDetSerializer(CommonFieldsSerializer):
    #migrar =  serializers.BooleanField(required=False)
    det_infmonitoreo_id = CmnInformeMonitoreoDetalleSerializer(many=True)

    class Meta:
        model = CmnInformeMonitoreo
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        detalle_data = validated_data.pop('det_infmonitoreo_id')
        cabecera = CommonFieldsSerializer.create(self, validated_data, CmnInformeMonitoreo)
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_data:
            #CAMPOS INFORMACION DEL USUARIO
            if(detalle['foto']!=""):
                detalle['id'] = uuid.uuid4()
                detalle['usuario_ingreso'] = self.context['request'].user.username
                detalle['isla_usuario_ingreso_id'] = isla_obj
                #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
                CmnInformeMonitoreoDetalle.objects.create(cab_infmonitoreo_id=cabecera, **detalle)
        return cabecera

    def update(self, instance, validated_data):
        print("--------------->>>>>>")
        print(validated_data)
        print("--------------->>>>>>IIIIIIIIIIIIIIII")
        print(instance)
        # Campos PerPersona
        
        instance.direccion = validated_data.get('direccion', instance.direccion)
        instance.proceso = validated_data.get('proceso', instance.proceso)
        instance.subproceso = validated_data.get('subproceso', instance.subproceso)
        instance.numero = validated_data.get('numero', instance.numero)
        instance.asunto = validated_data.get('asunto', instance.asunto)
        instance.funcionario_id = validated_data.get('funcionario_id', instance.funcionario_id)
        instance.fecha_presentacion = validated_data.get('fecha_presentacion', instance.fecha_presentacion)
        instance.introduccion = validated_data.get('introduccion', instance.introduccion)
        instance.desarrollo = validated_data.get('desarrollo', instance.desarrollo)
        instance.actividad_observada = validated_data.get('actividad_observada', instance.actividad_observada)
        instance.observacionesR = validated_data.get('observacionesR', instance.observacionesR)      
        instance.conclusiones = validated_data.get('conclusiones', instance.conclusiones)
        instance.observacionesR = validated_data.get('observacionesR', instance.observacionesR)
        instance.estado = validated_data.get('estado', instance.estado)
        
        print("--------------->>>>>>2222")

        detalle_data = validated_data.pop('det_infmonitoreo_id')
        cabecera = CommonFieldsSerializer.update(self, instance, validated_data)
        
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_data:
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle != 0:
                CmnInformeMonitoreoDetalle.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)           
            else:                    
                detalle['id'] = uuid.uuid4()
                CmnInformeMonitoreoDetalle.objects.filter(cab_infmonitoreo_id=detalle['cab_infmonitoreo_id']).create(**detalle)  
        
        return cabecera


#InformenovedadesDetalle    
class CmnEmbarcacionesPatrullaSerializer(CommonFieldsSerializer):

    class Meta:
        model = CmnEmbarcacionesPatrulla
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, CmnEmbarcacionesPatrulla)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.tipo = validated_data.get('tipo', instance.tipo)
        instance.matricula = validated_data.get('matricula', instance.matricula)
        instance.nominativo = validated_data.get('nominativo', instance.nominativo)
        instance.velocidad = validated_data.get('velocidad', instance.velocidad)
        instance.num_tripulantes = validated_data.get('num_tripulantes', instance.num_tripulantes)
        instance.puerto_operacion_id = validated_data.get('puerto_operacion_id', instance.puerto_operacion_id)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class CmnEmbarcacionesPatrullaSerializer_list(CommonFieldsSerializer):
    puerto_operacion_id = Geo_SitioSerializer_short()
    class Meta:
        model = CmnEmbarcacionesPatrulla
        fields = '__all__'


#PatrullaDetalle    
class CmnPlanPatrullaDetalleSerializer(CommonFieldsSerializer):

    class Meta:
        model = CmnPlanPatrullaDetalle
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, CmnPlanPatrullaDetalle)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.cab_planpatrulla_id = validated_data.get('cab_planpatrulla_id', instance.cab_planpatrulla_id)
        instance.foto = validated_data.get('foto', instance.foto)
        instance.orden = validated_data.get('orden', instance.orden)
        instance.comentario = validated_data.get('comentario', instance.comentario)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class CmnPlanPatrullaDetalleSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = CmnPlanPatrullaDetalle
        fields = '__all__'

#plan Patrulla   
class CmnPlanPatrullaSerializer(CommonFieldsSerializer):

    class Meta:
        model = CmnPlanPatrulla
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, CmnPlanPatrulla)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.embarcacion_id = validated_data.get('embarcacion_id', instance.embarcacion_id)
        instance.responsable_id = validated_data.get('responsable_id', instance.responsable_id)
        instance.islas = validated_data.get('islas', instance.islas)
        instance.sitios = validated_data.get('sitios', instance.sitios)
        instance.total_millas = validated_data.get('total_millas', instance.total_millas)
        instance.tiempo_operacion = validated_data.get('tiempo_operacion', instance.tiempo_operacion)
        instance.fecha_inicio = validated_data.get('fecha_inicio', instance.fecha_inicio)
        instance.fecha_fin = validated_data.get('fecha_fin', instance.fecha_fin)
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.observacion = validated_data.get('observacion', instance.observacion)      
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.autorizado_id = validated_data.get('autorizado_id', instance.autorizado_id)
        instance.elaborado1_id = validated_data.get('elaborado1_id', instance.elaborado1_id)
        instance.elaborado2_id = validated_data.get('elaborado2_id', instance.elaborado2_id)
        instance.lider_id = validated_data.get('lider_id', instance.lider_id)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class CmnPlanPatrullaSerializer_list(CommonFieldsSerializer):
    det_planpatrulla_id = CmnPlanPatrullaDetalleSerializer(many=True, read_only=True)
    embarcacion_id = CmnEmbarcacionesPatrullaSerializer_list()
    responsable_id = Per_PersonaSerializer_short()
    elaborado1_id  = Per_FuncionarioSerializer_short()
    elaborado2_id  = Per_FuncionarioSerializer_short()
    autorizado_id  = Per_FuncionarioSerializer_short()
    lider_id  = Per_FuncionarioSerializer_short()
    class Meta:
        model = CmnPlanPatrulla
        fields = '__all__'


#cabecera detalle informe campo
class CmnPlanPatrullaCabDetSerializer(CommonFieldsSerializer):
    #migrar =  serializers.BooleanField(required=False)
    det_planpatrulla_id = CmnPlanPatrullaDetalleSerializer(many=True)

    class Meta:
        model = CmnPlanPatrulla
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        detalle_data = validated_data.pop('det_planpatrulla_id')
        cabecera = CommonFieldsSerializer.create(self, validated_data, CmnPlanPatrulla)
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_data:
            #CAMPOS INFORMACION DEL USUARIO
            if(detalle['foto']!=""):
                detalle['id'] = uuid.uuid4()
                detalle['usuario_ingreso'] = self.context['request'].user.username
                detalle['isla_usuario_ingreso_id'] = isla_obj
                #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
                CmnPlanPatrullaDetalle.objects.create(cab_planpatrulla_id=cabecera, **detalle)
        return cabecera

    def update(self, instance, validated_data):
        print("--------------->>>>>>")
        print(validated_data)
        print("--------------->>>>>>IIIIIIIIIIIIIIII")
        print(instance)
        # Campos PerPersona
        
        instance.embarcacion_id = validated_data.get('embarcacion_id', instance.embarcacion_id)
        instance.responsable_id = validated_data.get('responsable_id', instance.responsable_id)
        instance.islas = validated_data.get('islas', instance.islas)
        instance.sitios = validated_data.get('sitios', instance.sitios)
        instance.total_millas = validated_data.get('total_millas', instance.total_millas)
        instance.tiempo_operacion = validated_data.get('tiempo_operacion', instance.tiempo_operacion)
        instance.fecha_inicio = validated_data.get('fecha_inicio', instance.fecha_inicio)
        instance.fecha_fin = validated_data.get('fecha_fin', instance.fecha_fin)
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.observacion = validated_data.get('observacion', instance.observacion)      
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.autorizado_id = validated_data.get('autorizado_id', instance.autorizado_id)
        instance.elaborado1_id = validated_data.get('elaborado1_id', instance.elaborado1_id)
        instance.elaborado2_id = validated_data.get('elaborado2_id', instance.elaborado2_id)
        instance.lider_id = validated_data.get('lider_id', instance.lider_id)
        
        print("--------------->>>>>>2222")

        detalle_data = validated_data.pop('det_planpatrulla_id')
        cabecera = CommonFieldsSerializer.update(self, instance, validated_data)
        
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_data:
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle != 0:
                CmnPlanPatrullaDetalle.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)           
            else:                    
                detalle['id'] = uuid.uuid4()
                CmnPlanPatrullaDetalle.objects.filter(cab_planpatrulla_id=detalle['cab_planpatrulla_id']).create(**detalle)  
        
        return cabecera



# AppFdT_licenciaparma
class CmnProductosRetencionSerializer(CommonFieldsSerializer):
    #parma_id = AppFdT_licenciaparmaSerializer_list()
    class Meta:
        model = CmnProductosRetencion
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,  )
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion      
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.tipo = validated_data.get('tipo', instance.tipo)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class CmnProductosRetencionSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = CmnProductosRetencion
        fields = ['id','descripcion','tipo','estado']



# AppFdT_licenciaparma
class CmnParticipantesActaRetencionSerializer(CommonFieldsSerializer):
    #parma_id = AppFdT_licenciaparmaSerializer_list()
    class Meta:
        model = CmnParticipantesActaRetencion
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,  )
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion      
        instance.acta_retencion_id = validated_data.get('acta_retencion_id', instance.acta_retencion_id)
        instance.funcionario_id = validated_data.get('funcionario_id', instance.funcionario_id)
        instance.persona_id = validated_data.get('persona_id', instance.persona_id)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class CmnParticipantesActaRetencionSerializer_list(CommonFieldsSerializer):
    funcionario_id = Per_FuncionarioSerializer_short()
    persona_id     = Per_PersonaSerializer_short()
    class Meta:
        model = CmnParticipantesActaRetencion
        fields = '__all__'

class CmnImplicadosActaRetencionSerializer(CommonFieldsSerializer):
    #parma_id = AppFdT_licenciaparmaSerializer_list()
    class Meta:
        model = CmnImplicadosActaRetencion
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,  )
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion      
        instance.acta_retencion_id = validated_data.get('acta_retencion_id', instance.acta_retencion_id)
        instance.parma_id = validated_data.get('parma_id', instance.parma_id)
        instance.persona_id = validated_data.get('persona_id', instance.persona_id)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.resistencia = validated_data.get('resistencia', instance.resistencia)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class CmnImplicadosActaRetencionSerializer_list(CommonFieldsSerializer):
    parma_id    = AppFdT_licenciaparmaSerializer_list()
    persona_id  = Per_PersonaSerializer_short()
    class Meta:
        model = CmnImplicadosActaRetencion
        fields = '__all__'

# AppFdT_licenciaparma
class CmnProductosActaRetencionSerializer(CommonFieldsSerializer):
    #producto_id = CmnProductosRetencionSerializer_list()
    class Meta:
        model = CmnProductosActaRetencion
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,  )
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion   
        instance.acta_retencion_id = validated_data.get('acta_retencion_id', instance.acta_retencion_id)
        instance.producto_id = validated_data.get('producto_id', instance.producto_id)
        instance.cantidad = validated_data.get('cantidad', instance.cantidad)
        instance.estado_producto = validated_data.get('estado_producto', instance.estado_producto)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class CmnProductosActaRetencionSerializer_list(CommonFieldsSerializer):
    producto_id = CmnProductosRetencionSerializer_list()
    class Meta:
        model = CmnProductosActaRetencion
        fields = '__all__'
        #fields = ['id','observacion_id','respuesta','observaciones','cab_actpescaemb_id']


# AppFdT_datospescador
class CmnActaRetencionSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CmnActaRetencion
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CmnActaRetencion)
        return item

    def update(self, instance, validated_data):
        # Campos AppFdTdatospescador

        instance.numero = validated_data.get('numero', instance.numero)
        instance.acta_inspeccion_id = validated_data.get('acta_inspeccion_id', instance.acta_inspeccion_id)
        instance.tipo_retencion = validated_data.get('tipo_retencion', instance.tipo_retencion)
        instance.testigo_id = validated_data.get('testigo_id', instance.testigo_id)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class CmnActaRetencionSerializer_list(CommonFieldsSerializer):
    acta_inspeccion_id = CmnActavisitainspecEmbpescaSerializer_list()
    testigo_id = Per_PersonaSerializer_short();
    det_productos = CmnProductosActaRetencionSerializer_list(many=True, read_only=True)
    det_participantes = CmnParticipantesActaRetencionSerializer_list(many=True, read_only=True)
    det_implicados = CmnImplicadosActaRetencionSerializer_list(many=True, read_only=True)
    
    class Meta:
        model = CmnActaRetencion
        fields = '__all__'


#cabecera detalle informe campo
class CmnActaRetencionCabDetSerializer(CommonFieldsSerializer):
    #migrar =  serializers.BooleanField(required=False)
    det_productos = CmnProductosActaRetencionSerializer(many=True)
    det_participantes = CmnParticipantesActaRetencionSerializer(many=True)
    det_implicados = CmnImplicadosActaRetencionSerializer(many=True)


    class Meta:
        model = CmnActaRetencion
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        #CREACION
        detalle_producto = validated_data.pop('det_productos')
        detalle_participantes = validated_data.pop('det_participantes')
        detalle_implicados = validated_data.pop('det_implicados')
        print("*******************************************create22222")
        cabecera = CommonFieldsSerializer.create(self, validated_data, CmnActaRetencion)
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_producto:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            print("**********CmnProductosActaRetencion")
            #print(detalle)
            CmnProductosActaRetencion.objects.create(acta_retencion_id=cabecera, **detalle)

        print("*******************************************create")
        print(detalle_participantes)

        for detalle in detalle_participantes:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            print("**********CmnParticipantesActaRetencion")
            #print(detalle)
            CmnParticipantesActaRetencion.objects.create(acta_retencion_id=cabecera, **detalle)

        for detalle in detalle_implicados:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            print("**********CmnImplicadosActaRetencion")
            #print(detalle)
            CmnImplicadosActaRetencion.objects.create(acta_retencion_id=cabecera, **detalle)

        

        return cabecera

    def update(self, instance, validated_data):
        print("--------------->>>>>>")
        print(validated_data)
        print("--------------->>>>>>IIIIIIIIIIIIIIII")
        print(instance)
        # Campos PerPersona
        
        instance.numero = validated_data.get('numero', instance.numero)
        instance.acta_inspeccion_id = validated_data.get('acta_inspeccion_id', instance.acta_inspeccion_id)
        instance.tipo_retencion = validated_data.get('tipo_retencion', instance.tipo_retencion)
        instance.testigo_id = validated_data.get('testigo_id', instance.testigo_id)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        
        print("--------------->>>>>>2222")
        detalle_producto = validated_data.pop('det_productos')
        detalle_participantes = validated_data.pop('det_participantes')
        detalle_implicados = validated_data.pop('det_implicados')

        cabecera = CommonFieldsSerializer.update(self, instance, validated_data)
        
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_producto:
            #CAMPOS INFORMACION DEL USUARIO
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle != 0:
                CmnProductosActaRetencion.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)
            else:                    
                detalle['id'] = uuid.uuid4()
                CmnProductosActaRetencion.objects.filter(acta_retencion_id=detalle['acta_retencion_id']).create(**detalle)

        for detalle in detalle_participantes:
            #CAMPOS INFORMACION DEL USUARIO
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle != 0:
                CmnParticipantesActaRetencion.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)
            else:                    
                detalle['id'] = uuid.uuid4()
                CmnParticipantesActaRetencion.objects.filter(acta_retencion_id=detalle['acta_retencion_id']).create(**detalle)  

        for detalle in detalle_implicados:
            #CAMPOS INFORMACION DEL USUARIO
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle != 0:
                CmnImplicadosActaRetencion.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)
            else:                    
                detalle['id'] = uuid.uuid4()
                CmnImplicadosActaRetencion.objects.filter(acta_retencion_id=detalle['acta_retencion_id']).create(**detalle)   
        
        return cabecera




# AppFdT_licenciaparma
class CmnActividadFuncionariosSerializer(CommonFieldsSerializer):
    #parma_id = AppFdT_licenciaparmaSerializer_list()
    class Meta:
        model = CmnActividadFuncionarios
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,  CmnActividadFuncionarios)
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion      
        instance.funcionario_id = validated_data.get('funcionario_id', instance.funcionario_id)
        instance.actividad_id = validated_data.get('actividad_id', instance.actividad_id)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.anio = validated_data.get('anio', instance.anio)
        instance.mes = validated_data.get('mes', instance.mes)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class CmnActividadFuncionariosSerializer_list(CommonFieldsSerializer):
    funcionario_id = Per_FuncionarioSerializer_short()
    actividad_id = SisParametrosConfigSerializer_short()
    
    class Meta:
        model = CmnActividadFuncionarios
        fields = ['id','funcionario_id','actividad_id','anio','mes']


# AppFdT_licenciaparma
class CmnDiasActividadFuncionariosSerializer(CommonFieldsSerializer):
    #parma_id = AppFdT_licenciaparmaSerializer_list()
    class Meta:
        model = CmnDiasActividadFuncionarios
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,  CmnDiasActividadFuncionarios)
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion      
        instance.actividad_funcionario_id = validated_data.get('actividad_funcionario_id', instance.actividad_funcionario_id)
        instance.dias_actividad = validated_data.get('dias_actividad', instance.dias_actividad)
        instance.anio = validated_data.get('anio', instance.anio)
        instance.mes = validated_data.get('mes', instance.mes)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class CmnDiasActividadFuncionariosSerializer_list(CommonFieldsSerializer):
    actividad_funcionario_id = CmnActividadFuncionariosSerializer_list()
    class Meta:
        model = CmnDiasActividadFuncionarios
        fields = ['id','actividad_funcionario_id','dias_actividad']


class CmnActividadFuncionarios_dias_Serializer(CommonFieldsSerializer):
    funcionario_id = Per_FuncionarioSerializer_short()
    actividad_id = SisParametrosConfigSerializer_short()
    actividades_dias = CmnDiasActividadFuncionariosSerializer_list(many=True, read_only=True)

    class Meta:
        model  = CmnActividadFuncionarios
        fields = '__all__'


# AppFdT_licenciaparma
class CmnControlPersonalSerializer(CommonFieldsSerializer):
    #parma_id = AppFdT_licenciaparmaSerializer_list()
    class Meta:
        model = CmnControlPersonal
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,CmnControlPersonal )
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion      
        instance.funcionario_id = validated_data.get('funcionario_id', instance.funcionario_id)
        instance.dias_actividad = validated_data.get('dias_actividad', instance.dias_actividad)
        instance.anio = validated_data.get('anio', instance.anio)
        instance.mes = validated_data.get('mes', instance.mes)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class CmnControlPersonalSerializer_list(CommonFieldsSerializer):
    funcionario_id = Per_FuncionarioSerializer_short()
    
    class Meta:
        model = CmnControlPersonal
        fields = '__all__'


# AppFdT_licenciaparma
class CmnEmbarcacionesExternasSerializer(CommonFieldsSerializer):
    #parma_id = AppFdT_licenciaparmaSerializer_list()
    class Meta:
        model = CmnEmbarcacionesExternas
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,CmnEmbarcacionesExternas )
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion      
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.matricula = validated_data.get('matricula', instance.matricula)
        instance.num_tripulante = validated_data.get('num_tripulante', instance.num_tripulante)
        instance.nombre_capitan = validated_data.get('nombre_capitan', instance.nombre_capitan)
        instance.cedula_capitan = validated_data.get('cedula_capitan', instance.cedula_capitan)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class CmnEmbarcacionesExternasSerializer_list(CommonFieldsSerializer):
   
    class Meta:
        model = CmnEmbarcacionesExternas
        fields = '__all__'


# AppFdT_licenciaparma
class CmnCamarasSerializer(CommonFieldsSerializer):
    #parma_id = AppFdT_licenciaparmaSerializer_list()
    class Meta:
        model = CmnCamaras
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,CmnCamaras )
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion      
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class CmnCamarasSerializer_list(CommonFieldsSerializer):
   
    class Meta:
        model = CmnCamaras
        fields = '__all__'


# AppFdT_licenciaparma
class CmnCmonitReporteDiarioImagenesSerializer(CommonFieldsSerializer):
    #parma_id = AppFdT_licenciaparmaSerializer_list()
    class Meta:
        model = CmnCmonitReporteDiarioImagenes
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,CmnCmonitReporteDiarioImagenes )
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion      
        instance.reporte_id = validated_data.get('reporte_id', instance.reporte_id)
        instance.titulo = validated_data.get('titulo', instance.titulo)
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.imagen = validated_data.get('imagen', instance.imagen)
        instance.orden = validated_data.get('orden', instance.orden)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class CmnCmonitReporteDiarioImagenesSerializer_list(CommonFieldsSerializer):
   
    class Meta:
        model = CmnCmonitReporteDiarioImagenes
        fields = '__all__'


# AppFdT_licenciaparma
class CmnCmonitReporteDiarioCamarasSerializer(CommonFieldsSerializer):
    #parma_id = AppFdT_licenciaparmaSerializer_list()
    class Meta:
        model = CmnCmonitReporteDiarioCamaras
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,CmnCmonitReporteDiarioCamaras )
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion      
        instance.reporte_id = validated_data.get('reporte_id', instance.reporte_id)
        instance.camara_id = validated_data.get('camara_id', instance.camara_id)
        instance.preguntas = validated_data.get('preguntas', instance.preguntas)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class CmnCmonitReporteDiarioCamarasSerializer_list(CommonFieldsSerializer):
   
    class Meta:
        model = CmnCmonitReporteDiarioCamaras
        fields = '__all__'

# AppFdT_licenciaparma
class CmnCmonitReporteDiarioEmbarcacionesSerializer(CommonFieldsSerializer):
    #parma_id = AppFdT_licenciaparmaSerializer_list()
    class Meta:
        model = CmnCmonitReporteDiarioEmbarcaciones
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,CmnCmonitReporteDiarioEmbarcaciones )
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion      
        instance.reporte_id = validated_data.get('reporte_id', instance.reporte_id)
        instance.tipo_embarcacion_id = validated_data.get('tipo_embarcacion_id', instance.tipo_embarcacion_id)
        instance.cantidad = validated_data.get('cantidad', instance.cantidad)
        instance.tipo = validated_data.get('tipo', instance.tipo)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class CmnCmonitReporteDiarioEmbarcacionesSerializer_list(CommonFieldsSerializer):
    tipo_embarcacion_id = TprEmbarcacionActividadSerializer_list()
    class Meta:
        model = CmnCmonitReporteDiarioEmbarcaciones
        fields = '__all__'

# AppFdT_licenciaparma
class CmnCmonitReporteDiarioEmbarcacionesActividadSerializer(CommonFieldsSerializer):
    #parma_id = AppFdT_licenciaparmaSerializer_list()
    class Meta:
        model = CmnCmonitReporteDiarioEmbarcacionesActividad
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,CmnCmonitReporteDiarioEmbarcacionesActividad )
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion      
        instance.reporte_id = validated_data.get('reporte_id', instance.reporte_id)
        instance.embarcacion_id = validated_data.get('embarcacion_id', instance.embarcacion_id)
        instance.actividad_id = validated_data.get('actividad_id', instance.actividad_id)
        instance.fecha_reporte = validated_data.get('fecha_reporte', instance.fecha_reporte)
        instance.sitio_id = validated_data.get('sitio_id', instance.sitio_id)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class CmnCmonitReporteDiarioEmbarcacionesActividadSerializer_list(CommonFieldsSerializer):
    embarcacion_id = CmnEmbarcacionesPatrullaSerializer_list();
    sitio_id = Geo_SitioSerializer_short();
    class Meta:
        model = CmnCmonitReporteDiarioEmbarcacionesActividad
        fields = '__all__'

# AppFdT_licenciaparma
class CmnCmonitReporteDiarioSistemasSerializer(CommonFieldsSerializer):
    #parma_id = AppFdT_licenciaparmaSerializer_list()
    class Meta:
        model = CmnCmonitReporteDiarioSistemas
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,CmnCmonitReporteDiarioSistemas )
        return item

    def update(self, instance, validated_data):
        # Campos CmnActavisitainspecEmbPescaTripulacion      
        instance.reporte_id = validated_data.get('reporte_id', instance.reporte_id)
        instance.sistema_id = validated_data.get('sistema_id', instance.sistema_id)
        instance.estado_id = validated_data.get('estado_id', instance.estado_id)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class CmnCmonitReporteDiarioSistemasSerializer_list(CommonFieldsSerializer):
    #sistema_id = Sis_CatalogoSerializer_short()
    class Meta:
        model = CmnCmonitReporteDiarioSistemas
        fields = '__all__'


# AppFdT_datospescador
class CmnCmonitReporteDiarioSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CmnCmonitReporteDiario
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CmnCmonitReporteDiario)
        return item

    def update(self, instance, validated_data):
        # Campos AppFdTdatospescador

        instance.num_reporte = validated_data.get('num_reporte', instance.num_reporte)
        instance.titulo = validated_data.get('titulo', instance.titulo)
        instance.fecha_reporte = validated_data.get('fecha_reporte', instance.fecha_reporte)
        instance.fecha_desde = validated_data.get('fecha_desde', instance.fecha_desde)
        instance.fecha_hasta = validated_data.get('fecha_hasta', instance.fecha_hasta)
        instance.funcionario_id_de = validated_data.get('funcionario_id_de', instance.funcionario_id_de)
        instance.funcionario_id_para = validated_data.get('funcionario_id_para', instance.funcionario_id_para)
        instance.funcionario_id_cc1 = validated_data.get('funcionario_id_cc1', instance.funcionario_id_cc1)
        instance.funcionario_id_cc2 = validated_data.get('funcionario_id_cc2', instance.funcionario_id_cc2)
        instance.conclusiones = validated_data.get('conclusiones', instance.conclusiones)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class CmnCmonitReporteDiarioSerializer_list(CommonFieldsSerializer):
    funcionario_id_de = Per_FuncionarioSerializer_short();
    funcionario_id_para = Per_FuncionarioSerializer_short();
    funcionario_id_cc1 = Per_FuncionarioSerializer_short();
    funcionario_id_cc2 = Per_FuncionarioSerializer_short();
    det_imagenes = CmnCmonitReporteDiarioImagenesSerializer_list(many=True, read_only=True)
    det_camaras  = CmnCmonitReporteDiarioCamarasSerializer_list(many=True, read_only=True)
    det_embarcaciones  = CmnCmonitReporteDiarioEmbarcacionesSerializer_list(many=True, read_only=True)
    det_embarcacionesact  = CmnCmonitReporteDiarioEmbarcacionesActividadSerializer_list(many=True, read_only=True)
    det_sistema  = CmnCmonitReporteDiarioSistemasSerializer_list(many=True, read_only=True)
    
    class Meta:
        model = CmnCmonitReporteDiario
        fields = '__all__'


#cabecera detalle informe campo
class CmnCmonitReporteDiarioCabDetSerializer(CommonFieldsSerializer):
    #migrar =  serializers.BooleanField(required=False)
    det_imagenes = CmnCmonitReporteDiarioImagenesSerializer(many=True)
    det_camaras  = CmnCmonitReporteDiarioCamarasSerializer(many=True)
    det_embarcaciones  = CmnCmonitReporteDiarioEmbarcacionesSerializer(many=True)
    det_embarcacionesact  = CmnCmonitReporteDiarioEmbarcacionesActividadSerializer(many=True)
    det_sistema  = CmnCmonitReporteDiarioSistemasSerializer(many=True)

    class Meta:
        model = CmnCmonitReporteDiario
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        #CREACION
        detalle_imagenes = validated_data.pop('det_imagenes')
        detalle_camaras  = validated_data.pop('det_camaras')
        detalle_embarcaciones  = validated_data.pop('det_embarcaciones')
        detalle_embarcacionesAct  = validated_data.pop('det_embarcacionesact')
        detalle_sistemas  = validated_data.pop('det_sistema')

        print("*******************************************create22222")
        cabecera = CommonFieldsSerializer.create(self, validated_data, CmnCmonitReporteDiario)
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_imagenes:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            print("**********CmnCmonitReporteDiarioImagenes")
            #print(detalle)
            CmnCmonitReporteDiarioImagenes.objects.create(reporte_id=cabecera, **detalle)

        print("*******************************************create")
        for detalle in detalle_camaras:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            print("**********CmnCmonitReporteDiarioCamara")
            #print(detalle)
            CmnCmonitReporteDiarioCamaras.objects.create(reporte_id=cabecera, **detalle) 

        for detalle in detalle_embarcaciones:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            print("**********CmnCmonitReporteDiarioEmbarcaciones")
            #print(detalle)
            CmnCmonitReporteDiarioEmbarcaciones.objects.create(reporte_id=cabecera, **detalle)  

        for detalle in detalle_embarcacionesAct:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            print("**********CmnCmonitReporteDiarioEmbarcacionesActividad")
            #print(detalle)
            CmnCmonitReporteDiarioEmbarcacionesActividad.objects.create(reporte_id=cabecera, **detalle)  

        for detalle in detalle_sistemas:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            print("**********CmnCmonitReporteDiarioSistemas")
            #print(detalle)
            CmnCmonitReporteDiarioSistemas.objects.create(reporte_id=cabecera, **detalle)      

        return cabecera

    def update(self, instance, validated_data):
        print("--------------->>>>>>")
        print(validated_data)
        print("--------------->>>>>>IIIIIIIIIIIIIIII")
        print(instance)
        # Campos PerPersona
        
        instance.num_reporte = validated_data.get('num_reporte', instance.num_reporte)
        instance.titulo = validated_data.get('titulo', instance.titulo)
        instance.fecha_reporte = validated_data.get('fecha_reporte', instance.fecha_reporte)
        instance.fecha_desde = validated_data.get('fecha_desde', instance.fecha_desde)
        instance.fecha_hasta = validated_data.get('fecha_hasta', instance.fecha_hasta)
        instance.funcionario_id_de = validated_data.get('funcionario_id_de', instance.funcionario_id_de)
        instance.funcionario_id_para = validated_data.get('funcionario_id_para', instance.funcionario_id_para)
        instance.funcionario_id_cc1 = validated_data.get('funcionario_id_cc1', instance.funcionario_id_cc1)
        instance.funcionario_id_cc2 = validated_data.get('funcionario_id_cc2', instance.funcionario_id_cc2)
        instance.conclusiones = validated_data.get('conclusiones', instance.conclusiones)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        
        print("--------------->>>>>>2222")
        detalle_imagenes = validated_data.pop('det_imagenes')
        detalle_camaras  = validated_data.pop('det_camaras')
        detalle_embarcaciones  = validated_data.pop('det_embarcaciones')
        detalle_embarcacionesAct  = validated_data.pop('det_embarcacionesact')
        detalle_sistemas  = validated_data.pop('det_sistema')

        cabecera = CommonFieldsSerializer.update(self, instance, validated_data)
        
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_imagenes:
            #CAMPOS INFORMACION DEL USUARIO
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle == "":
                id_detalle = 0

            if id_detalle != 0:
                CmnCmonitReporteDiarioImagenes.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)
            else:                    
                detalle['id'] = uuid.uuid4()
                CmnCmonitReporteDiarioImagenes.objects.filter(reporte_id=detalle['reporte_id']).create(**detalle)

        for detalle in detalle_camaras:
            #CAMPOS INFORMACION DEL USUARIO
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle == "":
                id_detalle = 0

            if id_detalle != 0:
                CmnCmonitReporteDiarioCamaras.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)
            else:                    
                detalle['id'] = uuid.uuid4()
                CmnCmonitReporteDiarioCamaras.objects.filter(reporte_id=detalle['reporte_id']).create(**detalle)  

        for detalle in detalle_embarcaciones:
            #CAMPOS INFORMACION DEL USUARIO
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle == "":
                id_detalle = 0

            if id_detalle != 0:
                CmnCmonitReporteDiarioEmbarcaciones.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)
            else:                    
                detalle['id'] = uuid.uuid4()
                CmnCmonitReporteDiarioEmbarcaciones.objects.filter(reporte_id=detalle['reporte_id']).create(**detalle) 

        for detalle in detalle_embarcacionesAct:
            #CAMPOS INFORMACION DEL USUARIO
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle == "":
                id_detalle = 0

            if id_detalle != 0:
                CmnCmonitReporteDiarioEmbarcacionesActividad.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)
            else:                    
                detalle['id'] = uuid.uuid4()
                CmnCmonitReporteDiarioEmbarcacionesActividad.objects.filter(reporte_id=detalle['reporte_id']).create(**detalle) 

        for detalle in detalle_sistemas:
            #CAMPOS INFORMACION DEL USUARIO
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle == "":
                id_detalle = 0

            if id_detalle != 0:
                CmnCmonitReporteDiarioSistemas.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)
            else:                    
                detalle['id'] = uuid.uuid4()
                CmnCmonitReporteDiarioSistemas.objects.filter(reporte_id=detalle['reporte_id']).create(**detalle) 
        
        return cabecera
