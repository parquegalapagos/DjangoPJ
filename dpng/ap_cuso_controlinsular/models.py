import uuid

# DJANGO
from django.db import models

# MODELS
from ap_talentohumano.models import PerFuncionario
from ap_base.models import GeoIsla, GeoSitio,PerPersona, DirDepartment,PerTurista,SisCatalogo,BioEspecie,SisParametrosConfig
from ap_cuem_manejopesquero.models import AppFdTembarcacionpesca,AppFdTpermisopesca,AppFdTlicenciaparma
from ap_dup_guias.models import PerGuia,LicGuia
from ap_dup_operacionturistica.models import PatPatente
from ap_serv_ambientales.models import TrpVehiculo
# AUDIT
from simple_history.models import HistoricalRecords


class CinControlturistas(models.Model):
    id = models.UUIDField(primary_key=True)
    fecha = models.DateTimeField(blank=True, null=True,db_column="fecha")
    guardaparque_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, db_column="guardaparque_id", related_name="cta_guardaparque_id", blank=True, null=True)
    lugar_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, db_column="lugar_id", blank=True, null=True,related_name="cta_lugar_id" )
    subproceso_id = models.ForeignKey(DirDepartment, models.DO_NOTHING, db_column="subproceso_id", blank=True, null=True,related_name="cta_subproceso_id")
    existe_guiaturistico = models.BooleanField(null=True,default=False)

    lic_guia_id = models.ForeignKey(LicGuia, models.DO_NOTHING, db_column="lic_guia_id", related_name="cta_lic_guia_id", blank=True, null=True, help_text="Guia turistico")
    guia_con_uniforme = models.BooleanField(blank=True, null=True, default=True, db_column="guia_con_uniforme")
    pasajero_id = models.ForeignKey(PerPersona, models.DO_NOTHING, db_column="pasajero_id", related_name="cta_pasajero_id", blank=True, null=True,help_text="La persona representante del grupo sin guia")
    num_pasajeros = models.IntegerField(blank=True, null=True, db_column="num_pasajeros")
    nombre_foto = models.TextField(blank=True, null= True)
    foto = models.TextField(blank=True, null= True)

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
        managed = False
        db_table = u'"master\".\"cin_controlturista"'

class CinControlturistasSitios(models.Model):
    id = models.UUIDField(primary_key=True)

    controlturistas_id = models.ForeignKey(CinControlturistas, models.DO_NOTHING, db_column="controlturistas_id", related_name="controlturistas_id", blank=True, null=True)
    sitiovisita_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, db_column="sitiovisita_id", related_name="ctguia_sitiovisita_id" , blank=True, null=True)

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
        managed = False
        db_table = u'"master\".\"cin_controlturista_sitios"'


class CinControlPesca(models.Model):
    id = models.UUIDField(primary_key=True)
    fecha = models.DateTimeField(blank=True, null=True,db_column="fecha")
    lugar_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, db_column="lugar_id", blank=True, null=True,related_name="ctpesca_lugar_id" )
    guardaparque_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, db_column="guardaparque_id", related_name="ctpesca_guardaparque_id", blank=True, null=True)
    subproceso_id = models.ForeignKey(DirDepartment, models.DO_NOTHING, db_column="subproceso_id", blank=True, null=True,related_name="ctpesca_subproceso_id" )
    parma_id = models.ForeignKey(AppFdTlicenciaparma, models.DO_NOTHING, db_column='parma_id',related_name='ctpesca_parma_id', blank=True, null=True)
    ident_conductor = models.CharField(max_length=10, blank=True, null=True,db_column="cedula_conductor")
    nombres_conductor = models.CharField(max_length=255, blank=True, null=True,db_column="nombres_conductor")
    apellidos_conductor = models.CharField(max_length=255, blank=True, null=True,db_column="apellidos_conductor")
    nombre_foto = models.TextField(blank=True, null= True)
    foto = models.TextField(blank=True, null= True)
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
        managed = False
        db_table = u'"master\".\"cin_controlpesca"'


class CinControlPescaEspecie(models.Model):
    id = models.UUIDField(primary_key=True)
    controlpesca_id = models.ForeignKey(CinControlPesca, models.DO_NOTHING, db_column="controlpesca_id", related_name="cpcontrolpesca_id", blank=True, null=True)
    especie_id = models.ForeignKey(BioEspecie, models.DO_NOTHING, db_column="especie_id", related_name="cpespecie_id" , blank=True, null=True)
    unidad = models.PositiveIntegerField(blank=True, null=True,db_column="unidad")
    peso = models.DecimalField(max_digits=1000,decimal_places=2,blank=True, null=True,db_column="peso")
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
        managed = False
        db_table = u'"master\".\"cin_controlpesca_especies"'


