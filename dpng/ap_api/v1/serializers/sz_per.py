# DJANGO
import uuid
from datetime import datetime,date
from django.contrib.auth.models import User
from django.conf import settings

# REST
from rest_framework import serializers

# LOCAL
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer
#from ap_api.v1.serializers.sz_gth import *
from ap_api.v1.serializers.sz_gth import Gth_CargoFuncionalSerializer_short,Gth_ModalidadLaboralSerializer_short,Gth_CargoOcupacionalSerializer_short,Gth_CargoInstitucionalSerializer_short,Gth_BaseNombramientoSerializer_short,Gth_SancionesSerializer_short,Gth_RegimenLaboralSerializer_short,Gth_AccionpersonalSerializer_short,Gth_CargoDistributivoSerializer_short
from ap_api.v1.serializers.sz_dir import Dir_DepartmentSerializer_short,Dir_DepartmentSerializer_label
from ap_api.v1.serializers.sz_geo import *
from ap_api.v1.serializers.sz_org import Org_OrganizacionSerializer,Org_OrganizacionSerializer_short
from ap_api.v1.serializers.sz_sis import Sis_CatalogoSerializer_short
from ap_base.models import PerPersona
from ap_talentohumano.models import *
from ap_dup_guias.models import PerGuia, LicGuia

# VARIABLES GLOBALES
ALERTA_RANGO_DIAS = getattr(settings, "ALERTA_RANGO_DIAS", None)

# PerPersona

class Per_PersonaSerializer(CommonFieldsSerializer):
    migrar =  serializers.BooleanField(required=False)
    class Meta:
        model = PerPersona
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, PerPersona)
        return item

    def update(self, instance, validated_data):
        # Campos PerPersona
        instance.tipo_persona        = validated_data.get('tipo_persona', instance.tipo_persona)
        instance.tipo_identificacion = validated_data.get('tipo_identificacion', instance.tipo_identificacion)
        instance.identificacion      = validated_data.get('identificacion', instance.identificacion)
        instance.nombres             = validated_data.get('nombres', instance.nombres)
        instance.apellidos           = validated_data.get('apellidos', instance.apellidos)
        instance.sexo                = validated_data.get('sexo', instance.sexo)
        instance.fecha_nacimiento    = validated_data.get('fecha_nacimiento', instance.fecha_nacimiento)
        instance.numero_hijos        = validated_data.get('numero_hijos', instance.numero_hijos)
        instance.padre_id            = validated_data.get('padre_id', instance.padre_id)
        instance.apodo               = validated_data.get('apodo', instance.apodo)
        instance.direccion           = validated_data.get('direccion', instance.direccion)
        instance.email               = validated_data.get('email', instance.email)
        instance.telefono_convencional  = validated_data.get('telefono_convencional', instance.telefono_convencional)
        instance.telefono_celular       = validated_data.get('telefono_celular', instance.telefono_celular)
        instance.redes_sociales         = validated_data.get('redes_sociales', instance.redes_sociales)
        instance.libreta_militar        = validated_data.get('libreta_militar', instance.libreta_militar)
        instance.ciudad_nacimiento_id   = validated_data.get('ciudad_nacimiento_id', instance.ciudad_nacimiento_id)
        instance.numero_residencia      = validated_data.get('numero_residencia', instance.numero_residencia)
        instance.formacion_academica    = validated_data.get('formacion_academica', instance.formacion_academica)
        instance.residentes_temporales  = validated_data.get('residentes_temporales', instance.residentes_temporales)
        instance.estado_civil           = validated_data.get('estado_civil', instance.estado_civil)
        instance.tipo_sangre            = validated_data.get('tipo_sangre', instance.tipo_sangre)
        instance.lugar_nacimiento       = validated_data.get('lugar_nacimiento', instance.lugar_nacimiento)
        instance.nivel_escolaridad      = validated_data.get('nivel_escolaridad', instance.nivel_escolaridad)
        instance.estado                 = validated_data.get('estado', instance.estado)

        instance.pais_nacimiento_id     = validated_data.get('pais_nacimiento_id', instance.pais_nacimiento_id)
        instance.foto                   = validated_data.get('foto', instance.foto)
        instance.nombre_completo        = validated_data.get('nombre_completo', instance.nombre_completo)
        instance.isla_usuario_ingreso_id = validated_data.get('isla_usuario_ingreso_id', instance.isla_usuario_ingreso_id)
        instance.pais_residencia_id      = validated_data.get('pais_residencia_id', instance.pais_residencia_id)
        instance.provincia_residencia_id = validated_data.get('provincia_residencia_id', instance.provincia_residencia_id)
        instance.ciudad_residencia_id    = validated_data.get('ciudad_residencia_id', instance.ciudad_residencia_id)
        instance.isla_residencia_id      = validated_data.get('isla_residencia_id', instance.isla_residencia_id)

        instance.codigo_postal              = validated_data.get('codigo_postal', instance.codigo_postal)
        instance.tratamiento_protocolario   = validated_data.get('tratamiento_protocolario', instance.tratamiento_protocolario)
        instance.numero_fax                 = validated_data.get('numero_fax', instance.numero_fax)
        
        instance.instruccion_academica      = validated_data.get('instruccion_academica', instance.instruccion_academica)
        instance.tmp_pais_iso2              = validated_data.get('tmp_pais_iso2', instance.tmp_pais_iso2)
        instance.prev_id                    = validated_data.get('prev_id', instance.prev_id)
        instance.grado_academico            = validated_data.get('grado_academico', instance.grado_academico)
        instance.categoria_migratoria       = validated_data.get('categoria_migratoria', instance.categoria_migratoria)
        instance.email_text                 = validated_data.get('email_text', instance.email_text)
        instance.referencia_identificacion_text = validated_data.get('referencia_identificacion_text', instance.referencia_identificacion_text)
        instance.observaciones                  = validated_data.get('observaciones', instance.observaciones)

        instance.formacion_academica_opcional   = validated_data.get('formacion_academica_opcional', instance.formacion_academica_opcional)
        instance.procesos_administrativos       = validated_data.get('procesos_administrativos', instance.procesos_administrativos)
        instance.canton_residencia_id           = validated_data.get('canton_residencia_id', instance.canton_residencia_id)
        instance.parroquia_residencia_id        = validated_data.get('parroquia_residencia_id', instance.parroquia_residencia_id)
        instance.barrio                         = validated_data.get('barrio', instance.barrio)
        instance.calle_principal                = validated_data.get('calle_principal', instance.calle_principal)
        instance.calle_secundaria               = validated_data.get('calle_secundaria', instance.calle_secundaria)
        instance.referencia                     = validated_data.get('referencia', instance.referencia)
        instance.etnias                         = validated_data.get('etnias', instance.etnias)
        instance.tipo_residencia                = validated_data.get('tipo_residencia', instance.tipo_residencia)
        instance.estado_embarazo                = validated_data.get('estado_embarazo', instance.estado_embarazo)
        #instance.num_iess                       = validated_data.get('num_iess', instance.num_iess)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


# PerPersona

