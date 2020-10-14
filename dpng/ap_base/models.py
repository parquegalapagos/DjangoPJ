from django.db import models
from django.utils import timezone
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import Group
from datetime import datetime 
from django.contrib.auth.models import User

from django.utils.http import urlquote
from django.utils.translation import ugettext_lazy as _
from django.core.mail import send_mail
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


from django.dispatch import receiver

#from django.contrib.auth.models import AbstractUser


class GeoIsla(models.Model):
    id = models.UUIDField(primary_key=True)
    descripcion = models.TextField()
    tipo_isla = models.TextField()
    clasificacion = models.CharField(max_length=1, blank=True, null=True)
    superficie_km = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    superficie_ha = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    latitud = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    longitud = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    es_poblada = models.BooleanField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    canton_id = models.UUIDField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"geo_isla"'
        #app_label = "sia_master"

    def __str__(self):
        return self.descripcion

class GeoSitio(models.Model):
    SITIO_MODULOS = (
        ("0",""),
        ("1",""),
        ("2","PETRELES"),
        ("3","TORTUGA"),
        ("4",""),
        ("5","MATERIALES PETREOS - SITIOS EXTRACCION"),
        ("6","MATERIALES PETREOS - LUGAR DE CONTROL"),
    )
    id = models.UUIDField(primary_key=True)
    isla_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, db_column="isla_id", blank=True, null=True)
    descripcion = models.TextField( blank=True, null=True)
    tipo_monitoreo  = models.TextField(blank=True, null=True)
    latitud = models.FloatField( blank=True, null=True)
    longitud = models.FloatField(blank=True, null=True)
    marino  = models.CharField(max_length=1,blank=True, null=True)
    terrestre   = models.CharField(max_length=1,blank=True, null=True)
    tipo    = models.CharField(max_length=3,blank=True, null=True)
    usuario_ingreso = models.TextField(blank=True, null=True)
    fecha_ingreso   = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    alias   = models.TextField(blank=True, null=True)
    codigo_png  = models.TextField(blank=True, null=True)
    abreviatura = models.TextField(blank=True, null=True)
    descripcion_sitio   = models.TextField(blank=True, null=True)
    fecha_ultima_revision   = models.DateField(blank=True, null=True)
    imagen_mapa = models.TextField(blank=True, null=True)
    extension_area_uso  = models.IntegerField(blank=True, null=True)
    tiempo_recorrido_aprox  = models.TextField(blank=True, null=True)
    ancho_sendero   = models.IntegerField(blank=True, null=True)
    descripcion_terreno = models.TextField(blank=True, null=True)
    dificultad_sendero_id   = models.UUIDField(blank=True, null=True)
    carga_aceptable = models.IntegerField(blank=True, null=True)
    caracterizacion_uso_publico = models.TextField(blank=True, null=True)
    atractivo_principal = models.TextField(blank=True, null=True)
    atractivo_secundario    = models.TextField(blank=True, null=True)
    elementos_biologicos    = models.TextField(blank=True, null=True)
    elementos_geologicos    = models.TextField(blank=True, null=True)
    elementos_paisajisticos = models.TextField(blank=True, null=True)
    zonificacion_id = models.UUIDField(blank=True, null=True)
    estado  = models.CharField(max_length=1)
    zona_uso_publico_id = models.UUIDField(blank=True, null=True)
    tipo_desembarco_id  = models.UUIDField(blank=True, null=True)
    temporalidad_acceso_id  = models.UUIDField(blank=True, null=True)
    ciudad_id   = models.UUIDField(blank=True, null=True)
    migrar  = models.BooleanField(blank=True, null=True)
    prev_id = models.TextField(blank=True, null=True)
    isla_text   = models.TextField(blank=True, null=True)
    zup_text    = models.TextField(blank=True, null=True)
    temporalidad_acceso_text    = models.TextField(blank=True, null=True)
    tipo_desembarco_text    = models.TextField(blank=True, null=True)
    dificultad_acceso_text  = models.TextField(blank=True, null=True)
    categoria_propuesta_zonificacion    = models.TextField(blank=True, null=True)
    nombre_corto    = models.TextField(blank=True, null=True)
    prev_id_tmp = models.IntegerField(blank=True, null=True)
    modulo = models.TextField(blank=True, null=True,choices=SITIO_MODULOS)

    class Meta:
        managed = False
        db_table = u'"master\".\"geo_sitio"'


