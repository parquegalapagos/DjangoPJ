from django.db import models
from django.utils import timezone
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import Group

from ap_base.models import GeoIsla, GeoSitio, SisCatalogo, BioEspecie
from ap_talentohumano.models import PerFuncionario, PerPersona

# AUDIT
from simple_history.models import HistoricalRecords


class SpiEspeciesIntroducidas(models.Model):
    id = models.UUIDField(primary_key=True)
    encargado_id = models.TextField(blank=True, null=True)
    invitado = models.TextField(blank=True, null=True)
    sitio_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, blank=True, null=True,db_column="sitio_id")
    isla_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_id", related_name="esp_intro_isla_id")

    fecha = models.DateField(blank=True, null=True)
    fecha_coloca_cebo = models.DateField(blank=True, null=True)
    fecha_revisa_cebo = models.DateField(blank=True, null=True)
    total_municiones  = models.IntegerField(blank=True, null=True)
    municiones_usadas = models.IntegerField(blank=True, null=True)
    metodo_control    = models.TextField(blank=True, null=True)
    tipo_rifle        = models.TextField(blank=True, null=True)
    zona_barrio       = models.TextField(blank=True, null=True)
    propietario       = models.TextField(blank=True, null=True)
    hora_inicio       = models.TextField(blank=True, null=True)
    hora_fin          = models.TextField(blank=True, null=True)
    horario           = models.CharField(blank=True, null=True,max_length=1)#dia noche
    track             = models.TextField(blank=True, null=True)
    track2            = models.TextField(blank=True, null=True)
    especie_id = models.ForeignKey(BioEspecie, models.DO_NOTHING, blank=True, null=True,db_column="especie_id")  
    altitud1          = models.IntegerField(blank=True, null=True)
    altitud2          = models.IntegerField(blank=True, null=True)
    numero_wpt        = models.IntegerField(blank=True, null=True)
    producto        = models.TextField(blank=True, null=True)
    area            = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
    
    observacion = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    #history = HistoricalRecords(table_name='"audit\".\"spn_control_es"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spi_especies_introducidas"'

class SpiEspeciesIntroducidasGato(models.Model):
    id = models.UUIDField(primary_key=True)
    cab_especieintro_id = models.ForeignKey(SpiEspeciesIntroducidas, models.DO_NOTHING, blank=True, null=True,db_column="cab_especieintro_id", related_name="det_gatos")
    num_estacion      = models.TextField(blank=True, null=True)
    altitud           = models.IntegerField(blank=True, null=True)
    codigo_gps        = models.IntegerField(blank=True, null=True)
    codigo_punto      = models.TextField(blank=True, null=True)
    capturado            = models.BooleanField(blank=True, null=True)
    no_capturado             = models.BooleanField(blank=True, null=True)
    escapados            = models.BooleanField(blank=True, null=True)
    eliminados             = models.BooleanField(blank=True, null=True)
    consumido         = models.BooleanField(blank=True, null=True)
    no_consumido      = models.BooleanField(blank=True, null=True)
    fecha_coloca =  models.DateTimeField(blank=True, null=True)
    fecha_revisa =  models.DateTimeField(blank=True, null=True)
    sexo = models.CharField(blank=True, null=True,max_length=1)
    cantidad = models.IntegerField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    #history = HistoricalRecords(table_name='"audit\".\"spn_control_flamingos"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spi_especies_introducidas_gato"'

class SpiEspeciesIntroducidasCaracol(models.Model):
    id = models.UUIDField(primary_key=True)
    cab_especieintro_id = models.ForeignKey(SpiEspeciesIntroducidas, models.DO_NOTHING, blank=True, null=True,db_column="cab_especieintro_id", related_name="det_caracoles")
    altitud           = models.IntegerField(blank=True, null=True)
    codigo_gps        = models.TextField(blank=True, null=True)
    codigo_punto      = models.TextField(blank=True, null=True)
    adultos           = models.IntegerField(blank=True, null=True)
    juveniles         = models.IntegerField(blank=True, null=True)
    huevos            = models.IntegerField(blank=True, null=True)
    muertos           = models.IntegerField(blank=True, null=True)
    total             = models.IntegerField(blank=True, null=True)
    limpieza_manual   = models.BooleanField(blank=True, null=True)
    limpieza_mecanica = models.BooleanField(blank=True, null=True)
    contorl_quimico   = models.BooleanField(blank=True, null=True)
    area              = models.IntegerField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    #history = HistoricalRecords(table_name='"audit\".\"spn_control_flamingos"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spi_especies_introducidas_caracol"'


