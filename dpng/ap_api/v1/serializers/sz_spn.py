# DJANGO
from django.contrib.auth.models import User
import uuid

# REST
from rest_framework import serializers

# Local
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer
from ap_talentohumano.models import *
from ap_especiesnativas.models import *
from ap_api.v1.serializers.sz_sis import Sis_CatalogoSerializer_short
from ap_api.v1.serializers.sz_geo import *
from ap_api.v1.serializers.sz_bio import *


# GthCargoFuncional
class Spn_CentrosCrianzaSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpnCentrosCrianza
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SpnCentrosCrianza)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.isla_id = validated_data.get('isla_id', instance.isla_id)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Spn_CentrosCrianzaSerializer_list(CommonFieldsSerializer):
    isla_id = Geo_IslaSerializer_short()
    class Meta:
        model = SpnCentrosCrianza
        fields = '__all__'

# poblacion_id
class Spn_PoblacionSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpnPoblacion
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SpnPoblacion)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Spn_poblacionSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = SpnPoblacion
        fields = '__all__'

    
class Spn_poblacionSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = SpnPoblacion
        fields = ['id','descripcion','color']

# spn_nidos
class Spn_NidosSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpnNidos
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SpnNidos)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.latitud = validated_data.get('latitud', instance.latitud)
        instance.longitud = validated_data.get('longitud', instance.longitud)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.sitio_id = validated_data.get('sitio_id', instance.sitio_id)
        instance.tipo_nido = validated_data.get('tipo_nido', instance.tipo_nido)
        instance.responsable_nido = validated_data.get('responsable_nido', instance.responsable_nido)
        instance.fecha_protegido = validated_data.get('fecha_protegido', instance.fecha_protegido)
        instance.temporada = validated_data.get('temporada', instance.temporada)
        instance.invitado = validated_data.get('invitado', instance.invitado)
        instance.responsable_nido_id = validated_data.get('responsable_nido_id', instance.responsable_nido_id)
        instance.nombre_foto = validated_data.get('nombre_foto', instance.nombre_foto)
        instance.foto_nido = validated_data.get('foto_nido', instance.foto_nido)
        instance.utm_norte = validated_data.get('utm_norte', instance.utm_norte)
        instance.utm_este = validated_data.get('utm_este', instance.utm_este)
        instance.utm_zona = validated_data.get('utm_zona', instance.utm_zona)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Spn_NidosSerializer_list(CommonFieldsSerializer):
    fecha_ingreso  = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    sitio_id = Geo_SitioSerializer_short();
    class Meta:
        model = SpnNidos
        fields = '__all__'

    
class Spn_NidosSerializer_short(CommonFieldsSerializer):
    sitio_id = Geo_SitioSerializer_short();
    class Meta:
        model = SpnNidos
        fields = ['id','descripcion','lat','lon','sitio_id']