class Per_PersonaSerializer_short(CommonFieldsSerializer):
    nombre_completo = serializers.SerializerMethodField()

    def get_nombre_completo(self, obj):
        nombres = apellidos = ""
        if obj.nombres:
            nombres = obj.nombres
        if obj.apellidos:
            apellidos = obj.apellidos

        return nombres + " " + apellidos
    
    class Meta:
        model = PerPersona
        fields = ['id','tipo_persona','tipo_identificacion','identificacion','nombres','apellidos','nombre_completo','grado_academico']

class Per_PersonaSerializer_list(CommonFieldsSerializer):
    nombre_completo = serializers.SerializerMethodField()
    
    def get_nombre_completo(self, obj):
        nombres = apellidos = ""
        if obj.nombres:
            nombres = obj.nombres
        if obj.apellidos:
            apellidos = obj.apellidos

        return nombres + " " + apellidos

    class Meta:
        model = PerPersona
        fields = '__all__'

class Per_PersonaSerializer_label(CommonFieldsSerializer):
    nombre_completo = serializers.SerializerMethodField()

    def get_nombre_completo(self, obj):
        nombres = apellidos = ""
        if obj.nombres:
            nombres = obj.nombres
        if obj.apellidos:
            apellidos = obj.apellidos

        return nombres + " " + apellidos

    class Meta:
        model = PerPersona
        fields = ['id','identificacion','nombre_completo','nombres','apellidos','grado_academico','telefono_celular','estado']


class Per_PersonaSerializer_label2(CommonFieldsSerializer):
    
    class Meta:
        model = PerPersona
        fields = ['id','tipo_identificacion','tipo_persona','identificacion','nombres','apellidos']



# PerPersonaCuenta
class Per_PersonaCuentaSerializer(CommonFieldsSerializer):

    class Meta:
        model = PerPersonaCuenta
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, PerPersonaCuenta)
        return item

    def update(self, instance, validated_data):
        # Campos PerPersonaCuenta

        print("-------->>>>>>>UPPPPPDATEEE")

        print(instance)
        print(validated_data)

        instance.numero_cuenta = validated_data.get('numero_cuenta', instance.numero_cuenta)
        instance.tipo_cuenta   = validated_data.get('tipo_cuenta', instance.tipo_cuenta)
        instance.persona_id    = validated_data.get('persona_id', instance.persona_id)
        instance.banco_id      = validated_data.get('banco_id', instance.banco_id)
        instance.estado        = validated_data.get('estado', instance.estado)
        
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Per_PersonaCuentaSerializer_list(CommonFieldsSerializer):
    persona_id = Per_PersonaSerializer_short()
    banco_id   = Org_OrganizacionSerializer_short()
    class Meta:
        model = PerPersonaCuenta
        fields = '__all__'

class Per_FuncionarioCarnetSerializer_short(CommonFieldsSerializer):

    class Meta:
        model  = PerFuncionarioCarnet
        fields = ['id','foto']

# PerFuncionario
class Per_FuncionarioSerializer(CommonFieldsSerializer):

    class Meta:
        model = PerFuncionario
        fields = "__all__"
        #depth = 7

    def create(self, validated_data):
        #CREACION

        item = CommonFieldsSerializer.create(self, validated_data, PerFuncionario)
        return item

    def update(self, instance, validated_data):
        print(validated_data)
        # Campos PerPersona
        instance.parroquia_trabaja_id     = validated_data.get('parroquia_trabaja_id', instance.parroquia_trabaja_id)
        instance.modalidad_laboral_id     = validated_data.get('modalidad_laboral_id', instance.modalidad_laboral_id)
        instance.clasificacion_proceso_id = validated_data.get('clasificacion_proceso_id', instance.clasificacion_proceso_id)
        instance.cargo_funcional_id       = validated_data.get('cargo_funcional_id', instance.cargo_funcional_id)
        instance.clasificacion_proceso    = validated_data.get('clasificacion_proceso', instance.clasificacion_proceso)
        instance.anio_nombramiento        = validated_data.get('anio_nombramiento', instance.anio_nombramiento)
        instance.direccion_estatuto       = validated_data.get('direccion_estatuto', instance.direccion_estatuto)
        instance.proceso_estatuto         = validated_data.get('proceso_estatuto', instance.proceso_estatuto)
        instance.subproceso_estatuto      = validated_data.get('subproceso_estatuto', instance.subproceso_estatuto)
        instance.modalidad_laboral        = validated_data.get('modalidad_laboral', instance.modalidad_laboral)
        instance.tipo_actividad           = validated_data.get('tipo_actividad', instance.tipo_actividad)

        instance.puesto_institucional_id    = validated_data.get('puesto_institucional_id', instance.puesto_institucional_id)
        instance.rmu                 = validated_data.get('rmu', instance.rmu)
        instance.grado               = validated_data.get('grado', instance.grado)
        instance.escala              = validated_data.get('escala', instance.escala)
        instance.regimen_laboral     = validated_data.get('regimen_laboral', instance.regimen_laboral)
        instance.base_nombramiento_id= validated_data.get('base_nombramiento_id', instance.base_nombramiento_id)
        instance.cargo_funcionario   = validated_data.get('cargo_funcionario', instance.cargo_funcionario)
        instance.cargo_institucional = validated_data.get('cargo_institucional', instance.cargo_institucional)
        instance.cargo_distributivo  = validated_data.get('cargo_distributivo', instance.cargo_distributivo)
        instance.cargo_ocupacional_id= validated_data.get('cargo_ocupacional_id', instance.cargo_ocupacional_id)

        instance.isla_trabaja_id        = validated_data.get('isla_trabaja_id', instance.isla_trabaja_id)
        instance.proceso_estatuto_id    = validated_data.get('proceso_estatuto_id', instance.proceso_estatuto_id)
        instance.direccion_estatuto_id  = validated_data.get('direccion_estatuto_id', instance.direccion_estatuto_id)
        instance.subproceso_estatuto_id = validated_data.get('subproceso_estatuto_id', instance.subproceso_estatuto_id)
        instance.cargo_distributivo_id  = validated_data.get('cargo_distributivo_id', instance.cargo_distributivo_id)

        instance.cargo_institucional_id    = validated_data.get('cargo_institucional_id', instance.cargo_institucional_id)
        instance.firma                     = validated_data.get('firma', instance.firma)
        instance.num_iess                  = validated_data.get('num_iess', instance.num_iess)
        instance.tipo_discapacidad         = validated_data.get('tipo_discapacidad', instance.tipo_discapacidad)
        instance.num_carnet_discapacidad   = validated_data.get('num_carnet_discapacidad', instance.num_carnet_discapacidad)
        instance.grado_discapacidad        = validated_data.get('grado_discapacidad', instance.grado_discapacidad)
        instance.tipo_enfemedad            = validated_data.get('tipo_enfemedad', instance.tipo_enfemedad)
        instance.descripcion_enfermedad_id = validated_data.get('descripcion_enfermedad_id', instance.descripcion_enfermedad_id)
        instance.fecha_ingreso_png         = validated_data.get('fecha_ingreso_png', instance.fecha_ingreso_png) 
        instance.partida_individual        = validated_data.get('partida_individual', instance.partida_individual)
        instance.rol_profesional           = validated_data.get('rol_profesional', instance.rol_profesional)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Per_FuncionarioFamiliaresSerializer_list(CommonFieldsSerializer):
    familiar_id = Per_PersonaSerializer()
    parentesco  = Sis_CatalogoSerializer_short()

    class Meta:
        model  = PerFuncionarioFamiliares
        fields = '__all__'


