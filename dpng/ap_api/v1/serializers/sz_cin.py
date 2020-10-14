# DJANGO
import uuid
from datetime import datetime,date
from django.contrib.auth.models import User
from django.conf import settings

# REST
from rest_framework import serializers

# Serializador
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer
from ap_api.v1.serializers.sz_per import Per_PersonaSerializer_label
from ap_api.v1.serializers.sz_lic import Lic_GuiaSerializer_short
from ap_api.v1.serializers.sz_pat import Pat_PatenteSerializer_list
from ap_api.v1.serializers.sz_per import Per_FuncionarioSerializer_list
from ap_api.v1.serializers.sz_cuem import AppFdT_licenciaparmaSerializer_list, AppFdTpermisopescaSerializer_list
from ap_api.v1.serializers.sz_geo import  Geo_SitioSerializer_short
from ap_api.v1.serializers.sz_bio import  Bio_EspeciesSerializer_list

# Modelos
from ap_cuso_controlinsular.models import* 

#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------Control Turistica-------------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
class Cin_ControlturistasSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CinControlturistas
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CinControlturistas)
        return item

    def update(self, instance, validated_data):
        # Campos CinControlturistas
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.guardaparque_id = validated_data.get('guardaparque_id', instance.guardaparque_id)
        instance.lugar_id = validated_data.get('lugar_id', instance.lugar_id)
        instance.subproceso_id = validated_data.get('subproceso_id', instance.subproceso_id)
        instance.existe_guiaturistico = validated_data.get('existe_guiaturistico', instance.existe_guiaturistico)
        instance.lic_guia_id = validated_data.get('lic_guia_id', instance.lic_guia_id)
        instance.pasajero_id = validated_data.get('pasajero_id', instance.pasajero_id)
        instance.num_pasajeros = validated_data.get('num_pasajeros', instance.num_pasajeros)
        instance.guia_con_uniforme = validated_data.get('guia_con_uniforme', instance.guia_con_uniforme)
        instance.nombre_foto = validated_data.get('nombre_foto', instance.nombre_foto)
        instance.foto = validated_data.get('foto', instance.foto)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.observaciones_dba = validated_data.get('observaciones_dba', instance.observaciones_dba)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Cin_ControlturistasSerializer_list(CommonFieldsSerializer):
    pasajero_id = Per_PersonaSerializer_label()
    lic_guia_id = Lic_GuiaSerializer_short()
    lugar_id = Geo_SitioSerializer_short()

    class Meta:
        model = CinControlturistas
        fields = ['id','lugar_id','fecha','pasajero_id','num_pasajeros','lic_guia_id','existe_guiaturistico','guia_con_uniforme','observaciones','foto','estado']


# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------

#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#----------------------------------Control Sitio Turistica-----------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
class Cin_ControlTuristaSitioSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CinControlturistasSitios
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CinControlturistasSitios)
        return item

    def update(self, instance, validated_data):
        # Campos CinControlturistas
        instance.controlturistas_id = validated_data.get('controlturistas_id', instance.controlturistas_id)
        instance.sitiovisita_id = validated_data.get('sitiovisita_id', instance.sitiovisita_id)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.observaciones_dba = validated_data.get('observaciones_dba', instance.observaciones_dba)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class Cin_ControlTuristaSitioSerializer_list(CommonFieldsSerializer):
    controlturistas_id = Cin_ControlturistasSerializer_list()
    sitiovisita_id = Geo_SitioSerializer_short()

    class Meta:
        model = CinControlturistasSitios
        fields = ['id','controlturistas_id','sitiovisita_id','eliminado', 'estado']

# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------

#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------Control Pesca-----------------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
class Cin_ControlPescaSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CinControlPesca
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CinControlPesca)
        return item

    def update(self, instance, validated_data):

        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.lugar_id = validated_data.get('lugar_id', instance.lugar_id)
        instance.subproceso_id = validated_data.get('subproceso_id', instance.subproceso_id)
        instance.guardaparque_id = validated_data.get('guardaparque_id',instance.guardaparque_id)
        instance.parma_id = validated_data.get('parma_id', instance.parma_id)
        instance.ident_conductor = validated_data.get('ident_conductor', instance.ident_conductor)
        instance.nombres_conductor = validated_data.get('nombres_conductor', instance.nombres_conductor)
        instance.apellidos_conductor = validated_data.get('apellidos_conductor', instance.apellidos_conductor)
        instance.nombre_foto = validated_data.get('nombre_foto', instance.nombre_foto)
        instance.foto = validated_data.get('foto', instance.foto)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.observaciones_dba = validated_data.get('observaciones_dba', instance.observaciones_dba)
    
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class Cin_ControlPescaSerializer_list(CommonFieldsSerializer):
    lugar_id = Geo_SitioSerializer_short()
    parma_id = AppFdT_licenciaparmaSerializer_list()
    
    class Meta:
        model = CinControlPesca
        fields = ['id','fecha','lugar_id','parma_id','ident_conductor','nombres_conductor','apellidos_conductor','foto','estado','eliminado','observaciones']

# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------

#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#----------------------------------Control Pesca Especie-------------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
class Cin_ControlPescaEspecieSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CinControlPescaEspecie
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CinControlPescaEspecie)
        return item

    def update(self, instance, validated_data):
        instance.controlpesca_id = validated_data.get('controlpesca_id', instance.controlpesca_id)
        instance.especie_id = validated_data.get('especie_id', instance.especie_id)
        instance.unidad = validated_data.get('unidad', instance.unidad)
        instance.peso = validated_data.get('peso', instance.peso)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.observaciones_dba = validated_data.get('observaciones_dba', instance.observaciones_dba)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class Cin_ControlPescaEspecieSerializer_list(CommonFieldsSerializer):
    controlpesca_id = Cin_ControlPescaSerializer_list()
    especie_id = Bio_EspeciesSerializer_list()

    class Meta:
        model = CinControlPescaEspecie
        fields = ['id','controlpesca_id','especie_id','unidad','peso','eliminado', 'estado']

# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------


#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#------------------------------Control Inspeccion Contenedores-------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
class Cin_InspeccionContenedoresSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CinInspeccionContenedores
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CinInspeccionContenedores)
        return item

    def update(self, instance, validated_data):
        # Campos CinInspeccionContenedores
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.lugar_id = validated_data.get('lugar_id', instance.lugar_id)
        instance.guardaparque_id = validated_data.get('guardaparque_id', instance.guardaparque_id)
        instance.subproceso_id = validated_data.get('subproceso_id', instance.subproceso_id)
        instance.embarcacion = validated_data.get('embarcacion', instance.embarcacion)
        instance.cod_contenedor = validated_data.get('cod_contenedor', instance.cod_contenedor)
        instance.num_bultos = validated_data.get('num_bultos', instance.num_bultos)
        instance.nombre_foto = validated_data.get('nombre_foto', instance.nombre_foto)
        instance.foto = validated_data.get('foto', instance.foto)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.observaciones_dba = validated_data.get('observaciones_dba', instance.observaciones_dba)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Cin_InspeccionContenedores_list(CommonFieldsSerializer):
    guardaparque_id = Per_FuncionarioSerializer_list()
    lugar_id = Geo_SitioSerializer_short()

    class Meta:
        model = CinInspeccionContenedores
        fields = ['id','fecha','lugar_id','embarcacion','cod_contenedor','num_bultos','observaciones','foto','estado','guardaparque_id']
# --------------------------------------------------------------------------------------------------------
# --------------------------------------------------------------------------------------------------------

#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#------------------------------Control Patrullaje -------------------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
class Cin_ControlPatrullajeSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CinControlPatrullaje
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, CinControlPatrullaje)
        return item

    def update(self, instance, validated_data):

        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.funcionarios_id = validated_data.get('funcionarios_id', instance.funcionarios_id)
        instance.funcionarios_nombre = validated_data.get('funcionarios_nombre', instance.funcionarios_nombre)
        instance.policia = validated_data.get('policia', instance.policia)
        instance.nombre_foto = validated_data.get('nombre_foto', instance.nombre_foto)
        instance.foto = validated_data.get('foto', instance.foto)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.observaciones_dba = validated_data.get('observaciones_dba', instance.observaciones_dba)
        
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Cin_ControlPatrullajeSerializer_list(CommonFieldsSerializer):
    
    class Meta:
        model = CinControlPatrullaje
        fields = ['id','fecha','funcionarios_id','funcionarios_nombre','policia','foto','estado']

# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------

