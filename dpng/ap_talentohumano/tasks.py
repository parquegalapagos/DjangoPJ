
from __future__ import absolute_import, unicode_literals
from celery import shared_task
from datetime import date,timedelta

# Django
from django.db.models import Q
from django.conf import settings

# app
from ap_base.mailer import Mailer
from ap_talentohumano.models import *
from ap_base.models import *

# Constantes
ALERTA_RANGO_DIAS = getattr(settings, "ALERTA_RANGO_DIAS", None)
SUBJECTMSJ_UATH = "Notificaciones UATH"
MSJ_FIN_VIGENCIA = "Cumplió su periodo de vigencia! Inactivado por sistema SIA."


def send_mail(subject,template,context,to_emails):
	print(">> Enviar Correo >>")
	mail = Mailer()
	mail.send_messages(subject=subject,
					template=template,
					context=context,
					to_emails=to_emails)
	print(">> Fin Enviar Correo >>")
	print('>>>>>>>>>>>>')
	return '>> OK'


def actualizar_perfilfuncionario(item,finaliza_puesto):
	print(">> Actualizar Perfil Funcionario <<")

	# PUESTO ACTUAL O PUESTO PROPUESTO
	es_nuevo_puesto = es_actual_puesto = False
	if item.nuevo_puesto_id:
		es_nuevo_puesto = True
	elif item.actual_puesto_id:
		es_actual_puesto = True
	else:
		es_nuevo_puesto = es_actual_puesto = False

	# ACCION DE PERSONAL
	if item.accionpersonal_otros:
		tipo_accionpersonal = item.accionpersonal_otros.descripcion
		accion = GthAccionpersonal.objects.get(pk=item.accionpersonal_otros.id)

	elif item.accionpersonal_id:
		tipo_accionpersonal = item.accionpersonal_id.descripcion 
		accion = GthAccionpersonal.objects.get(pk=item.accionpersonal_id.id)

	# TRASPASO: CAMBIO DE PUESTO EN EL DISTRIBUTIVO DE FORMA PERMANENTE.
	es_traspaso = False
	if str(accion.id) == '6bed0559-5d87-46aa-a42a-42caab5b421b': #TRASPASO
		es_traspaso = True
		print(">> Se esta realizando un traspaso!!!")


	if accion.accion_id:
		# accion_id: contiene el id padre, los otros items de encargo sin rmu se le agrego una categoria padre que esta en el campo accion_id.
		accion_p = str(accion.accion_id.id)
	else:
		accion_p = ""

	# ENCARGO
	es_encargo = False
	if accion_p == '59918445-f38d-4c70-868c-51521f1480c2' or accion.id == '59918445-f38d-4c70-868c-51521f1480c2':
		es_encargo = True
		print(">> Se esta realizando un Encargo!!!")

	# TRASLADO
	es_traslado = False
	if str(accion.id) == '2c27f7da-d578-4c33-ba43-1c8cbbcfa8d4':
		es_traslado = True
		print(">> Se esta realizando un Traslado!!!")

	# VALIDACION
	regresar_puesto=False
	if finaliza_puesto==True and es_encargo==True:
		regresar_puesto = True;

	if finaliza_puesto==True and es_traslado==True:
		regresar_puesto = True;
	print(">> regresar_puesto: "+str(regresar_puesto))
	print(">> es_traspaso: "+str(es_traspaso))
	print(">> es_actual_puesto: "+str(es_actual_puesto))


	# ACTUALIZAR FUNCIONARIO
	if accion.actualiza_funcionario == 1:
		obj = PerFuncionario.objects.get(pk=item.funcionario_id.id)
		if (es_actual_puesto == True ) and es_traspaso==False:
			print("Situacion Actual")

			if item.actual_isla_trabaja_id:
				print("Isla Trabajo: ")
				isla_obj  = GeoIsla(id=item.actual_isla_trabaja_id.id)

				obj.isla_trabaja_id = isla_obj
				print(isla_obj.descripcion)
			else:
				obj.isla_trabaja_id = None

			if item.actual_dir_estatuto_id:
				print("Direccion: ")
				direccion = DirDepartment(id=item.actual_dir_estatuto_id.id)
				obj.direccion_estatuto_id   = direccion
			else:
				obj.direccion_estatuto_id = None

			if item.actual_proc_estatuto_id:
				print("Proceso: ")
				proceso = DirDepartment(id=item.actual_proc_estatuto_id.id)
				obj.proceso_estatuto_id = proceso
			else:
				obj.proceso_estatuto_id = None

			if item.actual_subprc_estatuto_id:
				print("Subproceso: ")
				subprc = DirDepartment(id=item.actual_subprc_estatuto_id.id)
				obj.subproceso_estatuto_id  = subprc
			else:
				obj.subproceso_estatuto_id = None

			if item.actual_puesto_id:
				print("Puesto Actual: ")
				distributivo = GthCargoDistributivo(id=item.actual_puesto_id.id)
				# obj.cargo_institucional_id  = institucional
				obj.cargo_distributivo_id   = distributivo
			else:
				# obj.cargo_institucional_id = None
				obj.cargo_distributivo_id  = None

			if item.actual_cargo_ocupacional_id:
				print("Cargo Ocupacional: ")
				ocupacional = GthCargoOcupacional(id=item.actual_cargo_ocupacional_id.id)
				obj.cargo_ocupacional_id    = ocupacional
			else:
				obj.cargo_ocupacional_id = None

			obj.rmu = item.actual_rmu

		elif regresar_puesto == True:
			print("Situacion Actual")

			if item.actual_isla_trabaja_id:
				print("Isla Trabajo: ")
				isla_obj  = GeoIsla(id=item.actual_isla_trabaja_id.id)

				obj.isla_trabaja_id = isla_obj
				print(isla_obj.descripcion)
			else:
				obj.isla_trabaja_id = None

			if item.actual_dir_estatuto_id:
				print("Direccion: ")
				direccion = DirDepartment(id=item.actual_dir_estatuto_id.id)
				obj.direccion_estatuto_id   = direccion
			else:
				obj.direccion_estatuto_id = None

			if item.actual_proc_estatuto_id:
				print("Proceso: ")
				proceso = DirDepartment(id=item.actual_proc_estatuto_id.id)
				obj.proceso_estatuto_id = proceso
			else:
				obj.proceso_estatuto_id = None

			if item.actual_subprc_estatuto_id:
				print("Subproceso: ")
				subprc = DirDepartment(id=item.actual_subprc_estatuto_id.id)
				obj.subproceso_estatuto_id  = subprc
			else:
				obj.subproceso_estatuto_id = None

			if item.actual_puesto_id:
				print("Puesto Actual: ")
				#distributivo = GthCargoDistributivo(id=item.nuevo_puesto_id.id)
				institucional = GthCargoInstitucional(id=item.actual_cargo_institucional_id.id)
				obj.cargo_institucional_id  = institucional
				#obj.cargo_distributivo_id   = distributivo
			else:
				# obj.cargo_institucional_id = None
				obj.cargo_distributivo_id  = None

			if item.actual_cargo_ocupacional_id:
				print("Cargo Ocupacional: ")
				ocupacional = GthCargoOcupacional(id=item.actual_cargo_ocupacional_id.id)
				obj.cargo_ocupacional_id    = ocupacional
			else:
				obj.cargo_ocupacional_id = None

			obj.rmu = item.actual_rmu

		elif es_nuevo_puesto == True:
			print("Situacion Nueva: "+str(item.nuevo_isla_trabaja_id.id))

			if item.nuevo_isla_trabaja_id:
				isla_obj  = GeoIsla(id=item.nuevo_isla_trabaja_id.id)
				print("Isla Trabajo: "+str(isla_obj.id))
				obj.isla_trabaja_id = isla_obj
			else:
				obj.isla_trabaja_id = None

			if item.nuevo_dir_estatuto_id:
				direccion = DirDepartment(id=item.nuevo_dir_estatuto_id.id)
				print("Direccion: "+str(direccion.id))
				obj.direccion_estatuto_id   = direccion
			else:
				obj.direccion_estatuto_id = None

			if item.nuevo_proc_estatuto_id:
				proceso = DirDepartment(id=item.nuevo_proc_estatuto_id.id)
				print("Proceso: "+str(proceso.id))
				obj.proceso_estatuto_id = proceso
			else:
				obj.proceso_estatuto_id = None

			if item.nuevo_subprc_estatuto_id:

				subprc = DirDepartment(id=item.nuevo_subprc_estatuto_id.id)
				print(str(subprc.id))
				obj.subproceso_estatuto_id  = subprc
			else:
				obj.subproceso_estatuto_id = None

			if item.nuevo_puesto_id:
				if es_traspaso:
					institucional = GthCargoInstitucional(id=item.nuevo_puesto_id.id)
					distributivo_tmp = GthCargoDistributivo.objects.all().filter(Q(nombre=item.nuevo_puesto_id.nombre))
					distributivo = None
					for itemDist in distributivo_tmp:
						distributivo = GthCargoDistributivo(id=itemDist.id)
					obj.cargo_distributivo_id = distributivo
				else:
					institucional = GthCargoInstitucional(id=item.nuevo_puesto_id.id)

				print("Puesto: "+str(institucional.id))
				obj.cargo_institucional_id  = institucional
			else:
				obj.cargo_institucional_id = None

			if item.nuevo_cargo_ocupacional_id:
				ocupacional = GthCargoOcupacional(id=item.nuevo_cargo_ocupacional_id.id)
				obj.cargo_ocupacional_id = ocupacional
				print("Cargo Ocupacional: "+str(ocupacional.id))
			else:
				obj.cargo_ocupacional_id = None

			obj.rmu = item.nuevo_rmu

		else:
			msj = ">> No se tiene un puesto asignado PerFuncionarioAccionpersonal.id: " + str(item.id)
			print(msj)

		print("Funcionario: ")
		print(obj)
		obj.save()
		msj = ">> Se actualizo funcionario.id: " + str(obj.id)
		print(msj)

