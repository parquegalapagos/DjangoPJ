# DJANGO
from django.contrib.auth.models import User
import uuid

# REST
from rest_framework import serializers

# Local
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer
from ap_serv_ambientales.models import *
from ap_api.v1.serializers.sz_sis import Sis_CatalogoSerializer_short
from ap_api.v1.serializers.sz_per import Per_PersonaSerializer_short
from ap_api.v1.serializers.sz_geo import *
from ap_talentohumano.models import *


# VehiculoTipo
class TrpVehiculoTipoSerializer(CommonFieldsSerializer):

    class Meta:
        model = TrpVehiculoTipo
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, TrpVehiculoTipo)
        return item

    def update(self, instance, validated_data):
        
        # Campos VehiculoTipo
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class TrpVehiculoTipoSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = TrpVehiculoTipo
        fields = '__all__'

    
class TrpVehiculoTipoSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = TrpVehiculoTipo
        fields = ['id','descripcion']



#servicios ambientales

class TrpVehiculoSerializer(CommonFieldsSerializer):

    class Meta:
        model = TrpVehiculo
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, TrpVehiculo)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.marca = validated_data.get('marca', instance.marca)
        instance.modelo = validated_data.get('modelo', instance.modelo)
        instance.color = validated_data.get('color', instance.color)
        instance.identificador = validated_data.get('identificador', instance.identificador)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class TrpVehiculoSerializer_list(CommonFieldsSerializer):
    #persona_id  = Per_PersonaSerializer_short()
    #vehiculo_id = Tpr_VehiculoSerializer_list()
    class Meta:
        model = TrpVehiculo
        fields = '__all__'

#PersonaVehiculo    
class TrpPersonaVehiculoSerializer(CommonFieldsSerializer):

    class Meta:
        model = TrpPersonaVehiculo
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, TrpPersonaVehiculo)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.simbolo = validated_data.get('simbolo', instance.simbolo)
        instance.categoria = validated_data.get('categoria', instance.categoria)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class TrpPersonaVehiculoSerializer_list(CommonFieldsSerializer):
    persona_id  = Per_PersonaSerializer_short()
    vehiculo_id = TrpVehiculoSerializer_list()
    class Meta:
        model = TrpPersonaVehiculo
        fields = '__all__'

#personaVehiculo    
class TrpTipoUsuarioSerializer(CommonFieldsSerializer):

    class Meta:
        model = TrpTipoUsuario
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, TrpTipoUsuario)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class TrpTipoUsuarioSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = TrpTipoUsuario
        fields = '__all__'


#personaVehiculo    
class TrpControlMaterialPetreoDetalleSerializer(CommonFieldsSerializer):

    class Meta:
        model = TrpControlMaterialPetreoDetalle
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, TrpControlMaterialPetreoDetalle)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.cab_matpetreo_id = validated_data.get('cab_matpetreo_id', instance.cab_matpetreo_id)
        instance.fecha_viaje = validated_data.get('fecha_viaje', instance.fecha_viaje)
        instance.sitio_extraccion_id = validated_data.get('sitio_extraccion_id', instance.sitio_extraccion_id)
        instance.arena = validated_data.get('arena', instance.arena)
        instance.granillo = validated_data.get('granillo', instance.granillo)
        instance.relleno = validated_data.get('relleno', instance.relleno)
        instance.bloque = validated_data.get('bloque', instance.bloque)
        instance.ripio = validated_data.get('ripio', instance.ripio)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class TrpControlMaterialPetreoDetalleSerializer_list(CommonFieldsSerializer):
    sitio_extraccion_id  = Geo_SitioSerializer_short();
    class Meta:
        model = TrpControlMaterialPetreoDetalle
        fields = '__all__'