# spn_controlhuevosnidos
class Spn_ControlHuevosNidosSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpnControlHuevosNidos
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SpnControlHuevosNidos)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.fecha_protegido = validated_data.get('fecha_protegido', instance.fecha_protegido)
        instance.fecha_liberacion = validated_data.get('fecha_liberacion', instance.fecha_liberacion)
        instance.num_nido = validated_data.get('num_nido', instance.num_nido)
        instance.neo_liberado = validated_data.get('neo_liberado', instance.neo_liberado)
        instance.huevos_no_eclo = validated_data.get('huevos_no_eclo', instance.huevos_no_eclo)
        instance.muertos = validated_data.get('muertos', instance.muertos)
        instance.escapados = validated_data.get('escapados', instance.escapados)
        instance.huevos_traidos = validated_data.get('huevos_traidos', instance.huevos_traidos)
        instance.neo_traidos = validated_data.get('neo_traidos', instance.neo_traidos)
        instance.resp_registro_id = validated_data.get('resp_registro_id', instance.resp_registro_id)
        instance.resp_liberar_id = validated_data.get('resp_liberar_id', instance.resp_liberar_id)
        instance.resp_registro = validated_data.get('resp_registro', instance.resp_registro)
        instance.resp_liberar = validated_data.get('resp_liberar', instance.resp_liberar)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.invitado = validated_data.get('invitado', instance.invitado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Spn_ControlHuevosNidosSerializer_list(CommonFieldsSerializer):
    num_nido = Spn_NidosSerializer_list();
    class Meta:
        model = SpnControlHuevosNidos
        fields = '__all__'

# spn_controlpetrelesnidos
class Spn_ControlPetrelesNidosSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpnControlPetrelesNidos
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SpnControlPetrelesNidos)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.fecha_revision = validated_data.get('fecha_revision', instance.fecha_revision)
        instance.participantes_id = validated_data.get('participantes_id', instance.participantes_id)
        instance.participantes_nombres = validated_data.get('participantes_nombres', instance.participantes_nombres)
        instance.invitado = validated_data.get('invitado', instance.invitado)
        instance.num_nido = validated_data.get('num_nido', instance.num_nido)
        instance.adulto = validated_data.get('adulto', instance.adulto)
        instance.pareja = validated_data.get('pareja', instance.pareja)
        instance.huevo = validated_data.get('huevo', instance.huevo)
        instance.pichon = validated_data.get('pichon', instance.pichon)
        instance.pichon_volo = validated_data.get('pichon_volo', instance.pichon_volo)
        instance.rastro = validated_data.get('rastro', instance.rastro)
        instance.sin_rastro = validated_data.get('sin_rastro', instance.sin_rastro)
        instance.nido_largo = validated_data.get('nido_largo', instance.nido_largo)
        instance.pichon_depredado = validated_data.get('pichon_depredado', instance.pichon_depredado)
        instance.nido_destruido = validated_data.get('nido_destruido', instance.nido_destruido)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.num_anillo_nuevo = validated_data.get('num_anillo_nuevo', instance.num_anillo_nuevo)
        instance.num_anillo_recaptura = validated_data.get('num_anillo_recaptura', instance.num_anillo_recaptura)
        instance.temporada = validated_data.get('temporada', instance.temporada)
        
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Spn_ControlPetrelesNidosSerializer_list(CommonFieldsSerializer):
    num_nido = Spn_NidosSerializer_list();
    class Meta:
        model = SpnControlPetrelesNidos
        fields = '__all__'


# spn_controlflamingosotrasespecies
class Spn_ControlFlamingosOtrasEspeciesSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpnControlFlamingosOtrasEspecies
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SpnControlFlamingosOtrasEspecies)
        return item

    def update(self, instance, validated_data):
        
        instance.control_flamingos_id = validated_data.get('control_flamingos_id', instance.control_flamingos_id)
        instance.estado_comportamiento = validated_data.get('estado_comportamiento', instance.estado_comportamiento)
        instance.adulto = validated_data.get('adulto', instance.adulto)
        instance.edad_intermedia = validated_data.get('edad_intermedia', instance.edad_intermedia)
        instance.juveniles = validated_data.get('juveniles', instance.juveniles)
        instance.pichones = validated_data.get('pichones', instance.pichones)
        instance.individuo_id = validated_data.get('individuo_id', instance.individuo_id)
        instance.numero = validated_data.get('numero', instance.numero)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.tipo = validated_data.get('tipo', instance.tipo)
        instance.datos_nidos_id = validated_data.get('datos_nidos_id', instance.datos_nidos_id)
        instance.numero_nidos = validated_data.get('numero_nidos', instance.numero_nidos)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Spn_ControlFlamingosOtrasEspeciesSerializer_list(CommonFieldsSerializer):
    #estado_comportamiento_id = Sis_CatalogoSerializer_short();
    individuo_id = Bio_EspeciesSerializer_short();
    datos_nidos_id = Sis_CatalogoSerializer_short();
    
    class Meta:
        model = SpnControlFlamingosOtrasEspecies
        fields = '__all__'


