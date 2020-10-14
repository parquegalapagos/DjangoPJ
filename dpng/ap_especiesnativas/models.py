from django.db import models
from django.utils import timezone
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import Group

from ap_base.models import GeoIsla, GeoSitio, SisCatalogo, BioEspecie
from ap_talentohumano.models import PerFuncionario, PerPersona

# AUDIT
from simple_history.models import HistoricalRecords

class SpnCentrosCrianza(models.Model):
    id = models.UUIDField(primary_key=True)
    descripcion = models.TextField(unique=True, blank=True, null=True)
    isla_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_id",related_name="cc_isla_id")
    observacion = models.TextField(blank=True, null=True)
    
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"spn_centroscrianza"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spn_centroscrianza"'

class SpnPoblacion(models.Model):
    id = models.UUIDField(primary_key=True)
    descripcion = models.TextField(unique=True, blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    color = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"spn_poblacion"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spn_poblacion"'

class SpnTortugasAdultas(models.Model):
    id = models.UUIDField(primary_key=True)
    centro_crianza_id = models.ForeignKey(SpnCentrosCrianza, models.DO_NOTHING, blank=True, null=True,db_column="centro_crianza_id",related_name="centro_crianza_id")
    poblacion_id = models.ForeignKey(SpnPoblacion, models.DO_NOTHING, blank=True, null=True,db_column="poblacion_id",related_name="poblacion_tor")
    anio = models.IntegerField(blank=True, null=True)
    mes = models.IntegerField(blank=True, null=True)
    periodo = models.TextField(blank=True, null=True)
    cantidad = models.IntegerField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    eliminado = models.BooleanField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"spn_tortugas_adultas"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spn_tortugas_adultas"'

class SpnControlHuevos(models.Model):
    id = models.UUIDField(primary_key=True)

    num_caja  = models.IntegerField(blank=True, null=True)
    num_incubadora  = models.IntegerField(blank=True, null=True)
    grupo_nacimiento  = models.IntegerField(blank=True, null=True)
    centro_crianza_id = models.ForeignKey(SpnCentrosCrianza, models.DO_NOTHING, blank=True, null=True,db_column="centro_crianza_id")
    poblacion_id = models.ForeignKey(SpnPoblacion, models.DO_NOTHING, blank=True, null=True,db_column="poblacion_id")
    cant_agua  = models.IntegerField(blank=True, null=True)
    cant_sustrato  = models.IntegerField(blank=True, null=True)
    temperatura =  models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"spn_control_huevos"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spn_control_huevos"'


class SpnControlHuevosResumen(models.Model):
    id = models.UUIDField(primary_key=True)
    fecha_postura = models.DateField(blank=True, null=True)
    num_nido = models.IntegerField(blank=True, null=True)
    num_hembra = models.IntegerField(blank=True, null=True)
    total_huevos = models.IntegerField(blank=True, null=True)
    num_ingresos = models.IntegerField(blank=True, null=True)
    fecha_ingreso_inc = models.DateField(blank=True, null=True)
    control_huevos_id = models.ForeignKey(SpnControlHuevos, models.DO_NOTHING, blank=True, null=True,db_column="control_huevos_id",related_name="control_resumen_id")
    observacion = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"spn_control_huevos_resumen"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spn_control_huevos_resumen"'



class SpnControlHuevosDetalles(models.Model):
    id = models.UUIDField(primary_key=True)
    control_huevos_resumen_id = models.ForeignKey(SpnControlHuevosResumen,on_delete=models.CASCADE, blank=True, null=True,db_column="control_huevos_resumen_id",related_name="control_resumen_detalles_id")
    num_nido = models.IntegerField(blank=True, null=True)
    num_hembra = models.IntegerField(blank=True, null=True)
    num_huevo = models.IntegerField(blank=True, null=True)
    peso_inicial = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True, default=0)
    fecha_cambio_sustrato = models.DateField(blank=True, null=True)
    peso_cambio = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True, default=0)
    condicion_huevo_no_ingresado = models.TextField(blank=True, null=True)
    fecha_eclosion = models.DateField(blank=True, null=True)
    num_pintura  = models.IntegerField(blank=True, null=True, default=0)
    largo_curvo  = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True, default=0)
    ancho_curvo  = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True, default=0)
    largo_plastron  = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True, default=0)
    peso_salida = models.IntegerField(blank=True, null=True, default=0)
    fecha_sacado = models.DateField(blank=True, null=True)
    condicion = models.TextField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"spn_control_huevos_detalles"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spn_control_huevos_detalles"'