class Per_FuncionarioSerializer_list(CommonFieldsSerializer):
    persona_id             = Per_PersonaSerializer_list()
    cargo_funcional_id     = Gth_CargoFuncionalSerializer_short()
    modalidad_laboral_id   = Gth_ModalidadLaboralSerializer_short()
    direccion_estatuto_id  = Dir_DepartmentSerializer_short()
    proceso_estatuto_id    = Dir_DepartmentSerializer_short()
    subproceso_estatuto_id = Dir_DepartmentSerializer_short()
    provincia_id           = Geo_ProvinciaSerializer_short()
    isla_trabaja_id        = Geo_IslaSerializer_short()
    cargo_institucional_id = Gth_CargoInstitucionalSerializer_short()
    cargo_ocupacional_id   = Gth_CargoOcupacionalSerializer_short()
    cargo_distributivo_id  = Gth_CargoDistributivoSerializer_short()
    parroquia_trabaja_id   = Geo_ParroquiaSerializer_short()
    base_nombramiento_id   = Gth_BaseNombramientoSerializer_short()
    perfuncionariofamiliar_id = Per_FuncionarioFamiliaresSerializer_list(many=True,read_only=True)
    func_carnet_id   = Per_FuncionarioCarnetSerializer_short(many=True,read_only=True);


    class Meta:
        model = PerFuncionario
        fields = '__all__'


class Per_PersonaFunSerializer_list(CommonFieldsSerializer):
    perfuncionario = Per_FuncionarioSerializer(many=True, read_only=True)

    class Meta:
        model = PerPersona
        fields = '__all__'


class Per_FuncionarioSerializer_Direccion(CommonFieldsSerializer):
    persona_id             = Per_PersonaSerializer_label()
    direccion_estatuto_id  = Dir_DepartmentSerializer_label()
    isla_trabaja_id        = Geo_IslaSerializer_label()

    class Meta:
        model = PerFuncionario
        fields = ['id','persona_id','direccion_estatuto_id','isla_trabaja_id']


class Per_FuncionarioSerializer_selectbox(CommonFieldsSerializer):
    persona_id             = Per_PersonaSerializer_label()
    cargo_institucional_id = Gth_CargoInstitucionalSerializer_short()
    direccion_estatuto_id  = Dir_DepartmentSerializer_label()
    proceso_estatuto_id    = Dir_DepartmentSerializer_label()
    subproceso_estatuto_id = Dir_DepartmentSerializer_label()
    provincia_id           = Geo_ProvinciaSerializer_label()
    isla_trabaja_id        = Geo_IslaSerializer_label()


    class Meta:
        model = PerFuncionario
        fields = ['id','persona_id','cargo_institucional_id','direccion_estatuto_id','proceso_estatuto_id','subproceso_estatuto_id','provincia_id','isla_trabaja_id']


class Per_FuncionarioSerializer_selectbox2(CommonFieldsSerializer):
    persona_id             = Per_PersonaSerializer_label()
    isla_trabaja_id        = Geo_IslaSerializer_label()

    class Meta:
        model = PerFuncionario
        fields = ['id','persona_id','cargo_institucional_id','direccion_estatuto_id','proceso_estatuto_id','subproceso_estatuto_id','provincia_id','isla_trabaja_id']



class Per_FuncionarioSerializer_short(CommonFieldsSerializer):
    persona_id             = Per_PersonaSerializer_label()
    cargo_institucional_id = Gth_CargoInstitucionalSerializer_short()
    isla_trabaja_id        = Geo_IslaSerializer_label()

    class Meta:
        model = PerFuncionario
        fields = ['id','persona_id','cargo_institucional_id','isla_trabaja_id','email',]