# spn_controlflamingos
class Spn_ControlFlamingosSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpnControlFlamingos
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SpnControlFlamingos)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.encargados_id = validated_data.get('encargados_id', instance.encargados_id)
        instance.encargados_nombres = validated_data.get('encargados_nombres', instance.encargados_nombres)
        instance.sitio_id = validated_data.get('sitio_id', instance.sitio_id)
        instance.hora_inicio = validated_data.get('hora_inicio', instance.hora_inicio)
        instance.hora_fin = validated_data.get('hora_fin', instance.hora_fin)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.nivel_agua = validated_data.get('nivel_agua', instance.nivel_agua)
        instance.caracteristica_agua = validated_data.get('caracteristica_agua', instance.caracteristica_agua)
        instance.invitado = validated_data.get('invitado', instance.invitado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Spn_ControlFlamingosSerializer_list(CommonFieldsSerializer):
    sitio_id = Geo_SitioSerializer_short();
    #datos_nidos_id = Sis_CatalogoSerializer_short();
    control_flamingos_id = Spn_ControlFlamingosOtrasEspeciesSerializer_list(many=True, read_only=True)
    class Meta:
        model = SpnControlFlamingos
        fields = '__all__'



# poblacion_id
class Spn_TortugasAdultasSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpnTortugasAdultas
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SpnTortugasAdultas)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.centro_crianza_id = validated_data.get('centro_crianza_id', instance.centro_crianza_id)
        instance.poblacion_id = validated_data.get('poblacion_id', instance.poblacion_id)
        instance.anio = validated_data.get('anio', instance.anio)
        instance.mes = validated_data.get('mes', instance.mes)
        instance.cantidad = validated_data.get('cantidad', instance.cantidad)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.periodo = validated_data.get('periodo', instance.periodo)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Spn_TortugasAdultasSerializer_list(CommonFieldsSerializer):
    poblacion_id = Spn_poblacionSerializer_list()
    centro_crianza_id = Spn_CentrosCrianzaSerializer_list();
    class Meta:
        model = SpnTortugasAdultas
        fields = '__all__'

# SpnControlHuevosDetalles
class Spn_ControlHuevosDetallesSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = SpnControlHuevosDetalles
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SpnControlHuevosDetalles)
        return item

    def update(self, instance, validated_data):
        # Campos SpnControlHuevosDetalles
        instance.control_huevos_resumen_id = validated_data.get('control_huevos_resumen_id', instance.control_huevos_resumen_id)
        instance.num_nido = validated_data.get('num_nido', instance.num_nido)
        instance.num_hembra = validated_data.get('num_hembra', instance.num_hembra)
        instance.num_huevo = validated_data.get('num_huevo', instance.num_huevo)
        instance.peso_inicial = validated_data.get('peso_inicial', instance.peso_inicial)
        instance.fecha_cambio_sustrato = validated_data.get('fecha_cambio_sustrato', instance.fecha_cambio_sustrato)
        instance.peso_cambio = validated_data.get('peso_cambio', instance.peso_cambio)
        instance.condicion_huevo_no_ingresado = validated_data.get('condicion_huevo_no_ingresado', instance.condicion_huevo_no_ingresado)
        instance.fecha_eclosion = validated_data.get('fecha_eclosion', instance.fecha_eclosion)
        instance.num_pintura = validated_data.get('num_pintura', instance.num_pintura)
        instance.largo_curvo = validated_data.get('largo_curvo', instance.largo_curvo)
        instance.ancho_curvo = validated_data.get('ancho_curvo', instance.ancho_curvo)
        instance.largo_plastron = validated_data.get('largo_plastron', instance.largo_plastron)
        instance.peso_salida = validated_data.get('peso_salida', instance.peso_salida)
        instance.fecha_sacado = validated_data.get('fecha_sacado', instance.fecha_sacado)
        instance.condicion = validated_data.get('condicion', instance.condicion)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observacion = validated_data.get('observacion', instance.observacion)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Spn_ControlHuevosDetallesSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = SpnControlHuevosDetalles
        fields = ['id','control_huevos_resumen_id','num_nido','num_hembra','num_huevo','peso_inicial','fecha_cambio_sustrato','peso_cambio','condicion_huevo_no_ingresado','fecha_eclosion','num_pintura','largo_curvo','ancho_curvo','largo_plastron','peso_salida','fecha_sacado','condicion']