class SpnControlCrecimientoGalapaguitos(models.Model):
    id = models.UUIDField(primary_key=True)
    grupo_nacimiento  = models.IntegerField(blank=True, null=True)
    centro_crianza_id = models.ForeignKey(SpnCentrosCrianza, models.DO_NOTHING, blank=True, null=True,db_column="centro_crianza_id")
    poblacion_id = models.ForeignKey(SpnPoblacion, models.DO_NOTHING, blank=True, null=True,db_column="poblacion_id",related_name="poblacion_id")
    periodo = models.IntegerField(blank=True, null=True)
    anio = models.IntegerField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"spn_control_crecimiento_galapaguitos"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spn_control_crecimiento_galapaguitos"'

class SpnControlCrecimientoGalapaguitosDetalles(models.Model):
    id = models.UUIDField(primary_key=True)
    control_crecimiento_id = models.ForeignKey(SpnControlCrecimientoGalapaguitos,on_delete=models.CASCADE, blank=True, null=True,db_column="control_crecimiento_id",related_name="det_control_crecimiento_id")  
    control_huevos_resumen_id = models.ForeignKey(SpnControlHuevosResumen,on_delete=models.CASCADE, blank=True, null=True,db_column="control_huevos_resumen_id")
    fecha_medida = models.DateField(blank=True, null=True)
    #poblacion_id = models.ForeignKey(Spnpoblacion_id, models.DO_NOTHING, blank=True, null=True,db_column="poblacion_id",related_name="poblacion_id")
    num_pintura  = models.IntegerField(blank=True, null=True, default=0)
    num_hierro  = models.IntegerField(blank=True, null=True, default=0)
    num_pit  = models.IntegerField(blank=True, null=True, default=0)
    largo_curvo  = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True, default=0)
    ancho_curvo  = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True, default=0)
    largo_plastron  = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True, default=0)
    #peso = models.IntegerField(blank=True, null=True, default=0)
    peso = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True, default=0)
    observacion = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    muerta = models.IntegerField(blank=True, null=True, default=0)
    repatriada = models.IntegerField(blank=True, null=True, default=0)
    fecha_repatriacion = models.DateField(blank=True, null=True)
    fecha_ingreso_tort = models.DateField(blank=True, null=True)
    fecha_muerte_tort  = models.DateField(blank=True, null=True)
    sitio_repatriacion = models.UUIDField(blank=True, null=True)
    estado_ingreso = models.IntegerField(blank=True, null=True, default=0)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"spn_control_crecimiento_galapaguitos_detalles"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spn_control_crecimiento_galapaguitos_detalles"'

