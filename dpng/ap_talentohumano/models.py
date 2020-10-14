import uuid

# DJANGO
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import Group
from ap_base.models import SisCatalogo,PerPersona,OrgOrganizacion,GeoIsla,DirOrganization,DirDepartment,GeoProvincia,GeoParroquia

# AUDIT
from simple_history.models import HistoricalRecords

class PerPersonaCuenta(models.Model):
    id = models.UUIDField(primary_key=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    persona_id = models.ForeignKey(PerPersona, models.DO_NOTHING, blank=True, null=True,db_column="persona_id",related_name="persona_id")
    banco_id = models.ForeignKey(OrgOrganizacion, models.DO_NOTHING, blank=True, null=True,db_column="banco_id",related_name="banco_id")
    numero_cuenta = models.TextField(unique=True, blank=True, null=True)
    tipo_cuenta = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"per_persona_cuenta"'
        #app_label = "sia_master"


class GthCargoDistributivo(models.Model):
    id = models.UUIDField(primary_key=True)
    nombre = models.TextField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    usuario_ingreso = models.TextField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)


    class Meta:
        managed = False
        db_table = u'"master\".\"gth_cargo_distributivo"'
        #app_label = "sia_master"
    def __str__(self):
        return self.nombre

class GthBaseNombramiento(models.Model):
    id = models.UUIDField(primary_key=True)
    nombre = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=1)

    class Meta:
        managed = False
        db_table = u'"master\".\"gth_base_nombramiento"'
        #app_label = "sia_master"


class GthCargoFuncional(models.Model):
    id = models.UUIDField(primary_key=True)
    identificador = models.TextField(blank=True, null=True)
    nombre = models.TextField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    usuario_ingreso = models.TextField(blank=True, null=True)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,null=True)
    estado = models.CharField(max_length=1)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    
    #observacion = models.TextField(blank=True, null=True)
    
    class Meta:
        managed = False
        db_table = u'"master\".\"gth_cargo_funcional"'
        #app_label = "sia_master"

class GthCargoInstitucional(models.Model):
    id = models.UUIDField(primary_key=True)
    nombre = models.TextField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    usuario_ingreso = models.TextField(blank=True, null=True)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,null=True)
    estado = models.CharField(max_length=1)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"gth_cargo_institucional"'
        #app_label = "sia_master"

    def __str__(self):
        return self.nombre


