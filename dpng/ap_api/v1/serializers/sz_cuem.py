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

# AppFdT_datospescador
class AppFdT_datospescadorSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = AppFdTdatospescador
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, AppFdTdatospescador)
        return item

    def update(self, instance, validated_data):
        # Campos AppFdTdatospescador
        
        instance.c_direccion = validated_data.get('c_direccion', instance.c_direccion)
        instance.c_motivoingreso = validated_data.get('c_motivoingreso', instance.c_motivoingreso)
        instance.c_sexo = validated_data.get('c_sexo', instance.c_sexo)
        instance.c_provincia = validated_data.get('c_provincia', instance.c_provincia)
        instance.c_isla = validated_data.get('c_isla', instance.c_isla)
        instance.c_fechafallecimiento = validated_data.get('c_fechafallecimiento', instance.c_fechafallecimiento)
        instance.c_paisnacimiento = validated_data.get('c_paisnacimiento', instance.c_paisnacimiento)
        instance.c_instruccionacademica = validated_data.get('c_instruccionacademica', instance.c_instruccionacademica)
        instance.c_especificacionlaboral = validated_data.get('c_especificacionlaboral', instance.c_especificacionlaboral)
        instance.c_fotopescador = validated_data.get('c_fotopescador', instance.c_fotopescador)
        instance.c_documentodefuncion = validated_data.get('c_documentodefuncion', instance.c_documentodefuncion)
        instance.c_nombrepescadoranterior = validated_data.get('c_nombrepescadoranterior', instance.c_nombrepescadoranterior)
        instance.c_fechanacimiento = validated_data.get('c_fechanacimiento', instance.c_fechanacimiento)
        instance.c_ciudad = validated_data.get('c_ciudad', instance.c_ciudad)
        instance.c_categoriapescador = validated_data.get('c_categoriapescador', instance.c_categoriapescador)
        instance.c_codigoreferencia = validated_data.get('c_codigoreferencia', instance.c_codigoreferencia)
        instance.c_cooperativa = validated_data.get('c_cooperativa', instance.c_cooperativa)
        instance.c_email = validated_data.get('c_email', instance.c_email)
        instance.c_cedula = validated_data.get('c_cedula', instance.c_cedula)
        instance.c_celular = validated_data.get('c_celular', instance.c_celular)
        instance.c_cargomatriculadigmer = validated_data.get('c_cargomatriculadigmer', instance.c_cargomatriculadigmer)
        instance.c_matriculadigmer = validated_data.get('c_matriculadigmer', instance.c_matriculadigmer)
        instance.c_redessociales = validated_data.get('c_redessociales', instance.c_redessociales)
        instance.c_nresidencia = validated_data.get('c_nresidencia', instance.c_nresidencia)
        instance.c_nhijos = validated_data.get('c_nhijos', instance.c_nhijos)
        instance.c_tipolicenciaguia = validated_data.get('c_tipolicenciaguia', instance.c_tipolicenciaguia)
        instance.c_nombres = validated_data.get('c_nombres', instance.c_nombres)
        instance.c_nlicenciaguia = validated_data.get('c_nlicenciaguia', instance.c_nlicenciaguia)
        instance.c_parmaanterior = validated_data.get('c_parmaanterior', instance.c_parmaanterior)
        instance.c_cooperativaembarcacion = validated_data.get('c_cooperativaembarcacion', instance.c_cooperativaembarcacion)
        instance.c_cedulaanterior = validated_data.get('c_cedulaanterior', instance.c_cedulaanterior)
        instance.c_apellidospescadoranterior = validated_data.get('c_apellidospescadoranterior', instance.c_apellidospescadoranterior)
        instance.c_apodo = validated_data.get('c_apodo', instance.c_apodo)
        instance.c_procesar = validated_data.get('c_procesar', instance.c_procesar)
        instance.c_estado = validated_data.get('c_estado', instance.c_estado)
        instance.c_licenciaparma = validated_data.get('c_licenciaparma', instance.c_licenciaparma)
        instance.c_estadosancionado = validated_data.get('c_estadosancionado', instance.c_estadosancionado)
        instance.c_estadoeliminado = validated_data.get('c_estadoeliminado', instance.c_estadoeliminado)
        instance.c_direccion = validated_data.get('c_direccion', instance.c_direccion)
        instance.c_foto = validated_data.get('c_foto', instance.c_foto)
        instance.c_telefono = validated_data.get('c_telefono', instance.c_telefono)
        instance.c_nproceso = validated_data.get('c_nproceso', instance.c_nproceso)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class AppFdT_datospescadorSerializer_list(CommonFieldsSerializer):
       
    class Meta:
        model = AppFdTdatospescador
        fields = ['id','c_cedula','c_nombres','c_apellidos','c_isla','c_estado']