class CinInspeccionContenedores(models.Model):
    id = models.UUIDField(primary_key=True)
    fecha = models.DateTimeField(blank=True, null=True,db_column="fecha")
    lugar_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, db_column="lugar_id",related_name="ccont_lugar_id", blank=True, null=True )
    guardaparque_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, db_column="guardaparque_id", related_name="ccont_guardaparque_id", blank=True, null=True )
    subproceso_id = models.ForeignKey(DirDepartment, models.DO_NOTHING, db_column="subproceso_id",related_name="ccont_subproceso_id", blank=True, null=True )
    embarcacion = models.CharField(max_length=1, blank=True, null=True,db_column="embarcacion")
    cod_contenedor  = models.CharField(max_length=50,blank=True, null=True,help_text="NRO.CÓDIGO SEGURIAD/ CONTENEDOR")
    num_bultos  = models.IntegerField(blank=True, null=True)
    nombre_foto = models.TextField(blank=True, null= True)
    foto = models.TextField(blank=True, null= True)
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
        managed = False
        db_table = u'"master\".\"cin_inspeccioncontenedores"'

class CinControlAeropuerto(models.Model):
    id = models.UUIDField(primary_key=True)
    fecha = models.DateTimeField(blank=True, null=True,db_column="fecha")
    lugar_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, db_column="lugar_id",related_name="capp_lugar_id", blank=True, null=True)
    funcionarios_id = models.TextField(blank=True, null=True, db_column="funcionarios_id")
    funcionarios_nombre = models.TextField(blank=True, null=True, db_column="funcionarios_nombre")
    personal_otro = models.TextField(blank=True, null=True)
    area_trabajo = models.CharField(max_length=1, blank=True, null=True,db_column="area_trabajo")
    num_equipajes_inspec = models.PositiveIntegerField(blank=True, null=True, db_column="num_equipajes_inspec")
    num_cargas_inspec = models.PositiveIntegerField(blank=True, null=True, db_column="num_cargas_inspec")
    nombre_foto = models.TextField(blank=True, null= True)
    foto = models.TextField(blank=True, null= True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"cin_control_aeropuerto"'



class CinControlAeropuertoGuia(models.Model):
    id = models.UUIDField(primary_key=True)
    controlaerop_id = models.ForeignKey(CinControlAeropuerto, models.DO_NOTHING, db_column="controlaerop_id", related_name="ctapg_controlaerop_id", blank=True, null=True)
    guia = models.CharField(max_length=50, blank=True, null=True,db_column="guia")
    tipo_guia = models.CharField(max_length=1, blank=True, null=True,db_column="tipo_guia")
    tipo_pesca = models.CharField(max_length=1, blank=True, null=True,db_column="tipo_pesca")
    peso = models.DecimalField(max_digits=1000,decimal_places=2,blank=True,null=True,db_column="peso")
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"cin_control_aeropuertoguias"'


class CinControlAeropuertoMuestra(models.Model):
    id = models.UUIDField(primary_key=True)
    controlaerop_id = models.ForeignKey(CinControlAeropuerto, models.DO_NOTHING, db_column="controlaerop_id", related_name="ctapm_controlaerop_id", blank=True, null=True)
    muestra = models.CharField(max_length=50, blank=True, null=True,db_column="muestra")
    tipo_muestra = models.CharField(max_length=1, blank=True, null=True,db_column="tipo_muestra")
    observaciones = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"cin_control_aeropuertomuestras"'


class CinControlAeropuertoVuelo(models.Model):
    id = models.UUIDField(primary_key=True)
    controlaerop_id = models.ForeignKey(CinControlAeropuerto, models.DO_NOTHING, db_column="controlaerop_id", related_name="ctapv_controlaerop_id", blank=True, null=True)
    aerolinea = models.CharField(max_length=1, blank=True, null=True,db_column="aerolinea")
    cantidad = models.CharField(max_length=50, blank=True, null=True,db_column="cantidad")
    observaciones = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"cin_control_aeropuertovuelos"'


class CinControlAeropuertoIguanas(models.Model):
    id = models.UUIDField(primary_key=True)
    fecha = models.DateTimeField(blank=True, null=True,db_column="fecha")
    lugar_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, db_column="lugar_id",related_name="capi_lugar_id", blank=True, null=True)
    funcionarios_id = models.TextField(blank=True, null=True, db_column="funcionarios_id")
    funcionarios_nombre = models.TextField(blank=True, null=True, db_column="funcionarios_nombre")
    personal_otro = models.TextField(blank=True, null=True)
    cantidad_mov = models.PositiveIntegerField(blank=True, null=True, db_column='cantidades movilizadas')
    nombre_foto = models.TextField(blank=True, null= True)
    foto = models.TextField(blank=True, null= True)
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
        db_table = u'"master\".\"cin_control_aeropuertoiguanas"'