class SpiEspeciesIntroducidasAves(models.Model):
    id = models.UUIDField(primary_key=True)
    cab_especieintro_id = models.ForeignKey(SpiEspeciesIntroducidas, models.DO_NOTHING, blank=True, null=True,db_column="cab_especieintro_id", related_name="det_aves")
    sitio_id          = models.ForeignKey(GeoSitio, models.DO_NOTHING, blank=True, null=True,db_column="sitio_id")
    codigo_gps        = models.TextField(blank=True, null=True)
    codigo_punto      = models.TextField(blank=True, null=True)
    eliminadas        = models.IntegerField(blank=True, null=True)
    escapadas         = models.IntegerField(blank=True, null=True)
    num_nidos         = models.IntegerField(blank=True, null=True)
    num_huevos        = models.IntegerField(blank=True, null=True)
    tipo_ave          = models.CharField(max_length=1)
    observacion = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    #history = HistoricalRecords(table_name='"audit\".\"spn_control_flamingos"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spi_especies_introducidas_aves"'


class SpiEspeciesIntroducidasHormigas(models.Model):
    id = models.UUIDField(primary_key=True)
    cab_especieintro_id = models.ForeignKey(SpiEspeciesIntroducidas, models.DO_NOTHING, blank=True, null=True,db_column="cab_especieintro_id", related_name="det_hormigas")
    pto_gps         = models.TextField(blank=True, null=True)
    hormiga_was     = models.BooleanField(blank=True, null=True)
    hormiga_phe     = models.BooleanField(blank=True, null=True)
    hormiga_sol     = models.BooleanField(blank=True, null=True)
    hormiga_car     = models.BooleanField(blank=True, null=True)
    hormiga_tap     = models.BooleanField(blank=True, null=True)
    hormiga_mon     = models.BooleanField(blank=True, null=True)
    hormiga_end     = models.BooleanField(blank=True, null=True)
    hormiga_otra    = models.BooleanField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    #history = HistoricalRecords(table_name='"audit\".\"spn_control_flamingos"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spi_especies_introducidas_hormigas"'

class SpiEspeciesIntroducidasCaceria(models.Model):
    id = models.UUIDField(primary_key=True)
    cab_especieintro_id = models.ForeignKey(SpiEspeciesIntroducidas, models.DO_NOTHING, blank=True, null=True,db_column="cab_especieintro_id", related_name="det_caceria")
    pto_gps         = models.TextField(blank=True, null=True)
    cabra_h     = models.IntegerField(blank=True, null=True)
    cabra_m     = models.IntegerField(blank=True, null=True)
    cabra_j     = models.IntegerField(blank=True, null=True)
    asno_h     = models.IntegerField(blank=True, null=True)
    asno_m     = models.IntegerField(blank=True, null=True)
    asno_j     = models.IntegerField(blank=True, null=True)
    cerdo_h     = models.IntegerField(blank=True, null=True)
    cerdo_m    = models.IntegerField(blank=True, null=True)
    cerdo_j    = models.IntegerField(blank=True, null=True)
    vacuno_h    = models.IntegerField(blank=True, null=True)
    vacuno_m    = models.IntegerField(blank=True, null=True)
    vacuno_j    = models.IntegerField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    #history = HistoricalRecords(table_name='"audit\".\"spn_control_flamingos"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spi_especies_introducidas_caceria"'



class SpiMetodosControl(models.Model):
    id = models.UUIDField(primary_key=True)
    metodo     = models.TextField(blank=True, null=True)
    valor      = models.CharField(max_length=2,blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    #history = HistoricalRecords(table_name='"audit\".\"spn_control_flamingos"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spi_metodos_control"'

class SpiMetodosControlEspecies(models.Model):
    id = models.UUIDField(primary_key=True)
    especie_id     = models.ForeignKey(BioEspecie, models.DO_NOTHING, blank=True, null=True,db_column="especie_id")
    metodo_id     = models.ForeignKey(SpiMetodosControl, models.DO_NOTHING, blank=True, null=True,db_column="metodo_id")
    observacion = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    #history = HistoricalRecords(table_name='"audit\".\"spn_control_flamingos"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spi_metodos_control_especies"'