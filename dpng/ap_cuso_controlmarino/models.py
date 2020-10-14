import uuid

# DJANGO
from django.db import models

# MODELS
from ap_talentohumano.models import PerFuncionario
from ap_base.models import GeoIsla, GeoSitio,PerPersona, DirDepartment, SisCatalogo,SisParametrosConfig
from ap_cuem_manejopesquero.models import AppFdTembarcacionpesca,AppFdTpermisopesca,AppFdTlicenciaparma
from ap_dup_guias.models import LicGuia
from ap_dup_operacionturistica.models import *
from ap_serv_ambientales.models import *

# AUDIT
from simple_history.models import HistoricalRecords

class CmnEmbarcacionesPatrulla(models.Model):
    
    id = models.UUIDField(primary_key=True)
    nombre = models.CharField(blank=True, null=True,max_length=200)
    tipo = models.CharField(max_length=100,blank=True, null=True)
    matricula = models.CharField(max_length=100,blank=True, null=True)
    nominativo = models.CharField(max_length=200,blank=True, null=True)
    velocidad = models.IntegerField(blank=True, null=True)
    num_tripulantes = models.IntegerField(blank=True, null=True)
    puerto_operacion_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, blank=True, null=True,db_column="puerto_operacion_id")
    combustible = models.CharField(max_length=200,blank=True, null=True)
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
        db_table = u'"master\".\"cmn_embarcaciones_patrulla"'


class CmnActavisitainspecEmbpesca(models.Model):

    TIPO = (
        ("B","BIEN(BODEGA)"),
        ("C","CONSULTORIA"),
    )

    id = models.UUIDField(primary_key=True)
    secuencia = models.CharField(max_length=50,blank=True, null=True)
    fecha = models.DateTimeField(blank=True, null=True)
    proceso_estatuto_id = models.ForeignKey(DirDepartment, models.DO_NOTHING, related_name="actvi_proceso_estatuto_id",blank=True, null=True,db_column="proceso_estatuto_id")
    subproceso_estatuto_id = models.ForeignKey(DirDepartment, models.DO_NOTHING, related_name="actvi_subproceso_estatuto_id",blank=True, null=True,db_column="subproceso_estatuto_id")
    sitio_inspeccion_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, db_column="sitio_inspeccion_id", blank=True, null=True,related_name="actinspesca_sitio_inspeccion_id" )
    latitud = models.TextField( blank=True, null=True)
    longitud = models.TextField(blank=True, null=True)
    permisopesca_id = models.ForeignKey(AppFdTpermisopesca, models.DO_NOTHING, db_column="permisopesca_id", blank=True, null=True,related_name="actinspesca_permisopesca_id" )
    capitan_id = models.ForeignKey(PerPersona, models.DO_NOTHING, db_column="capitan_id", blank=True, null=True,related_name="actinspesca_capitan_id" )
    num_tripulantes = models.CharField(max_length=3,null=True)
    ultimopuertovisitado_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, db_column="ultimopuertovisitado_id", blank=True, null=True,related_name="actinspesca_ultimopuertovisitado_id" ) 
    referencia = models.TextField(blank=True, null=True)
    guardaparque_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, related_name="actinspesca_guardaparque_id",blank=True, null=True,db_column="guardaparque_id")
    autoridadmaritima_id = models.ForeignKey(PerPersona, models.DO_NOTHING, db_column="autoridadmaritima_id", blank=True, null=True,related_name="actinspesca_autoridadmaritima_id" )

    
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    #history = HistoricalRecords(table_name='"audit\".\"cmn_actavisitainspec_embpesca"')

    

    class Meta:
        managed = True
        db_table = u'"master\".\"cmn_actavisitainspec_embpesca"'



class CmnActavisitainspecEmbPescaTripulacion(models.Model):

    id = models.UUIDField(primary_key=True)

    parma_id = models.ForeignKey(AppFdTlicenciaparma, models.DO_NOTHING, db_column="parma_id", blank=True, null=True,related_name="actinspescatrip_parma_id" ) 
    cab_actpescaemb_id = models.ForeignKey(CmnActavisitainspecEmbpesca, models.DO_NOTHING, blank=True, null=True,db_column="cab_actpescaemb_id",related_name="det_tripulacion")
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    #history = HistoricalRecords(table_name='"audit\".\"cmn_actavisitainspec_embpesca"')

    

    class Meta:
        managed = True
        db_table = u'"master\".\"cmn_actavisitainspec_embpesca_tripulacion"'