class GthCargoOcupacional(models.Model):
    id = models.UUIDField(primary_key=True)
    nombre = models.TextField(blank=True, null=True)
    nombre_corto = models.TextField(blank=True, null=True)
    grado = models.IntegerField(blank=True, null=True)
    rmu = models.DecimalField(max_digits=100, decimal_places=2, blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    usuario_ingreso = models.TextField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"gth_cargo_ocupacional"'
        #app_label = "sia_master"

    def __str__(self):
        return self.nombre

class GthModalidadLaboral(models.Model):
    id = models.UUIDField(primary_key=True)
    nombre = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    usuario_ingreso = models.TextField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    
    class Meta:
        managed = False
        db_table = u'"master\".\"gth_modalidad_laboral"'

        
class PerFuncionario(models.Model):
    id = models.UUIDField(primary_key=True)
    anio_nombramiento = models.TextField(blank=True, null=True)
    anios_gestion = models.IntegerField(blank=True, null=True)
    tipo_actividad = models.CharField(max_length=2, blank=True, null=True)
    #conyuge_apellidos = models.CharField(max_length=255, blank=True, null=True)
    #conyuge_nombres = models.CharField(max_length=255, blank=True, null=True)
    direccion_estatuto = models.TextField(blank=True, null=True)
    proceso_estatuto = models.TextField(blank=True, null=True)
    subproceso_estatuto = models.CharField(max_length=255, blank=True, null=True)
    escala = models.CharField(max_length=255, blank=True, null=True)
    fecha_ingreso_png = models.DateField(blank=True, null=True)
    grado = models.TextField(blank=True, null=True)
    hijos_mayores_5 = models.IntegerField(blank=True, null=True)
    hijos_menores_5 = models.IntegerField(blank=True, null=True)
    institucion_auspiciante = models.TextField(blank=True, null=True)
    modalidad_laboral = models.TextField(blank=True, null=True)
    nro_hijos = models.IntegerField(blank=True, null=True)
    puesto_institucional_id = models.CharField(max_length=255, blank=True, null=True)
    razon_salida = models.TextField(blank=True, null=True)
    regimen_laboral = models.TextField(blank=True, null=True)
    residente_temporal = models.TextField(blank=True, null=True)
    rmu = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
    rol_no_profesional_con_titulo = models.TextField(blank=True, null=True)
    rol_profesional_sin_titulo = models.TextField(blank=True, null=True)
    fecha_salida_png = models.DateField(blank=True, null=True)
    discapacitado = models.BooleanField(blank=True, null=True)
    regimen_disciplinario = models.IntegerField(blank=True, null=True)
    situacion_actual = models.TextField(blank=True, null=True)
    telefono_institucional = models.TextField(blank=True, null=True)
    extension_telefonica = models.TextField(blank=True, null=True)
    telefonos_contacto = models.TextField(blank=True, null=True)
    email = models.TextField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    contrato_inicio = models.DateField(blank=True, null=True)
    contrato_fin = models.DateField(blank=True, null=True)
    #identificacion_tmp = models.TextField(blank=True, null=True)
    cargo_funcionario = models.TextField(blank=True, null=True)
    cargo_institucional = models.TextField(blank=True, null=True)
    cargo_distributivo = models.TextField(blank=True, null=True)
    direccion_domicilio = models.TextField(blank=True, null=True)
    es_externo = models.BooleanField(blank=True, null=True)
    persona_id = models.ForeignKey(PerPersona, models.DO_NOTHING, related_name="perfuncionario",blank=True, null=True,db_column="persona_id")
    isla_trabaja_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,related_name="isla_trabaja_id", db_column="isla_trabaja_id")
    proceso_estatuto_id = models.ForeignKey(DirDepartment, models.DO_NOTHING, related_name="proceso_estatuto_id",blank=True, null=True,db_column="proceso_estatuto_id")
    direccion_estatuto_id = models.ForeignKey(DirDepartment, models.DO_NOTHING, related_name="direccion_estatuto_id",blank=True, null=True,db_column="direccion_estatuto_id")
    subproceso_estatuto_id = models.ForeignKey(DirDepartment, models.DO_NOTHING, related_name="subproceso_estatuto_id",blank=True, null=True,db_column="subproceso_estatuto_id")
    cargo_ocupacional_id = models.ForeignKey(GthCargoOcupacional, models.DO_NOTHING, blank=True, null=True,db_column="cargo_ocupacional_id")
    #username = models.TextField(blank=True, null=True)
    #password = models.TextField(blank=True, null=True)
    active = models.BooleanField(blank=True, null=True)
    provincia_id = models.ForeignKey(GeoProvincia, models.DO_NOTHING, blank=True, null=True,db_column="provincia_id",related_name="provincia_id", help_text="Provincia de Residencia")
    parroquia_trabaja_id = models.ForeignKey(GeoParroquia, models.DO_NOTHING, blank=True, null=True,related_name="parroquia_trabaja_id", db_column="parroquia_trabaja_id")
    base_nombramiento_id = models.ForeignKey(GthBaseNombramiento, models.DO_NOTHING, blank=True, null=True,db_column="base_nombramiento_id")
    clasificacion_proceso_id = models.UUIDField(blank=True, null=True)
    modalidad_laboral_id = models.ForeignKey(GthModalidadLaboral, models.DO_NOTHING, blank=True, null=True,db_column="modalidad_laboral_id")
    cargo_distributivo_id = models.ForeignKey(GthCargoDistributivo, models.DO_NOTHING, db_column="cargo_distributivo_id", related_name="func_cargo_distributivo_id", blank=True, null=True)  # Field renamed because of name conflict.
    cargo_institucional_id = models.ForeignKey(GthCargoInstitucional, models.DO_NOTHING, db_column="cargo_institucional_id", related_name="func_cargo_institucional_id", blank=True, null=True)  # Field renamed because of name conflict.
    firma = models.TextField(blank=True, null=True)
    actualizado = models.BooleanField(blank=True, null=True)
    cargo_funcional_id = models.ForeignKey(GthCargoFuncional, models.DO_NOTHING, related_name="perfuncionario_cargofuncional", blank=True, null=True,db_column="cargo_funcional_id")
    clasificacion_proceso = models.TextField(blank=True, null=True)
            
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1, blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    dba_observacion = models.TextField(blank=True, null=True)
    num_iess = models.TextField(blank=True, null=True)
    tipo_discapacidad = models.UUIDField(blank=True, null=True)
    num_carnet_discapacidad = models.TextField(blank=True, null=True)
    grado_discapacidad = models.TextField(blank=True, null=True)
    tipo_enfemedad = models.TextField(blank=True, null=True)
    descripcion_enfermedad_id = models.TextField(blank=True, null=True)
    partida_general =  models.TextField(blank=True, null=True)
    partida_individual =  models.TextField(blank=True, null=True)
    rol_profesional = models.BooleanField(blank=True, null=True)    # TRUE: ROL PROFESIONAL CON TITULO, FALSE: ROL PROFESIONAL SIN TITULO
    es_responsable = models.BooleanField(blank=True, null=True,help_text="Indica si el funcionario es un responsable de alguna Direccion, Proceso, Subproceso")
    

    class Meta:
        managed = False
        db_table = u'"master\".\"per_funcionario"'
        #app_label = "sia_master"

    def __str__(self):
        nombres = apellidos = ""
        
        if self.persona_id:
            nombres = self.persona_id.nombres
        if self.persona_id:
            apellidos = self.persona_id.apellidos
        return nombres + " " + apellidos