#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#------------------------------Control Sitio Patrullaje--------------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
class Cin_ControlSitioPatrullajeSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CinControlSitioPatrullaje
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CinControlSitioPatrullaje)
        return item

    def update(self, instance, validated_data):
        instance.controlpatrullaje_id = validated_data.get('controlpatrullaje_id', instance.controlpatrullaje_id)
        instance.sitio_id = validated_data.get('sitio_id', instance.sitio_id)
        instance.mov_vehiculo = validated_data.get('mov_vehiculo', instance.mov_vehiculo)
        instance.mov_pie = validated_data.get('mov_pie', instance.mov_pie)
        instance.mov_cemila = validated_data.get('mov_cemila', instance.mov_cemila)
        instance.mov_otro = validated_data.get('mov_otro', instance.mov_otro)
        instance.mov_otro_descripcion = validated_data.get('mov_otro_descripcion', instance.mov_otro_descripcion)
        instance.existe_novedad = validated_data.get('existe_novedad', instance.existe_novedad)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.observaciones_dba = validated_data.get('observaciones_dba', instance.observaciones_dba)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Cin_ControlSitioPatrullajeSerializer_list(CommonFieldsSerializer):
    controlpatrullaje_id = Cin_ControlPatrullajeSerializer_list()
    sitio_id = Geo_SitioSerializer_short()
    ctp_sitiopatrullaje_id = serializers.StringRelatedField(many=True)
    #ctp_sitiopatrullaje_id = serializers.SlugRelatedField(
    #    many=True,
    #    read_only=True,
    #    slug_field='id',
    # )
    #ctp_sitiopatrullaje_id = serializers.PrimaryKeyRelatedField(queryset=CinControlNovedadPatrullaje.objects.all())
    #ctp_sitiopatrullaje_id = Cin_ControlNovedadPatrullajeSerializer_list()

    class Meta:
        model = CinControlSitioPatrullaje
        fields = ['id','ctp_sitiopatrullaje_id','controlpatrullaje_id','sitio_id','mov_vehiculo','mov_pie','mov_cemila','mov_otro','mov_otro_descripcion','existe_novedad','estado']


#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#------------------------------------Control Hitos---------------------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
class Cin_HitosSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CinHitos
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CinHitos)
        return item

    def update(self, instance, validated_data):
        
        instance.provincia = validated_data.get('provincia', instance.provincia)
        instance.isla = validated_data.get('isla', instance.isla)
        instance.canton = validated_data.get('canton', instance.canton)
        instance.parroquia = validated_data.get('parroquia', instance.parroquia)
        instance.sitio_referencia = validated_data.get('sitio_referencia', instance.sitio_referencia)
        instance.area = validated_data.get('area', instance.area)
        instance.cod = validated_data.get('cod', instance.cod)
        instance.punto = validated_data.get('punto', instance.punto)
        instance.punto_general = validated_data.get('punto_general', instance.punto_general)
        instance.x = validated_data.get('x', instance.x)
        instance.y = validated_data.get('y', instance.y)
        instance.z = validated_data.get('z', instance.z)
        instance.acuerdo_decreto = validated_data.get('acuerdo_decreto', instance.acuerdo_decreto)
        instance.fecha_acuerdo_decreto = validated_data.get('fecha_acuerdo_decreto', instance.fecha_acuerdo_decreto)
        instance.fecha_levantamiento_hito = validated_data.get('fecha_levantamiento_hito', instance.fecha_levantamiento_hito)
        instance.hito_fisico = validated_data.get('hito_fisico', instance.hito_fisico)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Cin_HitosSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = CinHitos
        fields = ['id','provincia','isla','canton','parroquia','sitio_referencia','area','cod','punto','punto_general','x','y','z','acuerdo_decreto','fecha_acuerdo_decreto','hito_fisico','eliminado','estado']

#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#------------------------------Control Hito Patrullaje--------------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
class Cin_ControlHitoPatrullajeSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CinControlHitoPatrullaje
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CinControlHitoPatrullaje)
        return item

    def update(self, instance, validated_data):
        instance.controlpatrullaje_id = validated_data.get('controlpatrullaje_id', instance.controlpatrullaje_id)
        instance.hito_id = validated_data.get('hito_id', instance.hito_id)
        instance.estado_hito = validated_data.get('estado_hito', instance.estado_hito)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.observaciones_dba = validated_data.get('observaciones_dba', instance.observaciones_dba)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Cin_ControlHitoPatrullajeSerializer_list(CommonFieldsSerializer):
    controlpatrullaje_id = Cin_ControlPatrullajeSerializer_list()
    hito_id = Cin_HitosSerializer_list()

    class Meta:
        model = CinControlHitoPatrullaje
        fields = ['id','controlpatrullaje_id','hito_id','estado_hito','estado']

