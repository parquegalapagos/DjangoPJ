import uuid

# DJANGO
from django.db import models

# MODELS
from ap_talentohumano.models import PerFuncionario
from ap_base.models import GeoIsla

# AUDIT
from simple_history.models import HistoricalRecords


class DafCertificaciones(models.Model):
    ESTADO_TRAMITE = (
        ("B","BORRADOR"),
        ("T","EN TRAMITE"),
        ("A","APROBADO"),
        ("D","DEVUELTO"),
        ("C","CANCELADO"),
        ("F","FINALIZADO"),
        ("R","REASIGNADO"),
    )

    TIPO = (
        ("B","BIEN(BODEGA)"),
        ("C","CONSULTORIA"),
        ("O","OBRA CIVIL"),
        ("S","SERVICIO"),
    )

    REVISION = (
        ("M","MANTENIMIENTO"),
        ("O","OBRA CIVIL"),
        ("T","TIC"),
        ("N","NINGUNO"),
    )

    id = models.UUIDField(primary_key=True)
    secuencia = models.CharField(max_length=50,blank=True, null=True)
    tipo = models.CharField(max_length=2,null=True, choices=TIPO)
    tipo_revision = models.CharField(max_length=2,null=True, choices=REVISION)
    titulo = models.CharField(max_length=500)
    descripcion = models.TextField(blank=True, null=True)
    monto = models.DecimalField(max_digits=15, decimal_places=2, null=True)
    fecha_solicitud = models.DateField(blank=True, null=True)
    archivos = models.TextField(blank=True, null=True)
    archivos_proformas = models.TextField(blank=True, null=True)
    archivos_otros = models.TextField(blank=True, null=True)
    archivos_certificacion = models.TextField(blank=True, null=True)
    
    doc_tic = models.TextField(blank=True, null=True)
    doc_mantenimiento = models.TextField(blank=True, null=True)
    doc_obracivil = models.TextField(blank=True, null=True)

    func_solicitante_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="func_solicitante_id",related_name="func_solicitante_id")
    obs_solicitante = models.TextField(blank=True, null=True)
    func_dirarea_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="func_dirarea_id",related_name="func_dirarea_id")
    catalogo_elect = models.BooleanField(null=True,help_text="Existe bien o Servicio en catalogo Electronico")

    func_reasignado_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="func_reasignado_id",related_name="func_reasignado_id")

    aprobar_dirarea = models.BooleanField(null=True)
    aprobar_tic = models.BooleanField(null=True)
    aprobar_mantenimiento = models.BooleanField(null=True)
    aprobar_obracivil = models.BooleanField(null=True)
    #aprobar_bodega = models.BooleanField(null=True)
    aprobar_compraspub = models.BooleanField(null=True)
    aprobar_respac = models.BooleanField(null=True)
    aprobar_planificacion = models.BooleanField(null=True)
    aprobar_presupuesto = models.BooleanField(null=True)
    aprobar_adminfinanciero = models.BooleanField(null=True)
    estado_tramite = models.CharField(max_length=20,null=True, choices=ESTADO_TRAMITE)
    
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    history = HistoricalRecords(table_name='"audit\".\"daf_certificaciones"')

    

    class Meta:
        managed = True
        db_table = u'"master\".\"daf_certificaciones"'



class DafCertificacionesDetalles(models.Model):
    ESTADO_TRAMITE = (
        ("B","BORRADOR"),
        ("T","EN TRAMITE"),
        ("A","APROBADO"),
        ("D","DEVUELTO"),
        ("C","CANCELADO"),
        ("R","REASIGNADO"),
        ("F","FINALIZADO"),
    )
    
    id = models.UUIDField(primary_key=True)
    daf_certificaciones_id = models.ForeignKey(DafCertificaciones, models.DO_NOTHING, blank=True, null=True,db_column="daf_certificaciones_id",related_name="det_certificaciones")
    funcionario_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="funcionario_id",related_name="daf_cert_det_funcionario_id")
    fecha_observacion = models.DateField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    estado_tramite = models.CharField(max_length=20,null=True, choices=ESTADO_TRAMITE)

    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"daf_certificaciones_detalles"')

    class Meta:
        managed = True
        db_table = u'"master\".\"daf_certificaciones_detalles"'
        ordering = ['-fecha_ingreso']