class PerFuncionarioAuth(models.Model):
#class PerPersonaAuth(models.Model):
    ESTADO = (
        ("A","ACTIVO"),
        ("I","INACTIVO"),
    )
    user = models.OneToOneField(User,related_name="user_funcionario_id",on_delete=models.CASCADE,db_column="user_id")
    funcionario_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="funcionario_id",related_name="funcionario_auth_id")
    #persona_id = models.ForeignKey(PerPersona, models.DO_NOTHING, blank=True, null=True,db_column="persona_id",related_name="auth_persona_id")

    def __str__(self):
        return self.user.username

    class Meta:
        managed = True
        db_table = u'"master\".\"per_funcionario_auth"'
        #db_table = u'"master\".\"per_persona_auth"'
        




class DirClasificacionProceso(models.Model):
    id = models.UUIDField(primary_key=True)
    nombre = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=1)

    class Meta:
        managed = False
        db_table = u'"master\".\"dir_clasificacion_proceso"'


class GthLicencias(models.Model):
    id = models.UUIDField(primary_key=True)
    categoria = models.TextField(blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    con_remuneracion = models.BooleanField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"gth_licencias"'

###############
# ADDING...
###############

class PerAccidentes(models.Model):
    id = models.UUIDField(primary_key=True)
    descripcion = models.TextField(blank=True, null=True)
    tipo = models.TextField(blank=True, null=True)
    categoria_id = models.ForeignKey(SisCatalogo, models.DO_NOTHING, blank=True, null=True,db_column="categoria_id")
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    estado = models.CharField(max_length=1)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = u'"master\".\"per_accidentes"'
        #app_label = "sia_master"

class PerDiscapacidades(models.Model):
    id = models.UUIDField(primary_key=True)
    descripcion = models.TextField(blank=True, null=True)
    categoria_id = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    hora_ultima_modificacion = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    prev_id = models.UUIDField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it ended with "_".
    observaciones_dba = models.TextField(blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it ended with "_".

    class Meta:
        managed = True
        db_table = u'"master\".\"per_discapacidades"'
        #app_label = "sia_master"


class PerEnfermedades(models.Model):
    id = models.UUIDField(primary_key=True)
    categoria_id = models.ForeignKey(SisCatalogo, models.DO_NOTHING, blank=True, null=True,db_column="categoria_id",related_name="categoria_id")
    tipo_id = models.ForeignKey(SisCatalogo, models.DO_NOTHING, blank=True, null=True,db_column="tipo_id",related_name="tipo_id")
    codigo = models.TextField(blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = u'"master\".\"per_enfermedades"'
        #app_label = "sia_master"

class GthSolicitudPermiso(models.Model):
    id = models.UUIDField(primary_key=True)

    descripcion = models.TextField(blank=True, null=True)
    isla_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True, db_column="isla_id",related_name="isla_id")
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    fecha_inicio = models.DateTimeField(blank=True, null=True)
    fecha_fin = models.DateTimeField(blank=True, null=True)
    funcionario_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="funcionario_id",related_name="Sl_funcionario_id")
    motivo = models.ForeignKey(SisCatalogo, models.DO_NOTHING, blank=True, null=True)
    motivo_otros = models.TextField(null=True)
    
    #revisor_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="revisor_id", related_name="Sl_revisor_id")
    #aprobador_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="aprobador_id", related_name="Sl_aprobador_id")
    #aprobado_revisor = models.BooleanField(default=False, blank=True, null=True)
    #aprobado_aprovador = models.BooleanField(default=False, blank=True, null=True)
    #estado_tramite = models.CharField(max_length=3,null=True)

    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField(null=True)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True, db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = u'"master\".\"gth_solicitudpermiso"'
        #app_label = "sia_master"


class GthAccionpersonal(models.Model):
    id = models.UUIDField(primary_key=True)
    accion_id = models.ForeignKey("self", on_delete=models.CASCADE,db_column="accion_id", related_name="acc_accion_id", null=True)
    accion_predecesora_id = models.ForeignKey("self", on_delete=models.CASCADE,db_column="accion_predecesora_id",related_name="acc_accion_predecesora_id",null=True)
    tipo = models.TextField(blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    actualiza_funcionario = models.DecimalField(max_digits=3, decimal_places=0, blank=True, null=True,help_text="Mediante tarea programada se actualiza el funcionario si tiene el valor 1 este campo.")
    con_remuneracion = models.DecimalField(max_digits=1, decimal_places=0, blank=True, null=True)
    max_dias = models.DecimalField(max_digits=3, decimal_places=0, blank=True, null=True)
    
    funcionarios = models.TextField(blank=True, null=True)
    flag_solo_fechavigencia = models.BooleanField(blank=True, null=True,help_text="Muestra solo el campo de fecha_rige_accpersonal en pantalla y oculta el campo fecha_hasta_accpersonal")
    flag_rige_hasta_pdf = models.BooleanField(blank=True, null=True,help_text="Si esta marcado aparecera el texto 'Rige Hasta', caso contrario 'Rige desde' ")
    flag_posesion_cargo_pdf = models.BooleanField(blank=True, null=True,help_text="Si esta marcado aparecera en la 2da pagina de la accion de personal del funcionario los datos llenos de la posesion del cargo.")

    
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"gth_accionpersonal"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"gth_accionpersonal"'


class PerFuncionarioAccionpersonal(models.Model):
    id = models.UUIDField(primary_key=True)
    descripcion = models.TextField(blank=True, null=True)
    num_accion_personal = models.TextField(blank=True, null=True)
    fecha_accionpersonal = models.DateField(blank=True, null=True)
    fecha_rige_accpersonal = models.DateField(blank=True, null=True)
    fecha_hasta_accpersonal = models.DateField(blank=True, null=True)
    fecha_hasta_accpersonal_final = models.DateField(blank=True, null=True,help_text="'Fecha hasta' con la que fue quedo al final de un cambio")
    estado_ejecucion = models.CharField(max_length=1)
    funcionario_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="funcionario_id",related_name="funcionario_id")
    tipo_documento_id = models.ForeignKey(SisCatalogo, models.DO_NOTHING, blank=True, null=True,db_column="tipo_documento_id")
    num_documento = models.TextField(blank=True, null=True)
    fecha_documento = models.DateField(blank=True, null=True)
    descripcion_motivo = models.TextField(blank=True, null=True)
    num_memo = models.TextField(blank=True, null=True)
    anexo_motivo = models.TextField(blank=True, null=True)
    accion_precedente = models.UUIDField(blank=True, null=True)
    accionpersonal_id = models.ForeignKey(GthAccionpersonal, models.DO_NOTHING, blank=True, null=True,db_column="accionpersonal_id")
    accionpersonal_otros = models.ForeignKey(GthAccionpersonal, models.DO_NOTHING, blank=True, null=True,db_column="accionpersonal_otros",related_name="accionpersonal_otros")
    
    actual_dir_estatuto_id = models.ForeignKey(DirDepartment, models.DO_NOTHING, blank=True, null=True,db_column="actual_dir_estatuto_id",related_name="actual_dir_estatuto_id")
    actual_proc_estatuto_id = models.ForeignKey(DirDepartment, models.DO_NOTHING, blank=True, null=True,db_column="actual_proc_estatuto_id",related_name="actual_proc_estatuto_id")
    actual_subprc_estatuto_id = models.ForeignKey(DirDepartment, models.DO_NOTHING, blank=True, null=True,db_column="actual_subprc_estatuto_id",related_name="actual_subprc_estatuto_id")
    actual_cargo_ocupacional_id = models.ForeignKey(GthCargoOcupacional, models.DO_NOTHING, blank=True, null=True,db_column="actual_cargo_ocupacional_id",related_name="actual_cargo_ocupacional_id")
    actual_cargo_institucional_id = models.ForeignKey(GthCargoInstitucional, models.DO_NOTHING, blank=True, null=True,db_column="actual_cargo_institucional_id",related_name="actual_cargo_institucional_id")
    #actual_cargo_distributivo_id = models.ForeignKey(GthCargoInstitucional, models.DO_NOTHING, blank=True, null=True,db_column="actual_cargo_distributivo_id",related_name="actual_cargo_distributivo_id")
    actual_puesto_id = models.ForeignKey(GthCargoDistributivo, models.DO_NOTHING, blank=True, null=True,db_column="actual_puesto_id",related_name="actual_puesto_id")
    actual_isla_trabaja_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="actual_isla_trabaja_id",related_name="actual_isla_trabaja_id")
    actual_rmu = models.DecimalField(max_digits=100, decimal_places=2, blank=True, null=True)
    actual_nro_presupuestaria = models.TextField(blank=True, null=True)

    nuevo_dir_estatuto_id = models.ForeignKey(DirDepartment, models.DO_NOTHING, blank=True, null=True,db_column="nuevo_dir_estatuto_id",related_name="nuevo_dir_estatuto_id")
    nuevo_proc_estatuto_id = models.ForeignKey(DirDepartment, models.DO_NOTHING, blank=True, null=True,db_column="nuevo_proc_estatuto_id",related_name="nuevo_proc_estatuto_id")
    nuevo_subprc_estatuto_id = models.ForeignKey(DirDepartment, models.DO_NOTHING, blank=True, null=True,db_column="nuevo_subprc_estatuto_id",related_name="nuevo_subprc_estatuto_id")
    nuevo_cargo_ocupacional_id = models.ForeignKey(GthCargoOcupacional, models.DO_NOTHING, blank=True, null=True,db_column="nuevo_cargo_ocupacional_id",related_name="nuevo_cargo_ocupacional_id")
    #nuevo_cargo_institucional_id = models.ForeignKey(GthCargoInstitucional, models.DO_NOTHING, blank=True, null=True,db_column="nuevo_cargo_institucional_id",related_name="nuevo_cargo_institucional_id")
    nuevo_cargo_distributivo_id = models.ForeignKey(GthCargoInstitucional, models.DO_NOTHING, blank=True, null=True,db_column="nuevo_cargo_distributivo_id",related_name="nuevo_cargo_distributivo_id")
    nuevo_puesto_id = models.ForeignKey(GthCargoInstitucional, models.DO_NOTHING, blank=True, null=True,db_column="nuevo_puesto_id",related_name="nuevo_puesto_id")
    nuevo_isla_trabaja_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="nuevo_isla_trabaja_id",related_name="nuevo_isla_trabaja_id")
    nuevo_rmu = models.DecimalField(max_digits=100, decimal_places=2, blank=True, null=True)
    nuevo_nro_presupuestaria = models.TextField(blank=True, null=True)

    no_acta_final = models.TextField(blank=True, null=True)
    fecha_actafinal = models.DateField(blank=True, null=True)
    resp_rrhh_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="resp_rrhh_id",related_name="resp_rrhh_id")
    autoridad_nominadora_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="autoridad_nominadora_id",related_name="autoridad_nominadora_id")
    no_rrhh = models.TextField(blank=True, null=True)
    fecha_rrhh = models.DateField(blank=True, null=True)
    resp_registrocontrol_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="resp_registrocontrol_id",related_name="resp_registrocontrol_id")
    num_dias = models.IntegerField(blank=True, null=True)
    modalidad_laboral_id = models.ForeignKey(GthModalidadLaboral, models.DO_NOTHING, blank=True, null=True,db_column="modalidad_laboral_id")
    
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    estado = models.CharField(max_length=1)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    observaciones_sys = models.TextField(blank=True, null=True) 
    history = HistoricalRecords(table_name='"audit\".\"per_funcionario_accionpersonal"')
    

    class Meta:
        managed = True
        db_table = u'"master\".\"per_funcionario_accionpersonal"'

