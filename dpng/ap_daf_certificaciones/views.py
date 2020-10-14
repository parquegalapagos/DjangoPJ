#!/usr/bin/python
from django.shortcuts import render
from django.db.models import Q
from django.db import connection
from django.http import JsonResponse
from django.contrib import messages
from django.http import HttpResponse

import requests
import json
import uuid
import os
import re

#para asegurando que haya una sesion activa
from django.contrib.auth.decorators import login_required


#Vistas
from ap_base.views import insert_General,update_General,delete_General,concat_url,get_organigrama_position,get_directorDeArea, print_log
from ap_talentohumano.views import funcionario_selectbox

#MODEL
from django.contrib.auth.models import User
from ap_daf_certificaciones.models import DafCertificaciones
from ap_talentohumano.models import PerFuncionario

#SERIALIZADOR
from ap_api.v1.serializers.sz_daf import Daf_CertificacionesSerializer

#CORREO
from ap_base.views import send_mail

#FILES UPLOAD
from django.core.files.storage import FileSystemStorage


@login_required(login_url = '/login')
def menu_dafcertificaciones(request):
	print_log("****** menu_dafcertificaciones *******")
	permisos_user = get_permisos_user(request)
	#print_log(permisos_user)
	context= {
		'foto_perfil' : request.session['foto_perfil'],
		'permisos_user': permisos_user["permisos"],
		'es_solicitante': permisos_user["es_solicitante"],
		'es_revisor': permisos_user["es_revisor"],
		'es_aprobador': permisos_user["es_aprobador"]
	}

	return render(request, 'daf_certificaciones/menu_lateral.html' , context)

@login_required(login_url = '/login')
def SL_daf_certificacionesIniciarTramites(request):
	print_log("****** SL_daf_certificacionesIniciarTramites *******")

	dir_area = get_directorDeArea(request.session['direccion_estatuto_id'])
	data = get_dataCertificadosByPermission(request,'frm_certif','')
	permisos_user = get_permisos_user(request)
	
	context = {
		
		'foto_perfil' : request.session['foto_perfil'],
		'tipo_menu': 'menu_tramite',
		'funcionario_id' : request.session['funcionario_id'],
		'persona_nombres' : request.session['persona_nombres'],
		'puesto_institucional_nm' : request.session['puesto_institucional_nm'],
		'email_institucional': request.session['email_institucional'],
		'telefono_celular': request.session['telefono_celular'],
		'isla_trabaja_user': request.session['isla_trabaja_nm'],
		'isla_trabaja_id_user': request.session['isla_trabaja_id'],
		'directorarea_id': dir_area["directorarea_id"],
		'directorarea_nombres': dir_area["directorarea_nombres"],

		#'permiso_session': request.session['permiso_session'],
		'certificaciones': data,

		'es_solicitante': permisos_user["es_solicitante"],
		'es_revisor': permisos_user["es_revisor"],
		'es_aprobador': permisos_user["es_aprobador"]

		

	}

	return render(request, 'daf_certificaciones/daf_certificaciones_iniciartramite.html' , context)

@login_required(login_url = '/login')
def SL_daf_certificacionesBandeja(request):
	print_log("****** SL_daf_certificacionesBandeja *******")

	data = get_dataCertificadosByPermission(request,'frm_certifBE','')
	#funcionarios = get_funcionarioByRol(request,request.session['permiso_session'],request.session['isla_trabaja_id'])
	permisos_user = get_permisos_user(request)

	context= {
		'foto_perfil' : request.session['foto_perfil'],
		'funcionario_id' : request.session['funcionario_id'],
		'persona_nombres' : request.session['persona_nombres'],
		'puesto_institucional_nm' : request.session['puesto_institucional_nm'],
		'email_institucional': request.session['email_institucional'],
		'telefono_celular': request.session['telefono_celular'],
		'isla_trabaja_user': request.session['isla_trabaja_nm'],
		'isla_trabaja_id_user': request.session['isla_trabaja_id'],

		'es_solicitante': permisos_user["es_solicitante"],
		'es_revisor': permisos_user["es_revisor"],
		'es_aprobador': permisos_user["es_aprobador"],

		#'permiso_session': request.session['permiso_session'],
		'certificaciones': data,

		#'func_reasignado': funcionarios

	}

	return render(request, 'daf_certificaciones/daf_certificaciones_bandeja.html' , context)


@login_required(login_url = '/login')
def SL_daf_certificacionesEstadoTramite(request):
	print_log("****** SL_daf_certificacionesEstadoTramite *******")

	obj=response=""
	permiso_session="";
	request.session['permiso_session'] = ""
	isla_trabaja_id = request.session['isla_trabaja_id']
	
	if request.user.is_superuser:
		print_log(">>> List certificaciones to ADMIN ")
		obj = concat_url(request,"dafcertificaciones_list","")
	elif request.session['permiso_session']=="s_solicitante": 
		print_log(">>> List Solicitante ")
		obj = concat_url(request,"dafcertificaciones_list","?func_solicitante_id__id="+request.session['funcionario_id'])
	else:
		obj = concat_url(request,"dafcertificaciones_list","")

	response = requests.get(obj["url"], headers=obj["headers"]).json()


	# APROBADORES
	directorarea_aprob = bodega_aprob = pac_aprob = ""
	planificacion_aprob = presupuesto_aprob = tic_aprob = ""
	mantenimiento_aprob =obracivil_aprob = ""
	director_area_id = None

	for itm in response["results"]:
		if itm["func_solicitante_id"]["id"] == request.session['funcionario_id']:
			director_area_id = itm["func_dirarea_id"]["id"]
			print_log(director_area_id)

	for obj in get_funcionario_aprobador(request,111,isla_trabaja_id,director_area_id): 
		directorarea_aprob = directorarea_aprob +" | "+ obj["nombres"]
	for obj in get_funcionario_aprobador(request,113,isla_trabaja_id,None): 
		bodega_aprob = bodega_aprob+" | "+obj["nombres"]
	for obj in get_funcionario_aprobador(request,117,isla_trabaja_id,None): 
		pac_aprob = pac_aprob+" | "+obj["nombres"]
	for obj in get_funcionario_aprobador(request,119,isla_trabaja_id,None): 
		planificacion_aprob = planificacion_aprob+" | "+obj["nombres"]
	for obj in get_funcionario_aprobador(request,121,isla_trabaja_id,None): 
		presupuesto_aprob = presupuesto_aprob+" | "+obj["nombres"]
	for obj in get_funcionario_aprobador(request,123,isla_trabaja_id,None): 
		tic_aprob = tic_aprob +" | "+obj["nombres"]
	for obj in get_funcionario_aprobador(request,125,isla_trabaja_id,None): 
		mantenimiento_aprob = mantenimiento_aprob+" | "+obj["nombres"]
	for obj in get_funcionario_aprobador(request,127,isla_trabaja_id,None): 
		obracivil_aprob = obracivil_aprob+" | "+obj["nombres"]

	permisos_user = get_permisos_user(request)


	context= {
		'foto_perfil' : request.session['foto_perfil'],
		#'certificaciones': response["results"],

		'funcionario_id' : request.session['funcionario_id'],
		'persona_nombres' : request.session['persona_nombres'],
		'puesto_institucional_nm' : request.session['puesto_institucional_nm'],
		'email_institucional': request.session['email_institucional'],
		'telefono_celular': request.session['telefono_celular'],
		'isla_trabaja_user': request.session['isla_trabaja_nm'],

		'directorarea_aprob': directorarea_aprob,
		'bodega_aprob': bodega_aprob,
		'pac_aprob': pac_aprob,
		'planificacion_aprob': planificacion_aprob,
		'presupuesto_aprob': presupuesto_aprob,
		'tic_aprob': tic_aprob,
		'mantenimiento_aprob': mantenimiento_aprob,
		'obracivil_aprob': obracivil_aprob,

		'es_solicitante': permisos_user["es_solicitante"],
		'es_revisor': permisos_user["es_revisor"],
		'es_aprobador': permisos_user["es_aprobador"]

	}

	return render(request, 'daf_certificaciones/daf_certificaciones_estadostramites.html' , context)