class Per_PersonaFuncionarioSerializer(CommonFieldsSerializer):
    migrar =  serializers.BooleanField(required=False)
    perfuncionario = Per_FuncionarioSerializer(many=True)

    class Meta:
        model = PerPersona
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        funcionarios_data = validated_data.pop('perfuncionario')
        persona = CommonFieldsSerializer.create(self, validated_data, PerPersona)
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for funcionario in funcionarios_data:
            #CAMPOS INFORMACION DEL USUARIO
            funcionario['id'] = uuid.uuid4()
            funcionario['usuario_ingreso'] = self.context['request'].user.username
            funcionario['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            PerFuncionario.objects.create(persona_id=persona, **funcionario)
        return persona

    def update(self, instance, validated_data):
        print("--------------->>>>>>")
        print(validated_data)
        print("--------------->>>>>>IIIIIIIIIIIIIIII")
        print(instance)
        # Campos PerPersona
        
        instance.tipo_persona        = validated_data.get('tipo_persona', instance.tipo_persona)
        instance.tipo_identificacion = validated_data.get('tipo_identificacion', instance.tipo_identificacion)
        instance.identificacion      = validated_data.get('identificacion', instance.identificacion)
        instance.nombres             = validated_data.get('nombres', instance.nombres)
        instance.apellidos           = validated_data.get('apellidos', instance.apellidos)
        instance.sexo                = validated_data.get('sexo', instance.sexo)
        instance.fecha_nacimiento    = validated_data.get('fecha_nacimiento', instance.fecha_nacimiento)
        instance.numero_hijos        = validated_data.get('numero_hijos', instance.numero_hijos)
        instance.padre_id            = validated_data.get('padre_id', instance.padre_id)
        instance.apodo               = validated_data.get('apodo', instance.apodo)
        instance.direccion           = validated_data.get('direccion', instance.direccion)
        instance.email               = validated_data.get('email', instance.email)
        instance.telefono_convencional  = validated_data.get('telefono_convencional', instance.telefono_convencional)
        instance.telefono_celular       = validated_data.get('telefono_celular', instance.telefono_celular)
        instance.redes_sociales         = validated_data.get('redes_sociales', instance.redes_sociales)
        instance.libreta_militar        = validated_data.get('libreta_militar', instance.libreta_militar)
        instance.ciudad_nacimiento_id   = validated_data.get('ciudad_nacimiento_id', instance.ciudad_nacimiento_id)
        instance.numero_residencia      = validated_data.get('numero_residencia', instance.numero_residencia)
        instance.formacion_academica    = validated_data.get('formacion_academica', instance.formacion_academica)
        instance.residentes_temporales  = validated_data.get('residentes_temporales', instance.residentes_temporales)
        instance.estado_civil           = validated_data.get('estado_civil', instance.estado_civil)
        instance.tipo_sangre            = validated_data.get('tipo_sangre', instance.tipo_sangre)
        instance.lugar_nacimiento       = validated_data.get('lugar_nacimiento', instance.lugar_nacimiento)
        instance.nivel_escolaridad      = validated_data.get('nivel_escolaridad', instance.nivel_escolaridad)
        instance.estado                 = validated_data.get('estado', instance.estado)

        instance.pais_nacimiento_id     = validated_data.get('pais_nacimiento_id', instance.pais_nacimiento_id)
        instance.foto                   = validated_data.get('foto', instance.foto)
        instance.nombre_completo        = validated_data.get('nombre_completo', instance.nombre_completo)
        instance.isla_usuario_ingreso_id = validated_data.get('isla_usuario_ingreso_id', instance.isla_usuario_ingreso_id)
        instance.pais_residencia_id      = validated_data.get('pais_residencia_id', instance.pais_residencia_id)
        instance.provincia_residencia_id = validated_data.get('provincia_residencia_id', instance.provincia_residencia_id)
        instance.ciudad_residencia_id    = validated_data.get('ciudad_residencia_id', instance.ciudad_residencia_id)
        instance.isla_residencia_id      = validated_data.get('isla_residencia_id', instance.isla_residencia_id)

        instance.codigo_postal              = validated_data.get('codigo_postal', instance.codigo_postal)
        instance.tratamiento_protocolario   = validated_data.get('tratamiento_protocolario', instance.tratamiento_protocolario)
        instance.numero_fax                 = validated_data.get('numero_fax', instance.numero_fax)
        
        instance.instruccion_academica      = validated_data.get('instruccion_academica', instance.instruccion_academica)
        instance.tmp_pais_iso2              = validated_data.get('tmp_pais_iso2', instance.tmp_pais_iso2)
        instance.prev_id                    = validated_data.get('prev_id', instance.prev_id)
        instance.grado_academico            = validated_data.get('grado_academico', instance.grado_academico)
        instance.categoria_migratoria       = validated_data.get('categoria_migratoria', instance.categoria_migratoria)
        instance.email_text                 = validated_data.get('email_text', instance.email_text)
        instance.referencia_identificacion_text = validated_data.get('referencia_identificacion_text', instance.referencia_identificacion_text)
        instance.observaciones                  = validated_data.get('observaciones', instance.observaciones)

        instance.formacion_academica_opcional   = validated_data.get('formacion_academica_opcional', instance.formacion_academica_opcional)
        instance.procesos_administrativos       = validated_data.get('procesos_administrativos', instance.procesos_administrativos)
        instance.canton_residencia_id           = validated_data.get('canton_residencia_id', instance.canton_residencia_id)
        instance.parroquia_residencia_id        = validated_data.get('parroquia_residencia_id', instance.parroquia_residencia_id)
        instance.barrio                         = validated_data.get('barrio', instance.barrio)
        instance.calle_principal                = validated_data.get('calle_principal', instance.calle_principal)
        instance.calle_secundaria               = validated_data.get('calle_secundaria', instance.calle_secundaria)
        instance.referencia                     = validated_data.get('referencia', instance.referencia)
        instance.etnias                         = validated_data.get('etnias', instance.etnias)
        instance.tipo_residencia                = validated_data.get('tipo_residencia', instance.tipo_residencia)
        instance.estado_embarazo                = validated_data.get('estado_embarazo', instance.estado_embarazo)
        #instance.num_iess                       = validated_data.get('num_iess', instance.num_iess)
        
        print("--------------->>>>>>2222")

        # Actualización
        #item = CommonFieldsSerializer.update(self, instance, validated_data)
        #item.save()
        #return item

        funcionarios_data = validated_data.pop('perfuncionario')
        persona = CommonFieldsSerializer.update(self, instance,validated_data)
        
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for funcionario in funcionarios_data:
            #CAMPOS INFORMACION DEL USUARIO

            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            PerFuncionario.objects.filter(persona_id=persona.id).update(persona_id=persona, **funcionario)
        
        
        return persona



# PerIngresosAcciones
class Per_IngresosAccionesSerializer(CommonFieldsSerializer):
    class Meta:
        model = PerIngresosAcciones
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, PerIngresosAcciones)
        return item

    def update(self, instance, validated_data):
        # Campos PerIngresosAcciones
          
        instance.accionpersonal_id = validated_data.get('accionpersonal_id', instance.accionpersonal_id)
        instance.base_legal        = validated_data.get('base_legal', instance.base_legal)
        instance.num_partidagen    = validated_data.get('num_partidagen', instance.num_partidagen)
        instance.num_partidaInd    = validated_data.get('num_partidaInd', instance.num_partidaInd)
        instance.grado             = validated_data.get('grado', instance.grado)
        instance.escala            = validated_data.get('escala', instance.escala)
        instance.rmu               = validated_data.get('rmu', instance.rmu)
        instance.isla_id           = validated_data.get('isla_id', instance.isla_id)
        instance.fecha_desde       = validated_data.get('fecha_desde', instance.fecha_desde)
        instance.tipo_gasto_id     = validated_data.get('tipo_gasto_id', instance.tipo_gasto_id)
        instance.cargo_funcional_id= validated_data.get('cargo_funcional_id', instance.cargo_funcional_id)
        instance.tipo_actividad    = validated_data.get('tipo_actividad', instance.tipo_actividad)
        instance.fecha_hasta       = validated_data.get('fecha_hasta', instance.fecha_hasta)
        instance.razon_salida      = validated_data.get('razon_salida', instance.razon_salida)
        instance.observaciones     = validated_data.get('observaciones', instance.observaciones)
        instance.nombre_proyecto   = validated_data.get('nombre_proyecto', instance.nombre_proyecto)
        instance.parroquia_id      = validated_data.get('parroquia_id', instance.parroquia_id)
        instance.clasificacion_proceso_id = validated_data.get('clasificacion_proceso_id', instance.clasificacion_proceso_id)
        instance.modalidad_laboral_id     = validated_data.get('modalidad_laboral_id', instance.modalidad_laboral_id)
        instance.estado_ejecucion     = validated_data.get('estado_ejecucion', instance.estado_ejecucion)
        
    
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Per_IngresosAccionesSerializer_short(CommonFieldsSerializer):

    class Meta:
        model  = PerIngresosAcciones
        fields = ['id','accionpersonal_id']

class Per_IngresosAccionesSerializer_list(CommonFieldsSerializer):
    #accionpersonal_id = Per_FuncionarioAccionpersonalSerializer_list();
    fecha_ingreso = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    funcionario_id = Per_FuncionarioSerializer_short()
    
    class Meta:
        model  = PerIngresosAcciones
        fields = '__all__'