class CinControlAeropuertoRecorridos(models.Model):
    id = models.UUIDField(primary_key=True)
    fecha = models.DateTimeField(blank=True, null=True,db_column="fecha")
    funcionarios_id = models.TextField(blank=True, null=True)
    funcionarios_nombre = models.TextField(blank=True, null=True)
    sitio_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, db_column="sitio_id", related_name="capr_sitio_id" , blank=True, null=True)
    area_pista = models.BooleanField(blank=True, null=True)
    area_via = models.BooleanField(blank=True, null=True)
    nombre_foto = models.TextField(blank=True, null= True)
    foto = models.TextField(blank=True, null= True)
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
        managed = False
        db_table = u'"master\".\"cin_control_aeropuertorecorridos"'


#Vista - Cargar funcionarios Control Insular
class CinFuncionarios(models.Model):
    id = models.UUIDField(primary_key=True,db_column="id") 
    identificacion = models.CharField(max_length=32, blank=True, null=True, db_column="identificacion")
    nombre_completo = models.TextField(blank=True, null= True, db_column="nombre_completo")
    isla = models.TextField(blank=True, null= True, db_column="isla")
    direccion = models.CharField(max_length=510, blank=True, null=True, db_column="direccion")
    proceso = models.CharField(max_length=510, blank=True, null=True, db_column="proceso")
    subproceso = models.CharField(max_length=510, blank=True, null=True, db_column="subproceso")    
    direccion_id = models.CharField(max_length=510, blank=True, null=True, db_column="direccion_id") 
    proceso_id = models.CharField(max_length=510, blank=True, null=True, db_column="proceso_id") 
    subproceso_id = models.CharField(max_length=510, blank=True, null=True, db_column="subproceso_id") 
    
    class Meta:
        managed = False
        db_table = u'"master\".\"vw_funcionarios_cinsular"' 



class CinHitos(models.Model):
    id = models.UUIDField(primary_key=True,db_column="id") 
    provincia = models.CharField(max_length=255, blank=True, null=True, db_column="provincia") 
    isla = models.CharField(max_length=255, blank=True, null=True, db_column="isla")
    canton = models.CharField(max_length=255, blank=True, null=True, db_column="canton")
    parroquia = models.CharField(max_length=255, blank=True, null=True, db_column="parroquia")
    sitio_referencia = models.CharField(max_length=255, blank=True, null=True, db_column="sitio_referencia")
    area = models.CharField(max_length=255, blank=True, null=True, db_column="area")
    cod = models.CharField(max_length=255, blank=True, null=True, db_column="cod")
    punto = models.PositiveIntegerField(blank=True, null=True, db_column="punto") 
    punto_general = models.PositiveIntegerField(blank=True, null=True, db_column="punto_general")
    x = models.CharField(max_length=255, blank=True, null=True, db_column="x")
    y = models.CharField(max_length=255, blank=True, null=True, db_column="y")
    z = models.CharField(max_length=255, blank=True, null=True, db_column="z")
    acuerdo_decreto = models.CharField(max_length=255, blank=True, null=True, db_column="acuerdo_decreto")
    fecha_acuerdo_decreto = models.CharField(max_length=255, blank=True, null=True, db_column="fecha_acuerdo_decreto")
    fecha_levantamiento_hito = models.CharField(max_length=255, blank=True, null=True, db_column="fecha_levantamiento_hito")
    hito_fisico = models.CharField(max_length=255, blank=True, null=True, db_column="hito_fisico")
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones_dba = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"cin_hitos"' 