def fin_accionpersonal_antesdetiempo(item):
	print(">> Fin Accion Personal Antes de Tiempo >>")

	# EXISTE UNA ACCION ANTERIOR
	if item.accion_precedente:
		obj = PerFuncionarioAccionpersonal.objects.get(pk=item.accion_precedente)
		obj.estado_ejecucion = "F"
		if item.fecha_rige_accpersonal:
			obj.fecha_hasta_accpersonal_final = item.fecha_rige_accpersonal

		if obj.observaciones =="" or obj.observaciones == None:
			obj.observaciones_sys = MSJ_FIN_VIGENCIA
		else:
			obj.observaciones_sys = obj.observaciones + " - " + MSJ_FIN_VIGENCIA
		obj.save()

	


def correo_accionpersonal(item):
	print('> UATH: Crear correo_accionpersonal')

	today = date.today()

	# PUESTO ACTUAL O PUESTO PROPUESTO
	es_nuevo = es_actual = False
	if item.nuevo_puesto_id:
		es_nuevo = True
	elif item.actual_puesto_id:
		es_actual = True
	else:
		es_nuevo = es_actual = False

	# TIPO DE ACCION DE PERSONAL U OTROS ITEMS
	if item.accionpersonal_otros:
		tipo_accionpersonal = item.accionpersonal_otros.descripcion
		tipo_accionpersonal_id = item.accionpersonal_otros.id
	elif item.accionpersonal_id:
		tipo_accionpersonal = item.accionpersonal_id.descripcion
		tipo_accionpersonal_id = item.accionpersonal_id.id

	# FUNCIONARIO
	
	if item.funcionario_id:
		if item.funcionario_id.persona_id:
			nombre_completo = item.funcionario_id.persona_id.nombre_completo
		else:
			nombre_completo = None
	else:
		nombre_completo = None
	
	
	if es_nuevo:
		# DIRECCION
		if item.actual_dir_estatuto_id:
			dir_estatuto = item.nuevo_dir_estatuto_id.name
		else:
			dir_estatuto = None

		# PROCESO
		if item.actual_proc_estatuto_id:
			proc_estatuto = item.nuevo_proc_estatuto_id.name
		else:
			proc_estatuto = None

		# SUBPROCESO
		if item.actual_subprc_estatuto_id:
			subprc_estatuto = item.nuevo_subprc_estatuto_id.name
		else:
			subprc_estatuto = None
		
		# PUESTO
		if item.nuevo_puesto_id:
			puesto = item.nuevo_puesto_id.nombre
		else:
			puesto = None

	elif es_actual:
		# DIRECCION
		if item.actual_dir_estatuto_id:
			dir_estatuto = item.actual_dir_estatuto_id.name
		else:
			dir_estatuto = None

		# PROCESO
		if item.actual_proc_estatuto_id:
			proc_estatuto = item.actual_proc_estatuto_id.name
		else:
			proc_estatuto = None

		# SUBPROCESO
		if item.actual_subprc_estatuto_id:
			subprc_estatuto = item.actual_subprc_estatuto_id.name
		else:
			subprc_estatuto = None

		# PUESTO
		if item.actual_puesto_id:
			puesto = item.actual_puesto_id.nombre
		else:
			puesto = None
	else:
		print("Funcionario no tiene un puesto asignado, per_funcionarioaccionpersonal_id: "+str(item.id))
	
	context = {
		'num_accion_personal': item.descripcion ,
		'nombre_completo': nombre_completo,
		'tipo_accionpersonal': tipo_accionpersonal,
		'direccion':dir_estatuto,
		'proceso': proc_estatuto,
		'subproceso': subprc_estatuto,
		'puesto': puesto,
		'fecha_inicio': item.fecha_rige_accpersonal,
		'fecha_fin': item.fecha_hasta_accpersonal
	}

	accion_personal = GthAccionpersonal.objects.get(pk=tipo_accionpersonal_id)
	try:
		funcionarios_id_items = accion_personal.funcionarios.split("|")
		print(funcionarios_id_items)

		# EMAILS
		emails = []
		if funcionarios_id_items:
			for funcionarios_id_item in funcionarios_id_items:
				print('******')
				if funcionarios_id_item != "":
					func = PerFuncionario.objects.get(pk=funcionarios_id_item)
					msj = ">> Correo: " + func.email
					print(msj)
					emails.append(func.email)

		print(emails)
		
		# NOTIFICACION INICIAL
		if item.fecha_rige_accpersonal == today:
			print(">> NOTIFICACION INICIAL")
			print(msj)

			template = "emails/uath_notificacionesAccPersonal.html"
			send_mail(SUBJECTMSJ_UATH,template,context,emails)

		# NOTIFICACION POR CADUCAR
		if item.fecha_hasta_accpersonal:
			if today == item.fecha_hasta_accpersonal - timedelta(ALERTA_RANGO_DIAS) :
				print(">> NOTIFICACION POR CADUCAR")
				print(msj)

				context["descripcion1"] = ' finaliza el '
				template = "emails/uath_notificacionesAccPersonalPorCaducarFinalizado.html"
				send_mail(SUBJECTMSJ_UATH,template,context,emails)

		# NOTIFICACION CUANDO CADUCA
		if today == item.fecha_hasta_accpersonal:
			print(">> NOTIFICACION CUANDO CADUCA")
			print(msj)

			context["descripcion1"] = ' finalizo con fecha '
			template = "emails/uath_notificacionesAccPersonalPorCaducarFinalizado.html"
			send_mail(SUBJECTMSJ_UATH,template,context,emails)

	except Exception as e:
		print('>>> No hay usuarios para el envio de correos asignados a la accion de personal: '+accion_personal.descripcion)
		print(e)

	# print("Funcionario no tiene correo asignado per_funcionarioaccionpersonal_id: "+e.id)


	print('> UATH: Fin Crear Correo')
	print('>>>>>>>>>>>>')
	return ">>>> OK"



