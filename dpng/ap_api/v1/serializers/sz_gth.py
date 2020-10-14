# DJANGO
#from django.contrib.auth.models import User
#import uuid

# REST
from rest_framework import serializers

# Local
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer

from ap_talentohumano.models import *
from ap_api.v1.serializers.sz_sis import Sis_CatalogoSerializer_short

# 

# GthBaseNombramiento
class Gth_BaseNombramientoSerializer(CommonFieldsSerializer):

    class Meta:
        model = GthBaseNombramiento
        fields = '__all__'

    
class Gth_BaseNombramientoSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = GthBaseNombramiento
        fields = ['id','nombre']

class Gth_BaseNombramientoSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = GthBaseNombramiento
        fields = ['id','nombre']

# GthCargoFuncional
class Gth_CargoFuncionalSerializer(CommonFieldsSerializer):

    class Meta:
        model = GthCargoFuncional
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GthCargoFuncional)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.identificador = validated_data.get('identificador', instance.identificador)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Gth_CargoFuncionalSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = GthCargoFuncional
        fields = ['id','nombre']

class Gth_CargoFuncionalSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = GthCargoFuncional
        fields = '__all__'


# GthCargoDistributivo
class Gth_CargoDistributivoSerializer(CommonFieldsSerializer):

    class Meta:
        model = GthCargoDistributivo
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GthCargoDistributivo)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoDistributivo
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Gth_CargoDistributivoSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = GthCargoDistributivo
        fields = ['id','nombre']

class Gth_CargoDistributivoSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = GthCargoDistributivo
        fields = '__all__'

# GthCargoInstitucional
class Gth_CargoInstitucionalSerializer(CommonFieldsSerializer):

    class Meta:
        model = GthCargoInstitucional
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GthCargoInstitucional)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoInstitucional
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Gth_CargoInstitucionalSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = GthCargoInstitucional
        fields = ['id','nombre']

class Gth_CargoInstitucionalSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = GthCargoInstitucional
        fields = '__all__'

# GthCargoOcupacional
class Gth_CargoOcupacionalSerializer(CommonFieldsSerializer):

    class Meta:
        model = GthCargoOcupacional
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GthCargoOcupacional)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoInstitucional
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.nombre_corto = validated_data.get('nombre_corto', instance.nombre_corto)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Gth_CargoOcupacionalSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = GthCargoOcupacional
        fields = ['id','nombre','nombre_corto']

class Gth_CargoOcupacionalSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = GthCargoOcupacional
        fields = '__all__'


# GthModalidadLaboral
class Gth_ModalidadLaboralSerializer(CommonFieldsSerializer):

    class Meta:
        model = GthModalidadLaboral
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GthModalidadLaboral)
        return item

    def update(self, instance, validated_data):
        # Campos GthModalidadLaboral
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Gth_ModalidadLaboralSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = GthModalidadLaboral
        fields = ['id','nombre']

class Gth_ModalidadLaboralSerializer_list(CommonFieldsSerializer):
    
    class Meta:
        model = GthModalidadLaboral
        fields = '__all__'

# GthLicencias
class Gth_LicenciasSerializer(CommonFieldsSerializer):

    class Meta:
        model = GthLicencias
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GthLicencias)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoInstitucional
        instance.nombre = validated_data.get('descripcion', instance.descripcion)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.con_remuneracion = validated_data.get('con_remuneracion', instance.con_remuneracion)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Gth_Licencias_short(CommonFieldsSerializer):

    class Meta:
        model = GthLicencias
        fields = ['id','descripcion']

class Gth_LicenciasSerializer_list(CommonFieldsSerializer):
    con_remuneracion_lbl = serializers.SerializerMethodField(required=False)

    def get_con_remuneracion_lbl(self, obj):
        
        if obj.con_remuneracion == True:
            return 'SI'
        else:
            return 'NO'

    class Meta:
        model = GthLicencias
        fields = '__all__'