class CmnActavisitainspecEmbPescaObservaciones(models.Model):

    id = models.UUIDField(primary_key=True)
    cab_actpescaemb_id = models.ForeignKey(CmnActavisitainspecEmbpesca, models.DO_NOTHING, blank=True, null=True,db_column="cab_actpescaemb_id",related_name="det_observaciones" )
    observacion_id = models.ForeignKey(SisCatalogo, models.DO_NOTHING, db_column="observacion_id", blank=True, null=True) 
    respuesta = models.BooleanField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)

    #history = HistoricalRecords(table_name='"audit\".\"cmn_actavisitainspec_embpesca"')

    

    class Meta:
        managed = True
        db_table = u'"master\".\"cmn_actavisitainspec_embpesca_observacion"'



class CmnActaInspecEmbarTuristica(models.Model):

    TIPO = (
        ("B","BIEN(BODEGA)"),
        ("C","CONSULTORIA"),
    )

    id = models.UUIDField(primary_key=True)
    secuencia = models.CharField(max_length=50,blank=True, null=True)
    fecha = models.DateTimeField(blank=True, null=True)
    proceso_estatuto_id = models.ForeignKey(DirDepartment, models.DO_NOTHING, related_name="actinspec_proceso_estatuto_id",blank=True, null=True,db_column="proceso_estatuto_id")
    subproceso_estatuto_id = models.ForeignKey(DirDepartment, models.DO_NOTHING, related_name="actinspec_subproceso_estatuto_id",blank=True, null=True,db_column="subproceso_estatuto_id")
    sitio_inspeccion_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, db_column="sitio_inspeccion_id", blank=True, null=True,related_name="actinspec_sitio_inspeccion_id" )
    latitud = models.TextField( blank=True, null=True)
    longitud = models.TextField(blank=True, null=True)
    #permisopesca_id = models.ForeignKey(AppFdTpermisopesca, models.DO_NOTHING, db_column="permisopesca_id", blank=True, null=True,related_name="actinspec_permisopesca_id" )
    embarcacion_id = models.ForeignKey(PatPatente, models.DO_NOTHING, db_column="embarcacion_id", blank=True, null=True )
    capitan_id = models.ForeignKey(PerPersona, models.DO_NOTHING, db_column="capitan_id", blank=True, null=True,related_name="actinspec_capitan_id" )
    num_tripulantes = models.CharField(max_length=3,null=True)
    ultimopuertovisitado_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, db_column="ultimopuertovisitado_id", blank=True, null=True,related_name="actinspec_ultimopuertovisitado_id" ) 
    referencia = models.TextField(blank=True, null=True)
    guardaparque_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, related_name="actainspec_guardaparque_id",blank=True, null=True,db_column="guardaparque_id")
    autoridadmaritima_id = models.ForeignKey(PerPersona, models.DO_NOTHING, db_column="autoridadmaritima_id", blank=True, null=True,related_name="actinspec_autoridadmaritima_id" )
  
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
        db_table = u'"master\".\"cmn_actainspec_embturistica"'


class CmnActaInspecEmbarTuristicaTripulacion(models.Model):

    id = models.UUIDField(primary_key=True)

    licguia_id = models.ForeignKey(LicGuia, models.DO_NOTHING, db_column="licguia_id", blank=True, null=True,related_name="actinspescatrip_parma_id" ) 
    cab_actinspecemb_id = models.ForeignKey(CmnActaInspecEmbarTuristica, models.DO_NOTHING, blank=True, null=True,db_column="cab_actinspecemb_id",related_name="det_tripulacion")
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
        db_table = u'"master\".\"cmn_actainspec_embturistica_tripulacion"'


class CmnActaInspecEmbarTuristicaObservaciones(models.Model):

    id = models.UUIDField(primary_key=True)
    cab_actinspecemb_id = models.ForeignKey(CmnActaInspecEmbarTuristica, models.DO_NOTHING, blank=True, null=True,db_column="cab_actinspecemb_id",related_name="det_observaciones" )
    observacion_id = models.ForeignKey(SisCatalogo, models.DO_NOTHING, db_column="observacion_id", blank=True, null=True) 
    respuesta = models.BooleanField(blank=True, null=True)
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
        db_table = u'"master\".\"cmn_actainspec_embturistica_observacion"'