class GeoPais(models.Model):
    id = models.UUIDField(primary_key=True)
    descripcion = models.TextField(blank=True, null=True)
    continente = models.TextField(blank=True, null=True)
    iso_2 = models.TextField(blank=True, null=True)
    iso_3 = models.TextField(blank=True, null=True)
    iso_numeric = models.TextField(blank=True, null=True)
    fips = models.TextField(blank=True, null=True)
    capital = models.TextField(blank=True, null=True)
    id_text = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField(blank=True, null=True)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    nacionalidad = models.TextField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"geo_pais"'
        #app_label = "sia_master"


class GeoProvincia(models.Model):
    id = models.UUIDField(primary_key=True)
    descripcion = models.TextField(blank=True, null=True)
    pais_text_id = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    pais = models.ForeignKey(GeoPais, models.DO_NOTHING)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    cod_inec_provincia = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"geo_provincia"'
        #app_label = "sia_master"

class GeoCiudad(models.Model):
    id = models.UUIDField(primary_key=True)
    pais = models.TextField(blank=True, null=True)
    provincia = models.TextField(blank=True, null=True)
    ciudad = models.TextField(blank=True, null=True)
    provincia_id = models.ForeignKey(GeoProvincia, models.DO_NOTHING, db_column="provincia_id", blank=True, null=True)  # Field renamed because of name conflict.
    pais_id = models.UUIDField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"geo_ciudad"'


class GeoCanton(models.Model):
    id = models.UUIDField(primary_key=True)
    nombre = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    provincia = models.ForeignKey("GeoProvincia", models.DO_NOTHING, blank=True, null=True)
    estado = models.CharField(max_length=1)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    ciudad_id = models.UUIDField(blank=True, null=True)
    cod_inec_parroquia = models.CharField(max_length=4, blank=True, null=True)
    cod_inec_provincia = models.IntegerField(blank=True, null=True)
    cod_inec_canton = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"geo_canton"'
        #app_label = "sia_master"