@shared_task(name="pc_uath_notificacionesUath")
def TP_notificacionesUATH():
	print('> UATH: Notificaciones por correo')
	
	today = date.today()
	items = PerFuncionarioAccionpersonal.objects.all().filter(Q(estado='A'),Q(eliminado='f'),Q(estado_ejecucion__in=['P']))

	for item in items:
		correo_accionpersonal(item)

	print('> UATH: Fin Notificaciones por correo')
	print('>>>>>>>>>>>>')
	return ">>>> OK"


@shared_task(name="pc_uath_accionpersonal")
def TP_AccionPersonal():
	print('> UATH: Checking OTROS')

	today = date.today()
	
	# ESTADO CREADO Y ACTUALIZADO "C" "A" 
	# items = PerFuncionarioAccionpersonal.objects.all().filter(Q(estado='A'),Q(eliminado='f'),Q(estado_ejecucion='C')|Q(estado_ejecucion='A'),Q(fecha_rige_accpersonal__lte=today))
	items = PerFuncionarioAccionpersonal.objects.all().filter( Q(estado='A'),Q(eliminado='f'),Q(estado_ejecucion='C')|Q(estado_ejecucion='A') )
	for item in items:
		if today == item.fecha_rige_accpersonal:
			print(">> FECHA ACTUAL <<")
			# ACTUALIZAR ESTADO EJECUCION
			item.estado_ejecucion = "P"
			item.save()
			msj = ">> Se actualizo PerFuncionarioAccionPersonal.id: " + str(item.id)
			print(msj)

			msj = ">> Estado -> PROCESADO "
			print(msj)

			actualizar_perfilfuncionario(item,False)
			fin_accionpersonal_antesdetiempo(item)
			correo_accionpersonal(item)

		elif today >= item.fecha_rige_accpersonal:
			# ACTUALIZAR ESTADO EJECUCION
			item.estado_ejecucion = "P"
			item.save()
			msj = ">> Se actualizo PerFuncionarioAccionPersonal.id: " + str(item.id)
			print(msj)

			#actualizar_perfilfuncionario(item,False)
			fin_accionpersonal_antesdetiempo(item)

			msj = ">> Estado -> PROCESADO "
			print(msj)

	# ESTADO EN EJECUCION "P"
	items = PerFuncionarioAccionpersonal.objects.all().filter( Q(estado='A'),Q(eliminado='f'),Q(estado_ejecucion='P')|Q(estado_ejecucion='A') )
	for item in items:
		if item.fecha_hasta_accpersonal:
			if today == item.fecha_hasta_accpersonal:
				print(">> FECHA FINAL <<")
				# ACTUALIZAR ESTADO EJECUCION
				item.estado_ejecucion = "F"
				item.observaciones_sys = MSJ_FIN_VIGENCIA
				item.save()
				msj = ">> Se actualizo PerFuncionarioAccionPersonal.id: " + str(item.id)
				print(msj)

				msj = ">> Estado -> FINALIZADO "
				print(msj)


				actualizar_perfilfuncionario(item,True)
				correo_accionpersonal(item)

			elif today >= item.fecha_hasta_accpersonal:
				# ACTUALIZAR ESTADO EJECUCION
				item.estado_ejecucion = "F"
				item.observaciones_sys = MSJ_FIN_VIGENCIA
				item.save()
				msj = ">> Se actualizo PerFuncionarioAccionPersonal.id: " + str(item.id)
				print(msj)
				
				msj = ">> Estado -> FINALIZADO "
				print(msj)

				#actualizar_perfilfuncionario(item,True)

		# FINALIZACION DE ACC PERSONAL POR ACCCION PRECEDENTE
		if item.accion_precedente:
			if today > item.fecha_rige_accpersonal:	
				# FINALIZACION DE ACC.PERSONAL
				item.estado_ejecucion = "F"
				item.save()
				if item.observaciones =="" or item.observaciones == None:
					item.observaciones_sys = MSJ_FIN_VIGENCIA
				else:
					item.observaciones_sys = observaciones_sys + " - " + MSJ_FIN_VIGENCIA
				item.save()



			
	print('> UATH: Fin Checking OTROS')
	print('>>>>>>>>>>>>')
	return ">>>> OK"