class CmnInformeNovedades(models.Model):
    id = models.UUIDField(primary_key=True)
    numero = models.CharField(max_length=1000, blank=True, null=True)
    oficina_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="oficina_id",related_name="oficina_id")
    proceso = models.TextField(blank=True, null=True)
    subproceso = models.TextField(blank=True, null=True)
    sitio_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, blank=True, null=True,db_column="sitio_id")
    actividad = models.CharField(max_length=1000, blank=True, null=True)
    
    fecha_elaboracion = models.DateField(blank=True, null=True)
    transporte_id = models.ForeignKey(TrpVehiculo, models.DO_NOTHING, blank=True, null=True,db_column="transporte_id")
    embarcacion_id = models.ForeignKey(CmnEmbarcacionesPatrulla, models.DO_NOTHING, blank=True, null=True,db_column="embarcacion_id")
    transporte_otro = models.TextField(blank=True, null=True)
    introduccion = models.TextField(blank=True, null=True)
    objetivos_gen = models.TextField(blank=True, null=True)
    objetivos_esp = models.TextField(blank=True, null=True)
    materiales = models.TextField(blank=True, null=True)
    metodologia = models.TextField(blank=True, null=True)
    desarrollo = models.TextField(blank=True, null=True)
    resultados = models.TextField(blank=True, null=True)
    consclusiones = models.TextField(blank=True, null=True)
    recomendaciones = models.TextField(blank=True, null=True)
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
        db_table = u'"master\".\"cmn_informe_novedades"'

class CmnInformeNovedadesDetalle(models.Model):
    id = models.UUIDField(primary_key=True)
    cab_infnovedades_id = models.ForeignKey(CmnInformeNovedades, models.DO_NOTHING, blank=True, null=True,db_column="cab_infnovedades_id",related_name="det_infnovedades_cuso")
    foto = models.CharField(max_length=1000, blank=True, null=True)
    comentario = models.TextField(blank=True, null=True)
    orden = models.IntegerField(blank=True, null=True)
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
        db_table = u'"master\".\"cmn_informe_novedades_detalle"'

class CmnInformeNovedadesParticipantes(models.Model):
    id = models.UUIDField(primary_key=True)
    cab_infnovedades_id = models.ForeignKey(CmnInformeNovedades, models.DO_NOTHING, blank=True, null=True,db_column="cab_infnovedades_id",related_name="det_infnovedadespar_cuso")
    funcionario_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="funcionario_id")
    persona_id = models.ForeignKey(PerPersona, models.DO_NOTHING, db_column="persona_id", blank=True, null=True)
    tipo = models.CharField(max_length=1, blank=True, null=True)
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
        db_table = u'"master\".\"cmn_informe_novedades_participantes"'

class CmnInformeMonitoreo(models.Model):
    id = models.UUIDField(primary_key=True)
    numero = models.CharField(max_length=1000, blank=True, null=True)
    direccion = models.TextField(blank=True, null=True)
    proceso = models.TextField(blank=True, null=True)
    subproceso = models.TextField(blank=True, null=True)
    asunto = models.TextField(blank=True, null=True)
    funcionario_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="funcionario_id",related_name="infomon_funcionario_id")
    fecha_presentacion = models.DateField(blank=True, null=True)
    introduccion = models.TextField(blank=True, null=True)
    desarrollo = models.TextField(blank=True, null=True)
    actividad_observada = models.TextField(blank=True, null=True)
    conclusiones = models.TextField(blank=True, null=True)
    recomendaciones = models.TextField(blank=True, null=True)
    observacionesR = models.TextField(blank=True, null=True)
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
        db_table = u'"master\".\"cmn_informe_monitoreo"'

class CmnInformeMonitoreoDetalle(models.Model):
    id = models.UUIDField(primary_key=True)
    cab_infmonitoreo_id = models.ForeignKey(CmnInformeMonitoreo, models.DO_NOTHING, blank=True, null=True,db_column="cab_infmonitoreo_id",related_name="det_infmonitoreo_id")
    foto = models.CharField(max_length=1000, blank=True, null=True)
    comentario = models.TextField(blank=True, null=True)
    orden = models.IntegerField(blank=True, null=True)
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
        db_table = u'"master\".\"cmn_informe_monitoreo_detalle"'



class CmnPlanPatrulla(models.Model):
    id = models.UUIDField(primary_key=True)
    numero = models.CharField(max_length=1000, blank=True, null=True)
    embarcacion_id = models.ForeignKey(CmnEmbarcacionesPatrulla, models.DO_NOTHING, blank=True, null=True,db_column="embarcacion_id")
    islas = models.TextField(blank=True, null=True)
    sitios = models.TextField(blank=True, null=True)
    total_millas = models.TextField(blank=True, null=True)
    tiempo_operacion = models.TextField(blank=True, null=True)
    fecha_inicio = models.DateTimeField(blank=True, null=True)
    fecha_fin = models.DateTimeField(blank=True, null=True)
    responsable_id = models.ForeignKey(PerPersona, models.DO_NOTHING, blank=True, null=True,db_column="responsable_id")
    cargo = models.TextField(blank=True, null=True)
    elaborado1_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="elaborado1_id", related_name="elaborado1_id")
    elaborado2_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="elaborado2_id", related_name="elaborado2_id")
    autorizado_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="autorizado_id", related_name="autorizado_id")
    lider_id      = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="lider_id", related_name="lider_id")
    descripcion = models.TextField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
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
        db_table = u'"master\".\"cmn_plan_patrulla"'