#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#------------------------------Control Novedad Patrullaje--------------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
class Cin_ControlNovedadPatrullajeSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CinControlNovedadPatrullaje
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CinControlNovedadPatrullaje)
        return item

    def update(self, instance, validated_data):
        instance.sitiopatrullaje_id = validated_data.get('sitiopatrullaje_id', instance.sitiopatrullaje_id)
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.cantidad = validated_data.get('cantidad', instance.cantidad)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.observaciones_dba = validated_data.get('observaciones_dba', instance.observaciones_dba)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Cin_ControlNovedadPatrullajeSerializer_list(CommonFieldsSerializer):
    sitiopatrullaje_id = Cin_ControlSitioPatrullajeSerializer_list()

    class Meta:
        model = CinControlSitioPatrullaje
        fields = ['id','sitiopatrullaje_id','descripcion','cantidad','observaciones','estado']


#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#------------------------------------Control Aeropuerto--------------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
class Cin_ControlAeropuertoSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CinControlAeropuerto
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CinControlAeropuerto)
        return item

    def update(self, instance, validated_data):
        
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.lugar_id = validated_data.get('lugar_id', instance.lugar_id)
        instance.funcionarios_id = validated_data.get('funcionarios_id', instance.funcionarios_id)
        instance.funcionarios_nombre = validated_data.get('funcionarios_nombre', instance.funcionarios_nombre)
        instance.personal_otro = validated_data.get('personal_otro',instance.personal_otro)
        instance.area_trabajo = validated_data.get('area_trabajo', instance.area_trabajo)
        instance.num_equipajes_inspec = validated_data.get('num_equipajes_inspec', instance.num_equipajes_inspec)
        instance.num_cargas_inspec = validated_data.get('num_cargas_inspec', instance.num_cargas_inspec)
        instance.nombre_foto = validated_data.get('nombre_foto', instance.nombre_foto)
        instance.foto = validated_data.get('foto', instance.foto)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.observaciones_dba = validated_data.get('observaciones_dba', instance.observaciones_dba)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Cin_ControlAeropuertoSerializer_list(CommonFieldsSerializer):
    lugar_id = Geo_SitioSerializer_short()
    class Meta:
        model = CinControlAeropuerto
        fields = ['id','fecha','lugar_id','funcionarios_id','funcionarios_nombre','personal_otro','area_trabajo','num_equipajes_inspec','num_cargas_inspec','estado']

#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------Control Aeropuerto Guias------------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
class Cin_ControlAeropuertoGuiasSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CinControlAeropuertoGuia
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CinControlAeropuertoGuia)
        return item

    def update(self, instance, validated_data):
        
        instance.controlaerop_id = validated_data.get('controlaerop_id', instance.controlaerop_id)
        instance.tipo_guia = validated_data.get('tipo_guia', instance.tipo_guia)
        instance.guia = validated_data.get('guia', instance.guia)
        instance.tipo_pesca = validated_data.get('tipo_pesca', instance.tipo_pesca)
        instance.peso = validated_data.get('peso', instance.peso)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.observaciones_dba = validated_data.get('observaciones_dba', instance.observaciones_dba)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Cin_ControlAeropuertoGuiasSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = CinControlAeropuertoGuia
        fields = ['id','controlaerop_id','guia','tipo_guia','tipo_pesca','peso','estado']

# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------


#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#-----------------------------Control Aeropuerto Muestras------------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
class Cin_ControlAeropuertoMuestrasSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CinControlAeropuertoMuestra
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CinControlAeropuertoMuestra)
        return item

    def update(self, instance, validated_data):
        
        instance.controlaerop_id = validated_data.get('controlaerop_id', instance.controlaerop_id)
        instance.muestra = validated_data.get('muestra', instance.muestra)
        instance.tipo_muestra = validated_data.get('tipo_muestra', instance.tipo_muestra)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.observaciones_dba = validated_data.get('observaciones_dba', instance.observaciones_dba)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Cin_ControlAeropuertoMuestrasSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = CinControlAeropuertoMuestra
        fields = ['id','controlaerop_id','muestra','tipo_muestra','observaciones','estado']

# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------


#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#------------------------------Control Aeropuerto Vuelos-------------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
class Cin_ControlAeropuertoVuelosSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CinControlAeropuertoVuelo
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CinControlAeropuertoVuelo)
        return item

    def update(self, instance, validated_data):
        
        instance.controlaerop_id = validated_data.get('controlaerop_id', instance.controlaerop_id)
        instance.cantidad = validated_data.get('cantidad', instance.cantidad)
        instance.aerolinea = validated_data.get('aerolinea', instance.aerolinea)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.observaciones_dba = validated_data.get('observaciones_dba', instance.observaciones_dba)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Cin_ControlAeropuertoVuelosSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = CinControlAeropuertoVuelo
        fields = ['id','controlaerop_id','cantidad','aerolinea','observaciones','estado']

# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------


#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#-----------------------------Control Aeropuerto Iguanas-------------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
class Cin_ControlAeropuertoIguanasSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CinControlAeropuertoIguanas
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CinControlAeropuertoIguanas)
        return item

    def update(self, instance, validated_data):
        
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.lugar_id = validated_data.get('lugar_id', instance.lugar_id)
        instance.funcionarios_id = validated_data.get('funcionarios_id', instance.funcionarios_id)
        instance.funcionarios_nombre = validated_data.get('funcionarios_nombre', instance.funcionarios_nombre)
        instance.personal_otro = validated_data.get('personal_otro',instance.personal_otro)
        instance.cantidad_mov = validated_data.get('cantidad_mov', instance.cantidad_mov)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.observaciones_dba = validated_data.get('observaciones_dba', instance.observaciones_dba)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Cin_ControlAeropuertoIguanasSerializer_list(CommonFieldsSerializer):
    lugar_id = Geo_SitioSerializer_short()

    class Meta:
        model = CinControlAeropuertoIguanas
        fields = ['id','fecha','lugar_id','funcionarios_id','funcionarios_nombre','personal_otro','cantidad_mov','foto','observaciones','estado']

# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------


#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#-----------------------------Control Aeropuerto Recorridos----------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
class Cin_ControlAeropuertoRecorridosSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CinControlAeropuertoRecorridos
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CinControlAeropuertoRecorridos)
        return item

    def update(self, instance, validated_data):
        
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.funcionarios_id = validated_data.get('funcionarios_id', instance.funcionarios_id)
        instance.funcionarios_nombre = validated_data.get('funcionarios_nombre', instance.funcionarios_nombre)
        instance.sitio_id = validated_data.get('sitio_id', instance.sitio_id)
        instance.area_pista = validated_data.get('area_pista', instance.area_pista)
        instance.area_via = validated_data.get('area_via', instance.area_via)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.observaciones_dba = validated_data.get('observaciones_dba', instance.observaciones_dba)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Cin_ControlAeropuertoRecorridosSerializer_list(CommonFieldsSerializer):
    sitio_id = Geo_SitioSerializer_short()

    class Meta:
        model = CinControlAeropuertoRecorridos
        fields = ['id','fecha','sitio_id','funcionarios_id','funcionarios_nombre','area_pista','area_via','observaciones','estado']

# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------


#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#---------------------------Vista Funcionarios Control Insular-------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
class Cin_FuncionariosSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = CinFuncionarios
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, CinFuncionarios)
        return item

    def update(self, instance, validated_data):
        
        instance.identificacion = validated_data.get('identificacion', instance.identificacion)
        instance.nombre_completo = validated_data.get('nombre_completo', instance.nombre_completo)
        instance.isla = validated_data.get('isla', instance.isla)
        instance.direccion = validated_data.get('direccion', instance.direccion)
        instance.proceso = validated_data.get('proceso', instance.proceso)
        instance.subproceso = validated_data.get('subproceso', instance.subproceso)
        instance.direccion_id = validated_data.get('direccion_id', instance.direccion_id)
        instance.proceso_id = validated_data.get('proceso_id', instance.proceso_id)
        instance.subproceso_id = validated_data.get('subproceso_id', instance.subproceso_id)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Cin_FuncionariosSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = CinFuncionarios
        fields = ['id','identificacion','nombre_completo','isla','direccion','proceso','subproceso','direccion_id','proceso_id','subproceso_id']

# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------






