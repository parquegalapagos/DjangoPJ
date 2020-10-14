from django.db import models
import uuid

from django.contrib.auth.models import User

from ap_base.models import GeoIsla,SisCatalogo
from ap_talentohumano.models import PerFuncionario, PerPersona
# Create your models here.

class SptUnidadMedida(models.Model):
	id = models.UUIDField(primary_key=True)
	tryton_id = models.IntegerField(blank=True, null=True)
	descripcion = models.TextField(blank=True, null=True)

	nombre = models.TextField(blank=True, null=True)
	simbolo = models.TextField(blank=True, null=True)
	categoria = models.TextField(blank=True, null=True)
	factor = models.CharField(max_length=100, blank=True, null=True)
	conversion = models.CharField(max_length=100, blank=True, null=True)
	precision_redondeo = models.CharField(max_length=100, blank=True, null=True)

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
		db_table = u'"master\".\"spt_unidad_medida"'

	def __str__(self):
		return self.descripcion

class SptProducto(models.Model):
	id = models.UUIDField(primary_key=True)
	tryton_id = models.IntegerField(blank=True, null=True)
	descripcion = models.TextField(blank=True, null=True)
	tipo = models.TextField(blank=True, null=True, help_text='campo valor sis_catalogo categoria TIPO_PRODUCTO')
	categoria_impuestos = models.BooleanField(max_length=1, blank=True, null=True)
	categoria_cuentas = models.BooleanField(max_length=1, blank=True, null=True)
	vendible = models.BooleanField(max_length=1, blank=True, null=True)
	rebaja_uom = models.IntegerField(blank=True, null=True)

	precio_venta = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
	precio_costo = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
	metodo_coste = models.CharField(max_length=1, blank=True, null=True)
	cuenta_contable = models.TextField(blank=True, null=True)
	depreciable = models.CharField(max_length=1, blank=True, null=True)
	vida_util = models.IntegerField(blank=True, null=True)
	fecha_ingreso_producto = models.DateField(blank=True, null=True)
	fecha_termino_depreciacion = models.DateField(blank=True, null=True)
	udm_por_defecto = models.TextField(blank=True, null=True, help_text='campo simbolo spt_unidad_medida')

	valor_residual = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
	valor_contable = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
	valor_libro = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
	valor_depreciacion_acumulada = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
	
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
		db_table = u'"master\".\"spt_productos"'

	def __str__(self):
		return self.descripcion


class SptMarca(models.Model):
	id = models.UUIDField(primary_key=True)
	tryton_id = models.IntegerField(blank=True, null=True)
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
		db_table = u'"master\".\"spt_marca"'

	def __str__(self):
		return self.descripcion


class SptUbicacion(models.Model):
	id = models.UUIDField(primary_key=True)
	tryton_id = models.IntegerField(blank=True, null=True)
	descripcion = models.TextField(blank=True, null=True)
	bodega = models.TextField(blank=True, null=True)
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
		db_table = u'"master\".\"spt_ubicacion"'

	def __str__(self):
		return self.descripcion


class SptTipoEquipo(models.Model):
	id = models.UUIDField(primary_key=True)
	tryton_id = models.IntegerField(blank=True, null=True)
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
		db_table = u'"master\".\"spt_tipo_equipo"'

	def __str__(self):
		return self.descripcion


class SptEquipo(models.Model):
	CRITICIDAD_TIPOS = (
        ('alta', 'Alta'),
        ('baja', 'Baja'),
        ('media', 'Media'),
    )
	DISPOSITIVO_TIPOS = (
        ('corta', 'Corta Duracion'),
        ('larga', 'Larga Duracion'),
    )
	ESTADO_TIPOS = (
        ('aceptable', 'Aceptable'),
        ('bueno', 'Bueno'),
        ('excelente', 'Excelente'),
        ('malo', 'Malo'),
        ('no usar', 'No usar'),
    )

	id = models.UUIDField(primary_key=True, default = uuid.uuid4)
	tryton_id = models.IntegerField(blank=True, null=True)
	producto_id = models.ForeignKey(SptProducto, models.DO_NOTHING, blank=True, null=True,db_column="producto_id")
	#activo = models.CharField(max_length=1)
	modelo = models.CharField(max_length=255, blank=True, null=True)
	codigo = models.CharField(max_length=255, blank=True, null=True)
	codigo_externo = models.CharField(max_length=255, blank=True, null=True)
	marca_id = models.ForeignKey(SptMarca, models.DO_NOTHING, blank=True, null=True,db_column="marca_id")
	serie_num = models.CharField(max_length=255, blank=True, null=True)
	referencia = models.CharField(max_length=255, blank=True, null=True)
	criticidad = models.CharField(max_length=255,blank=True, null=True)
	fecha_compra = models.DateField(blank=True, null=True)
	ubicacion_id = models.ForeignKey(SptUbicacion, models.DO_NOTHING, blank=True, null=True,db_column="ubicacion_id",related_name="ubicacion_id")
	tipo_dispositivo = models.TextField(blank=True, null=True)
	estado_equipo = models.CharField(max_length=255,blank=True, null=True)
	# parent = models
	foto = models.TextField(blank=True, null=True)
	duenio_id = models.ForeignKey(PerPersona, models.DO_NOTHING, blank=True, null=True,db_column="duenio_id",related_name="func_duenio_id")
	administrador_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="administrador_id", related_name="func_administrador_id")
	proveedor_mantenimiento_id = models.ForeignKey(PerPersona, models.DO_NOTHING, blank=True, null=True,db_column="proveedor_mantenimiento_id", related_name="func_proveedor_mantenimiento_id")
	notas = models.TextField(blank=True, null=True)
	garantia = models.DateField(blank=True, null=True)
	tipo_id = models.ForeignKey(SptTipoEquipo, models.DO_NOTHING, blank=True, null=True,db_column="tipo_id")
	zona_trabajo = models.CharField(max_length=255, blank=True, null=True)
	color = models.CharField(max_length=255, blank=True, null=True)
	
	estado = models.CharField(max_length=1, default='A')
	eliminado = models.BooleanField(blank=True, default='f')
	fecha_ingreso = models.DateTimeField(auto_now_add=True)
	fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
	isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
	usuario_ingreso = models.TextField(default='ADM')
	usuario_ultima_modificacion = models.TextField(blank=True, null=True)
	observaciones = models.TextField(blank=True, null=True)
	observaciones_dba = models.TextField(blank=True, null=True)

	class Meta:
		managed = True
		db_table = u'"master\".\"spt_equipo"'