class SpnNidos(models.Model):
    id = models.UUIDField(primary_key=True)
    descripcion = models.TextField(blank=True, null=True)
    
    latitud = models.TextField( blank=True, null=True)
    longitud = models.TextField(blank=True, null=True)
    utm_norte = models.TextField(blank=True, null=True)
    utm_este = models.TextField(blank=True, null=True)
    utm_zona = models.TextField(blank=True, null=True)
    tipo_nido = models.TextField(blank=True, null=True) # TORTUGA, PETRELES
    observacion = models.TextField(blank=True, null=True)
    sitio_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, blank=True, null=True,db_column="sitio_id",related_name="sitio_id")
    observaciones_dba = models.TextField(blank=True, null=True)
    fecha_sincronizacion = models.DateTimeField(auto_now_add=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    responsable_nido = models.TextField(blank=True, null= True)
    fecha_protegido = models.DateField(blank=True, null=True)
    temporada = models.TextField( blank=True, null=True)
    invitado = models.TextField(blank=True, null=True)
    responsable_nido_id = models.TextField(blank=True, null= True)
    nombre_foto = models.TextField(blank=True, null= True)
    foto_nido = models.TextField(blank=True, null= True)
    

    history = HistoricalRecords(table_name='"audit\".\"spn_nidos"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spn_nidos"'

class SpnControlHuevosNidos(models.Model):
    id = models.UUIDField(primary_key=True)
    fecha_protegido = models.DateField(blank=True, null=True)
    fecha_liberacion = models.DateField(blank=True, null=True)
    num_nido = models.ForeignKey(SpnNidos, models.DO_NOTHING, blank=True, null=True,db_column="num_nido",related_name="num_nido")
    neo_liberado = models.IntegerField(blank=True, null=True)
    huevos_no_eclo = models.IntegerField(blank=True, null=True)
    muertos = models.IntegerField(blank=True, null=True)
    escapados = models.IntegerField(blank=True, null=True)
    huevos_traidos = models.IntegerField(blank=True, null=True)
    neo_traidos = models.IntegerField(blank=True, null=True)
    resp_registro_id = models.TextField(blank=True, null=True)
    resp_liberar_id = models.TextField(blank=True, null=True)
    resp_registro = models.TextField(blank=True, null=True)
    resp_liberar = models.TextField(blank=True, null=True)
    invitado = models.TextField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    fecha_sincronizacion = models.DateTimeField(auto_now_add=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"spn_control_huevos_nidos"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spn_control_huevos_nidos"'

class SpnControlPetrelesNidos(models.Model):
    id = models.UUIDField(primary_key=True)
    fecha_revision = models.DateField(blank=True, null=True)
    participantes_id = models.TextField(blank=True, null=True)
    participantes_nombres = models.TextField(blank=True, null=True)
    num_nido = models.ForeignKey(SpnNidos, models.DO_NOTHING, blank=True, null=True,db_column="num_nido",related_name="nido")
    adulto = models.IntegerField(blank=True, null=True)
    pareja = models.IntegerField(blank=True, null=True)
    huevo = models.IntegerField(blank=True, null=True)
    pichon = models.IntegerField(blank=True, null=True)
    pichon_volo = models.IntegerField(blank=True, null=True)
    rastro = models.IntegerField(blank=True, null=True)
    sin_rastro = models.IntegerField(blank=True, null=True)
    nido_largo = models.IntegerField(blank=True, null=True)
    pichon_depredado = models.IntegerField(blank=True, null=True)
    nido_destruido = models.IntegerField(blank=True, null=True)
    num_anillo_nuevo = models.TextField(blank=True, null=True)
    num_anillo_recaptura = models.TextField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    fecha_sincronizacion = models.DateTimeField(auto_now_add=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    invitado = models.TextField(blank=True, null=True)
    temporada = models.TextField( blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"spn_control_petreles_nidos"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spn_control_petreles_nidos"'

class SpnControlFlamingos(models.Model):
    id = models.UUIDField(primary_key=True)
    fecha = models.DateField(blank=True, null=True)
    encargados_id = models.TextField(blank=True, null=True)
    encargados_nombres = models.TextField(blank=True, null=True)
    sitio_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, blank=True, null=True,db_column="sitio_id",related_name="sitio")
    hora_inicio = models.TextField(blank=True, null=True)
    hora_fin = models.TextField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    fecha_sincronizacion = models.DateTimeField(auto_now_add=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    nivel_agua = models.IntegerField(blank=True, null=True)
    caracteristica_agua = models.IntegerField(blank=True, null=True) 
    invitado = models.TextField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"spn_control_flamingos"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spn_control_flamingos"'

class SpnControlFlamingosOtrasEspecies(models.Model):
    id = models.UUIDField(primary_key=True)
    control_flamingos_id = models.ForeignKey(SpnControlFlamingos, models.DO_NOTHING, blank=True, null=True,db_column="control_flamingos_id", related_name="control_flamingos_id")
    estado_comportamiento = models.TextField(blank=True, null=True)
    adulto = models.IntegerField(blank=True, null=True, default=0)
    edad_intermedia = models.IntegerField(blank=True, null=True, default=0)
    juveniles = models.IntegerField(blank=True, null=True, default=0)
    pichones = models.IntegerField(blank=True, null=True, default=0)
    individuo_id = models.ForeignKey(BioEspecie, models.DO_NOTHING, blank=True, null=True,db_column="individuo_id")  
    numero = models.IntegerField(blank=True, null=True)
    numero_nidos = models.IntegerField(blank=True, null=True)
    datos_nidos_id = models.ForeignKey(SisCatalogo, models.DO_NOTHING, blank=True, null=True,db_column="datos_nidos_id", related_name="datos_nidos_id")
    observacion = models.TextField(blank=True, null=True)
    tipo = models.IntegerField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso =  models.DateTimeField(auto_now_add=True)
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    estado = models.CharField(max_length=1)
    eliminado = models.BooleanField(blank=True, null=True)
    history = HistoricalRecords(table_name='"audit\".\"spn_control_flamingos_otras_especies"')
    
    class Meta:
        managed = True
        db_table = u'"master\".\"spn_control_flamingos_otras_especies"'


#########################################################################################
# VISTAS
#########################################################################################
class VwSpnControlCrecimientoMaxMes(models.Model):
    id = models.UUIDField(primary_key=True)
    grupo_nacimiento  = models.IntegerField(blank=True, null=True)
    centro_crianza_id = models.UUIDField(blank=True, null=True)
    poblacion = models.UUIDField(blank=True, null=True)
    anio = models.IntegerField(blank=True, null=True)
    periodo  = models.IntegerField(blank=True, null=True)
   
    class Meta:
        managed = False
        db_table = u'"master\".\"vw_spn_control_crecimiento_max_mes"'


class VwSpnDatosHuevoxPintura(models.Model):
    id = models.UUIDField(primary_key=True)
    grupo_nacimiento  = models.IntegerField(blank=True, null=True)
    centro_crianza_id = models.UUIDField(blank=True, null=True)
    poblacion = models.UUIDField(blank=True, null=True)
    num_pintura  = models.IntegerField(blank=True, null=True, default=0)
    num_caja  = models.IntegerField(blank=True, null=True, default=0)
    num_incubadora  = models.IntegerField(blank=True, null=True, default=0)
    cant_agua  = models.IntegerField(blank=True, null=True)
    cant_sustrato  = models.IntegerField(blank=True, null=True)
    temperatura =  models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
    num_nido = models.IntegerField(blank=True, null=True)
    num_hembra = models.IntegerField(blank=True, null=True)
    num_huevo = models.IntegerField(blank=True, null=True)
    fecha_postura = models.DateField(blank=True, null=True)
    fecha_ingreso_inc = models.DateField(blank=True, null=True)
    total_huevos = models.IntegerField(blank=True, null=True)
    num_ingresos = models.IntegerField(blank=True, null=True)
    peso_inicial = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True, default=0)
    fecha_cambio_sustrato = models.DateField(blank=True, null=True)
    peso_cambio = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True, default=0)
    observacion = models.TextField(blank=True, null=True)
    fecha_sacado = models.DateField(blank=True, null=True)
    class Meta:
        managed = False
        db_table = u'"master\".\"vw_spn_datos_huevo_x_pintura"'



class VwSpnDatosControlCreceHuevoxPintura(models.Model):
    id = models.UUIDField(primary_key=True)
    control_crecimiento_id = models.ForeignKey(SpnControlCrecimientoGalapaguitos,on_delete=models.CASCADE, blank=True, null=True,db_column="control_crecimiento_id",related_name="det_control_crecimiento_id2")  
    fecha_medida = models.DateField(blank=True, null=True)
    num_pintura  = models.IntegerField(blank=True, null=True, default=0)
    num_hierro  = models.IntegerField(blank=True, null=True, default=0)
    num_pit  = models.IntegerField(blank=True, null=True, default=0)
    largo_curvo  = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True, default=0)
    ancho_curvo  = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True, default=0)
    largo_plastron  = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True, default=0)
    peso = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True, default=0)
    observacion = models.TextField(blank=True, null=True)
    muerta = models.IntegerField(blank=True, null=True, default=0)
    repatriada = models.IntegerField(blank=True, null=True, default=0)
    fecha_repatriacion = models.DateField(blank=True, null=True)
    sitio_repatriacion = models.UUIDField(blank=True, null=True)
    periodo = models.IntegerField(blank=True, null=True, default=0)
    anio = models.IntegerField(blank=True, null=True, default=0)
    estado_ingreso = models.IntegerField(blank=True, null=True, default=0)
    sitio_repatriacion = models.UUIDField(blank=True, null=True),
    grupo_nacimiento  = models.IntegerField(blank=True, null=True)
    centro_crianza_id = models.UUIDField(blank=True, null=True)
    poblacion =  models.UUIDField(blank=True, null=True)
    desc_poblacion =  models.TextField(blank=True, null=True)
   
    class Meta:
        managed = False
        db_table = u'"master\".\"vw_spn_datoscontrolcrecehuevoxpintura"'


