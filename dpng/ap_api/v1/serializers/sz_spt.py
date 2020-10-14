# DJANGO
from django.contrib.auth.models import User
import uuid

# REST
from rest_framework import serializers

# Local
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer
from ap_soportetic.models import *
from ap_api.v1.serializers.sz_sis import Sis_CatalogoSerializer_short
from ap_api.v1.serializers.sz_per import Per_PersonaSerializer_short, Per_FuncionarioSerializer_short
from ap_talentohumano.models import *


# poblacion_id
class Spt_MarcaSerializer(CommonFieldsSerializer):

    class Meta:
        model = SptMarca
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SptMarca)
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

class Spt_MarcaSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = SptMarca
        fields = '__all__'

    
class Spt_MarcaSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = SptMarca
        fields = ['id','descripcion']

# poblacion_id
class Spt_UbicacionSerializer(CommonFieldsSerializer):

    class Meta:
        model = SptUbicacion
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SptUbicacion)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.bodega = validated_data.get('bodega', instance.bodega)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Spt_UbicacionSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = SptUbicacion
        fields = '__all__'

    
class Spt_UbicacionSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = SptUbicacion
        fields = ['id','descripcion']

# producto
class Spt_ProductoSerializer(CommonFieldsSerializer):

    class Meta:
        model = SptProducto
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SptProducto)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.precio_venta = validated_data.get('precio_venta', instance.precio_venta)
        instance.precio_costo = validated_data.get('precio_costo', instance.precio_costo)
        instance.tipo = validated_data.get('tipo', instance.tipo)
        instance.categoria_cuentas = validated_data.get('categoria_cuentas', instance.categoria_cuentas)
        instance.udm_por_defecto = validated_data.get('udm_por_defecto', instance.udm_por_defecto)
        instance.vendible = validated_data.get('vendible', instance.vendible)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Spt_ProductoSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = SptProducto
        fields = '__all__'

class Spt_ProductoSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = SptProducto
        fields = ['id','descripcion']


# poblacion_id
class Spt_TipoEquipoSerializer(CommonFieldsSerializer):

    class Meta:
        model = SptTipoEquipo
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SptTipoEquipo)
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

class Spt_TipoEquipoSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = SptTipoEquipo
        fields = '__all__'

    
class Spt_TipoEquipoSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = SptTipoEquipo
        fields = ['id','descripcion']

# poblacion_id
class Spt_UnidadMedidaSerializer(CommonFieldsSerializer):

    class Meta:
        model = SptUnidadMedida
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, SptUnidadMedida)
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
    
class Spt_UnidadMedidaSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = SptUnidadMedida
        fields = '__all__'

    
class Spt_UnidadMedidaSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = SptUnidadMedida
        fields = ['id','descripcion']

# GthCargoFuncional
class Spt_EquiposSerializer(CommonFieldsSerializer):

    class Meta:
        model = SptEquipo
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SptEquipo)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.producto_id = validated_data.get('producto_id', instance.producto_id)
        instance.modelo = validated_data.get('modelo', instance.modelo)
        instance.codigo = validated_data.get('codigo', instance.codigo)
        instance.codigo_externo = validated_data.get('codigo_externo', instance.codigo_externo)
        instance.marca_id = validated_data.get('marca_id', instance.marca_id)
        instance.serie_num = validated_data.get('serie_num', instance.serie_num)
        instance.referencia = validated_data.get('referencia', instance.referencia)
        instance.criticidad = validated_data.get('criticidad', instance.criticidad)
        instance.fecha_compra = validated_data.get('fecha_compra', instance.fecha_compra)
        instance.ubicacion_id = validated_data.get('ubicacion_id', instance.ubicacion_id)
        instance.tipo_dispositivo = validated_data.get('tipo_dispositivo', instance.tipo_dispositivo)
        instance.estado_producto = validated_data.get('estado_producto', instance.estado_producto)
        instance.foto = validated_data.get('foto', instance.foto)
        instance.duenio_id = validated_data.get('duenio_id', instance.duenio_id)
        instance.administrador_id = validated_data.get('administrador_id', instance.administrador_id)
        instance.proveedor_mantenimiento_id = validated_data.get('proveedor_mantenimiento_id', instance.proveedor_mantenimiento_id)
        instance.notas = validated_data.get('notas', instance.notas)
        instance.garantia = validated_data.get('garantia', instance.garantia)
        instance.tipo_id = validated_data.get('tipo_id', instance.tipo_id)
        instance.zona_trabajo = validated_data.get('zona_trabajo', instance.zona_trabajo)
        instance.color = validated_data.get('color', instance.color)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)


        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Spt_EquiposSerializer_list(CommonFieldsSerializer):
    administrador_id = Per_FuncionarioSerializer_short()
    producto_id = Spt_ProductoSerializer_short()
    marca_id    = Spt_MarcaSerializer_short()
    ubicacion_id = Spt_UbicacionSerializer_short()
    duenio_id = Per_PersonaSerializer_short()
    class Meta:
        model = SptEquipo
        fields = '__all__'