class SptTipoProblema(models.Model):
	#id = models.AutoField(primary_key=True)
	id = models.IntegerField(primary_key=True)
	tryton_id = models.IntegerField(blank=True, null=True)
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
		db_table = u'"master\".\"spt_tipoproblema"'

	def __str__(self):
		return self.descripcion


class SptSubTipoProblema(models.Model):
	#id = models.AutoField(primary_key=True)
	id = models.IntegerField(primary_key=True)
	tryton_id = models.IntegerField(blank=True, null=True)
	descripcion = models.TextField(blank=True, null=True)
	tipoproblema = models.ForeignKey(SptTipoProblema, models.DO_NOTHING, blank=True, null=True,db_column="tipoproblema")
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
		db_table = u'"master\".\"spt_subtipoproblema"'

	def __str__(self):
		return self.descripcion


class SptSolicitudServicio(models.Model):
	id = models.UUIDField(primary_key=True, default = uuid.uuid4)
	tryton_id = models.IntegerField(blank=True, null=True)

	secuencia = models.CharField(max_length=25, blank=True, null=True)
	fecha = models.DateTimeField(blank=True, null=True)
	titulo = models.CharField(max_length=255, blank=True, null=True)
	#asignado_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="asignado_id", related_name="asignado_id")
	
	estado_solicitud = models.CharField(max_length=1, blank=True, null=True)
	
	equipo_id = models.ForeignKey(SptEquipo, models.DO_NOTHING, blank=True, null=True,db_column="equipo_id",related_name="sltsrv_equipo_id")
	descripcion = models.TextField(blank=True, null=True)
	resolucion = models.TextField(blank=True, null=True)
	nuevo_custodio_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="nuevo_custodio_id", related_name="nuevo_custodio_id")
	proveedor_mantenimiento_id = models.ForeignKey(PerPersona, models.DO_NOTHING, blank=True, null=True,db_column="proveedor_mantenimiento_id", related_name="proveedor_mantenimiento_id")
	fecha_envio = models.DateTimeField(null=True,blank=True, help_text="fecha envio proveedor de mantenimineto")
	fecha_retorno = models.DateTimeField(null=True,blank=True, help_text="fecha retorno proveedor de mantenimineto")

	tipo_servicio = models.CharField(max_length=50, blank=True, null=True)
	tipo_actividad = models.CharField(max_length=255, blank=True, null=True)
	prioridad = models.CharField(max_length=50, blank=True, null=True)
	urgencia = models.CharField(max_length=50, blank=True, null=True)
	foto_equipo = models.TextField(max_length=400, blank=True, null=True) 

	conclusion = models.CharField(max_length=255, blank=True, null=True)

	sysaid_ticket = models.CharField(max_length=20, blank=True, null=True)
	sysaid_fe_solicitud = models.DateTimeField(null=True,blank=True, help_text="Campos del sysaid")
	sysaid_fe_vencimiento = models.DateTimeField(null=True,blank=True, help_text="Campos del sysaid")
	sysaid_categoria = models.CharField(null=True,blank=True,max_length=50, help_text="Campos del sysaid")
	sysaid_subcategoria = models.CharField(null=True,blank=True,max_length=50, help_text="Campos del sysaid")
	#sysaid_subcategoriaop = models.CharField(max_length=50, help_text="Campos del sysaid", blank=True, null=True)
	#sysaid_usersolicitante = models.CharField(null=True,blank=True,max_length=100 )
	sysaid_usersolicitante = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="sysaid_usersolicitante", related_name="user_solicitante_id")
	sysaid_userasignado = models.CharField(max_length=100, blank=True, null=True)
	
	preguntas_resp = models.TextField(blank=True, null=True)

	estado = models.CharField(max_length=1, default='A')
	eliminado = models.BooleanField(blank=True, default='f')
	fecha_ingreso = models.DateTimeField(auto_now_add=True)
	fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
	isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
	usuario_ingreso = models.TextField(default='ADM')
	usuario_ultima_modificacion = models.TextField(blank=True, null=True)
	observaciones = models.TextField(blank=True, null=True)
	observaciones_dba = models.TextField(blank=True, null=True)

	class Meta:
		managed = True
		db_table = u'"master\".\"spt_solicitudservicio"'