class VwSpnResumenHuevosIncubados(models.Model):
    id = models.UUIDField(primary_key=True)
    grupo_nacimiento  = models.IntegerField(blank=True, null=True)
    centro_crianza_id = models.UUIDField(blank=True, null=True)
    des = models.TextField(blank=True, null=True)
    poblacion_id = models.UUIDField(blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    total_huevos = models.IntegerField(blank=True, null=True)
    huevos_sacados = models.IntegerField(blank=True, null=True)
   
    class Meta:
        managed = False
        db_table = u'"master\".\"vw_spn_resumen_huevos_incubados"'

class VwSpnResumenHuevosIncubadosDetalles(models.Model):
    id = models.UUIDField(primary_key=True)
    grupo_nacimiento  = models.IntegerField(blank=True, null=True)
    centro_crianza_id = models.UUIDField(blank=True, null=True)
    centro_crianza = models.TextField(blank=True, null=True)
    poblacion = models.UUIDField(blank=True, null=True)
    des_poblacion = models.TextField(blank=True, null=True)
    periodo = models.DateField(blank=True, null=True)
    con_pintura = models.IntegerField(blank=True, null=True)
    muerta = models.IntegerField(blank=True, null=True)
    repatriada = models.IntegerField(blank=True, null=True)
    ingresada = models.IntegerField(blank=True, null=True)
   
    class Meta:
        managed = False
        db_table = u'"master\".\"vw_spn_resumen_huevos_incubados_detalles"'

class VwSpnResumenHuevosIncubadosPerdiodo(models.Model):
    id = models.UUIDField(primary_key=True)
    grupo_nacimiento  = models.IntegerField(blank=True, null=True)
    centro_crianza_id = models.UUIDField(blank=True, null=True)
    fecha_medida = models.DateField(blank=True, null=True)
    periodo = models.IntegerField(blank=True, null=True)
    anio = models.IntegerField(blank=True, null=True)
    periodo_medida= models.DateField(blank=True, null=True)
    con_pintura = models.IntegerField(blank=True, null=True)
    muerta = models.IntegerField(blank=True, null=True)
    repatriada = models.IntegerField(blank=True, null=True)
    ingresada = models.IntegerField(blank=True, null=True)
   
    class Meta:
        managed = False
        db_table = u'"master\".\"vw_spn_resumen_huevos_incuvados_x_periodo"'

class VwSpnDetalleControlCrecimiento(models.Model):
    id = models.UUIDField(primary_key=True)
    grupo_nacimiento  = models.IntegerField(blank=True, null=True)
    centro_crianza_id = models.UUIDField(blank=True, null=True)
    centro_crianza = models.TextField(blank=True, null=True)
    poblacion_id = models.UUIDField(blank=True, null=True)
    des_poblacion = models.TextField(blank=True, null=True)
    fecha_medida = models.DateField(blank=True, null=True)
    periodo = models.IntegerField(blank=True, null=True)
    anio = models.IntegerField(blank=True, null=True)
    periodo_medida= models.DateField(blank=True, null=True)
    con_pintura = models.IntegerField(blank=True, null=True)
    estado_tortuga = models.TextField(blank=True, null=True)
    
   
    class Meta:
        managed = False
        db_table = u'"master\".\"vw_spn_detalle_control_crecimiento"'


class VwSpnEstadoActualCC(models.Model):
    id = models.UUIDField(primary_key=True)
    grupo_nacimiento  = models.IntegerField(blank=True, null=True)
    centro_crianza = models.TextField(blank=True, null=True)
    centro_crianza_id = models.UUIDField(blank=True, null=True)
    des_poblacion = models.TextField(blank=True, null=True)
    periodo = models.TextField(blank=True, null=True)
    con_pintura = models.IntegerField(blank=True, null=True)
    muerta = models.IntegerField(blank=True, null=True)
    repatriada = models.IntegerField(blank=True, null=True)
    ingresada = models.IntegerField(blank=True, null=True)
    en_corral = models.IntegerField(blank=True, null=True)
    total_huevos = models.IntegerField(blank=True, null=True)
    huevos_sacados = models.IntegerField(blank=True, null=True)
    huevos_nacidos= models.IntegerField(blank=True, null=True)
    en_incubadora = models.IntegerField(blank=True, null=True)
    tipo = models.IntegerField(blank=True, null=True)
    
   
    class Meta:
        managed = False
        db_table = u'"master\".\"vw_spn_estado_actual_cc_rep"'