class CmnPlanPatrullaDetalle(models.Model):
    id = models.UUIDField(primary_key=True)
    cab_planpatrulla_id = models.ForeignKey(CmnPlanPatrulla, models.DO_NOTHING, blank=True, null=True,db_column="cab_planpatrulla_id",related_name="det_planpatrulla_id")
    foto = models.CharField(max_length=1000, blank=True, null=True)
    comentario = models.TextField(blank=True, null=True)
    orden = models.IntegerField(blank=True, null=True)
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
        db_table = u'"master\".\"cmn_plan_patrulla_detalle"'


class CmnProductosRetencion(models.Model):
    id = models.UUIDField(primary_key=True)
    descripcion = models.CharField(max_length=1000, blank=True, null=True)
    tipo = models.CharField(max_length=1000, blank=True, null=True)
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
        db_table = u'"master\".\"cmn_productos_retencion"'

class CmnActaRetencion(models.Model):
    id = models.UUIDField(primary_key=True)
    numero = models.CharField(max_length=1000, blank=True, null=True)
    acta_inspeccion_id = models.ForeignKey(CmnActavisitainspecEmbpesca, models.DO_NOTHING, blank=True, null=True,db_column="acta_inspeccion_id")
    tipo_retencion = models.CharField(max_length=2, blank=True, null=True)
    testigo_id = models.ForeignKey(PerPersona, models.DO_NOTHING, db_column="testigo_id", blank=True, null=True)
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
        db_table = u'"master\".\"cmn_acta_retencion"'


class CmnProductosActaRetencion(models.Model):
    id = models.UUIDField(primary_key=True)
    acta_retencion_id = models.ForeignKey(CmnActaRetencion, models.DO_NOTHING, blank=True, null=True,db_column="acta_retencion_id",related_name="det_productos")
    producto_id = models.ForeignKey(CmnProductosRetencion, models.DO_NOTHING, blank=True, null=True,db_column="producto_id")
    cantidad = models.IntegerField(blank=True, null=True)
    estado_producto = models.CharField(max_length=1,blank=True, null=True)
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
        db_table = u'"master\".\"cmn_productos_acta_retencion"'

class CmnParticipantesActaRetencion(models.Model):
    id = models.UUIDField(primary_key=True)
    acta_retencion_id = models.ForeignKey(CmnActaRetencion, models.DO_NOTHING, blank=True, null=True,db_column="acta_retencion_id",related_name="det_participantes")
    funcionario_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="funcionario_id")
    persona_id = models.ForeignKey(PerPersona, models.DO_NOTHING, db_column="persona_id", blank=True, null=True)
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
        db_table = u'"master\".\"cmn_participantes_acta_retencion"'


class CmnImplicadosActaRetencion(models.Model):
    id = models.UUIDField(primary_key=True)
    acta_retencion_id = models.ForeignKey(CmnActaRetencion, models.DO_NOTHING, blank=True, null=True,db_column="acta_retencion_id",related_name="det_implicados")
    parma_id = models.ForeignKey(AppFdTlicenciaparma, models.DO_NOTHING, blank=True, null=True,db_column="parma_id")
    persona_id = models.ForeignKey(PerPersona, models.DO_NOTHING, db_column="persona_id", blank=True, null=True)
    resistencia =models.BooleanField(blank=True, null=True)
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
        db_table = u'"master\".\"cmn_implicados_acta_retencion"'


class CmnControlPersonal(models.Model):
    id = models.UUIDField(primary_key=True)
    funcionario_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="funcionario_id")
    dias_actividad = models.TextField(blank=True, null=True)
    anio = models.IntegerField(blank=True, null=True)
    mes = models.IntegerField(blank=True, null=True)
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
        db_table = u'"master\".\"cmn_control_personal"'


class CmnEmbarcacionesExternas(models.Model):
    id = models.UUIDField(primary_key=True)
    nombre = models.TextField()
    matricula = models.TextField(blank=True, null=True)
    num_tripulante = models.IntegerField(blank=True, null=True)
    nombre_capitan = models.TextField(blank=True, null=True)
    cedula_capitan = models.TextField(blank=True, null=True)
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
        db_table = u'"master\".\"cmn_embarcaciones_externas"'