# PerTraspasoAcciones
class Per_TraspasoAccionesSerializer(CommonFieldsSerializer):
    class Meta:
        model  = PerTraspasoAcciones
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, PerTraspasoAcciones)
        return item

    def update(self, instance, validated_data):
        # Campos PerIngresosAcciones

        instance.accionpersonal_id = validated_data.get('accionpersonal_id', instance.accionpersonal_id)
        instance.id_rol            = validated_data.get('id_rol', instance.id_rol)
        instance.id_cargo          = validated_data.get('id_cargo', instance.id_cargo)
        instance.num_memo          = validated_data.get('num_memo', instance.num_memo)
        instance.archivo_memo      = validated_data.get('archivo_memo', instance.archivo_memo)
        instance.fecha_desde       = validated_data.get('fecha_desde', instance.fecha_desde)
        instance.estado_ejecucion  = validated_data.get('estado_ejecucion', instance.estado_ejecucion)
        instance.observaciones     = validated_data.get('observaciones', instance.observaciones)
        instance.archivo_accionpersonal  = validated_data.get('archivo_accionpersonal', instance.archivo_accionpersonal)
        
    
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Per_TraspasoAccionesSerializer_short(CommonFieldsSerializer):

    class Meta:
        model  = PerTraspasoAcciones
        fields = ['id','accionpersonal_id']

class Per_TraspasoAccionesSerializer_list(CommonFieldsSerializer):
    #accionpersonal_id = Per_FuncionarioAccionpersonalSerializer_list();
    
    class Meta:
        model  = PerTraspasoAcciones
        fields = '__all__'



# PerLicenciaAcciones
class Per_LicenciaAccionesSerializer(CommonFieldsSerializer):
    
    class Meta:
        model  = PerLicenciaAcciones
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, PerLicenciaAcciones)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoInstitucional
        #"enfermedad_tipo":enfermedad_tipo,"accidente_id":accidente_id,"accidente_tipo":accidente_tipo
        instance.accpersonal_id      = validated_data.get('accpersonal_id', instance.accpersonal_id)
        instance.num_informe_tec     = validated_data.get('num_informe_tec', instance.num_informe_tec)
        instance.num_memo            = validated_data.get('num_memo', instance.num_memo)
        instance.con_remuneracion    = validated_data.get('con_remuneracion', instance.con_remuneracion)
        instance.motivo_lic          = validated_data.get('motivo_lic', instance.motivo_lic)
        instance.archivo_accpersonal = validated_data.get('archivo_accpersonal', instance.archivo_accpersonal)
        instance.archivo_memo        = validated_data.get('archivo_memo', instance.archivo_memo)
        instance.enfermedad_id       = validated_data.get('enfermedad_id', instance.enfermedad_id)
        instance.enfermedad_tipo_id  = validated_data.get('enfermedad_tipo_id', instance.enfermedad_tipo_id)
        instance.accidente_id        = validated_data.get('accidente_id', instance.accidente_id)
        instance.accidente_tipo_id   = validated_data.get('accidente_tipo_id', instance.accidente_tipo_id)
        instance.enfermedad          = validated_data.get('enfermedad', instance.enfermedad)
        instance.accidente           = validated_data.get('accidente', instance.accidente)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Per_LicenciaAccionesSerializer_short(CommonFieldsSerializer):

    class Meta:
        model  = PerLicenciaAcciones
        fields = ['id','accpersonal_id']

class Per_LicenciaAccionesSerializer_list(CommonFieldsSerializer):
    #accpersonal_id = Per_FuncionarioAccionpersonalSerializer_list();
    class Meta:
        model  = PerLicenciaAcciones
        fields = '__all__'

# PerFuncionarioPermisos
class Per_FuncionarioPermisosSerializer(CommonFieldsSerializer):
    class Meta:
        model  = PerFuncionarioPermisos
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, PerFuncionarioPermisos)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoInstitucional
        instance.funcionario_id = validated_data.get('funcionario_id', instance.funcionario_id)
        instance.motivo_id      = validated_data.get('motivo_id', instance.motivo_id)
        instance.fecha_desde    = validated_data.get('fecha_desde', instance.fecha_desde)
        instance.fecha_hasta    = validated_data.get('fecha_hasta', instance.fecha_hasta)
        instance.observaciones  = validated_data.get('observaciones', instance.observaciones)
        instance.revisor_id     = validated_data.get('revisor_id', instance.revisor_id)
        instance.aprobador_id     = validated_data.get('aprobador_id', instance.aprobador_id)
        instance.estado_tramite = validated_data.get('estado_tramite', instance.estado_tramite)
        instance.observaciones_revisor = validated_data.get('observaciones_revisor', instance.observaciones_revisor)
        instance.observaciones_aprobador = validated_data.get('observaciones_aprobador', instance.observaciones_aprobador)
        instance.observaciones_aprobador = validated_data.get('observaciones_aprobador', instance.observaciones_aprobador)
        instance.estado_revisor = validated_data.get('estado_revisor', instance.estado_revisor)
        instance.estado_aprobador = validated_data.get('estado_aprobador', instance.estado_aprobador)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Per_FuncionarioPermisosSerializer_list(CommonFieldsSerializer):
    funcionario_id = Per_FuncionarioSerializer_short()
    motivo_id = Sis_CatalogoSerializer_short()
    revisor_id = Per_FuncionarioSerializer_short()
    aprobador_id = Per_FuncionarioSerializer_short()
    fecha_desde = serializers.DateTimeField(format="%Y-%m-%d %H:%M",required=False)
    fecha_hasta = serializers.DateTimeField(format="%Y-%m-%d %H:%M",required=False)
    fecha_ingreso = serializers.DateTimeField(format="%Y-%m-%d %H:%M",required=False)
    fecha_ultima_modificacion = serializers.DateTimeField(format="%Y-%m-%d %H:%M",required=False)

    class Meta:
        model  = PerFuncionarioPermisos
        fields = '__all__'

# PerFuncionarioPermisos
class Per_FuncionarioControlesRrhhSerializer(CommonFieldsSerializer):
    class Meta:
        model  = PerFuncionarioControlesRrhh
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, PerFuncionarioControlesRrhh)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoInstitucional
        instance.funcionario_id = validated_data.get('funcionario_id', instance.funcionario_id)
        instance.tipo      = validated_data.get('tipo', instance.tipo)
        instance.fecha    = validated_data.get('fecha', instance.fecha)
        instance.observaciones  = validated_data.get('observaciones', instance.observaciones)
        instance.estado_notificacion  = validated_data.get('estado_notificacion', instance.estado_notificacion)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Per_FuncionarioControlesRrhhSerializer_list(CommonFieldsSerializer):
    funcionario_id = Per_FuncionarioSerializer_short()
    class Meta:
        model  = VwPerFuncionarioControlesRrhh
        fields = '__all__'


# Peraccidentes
class Per_AccidentesSerializer(CommonFieldsSerializer):

    class Meta:
        model  = PerAccidentes
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, PerAccidentes)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoInstitucional
        instance.descripcion   = validated_data.get('descripcion', instance.descripcion)
        instance.estado        = validated_data.get('estado', instance.estado)
        instance.categoria_id  = validated_data.get('categoria_id', instance.categoria_id)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Per_AccidentesSerializer_short(CommonFieldsSerializer):

    class Meta:
        model  = PerAccidentes
        fields = ['id','descripcion','tipo','categoria']

class Per_AccidentesSerializer_list(CommonFieldsSerializer):
    categoria_id = Sis_CatalogoSerializer_short()
    class Meta:
        model  = PerAccidentes
        fields = '__all__'