# GthRegimenLaboral
class Gth_RegimenLaboralSerializer(CommonFieldsSerializer):

    class Meta:
        model = GthRegimenLaboral
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GthRegimenLaboral)
        return item

    def update(self, instance, validated_data):
        # Campos GthRegimenLaboral
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Gth_RegimenLaboralSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = GthRegimenLaboral
        fields = ['id','descripcion']

class Gth_RegimenLaboralSerializer_list(CommonFieldsSerializer):
    
    class Meta:
        model = GthRegimenLaboral
        fields = '__all__'

# GthRolLaboral
class Gth_RolLaboralSerializer(CommonFieldsSerializer):

    class Meta:
        model = GthRolLaboral
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GthRolLaboral)
        return item

    def update(self, instance, validated_data):
        # Campos GthRolLaboral
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Gth_RolLaboralSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = GthRolLaboral
        fields = ['id','descripcion']

class Gth_RolLaboralSerializer_list(CommonFieldsSerializer):
    
    class Meta:
        model = GthRolLaboral
        fields = '__all__'

# GthSanciones
class Gth_SancionesSerializer(CommonFieldsSerializer):

    class Meta:
        model = GthSanciones
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GthSanciones)
        return item

    def update(self, instance, validated_data):
        # Campos GthRolLaboral
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.tipo_id = validated_data.get('tipo_id', instance.tipo_id)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Gth_SancionesSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = GthSanciones
        fields = ['id','descripcion','tipo_id']

class Gth_SancionesSerializer_list(CommonFieldsSerializer):
    tipo_id = Sis_CatalogoSerializer_short()

    class Meta:
        model = GthSanciones
        fields = '__all__'

# GthAccionpersonal
class Gth_AccionpersonalSerializer(CommonFieldsSerializer):

    class Meta:
        model = GthAccionpersonal
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GthAccionpersonal)
        return item

    def update(self, instance, validated_data):
        # Campos GthAccionpersonal
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.tipo = validated_data.get('tipo', instance.tipo)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.con_remuneracion = validated_data.get('con_remuneracion', instance.con_remuneracion)
        instance.max_dias = validated_data.get('max_dias', instance.max_dias)
        instance.accion_id = validated_data.get('accion_id', instance.accion_id)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.funcionarios = validated_data.get('funcionarios', instance.funcionarios)
        instance.flag_rige_hasta_pdf = validated_data.get('flag_rige_hasta_pdf', instance.flag_rige_hasta_pdf)
        instance.flag_posesion_cargo_pdf = validated_data.get('flag_posesion_cargo_pdf', instance.flag_posesion_cargo_pdf)
        instance.flag_solo_fechavigencia = validated_data.get('flag_solo_fechavigencia', instance.flag_solo_fechavigencia)
        
        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Gth_AccionpersonalSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = GthAccionpersonal
        fields = ['id','descripcion','accion_id','con_remuneracion','max_dias','flag_rige_hasta_pdf','flag_posesion_cargo_pdf','flag_solo_fechavigencia']

class Gth_AccionPersonalSerializer_list(CommonFieldsSerializer):
    accion_id = Gth_AccionpersonalSerializer_short()
    class Meta:
        model = GthAccionpersonal
        fields = '__all__'


# GthComisiones
class Gth_ComisionesSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = GthComisiones
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GthComisiones)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoInstitucional
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observaciones = validated_data.get('observaciones', instance.observaciones)
        instance.con_remuneracion = validated_data.get('con_remuneracion', instance.con_remuneracion)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Gth_ComisionesSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = GthComisiones
        fields = ['id','descripcion']

class Gth_ComisionesSerializer_list(CommonFieldsSerializer):
    con_remuneracion_lbl = serializers.SerializerMethodField(required=False)

    def get_con_remuneracion_lbl(self, obj):
        
        if obj.con_remuneracion == True:
            return 'SI'
        else:
            return 'NO'

    class Meta:
        model = GthComisiones
        fields = '__all__'