# poblacion_id
class Spt_SolicitudServicioSerializer(CommonFieldsSerializer):

    class Meta:
        model = SptSolicitudServicio
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, SptSolicitudServicio)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.secuencia = validated_data.get('secuencia', instance.secuencia)
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.titulo = validated_data.get('titulo', instance.titulo)
        instance.sysaid_userasignado = validated_data.get('sysaid_userasignado', instance.sysaid_userasignado)
        instance.estado_solicitud = validated_data.get('estado_solicitud', instance.estado_solicitud)
        instance.equipo_id = validated_data.get('equipo_id', instance.equipo_id)
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.resolucion = validated_data.get('resolucion', instance.resolucion)
        instance.nuevo_custodio_id = validated_data.get('nuevo_custodio_id', instance.nuevo_custodio_id)
        instance.proveedor_mantenimiento_id = validated_data.get('proveedor_mantenimiento_id', instance.proveedor_mantenimiento_id)
        instance.fecha_envio = validated_data.get('fecha_envio', instance.fecha_envio)
        instance.fecha_retorno = validated_data.get('fecha_retorno', instance.fecha_retorno)
        instance.tipo_servicio = validated_data.get('tipo_servicio', instance.tipo_servicio)
        instance.tipo_actividad = validated_data.get('tipo_actividad', instance.tipo_actividad)
        instance.prioridad = validated_data.get('prioridad', instance.prioridad)
        instance.urgencia = validated_data.get('urgencia', instance.urgencia)
        instance.foto_equipo = validated_data.get('foto_equipo', instance.foto_equipo)
        instance.sysaid_ticket = validated_data.get('sysaid_ticket', instance.sysaid_ticket)
        instance.sysaid_fe_solicitud = validated_data.get('sysaid_fe_solicitud', instance.sysaid_fe_solicitud)
        instance.sysaid_fe_vencimiento = validated_data.get('sysaid_fe_vencimiento', instance.sysaid_fe_vencimiento)
        instance.sysaid_categoria = validated_data.get('sysaid_categoria', instance.sysaid_categoria)
        instance.sysaid_subcategoria = validated_data.get('sysaid_subcategoria', instance.sysaid_subcategoria)
        #instance.sysaid_subcategoria = validated_data.get('sysaid_subcategoria', instance.sysaid_subcategoria)
        #instance.sysaid_subcategoriaop = validated_data.get('sysaid_subcategoriaop', instance.sysaid_subcategoriaop)
        instance.sysaid_usersolicitante = validated_data.get('sysaid_usersolicitante', instance.sysaid_usersolicitante)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.preguntas_resp = validated_data.get('preguntas_resp', instance.preguntas_resp)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class Spt_SolicitudServicioSerializer_list(CommonFieldsSerializer):
    equipo_id = Spt_EquiposSerializer_list()
    #asignado_id    = Per_FuncionarioSerializer_short()
    nuevo_custodio_id = Per_FuncionarioSerializer_short()
    proveedor_mantenimiento_id = Per_PersonaSerializer_short()
    sysaid_usersolicitante = Per_FuncionarioSerializer_short()

    class Meta:
        model = SptSolicitudServicio
        fields = '__all__'


# poblacion_id
class Spt_TipoProblemaSerializer(CommonFieldsSerializer):

    class Meta:
        model = SptTipoProblema
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, SptTipoProblema)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class Spt_TipoProblemaSerializer_list(CommonFieldsSerializer):
   
    class Meta:
        model = SptTipoProblema
        fields = '__all__'


# poblacion_id
class Spt_SubTipoProblemaSerializer(CommonFieldsSerializer):

    class Meta:
        model = SptSubTipoProblema
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, SptSubTipoProblema)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class Spt_SubTipoProblemaSerializer_list(CommonFieldsSerializer):
    #tipoproblema = Spt_TipoProblemaSerializer_list()
    class Meta:
        model = SptSubTipoProblema
        fields = '__all__'


#InformenovedadesDetalle    
class SptInformeBajaDetalleSerializer(CommonFieldsSerializer):

    class Meta:
        model = SptInformeBajaDetalle
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, SptInformeBajaDetalle)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.cab_infbaja_id = validated_data.get('cab_infbaja_id', instance.cab_infbaja_id)
        instance.foto = validated_data.get('foto', instance.foto)
        instance.orden = validated_data.get('orden', instance.orden)
        instance.comentario = validated_data.get('comentario', instance.comentario)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class SptInformeBajaDetalleSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = SptInformeBajaDetalle
        fields = '__all__'