class GthComisiones(models.Model):
    id = models.UUIDField(primary_key=True)
    categoria = models.TextField(blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    con_remuneracion = models.BooleanField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = u'"master\".\"gth_comisiones"'

class PerEtnias(models.Model):
    id = models.UUIDField(primary_key=True)
    descripcion = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = u'"master\".\"per_etnias"'



class GthRegimenLaboral(models.Model):
    id = models.UUIDField(primary_key=True)
    descripcion = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = u'"master\".\"gth_regimenlaboral"'

class GthRolLaboral(models.Model):
    id = models.UUIDField(primary_key=True)
    descripcion = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = u'"master\".\"gth_rol_laboral"'

class GthSanciones(models.Model):
    id = models.UUIDField(primary_key=True)
    tipo_id = models.ForeignKey(SisCatalogo, models.DO_NOTHING, blank=True, null=True,db_column="tipo_id")
    descripcion = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = u'"master\".\"gth_sanciones"'


class PerFuncionarioSanciones(models.Model):
    id = models.UUIDField(primary_key=True)
    funcionario_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="funcionario_id")
    tipo_falta_id = models.ForeignKey(SisCatalogo, models.DO_NOTHING, blank=True, null=True,db_column="tipo_falta_id")
    sancion_id = models.ForeignKey(GthSanciones, models.DO_NOTHING, blank=True, null=True,db_column="sancion_id")
    regimen_laboral_id = models.ForeignKey(GthRegimenLaboral, models.DO_NOTHING, blank=True, null=True,db_column="regimen_laboral_id")
    anio_sancion = models.TextField(blank=True, null=True)
    mes_sancion = models.TextField(blank=True, null=True)
    fecha_sancion = models.DateField(blank=True, null=True)
    num_memo = models.TextField(blank=True, null=True)
    file_memo = models.TextField(blank=True, null=True)
    aplica_sumario_adm = models.BooleanField(blank=True, null=True)
    estado_sumario_adm = models.TextField(blank=True, null=True,help_text="0. NO APLICA, 1. EN TRAMITE, 2.CULMINADO")
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"per_funcionario_sanciones"')

    class Meta:
        managed = True
        db_table = u'"master\".\"per_funcionario_sanciones"'