# PerDiscapacidades
class Per_DiscapacidadesSerializer(CommonFieldsSerializer):

    class Meta:
        model  = PerDiscapacidades
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, PerDiscapacidades)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoInstitucional
        instance.descripcion   = validated_data.get('descripcion', instance.descripcion)
        instance.estado        = validated_data.get('estado', instance.estado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Per_DiscapacidadesSerializer_short(CommonFieldsSerializer):

    class Meta:
        model  = PerDiscapacidades
        fields = ['id','descripcion']

class Per_DiscapacidadesSerializer_list(CommonFieldsSerializer):

    class Meta:
        model  = PerDiscapacidades
        fields = '__all__'

# Perenfermedades
class Per_EnfermedadesSerializer(CommonFieldsSerializer):

    class Meta:
        model  = PerEnfermedades
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, PerEnfermedades)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoInstitucional
        instance.descripcion   = validated_data.get('descripcion', instance.descripcion)
        instance.estado        = validated_data.get('estado', instance.estado)
        instance.categoria_id  = validated_data.get('categoria_id', instance.categoria_id)
        instance.tipo_id       = validated_data.get('tipo_id', instance.tipo_id)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Per_EnfermedadesSerializer_short(CommonFieldsSerializer):

    class Meta:
        model  = PerEnfermedades
        fields = ['id','descripcion','tipo_id','categoria_id']

class Per_EnfermedadesSerializer_list(CommonFieldsSerializer):
    categoria_id = Sis_CatalogoSerializer_short()
    tipo_id      = Sis_CatalogoSerializer_short()
    class Meta:
        model  = PerEnfermedades
        fields = '__all__'

# Peretnias
class Per_EtniasSerializer(CommonFieldsSerializer):

    class Meta:
        model  = PerEtnias
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, PerEtnias)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoInstitucional
        instance.descripcion   = validated_data.get('descripcion', instance.descripcion)
        instance.estado        = validated_data.get('estado', instance.estado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Per_EtniasSerializer_short(CommonFieldsSerializer):

    class Meta:
        model  = PerEtnias
        fields = ['id','descripcion']

class Per_EtniasSerializer_list(CommonFieldsSerializer):
    class Meta:
        model  = PerEtnias
        fields = '__all__'

# Perfuncionariosanciones
class Per_FuncionarioSancionesSerializer(CommonFieldsSerializer):

    class Meta:
        model  = PerFuncionarioSanciones
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, PerFuncionarioSanciones)
        return item

    def update(self, instance, validated_data):
        # Campos 
        instance.funcionario_id     = validated_data.get('funcionario_id', instance.funcionario_id)
        instance.tipo_falta_id      = validated_data.get('tipo_falta_id', instance.tipo_falta_id)
        instance.sancion_id         = validated_data.get('sancion_id', instance.sancion_id)
        instance.regimen_laboral_id = validated_data.get('regimen_laboral_id', instance.regimen_laboral_id)
        instance.anio_sancion       = validated_data.get('anio_sancion', instance.anio_sancion)
        instance.mes_sancion        = validated_data.get('mes_sancion', instance.mes_sancion)
        instance.num_memo           = validated_data.get('num_memo', instance.num_memo)
        instance.file_memo          = validated_data.get('file_memo', instance.file_memo)
        instance.aplica_sumario_adm = validated_data.get('aplica_sumario_adm', instance.aplica_sumario_adm)
        instance.estado             = validated_data.get('estado', instance.estado)
        instance.observaciones      = validated_data.get('observaciones', instance.observaciones)
        instance.estado_sumario_adm = validated_data.get('estado_sumario_adm', instance.estado_sumario_adm)
        instance.fecha_sancion      = validated_data.get('fecha_sancion', instance.fecha_sancion)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Per_FuncionarioSancionesSerializer_list(CommonFieldsSerializer):
    fecha_ingreso      = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    tipo_falta_id      = Sis_CatalogoSerializer_short()
    funcionario_id     = Per_FuncionarioSerializer_list()
    sancion_id         = Gth_SancionesSerializer_short()
    regimen_laboral_id = Gth_RegimenLaboralSerializer_short()
    class Meta:
        model  = PerFuncionarioSanciones
        fields = '__all__'

# PerFuncionarioFamiliares
class Per_FuncionarioFamiliaresSerializer(CommonFieldsSerializer):

    class Meta:
        model  = PerFuncionarioFamiliares
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, PerFuncionarioFamiliares)
        return item

    def update(self, instance, validated_data):
        # Campos 
        instance.es_carga_familiar     = validated_data.get('es_carga_familiar', instance.es_carga_familiar)
        instance.es_discapacitado      = validated_data.get('es_discapacitado', instance.es_discapacitado)
        instance.es_sustituto          = validated_data.get('es_sustituto', instance.es_sustituto)
        instance.grado                 = validated_data.get('grado', instance.grado)
        instance.numero_carnet         = validated_data.get('numero_carnet', instance.numero_carnet)
        instance.familiar_id           = validated_data.get('familiar_id', instance.familiar_id)
        instance.funcionario_id        = validated_data.get('funcionario_id', instance.funcionario_id)
        instance.tipo_discapacidad     = validated_data.get('tipo_discapacidad', instance.tipo_discapacidad)
        instance.parentesco            = validated_data.get('parentesco', instance.parentesco)
        instance.estado                = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item