#personaVehiculo    
class TrpControlMaterialPetreoSerializer(CommonFieldsSerializer):
    class Meta:
        model = TrpControlMaterialPetreo
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, TrpControlMaterialPetreo)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.usuario_id = validated_data.get('usuario_id', instance.usuario_id)
        instance.fecha_recepcion = validated_data.get('fecha_recepcion', instance.fecha_recepcion)
        instance.vehiculos = validated_data.get('vehiculos', instance.vehiculos)
        instance.tipo_usuario_id = validated_data.get('tipo_usuario_id', instance.tipo_usuario_id)
        instance.numero_solicitud = validated_data.get('numero_solicitud', instance.numero_solicitud)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class TrpControlMaterialPetreoSerializer_list(CommonFieldsSerializer):
    usuario_id  = Per_PersonaSerializer_short()
    tipo_usuario_id  = TrpTipoUsuarioSerializer_list()
    detmatpetreo = TrpControlMaterialPetreoDetalleSerializer(many=True, read_only=True)
    class Meta:
        model = TrpControlMaterialPetreo
        fields = '__all__'


class TrpControlMaterialPetreoCabDetSerializer(CommonFieldsSerializer):
    #migrar =  serializers.BooleanField(required=False)
    detmatpetreo = TrpControlMaterialPetreoDetalleSerializer(many=True)

    class Meta:
        model = TrpControlMaterialPetreo
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        detalle_data = validated_data.pop('detmatpetreo')
        cabecera = CommonFieldsSerializer.create(self, validated_data, TrpControlMaterialPetreo)
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_data:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            TrpControlMaterialPetreoDetalle.objects.create(cab_matpetreo_id=cabecera, **detalle)
        return cabecera

    def update(self, instance, validated_data):
        print("--------------->>>>>>")
        print(validated_data)
        print("--------------->>>>>>IIIIIIIIIIIIIIII")
        print(instance)
        # Campos PerPersona
        
        instance.usuario_id = validated_data.get('usuario_id', instance.usuario_id)
        instance.fecha_recepcion = validated_data.get('fecha_recepcion', instance.fecha_recepcion)
        instance.vehiculos = validated_data.get('vehiculos', instance.vehiculos)
        instance.tipo_usuario_id = validated_data.get('tipo_usuario_id', instance.tipo_usuario_id)
        instance.numero_solicitud = validated_data.get('numero_solicitud', instance.numero_solicitud)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)
        
        print("--------------->>>>>>2222")

        detalle_data = validated_data.pop('detmatpetreo')
        cabecera = CommonFieldsSerializer.update(self, instance, validated_data)
        
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_data:
            #CAMPOS INFORMACION DEL USUARIO
            id_detalle = detalle.pop('id')
            TrpControlMaterialPetreoDetalle.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)        
        
        return cabecera




# Parametro Configuracion

class BsaParametrosConfigSerializer(CommonFieldsSerializer):

    class Meta:
        model = BsaParametrosConfig
        fields = '__all__'

    def create(self, validated_data):

        item = CommonFieldsSerializer.create(self, validated_data, BsaParametrosConfig)
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


class BsaParametrosConfigSerializer_list(CommonFieldsSerializer):


    class Meta:
        model = BsaParametrosConfig
        fields = '__all__'


    
class BsaParametrosConfigSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = BsaParametrosConfig
        fields = ['id','descripcion']

#InformeCampoDetalle    
class BsaInformeCampoDetalleSerializer(CommonFieldsSerializer):

    class Meta:
        model = BsaInformeCampoDetalle
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, BsaInformeCampoDetalle)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.cab_infcampo_id = validated_data.get('cab_infcampo_id', instance.cab_infcampo_id)
        instance.foto = validated_data.get('foto', instance.foto)
        instance.orden = validated_data.get('orden', instance.orden)
        instance.comentario = validated_data.get('comentario', instance.comentario)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class BsaInformeCampoDetalleSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = BsaInformeCampoDetalle
        fields = '__all__'