# SpnControlHuevosResumen
class Spn_ControlHuevosResumenSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpnControlHuevosResumen
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SpnControlHuevosResumen)
        return item

    def update(self, instance, validated_data):
        # Campos SpnControlHuevosResumen
        instance.fecha_postura = validated_data.get('fecha_postura', instance.fecha_postura)
        instance.num_nido = validated_data.get('num_nido', instance.num_nido)
        instance.num_hembra = validated_data.get('num_hembra', instance.num_hembra)
        instance.total_huevos = validated_data.get('total_huevos', instance.total_huevos)
        instance.num_ingresos = validated_data.get('num_ingresos', instance.num_ingresos)
        instance.fecha_ingreso_inc = validated_data.get('fecha_ingreso_inc', instance.fecha_ingreso_inc)
        instance.control_huevos_id = validated_data.get('control_huevos_id', instance.control_huevos_id)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observacion = validated_data.get('observacion', instance.observacion)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Spn_ControlHuevosResumenSerializer_list(CommonFieldsSerializer):
    #control_resumen_detalles_id  = Spn_ControlHuevosDetallesSerializer(many=True,read_only=True)
    control_resumen_detalles_id = serializers.SerializerMethodField()

    class Meta:
        model = SpnControlHuevosResumen
        fields = ['id','num_nido','num_hembra','total_huevos','num_ingresos','fecha_postura','fecha_ingreso_inc','control_huevos_id','control_resumen_detalles_id','fecha_ingreso']

    def get_control_resumen_detalles_id(self, instance):
        items = instance.control_resumen_detalles_id.all().order_by('fecha_ingreso')
        return Spn_ControlHuevosDetallesSerializer(items, many=True).data

# SpnControlHuevos
class Spn_ControlHuevosSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpnControlHuevos
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SpnControlHuevos)
        return item

    def update(self, instance, validated_data):
        # Campos SpnControlHuevos
        instance.num_caja = validated_data.get('num_caja', instance.num_caja)
        instance.num_incubadora = validated_data.get('num_incubadora', instance.num_incubadora)
        instance.grupo_nacimiento = validated_data.get('grupo_nacimiento', instance.grupo_nacimiento)
        instance.centro_crianza_id = validated_data.get('centro_crianza_id', instance.centro_crianza_id)
        instance.poblacion_id = validated_data.get('poblacion_id', instance.poblacion_id)
        instance.cant_agua = validated_data.get('cant_agua', instance.cant_agua)
        instance.cant_sustrato = validated_data.get('cant_sustrato', instance.cant_sustrato)
        instance.temperatura = validated_data.get('temperatura', instance.temperatura)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observacion = validated_data.get('observacion', instance.observacion)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Spn_ControlHuevosSerializer_list(CommonFieldsSerializer):
    #control_resumen_id  = Spn_ControlHuevosResumenSerializer_list(many=True,read_only=True)
    control_resumen_id = serializers.SerializerMethodField()
    poblacion_id = Spn_poblacionSerializer_list()
    centro_crianza_id = Spn_CentrosCrianzaSerializer_list();

    class Meta:
        model = SpnControlHuevos
        fields = ['id','num_caja','num_incubadora','grupo_nacimiento','centro_crianza_id','poblacion_id','cant_agua','cant_sustrato','temperatura','control_resumen_id']

    def get_control_resumen_id(self, instance):
        items = instance.control_resumen_id.all().order_by('fecha_ingreso')
        return Spn_ControlHuevosResumenSerializer_list(items, many=True).data