# PerFuncionarioAccionpersonal
class Per_FuncionarioAccionpersonalSerializer(CommonFieldsSerializer):
    #fecha_rige_accpersonal = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    fecha_rige_accpersonal  = serializers.DateField(format="%Y-%m-%d",required=False)
    fecha_hasta_accpersonal = serializers.DateField(format="%Y-%m-%d",required=False)
    diasrestantes           = serializers.SerializerMethodField()
    alertaDiasrestantes     = serializers.SerializerMethodField()

    class Meta:
        model = PerFuncionarioAccionpersonal
        fields = '__all__'

    def get_diasrestantes(self, obj):
        if obj.fecha_hasta_accpersonal is None:
            return 100;
        else:
            ts = obj.fecha_hasta_accpersonal - date.today()
        return ts.days + 1

    def get_alertaDiasrestantes(self, obj):
        if obj.fecha_hasta_accpersonal is None:
            return 'N';
        else:
            ts   = obj.fecha_hasta_accpersonal - date.today()
        dias = ts.days + 1

        if dias > ALERTA_RANGO_DIAS:
            return 'V'
        elif dias <= ALERTA_RANGO_DIAS and dias > 0:
            return 'A'
        elif dias <= 0:
            return 'R'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, PerFuncionarioAccionpersonal)
        return item

    def update(self, instance, validated_data):
        # Campos PerFuncionarioAccionpersonal
        instance.id                  = validated_data.get('id', instance.id)
        instance.funcionario_id      = validated_data.get('funcionario_id', instance.funcionario_id)
        instance.num_accion_personal = validated_data.get('num_accion_personal', instance.num_accion_personal)
        instance.fecha_accionpersonal   = validated_data.get('fecha_accionpersonal', instance.fecha_accionpersonal)
        instance.fecha_rige_accpersonal = validated_data.get('fecha_rige_accpersonal', instance.fecha_rige_accpersonal)
        instance.tipo_documento_id      = validated_data.get('tipo_documento_id', instance.tipo_documento_id)
        instance.num_documento          = validated_data.get('num_documento', instance.num_documento)
        instance.fecha_documento        = validated_data.get('fecha_documento', instance.fecha_documento)
        instance.descripcion_motivo     = validated_data.get('descripcion_motivo', instance.descripcion_motivo)
        instance.anexo_motivo           = validated_data.get('anexo_motivo', instance.anexo_motivo)

        instance.accionpersonal_id        = validated_data.get('accionpersonal_id', instance.accionpersonal_id)
        instance.accionpersonal_otros     = validated_data.get('accionpersonal_otros', instance.accionpersonal_otros)
        instance.actual_dir_estatuto_id   = validated_data.get('actual_dir_estatuto_id', instance.actual_dir_estatuto_id)
        instance.actual_proc_estatuto_id  = validated_data.get('actual_proc_estatuto_id', instance.actual_proc_estatuto_id)
        instance.actual_subprc_estatuto_id       = validated_data.get('actual_subprc_estatuto_id', instance.actual_subprc_estatuto_id)
        instance.actual_cargo_institucional_id   = validated_data.get('actual_cargo_institucional_id', instance.actual_cargo_institucional_id)
        #instance.actual_cargo_distributivo_id = validated_data.get('actual_cargo_distributivo_id', instance.actual_cargo_distributivo_id)
        instance.actual_puesto_id   = validated_data.get('actual_puesto_id', instance.actual_puesto_id)
        instance.actual_cargo_ocupacional_id     = validated_data.get('actual_cargo_ocupacional_id', instance.actual_cargo_ocupacional_id)
        instance.actual_isla_trabaja_id          = validated_data.get('actual_isla_trabaja_id', instance.actual_isla_trabaja_id)
        instance.actual_rmu                     = validated_data.get('actual_rmu', instance.actual_rmu)
        instance.actual_nro_presupuestaria      = validated_data.get('actual_nro_presupuestaria', instance.actual_nro_presupuestaria)
        
        instance.nuevo_dir_estatuto_id          = validated_data.get('nuevo_dir_estatuto_id', instance.nuevo_dir_estatuto_id)
        instance.nuevo_proc_estatuto_id         = validated_data.get('nuevo_proc_estatuto_id', instance.nuevo_proc_estatuto_id)

        instance.nuevo_subprc_estatuto_id       = validated_data.get('nuevo_subprc_estatuto_id', instance.nuevo_subprc_estatuto_id)
        #instance.nuevo_cargo_institucional_id   = validated_data.get('nuevo_cargo_institucional_id', instance.nuevo_cargo_institucional_id)
        instance.nuevo_cargo_distributivo_id    = validated_data.get('nuevo_cargo_distributivo_id', instance.nuevo_cargo_distributivo_id)
        instance.nuevo_puesto_id                = validated_data.get('nuevo_puesto_id', instance.nuevo_puesto_id)
        instance.nuevo_cargo_ocupacional_id     = validated_data.get('nuevo_cargo_ocupacional_id', instance.nuevo_cargo_ocupacional_id)
        instance.nuevo_isla_trabaja_id          = validated_data.get('nuevo_isla_trabaja_id', instance.nuevo_isla_trabaja_id)
        instance.nuevo_rmu                      = validated_data.get('nuevo_rmu', instance.nuevo_rmu)
        instance.nuevo_nro_presupuestaria       = validated_data.get('nuevo_nro_presupuestaria', instance.nuevo_nro_presupuestaria)
        instance.no_acta_final                  = validated_data.get('no_acta_final', instance.no_acta_final)
        instance.fecha_actafinal                = validated_data.get('fecha_actafinal', instance.fecha_actafinal)
        instance.resp_rrhh_id                   = validated_data.get('resp_rrhh_id', instance.resp_rrhh_id)
        instance.autoridad_nominadora_id        = validated_data.get('autoridad_nominadora_id', instance.autoridad_nominadora_id)

        instance.no_rrhh                  = validated_data.get('no_rrhh', instance.no_rrhh)
        instance.fecha_rrhh               = validated_data.get('fecha_rrhh', instance.fecha_rrhh)
        instance.resp_registrocontrol_id  = validated_data.get('resp_registrocontrol_id', instance.resp_registrocontrol_id)
        instance.usuario_ingreso          = validated_data.get('usuario_ingreso', instance.usuario_ingreso)
        instance.fecha_ingreso            = validated_data.get('fecha_ingreso', instance.fecha_ingreso)
        instance.fecha_hasta_accpersonal  = validated_data.get('fecha_hasta_accpersonal', instance.fecha_hasta_accpersonal)
        
        instance.estado_ejecucion         = validated_data.get('estado_ejecucion', instance.estado_ejecucion)
        instance.observaciones            = validated_data.get('observaciones', instance.observaciones)
        instance.estado                   = validated_data.get('estado', instance.estado)
        instance.num_dias                 = validated_data.get('num_dias', instance.num_dias)
        instance.modalidad_laboral_id     = validated_data.get('modalidad_laboral_id', instance.modalidad_laboral_id)
        instance.num_memo                 = validated_data.get('num_memo', instance.num_memo)
        instance.accion_precedente        = validated_data.get('accion_precedente', instance.accion_precedente)
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Per_FuncionarioAccionpersonalSerializer_short(CommonFieldsSerializer):

    class Meta:
        model  = PerFuncionarioAccionpersonal
        fields = ['id','num_accion_personal']


class Per_FuncionarioAccionpersonalSerializer_list(CommonFieldsSerializer):
    fecha_rige_accpersonal  = serializers.DateField(format="%Y-%m-%d",required=False)
    fecha_hasta_accpersonal = serializers.DateField(format="%Y-%m-%d",required=False)
    diasrestantes           = serializers.SerializerMethodField()
    alertaDiasrestantes     = serializers.SerializerMethodField()
    fecha_ingreso           = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    funcionario_id          = Per_FuncionarioSerializer_short()
    accionpersonal_id       = Gth_AccionpersonalSerializer_short()
    accionpersonal_otros    = Gth_AccionpersonalSerializer_short()
    modalidad_laboral_id    = Gth_ModalidadLaboralSerializer_short()
    isla_usuario_ingreso_id = Geo_IslaSerializer_label()
    #resp_rrhh_id            = Per_FuncionarioSerializer_short()
    #autoridad_nominadora_id = Per_FuncionarioSerializer_short()


    class Meta:
        model  = PerFuncionarioAccionpersonal
        fields = '__all__'

    def get_diasrestantes(self, obj):
        if obj.fecha_hasta_accpersonal is None:
            return 100;
        else:
            ts = obj.fecha_hasta_accpersonal - date.today()
        return ts.days + 1

    def get_alertaDiasrestantes(self, obj):
        if obj.fecha_hasta_accpersonal is None:
            return 'N';
        else:
            ts   = obj.fecha_hasta_accpersonal - date.today()
        dias = ts.days + 1

        if dias > ALERTA_RANGO_DIAS:
            return 'V'
        elif dias <= ALERTA_RANGO_DIAS and dias > 0:
            return 'A'
        elif dias <= 0:
            return 'R'