class AppFdT_pescadorSerializer_list(CommonFieldsSerializer):
    
    class Meta:
        model = AppFdTdatospescador
        fields = '__all__'

# AppFdT_licenciaparma
class AppFdTlicenciaparmaSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = AppFdTlicenciaparma
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,  AppFdTlicenciaparma)
        return item

    def update(self, instance, validated_data):
        # Campos AppFdTlicenciaparma
        
        instance.c_cedula = validated_data.get('c_cedula', instance.c_cedula)
        instance.c_nombres = validated_data.get('c_nombres', instance.c_nombres)
        instance.c_apellidos = validated_data.get('c_apellidos', instance.c_apellidos)
        instance.c_sexo = validated_data.get('c_sexo', instance.c_sexo)
        instance.c_nhijos = validated_data.get('c_nhijos', instance.c_nhijos)
        instance.c_tipo_sangre = validated_data.get('c_tipo_sangre', instance.c_tipo_sangre)
        instance.c_fechanacimiento = validated_data.get('c_fechanacimiento', instance.c_fechanacimiento)
        instance.c_isla = validated_data.get('c_isla', instance.c_isla)
        instance.c_nresidencia = validated_data.get('c_nresidencia', instance.c_nresidencia)
        instance.c_estado = validated_data.get('c_estado', instance.c_estado)
        instance.c_paisnacimiento = validated_data.get('c_paisnacimiento', instance.c_paisnacimiento)
        instance.c_provincia = validated_data.get('c_provincia', instance.c_provincia)
        instance.c_ciudad = validated_data.get('c_ciudad', instance.c_ciudad)
        instance.c_tipolicenciaguia = validated_data.get('c_tipolicenciaguia', instance.c_tipolicenciaguia)
        instance.c_apodo = validated_data.get('c_apodo', instance.c_apodo)
        instance.c_direccion = validated_data.get('c_direccion', instance.c_direccion)
        instance.c_instruccionacademica = validated_data.get('c_instruccionacademica', instance.c_instruccionacademica)
        instance.c_telefono = validated_data.get('c_telefono', instance.c_telefono)
        instance.c_celular = validated_data.get('c_celular', instance.c_celular)
        instance.c_email = validated_data.get('c_email', instance.c_email)
        instance.c_cargomatriculadigmer = validated_data.get('c_cargomatriculadigmer', instance.c_cargomatriculadigmer)
        instance.c_matriculadigmer = validated_data.get('c_matriculadigmer', instance.c_matriculadigmer)
        instance.c_motivoingreso = validated_data.get('c_motivoingreso', instance.c_motivoingreso)
        instance.c_cooperativa = validated_data.get('c_cooperativa', instance.c_cooperativa)
        instance.c_categoriapescador = validated_data.get('c_categoriapescador', instance.c_categoriapescador)
        instance.c_especificacionlaboral = validated_data.get('c_especificacionlaboral', instance.c_especificacionlaboral)
        instance.c_licenciaparma = validated_data.get('c_licenciaparma', instance.c_licenciaparma)
        instance.c_cedulaanterior = validated_data.get('c_cedulaanterior', instance.c_cedulaanterior)
        instance.c_apellidospescadoranterior = validated_data.get('c_apellidospescadoranterior', instance.c_apellidospescadoranterior)
        instance.c_nombrepescadoranterior = validated_data.get('c_nombrepescadoranterior', instance.c_nombrepescadoranterior)
        instance.c_parmaanterior = validated_data.get('c_parmaanterior', instance.c_parmaanterior)
        instance.c_cooperativaembarcacion = validated_data.get('c_cooperativaembarcacion', instance.c_cooperativaembarcacion)
        instance.c_nproceso = validated_data.get('c_nproceso', instance.c_nproceso)
        instance.c_fotopescador = validated_data.get('c_fotopescador', instance.c_fotopescador)
        instance.c_fechaemision = validated_data.get('c_fechaemision', instance.c_fechaemision)
        instance.c_fechacaducidad = validated_data.get('c_fechacaducidad', instance.c_fechacaducidad)
        instance.c_tipoemisionsancruz = validated_data.get('c_tipoemisionsancruz', instance.c_tipoemisionsancruz)
        instance.c_tipoemisionsancristobal = validated_data.get('c_tipoemisionsancristobal', instance.c_tipoemisionsancristobal)
        instance.c_tipoemisionisabela = validated_data.get('c_tipoemisionisabela', instance.c_tipoemisionisabela)
        instance.c_observacion = validated_data.get('c_observacion', instance.c_observacion) 
        instance.c_fechafallecimiento = validated_data.get('c_fechafallecimiento', instance.c_fechafallecimiento)
        instance.c_documentodefuncion = validated_data.get('c_documentodefuncion', instance.c_documentodefuncion)
        instance.c_codigoreferencia = validated_data.get('c_codigoreferencia', instance.c_codigoreferencia)
        instance.c_redessociales = validated_data.get('c_redessociales', instance.c_redessociales)
        instance.c_nlicenciaguia = validated_data.get('c_nlicenciaguia', instance.c_nlicenciaguia)
        instance.c_procesar = validated_data.get('c_procesar', instance.c_procesar)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class AppFdT_licenciaparmaSerializer_list(CommonFieldsSerializer):
    
    class Meta:
        model = AppFdTlicenciaparma
        fields = ['id','c_cedula','c_nombres','c_apellidos','c_licenciaparma','c_fechaemision','c_fechacaducidad','c_estado']