class CmnCamaras(models.Model):
    id = models.UUIDField(primary_key=True)
    descripcion = models.CharField(max_length=20)
    
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
        db_table = u'"master\".\"cmn_camaras"'


class CmnCmonitReporteDiario(models.Model):
    id = models.UUIDField(primary_key=True)
    num_reporte = models.CharField(max_length=20,blank=True, null=True)
    titulo = models.TextField(blank=True, null=True)
    fecha_reporte = models.DateTimeField(auto_now_add=True, null=True)
    fecha_desde = models.DateTimeField(auto_now_add=True, null=True)
    fecha_hasta = models.DateTimeField(auto_now_add=True, null=True)
    funcionario_id_de = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="funcionario_id_de", related_name='funcionario_id_de')
    funcionario_id_para = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="funcionario_id_para" , related_name='funcionario_id_para')
    funcionario_id_cc1 = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="funcionario_id_cc1" , related_name='funcionario_id_cc1')
    funcionario_id_cc2 = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="funcionario_id_cc2" , related_name='funcionario_id_cc2')
    conclusiones = models.TextField(blank=True, null=True)

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
        db_table = u'"master\".\"cmn_cmonit_reportediario"'


class CmnCmonitReporteDiarioCamaras(models.Model):
    id = models.UUIDField(primary_key=True)
    reporte_id = models.ForeignKey(CmnCmonitReporteDiario, models.DO_NOTHING, blank=True, null=True,db_column="reporte_id",related_name="det_camaras")
    camara_id = models.ForeignKey(CmnCamaras, models.DO_NOTHING, blank=True, null=True,db_column="camara_id")
    preguntas = models.TextField(blank=True, null=True)
    
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
        db_table = u'"master\".\"cmn_cmonit_reportediario_camaras"'


class CmnCmonitReporteDiarioImagenes(models.Model):
    id = models.UUIDField(primary_key=True)
    reporte_id = models.ForeignKey(CmnCmonitReporteDiario, models.DO_NOTHING, blank=True, null=True,db_column="reporte_id",related_name="det_imagenes")
    titulo = models.TextField(blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    imagen = models.TextField(blank=True, null=True)
    orden  = models.IntegerField(blank=True, null=True)
    
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
        db_table = u'"master\".\"cmn_cmonit_reportediario_imagenes"'        


class CmnCmonitReporteDiarioEmbarcaciones(models.Model):
    id = models.UUIDField(primary_key=True)
    reporte_id = models.ForeignKey(CmnCmonitReporteDiario, models.DO_NOTHING, blank=True, null=True,db_column="reporte_id",related_name="det_embarcaciones")
    tipo_embarcacion_id = models.ForeignKey(TprEmbarcacionActividad, models.DO_NOTHING, blank=True, null=True,db_column="tipo_embarcacion_id")
    cantidad = models.TextField(blank=True, null=True)
    tipo = models.CharField(blank=True, null=True,max_length=1)
    
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
        db_table = u'"master\".\"cmn_cmonit_reportediario_embarcaciones"'  


class CmnCmonitReporteDiarioEmbarcacionesActividad(models.Model):
    id = models.UUIDField(primary_key=True)
    reporte_id = models.ForeignKey(CmnCmonitReporteDiario, models.DO_NOTHING, blank=True, null=True,db_column="reporte_id",related_name="det_embarcacionesact")
    embarcacion_id = models.ForeignKey(CmnEmbarcacionesPatrulla, models.DO_NOTHING, blank=True, null=True,db_column="embarcacion_id")
    actividad_id = models.CharField(max_length=5,blank=True, null=True)
    fecha_reporte = models.DateTimeField(auto_now_add=True, null=True)
    sitio_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, blank=True, null=True,db_column="sitio_id")
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
        db_table = u'"master\".\"cmn_cmonit_reportediario_embarcaciones_actividad"'  

class CmnCmonitReporteDiarioSistemas(models.Model):
    id = models.UUIDField(primary_key=True)
    reporte_id = models.ForeignKey(CmnCmonitReporteDiario, models.DO_NOTHING, blank=True, null=True,db_column="reporte_id",related_name="det_sistema")
    sistema_id = models.CharField(max_length=5,blank=True, null=True)
    estado_id = models.CharField(max_length=5,blank=True, null=True)
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
        db_table = u'"master\".\"cmn_cmonit_reportediario_sistemas"'  

