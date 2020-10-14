import uuid

# DJANGO
from django.db import models

# MODELS
from ap_talentohumano.models import PerFuncionario
from ap_base.models import GeoIsla, GeoSitio,PerPersona, DirDepartment

# AUDIT
from simple_history.models import HistoricalRecords


class PerGuiaInactividad(models.Model):
    id = models.UUIDField(primary_key=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    naturaleza = models.TextField(blank=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"per_guia_inactividad"'

class PerGuia(models.Model):
    id = models.UUIDField(primary_key=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    persona_id = models.ForeignKey(PerPersona, models.DO_NOTHING, db_column="persona_id", related_name="guia_persona_id", blank=True, null=True)
    usuario = models.TextField(blank=True, null=True)
    clave = models.TextField(blank=True, null=True)
    fecha_inicio_guia = models.DateField(blank=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    naturaleza_inactividad_id = models.ForeignKey(PerGuiaInactividad, models.DO_NOTHING, db_column="naturaleza_inactividad_id", related_name="guia_natu_inact_id", blank=True, null=True)
    migrar = models.BooleanField()
    prev_id = models.IntegerField(blank=True, null=True)
    pagos_pendientes = models.IntegerField(blank=True, null=True)
    registro_forestal = models.CharField(max_length=50, blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    observaciones0 = models.TextField(blank=True, null=True)
    observaciones1 = models.TextField(blank=True, null=True)
    modalidad_trabajo = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"per_guia"'


class LicGuiaCategoria(models.Model):
    id = models.UUIDField(primary_key=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    nombre = models.TextField(blank=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"lic_guia_categoria"'


class LicGuiaEspecializacion(models.Model):
    id = models.UUIDField(primary_key=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    nombre = models.TextField(blank=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    categoria_id = models.ForeignKey(LicGuiaCategoria, models.DO_NOTHING, db_column="categoria_id", related_name="guiaespe_categ_id", blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"lic_guia_especializacion"'


class LicGuiaEstadoCarnet(models.Model):
    id = models.UUIDField(primary_key=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    nombre = models.TextField(blank=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"lic_guia_estado_carnet"'


class LicGuia(models.Model):
    id = models.UUIDField(primary_key=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    guia_id = models.ForeignKey(PerGuia, models.DO_NOTHING, db_column="guia_id", related_name="lic_guia_id", blank=True, null=True)
    fecha_recepcion = models.DateField(blank=True, null=True)
    fecha_emision = models.DateField(blank=True, null=True)
    fecha_caducidad = models.DateField(blank=True, null=True)
    fecha_retiro = models.DateField(blank=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    estado_carnet_id = models.ForeignKey(LicGuiaEstadoCarnet, models.DO_NOTHING, db_column="estado_carnet_id", related_name="lic_estado_carnet_id", blank=True, null=True)
    asociacion_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    categoria_id = models.ForeignKey(LicGuiaCategoria, models.DO_NOTHING, db_column="categoria_id", related_name="lic_categoria_id", blank=True, null=True)
    especializacion_id = models.ForeignKey(LicGuiaEspecializacion, models.DO_NOTHING, db_column="especializacion_id", related_name="lic_especializacion_id", blank=True, null=True)
    num_licencia = models.TextField(blank=True, null=True)
    num_licencia_cod = models.TextField(blank=True, null=True)
    migrar = models.BooleanField()
    prev_estado_carnet = models.TextField(blank=True, null=True)
    prev_asociacion_guia = models.TextField(blank=True, null=True)
    prev_categoria_guia = models.TextField(blank=True, null=True)
    prev_especializacion_guia = models.TextField(blank=True, null=True)
    prev_guia_id = models.IntegerField(blank=True, null=True)
    prev_id = models.IntegerField(blank=True, null=True)
    data_qr = models.TextField(blank=True, null=True)
    observaciones0 = models.TextField(blank=True, null=True)
    observaciones1 = models.TextField(blank=True, null=True)
    motivo_inactividad = models.TextField(blank=True, null=True)
    tipo_tramite = models.TextField(blank=True, null=True)
    f_capacitacion = models.TextField(blank=True, null=True)
    f_competencias_laborales = models.TextField(blank=True, null=True)
    f_aventura_habilidades = models.TextField(blank=True, null=True)
    f_actualizacion = models.TextField(blank=True, null=True)
    aventura_modalidad = models.TextField(blank=True, null=True)
    f_idioma_ingles_b1 = models.TextField(blank=True, null=True)
    f_idioma_ingles_b2 = models.TextField(blank=True, null=True)
    f_idioma_otros_b1 = models.TextField(blank=True, null=True)
    f_idioma_otros = models.TextField(blank=True, null=True)
    f_doc_perdida_sustraccion = models.TextField(blank=True, null=True)
    f_credencial_deterioro = models.TextField(blank=True, null=True)
    sis7_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"lic_guia"'
        


# ---------------------------- VIEWS -----------------------------------
class VwUltimaslicenciasGuias(models.Model):
    id = models.UUIDField(db_column="id",primary_key=True)
    identificacion = models.TextField(db_column="identificacion", blank=True, null=True)
    nombres = models.TextField(db_column="nombres", blank=True, null=True)
    apellidos = models.TextField(db_column="apellidos", blank=True, null=True)
    nombre_completo = models.TextField(db_column="nombre_completo", blank=True, null=True)
    num_licencia = models.TextField(db_column="num_licencia", blank=True, null=True)
    especializacion = models.TextField(db_column="especializacion", blank=True, null=True)
    fecha_emision = models.DateField(db_column="fecha_emision",blank=True, null=True)
    fecha_caducidad = models.DateField(db_column="fecha_caducidad",blank=True, null=True)
    tipo_tramite = models.TextField(db_column="tipo_tramite", blank=True, null=True)
    estado = models.TextField(db_column="estado", blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
   
    class Meta:
        managed = False
        db_table = u'"master\".\"vw_ultimaslicencias_guias"'