class AppFdTlicenciaparmaAllSerializer_list(CommonFieldsSerializer):
    
    class Meta:
        model = AppFdTlicenciaparma
        fields = '__all__'


class AppFdT_licenciaparmaSerializer_app(CommonFieldsSerializer):
    
    class Meta:
        model = VwUltimaslicenciasParma
        fields = ['id','c_isla','c_cedula','c_nombres','c_apellidos','c_licenciaparma','c_fechaemision','c_fechacaducidad','estado','eliminado','c_aprobadaecosistemas']

# AppFdT_Embarcacionpesca
class AppFdT_embarcacionpescaSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = AppFdTembarcacionpesca
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,  )
        return item

    def update(self, instance, validated_data):
        # Campos AppFdTlicenciaparma
        
        #instance.func_solicitante_id = validated_data.get('func_solicitante_id', instance.func_solicitante_id)
        #instance.secuencia = validated_data.get('secuencia', instance.secuencia)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class AppFdT_embarcacionpescaSerializer_list(CommonFieldsSerializer):
    
    class Meta:
        model = AppFdTembarcacionpesca
        fields = ['id','c_nombreembarcacion','c_tipoembarcacion','c_islaorigen','c_matriculanaval','estado',]




# AppFdT_permisopesca
class AppFdTpermisopescaSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = AppFdTpermisopesca
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data,  )
        return item

    def update(self, instance, validated_data):
        # Campos AppFdTlicenciaparma
        
        #instance.func_solicitante_id = validated_data.get('func_solicitante_id', instance.func_solicitante_id)
        #instance.secuencia = validated_data.get('secuencia', instance.secuencia)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class AppFdTpermisopescaSerializer_list(CommonFieldsSerializer):
    
    class Meta:
        model = AppFdTpermisopesca
        fields = ['id','c_matriculadigmer','c_nombreembarcacion','c_fechaemision','c_fechacaducidad','c_permisopesca','c_armadorunoapellidos','c_armadorunonombres','estado']
        #Se anadio el estado