def correo_controlPersonalUath(item):
	print('> UATH: Crear correo_controlPersonalUath')

	today = date.today()
	# FUNCIONARIO
	try:
		# EMAILS
		emails = []
		if item.funcionario_id:
			func = PerFuncionario.objects.get(pk=item.funcionario_id.id)
			msj = ">> Correo: " + func.email
			print(msj)
			emails.append(func.email)

			print(emails)

		# CARNET, UNIFORME, EN_SITIO
		if item.tipo:
			txt = item.tipo

			item_sanc = txt.split("|")
			es_carnet = es_uniforme = es_sitio = 0
			for obj in item_sanc:
				if(obj == "1" ):
					es_carnet = 1
				if(obj == "2" ):
					es_uniforme = 2
				if(obj == "3" ):
					es_sitio = 3


			# NOMBRES FUNCIONARIOS
			nombres = ""
			if func.persona_id:
				nombres = func.persona_id.nombres + " " + func.persona_id.apellidos


					
			# NOTIFICACION INICIAL
			if es_carnet == 1 or es_carnet == 2 or es_carnet == 3:
				print(">> NOTIFICACION")
				print(msj)

				context={
					'es_carnet': es_carnet,
					'es_uniforme': es_uniforme,
					'es_sitio': es_sitio,
					'funcionario_nombres': nombres,
					'fecha': item.fecha
				}

				template = "emails/uath_notificacionesControlPersonal.html"
				send_mail(SUBJECTMSJ_UATH,template,context,emails)

		

	except Exception as e:
		print('>>> No hay usuarios para el envio de correos asignados a la accion de personal: '+accion_personal.descripcion)
		print(e)

	# print("Funcionario no tiene correo asignado per_funcionarioaccionpersonal_id: "+e.id)


	print('> UATH: Fin correo_controlPersonalUath')
	print('>>>>>>>>>>>>')
	return ">>>> OK"


@shared_task(name="pc_uath_controlpersonal_asistencia")
def notificacion_controlpersonal_asistencia():
	print(">> Notificacion Control Personal Asistencia >>")

	items = PerFuncionarioControlesRrhh.objects.all().filter(Q(estado='A'),Q(eliminado='f'),Q(estado_notificacion='CREADO'))
	print(items)
	for item in items:
		correo_controlPersonalUath(item)
		item.estado_notificacion = 'NOTIFICADO'
		item.observaciones_sys = "CORREO ENVIADO EL DIA: " +str(date.today())
		item.save()