#InformeCampoCab    
class BsaInformeCampoSerializer(CommonFieldsSerializer):

    class Meta:
        model = BsaInformeCampo
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, BsaInformeCampo)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.proceso = validated_data.get('proceso', instance.proceso)
        instance.numero = validated_data.get('numero', instance.numero)
        instance.subproceso = validated_data.get('subproceso', instance.subproceso)
        instance.sitio_id = validated_data.get('sitio_id', instance.sitio_id)
        instance.actividad = validated_data.get('actividad', instance.actividad)
        instance.fecha_desde = validated_data.get('fecha_desde', instance.fecha_desde)
        instance.fecha_hasta = validated_data.get('fecha_hasta', instance.fecha_hasta)
        instance.fecha_presentacion = validated_data.get('fecha_presentacion', instance.fecha_presentacion)
        instance.transporte_id = validated_data.get('transporte_id', instance.transporte_id)
        instance.introduccion = validated_data.get('introduccion', instance.introduccion)
        instance.objetivos = validated_data.get('objetivos', instance.objetivos)
        instance.materiales = validated_data.get('materiales', instance.materiales)
        instance.metodologia = validated_data.get('metodologia', instance.metodologia)
        instance.desarrollo = validated_data.get('desarrollo', instance.desarrollo)
        instance.resultados = validated_data.get('resultados', instance.resultados)
        instance.consclusiones = validated_data.get('consclusiones', instance.consclusiones)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.periodo = validated_data.get('periodo', instance.periodo)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class BsaInformeCampoSerializer_list(CommonFieldsSerializer):
    det_infcampo = BsaInformeCampoDetalleSerializer(many=True, read_only=True)
    class Meta:
        model = BsaInformeCampo
        fields = '__all__'



#cabecera detalle informe campo
class BsaInformeCampoCabDetSerializer(CommonFieldsSerializer):
    #migrar =  serializers.BooleanField(required=False)
    det_infcampo = BsaInformeCampoDetalleSerializer(many=True)

    class Meta:
        model = BsaInformeCampo
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        detalle_data = validated_data.pop('det_infcampo')
        cabecera = CommonFieldsSerializer.create(self, validated_data, BsaInformeCampo)
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_data:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            BsaInformeCampoDetalle.objects.create(cab_infcampo_id=cabecera, **detalle)
        return cabecera

    def update(self, instance, validated_data):
        print("--------------->>>>>>")
        print(validated_data)
        print("--------------->>>>>>IIIIIIIIIIIIIIII")
        print(instance)
        # Campos PerPersona
        
        instance.proceso = validated_data.get('proceso', instance.proceso)
        instance.numero = validated_data.get('numero', instance.numero)
        instance.subproceso = validated_data.get('subproceso', instance.subproceso)
        instance.sitio_id = validated_data.get('sitio_id', instance.sitio_id)
        instance.actividad = validated_data.get('actividad', instance.actividad)
        instance.fecha_desde = validated_data.get('fecha_desde', instance.fecha_desde)
        instance.fecha_hasta = validated_data.get('fecha_hasta', instance.fecha_hasta)
        instance.fecha_presentacion = validated_data.get('fecha_presentacion', instance.fecha_presentacion)
        instance.transporte_id = validated_data.get('transporte_id', instance.transporte_id)
        instance.introduccion = validated_data.get('introduccion', instance.introduccion)
        instance.objetivos = validated_data.get('objetivos', instance.objetivos)
        instance.materiales = validated_data.get('materiales', instance.materiales)
        instance.metodologia = validated_data.get('metodologia', instance.metodologia)
        instance.desarrollo = validated_data.get('desarrollo', instance.desarrollo)
        instance.resultados = validated_data.get('resultados', instance.resultados)
        instance.consclusiones = validated_data.get('consclusiones', instance.consclusiones)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.recomendaciones = validated_data.get('recomendaciones', instance.recomendaciones)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.periodo = validated_data.get('periodo', instance.periodo)
        
        print("--------------->>>>>>2222")

        detalle_data = validated_data.pop('det_infcampo')
        cabecera = CommonFieldsSerializer.update(self, instance, validated_data)
        
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_data:
            #CAMPOS INFORMACION DEL USUARIO
            id_detalle = detalle.pop('id')
            BsaInformeCampoDetalle.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)        
        
        return cabecera

#InformeCampoCab    
class BsaInformeTecnicoSerializer(CommonFieldsSerializer):

    class Meta:
        model = BsaInformeTecnico
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, BsaInformeTecnico)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.numero = validated_data.get('numero', instance.numero)
        instance.tema = validated_data.get('tema', instance.tema)
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.tecnicos = validated_data.get('tecnicos', instance.tecnicos)
        instance.archivo = validated_data.get('archivo', instance.archivo)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class BsaInformeTecnicoSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = BsaInformeTecnico
        fields = '__all__'


################informe novedades

#InformenovedadesDetalle    
class BsaInformeNovedadesDetalleSerializer(CommonFieldsSerializer):

    class Meta:
        model = BsaInformeNovedadesDetalle
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, BsaInformeNovedadesDetalle)
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
    
class BsaInformeNovedadesDetalleSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = BsaInformeNovedadesDetalle
        fields = '__all__'

#InformeCampoCab    
class BsaInformeNovedadesSerializer(CommonFieldsSerializer):

    class Meta:
        model = BsaInformeNovedades
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, BsaInformeNovedades)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.proceso = validated_data.get('proceso', instance.proceso)
        instance.numero = validated_data.get('numero', instance.numero)
        instance.sitio_id = validated_data.get('sitio_id', instance.sitio_id)
        instance.actividad = validated_data.get('actividad', instance.actividad)
        instance.periodo = validated_data.get('periodo', instance.periodo)
        instance.personal = validated_data.get('personal', instance.personal)
        instance.fecha_entrega = validated_data.get('fecha_entrega', instance.fecha_entrega)
        instance.transporte = validated_data.get('transporte', instance.transporte)
        instance.introduccion = validated_data.get('introduccion', instance.introduccion)
        instance.objetivos = validated_data.get('objetivos', instance.objetivos)
        instance.materiales = validated_data.get('materiales', instance.materiales)
        instance.metodologia = validated_data.get('metodologia', instance.metodologia)
        instance.desarrollo = validated_data.get('desarrollo', instance.desarrollo)
        instance.resultados = validated_data.get('resultados', instance.resultados)
        instance.consclusiones = validated_data.get('consclusiones', instance.consclusiones)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class BsaInformeNovedadesSerializer_list(CommonFieldsSerializer):
    det_infnovedades = BsaInformeNovedadesDetalleSerializer(many=True, read_only=True)
    class Meta:
        model = BsaInformeNovedades
        fields = '__all__'



#cabecera detalle informe campo
class BsaInformeNovedadesCabDetSerializer(CommonFieldsSerializer):
    #migrar =  serializers.BooleanField(required=False)
    det_infnovedades = BsaInformeNovedadesDetalleSerializer(many=True)

    class Meta:
        model = BsaInformeNovedades
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        detalle_data = validated_data.pop('det_infnovedades')
        cabecera = CommonFieldsSerializer.create(self, validated_data, BsaInformeNovedades)
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_data:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            BsaInformeNovedadesDetalle.objects.create(cab_infnovedades_id=cabecera, **detalle)
        return cabecera

    def update(self, instance, validated_data):
        print("--------------->>>>>>")
        print(validated_data)
        print("--------------->>>>>>IIIIIIIIIIIIIIII")
        print(instance)
        # Campos PerPersona
        
        instance.proceso = validated_data.get('proceso', instance.proceso)
        instance.numero = validated_data.get('numero', instance.numero)
        instance.sitio_id = validated_data.get('sitio_id', instance.sitio_id)
        instance.actividad = validated_data.get('actividad', instance.actividad)
        instance.periodo = validated_data.get('periodo', instance.periodo)
        instance.fecha_entrega = validated_data.get('fecha_entrega', instance.fecha_entrega)
        instance.personal = validated_data.get('personal', instance.personal)
        instance.fecha_entrega = validated_data.get('fecha_entrega', instance.fecha_entrega)
        instance.transporte = validated_data.get('transporte', instance.transporte)
        instance.introduccion = validated_data.get('introduccion', instance.introduccion)
        instance.objetivos = validated_data.get('objetivos', instance.objetivos)
        instance.materiales = validated_data.get('materiales', instance.materiales)
        instance.metodologia = validated_data.get('metodologia', instance.metodologia)
        instance.desarrollo = validated_data.get('desarrollo', instance.desarrollo)
        instance.resultados = validated_data.get('resultados', instance.resultados)
        instance.consclusiones = validated_data.get('consclusiones', instance.consclusiones)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.recomendaciones = validated_data.get('recomendaciones', instance.recomendaciones)
        instance.estado = validated_data.get('estado', instance.estado)
        
        print("--------------->>>>>>2222")

        detalle_data = validated_data.pop('det_infnovedades')
        cabecera = CommonFieldsSerializer.update(self, instance, validated_data)
        
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_data:
            #CAMPOS INFORMACION DEL USUARIO
            id_detalle = detalle.pop('id')
            BsaInformeNovedadesDetalle.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)        
        
        return cabecera