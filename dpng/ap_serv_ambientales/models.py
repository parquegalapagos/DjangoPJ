from django.db import models
import uuid

from ap_base.models import GeoIsla,SisCatalogo,GeoSitio,BioEspecie
from ap_talentohumano.models import PerFuncionario,PerPersona
# Create your models here.


#servicios ambientales
class TrpVehiculo(models.Model):
	id = models.UUIDField(primary_key=True)
	color = models.TextField(blank=True, null=True)
	descripcion = models.TextField(blank=True, null=True)
	identificador = models.TextField(blank=True, null=True)
	marca = models.TextField(blank=True, null=True)
	modelo = models.TextField(blank=True, null=True)
	tipo_id = models.UUIDField(blank=True, null=True)
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
		managed = False
		db_table = u'"master\".\"trp_vehiculo"'

class TrpVehiculoTipo(models.Model):
	id = models.UUIDField(primary_key=True)
	nombre = models.TextField(blank=True, null=True)
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
		managed = False
		db_table = u'"master\".\"trp_vehiculo_tipo"'

class TrpPersonaVehiculo(models.Model):
	id = models.UUIDField(primary_key=True)
	persona_id = models.ForeignKey(PerPersona, models.DO_NOTHING, blank=True, null=True,db_column="persona_id")
	vehiculo_id = models.ForeignKey(TrpVehiculo, models.DO_NOTHING, blank=True, null=True,db_column="vehiculo_id")

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
		db_table = u'"master\".\"trp_persona_vehiculo"'

class TrpTipoUsuario(models.Model):
	id = models.UUIDField(primary_key=True)
	descripcion = models.TextField(blank=True, null=True)

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
		db_table = u'"master\".\"trp_tipo_usuario"'

class TrpControlMaterialPetreo(models.Model):
	id = models.UUIDField(primary_key=True)
	usuario_id = models.ForeignKey(PerPersona, models.DO_NOTHING, blank=True, null=True,db_column="usuario_id")
	fecha_recepcion = models.DateField(blank=True, null=True)
	#fecha_caducidad = models.DateField(blank=True, null=True)
	tipo_usuario_id = models.ForeignKey(TrpTipoUsuario, models.DO_NOTHING, blank=True, null=True,db_column="tipo_usuario_id")
	vehiculos = models.TextField(blank=True, null=True)
	numero_solicitud = models.TextField(blank=True, null=True)

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
		db_table = u'"master\".\"trp_control_material_petreo"'

class TrpControlMaterialPetreoDetalle(models.Model):
	id = models.UUIDField(primary_key=True)
	cab_matpetreo_id = models.ForeignKey(TrpControlMaterialPetreo, models.DO_NOTHING, blank=True, null=True,db_column="cab_matpetreo_id",related_name="detmatpetreo")
	fecha_viaje = models.DateField(blank=True, null=True)
	sitio_extraccion_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, blank=True, null=True,db_column="sitio_extraccion_id")
	arena = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
	granillo = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
	relleno = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
	bloque = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
	ripio = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)

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
		db_table = u'"master\".\"trp_control_material_petreo_detalle"'




class BsaParametrosConfig(models.Model):
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
		db_table = u'"master\".\"bsa_parametros_config"'


class BsaInformeCampo(models.Model):
	id = models.UUIDField(primary_key=True)
	numero = models.TextField(blank=True, null=True)
	proceso = models.TextField(blank=True, null=True)
	subproceso = models.TextField(blank=True, null=True)
	sitio_id = models.TextField(blank=True, null=True)
	actividad = models.TextField(blank=True, null=True)
	fecha_desde = models.DateField(blank=True, null=True)
	fecha_hasta = models.DateField(blank=True, null=True)
	periodo = models.TextField(blank=True, null=True)
	fecha_presentacion = models.DateField(blank=True, null=True)
	transporte_id = models.ForeignKey(TrpVehiculo, models.DO_NOTHING, blank=True, null=True,db_column="transporte_id")
	introduccion = models.TextField(blank=True, null=True)
	objetivos = models.TextField(blank=True, null=True)
	materiales = models.TextField(blank=True, null=True)
	metodologia = models.TextField(blank=True, null=True)
	desarrollo = models.TextField(blank=True, null=True)
	resultados = models.TextField(blank=True, null=True)
	consclusiones = models.TextField(blank=True, null=True)
	observacion = models.TextField(blank=True, null=True)
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
		db_table = u'"master\".\"bsa_informe_campo"'

class BsaInformeCampoDetalle(models.Model):
	id = models.UUIDField(primary_key=True)
	cab_infcampo_id = models.ForeignKey(BsaInformeCampo, models.DO_NOTHING, blank=True, null=True,db_column="cab_infcampo_id",related_name="det_infcampo")
	foto = models.TextField(blank=True, null=True)
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
		db_table = u'"master\".\"bsa_informe_campo_detalle"'

class BsaInformeTecnico(models.Model):
	id = models.UUIDField(primary_key=True)
	numero = models.CharField(max_length=50,blank=True, null=True)
	tema = models.CharField(max_length=500,blank=True, null=True)
	fecha = models.DateField(blank=True, null=True)
	tecnicos = models.CharField(max_length=1000,blank=True, null=True)
	archivo = models.CharField(max_length=1000,blank=True, null=True)
	
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
		db_table = u'"master\".\"bsa_informe_tecnico"'


class BsaInformeNovedades(models.Model):
	id = models.UUIDField(primary_key=True)
	numero = models.CharField(max_length=1000, blank=True, null=True)
	proceso = models.CharField(max_length=1000, blank=True, null=True)
	sitio_id = models.ForeignKey(GeoSitio, models.DO_NOTHING, blank=True, null=True,db_column="sitio_id")
	actividad = models.CharField(max_length=1000, blank=True, null=True)
	periodo = models.CharField(max_length=1000, blank=True, null=True)
	personal = models.CharField(max_length=1000, blank=True, null=True)
	fecha_entrega = models.DateField(blank=True, null=True)
	transporte = models.CharField(max_length=1000, blank=True, null=True)
	introduccion = models.TextField(blank=True, null=True)
	objetivos = models.TextField(blank=True, null=True)
	materiales = models.TextField(blank=True, null=True)
	metodologia = models.TextField(blank=True, null=True)
	desarrollo = models.TextField(blank=True, null=True)
	resultados = models.TextField(blank=True, null=True)
	consclusiones = models.TextField(blank=True, null=True)
	observacion = models.TextField(blank=True, null=True)
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
		db_table = u'"master\".\"bsa_informe_novedades"'

class BsaInformeNovedadesDetalle(models.Model):
	id = models.UUIDField(primary_key=True)
	cab_infnovedades_id = models.ForeignKey(BsaInformeNovedades, models.DO_NOTHING, blank=True, null=True,db_column="cab_infnovedades_id",related_name="det_infnovedades")
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
		db_table = u'"master\".\"bsa_informe_novedades_detalle"'