class PerLicenciaAcciones(models.Model):
    id = models.UUIDField(primary_key=True)
    accpersonal_id = models.ForeignKey(PerFuncionarioAccionpersonal, models.DO_NOTHING, db_column="accpersonal_id", related_name="accpersonal_licencias", blank=True, null=True)
    num_informe_tec = models.CharField(max_length=255, blank=True, null=True)
    num_memo = models.CharField(max_length=255, blank=True, null=True)
    archivo_memo = models.CharField(max_length=255, blank=True, null=True)
    con_remuneracion = models.BooleanField(blank=True, null=True)
    archivo_accpersonal = models.CharField(max_length=255, blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    motivo_lic = models.UUIDField(blank=True, null=True)
    enfermedad_id = models.UUIDField(blank=True, null=True)
    enfermedad = models.TextField(blank=True, null=True)
    enfermedad_tipo_id = models.UUIDField(blank=True, null=True)
    accidente = models.TextField(blank=True, null=True)
    accidente_id = models.UUIDField(blank=True, null=True)
    accidente_tipo_id = models.UUIDField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = u'"master\".\"per_licencia_acciones"'

class PerIngresosAcciones(models.Model):
    id = models.UUIDField(primary_key=True)
    accionpersonal_id = models.ForeignKey(PerFuncionarioAccionpersonal, models.DO_NOTHING, db_column="accionpersonal_id", related_name="accpersonal_ingresos", blank=True, null=True)
    base_legal = models.TextField(blank=True, null=True)
    num_partidagen = models.TextField(db_column="num_partidaGen", blank=True, null=True)  # Field name made lowercase.
    num_partidaInd = models.TextField(db_column="num_partidaInd", blank=True, null=True)  # Field name made lowercase.
    grado = models.TextField(blank=True, null=True)
    escala = models.TextField(blank=True, null=True)
    tipo_gasto_id = models.ForeignKey(SisCatalogo, models.DO_NOTHING, blank=True, null=True,db_column="tipo_gasto_id")
    cargo_funcional_id = models.UUIDField(blank=True, null=True)
    tipo_actividad = models.CharField(max_length=2, blank=True, null=True)      #SIS_CATALOGO -> CATEGORIA: ACTIVIDAD_FUNCIONARIO
    clasificacion_proceso_id = models.UUIDField(blank=True, null=True)
    fecha_desde = models.DateField(blank=True, null=True)
    fecha_hasta = models.DateField(blank=True, null=True)
    razon_salida = models.TextField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    nombre_proyecto = models.TextField(blank=True, null=True)
    parroquia_id = models.UUIDField(blank=True, null=True)
    isla_id = models.UUIDField(blank=True, null=True)
    modalidad_laboral_id = models.UUIDField(blank=True, null=True)
    rmu = models.TextField(blank=True, null=True)
    estado_ejecucion = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"per_ingresos_acciones"')

    class Meta:
        managed = True
        db_table = u'"master\".\"per_ingresos_acciones"'



class PerTraspasoAcciones(models.Model):
    id = models.UUIDField(primary_key=True)
    accionpersonal_id = models.ForeignKey(PerFuncionarioAccionpersonal, models.DO_NOTHING, db_column="accionpersonal_id", related_name="accpersonal_traspasos", blank=True, null=True)
    id_rol = models.UUIDField(blank=True, null=True)
    id_cargo = models.UUIDField(blank=True, null=True)
    num_memo = models.CharField(max_length=255, blank=True, null=True)
    archivo_memo = models.CharField(max_length=255, blank=True, null=True)
    fecha_desde = models.DateField(blank=True, null=True)
    estado_ejecucion = models.CharField(max_length=1, blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    archivo_accionpersonal = models.CharField(max_length=255, blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = u'"master\".\"per_traspaso_acciones"'


class PerFuncionarioFamiliares(models.Model):
    id = models.UUIDField(primary_key=True)
    es_carga_familiar = models.BooleanField(blank=True, null=True)
    es_discapacitado = models.BooleanField(blank=True, null=True)
    es_sustituto = models.BooleanField(blank=True, null=True)
    grado = models.IntegerField(blank=True, null=True)
    numero_carnet = models.TextField(blank=True, null=True)
    familiar_id = models.ForeignKey(PerPersona, models.DO_NOTHING, blank=True, null=True,db_column="familiar_id",related_name="personafamiliar")
    funcionario_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="funcionario_id",related_name="perfuncionariofamiliar_id")
    parentesco = models.ForeignKey(SisCatalogo, models.DO_NOTHING, blank=True, null=True, db_column="parentesco")
    tipo_discapacidad = models.CharField(max_length=50, blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = u'"master\".\"per_funcionario_familiares"'


class PerFuncionarioCarnet(models.Model):
    id = models.UUIDField(primary_key=True)
    funcionario_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, db_column="funcionario_id", related_name="func_carnet_id", blank=True, null=True)
    cargo_id = models.ForeignKey(SisCatalogo, models.DO_NOTHING, db_column="cargo_id", related_name="cargo_id", blank=True, null=True)
    estado_credencial = models.CharField(max_length=30)
    foto = models.CharField(max_length=60,null=True)

    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"per_funcionario_carnet"')


    class Meta:
        managed = True
        db_table = u'"master\".\"per_funcionario_carnet"'

    @property
    def fields(self):
        return [ f.name for f in self._meta.fields + self._meta.many_to_many ]

class PerFuncionarioPermisos(models.Model):
    ESTADO_TRAMITE = (
        ("BORRADOR","BORRADOR"),
        ("TRAMITE","EN TRAMITE"),
        ("APROBADO","APROBADO"),
        ("RECHAZADO","RECHAZADO"),
    )

    ESTADO_REVISOR_APROBADOR = (
        ("A","APROBADO"),
        ("R","RECHAZADO"),
        ("","PENDIENTE"),
    )

    id = models.UUIDField(primary_key=True)
    funcionario_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, db_column="funcionario_id", related_name="func_permiso_id", blank=True, null=True)
    motivo_id = models.ForeignKey(SisCatalogo, models.DO_NOTHING,blank=True, null=True, db_column="motivo_id")
    fecha_desde = models.DateTimeField(auto_now=False,blank=True, null=True)
    fecha_hasta = models.DateTimeField(auto_now=False,blank=True, null=True)
    num_solicitud = models.IntegerField(blank=True, null=True)
    
    revisor_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="revisor_id", related_name="Sl_revisor_id")
    aprobador_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="aprobador_id", related_name="Sl_aprobador_id")
    estado_revisor = models.CharField(max_length=1,null=True, choices=ESTADO_REVISOR_APROBADOR)
    estado_aprobador = models.CharField(max_length=1,null=True, choices=ESTADO_REVISOR_APROBADOR)
    estado_tramite = models.CharField(max_length=20,null=True, choices=ESTADO_TRAMITE)

    observaciones_revisor = models.TextField(blank=True, null=True)
    observaciones_aprobador = models.TextField(blank=True, null=True)

    estado = models.CharField(max_length=1)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    usuario_ingreso = models.TextField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"per_funcionario_permisos"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"per_funcionario_permisos"'