"""
Funcion: get_dataCertificadosByPermission
Descripcion: Obtiene un arreglo de los certificados dependiendo del permiso del usuario. 
Parametros:
 * tipo: Tipo Fomulario, I=IniciarTramite, B= BandejaEntrada, T=Estado Solicitud.
 * param: Parametros adicional para el filtro.
Output:
 * data: arreglo de los certificados.

"""
def get_dataCertificadosByPermission(request,formulario,param):
	print_log("****** get_dataCertificadosByPermission *******")

	obj=response=""
	data = []
	isla_trabaja_id = request.session['isla_trabaja_id']

	permisos_user = get_permisos_user(request)
	#print(permisos_user)
	permisos_user = permisos_user["permisos"]
	if formulario=="frm_certifET":
		if request.user.is_superuser:
				print_log(">>> List certificaciones to ADMIN ")
				obj = concat_url(request,"dafcertificaciones_list","?"+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()
				
				for item in response["results"]:
					item["permiso_session"] = "s_directorarea_revisor"
					data.append(item)

		else:
			if len(permisos_user)>0:
				for perm in permisos_user:
					existen_datos_ra = True # Existen datos de revisor o aprobador

					if perm['permiso_session']=='s_admin_financiero': 
						print_log(">>> List Adm. Financiero ")
						obj = concat_url(request,"dafcertificaciones_list","?aprobar_adminfinanciero=true&isla_usuario_ingreso_id="+isla_trabaja_id+"&"+param)

					elif perm['permiso_session']=='s_presupuesto_aprobador' or perm['permiso_session'] =='s_presupuesto_revisor': 
						print_log(">>> List Presupuesto ")
						obj = concat_url(request,"dafcertificaciones_list","?aprobar_planificacion=true&isla_usuario_ingreso_id="+isla_trabaja_id+"&"+param)

					elif perm['permiso_session']=='s_planificacion_aprobador' or perm['permiso_session'] =='s_planificacion_revisor': 
						print_log(">>> List Planificacion ")
						obj = concat_url(request,"dafcertificaciones_list","?aprobar_respac=true&"+param)

					elif perm['permiso_session']=='s_respac_aprobador' or perm['permiso_session'] == 's_respac_revisor' : 
						print_log(">>> List PAC ")
						obj = concat_url(request,"dafcertificaciones_list","?aprobar_dirarea=true&isla_usuario_ingreso_id="+isla_trabaja_id+"&"+param)

					elif perm['permiso_session']=='s_obracivil_aprobador' or perm['permiso_session'] =='s_obracivil_revisor': 
						print_log(">>> List Obra Civil ")
						obj = concat_url(request,"dafcertificaciones_list","?tipo_revision=O&"+param)

					elif perm['permiso_session']=='s_mantenimiento_aprobador' or perm['permiso_session'] =='s_mantenimiento_revisor': 
						print_log(">>> List Mantenimiento ")
						obj = concat_url(request,"dafcertificaciones_list","?tipo_revision=M&"+param)

					elif perm['permiso_session'] == 's_tic_aprobador' or perm['permiso_session'] == 's_tic_revisor': 
						print_log(">>> List TIC ")
						obj = concat_url(request,"dafcertificaciones_list","?tipo_revision=T&"+param)

					elif perm['permiso_session']=='s_directorarea_aprobador'or perm['permiso_session'] =='s_directorarea_revisor': 
						print_log(">>> List Director Area ")
						obj = concat_url(request,"dafcertificaciones_list","?func_dirarea_id="+request.session['funcionario_id']+"&isla_usuario_ingreso_id="+isla_trabaja_id+'&'+param)
					else:
						existen_datos_ra = False # Indica que no es ni revisor ni aprobador

					if existen_datos_ra == True:
						response = requests.get(obj["url"], headers=obj["headers"]).json()
						for item in response["results"]:
							data.append(item)
					

					if perm['permiso_session']=="s_solicitante": 
						print_log(">>> List Solicitante ")
						obj = concat_url(request,"dafcertificaciones_list","?func_solicitante_id__id="+request.session['funcionario_id']+"&isla_usuario_ingreso_id="+isla_trabaja_id+"&"+param)
						response1 = requests.get(obj["url"], headers=obj["headers"]).json()
						
						for item in response1["results"]:
							data.append(item)

	else:

		for perm in permisos_user:
			print_log(perm)
			if perm["permiso_session"] == 's_solicitante': 
				print_log(">>> List Solicitante ")
				if formulario=="frm_certif":
					obj = concat_url(request,"dafcertificaciones_list","?func_solicitante_id__id="+request.session['funcionario_id']+'&estado_tramite=B&'+param)
				else: # Bandeja Entrada
					obj = concat_url(request,"dafcertificaciones_list","?func_solicitante_id__id="+request.session['funcionario_id']+'&estado_tramite=D&'+param)

				response = requests.get(obj["url"], headers=obj["headers"]).json()
				#if response['count'] > 0:
				#	data.append(response["results"][0])

				for item in response["results"]:
					item["permiso_session"] = "s_solicitante"
					item["permiso_session_nm"] = "Solicitante"
					data.append(item)

			elif perm["permiso_session"] == 's_directorarea_revisor':
				print_log(">>> List Director Area - Revisor ")
				obj = concat_url(request,"dafcertificaciones_list","?func_reasignado_id="+request.session['funcionario_id']+"&isla_usuario_ingreso_id="+isla_trabaja_id+'&estado_tramite=R&aprobar_dirarea=null&'+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()
				
				for item in response["results"]:
					item["permiso_session"] = "s_directorarea_revisor"
					item["permiso_session_nm"] = "Director Area (Revisor)"
					data.append(item)

			elif perm["permiso_session"] == 's_directorarea_aprobador':
				print_log(">>> List Director Area - Aprobador ")
				obj = concat_url(request,"dafcertificaciones_list","?func_dirarea_id__id="+request.session['funcionario_id']+"&isla_usuario_ingreso_id="+isla_trabaja_id+'&estado_tramite=T&aprobar_dirarea=null&'+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()
				
				for item in response["results"]:
					item["permiso_session"] = "s_directorarea_aprobador"
					item["permiso_session_nm"] = "Director Area (Aprobador)"
					data.append(item)

			elif perm["permiso_session"] == 's_tic_revisor': 
				print_log(">>> List TIC - Revisor ")
				obj = concat_url(request,"dafcertificaciones_list","?tipo_revision=T&estado_tramite=T&aprobar_dirarea=true&aprobar_tic=null&"+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()
				
				for item in response["results"]:
					if item["tipo_revision"] == 'T' and item["aprobar_tic"] == None:
						item["permiso_session"] = "s_tic_revisor"
						item["permiso_session_nm"] = "TIC (Revisor)"
						data.append(item)

			elif perm["permiso_session"] == 's_tic_aprobador': 
				print_log(">>> List TIC - Aprobador")
				obj = concat_url(request,"dafcertificaciones_list","?tipo_revision=T&estado_tramite=T&aprobar_dirarea=true&aprobar_tic=null&"+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()
				
				for item in response["results"]:
					if item["tipo_revision"] == 'T' and item["aprobar_tic"] == None:
						item["permiso_session"] = "s_tic_aprobador"
						item["permiso_session_nm"] = "TIC (Aprobador)"
						data.append(item)
					
			elif perm["permiso_session"] == 's_mantenimiento_revisor': 
				print_log(">>> List Mantenimiento ")
				obj = concat_url(request,"dafcertificaciones_list","?tipo_revision=M&estado_tramite=T&aprobar_dirarea=true&aprobar_mantenimiento=null&"+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()
				
				for item in response["results"]:
					if item["tipo_revision"] == 'M' and item["aprobar_mantenimiento"] == None:
						item["permiso_session"] = "s_mantenimiento_revisor"
						item["permiso_session_nm"] = "Mantenimiento (Revisor)"
						data.append(item)

			elif perm["permiso_session"] == 's_mantenimiento_aprobador': 
				print_log(">>> List Mantenimiento ")
				obj = concat_url(request,"dafcertificaciones_list","?tipo_revision=M&estado_tramite=T&aprobar_dirarea=true&aprobar_mantenimiento=null&"+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()
				
				for item in response["results"]:
					if item["tipo_revision"] == 'M' and item["aprobar_mantenimiento"] == None:
						item["permiso_session"] = "s_mantenimiento_aprobador"
						item["permiso_session_nm"] = "Mantenimiento (Aprobador)"
						data.append(item)

			elif perm["permiso_session"] == 's_obracivil_revisor': 
				print_log(">>> List Obra Civil - Revisor")
				obj = concat_url(request,"dafcertificaciones_list","?estado_tramite=T&aprobar_dirarea=true&aprobar_obracivil=null&"+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()
				
				for item in response["results"]:
					if item["tipo_revision"] == 'O' and item["aprobar_obracivil"] == None:
						item["permiso_session"] = "s_obracivil_revisor"
						item["permiso_session_nm"] = "Obra Civil (Revisor)"

						data.append(item)
					elif item["tipo"] == 'O' and item["aprobar_obracivil"] == None:
						item["permiso_session"] = "s_obracivil_revisor"
						item["permiso_session_nm"] = "Obra Civil (Revisor)"
						data.append(item)

			elif perm["permiso_session"] == 's_obracivil_aprobador': 
				print_log(">>> List Obra Civil - Aprobador ")
				obj = concat_url(request,"dafcertificaciones_list","?estado_tramite=T&aprobar_dirarea=true&aprobar_obracivil=null&"+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()
				
				for item in response["results"]:
					item["permiso_session"] = "s_obracivil_aprobador"
					item["permiso_session_nm"] = "Obra Civil (Aprobador)"

					if item["tipo_revision"] == 'O' and item["aprobar_obracivil"] == None:
						data.append(item)
					elif item["tipo"] == 'O' and item["aprobar_obracivil"] == None:
						data.append(item)

			elif perm["permiso_session"] == 's_respac_revisor':
				print_log(">>> List Responsable PAC - Revisor ")

				obj = concat_url(request,"dafcertificaciones_list","?func_reasignado_id="+request.session['funcionario_id']+"&isla_usuario_ingreso_id="+isla_trabaja_id+"&estado_tramite=R&aprobar_dirarea=true&aprobar_respac=null&"+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()

				for item in response["results"]:
					item["permiso_session"] = "s_respac_revisor"
					item["permiso_session_nm"] = "Resp. PAC (Revisor)"

					if item["tipo_revision"] == None and item["tipo"] == 'S':
						data.append(item)
					elif item["tipo_revision"] == None and item["tipo"] == 'B':
						data.append(item)
					elif item["tipo_revision"] == None and item["tipo"] == 'C':
						data.append(item)
					elif item["tipo_revision"] == None and item["tipo"] == 'O' and item["aprobar_obracivil"] == True:
						data.append(item)
					elif item["tipo_revision"] == 'T' and item["aprobar_tic"] == True:
						data.append(item)
					elif item["tipo_revision"] == 'M' and item["aprobar_mantenimiento"] == True:
						data.append(item)
					elif item["tipo_revision"] == 'O' and item["aprobar_obracivil"] == True:
						data.append(item)
					elif item["tipo"] == 'O' and item["aprobar_obracivil"] == True:
						data.append(item)

			elif perm["permiso_session"] == 's_respac_aprobador':
				print_log(">>> List Responsable PAC - Aprobador")

				obj = concat_url(request,"dafcertificaciones_list","?estado_tramite=T&aprobar_dirarea=true"+"&isla_usuario_ingreso_id="+isla_trabaja_id+"&aprobar_respac=null&"+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()

				for item in response["results"]:
					item["permiso_session"] = "s_respac_aprobador"
					item["permiso_session_nm"] = "Resp. PAC (Aprobador)"
					
					if item["tipo_revision"] == None and item["tipo"] == 'S':
						data.append(item)
					elif item["tipo_revision"] == None and item["tipo"] == 'B':
						data.append(item)
					elif item["tipo_revision"] == None and item["tipo"] == 'C':
						data.append(item)
					elif item["tipo_revision"] == None and item["tipo"] == 'O' and item["aprobar_obracivil"] == True:
						data.append(item)
					elif item["tipo_revision"] == 'T' and item["aprobar_tic"] == True:
						data.append(item)
					elif item["tipo_revision"] == 'M' and item["aprobar_mantenimiento"] == True:
						data.append(item)
					elif item["tipo_revision"] == 'O' and item["aprobar_obracivil"] == True:
						data.append(item)
					elif item["tipo"] == 'O' and item["aprobar_obracivil"] == True:
						data.append(item)

			elif perm["permiso_session"] == 's_planificacion_revisor':
				print_log(">>> List Planificacion - Revisor")

				obj = concat_url(request,"dafcertificaciones_list","?func_reasignado_id="+request.session['funcionario_id']+"&estado_tramite=R&aprobar_dirarea=true&aprobar_respac=true&aprobar_planificacion=null&"+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()

				for item in response["results"]:
					item["permiso_session"] = "s_planificacion_revisor"
					item["permiso_session_nm"] = "Planificacion (Revisor)"

					if item["tipo_revision"] == None:
						data.append(item)
					elif item["tipo_revision"] == 'T' and item["aprobar_tic"] == True:
						data.append(item)
					elif item["tipo_revision"] == 'M' and item["aprobar_mantenimiento"] == True:
						data.append(item)
					elif item["tipo_revision"] == 'O' and item["aprobar_obracivil"] == True:
						data.append(item)

			elif perm["permiso_session"] == 's_planificacion_aprobador':
				print_log(">>> List Planificacion - Aprobador")
				obj = concat_url(request,"dafcertificaciones_list","?estado_tramite=T&aprobar_dirarea=true&aprobar_respac=true&aprobar_planificacion=null&"+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()

				for item in response["results"]:
					item["permiso_session"] = "s_planificacion_aprobador"
					item["permiso_session_nm"] = "Planificacion (Aprobador)"

					if item["tipo_revision"] == None:
						data.append(item)
					elif item["tipo_revision"] == 'T' and item["aprobar_tic"] == True:
						data.append(item)
					elif item["tipo_revision"] == 'M' and item["aprobar_mantenimiento"] == True:
						data.append(item)
					elif item["tipo_revision"] == 'O' and item["aprobar_obracivil"] == True:
						data.append(item)

			elif perm["permiso_session"] == 's_presupuesto_revisor':
				print_log(">>> List Presupuesto - Revisor")

				obj = concat_url(request,"dafcertificaciones_list","?func_reasignado_id="+request.session['funcionario_id']+"&isla_usuario_ingreso_id="+isla_trabaja_id+"&estado_tramite=R&aprobar_dirarea=true&aprobar_respac=true&aprobar_planificacion=true&aprobar_presupuesto=null&"+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()

				for item in response["results"]:
					item["permiso_session"] = "s_presupuesto_revisor"
					item["permiso_session_nm"] = "Presupuesto (Revisor)"

					if item["tipo_revision"] == None:
						data.append(item)
					elif item["tipo_revision"] == 'T' and item["aprobar_tic"] == True:
						data.append(item)
					elif item["tipo_revision"] == 'M' and item["aprobar_mantenimiento"] == True:
						data.append(item)
					elif item["tipo_revision"] == 'O' and item["aprobar_obracivil"] == True:
						data.append(item)

			elif perm["permiso_session"] == 's_presupuesto_aprobador':
				print_log(">>> List Presupuesto - Aprobador")
				obj = concat_url(request,"dafcertificaciones_list","?&estado_tramite=T&aprobar_dirarea=true&aprobar_respac=true&aprobar_planificacion=true&aprobar_presupuesto=null&isla_usuario_ingreso_id="+isla_trabaja_id+"&"+param)
				
				response = requests.get(obj["url"], headers=obj["headers"]).json()

				for item in response["results"]:
					item["permiso_session"] = "s_presupuesto_aprobador"
					item["permiso_session_nm"] = "Presupuesto (Aprobador)"

					if item["tipo_revision"] == None:
						data.append(item)
					elif item["tipo_revision"] == 'T' and item["aprobar_tic"] == True:
						data.append(item)
					elif item["tipo_revision"] == 'M' and item["aprobar_mantenimiento"] == True:
						data.append(item)
					elif item["tipo_revision"] == 'O' and item["aprobar_obracivil"] == True:
						data.append(item)


			elif perm["permiso_session"] == 's_admin_financiero':
				print_log(">>> List Adm.Financiero")
				obj = concat_url(request,"dafcertificaciones_list","?estado_tramite=T&aprobar_dirarea=true&aprobar_respac=true&aprobar_planificacion=true&aprobar_presupuesto=true&aprobar_adminfinanciero=null&isla_usuario_ingreso_id="+isla_trabaja_id+"&"+param)
				
				response = requests.get(obj["url"], headers=obj["headers"]).json()

				for item in response["results"]:
					item["permiso_session"] = "s_admin_financiero"
					item["permiso_session_nm"] = "Resp. Administrativo Financiero"

					if item["tipo_revision"] == None:
						data.append(item)
					elif item["tipo_revision"] == 'T' and item["aprobar_tic"] == True:
						data.append(item)
					elif item["tipo_revision"] == 'M' and item["aprobar_mantenimiento"] == True:
						data.append(item)
					elif item["tipo_revision"] == 'O' and item["aprobar_obracivil"] == True:
						data.append(item)


	#print_log(data)
	return data


@login_required(login_url = '/login')
def get_funcionarioByRol(request):
	print_log("****** get_funcionarioByRol *******")


	permiso_session = str(request.POST['permiso_byuser'])
	print_log(permiso_session)
	isla_trabaja_id = str(request.POST['isla_trabaja_id'])
	print_log(isla_trabaja_id)

	obj=""
	data = []
	query2 = ""
	result = []
	es_director = False

	query="""
			SELECT
			distinct
			per_funcionario.id::text as id,
			concat(per_persona.nombres, ' ', per_persona.apellidos) as nombre_completo,
			direccion.name as direccion,
			proceso.name as proceso,
			subproceso.name as subproceso,
			gth_cargo_institucional.nombre AS cargo_institucional,
			gth_cargo_distributivo.nombre AS cargo_distributivo
			FROM master.per_funcionario
			LEFT JOIN master.per_persona on per_persona.id = per_funcionario.persona_id
			LEFT JOIN master.gth_cargo_institucional on gth_cargo_institucional.id = per_funcionario.cargo_institucional_id
			LEFT JOIN master.gth_cargo_distributivo on gth_cargo_distributivo.id = per_funcionario.cargo_distributivo_id
			LEFT JOIN public.dir_department AS direccion on direccion.id = per_funcionario.direccion_estatuto_id
			LEFT JOIN public.dir_department AS proceso on proceso.id = per_funcionario.proceso_estatuto_id 
			LEFT JOIN public.dir_department AS subproceso on subproceso.id = per_funcionario.subproceso_estatuto_id 
			LEFT JOIN master.geo_isla on geo_isla.id = per_funcionario.isla_trabaja_id
			LEFT JOIN master.per_funcionario_auth on per_funcionario_auth.funcionario_id = per_funcionario.id
			LEFT JOIN django.auth_user on auth_user.id = per_funcionario_auth.user_id
			LEFT JOIN django.auth_user_groups ON auth_user_groups.user_id = auth_user.id
			WHERE per_funcionario.estado = 'A' AND per_funcionario.eliminado='f' and auth_user.is_active = TRUE
			AND per_funcionario.isla_trabaja_id = %s

	"""
	# AND auth_user_groups.group_id IN (112,118,120,122)
	if permiso_session=='s_directorarea_aprobador': 
		print_log(">>> Query - Director Area ")

		query2 += """
			AND auth_user_groups.group_id = 112
			AND per_funcionario.direccion_estatuto_id = %s 

		"""

		es_director = True
		#direccion_estatuto_id

	elif permiso_session=='s_respac_aprobador': 
		print_log(">>> Query - Responsable PAC ")
		
		query2 += """
			AND auth_user_groups.group_id = 118

		"""

	elif permiso_session=='s_planificacion_aprobador': 
		print_log(">>> Query - Planificacion ")

		query2 += """
			AND auth_user_groups.group_id = 120

		"""
		
		result = User.objects.raw(query,[ request.session['funcionario_id'] ])

	elif permiso_session=='s_presupuesto_aprobador': 
		print_log(">>> Query - Presupuesto ")

		query2 += """
			AND auth_user_groups.group_id = 122

		"""

	else:
		print_log(">>> Query - Empty ")
		query=query2=""
		result = []

	result2 = []
	query = query + query2

	if query != "":
		with connection.cursor() as cursor:
			try:
				if es_director:
					print_log(">>> Es director!!!")
					#result = User.objects.raw(query,[ isla_trabaja_id, request.session['direccion_estatuto_id'] ])
					cursor.execute(query,[ isla_trabaja_id, request.session['direccion_estatuto_id'] ]  )

				else:
					#print_log(">>> aaaaaaaaaaaaa!!!")
					#result = User.objects.raw(query,[ isla_trabaja_id ])
					cursor.execute(query,[ isla_trabaja_id]  )
				
				result = cursor.fetchall()
			except:
				print_log(">> No se encontro registros! ")
				result = [0,0,0,'NO EXISTE VALORES']

			

	print_log(result)
	#return result
	return HttpResponse(json.dumps(result), content_type="application/json")


#buscar datos de certificaciones segun los parametros ingresados
@login_required(login_url = '/login')
def data_certificadosParam(request):
	print_log("************data_certificadosParam****************************")
	data = request.GET.get('data')
	formulario = request.GET.get('formulario') # Tipo Fomulario, I=IniciarTramite, B= BandejaEntrada, T=Estado Solicitud
	response_data = get_dataCertificadosByPermission(request,formulario,data)
	#return HttpResponse(json.dumps(response1["results"]), content_type="application/json")
	return HttpResponse(json.dumps(response_data), content_type="application/json")


#buscar datos de certificaciones segun el id ingresado
@login_required(login_url = '/login')
def data_certificados(request):
	print_log("************ data_certificados ****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"dafcertificaciones_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def notificaciones_certificaciones(request):
	print_log("************ notificaciones_certificaciones ****************************")
	mensaje = request.GET.get('mensaje')
	titulo = request.GET.get('titulo')
	nombre_destinatario = request.GET.get('nombre_destinatario')

	subject_mjs = "Certificacion Presupuestaria - "+titulo
	template = "emails/daf_certificaciones.html"
	emails = []


	if request.GET.get('correo'):
		print_log(">> Insertando correo......")
		emails.append(request.GET.get('correo'))
		print_log(request.GET.get('correo'))

	
	context = {
		'funcionario_nombres': nombre_destinatario,
		'titulo': titulo,
		'contenido_body': mensaje
	}
	send_mail(subject_mjs,template,context,emails)

	valor = {
		'results': 'OK'
	}

	return HttpResponse(json.dumps(valor), content_type="application/json")


@login_required(login_url = '/login')
def get_correo_funcionario_tramite(request):
	print_log("************ get_correo_funcionario_tramite ****************************")

	tipo = request.GET.get('tipo')
	id_table = request.GET.get('id_table')
	correo = nombre_destinatario = ""
	group_id=0
	correos = []
	isla_trabaja_id = request.session['isla_trabaja_id'] #Isla Trabajo del Usuario con la sesion activa.

	print_log(">> id_table: "+str(id_table) )

	query="""
		SELECT
		auth_group.id as id,
		auth_group.name as grupo,
		per_funcionario.email,
		CONCAT(per_persona.nombres,' ',per_persona.apellidos) as nombres
		
		FROM django.auth_user_groups 
		LEFT JOIN django.auth_user on auth_user.id = auth_user_groups.user_id
		LEFT JOIN django.auth_group on auth_group.id = auth_user_groups.group_id
		LEFT JOIN master.per_funcionario_auth on per_funcionario_auth.user_id = auth_user.id
		LEFT JOIN master.per_funcionario on per_funcionario.id = per_funcionario_auth.funcionario_id
		LEFT JOIN master.per_persona on per_persona.id = per_funcionario.persona_id
		WHERE auth_group.id = %s
	"""

	query2="""
				AND per_funcionario.isla_trabaja_id = %s 
			"""	
	
	certificaciones = DafCertificaciones.objects.all().filter(eliminado='f',id=id_table)
	for item in certificaciones:
		
		# APROBAR, DEVOLUCION A TIC, MANTENIMIENTO, OBRA CIVIL.
		if tipo == 'A' or tipo == 'T' or tipo == 'M' or tipo == 'O' or tipo == 'R':
			print_log(">> TIPO: A,T,M ")

			# DIRECTOR AREA
			if item.aprobar_dirarea==None and item.aprobar_respac==None and item.aprobar_planificacion==None and item.aprobar_presupuesto==None:
				print_log(">> correo-directorArea")
				query="""
					SELECT
					daf_certificaciones.id,
					CONCAT(per_persona.nombres,' ',per_persona.apellidos) as nombres,
					per_funcionario.email

					FROM master.daf_certificaciones
					LEFT JOIN master.per_funcionario on per_funcionario.id = daf_certificaciones.func_dirarea_id
					LEFT JOIN master.per_persona on per_persona.id = per_funcionario.persona_id
					WHERE daf_certificaciones.eliminado = 'f' and daf_certificaciones.id::text = %s
				"""

				query2 = ""
				isla_trabaja_id = item.isla_usuario_ingreso_id.id
				group_id = 111

			########################## TIPO #############################

			# OBRA CIVIL
			elif item.tipo=='O' and item.aprobar_dirarea==True and item.aprobar_obracivil==None and item.aprobar_respac==None and item.aprobar_planificacion==None and item.aprobar_presupuesto==None:
				print_log(">> OBRA CIVIL")
				group_id = 127

			########################## FIN TIPO #############################


			########################## TIPO REVISION #############################
			# TIC APROBADOR
			elif item.tipo_revision=='T' and item.estado_tramite=='T' and item.aprobar_dirarea==True and item.aprobar_tic==None:
				print_log(">> TIC")
				group_id = 123
				query2 = "" # No se filtra por isla de trabajo

			# MANTENIMIENTO APROBADOR
			elif item.tipo_revision=='M' and item.estado_tramite=='T' and item.aprobar_dirarea==True and item.aprobar_mantenimiento==None:
				print_log(">> MANTENIMIENTO")
				group_id = 125
				query2 = "" # No se filtra por isla de trabajo

			# OBRA CIVIL APROBADOR
			elif item.tipo_revision=='O' and item.estado_tramite=='T' and item.aprobar_dirarea==True and item.aprobar_obracivil==None:
				print_log(">> OBRA CIVIL")
				group_id = 127
				query2 = "" # No se filtra por isla de trabajo


			########################## FIN TIPO REVISION #############################
			# RESP. PAC - CUANDO ES UN BIEN
			elif item.tipo=='B' and item.aprobar_dirarea==True and item.aprobar_respac==None and item.aprobar_planificacion==None and item.aprobar_presupuesto==None:
				print_log(">> RESP. PAC - BIEN")
				isla_trabaja_id = item.isla_usuario_ingreso_id.id
				if item.tipo_revision == None:
					group_id = 117
				elif item.tipo_revision == 'T' and item.aprobar_tic == True:
					group_id = 117
				elif item.tipo_revision == 'M' and item.aprobar_mantenimiento == True:
					group_id = 117
				elif item.tipo_revision == 'O' and item.aprobar_obracivil == True:
					group_id = 117
					
			# RESP. PAC - CUANDO ES POR SERVICIO
			elif item.tipo=='S' and item.aprobar_dirarea==True and item.aprobar_respac==None and item.aprobar_planificacion==None and item.aprobar_presupuesto==None:
				print_log(">> RESP. PAC - SERVICIO")
				isla_trabaja_id = item.isla_usuario_ingreso_id.id
				if item.tipo_revision == None:
					group_id = 117
				elif item.tipo_revision == 'T' and item.aprobar_tic == True:
					group_id = 117
				elif item.tipo_revision == 'M' and item.aprobar_mantenimiento == True:
					group_id = 117
				elif item.tipo_revision == 'O' and item.aprobar_obracivil == True:
					group_id = 117

			# RESP. PAC - CUANDO ES POR SERVICIO
			elif item.tipo=='C' and item.aprobar_dirarea==True and item.aprobar_respac==None and item.aprobar_planificacion==None and item.aprobar_presupuesto==None:
				print_log(">> RESP. PAC - SERVICIO")
				isla_trabaja_id = item.isla_usuario_ingreso_id.id
				if item.tipo_revision == None:
					group_id = 117
				elif item.tipo_revision == 'T' and item.aprobar_tic == True:
					group_id = 117
				elif item.tipo_revision == 'M' and item.aprobar_mantenimiento == True:
					group_id = 117
				elif item.tipo_revision == 'O' and item.aprobar_obracivil == True:
					group_id = 117

			# PLANIFICACION
			elif item.aprobar_dirarea==True and item.aprobar_respac==True and item.aprobar_planificacion==None and item.aprobar_presupuesto==None:
				print_log(">> PLANIFICACION")
				query2 = "" # No se filtra por isla de trabajo
				if item.tipo_revision == None:
					group_id = 119
				elif item.tipo_revision == 'T' and item.aprobar_tic == True:
					group_id = 119
				elif item.tipo_revision == 'M' and item.aprobar_mantenimiento == True:
					group_id = 119
				elif item.tipo_revision == 'O' and item.aprobar_obracivil == True:
					group_id = 119

			# PRESUPUESTO
			elif item.aprobar_dirarea==True and item.aprobar_respac==True and item.aprobar_planificacion==True and item.aprobar_presupuesto==None:
				print_log(">> PRESUPUESTO")
				isla_trabaja_id = item.isla_usuario_ingreso_id.id
				if item.tipo_revision == None:
					group_id = 121
				elif item.tipo_revision == 'T' and item.aprobar_tic == True:
					group_id = 121
				elif item.tipo_revision == 'M' and item.aprobar_mantenimiento == True:
					group_id = 121
				elif item.tipo_revision == 'O' and item.aprobar_obracivil == True:
					group_id = 121

			# ADM. FINANCIERO
			elif item.aprobar_dirarea==True and item.aprobar_respac==True and item.aprobar_planificacion==True and item.aprobar_presupuesto==True and item.aprobar_adminfinanciero==None:
				print_log(">> ADM. FINANCIERO")
				isla_trabaja_id = item.isla_usuario_ingreso_id.id
				if item.tipo_revision == None:
					group_id = 129
				elif item.tipo_revision == 'T' and item.aprobar_tic == True:
					group_id = 129
				elif item.tipo_revision == 'M' and item.aprobar_mantenimiento == True:
					group_id = 129
				elif item.tipo_revision == 'O' and item.aprobar_obracivil == True:
					group_id = 129

			print_log("group_id: "+str(group_id))

			query = query + query2

			
			if group_id == 111: # SI ES DIRECTOR DE AREA 
				print_log(query)
				print_log(id_table)
				result = User.objects.raw(query, [id_table] )
			elif query2=="":
				result = User.objects.raw(query, [group_id] )
			else:
				result = User.objects.raw(query, [group_id,isla_trabaja_id] )
			
			for item2 in result:
				correo = item2.email
				nombre_destinatario = item2.nombres
				correos.append({"correo":correo,"nombre_destinatario":nombre_destinatario})
	


		# DEVOLVER SOLICITANTE
		elif tipo == 'D':
			print_log(">> TIPO: DEVOLVER SOLICITANTE")
			print_log(item.func_solicitante_id.id)

			func = PerFuncionario.objects.all().filter(eliminado='f', id=item.func_solicitante_id.id)

			for item2 in func:
				correo = item2.email
				nombre_destinatario = item2.persona_id.nombres + ' ' + item2.persona_id.apellidos
				
				correos.append({"correo":correo,"nombre_destinatario":nombre_destinatario})

		# DEVOLVER REVISOR
		elif tipo == 'RS':
			print_log(">> TIPO: DEVOLVER A REVISOR ")
			print_log(item.func_reasignado_id.id)

			func = PerFuncionario.objects.all().filter(eliminado='f', id=item.func_reasignado_id.id)

			for item2 in func:
				correo = item2.email
				nombre_destinatario = item2.persona_id.nombres + ' ' + item2.persona_id.apellidos
				
				correos.append({"correo":correo,"nombre_destinatario":nombre_destinatario})

		# Solicitante
		elif tipo == 'S' or tipo == 'f':
			print_log(">> TIPO: Solicitante ")
			print_log(item.func_solicitante_id.id)

			func = PerFuncionario.objects.all().filter(eliminado='f', id=item.func_solicitante_id.id)

			for item2 in func:
				correo = item2.email
				nombre_destinatario = item2.persona_id.nombres + ' ' + item2.persona_id.apellidos
				
				correos.append({"correo":correo,"nombre_destinatario":nombre_destinatario})				

	print_log(">>> correos: ")
	print_log(correos)

	return HttpResponse(json.dumps(correos), content_type="application/json")


def get_funcionario_aprobador(request, grupo_id,isla_trabaja_id,funcionario_id):
	print_log("************ get_funcionario_aprobador ****************************")

	result = []
	aprobadores = []
	query2 = ""

	query="""
		SELECT
		auth_group.id as id,
		auth_group.name as grupo,
		per_funcionario.email,
		CONCAT(per_persona.nombres,' ',per_persona.apellidos) as nombres

		FROM django.auth_user_groups 
		LEFT JOIN django.auth_user on auth_user.id = auth_user_groups.user_id
		LEFT JOIN django.auth_group on auth_group.id = auth_user_groups.group_id
		LEFT JOIN master.per_funcionario_auth on per_funcionario_auth.user_id = auth_user.id
		LEFT JOIN master.per_funcionario on per_funcionario.id = per_funcionario_auth.funcionario_id
		LEFT JOIN master.per_persona on per_persona.id = per_funcionario.persona_id
		WHERE auth_group.id = %s and per_funcionario.isla_trabaja_id = %s 
	"""

	if funcionario_id:
		query2 = """
			and per_funcionario.id = %s
		"""
		query = query + query2
		result = User.objects.raw(query,[grupo_id,isla_trabaja_id,funcionario_id])

	else:
		result = User.objects.raw(query,[grupo_id,isla_trabaja_id])

	for item in result:
		id_ = item.id
		grupo = item.grupo
		nombres = item.nombres
		aprobadores.append({"group_id":id_,"nombres":nombres,"grupo":grupo })

	print_log(aprobadores)

	return aprobadores

@login_required(login_url = '/login')
def upload_files_json(request):
	print_log("***** upload_files_json ******")

	file_id = request.POST['file_id']
	file_path = request.POST['file_path']
	id_table = request.POST['id_table']
	filename=""
	result = {} 
	cont = 0


	if request.method == 'POST' and request.FILES['myfile'+file_id+'']:
		ruta = file_path
		
		print_log(">> file_path: "+str(file_path) )
		print_log(">> id: "+str(id_table) )
		print_log(">> Ruta: "+str(ruta))
		
		if not os.path.isdir(ruta):
			print_log('>> The directory is not present. Creating a new one..')
			#os.mkdir(ruta, 0777)
			os.mkdir(ruta)
		else:
			print_log('>> The directory is present.')

		for myfile in request.FILES.getlist('myfile'+file_id+''):
			print_log(">>> myfile: "+myfile.name)
			#rutafile = file_path + myfile.name
			#print_log(">>>> rutafile: "+rutafile)
			fs = FileSystemStorage(location=ruta)
			#fs.remove(myfile.name, myfile)
			nm_file = re.sub('[^a-zA-Z0-9 \n\.\_\s]', '', myfile.name)
			filename = fs.save(nm_file, myfile)
			uploaded_file_url = fs.url(filename)

			result.update({'file'+str(cont):filename})
			cont=cont +1

		print_log(result)
		return HttpResponse(json.dumps(result), content_type="application/json")

	
	return HttpResponse("ERROR")
	#return HttpResponse(json.dumps(result), content_type="application/json")
	

@login_required(login_url = '/login')
def upload_files_cert(request):
	print_log("***** upload_files_cert ******")
	file_id = request.POST['file_id']
	file_path = request.POST['file_path']
	id_table = request.POST['id_table']

	
	if request.method == 'POST' and request.FILES['myfile'+file_id+'']:

		for myfile in request.FILES.getlist('myfile'+file_id+''):

			fs = FileSystemStorage(location=ruta)
			#fs.remove(myfile.name, myfile)
			my_new_string = re.sub('[^a-zA-Z0-9 \n\.]', '', myfile.name)
			filename = fs.save(my_new_string, myfile)
			uploaded_file_url = fs.url(filename)

		return HttpResponse(filename)

	return HttpResponse("ERROR")


@login_required(login_url = '/login')
def delete_files_cert(request):
	print("***** delete_files_informe ******")
	file_name = request.POST['file_name']
	file_path = request.POST['file_path']
	print(file_name)
	print(file_path)

	if os.path.exists(file_path+'/'+file_name):
	  os.remove(file_path+'/'+file_name)
	  return HttpResponse("OK")
	else:
	  print("The file does not exist")

	return HttpResponse("ERROR")


def get_permisos_user(request):
	print_log("***** get_permisos_user ******")

	permisos = []
	permiso = ""
	permiso_nm = ""
	t_es_solicitante=t_es_revisor=t_es_aprobador=False

	for group in request.user.groups.all():
		es_solicitante=es_revisor=es_aprobador=False
		permiso_nm = ""

		if group.id == 110:
			es_solicitante = True
			t_es_solicitante = True
			permiso = "s_solicitante"
			permiso_nm = "Solicitante"

		elif group.id == 111:
			es_aprobador = True
			t_es_aprobador = True
			permiso = "s_directorarea_aprobador"
			permiso_nm = "Director Area (Aprobador)"

		elif group.id == 112:
			es_revisor = True
			t_es_revisor = True
			permiso = "s_directorarea_revisor"
			permiso_nm = "Director Area (Revisor)"

		elif group.id == 113:
			es_aprobador = True
			t_es_aprobador = True
			permiso = "s_bodega_aprobador"
			permiso_nm = "Bodega (Aprobador)"

		elif group.id == 114:
			es_revisor = True
			t_es_revisor = True
			permiso = "s_bodega_revisor"
			permiso_nm = "Bodega (Revisor)"

		elif group.id == 117:
			es_aprobador = True
			t_es_aprobador = True
			permiso = "s_respac_aprobador"
			permiso_nm = "Resp. PAC (Aprobador)"

		elif group.id == 118:
			es_revisor = True
			t_es_revisor = True
			permiso = "s_respac_revisor"
			permiso_nm = "Resp. PAC (Revisor)"

		elif group.id == 119:
			es_aprobador = True
			t_es_aprobador = True
			permiso = "s_planificacion_aprobador"
			permiso_nm = "Planificacion (Aprobador)"

		elif group.id == 120:
			es_revisor = True
			t_es_revisor = True
			t_es_aprobador = True
			permiso = "s_planificacion_revisor"
			permiso_nm = "Planificacion (Revisor)"

		elif group.id == 121:
			es_aprobador = True
			t_es_aprobador = True
			permiso = "s_presupuesto_aprobador"
			permiso_nm = "Presupuesto Aprobador"

		elif group.id == 122:
			es_revisor = True
			t_es_revisor = True
			permiso = "s_presupuesto_revisor"
			permiso_nm = "Presupuesto (Revisor)"

		elif group.id == 123:
			es_aprobador = True
			t_es_aprobador = True
			permiso = "s_tic_aprobador"
			permiso_nm = "TIC (Aprobador)"

		elif group.id == 124:
			es_revisor = True
			t_es_revisor = True
			permiso = "s_tic_revisor"
			permiso_nm = "TIC (Revisor)"

		elif group.id == 125:
			es_aprobador = True
			t_es_aprobador = True
			permiso = "s_mantenimiento_aprobador"
			permiso_nm = "Mantenimiento (Aprobador)"

		elif group.id == 126:
			es_revisor = True
			t_es_revisor = True
			permiso = "s_mantenimiento_revisor"
			permiso_nm = "Mantenimiento (Revisor)"

		elif group.id == 127:
			es_aprobador = True
			t_es_aprobador = True
			permiso = "s_obracivil_aprobador"
			permiso_nm = "Obra Civil (Aprobador)"

		elif group.id == 128:
			es_revisor = True
			t_es_revisor = True
			permiso = "s_obracivil_revisor"
			permiso_nm = "Obra Civil (Revisor)"

		elif group.id == 129:
			es_aprobador = False
			t_es_aprobador = True
			permiso = "s_admin_financiero"
			permiso_nm = "Administrativo Financiero"

		permisos.append({"permiso_session":permiso,"permiso_session_nm":permiso_nm,"group_id":group.id, "es_revisor": es_revisor, "es_aprobador": es_aprobador,'es_solicitante':es_solicitante })

	permisos = sorted(permisos, key = lambda i: i['group_id'], reverse=True)

	context = {
		
		'es_solicitante': t_es_solicitante,
		'es_revisor': t_es_revisor,
		'es_aprobador': t_es_aprobador,
		'permisos': permisos,

	}

	return context