class GeoParroquia(models.Model):
    id = models.UUIDField(primary_key=True)
    canton = models.ForeignKey("GeoCanton", models.DO_NOTHING, blank=True, null=True)
    nombre = models.TextField(blank=True, null=True)
    parroquia_tipo = models.ForeignKey("GeoParroquiaTipo", models.DO_NOTHING, blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    estado = models.CharField(max_length=1)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    cod_inec_provincia = models.IntegerField(blank=True, null=True)
    cod_inec_canton = models.IntegerField(blank=True, null=True)
    cod_inec_parroquia = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"geo_parroquia"'
        #app_label = "sia_master"

class GeoParroquiaTipo(models.Model):
    id = models.UUIDField(primary_key=True)
    nombre = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    estado = models.CharField(max_length=1)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"geo_parroquia_tipo"'
        #app_label = "sia_master"



class BioEspecie(models.Model):
    id = models.UUIDField(primary_key=True)
    tipo_especie = models.TextField(blank=True, null=True)
    clasificacion = models.TextField(blank=True, null=True)
    dominio = models.TextField(blank=True, null=True)
    reino = models.TextField(blank=True, null=True)
    filo = models.TextField(blank=True, null=True)
    subfilo = models.TextField(blank=True, null=True)
    clase = models.TextField(blank=True, null=True)
    orden = models.TextField(blank=True, null=True)
    familia = models.TextField(blank=True, null=True)
    genero = models.TextField(blank=True, null=True)
    especie = models.TextField(blank=True, null=True)
    nombre_cientifico = models.TextField(blank=True, null=True)
    nombre_comun = models.TextField(blank=True, null=True)
    procedencia = models.CharField(max_length=1, blank=True, null=True)
    registro_habilitado = models.CharField(max_length=1, blank=True, null=True)
    tipo_pesca = models.IntegerField(blank=True, null=True)
    grupopescaespecie_id = models.UUIDField(blank=True, null=True)
    agrupacion_mem = models.CharField(max_length=3, blank=True, null=True)
    agrupacion_cen = models.CharField(max_length=3, blank=True, null=True)
    codigo_interno = models.CharField(max_length=3, blank=True, null=True)
    referencia_joget_id = models.CharField(max_length=255, blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    estado = models.CharField(max_length=1)
    tipo_pesca_gmv = models.SmallIntegerField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    seleccionado = models.TextField(blank=True, null=True)
    cat_especie_cert_monitoreo = models.IntegerField(blank=True, null=True)
    categoria = models.TextField(blank=True, null=True)
    fecha_sincronizacion = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"bio_especie"'
        #app_label = "sia_master"


class PerPersona(models.Model):
    id = models.UUIDField(primary_key=True)
    tipo_persona = models.CharField(max_length=1)
    tipo_identificacion = models.CharField(max_length=1, blank=True, null=True)
    identificacion = models.CharField(max_length=32, blank=True, null=True)
    nombres = models.TextField(blank=True, null=True)
    apellidos = models.TextField(blank=True, null=True)
    sexo = models.CharField(max_length=1, blank=True, null=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    numero_hijos = models.IntegerField(blank=True, null=True)
    padre_id = models.UUIDField(blank=True, null=True)
    apodo = models.CharField(max_length=50, blank=True, null=True)
    direccion = models.TextField(blank=True, null=True)
    email = models.TextField(blank=True, null=True)
    telefono_convencional = models.CharField(max_length=60, blank=True, null=True)
    telefono_celular = models.CharField(max_length=20, blank=True, null=True)
    redes_sociales = models.TextField(blank=True, null=True)
    libreta_militar = models.TextField(blank=True, null=True)
    ciudad_nacimiento_id = models.UUIDField(blank=True, null=True)
    numero_residencia = models.TextField(blank=True, null=True)
    formacion_academica = models.TextField(blank=True, null=True)
    residentes_temporales = models.TextField(blank=True, null=True)
    estado_civil = models.CharField(max_length=3, blank=True, null=True)    # SIS_CATALOGO -> CATEGORIA: ESTADO_CIVIL
    tipo_sangre = models.TextField(blank=True, null=True)                   # SIS_CATALOGO -> CATEGORIA: TIPO_SANGRE
    lugar_nacimiento = models.TextField(blank=True, null=True)
    nivel_escolaridad = models.TextField(blank=True, null=True)             # SIS_CATALOGO -> CATEGORIA: ESCOLARIDAD_NIVEL
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    pais_nacimiento_id = models.UUIDField(blank=True, null=True)
    foto = models.TextField(blank=True, null=True)
    nombre_completo = models.TextField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id",related_name="geo_isla_usuario_ingreso_id")
    pais_residencia_id = models.UUIDField(blank=True, null=True)
    provincia_residencia_id = models.UUIDField(blank=True, null=True)
    ciudad_residencia_id = models.UUIDField(blank=True, null=True)
    isla_residencia_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    codigo_postal = models.TextField(blank=True, null=True)
    tratamiento_protocolario = models.CharField(max_length=5, blank=True, null=True)
    numero_fax = models.CharField(max_length=20, blank=True, null=True)
    migrar = models.BooleanField(blank=True, null=True)
    instruccion_academica = models.TextField(blank=True, null=True)
    tmp_pais_iso2 = models.TextField(blank=True, null=True)
    prev_id = models.IntegerField(blank=True, null=True)
    grado_academico = models.TextField(blank=True, null=True)
    categoria_migratoria = models.TextField(blank=True, null=True)
    email_text = models.TextField(blank=True, null=True)
    referencia_identificacion_text = models.TextField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    formacion_academica_opcional = models.TextField(blank=True, null=True)
    procesos_administrativos = models.IntegerField(blank=True, null=True)
    canton_residencia_id = models.UUIDField(blank=True, null=True)
    parroquia_residencia_id = models.UUIDField(blank=True, null=True)
    barrio  = models.TextField(blank=True, null=True)
    calle_principal   = models.TextField(blank=True, null=True)
    calle_secundaria  = models.TextField(blank=True, null=True)
    referencia  = models.TextField(blank=True, null=True, help_text="Referencia de Domicilio")
    etnias  = models.UUIDField(blank=True, null=True)
    tipo_residencia = models.UUIDField(blank=True, null=True) #SIS_CATALOGO: CATEGORIA: TIPO_RESIDENCIA
    estado_embarazo = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"per_persona"'
        #app_label = "sia_master"

    def __str__(self):
        nombres = apellidos = ""
        
        if self.nombres:
            nombres = self.nombres
        if self.apellidos:
            apellidos = self.apellidos

        return nombres + " " +apellidos


class SisCatalogo(models.Model):
    id = models.UUIDField(primary_key=True)
    categoria = models.TextField(blank=True, null=True)
    valor = models.TextField(blank=True, null=True)
    label = models.TextField(blank=True, null=True)
    orden = models.IntegerField(blank=True, null=True)
    grupo = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    observacionesdba = models.TextField(blank=True, null=True)
    observaciones1 = models.TextField(blank=True, null=True)
    orden2 = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"sis_catalogo"'
        #unique_together = (("categoria", "valor"),)
        #app_label = "sia_master"


class OrgTipo(models.Model):
    id = models.UUIDField(primary_key=True)
    eliminado = models.BooleanField()
    estado = models.CharField(max_length=1)
    nombre = models.TextField(blank=True, null=True)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"org_tipo"'
        #app_label = "sia_master"


class OrgOrganizacion(models.Model):
    MODULOS = (
        ("1","MATERIALES PETREOS"),
        
    )
    id = models.UUIDField(primary_key=True)
    nombre_comercial = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=1, blank=True, null=True)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    registro_turismo = models.TextField(blank=True, null=True)
    isla = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True)
    usuario_ingreso = models.TextField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    persona = models.ForeignKey("PerPersona", models.DO_NOTHING, blank=True, null=True)
    representante_id = models.UUIDField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    fecha_inactividad = models.DateField(blank=True, null=True)
    tipo_id = models.ForeignKey("OrgTipo", models.DO_NOTHING, blank=True, null=True,db_column="tipo_id",related_name="tipo_id")
    mision = models.TextField(blank=True, null=True)
    pagina_web = models.TextField(blank=True, null=True)
    siglas = models.TextField(blank=True, null=True)
    vision = models.TextField(blank=True, null=True)
    fecha_fundacion = models.DateField(blank=True, null=True)
    fecha_registro = models.DateField(blank=True, null=True)
    fecha_inicio_operaciones = models.DateField(blank=True, null=True)
    latitud = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    longitud = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    vehiculos = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    habitaciones = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    plazas = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    mesas = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    sillas = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    empleados = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    actividad = models.TextField(blank=True, null=True)
    isla_0 = models.TextField(db_column="isla", blank=True, null=True)  # Field renamed because of name conflict.
    tipo_text = models.TextField(blank=True, null=True)
    categoria = models.TextField(blank=True, null=True)
    distintivo = models.TextField(blank=True, null=True)
    propietario = models.TextField(blank=True, null=True)
    representante_legal = models.TextField(blank=True, null=True)
    migrar = models.BooleanField(blank=True, null=True)
    prev_id = models.IntegerField(blank=True, null=True)
    telefono = models.TextField(blank=True, null=True)
    direccion = models.TextField(blank=True, null=True)
    email = models.TextField(blank=True, null=True)
    modulo = models.TextField(blank=True, null=True,choices=MODULOS)

    class Meta:
        managed = False
        db_table = u'"master\".\"org_organizacion"'
        #app_label = "sia_master"


class DirOrganization(models.Model):
    id = models.CharField(primary_key=True, max_length=510)
    name = models.CharField(max_length=510, blank=True, null=True)
    description = models.CharField(max_length=510, blank=True, null=True)
    parentid = models.ForeignKey("self", models.DO_NOTHING, db_column="parentid", blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"dir_organization"'


class DirDepartment(models.Model):
    id = models.CharField(primary_key=True, max_length=510)
    name = models.CharField(max_length=510, blank=True, null=True)
    description = models.CharField(max_length=510, blank=True, null=True)
    organizationid = models.ForeignKey(DirOrganization, models.DO_NOTHING, db_column="organizationid", blank=True, null=True)
    parentid = models.ForeignKey("self", models.DO_NOTHING, db_column="parentid", blank=True, null=True)
    siglas = models.TextField(blank=True, null=True)
    tipo = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"public\".\"dir_department"'

    def __str__(self):
        return self.name


###############
# ADDING...
###############

"""
class UsuarioPerfil(models.Model):
    user = models.OneToOneField(User,related_name="usuarioperfil",on_delete=models.CASCADE)
    isla_usuario_ingreso = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id",related_name="isla_usuario_ingreso")
    fecha_ingreso = models.DateTimeField(auto_now_add=True,null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    observaciones = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.username

    class Meta:
        db_table = u'"master\".\"auth_user_detail"
        managed = True
"""

class SisSecuencia(models.Model):
    id = models.UUIDField(primary_key=True)
    codigo = models.TextField(blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    prefijo = models.TextField(blank=True, null=True)
    anio = models.IntegerField(blank=True, null=True)
    valor = models.IntegerField(blank=True, null=True)
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
        managed = True
        db_table = u'"master\".\"sis_secuencias"'


class WflTramites(models.Model):
    id = models.UUIDField(primary_key=True)
    
    descripcion = models.TextField(blank=True, null=True, help_text="Descripcion del Tramite")
    codigo = models.CharField(max_length=20,help_text="Codigo del Documento")
    fecha_inicial = models.DateTimeField(auto_now=True, null=True)
    solicitante = models.TextField(blank=True, null=True,help_text="Usuario del sistema")
    estado_tramite = models.CharField(max_length=3)
    fecha_vencimiento = models.DateTimeField(null=True)

    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    usuario_ingreso = models.TextField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    
    class Meta:
        managed = True
        db_table = u'"master\".\"wfl_tramites"'


class WflTramitesActividades(models.Model):
    id = models.UUIDField(primary_key=True)
    tramite_id = models.ForeignKey(WflTramites, models.DO_NOTHING, blank=True, null=True,db_column="tramite_id")

    descripcion = models.TextField(blank=True, null=True,help_text="Nombre de la Actividad, ejemplo: <rol>-<nombreActividad>")
    estado_tramite = models.CharField(max_length=3)

    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    usuario_ingreso = models.TextField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    
    class Meta:
        managed = True
        db_table = u'"master\".\"wfl_tramites_actividades"'



class OrgCompany(models.Model):
    id = models.UUIDField(primary_key=True)

    tipo = models.CharField(max_length=1)
    tipo_identificacion = models.CharField(max_length=1, blank=True, null=True)
    identificacion = models.CharField(max_length=32, blank=True, null=True)
    nombres = models.CharField(max_length=80, blank=True, null=True)


    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    usuario_ingreso = models.TextField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    
    class Meta:
        managed = True
        db_table = u'"master\".\"org_company"'



class PerTurista(models.Model):
    id = models.UUIDField(primary_key=True)
    tipo_persona = models.CharField(max_length=1)
    tipo_identificacion = models.CharField(max_length=1, blank=True, null=True)
    identificacion = models.CharField(max_length=32, blank=True, null=True)
    nombres = models.TextField(blank=True, null=True)
    apellidos = models.TextField(blank=True, null=True)
    sexo = models.CharField(max_length=1, blank=True, null=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    direccion = models.TextField(blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    ciudad_nacimiento_id = models.UUIDField(blank=True, null=True)
    formacion_academica = models.TextField(blank=True, null=True)
    estado_civil = models.CharField(max_length=1, blank=True, null=True)
    tipo_sangre = models.TextField(blank=True, null=True)
    lugar_nacimiento = models.TextField(blank=True, null=True)
    nivel_escolaridad = models.TextField(blank=True, null=True)
    
    pais_nacimiento_id = models.UUIDField(blank=True, null=True)
    foto = models.TextField(blank=True, null=True)
    nombre_completo = models.TextField(blank=True, null=True)
    pais_residencia_id = models.UUIDField(blank=True, null=True)
    provincia_residencia_id = models.UUIDField(blank=True, null=True)
    ciudad_residencia_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    codigo_postal = models.TextField(blank=True, null=True)
    tratamiento_protocolario = models.CharField(max_length=5, blank=True, null=True)
    migrar = models.BooleanField()
    instruccion_academica = models.TextField(blank=True, null=True)
    tmp_pais_iso2 = models.TextField(blank=True, null=True)
    prev_id = models.IntegerField(blank=True, null=True)
    grado_academico = models.TextField(blank=True, null=True)
    residentes_temporales = models.TextField(blank=True, null=True)

    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones_dba = models.TextField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    
    class Meta:
        managed = False
        db_table = u'"master\".\"per_turista"'


class SisParametrosConfig(models.Model):
    id = models.UUIDField(primary_key=True)
    categoria = models.TextField(blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    nombre = models.TextField(blank=True, null=True)

    valor = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    usuario_ingreso = models.TextField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = u'"master\".\"sis_parametros_config"'