class PerFuncionarioControlesRrhh(models.Model):
    ESTADO_NOTIFICACION_ = (
        ("CREADO","CREADO"),
        ("NOTIFICADO","NOTIFICADO"),
    )
    id = models.UUIDField(primary_key=True)
    funcionario_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, db_column="funcionario_id", related_name="func_contorl_id", blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)
    tipo = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    estado_notificacion = models.TextField(blank=True, null=True,choices=ESTADO_NOTIFICACION_)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    observaciones_sys = models.TextField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    usuario_ingreso = models.TextField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"per_funcionario_controles_rrhh"')

    
    class Meta:
        managed = True
        db_table = u'"master\".\"per_funcionario_controles_rrhh"'



################################## VIEWS ###############################################


class VwPerFuncionarioControlesRrhh(models.Model):
    id = models.UUIDField(db_column="id",primary_key=True)
    funcionario_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, db_column="funcionario_id",blank=True, null=True)
    fecha = models.DateField(db_column="fecha",blank=True, null=True)
    tipo = models.TextField(db_column="tipo", blank=True, null=True)
    observaciones = models.TextField(db_column="observaciones", blank=True, null=True)
    tipo_text = models.TextField(db_column="tipo_text",blank=True, null=True)
    estado_notificacion = models.TextField(db_column="estado_notificacion",blank=True, null=True)
   
    class Meta:
        managed = False
        db_table = u'"master\".\"vw_per_funcionario_controles_rrhh"'