class AppFdTpermisopescaAllSerializer_list(CommonFieldsSerializer):
    
    class Meta:
        model = AppFdTpermisopesca
        fields = '__all__'


# AppFdT_permisocompesblan
class AppFdT_permisocompesblanSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = AppFdTpermisocompesblan
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, AppFdTpermisocompesblan)
        return item

    def update(self, instance, validated_data):
        # Campos AppFdTpermisocompesblan
        
        instance.c_direccion = validated_data.get('c_direccion', instance.c_direccion)
        instance.c_puertocomercializacion = validated_data.get('c_puertocomercializacion', instance.c_puertocomercializacion)
        instance.c_apellidos = validated_data.get('c_apellidos', instance.c_apellidos)
        instance.c_fechaemision = validated_data.get('c_fechaemision', instance.c_fechaemision)
        instance.c_telefono = validated_data.get('c_telefono', instance.c_telefono)
        instance.c_nresidencia = validated_data.get('c_nresidencia', instance.c_nresidencia)
        instance.c_isla = validated_data.get('c_isla', instance.c_isla)
        instance.c_fechaingreso = validated_data.get('c_fechaingreso', instance.c_fechaingreso)
        instance.c_nombres = validated_data.get('c_nombres', instance.c_nombres)
        instance.c_email = validated_data.get('c_email', instance.c_email)
        instance.c_suscrito = validated_data.get('c_suscrito', instance.c_suscrito)
        instance.c_fotocomerciante = validated_data.get('c_fotocomerciante', instance.c_fotocomerciante)
        instance.c_cedula = validated_data.get('c_cedula', instance.c_cedula)
        instance.c_fechacaducidad = validated_data.get('c_fechacaducidad', instance.c_fechacaducidad)
        instance.c_celular = validated_data.get('c_celular', instance.c_celular)
        instance.c_estadotramite = validated_data.get('c_estadotramite', instance.c_estadotramite)
        instance.c_aprobadamanejopesquero = validated_data.get('c_aprobadamanejopesquero', instance.c_aprobadamanejopesquero)
        instance.c_aprobadacuem = validated_data.get('c_aprobadacuem', instance.c_aprobadacuem)
        instance.c_estadopermiso = validated_data.get('c_estadopermiso', instance.c_estadopermiso)
        instance.c_aprobadaecosistemas = validated_data.get('c_aprobadaecosistemas', instance.c_aprobadaecosistemas)
        instance.c_codigopermiso = validated_data.get('c_codigopermiso', instance.c_codigopermiso)
        instance.c_compania = validated_data.get('c_compania', instance.c_compania)
        instance.c_temporadapesqueria = validated_data.get('c_temporadapesqueria', instance.c_temporadapesqueria)
        instance.c_oficioingreso = validated_data.get('c_oficioingreso', instance.c_oficioingreso)
        instance.c_codigopermisocomercializacionpescablanca = validated_data.get('c_codigopermisocomercializacionpescablanca', instance.c_codigopermisocomercializacionpescablanca)
        instance.c_motivonoaprobacion = validated_data.get('c_motivonoaprobacion', instance.c_motivonoaprobacion)
        instance.c_fechaingresooficio = validated_data.get('c_fechaingresooficio', instance.c_fechaingresooficio)
        instance.c_cooperativa = validated_data.get('c_cooperativa', instance.c_cooperativa)
        instance.c_firmadirectorecosistemas = validated_data.get('c_firmadirectorecosistemas', instance.c_firmadirectorecosistemas)
        instance.c_directorecosistemas = validated_data.get('c_directorecosistemas', instance.c_directorecosistemas) 
            
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class AppFdT_permisocompesblanSerializer_list(CommonFieldsSerializer):
    
    class Meta:
        model = AppFdTpermisocompesblan
        fields = ['id','c_isla','estado']



