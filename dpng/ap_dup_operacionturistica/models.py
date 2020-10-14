import uuid

# DJANGO
from django.db import models

# MODELS
from ap_talentohumano.models import PerFuncionario
from ap_base.models import GeoIsla, GeoSitio,PerPersona, DirDepartment, GeoCiudad

# AUDIT
from simple_history.models import HistoricalRecords



class TprEmbarcacionActividad(models.Model):
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
        db_table = u'"master\".\"tpr_embarcacion_actividad"'


class TprEmbarcacion(models.Model):
    id = models.UUIDField(primary_key=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    actividad_id = models.ForeignKey(TprEmbarcacionActividad, models.DO_NOTHING, db_column="actividad_id", related_name="emb_actividad_id", blank=True, null=True)
    origen = models.CharField(max_length=1, blank=True, null=True)
    nombre = models.TextField(blank=True, null=True)
    num_matricula = models.TextField(blank=True, null=True)
    num_imo = models.TextField(blank=True, null=True)
    puerto_id = models.UUIDField(blank=True, null=True)
    num_pasajeros = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    tamanio = models.TextField(blank=True, null=True)
    tonelaje_bruto = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    tonelaje_neto = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    eslora = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    manga = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    calado = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    puntal = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    bandera_id = models.UUIDField(blank=True, null=True)
    foto = models.TextField(blank=True, null=True)
    fecha_registro = models.DateField(blank=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    migrar = models.BooleanField()
    text_bandera = models.TextField(blank=True, null=True)
    text_puerto = models.TextField(blank=True, null=True)
    num_motores = models.IntegerField(blank=True, null=True)
    text_maquinas = models.TextField(blank=True, null=True)
    text_motores_marca = models.TextField(blank=True, null=True)
    text_motores_potencia = models.TextField(blank=True, null=True)
    text_motores_beacon = models.TextField(blank=True, null=True)
    text_propietario = models.TextField(blank=True, null=True)
    text_razon_social = models.TextField(blank=True, null=True)
    prev_id = models.TextField(blank=True, null=True)
    aseguradora_id = models.UUIDField(blank=True, null=True)
    valor_asegurado = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    valor_prima = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    f_desde_seguro = models.DateField(blank=True, null=True)
    f_hasta_seguro = models.DateField(blank=True, null=True)
    foto_embarcacion1 = models.TextField(blank=True, null=True)
    foto_embarcacion2 = models.TextField(blank=True, null=True)
    foto_embarcacion3 = models.TextField(blank=True, null=True)
    foto_embarcacion4 = models.TextField(blank=True, null=True)
    es_nacional = models.BooleanField(blank=True, null=True)
    num_tripulantes = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"tpr_embarcacion"'


class PatRegistroForestalTipo(models.Model):
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
        db_table = u'"master\".\"pat_registro_forestal_tipo"'


class PatContratoTipo(models.Model):
    id = models.UUIDField(primary_key=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    nombre = models.TextField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"pat_contrato_tipo"'


class PatModalidadOperacion(models.Model):
    id = models.UUIDField(primary_key=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    nombre = models.TextField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    abreviacion = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"pat_modalidad_operacion"'



class PatEstadoPatente(models.Model):
    id = models.UUIDField(primary_key=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    nombre = models.TextField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    orden = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"pat_estado_patente"'


class RftRegistroEstado(models.Model):
    id = models.UUIDField(primary_key=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    nombre = models.TextField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"rft_registro_estado"'


class RftRegistro(models.Model):
    id = models.UUIDField(primary_key=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    fecha_emision = models.DateField(blank=True, null=True)
    fecha_caducidad = models.DateField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    num_mae = models.IntegerField(blank=True, null=True)
    num_png = models.IntegerField(blank=True, null=True)
    migrar = models.BooleanField(blank=True, null=True)
    prev_actual_rf_armador_id = models.IntegerField(blank=True, null=True)
    prev_asociacion_id = models.IntegerField(blank=True, null=True)
    prev_id = models.IntegerField(blank=True, null=True)
    ultimo_detalle_id = models.UUIDField(blank=True, null=True)
    fecha_suscripcion = models.DateField(blank=True, null=True)
    num_resolucion = models.TextField(blank=True, null=True)
    estado_registro_id = models.ForeignKey(RftRegistroEstado, models.DO_NOTHING, db_column="estado_registro_id", related_name="rft_estado_registro_id", blank=True, null=True)
    agrupada = models.BooleanField(blank=True, null=True)
    motivo_inactividad = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"rft_registro"'


class RftRegistroDetalle(models.Model):
    id = models.UUIDField(primary_key=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    registro_forestal_id = models.ForeignKey(RftRegistro, models.DO_NOTHING, db_column="registro_forestal_id", related_name="rftdtll_registro_forestal_id", blank=True, null=True)
    embarcacion_id = models.UUIDField(blank=True, null=True)
    prev_patente_id = models.IntegerField(blank=True, null=True)
    prev_rf_id = models.IntegerField(blank=True, null=True)
    prev_embarcacion_id = models.IntegerField(blank=True, null=True)
    prev_nm_embarcacion = models.TextField(blank=True, null=True)
    prev_razon_social = models.TextField(blank=True, null=True)
    prev_ruc = models.TextField(blank=True, null=True)
    prev_num_mae = models.TextField(blank=True, null=True)
    prev_num_png = models.TextField(blank=True, null=True)
    prev_fe_caducidad = models.DateField(blank=True, null=True)
    migrar = models.BooleanField(blank=True, null=True)
    prev_nm_tipos_modalidad_operacion = models.TextField(blank=True, null=True)
    prev_cd_tipos_modalidad_operacion = models.IntegerField(blank=True, null=True)
    modalidad_operacion_id = models.UUIDField(blank=True, null=True)
    fecha_registro = models.DateField(blank=True, null=True)
    titular_id = models.ForeignKey(PerPersona, models.DO_NOTHING, db_column="titular_id", related_name="rftdtll_titular_id", blank=True, null=True)
    fecha_inicial = models.DateField(blank=True, null=True)
    fecha_final = models.DateField(blank=True, null=True)
    motivo_inactividad = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"rft_registro_detalle"'


class RftRegistroCompuestoTipo(models.Model):
    id = models.UUIDField(primary_key=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    nombre = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"rft_registro_compuesto_tipo"'


class RftRegistroCompuesto(models.Model):
    id = models.UUIDField(primary_key=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    nombre = models.TextField(blank=True, null=True)
    tipo_id = models.ForeignKey(RftRegistroCompuestoTipo, models.DO_NOTHING, db_column="tipo_id", related_name="rftc_tipo_id",blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    estado_registro_id = models.UUIDField(blank=True, null=True)
    ultimo_detalle_id = models.UUIDField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"rft_registro_compuesto"'


class RftRegistroCompuestoDetalle(models.Model):
    id = models.UUIDField(primary_key=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    registro_compuesto_id = models.ForeignKey(RftRegistroCompuesto, models.DO_NOTHING, db_column="registro_compuesto_id", related_name="rftc_registro_compuesto_id",blank=True, null=True)
    embarcacion_id = models.ForeignKey(TprEmbarcacion, models.DO_NOTHING, db_column="embarcacion_id", related_name="rftc_embarcacion_id", blank=True, null=True)
    modalidad_operacion_id = models.ForeignKey(PatModalidadOperacion, models.DO_NOTHING, db_column="modalidad_operacion_id", related_name="rftc_modalidad_operacion_id",blank=True, null=True)
    titulares = models.TextField(blank=True, null=True)
    rf_ma_hist = models.TextField(blank=True, null=True)
    prev_embarcacion_id = models.IntegerField(blank=True, null=True)
    madalidad_operacion_text = models.TextField(blank=True, null=True)
    fecha_registro = models.DateField(blank=True, null=True)
    titular_id = models.UUIDField(blank=True, null=True)
    fecha_inicial = models.DateField(blank=True, null=True)
    fecha_final = models.DateField(blank=True, null=True)
    motivo_inactividad = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"rft_registro_compuesto_detalle"'




class PatPatente(models.Model):
    id = models.UUIDField(primary_key=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    fecha_expedicion = models.DateField(blank=True, null=True)
    fecha_vigencia = models.DateField(blank=True, null=True)
    fecha_caducidad = models.DateField(blank=True, null=True)
    modalidad_operacion_id = models.UUIDField(blank=True, null=True)
    embarcacion_id = models.ForeignKey(TprEmbarcacion, models.DO_NOTHING, db_column="embarcacion_id", related_name="pat_embarcacion_id", blank=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    tipo_registro_forestal_id = models.ForeignKey(PatRegistroForestalTipo, models.DO_NOTHING, db_column="tipo_registro_forestal_id", related_name="pat_tipo_registro_forestal_id",blank=True, null=True)
    deprecated_registro_forestal_unico_id = models.UUIDField(blank=True, null=True)
    deprecated_asociacion_registro_forestal_id = models.UUIDField(blank=True, null=True)
    nombre_patente = models.TextField(blank=True, null=True)
    tipo_contrato_id = models.ForeignKey(PatContratoTipo, models.DO_NOTHING, db_column="tipo_contrato_id", related_name="pat_tipo_contrato_id",blank=True, null=True)
    puerto_operacion_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, db_column="puerto_operacion_id", related_name="pat_puerto_operacion_id",blank=True, null=True)
    fecha_inicio_contrato = models.DateField(blank=True, null=True)
    fecha_fin_contrato = models.DateField(blank=True, null=True)
    num_especie = models.TextField(blank=True, null=True)
    num_comprobante = models.TextField(blank=True, null=True)
    puerto_registro_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, db_column="puerto_registro_id", related_name="pat_puerto_registro_id",blank=True, null=True)
    lugar_expedicion_id = models.ForeignKey(GeoCiudad, models.DO_NOTHING, db_column="lugar_expedicion_id", related_name="pat_lugar_expedicion_id",blank=True, null=True)
    estado_renovacion_id = models.UUIDField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    firmado_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, db_column="firmado_id", related_name="pat_firmado_id",blank=True, null=True)
    valor_pagado = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    renovada = models.BooleanField(blank=True, null=True)
    seleccionada = models.BooleanField(blank=True, null=True)
    verificada = models.BooleanField(blank=True, null=True)
    temporada = models.BooleanField(blank=True, null=True)
    num_patente = models.TextField(blank=True, null=True)
    estado_actual_id = models.ForeignKey(PatEstadoPatente, models.DO_NOTHING, db_column="estado_actual_id", related_name="pat_estado_actual_id",blank=True, null=True)
    descripcion_contrato = models.TextField(blank=True, null=True)
    cargo_responsable_id = models.UUIDField(blank=True, null=True)
    migrar = models.BooleanField(blank=True, null=True)
    prev_id = models.IntegerField(blank=True, null=True)
    prev_embarcacion_id = models.IntegerField(blank=True, null=True)
    tipo_contrato_text = models.TextField(blank=True, null=True)
    prev_asociacion_id = models.IntegerField(blank=True, null=True)
    prev_itinerario_id = models.IntegerField(blank=True, null=True)
    prev_registro_forestal_id = models.IntegerField(blank=True, null=True)
    puerto_registro_text = models.TextField(blank=True, null=True)
    rf_ma_hist = models.IntegerField(blank=True, null=True)
    rf_png_hist = models.IntegerField(blank=True, null=True)
    prev_rf_armador_id = models.IntegerField(blank=True, null=True)
    embarcacion_text = models.TextField(blank=True, null=True)
    prev_embarcacion_hist_id = models.IntegerField(blank=True, null=True)
    embarcacion_propietario_text = models.TextField(blank=True, null=True)
    bandera_text = models.TextField(blank=True, null=True)
    cargo_text = models.TextField(blank=True, null=True)
    autorizacion_text = models.TextField(blank=True, null=True)
    madalidad_operacion_text = models.TextField(blank=True, null=True)
    firma_text = models.TextField(blank=True, null=True)
    puerto_operacion_text = models.TextField(blank=True, null=True)
    lugar_expedicion_text = models.TextField(blank=True, null=True)
    registro_forestal_unico_id = models.ForeignKey(RftRegistroDetalle, models.DO_NOTHING, db_column="registro_forestal_unico_id", related_name="pat_registro_forestal_unico_id", blank=True, null=True)
    asociacion_registro_forestal_id = models.ForeignKey(RftRegistroCompuestoDetalle, models.DO_NOTHING, db_column="asociacion_registro_forestal_id", related_name="pat_asociacion_registro_forestal_id", blank=True, null=True)
    prev_ruc = models.TextField(blank=True, null=True)
    contribuyente_id = models.ForeignKey(PerPersona, models.DO_NOTHING, db_column="contribuyente_id", related_name="pat_contribuyente_id",blank=True, null=True)
    motivo_inactividad = models.TextField(blank=True, null=True)
    archivos_expedientes = models.TextField(blank=True, null=True)
    data_qr = models.TextField(blank=True, null=True)
    fecha_theos_factura = models.DateField(blank=True, null=True)
    sale_number = models.TextField(blank=True, null=True)
    sale_amount_total = models.TextField(blank=True, null=True)
    sale_porcentaje = models.IntegerField(blank=True, null=True)
    sale_estado = models.TextField(blank=True, null=True)
    sale_id = models.IntegerField(blank=True, null=True)
    credit_title_total = models.IntegerField(blank=True, null=True)
    credit_title_nro = models.TextField(blank=True, null=True)
    valor_patente = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"pat_patente"'