class CinControlPatrullaje(models.Model):
    id = models.UUIDField(primary_key=True)
    fecha = models.DateTimeField(blank=True, null=True,db_column="fecha")
    funcionarios_id = models.TextField(blank=True, null=True, db_column="funcionarios_id")
    funcionarios_nombre = models.TextField(blank=True, null=True, db_column="funcionarios_nombre")
    policia =models.TextField(blank=True, null=True, db_column="policia")
    nombre_foto = models.TextField(blank=True, null= True)
    foto = models.TextField(blank=True, null= True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones_dba = models.TextField(blank=True, null=True)
    
    #history = HistoricalRecords(table_name='"audit\".\"cmn_actavisitainspec_embpesca"')
    class Meta:
        managed = False
        db_table = u'"master\".\"cin_controlpatrullaje"'


class CinControlHitoPatrullaje(models.Model):
    id = models.UUIDField(primary_key=True)
    controlpatrullaje_id = models.ForeignKey(CinControlPatrullaje, models.DO_NOTHING, blank=True, null=True, db_column="controlpatrullaje_id", related_name="ctph_controlpatrullaje_id")
    hito_id = models.ForeignKey(CinHitos, models.DO_NOTHING, blank=True, null=True, db_column="hito_id", related_name="ctp_hito_id")
    estado_hito = models.CharField(max_length=1, blank=True, null=True, db_column="estado_hito")
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones_dba = models.TextField(blank=True, null=True)
    
    #history = HistoricalRecords(table_name='"audit\".\"cmn_actavisitainspec_embpesca"')
    class Meta:
        managed = False
        db_table = u'"master\".\"cin_controlhitopatrullaje"'

class CinControlSitioPatrullaje(models.Model):
    id = models.UUIDField(primary_key=True)
    controlpatrullaje_id = models.ForeignKey(CinControlPatrullaje, models.DO_NOTHING, blank=True, null=True, db_column="controlpatrullaje_id", related_name="ctp_controlpatrullaje_id")
    sitio_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, blank=True, null=True, db_column="sitio_id", related_name="ctp_sitio_id")
    mov_vehiculo = models.BooleanField(null=True,default=False, db_column="mov_vehiculo")
    mov_pie = models.BooleanField(null=True,default=False, db_column="mov_pie")
    mov_cemila = models.BooleanField(null=True,default=False, db_column="mov_cemila")
    mov_otro = models.BooleanField(null=True,default=False, db_column="mov_otro")
    mov_otro_descripcion = models.TextField(blank=True, null=True, db_column="mov_otro_descripcion")
    existe_novedad = models.BooleanField(null=True,default=False, db_column="existe_novedad")
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones_dba = models.TextField(blank=True, null=True)
    
    #history = HistoricalRecords(table_name='"audit\".\"cmn_actavisitainspec_embpesca"')
    class Meta:
        managed = False
        db_table = u'"master\".\"cin_controlsitiopatrullaje"'


class CinControlNovedadPatrullaje(models.Model):
    id = models.UUIDField(primary_key=True)
    sitiopatrullaje_id = models.ForeignKey(CinControlSitioPatrullaje, models.DO_NOTHING, blank=True, null=True, db_column="sitiopatrullaje_id", related_name="ctp_sitiopatrullaje_id")
    descripcion = models.CharField(max_length=1, blank=True, null=True,db_column="descripcion")
    cantidad = models.PositiveIntegerField(blank=True, null=True,db_column="cantidad")
    observaciones = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,blank=True, null=True)
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    observaciones_dba = models.TextField(blank=True, null=True)
    
    #history = HistoricalRecords(table_name='"audit\".\"cmn_actavisitainspec_embpesca"')
    def __str__(self):
        return '%s,%s,%s,%s,%s'  % (self.id, self.descripcion, self.cantidad, self.observaciones, self.estado)

    class Meta:
        managed = False
        db_table = u'"master\".\"cin_controlnovedadpatrullaje"'



class CmnActividadFuncionarios(models.Model):
    id = models.UUIDField(primary_key=True)
    funcionario_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="funcionario_id")
    actividad_id = models.ForeignKey(SisParametrosConfig, models.DO_NOTHING, blank=True, null=True,db_column="actividad_id")
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
        db_table = u'"master\".\"cmn_actividad_funcionarios"'

class CmnDiasActividadFuncionarios(models.Model):
    id = models.UUIDField(primary_key=True)
    actividad_funcionario_id = models.ForeignKey(CmnActividadFuncionarios, models.DO_NOTHING, blank=True, null=True,db_column="actividad_funcionario_id",related_name="actividades_dias")
    dias_actividad = models.TextField()
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
        db_table = u'"master\".\"cmn_dias_actividad_funcionarios"'