#InformeCampoCab    
class SptInformeBajaSerializer(CommonFieldsSerializer):

    class Meta:
        model = SptInformeBaja
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, SptInformeBaja)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.secuencia = validated_data.get('secuencia', instance.secuencia)
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.titulo = validated_data.get('titulo', instance.titulo)
        instance.desarrollo = validated_data.get('desarrollo', instance.desarrollo)
        instance.antecedentes = validated_data.get('antecedentes', instance.antecedentes)
        instance.conclusiones = validated_data.get('conclusiones', instance.conclusiones)
        instance.recomendaciones = validated_data.get('recomendaciones', instance.recomendaciones)
        instance.solicitudservicio_id = validated_data.get('solicitudservicio_id', instance.solicitudservicio_id)
        instance.equipo_id = validated_data.get('equipo_id', instance.equipo_id)
        instance.estado_informe = validated_data.get('estado_informe', instance.estado_informe)
        instance.funcionario_id = validated_data.get('funcionario_id', instance.funcionario_id)
        instance.aprobador_id = validated_data.get('aprobador_id', instance.aprobador_id)
        instance.base_legal = validated_data.get('base_legal', instance.base_legal)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.tipo_reporte = validated_data.get('tipo_reporte', instance.tipo_reporte)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class SptInformeBajaSerializer_list(CommonFieldsSerializer):
    det_infbaja = SptInformeBajaDetalleSerializer(many=True, read_only=True)
    equipo_id   = Spt_EquiposSerializer_list()
    funcionario_id = Per_FuncionarioSerializer_short();
    aprobador_id   = Per_FuncionarioSerializer_short();
    solicitudservicio_id = Spt_SolicitudServicioSerializer_list();

    class Meta:
        model = SptInformeBaja
        fields = '__all__'


#cabecera detalle informe campo
class SptInformeBajaCabDetSerializer(CommonFieldsSerializer):
    #migrar =  serializers.BooleanField(required=False)
    det_infbaja = SptInformeBajaDetalleSerializer(many=True)

    class Meta:
        model = SptInformeBaja
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        detalle_data = validated_data.pop('det_infbaja')
        cabecera = CommonFieldsSerializer.create(self, validated_data, SptInformeBaja)
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_data:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            SptInformeBajaDetalle.objects.create(cab_infbaja_id=cabecera, **detalle)
        return cabecera

    def update(self, instance, validated_data):
        print("--------------->>>>>>")
        print(validated_data)
        print("--------------->>>>>>IIIIIIIIIIIIIIII")
        print(instance)
        # Campos PerPersona
        
        instance.secuencia = validated_data.get('secuencia', instance.secuencia)
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.titulo = validated_data.get('titulo', instance.titulo)
        instance.desarrollo = validated_data.get('desarrollo', instance.desarrollo)
        instance.antecedentes = validated_data.get('antecedentes', instance.antecedentes)
        instance.conclusiones = validated_data.get('conclusiones', instance.conclusiones)
        instance.recomendaciones = validated_data.get('recomendaciones', instance.recomendaciones)
        instance.solicitudservicio_id = validated_data.get('solicitudservicio_id', instance.solicitudservicio_id)
        instance.equipo_id = validated_data.get('equipo_id', instance.equipo_id)
        instance.estado_informe = validated_data.get('estado_informe', instance.estado_informe)
        instance.funcionario_id = validated_data.get('funcionario_id', instance.funcionario_id)
        instance.aprobador_id = validated_data.get('aprobador_id', instance.aprobador_id)
        instance.base_legal = validated_data.get('base_legal', instance.base_legal)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.tipo_reporte = validated_data.get('tipo_reporte', instance.tipo_reporte)      
        print("--------------->>>>>>2222")

        detalle_data = validated_data.pop('det_infbaja')
        cabecera = CommonFieldsSerializer.update(self, instance, validated_data)
        
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_data:
            #CAMPOS INFORMACION DEL USUARIO
            id_detalle = detalle.pop('id')
            SptInformeBajaDetalle.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)        
        
        return cabecera

#InformenovedadesDetalle    
class SptEquipoCustodioHistSerializer(CommonFieldsSerializer):

    class Meta:
        model = SptEquipoCustodioHist
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, SptEquipoCustodioHist)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.equipo_id = validated_data.get('equipo_id', instance.equipo_id)
        instance.new_custodio_id = validated_data.get('new_custodio_id', instance.new_custodio_id)
        instance.old_custodio_id = validated_data.get('old_custodio_id', old_custodio_id.orden)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class SptEquipoCustodioHistSerializer_list(CommonFieldsSerializer):
    equipo_id   = Spt_EquiposSerializer_list()
    new_custodio_id = Per_FuncionarioSerializer_short();
    old_custodio_id = Per_FuncionarioSerializer_short();
    class Meta:
        model = SptEquipoCustodioHist
        fields = '__all__'



# poblacion_id
class SptListaPreguntaSerializer(CommonFieldsSerializer):

    class Meta:
        model = SptListaPregunta
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, SptListaPregunta)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        
        # Actualización
        instance.categoria = validated_data.get('categoria', instance.categoria)
        instance.pregunta = validated_data.get('pregunta', instance.pregunta)
        instance.orden = validated_data.get('orden', instance.orden)
        instance.requerido = validated_data.get('requerido', instance.requerido)
        instance.estado = validated_data.get('estado', instance.estado)
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class SptListaPreguntaSerializer_list(CommonFieldsSerializer):
   
    class Meta:
        model = SptListaPregunta
        fields = '__all__'