# SpnControlHuevos
class Spn_ControlCrecimientoGalapaguitosDetallesSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpnControlCrecimientoGalapaguitosDetalles
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, SpnControlCrecimientoGalapaguitosDetalles)
        return item

    def update(self, instance, validated_data):
        # Campos SpnControlHuevos      
        instance.control_crecimiento_id = validated_data.get('control_crecimiento_id', instance.control_crecimiento_id)
        instance.control_huevos_resumen_id = validated_data.get('control_huevos_resumen_id', instance.control_huevos_resumen_id)
        #instance.num_huevo = validated_data.get('num_huevo', instance.num_huevo)
        instance.num_hierro = validated_data.get('num_hierro', instance.num_hierro)
        instance.num_pit = validated_data.get('num_pit', instance.num_pit)
        instance.fecha_medida = validated_data.get('fecha_medida', instance.fecha_medida)
        instance.num_pintura = validated_data.get('num_pintura', instance.num_pintura)
        instance.largo_curvo = validated_data.get('largo_curvo', instance.largo_curvo)
        instance.ancho_curvo = validated_data.get('ancho_curvo', instance.ancho_curvo)
        instance.largo_plastron = validated_data.get('largo_plastron', instance.largo_plastron)
        instance.peso = validated_data.get('peso', instance.peso)
        
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.muerta = validated_data.get('muerta', instance.muerta)
        instance.repatriada = validated_data.get('repatriada', instance.repatriada)
        instance.fecha_repatriacion = validated_data.get('fecha_repatriacion', instance.fecha_repatriacion)
        instance.sitio_repatriacion = validated_data.get('sitio_repatriacion', instance.sitio_repatriacion)
        instance.estado_ingreso = validated_data.get('estado_ingreso', instance.estado_ingreso)
        instance.fecha_ingreso_tort = validated_data.get('fecha_ingreso_tort', instance.fecha_ingreso_tort)
        instance.fecha_muerte_tort = validated_data.get('fecha_muerte_tort', instance.fecha_muerte_tort)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class Spn_ControlCrecimientoGalapaguitosDetallesSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = SpnControlCrecimientoGalapaguitosDetalles
        fields = ['id','fecha_medida','num_pintura','num_hierro','num_pit','largo_curvo','ancho_curvo','largo_plastron','peso','observacion','muerta','repatriada','fecha_repatriacion','fecha_ingreso_tort','fecha_muerte_tort','sitio_repatriacion','estado_ingreso','estado','control_crecimiento_id','control_huevos_resumen_id']