class Per_Accionpersonal_licencias_Serializer(CommonFieldsSerializer):
    fecha_rige_accpersonal  = serializers.DateField(format="%Y-%m-%d")
    fecha_hasta_accpersonal = serializers.DateField(format="%Y-%m-%d")
    fecha_ingreso           = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    diasrestantes           = serializers.SerializerMethodField()
    alertaDiasrestantes     = serializers.SerializerMethodField()

    funcionario_id        = Per_FuncionarioSerializer_list()
    accpersonal_licencias = Per_LicenciaAccionesSerializer(many=True, read_only=True)
    accionpersonal_id   = Gth_AccionpersonalSerializer_short()
    accionpersonal_otros   = Gth_AccionpersonalSerializer_short()


    class Meta:
        model  = PerFuncionarioAccionpersonal
        fields = '__all__'

    def get_diasrestantes(self, obj):
        if obj.fecha_hasta_accpersonal is None:
            return 100;
        else:
            ts = obj.fecha_hasta_accpersonal - date.today()
        return ts.days + 1

    def get_alertaDiasrestantes(self, obj):
        if obj.fecha_hasta_accpersonal is None:
            return 'N';
        else:
            ts   = obj.fecha_hasta_accpersonal - date.today()
        dias = ts.days + 1

        if dias > ALERTA_RANGO_DIAS:
            return 'V'
        elif dias <= ALERTA_RANGO_DIAS and dias > 0:
            return 'A'
        elif dias <= 0:
            return 'R'

class Per_Accionpersonal_ingresos_Serializer(CommonFieldsSerializer):
    fecha_rige_accpersonal  = serializers.DateField(format="%Y-%m-%d",required=False)
    fecha_hasta_accpersonal = serializers.DateField(format="%Y-%m-%d",required=False)
    fecha_ingreso           = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    funcionario_id       = Per_FuncionarioSerializer_list()
    accpersonal_ingresos = Per_IngresosAccionesSerializer(many=True, read_only=True)
    accionpersonal_id    = Gth_AccionpersonalSerializer_short()
    modalidad_laboral_id   = Gth_ModalidadLaboralSerializer_short()
    accionpersonal_otros   = Gth_AccionpersonalSerializer_short()


    class Meta:
        model  = PerFuncionarioAccionpersonal
        fields = '__all__'

class Per_Accionpersonal_traspasos_Serializer(CommonFieldsSerializer):
    fecha_rige_accpersonal  = serializers.DateField(format="%Y-%m-%d")
    fecha_hasta_accpersonal = serializers.DateField(format="%Y-%m-%d")
    fecha_ingreso           = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    diasrestantes           = serializers.SerializerMethodField()
    alertaDiasrestantes     = serializers.SerializerMethodField()

    funcionario_id        = Per_FuncionarioSerializer_list()
    accpersonal_traspasos = Per_TraspasoAccionesSerializer(many=True, read_only=True)
    accionpersonal_id     = Gth_AccionpersonalSerializer_short()
    accionpersonal_otros    = Gth_AccionpersonalSerializer_short()

    class Meta:
        model  = PerFuncionarioAccionpersonal
        fields = '__all__'

    def get_diasrestantes(self, obj):
        if obj.fecha_hasta_accpersonal is None:
            return 100;
        else:
            ts = obj.fecha_hasta_accpersonal - date.today()
        return ts.days + 1

    def get_alertaDiasrestantes(self, obj):
        if obj.fecha_hasta_accpersonal is None:
            return 'N';
        else:
            ts   = obj.fecha_hasta_accpersonal - date.today()
        dias = ts.days + 1

        if dias > ALERTA_RANGO_DIAS:
            return 'V'
        elif dias <= ALERTA_RANGO_DIAS and dias > 0:
            return 'A'
        elif dias <= 0:
            return 'R'

class Per_Accionpersonal_encargos_Serializer(CommonFieldsSerializer):
    fecha_rige_accpersonal  = serializers.DateField(format="%Y-%m-%d")
    fecha_hasta_accpersonal = serializers.DateField(format="%Y-%m-%d")
    diasrestantes           = serializers.SerializerMethodField()
    alertaDiasrestantes     = serializers.SerializerMethodField()
    fecha_ingreso           = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    funcionario_id      = Per_FuncionarioSerializer_list()
    accionpersonal_id   = Gth_AccionpersonalSerializer_short()
    accionpersonal_otros   = Gth_AccionpersonalSerializer_short()

    class Meta:
        model  = PerFuncionarioAccionpersonal
        fields = '__all__'

    def get_diasrestantes(self, obj):
        if obj.fecha_hasta_accpersonal is None:
            return 100;
        else:
            ts = obj.fecha_hasta_accpersonal - date.today()
        return ts.days + 1

    def get_alertaDiasrestantes(self, obj):
        if obj.fecha_hasta_accpersonal is None:
            return 'N';
        else:
            ts   = obj.fecha_hasta_accpersonal - date.today()
        dias = ts.days + 1

        if dias > ALERTA_RANGO_DIAS:
            return 'V'
        elif dias <= ALERTA_RANGO_DIAS and dias > 0:
            return 'A'
        elif dias <= 0:
            return 'R'

# Per_FuncionarioCarnet
class Per_FuncionarioCarnetSerializer_list(CommonFieldsSerializer):
    funcionario_id = Per_FuncionarioSerializer_Direccion()  #Per_FuncionarioSerializer_list()
    fecha_ingreso = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    cargo_id = Sis_CatalogoSerializer_short()

    class Meta:
        model  = PerFuncionarioCarnet
        fields = '__all__'

class Per_FuncionarioCarnetSerializer_short(CommonFieldsSerializer):

    class Meta:
        model  = PerFuncionarioCarnet
        fields = ['id','foto']

class Per_FuncionarioCarnetSerializer(CommonFieldsSerializer):
    estado_credencial = serializers.CharField(required=False)
    
    class Meta:
        model  = PerFuncionarioCarnet
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, PerFuncionarioCarnet)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoInstitucional
        instance.funcionario_id = validated_data.get('funcionario_id', instance.funcionario_id)
        instance.estado_credencial = validated_data.get('estado_credencial', instance.estado_credencial)
        instance.foto = validated_data.get('foto', instance.foto)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.cargo_id = validated_data.get('cargo_id', instance.cargo_id)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

# PerGuia
class Per_GuiaSerializer_list(CommonFieldsSerializer):
    persona_id = Per_PersonaSerializer_short()

    class Meta:
        model  = PerGuia
        fields = ['id','persona_id','estado']

class Per_GuiaSerializer_short(CommonFieldsSerializer):
    persona_id = Per_PersonaSerializer_short()

    class Meta:
        model  = PerGuia
        fields = ['id','persona_id']

class Per_GuiaSerializer(CommonFieldsSerializer):
    
    class Meta:
        model  = PerGuia
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, PerGuia)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoInstitucional
        # instance.funcionario_id = validated_data.get('funcionario_id', instance.funcionario_id)
       

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

