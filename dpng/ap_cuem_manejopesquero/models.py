import uuid

# DJANGO
from django.db import models

# MODELS
from ap_talentohumano.models import PerFuncionario
from ap_base.models import *

# AUDIT
from simple_history.models import HistoricalRecords


######################################## GUIAS DOMESTICAS ######################################



class GmvGuiadom(models.Model):
    id = models.UUIDField(primary_key=True)
    nguiadomestica = models.TextField(blank=True, null=True)
    fechaemision = models.DateField(blank=True, null=True)
    hora_emision = models.TextField(blank=True, null=True)
    lugaremision = models.TextField(blank=True, null=True)
    tipo_transporte = models.TextField(blank=True, null=True)
    totaltransportadolib = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    totaltransportadoind = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    provincia = models.ForeignKey(GeoProvincia, models.DO_NOTHING, blank=True, null=True)
    ciudad = models.ForeignKey(GeoCiudad, models.DO_NOTHING, blank=True, null=True)
    puerto = models.ForeignKey(GeoSitio, models.DO_NOTHING, blank=True, null=True)
    persona = models.ForeignKey(PerPersona, models.DO_NOTHING, blank=True, null=True)
    remoto_id = models.UUIDField(blank=True, null=True)
    observaciones0 = models.TextField(blank=True, null=True)
    observaciones1 = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    hora_ultima_modificacion = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    prev_id = models.UUIDField(blank=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    emitidapor_persona_id = models.UUIDField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"gmv_guiadom"'


class GmvEspeciesCantidades(models.Model):
    id = models.UUIDField(primary_key=True)
    descripcion = models.TextField(blank=True, null=True)
    especie = models.ForeignKey(BioEspecie, models.DO_NOTHING, blank=True, null=True)
    tipo = models.TextField(blank=True, null=True)
    lib_entero = models.DecimalField(max_digits=65535, decimal_places=2, blank=True, null=True)
    ind_entero = models.DecimalField(max_digits=65535, decimal_places=2, blank=True, null=True)
    lib_colas_filetes = models.DecimalField(max_digits=65535, decimal_places=2, blank=True, null=True)
    ind_colas_filetes = models.DecimalField(max_digits=65535, decimal_places=2, blank=True, null=True)
    ind_entero_or_lb_colas = models.CharField(max_length=5, blank=True, null=True)
    bloquear_cant_vacias = models.CharField(max_length=5, blank=True, null=True)
    periodo_inicio = models.DateField(blank=True, null=True)
    periodo_fin = models.DateField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    periodo = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'gmv_especies_cantidades'


class GmvGuiadomConfig(models.Model):
    id = models.UUIDField(primary_key=True)
    lugaremision = models.TextField(blank=True, null=True)
    puerto_id = models.UUIDField(blank=True, null=True)
    provincia_destino_id = models.UUIDField(blank=True, null=True)
    ciudad_destino_id = models.UUIDField(blank=True, null=True)
    tipotransp_id = models.UUIDField(blank=True, null=True)
    estado_especie_id = models.UUIDField(blank=True, null=True)
    isla_trabajo_id = models.UUIDField(blank=True, null=True)
    total_lib_pescado = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    remoto_id = models.UUIDField(blank=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"gmv_guiadom_config"'



class GmvGuiadomProductos(models.Model):
    id = models.UUIDField(primary_key=True)
    lib_entero = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    ind_entero = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    lib_colas_filetes = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    ind_colas_filetes = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    especie = models.ForeignKey(BioEspecie, models.DO_NOTHING, blank=True, null=True)
    guiamovdom = models.ForeignKey(GmvGuiadom, models.DO_NOTHING, blank=True, null=True)
    observaciones0 = models.TextField(blank=True, null=True)
    observaciones1 = models.TextField(blank=True, null=True)
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    remoto_id = models.UUIDField(blank=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"gmv_guiadom_productos"'


class GmvGuiadomProductospescado(models.Model):
    id = models.UUIDField(primary_key=True)
    peso = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    individuos = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    especie = models.ForeignKey(BioEspecie, models.DO_NOTHING, blank=True, null=True)
    estados_especie = models.ForeignKey(SisCatalogo, models.DO_NOTHING, blank=True, null=True)
    guiamovdom = models.ForeignKey(GmvGuiadom, models.DO_NOTHING, blank=True, null=True)
    observaciones0_field = models.TextField(db_column='observaciones0 ', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.
    observaciones1_field = models.TextField(db_column='observaciones1 ', blank=True, null=True)  # Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.
    usuario_ingreso = models.TextField()
    fecha_ingreso = models.DateTimeField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(blank=True, null=True)
    estado = models.CharField(max_length=1)
    remoto_id = models.UUIDField(blank=True, null=True)
    isla_usuario_ingreso_id = models.UUIDField(blank=True, null=True)
    eliminado = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = u'"master\".\"gmv_guiadom_productospescado"'





######################################## PARMA Y PERMISO DE PESCA ######################################


class AppFdTdatospescador(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    datecreated = models.DateTimeField(blank=True, null=True)
    datemodified = models.DateTimeField(blank=True, null=True)
    c_direccion = models.TextField(blank=True, null=True)
    c_motivoingreso = models.TextField(blank=True, null=True)
    c_sexo = models.TextField(blank=True, null=True)
    c_provincia = models.TextField(blank=True, null=True)
    c_isla = models.TextField(blank=True, null=True)
    c_fechafallecimiento = models.TextField(blank=True, null=True)
    c_paisnacimiento = models.TextField(blank=True, null=True)
    c_instruccionacademica = models.TextField(blank=True, null=True)
    c_especificacionlaboral = models.TextField(blank=True, null=True)
    c_fotopescador = models.TextField(blank=True, null=True)
    c_documentodefuncion = models.TextField(blank=True, null=True)
    c_nombrepescadoranterior = models.TextField(blank=True, null=True)
    c_fechanacimiento = models.TextField(blank=True, null=True)
    c_ciudad = models.TextField(blank=True, null=True)
    c_apellidos = models.TextField(blank=True, null=True)
    c_categoriapescador = models.TextField(blank=True, null=True)
    c_telefono = models.TextField(blank=True, null=True)
    c_codigoreferencia = models.TextField(blank=True, null=True)
    c_cooperativa = models.TextField(blank=True, null=True)
    c_email = models.TextField(blank=True, null=True)
    c_nproceso = models.TextField(blank=True, null=True)
    c_cedula = models.TextField(unique=True, blank=True, null=True)
    c_celular = models.TextField(blank=True, null=True)
    c_cargomatriculadigmer = models.TextField(blank=True, null=True)
    c_matriculadigmer = models.TextField(blank=True, null=True)
    c_redessociales = models.TextField(blank=True, null=True)
    c_nresidencia = models.TextField(blank=True, null=True)
    c_nhijos = models.TextField(blank=True, null=True)
    c_tipolicenciaguia = models.TextField(blank=True, null=True)
    c_nombres = models.TextField(blank=True, null=True)
    c_nlicenciaguia = models.TextField(blank=True, null=True)
    c_parmaanterior = models.TextField(blank=True, null=True)
    c_cooperativaembarcacion = models.TextField(blank=True, null=True)
    c_cedulaanterior = models.TextField(blank=True, null=True)
    c_apellidospescadoranterior = models.TextField(blank=True, null=True)
    c_apodo = models.TextField(blank=True, null=True)
    c_procesar = models.TextField(blank=True, null=True)
    c_usuario_modificacion = models.TextField(blank=True, null=True)
    c_usuario_ingreso = models.TextField(blank=True, null=True)
    c_estado = models.TextField(blank=True, null=True)
    c_licenciaparma = models.TextField(blank=True, null=True)
    c_estadosancionado = models.TextField(blank=True, null=True)
    c_estadoeliminado = models.TextField(blank=True, null=True)
    c_foto = models.TextField(blank=True, null=True)
    c_imagen = models.TextField(blank=True, null=True)

    estado = models.CharField(max_length=1,null=True)
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
        db_table = u'"public\".\"app_fd_tdatospescador"'


class AppFdTlicenciaparma(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    datecreated = models.DateTimeField(blank=True, null=True)
    datemodified = models.DateTimeField(blank=True, null=True)
    c_direccion = models.TextField(blank=True, null=True)
    c_motivoingreso = models.TextField(blank=True, null=True)
    c_estadolicencia = models.TextField(blank=True, null=True)
    c_estadotramite = models.TextField(blank=True, null=True)
    c_sexo = models.TextField(blank=True, null=True)
    c_provincia = models.TextField(blank=True, null=True)
    c_isla = models.TextField(blank=True, null=True)
    c_paisnacimiento = models.TextField(blank=True, null=True)
    c_instruccionacademica = models.TextField(blank=True, null=True)
    c_especificacionlaboral = models.TextField(blank=True, null=True)
    c_fechanacimiento = models.TextField(blank=True, null=True)
    c_fechacaducidad = models.TextField(blank=True, null=True)
    c_ciudad = models.TextField(blank=True, null=True)
    c_apellidos = models.TextField(blank=True, null=True)
    c_categoriapescador = models.TextField(blank=True, null=True)
    c_apodo = models.TextField(blank=True, null=True)
    c_cooperativa = models.TextField(blank=True, null=True)
    c_cedula = models.TextField(blank=True, null=True)
    c_telefono = models.TextField(blank=True, null=True)
    c_email = models.TextField(blank=True, null=True)
    c_celular = models.TextField(blank=True, null=True)
    c_nombrepescadoranterior = models.TextField(blank=True, null=True)
    c_nproceso = models.TextField(blank=True, null=True)
    c_fechafallecimiento = models.TextField(blank=True, null=True)
    c_aprobadaecosistemas = models.TextField(blank=True, null=True)
    c_fotopescador = models.TextField(blank=True, null=True)
    c_documentodefuncion = models.TextField(blank=True, null=True)
    c_codigoreferencia = models.TextField(blank=True, null=True)
    c_matriculadigmer = models.TextField(blank=True, null=True)
    c_redessociales = models.TextField(blank=True, null=True)
    c_fechaemision = models.TextField(blank=True, null=True)
    c_nhijos = models.TextField(blank=True, null=True)
    c_tipolicenciaguia = models.TextField(blank=True, null=True)
    c_nombres = models.TextField(blank=True, null=True)
    c_nresidencia = models.TextField(blank=True, null=True)
    c_cargomatriculadigmer = models.TextField(blank=True, null=True)
    c_parmaanterior = models.TextField(blank=True, null=True)
    c_nlicenciaguia = models.TextField(blank=True, null=True)
    c_cooperativaembarcacion = models.TextField(blank=True, null=True)
    c_apellidospescadoranterior = models.TextField(blank=True, null=True)
    c_cedulaanterior = models.TextField(blank=True, null=True)
    c_procesar = models.TextField(blank=True, null=True)
    c_nparma = models.TextField(blank=True, null=True)
    c_bandera_aprobado = models.TextField(blank=True, null=True)
    c_bandera_no_aprobado = models.TextField(blank=True, null=True)
    c_motivonoaprobacion = models.TextField(blank=True, null=True)
    c_directorecosistemas = models.TextField(blank=True, null=True)
    c_estado = models.TextField(blank=True, null=True)
    c_tipoemisionsancristobal = models.TextField(blank=True, null=True)
    c_tipoemisionisabela = models.TextField(blank=True, null=True)
    c_tipoemisionsancruz = models.TextField(blank=True, null=True)
    c_licenciaparma = models.TextField(blank=True, null=True)
    c_directorecosistemasuser = models.TextField(blank=True, null=True)
    c_field57 = models.TextField(blank=True, null=True)
    c_field58 = models.TextField(blank=True, null=True)
    c_field55 = models.TextField(blank=True, null=True)
    c_field56 = models.TextField(blank=True, null=True)
    c_field60 = models.TextField(blank=True, null=True)
    c_field61 = models.TextField(blank=True, null=True)
    c_field62 = models.TextField(blank=True, null=True)
    c_field59 = models.TextField(blank=True, null=True)
    c_tipo_sangre = models.TextField(blank=True, null=True)
    c_field53 = models.TextField(blank=True, null=True)
    c_observacion = models.TextField(blank=True, null=True)

    estado = models.CharField(max_length=1,null=True)
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
        db_table = u'"public\".\"app_fd_tlicenciaparma"'



class AppFdTembarcacionpesca(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    datecreated = models.DateTimeField(blank=True, null=True)
    datemodified = models.DateTimeField(blank=True, null=True)
    c_puntal = models.TextField(blank=True, null=True)
    c_tonelajeneto = models.TextField(blank=True, null=True)
    c_conservacion = models.TextField(blank=True, null=True)
    c_matriculanaval = models.TextField(blank=True, null=True)
    c_fotoembarcacion = models.TextField(blank=True, null=True)
    c_armadordos = models.TextField(blank=True, null=True)
    c_nombreembarcacion = models.TextField(blank=True, null=True)
    c_eslora = models.TextField(blank=True, null=True)
    c_puertoregistro = models.TextField(blank=True, null=True)
    c_tipoembarcacion = models.TextField(blank=True, null=True)
    c_detallemotores = models.TextField(blank=True, null=True)
    c_autonomia = models.TextField(blank=True, null=True)
    c_anioconstruccion = models.TextField(blank=True, null=True)
    c_armadoruno = models.TextField(blank=True, null=True)
    c_manga = models.TextField(blank=True, null=True)
    c_islaorigen = models.TextField(blank=True, null=True)
    c_calado = models.TextField(blank=True, null=True)
    c_lugarconstruccion = models.TextField(blank=True, null=True)
    c_ntripulantes = models.TextField(blank=True, null=True)
    c_materialcasco = models.TextField(blank=True, null=True)
    c_matriculadigmer = models.TextField(blank=True, null=True)
    c_tiempomotoruno = models.TextField(blank=True, null=True)
    c_motordoshp = models.TextField(blank=True, null=True)
    c_marcados = models.TextField(blank=True, null=True)
    c_motorunohp = models.TextField(blank=True, null=True)
    c_marcauno = models.TextField(blank=True, null=True)
    c_tiempomotordos = models.TextField(blank=True, null=True)
    c_usuario_modificacion = models.TextField(blank=True, null=True)
    c_usuario_ingreso = models.TextField(blank=True, null=True)
    c_armadorunocedula = models.TextField(blank=True, null=True)
    c_armadorunoapellidos = models.TextField(blank=True, null=True)
    c_armadordosnombres = models.TextField(blank=True, null=True)
    c_armadordoscedula = models.TextField(blank=True, null=True)
    c_armadorunonombres = models.TextField(blank=True, null=True)
    c_armadordosapellidos = models.TextField(blank=True, null=True)
    c_permisopesca = models.TextField(blank=True, null=True)
    c_categoria = models.TextField(blank=True, null=True)
    c_armadorunoparma = models.TextField(blank=True, null=True)
    c_armadordosparma = models.TextField(blank=True, null=True)
    c_procesar = models.TextField(blank=True, null=True)
    c_estado = models.TextField(blank=True, null=True)
    c_tonelajebruto = models.TextField(blank=True, null=True)

    estado = models.CharField(max_length=1,null=True)
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
        db_table = u'"public\".\"app_fd_tembarcacionpesca"'


class AppFdTinspecciontecnica(models.Model):
	id = models.CharField(primary_key=True, max_length=255)
	datecreated = models.DateTimeField(blank=True, null=True)
	datemodified = models.DateTimeField(blank=True, null=True)
	c_esloravigente = models.TextField(blank=True, null=True)
	c_cambiarfotografia = models.TextField(blank=True, null=True)
	c_observaciones = models.TextField(blank=True, null=True)
	c_tiempomotoruno = models.TextField(blank=True, null=True)
	c_motordoshp = models.TextField(blank=True, null=True)
	c_puntalvigente = models.TextField(blank=True, null=True)
	c_marcados = models.TextField(blank=True, null=True)
	c_fechainspeccion = models.TextField(blank=True, null=True)
	c_motorunohp = models.TextField(blank=True, null=True)
	c_marcauno = models.TextField(blank=True, null=True)
	c_nombreembarcacion = models.TextField(blank=True, null=True)
	c_tiempomotordos = models.TextField(blank=True, null=True)
	c_tipoembarcacion = models.TextField(blank=True, null=True)
	c_coincidenmatricula = models.TextField(blank=True, null=True)
	c_mangavigente = models.TextField(blank=True, null=True)
	c_modificacionembarcacion = models.TextField(blank=True, null=True)
	c_estapintado = models.TextField(blank=True, null=True)
	c_armadoruno = models.TextField(blank=True, null=True)
	c_puntal = models.TextField(blank=True, null=True)
	c_inspeccion = models.TextField(blank=True, null=True)
	c_eslora = models.TextField(blank=True, null=True)
	c_manga = models.TextField(blank=True, null=True)
	c_guardaparqueresponsable = models.TextField(blank=True, null=True)
	c_fotoembarcacion = models.TextField(blank=True, null=True)
	c_matriculadigmer = models.TextField(blank=True, null=True)
	c_tienepintadomatricula = models.TextField(blank=True, null=True)
	c_coincidefotografia = models.TextField(blank=True, null=True)
	c_armadorunocedula = models.TextField(blank=True, null=True)
	c_armadorunoapellidos = models.TextField(blank=True, null=True)
	c_armadordosnombres = models.TextField(blank=True, null=True)
	c_armadordoscedula = models.TextField(blank=True, null=True)
	c_armadorunonombres = models.TextField(blank=True, null=True)
	c_armadorpresente = models.TextField(blank=True, null=True)
	c_armadordosapellidos = models.TextField(blank=True, null=True)
	c_armadorunoparma = models.TextField(blank=True, null=True)
	c_armadordosparma = models.TextField(blank=True, null=True)

	estado = models.CharField(max_length=1,null=True)
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
		db_table = u'"public\".\"app_fd_tinspecciontecnica"'


class AppFdTpermisopesca(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    datecreated = models.DateTimeField(blank=True, null=True)
    datemodified = models.DateTimeField(blank=True, null=True)
    c_puntal = models.TextField(blank=True, null=True)
    c_tonelajeneto = models.TextField(blank=True, null=True)
    c_conservacion = models.TextField(blank=True, null=True)
    c_fotoembarcacion = models.TextField(blank=True, null=True)
    c_armadordos = models.TextField(blank=True, null=True)
    c_estadotramite = models.TextField(blank=True, null=True)
    c_nombreembarcacion = models.TextField(blank=True, null=True)
    c_eslora = models.TextField(blank=True, null=True)
    c_permisopesca = models.TextField(blank=True, null=True)
    c_tipoembarcacion = models.TextField(blank=True, null=True)
    c_artesdepesca = models.TextField(blank=True, null=True)
    c_puertoregistro = models.TextField(blank=True, null=True)
    c_detallemotores = models.TextField(blank=True, null=True)
    c_autonomia = models.TextField(blank=True, null=True)
    c_especiesautorizadas = models.TextField(blank=True, null=True)
    c_anioconstruccion = models.TextField(blank=True, null=True)
    c_armadoruno = models.TextField(blank=True, null=True)
    c_manga = models.TextField(blank=True, null=True)
    c_estadopermiso = models.TextField(blank=True, null=True)
    c_islaorigen = models.TextField(blank=True, null=True)
    c_calado = models.TextField(blank=True, null=True)
    c_lugarconstruccion = models.TextField(blank=True, null=True)
    c_ntripulantes = models.TextField(blank=True, null=True)
    c_fechacaducidad = models.TextField(blank=True, null=True)
    c_materialcasco = models.TextField(blank=True, null=True)
    c_aprobadaecosistemas = models.TextField(blank=True, null=True)
    c_fechainspecciontecnica = models.TextField(blank=True, null=True)
    c_fechaemision = models.TextField(blank=True, null=True)
    c_matriculadigmer = models.TextField(blank=True, null=True)
    c_procesar = models.TextField(blank=True, null=True)
    c_tiempomotoruno = models.TextField(blank=True, null=True)
    c_motordoshp = models.TextField(blank=True, null=True)
    c_marcados = models.TextField(blank=True, null=True)
    c_motorunohp = models.TextField(blank=True, null=True)
    c_marcauno = models.TextField(blank=True, null=True)
    c_tiempomotordos = models.TextField(blank=True, null=True)
    c_armadorunocedula = models.TextField(blank=True, null=True)
    c_armadorunoapellidos = models.TextField(blank=True, null=True)
    c_armadordoscedula = models.TextField(blank=True, null=True)
    c_armadordosnombres = models.TextField(blank=True, null=True)
    c_armadorunonombres = models.TextField(blank=True, null=True)
    c_tipoemisionsancristobal = models.TextField(blank=True, null=True)
    c_directorecosistemas = models.TextField(blank=True, null=True)
    c_tipoemisionisabela = models.TextField(blank=True, null=True)
    c_tipoemisionsancruz = models.TextField(blank=True, null=True)
    c_armadordosapellidos = models.TextField(blank=True, null=True)
    c_operacion = models.TextField(blank=True, null=True)
    c_categoria = models.TextField(blank=True, null=True)
    c_armadorunoparma = models.TextField(blank=True, null=True)
    c_armadordosparma = models.TextField(blank=True, null=True)
    c_inactivo = models.BooleanField(blank=True, null=True)
    c_tonelajebruto = models.TextField(blank=True, null=True)
    c_eliminado = models.TextField(blank=True, null=True)
    c_observaciones = models.TextField(blank=True, null=True)

    estado = models.CharField(max_length=1,null=True)
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
        db_table = u'"public\".\"app_fd_tpermisopesca"'



class AppFdTpermisocompesblan(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    datecreated = models.DateTimeField(blank=True, null=True)
    datemodified = models.DateTimeField(blank=True, null=True)
    c_direccion = models.TextField(blank=True, null=True)
    c_puertocomercializacion = models.TextField(blank=True, null=True)
    c_apellidos = models.TextField(blank=True, null=True)
    c_fechaemision = models.TextField(blank=True, null=True)
    c_telefono = models.TextField(blank=True, null=True)
    c_nresidencia = models.TextField(blank=True, null=True)
    c_isla = models.TextField(blank=True, null=True)
    c_fechaingreso = models.TextField(blank=True, null=True)
    c_nombres = models.TextField(blank=True, null=True)
    c_email = models.TextField(blank=True, null=True)
    c_suscrito = models.TextField(blank=True, null=True)
    c_fotocomerciante = models.TextField(blank=True, null=True)
    c_cedula = models.TextField(blank=True, null=True)
    c_fechacaducidad = models.TextField(blank=True, null=True)
    c_celular = models.TextField(blank=True, null=True)
    c_estadotramite = models.TextField(blank=True, null=True)
    c_aprobadamanejopesquero = models.TextField(blank=True, null=True)
    c_aprobadacuem = models.TextField(blank=True, null=True)
    c_estadopermiso = models.TextField(blank=True, null=True)
    c_aprobadaecosistemas = models.TextField(blank=True, null=True)
    c_codigopermiso = models.TextField(blank=True, null=True)
    c_compania = models.TextField(blank=True, null=True)
    c_temporadapesqueria = models.TextField(blank=True, null=True)
    c_oficioingreso = models.TextField(blank=True, null=True)
    c_codigopermisocomercializacionpescablanca = models.TextField(blank=True, null=True)
    c_motivonoaprobacion = models.TextField(blank=True, null=True)
    c_fechaingresooficio = models.TextField(blank=True, null=True)
    c_cooperativa = models.TextField(blank=True, null=True)
    c_firmadirectorecosistemas = models.TextField(blank=True, null=True)
    c_directorecosistemas = models.TextField(blank=True, null=True)


    estado = models.CharField(max_length=1,null=True)
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
        db_table = u'"public\".\"app_fd_tpermisocompesblan"'


   

class AppFdTpermisocomlangosta(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    datecreated = models.DateTimeField(blank=True, null=True)
    datemodified = models.DateTimeField(blank=True, null=True)
    c_direccion = models.TextField(blank=True, null=True)
    c_puertocomercializacion = models.TextField(blank=True, null=True)
    c_apellidos = models.TextField(blank=True, null=True)
    c_fechaemision = models.TextField(blank=True, null=True)
    c_telefono = models.TextField(blank=True, null=True)
    c_nresidencia = models.TextField(blank=True, null=True)
    c_isla = models.TextField(blank=True, null=True)
    c_nombres = models.TextField(blank=True, null=True)
    c_email = models.TextField(blank=True, null=True)
    c_fotocomerciante = models.TextField(blank=True, null=True)
    c_cedula = models.TextField(blank=True, null=True)
    c_fechacaducidad = models.TextField(blank=True, null=True)
    c_celular = models.TextField(blank=True, null=True)
    c_estadotramite = models.TextField(blank=True, null=True)
    c_aprobadamanejopesquero = models.TextField(blank=True, null=True)
    c_aprobadacuem = models.TextField(blank=True, null=True)
    c_estadopermiso = models.TextField(blank=True, null=True)
    c_aprobadaecosistemas = models.TextField(blank=True, null=True)
    c_compania = models.TextField(blank=True, null=True)
    c_oficioingreso = models.TextField(blank=True, null=True)
    c_fechaingresooficio = models.TextField(blank=True, null=True)
    c_temporadapesqueria = models.TextField(blank=True, null=True)
    c_permisodpg = models.TextField(blank=True, null=True)
    c_codigopermisocomercializacionlangosta = models.TextField(blank=True, null=True)
    c_motivonoaprobacion = models.TextField(blank=True, null=True)
    c_cooperativa = models.TextField(blank=True, null=True)
    c_firmadirectorecosistemas = models.TextField(blank=True, null=True)
    c_directorecosistemas = models.TextField(blank=True, null=True)



    estado = models.CharField(max_length=1,null=True)
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
        db_table = u'"public\".\"app_fd_tpermisocomlangosta"'





# ---------------------------- VIEWS -----------------------------------
class VwUltimaslicenciasParma(models.Model):
    id = models.TextField(primary_key=True,db_column="id")
    c_isla = models.TextField(db_column="c_isla", blank=True, null=True)
    c_cedula = models.TextField(db_column="c_cedula", blank=True, null=True)
    c_nombres = models.TextField(db_column="c_nombres", blank=True, null=True)
    c_apellidos = models.TextField(db_column="c_apellidos", blank=True, null=True)
    c_licenciaparma = models.TextField(db_column="c_licenciaparma", blank=True, null=True)
    c_fechaemision = models.TextField(db_column="c_fechaemision", blank=True, null=True)
    c_fechacaducidad = models.DateField(db_column="c_fechacaducidad",blank=True, null=True)
    estado = models.DateField(db_column="estado",blank=True, null=True)
    eliminado = models.TextField(db_column="eliminado", blank=True, null=True)
    c_aprobadaecosistemas = models.TextField(db_column="c_aprobadaecosistemas", blank=True, null=True)
   
    class Meta:
        managed = False
        db_table = u'"master\".\"vw_ultimaslicencias_parma"'