# CabControlCrecimientoGalapaguitos
class Spn_ControlCrecimientoGalapaguitosSerializer(CommonFieldsSerializer):
    det_control_crecimiento_id = Spn_ControlCrecimientoGalapaguitosDetallesSerializer(many=True)

    class Meta:
        model = SpnControlCrecimientoGalapaguitos
        fields = '__all__'

    def create(self, validated_data):
        print("/////////////")
        print(validated_data)
        #CREACION
        control_crecimiento_detalle_data = validated_data.pop('det_control_crecimiento_id')
        ControlCrecimientoGalapaguitos = CommonFieldsSerializer.create(self, validated_data, SpnControlCrecimientoGalapaguitos)
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for control_crecimiento_detalle in control_crecimiento_detalle_data:
            #CAMPOS INFORMACION DEL USUARIO
            control_crecimiento_detalle['id'] = uuid.uuid4()
           
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            SpnControlCrecimientoGalapaguitosDetalles.objects.create(control_crecimiento_id=ControlCrecimientoGalapaguitos, **control_crecimiento_detalle)
        return ControlCrecimientoGalapaguitos
        #item = CommonFieldsSerializer.create(self, validated_data, SpnControlCrecimientoGalapaguitos)
        #return item

    def update(self, instance, validated_data):
        # Campos SpnControlHuevos
        instance.grupo_nacimiento = validated_data.get('grupo_nacimiento', instance.grupo_nacimiento)
        instance.centro_crianza_id = validated_data.get('centro_crianza_id', instance.centro_crianza_id)
        instance.poblacion_id = validated_data.get('poblacion_id', instance.poblacion_id)
        instance.periodo = validated_data.get('periodo', instance.periodo)
        instance.anio = validated_data.get('anio', instance.anio)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observacion = validated_data.get('observacion', instance.observacion)

        print("*********************************")
        print(validated_data)
        # Actualización
        control_crecimiento_detalle_data = validated_data.pop('det_control_crecimiento_id')

        ControlCrecimientoGalapaguitos = CommonFieldsSerializer.update(self, instance,validated_data)
        
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso

        
        #print("***************"+ControlCrecimientoGalapaguitos2)

        for control_crecimiento_detalle in control_crecimiento_detalle_data:
            print(control_crecimiento_detalle)
            print("////////***************************///////////////////////************************//////////////////////////")
            #print(control_crecimiento_detalle["id"])
            try:  # python2 and python3
                id_detalle = control_crecimiento_detalle.pop('id')
            except:
                id_detalle = 0
            
            if id_detalle != 0:
                SpnControlCrecimientoGalapaguitosDetalles.objects.filter(id=id_detalle).update(**control_crecimiento_detalle)
            else:                    
                control_crecimiento_detalle['id'] = uuid.uuid4()
                SpnControlCrecimientoGalapaguitosDetalles.objects.filter(control_crecimiento_id=control_crecimiento_detalle['control_crecimiento_id']).create(**control_crecimiento_detalle)

               
        return ControlCrecimientoGalapaguitos
        #item = CommonFieldsSerializer.update(self, instance, validated_data)
        #item.save()
        #return item

class Spn_ControlCrecimientoGalapaguitosSerializer_list(CommonFieldsSerializer):
    poblacion_id = Spn_poblacionSerializer_short()
    centro_crianza_id = Spn_CentrosCrianzaSerializer_list()
    det_control_crecimiento_id = Spn_ControlCrecimientoGalapaguitosDetallesSerializer_list(many=True, read_only=True)
    class Meta:
        model = SpnControlCrecimientoGalapaguitos
        fields = ['id','grupo_nacimiento','centro_crianza_id','poblacion_id','periodo','anio','det_control_crecimiento_id']

class Spn_VwControlCrecimientoGalapaguitosSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = VwSpnControlCrecimientoMaxMes
        fields = '__all__'

class Spn_VwDatosHuevosPinturaSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = VwSpnDatosHuevoxPintura
        fields = '__all__'

class Spn_VwDatosControlCreceHuevoxPinturaSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = VwSpnDatosControlCreceHuevoxPintura
        fields = '__all__'

class Spn_VwResumenHuevosIncubadosSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = VwSpnResumenHuevosIncubados
        fields = '__all__'

class Spn_VwResumenHuevosIncubadosDetallesSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = VwSpnResumenHuevosIncubadosDetalles
        fields = '__all__'

class Spn_VwResumenHuevosIncubadosPerdiodoSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = VwSpnResumenHuevosIncubadosPerdiodo
        fields = '__all__'

class Spn_VwDetalleControlCrecimientoSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = VwSpnDetalleControlCrecimiento
        fields = ['grupo_nacimiento','centro_crianza','des_poblacion','periodo_medida','fecha_medida','con_pintura','estado_tortuga']

class Spn_VwEstadoActualCC_list(CommonFieldsSerializer):

    class Meta:
        model = VwSpnEstadoActualCC
        fields = '__all__'