"""
class SptSolicitudServicioEquipos(models.Model):
	id = models.UUIDField(primary_key=True, default = uuid.uuid4)
	
	equipo_id = models.ForeignKey(SptEquipo, models.DO_NOTHING, blank=True, null=True,db_column="equipo_id")

	estado = models.CharField(max_length=1, default='A')
	eliminado = models.BooleanField(blank=True, default='f')
	fecha_ingreso = models.DateTimeField(auto_now_add=True)
	fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
	isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
	usuario_ingreso = models.TextField(default='ADM')
	usuario_ultima_modificacion = models.TextField(blank=True, null=True)
	observaciones = models.TextField(blank=True, null=True)
	observaciones_dba = models.TextField(blank=True, null=True)

	class Meta:
		managed = True
		db_table = u'"master\".\"spt_solicitudservicio_equipo"'
"""


class SptInformeBaja(models.Model):
	id = models.UUIDField(primary_key=True, default = uuid.uuid4)
	tryton_id = models.IntegerField(blank=True, null=True)

	secuencia = models.CharField(max_length=25, blank=True, null=True)

	fecha = models.DateField(blank=True, null=True)
	titulo = models.CharField(max_length=255, blank=True, null=True)
	base_legal = models.TextField(blank=True, null=True)
	desarrollo = models.TextField(blank=True, null=True)
	antecedentes = models.TextField(blank=True, null=True)
	conclusiones = models.TextField(blank=True, null=True)
	recomendaciones = models.TextField(blank=True, null=True)
	estado_informe = models.TextField(max_length=255, blank=True, null=True)

	solicitudservicio_id = models.ForeignKey(SptSolicitudServicio, models.DO_NOTHING, blank=True, null=True,db_column="solicitudservicio_id",related_name="infbaja_solicitudservicio_id")
	funcionario_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="funcionario_id")
	aprobador_id   = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="aprobador_id", related_name="aprobador_id")
	equipo_id = models.ForeignKey(SptEquipo, models.DO_NOTHING, blank=True, null=True,db_column="equipo_id",related_name="infbaja_equipo_id")
	custodio_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="custodio_id",related_name="infbaja_custodio_id")

	tipo_reporte = models.CharField(max_length=1, blank=True, null=True)
	
	estado = models.CharField(max_length=1, default='A')
	eliminado = models.BooleanField(blank=True, default='f')
	fecha_ingreso = models.DateTimeField(auto_now_add=True)
	fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
	isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
	usuario_ingreso = models.TextField(default='ADM')
	usuario_ultima_modificacion = models.TextField(blank=True, null=True)
	observaciones = models.TextField(blank=True, null=True)
	observaciones_dba = models.TextField(blank=True, null=True)

	class Meta:
		managed = True
		db_table = u'"master\".\"spt_informebaja"'


class SptInformeBajaDetalle(models.Model):
	id = models.UUIDField(primary_key=True)
	tryton_id = models.IntegerField(blank=True, null=True)
	cab_infbaja_id = models.ForeignKey(SptInformeBaja, models.DO_NOTHING, blank=True, null=True,db_column="cab_infbaja_id",related_name="det_infbaja")
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
		db_table = u'"master\".\"spt_informe_baja_detalle"'


class SptEquipoCustodioHist(models.Model):
	id = models.UUIDField(primary_key=True)
	tryton_id = models.IntegerField(blank=True, null=True)
	equipo_id = models.ForeignKey(SptEquipo, models.DO_NOTHING, blank=True, null=True,db_column="equipo_id")
	new_custodio_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="new_custodio_id",related_name="new_custodio_id")
	old_custodio_id = models.ForeignKey(PerFuncionario, models.DO_NOTHING, blank=True, null=True,db_column="old_custodio_id",related_name="old_custodio_id")
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
		db_table = u'"master\".\"spt_equipo_custodio_hist"'


class SptListaPregunta(models.Model):
	id = models.UUIDField(primary_key=True)
	tryton_id = models.IntegerField(blank=True, null=True)
	categoria = models.CharField(blank=True, null=True,max_length=200)
	pregunta  = models.TextField(blank=True, null=True)
	orden = models.CharField(blank=True, null=True,max_length=3)
	requerido = models.CharField(blank=True, null=True, max_length=1)
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
		db_table = u'"master\".\"spt_lista_preguntas"'