# AppFdT_permisocomlangosta
class AppFdT_permisocomlangostaSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = AppFdTpermisocomlangosta
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, AppFdTpermisocomlangosta)
        return item

    def update(self, instance, validated_data):
        # Campos AppFdTpermisocomlangosta
        
        
        instance.c_direccion = validated_data.get('c_direccion', instance.c_direccion)
        instance.c_puertocomercializacion = validated_data.get('c_puertocomercializacion', instance.c_puertocomercializacion)
        instance.c_apellidos = validated_data.get('c_apellidos', instance.c_apellidos)
        instance.c_fechaemision = validated_data.get('c_fechaemision', instance.c_fechaemision)
        instance.c_telefono = validated_data.get('c_telefono', instance.c_telefono)
        instance.c_nresidencia = validated_data.get('c_nresidencia', instance.c_nresidencia)
        instance.c_isla = validated_data.get('c_isla', instance.c_isla)
        instance.c_nombres = validated_data.get(' c_nombres', instance. c_nombres)
        instance.c_email = validated_data.get(' c_emai', instance. c_emai)
        instance.c_fotocomerciante = validated_data.get('c_fotocomerciante', instance.c_fotocomerciante)
        instance.c_cedula = validated_data.get('c_cedula', instance.c_cedula)
        instance.c_fechacaducidad = validated_data.get('c_fechacaducidad', instance.c_fechacaducidad)
        instance.c_celular = validated_data.get('c_celular', instance.c_celular)
        instance.c_estadotramite = validated_data.get(' c_estadotramite', instance. c_estadotramite)
        instance.c_aprobadamanejopesquero = validated_data.get('c_aprobadamanejopesquero', instance.c_aprobadamanejopesquero)
        instance.c_aprobadacuem = validated_data.get('c_aprobadacuem', instance.c_aprobadacuem)
        instance.c_estadopermiso = validated_data.get('c_estadopermiso', instance.c_estadopermiso)
        instance.c_aprobadaecosistemas = validated_data.get('c_aprobadaecosistemas', instance.c_aprobadaecosistemas)
        instance.c_compania = validated_data.get('c_compania', instance.c_compania)
        instance.c_oficioingreso = validated_data.get('c_oficioingreso', instance.c_oficioingreso)
        instance.c_fechaingresooficio = validated_data.get('c_fechaingresooficio', instance.c_fechaingresooficio)
        instance.c_temporadapesqueria = validated_data.get('c_temporadapesqueria', instance.c_temporadapesqueria)
        instance.c_permisodpg = validated_data.get('c_permisodpg', instance.c_permisodpg)
        instance.c_codigopermisocomercializacionlangosta = validated_data.get('c_codigopermisocomercializacionlangosta', instance.c_codigopermisocomercializacionlangosta)
        instance.c_motivonoaprobacion = validated_data.get('c_motivonoaprobacion', instance.c_motivonoaprobacion)
        instance.c_cooperativa = validated_data.get('c_cooperativa', instance.c_cooperativa)
        instance.c_firmadirectorecosistemas = validated_data.get('c_firmadirectorecosistemas', instance.c_firmadirectorecosistemas)
        instance.c_directorecosistemas = validated_data.get('c_directorecosistemas', instance.c_directorecosistemas)

        
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


class AppFdT_permisocomlangostaSerializer_list(CommonFieldsSerializer):
    
    class Meta:
        model = AppFdTpermisocomlangosta
        fields = ['id','c_isla','estado']
