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
from ap_base.views import insert_General,update_General,delete_General,concat_url,get_organigrama_position,get_directorDeArea
from ap_talentohumano.views import funcionario_selectbox

#MODEL
from django.contrib.auth.models import User
from ap_daf_certificaciones.models import DafCertificaciones
from ap_talentohumano.models import PerFuncionario

#SERIALIZADOR
from ap_api.v1.serializers.sz_daf import Daf_CertificacionesSerializer

#CORREO
from ap_base.views import send_mail,print_log

#FILES UPLOAD
from django.core.files.storage import FileSystemStorage


@login_required(login_url = '/login')
def menu_cuemManejopesquero(request):
	print_log("****** menu_cuemManejopesquero *******")

	permisos_user = get_permisos_user(request)
	#print_log(permisos_user)
	context= {
		'foto_perfil' : request.session['foto_perfil'],
		'permisos_user': permisos_user["permisos"],
		'es_solicitante': permisos_user["es_solicitante"],
		'es_tecnico': permisos_user["es_tecnico"],
		'es_visualizador': permisos_user["es_visualizador"]
	}

	return render(request, 'cuem_manejopesquero/menu_lateral.html' , context)


# PARMA 
@login_required(login_url = '/login')
def SL_cuem_pescadores(request):
	print_log("****** SL_cuem_pescadores *******")


	context = {
		#'permiso_session': request.session['permiso_session'],
		'certificaciones': "data",

	}

	return render(request, 'cuem_manejopesquero/SP_pescadores.html' , context)


@login_required(login_url = '/login')
def get_lista_pescadores(request):
	print_log("************get_lista_pescadores****************************")
	
	data = request.GET.get('data')
	obj = concat_url(request,"appfdtdatospescador_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def get_data_pescador(request):
	print_log("************ get_data_pescador ****************************")
	
	data = request.GET.get('data')
	obj = concat_url(request,"appfdtdatospescador",data)
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	return HttpResponse(json.dumps(response1), content_type="application/json")


@login_required(login_url = '/login')
def SL_cuem_parma(request):
	print_log("****** SL_cuem_parma *******")

	permisos_user = get_permisos_user(request)

	context = {
		'foto_perfil' : request.session['foto_perfil'],
		'permisos_user': permisos_user["permisos"],
		'es_solicitante': permisos_user["es_solicitante"],
		'es_tecnico': permisos_user["es_tecnico"],
		'es_visualizador': permisos_user["es_visualizador"],

		#'permiso_session': request.session['permiso_session'],
		'certificaciones': "data",

	}

	return render(request, 'cuem_manejopesquero/SP_licenciaparma.html' , context)

@login_required(login_url = '/login')
def get_lista_licenciaparma(request):
	print_log("************ get_lista_licenciaparma ****************************")
	
	data = request.GET.get('data')
	obj = concat_url(request,"appfdtlicenciaparma_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def get_historialparma(request):
	print_log("********* get_historialparma ************")
	cedula = request.GET.get('cedula')

	with connection.cursor() as cursor:
		try:
			# PAIS
			query = """
				SELECT
				app_fd_tlicenciaparma.id,
				app_fd_tlicenciaparma.c_licenciaparma,
				app_fd_tlicenciaparma.c_fechaemision,
				app_fd_tlicenciaparma.c_fechacaducidad,
				app_fd_tlicenciaparma.c_estadolicencia

				FROM public.app_fd_tlicenciaparma
				WHERE app_fd_tlicenciaparma.c_cedula = %s
				ORDER BY app_fd_tlicenciaparma.datecreated DESC				
			"""
			cursor.execute(query,[cedula])
			result1 = cursor.fetchall()

		except:
			print(">> No se encontro registros! ")
			result1 = [0,0,0,'NO EXISTE VALORES']

	context = {
		'hist_parmas': result1,

	}

	return HttpResponse(json.dumps(context), content_type="application/json")

@login_required(login_url = '/login')
def get_data_licenciaparma(request):
	print_log("************ get_data_licenciaparma ****************************")
	
	data = request.GET.get('data')
	obj = concat_url(request,"appfdtlicenciaparma_listall","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	return HttpResponse(json.dumps(response1), content_type="application/json")
	

# EMBARCACIONES PESCA
@login_required(login_url = '/login')
def SL_cuem_embarcacionespescaPesca(request):
	print_log("****** SL_cuem_embarcacionespescaPesca *******")
	
	context = {
		'certificaciones': "data",
	}

	return render(request, 'cuem_manejopesquero/SP_embarcacionesPesca.html' , context)


@login_required(login_url = '/login')
def get_lista_embarcacionesPesca(request):
	print_log("************ get_lista_embarcacionesPesca ****************************")
	
	data = request.GET.get('data')
	obj = concat_url(request,"appfdtpermisopesca_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def get_data_embarcacionpesca(request):
	print_log("************ get_data_embarcacionpesca ****************************")
	
	data = request.GET.get('data')
	obj = concat_url(request,"appfdtembarcacionpesca",data)
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	return HttpResponse(json.dumps(response1), content_type="application/json")

#buscar datos de pescadores segun el parametro ingresado
@login_required(login_url = '/login')
def pescador_data(request):
	print_log("************pescador_data****************************")

	data = request.GET.get('data')
	print_log("data: "+data)
	obj = concat_url(request,"appfdtdatospescador_listall","?search="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


# INSPECCION TECNICA OCULAR EMBARCACIONES PESCA
@login_required(login_url = '/login')
def SL_cuem_inspeccionTecnicaEmbarcacion(request):
	print_log("****** SL_cuem_inspeccionTecnicaEmbarcacion *******")
	
	context = {
		'certificaciones': "data",
	}

	return render(request, 'cuem_manejopesquero/SP_inspeccionTecnicaEmbarcacion.html' , context)

@login_required(login_url = '/login')
def get_lista_inspecciontecnicaembarcacion(request):
	print_log("************ get_lista_inspecciontecnicaembarcacion ****************************")
	
	data = request.GET.get('data')
	obj = concat_url(request,"appfdtinspecciontecnica_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def get_data_inspecciontecnicaembarcacion(request):
	print_log("************ get_data_inspecciontecnicaembarcacion ****************************")
	
	data = request.GET.get('data')
	obj = concat_url(request,"appfdtinspecciontecnica",data)
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	return HttpResponse(json.dumps(response1), content_type="application/json")


# PERMISOS PESCA
@login_required(login_url = '/login')
def SL_cuem_permisopesca(request):
	print_log("****** SL_cuem_permisopesca *******")
	
	context = {
		'certificaciones': "data",
	}

	return render(request, 'cuem_manejopesquero/SP_permisopesca.html' , context)

@login_required(login_url = '/login')
def get_lista_permisopesca(request):
	print_log("************ get_lista_permisopesca ****************************")
	
	data = request.GET.get('data')
	obj = concat_url(request,"appfdtpermisopesca_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def get_data_permisopesca(request):
	print_log("************ get_data_permisopesca ****************************")
	
	data = request.GET.get('data')
	obj = concat_url(request,"appfdtpermisopesca_listall","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	return HttpResponse(json.dumps(response1), content_type="application/json")

@login_required(login_url = '/login')
def get_historialpermisopesca(request):
	print_log("********* get_historialpermisopesca ************")
	matricula = request.GET.get('matricula')

	with connection.cursor() as cursor:
		try:
			# PAIS
			query = """
				SELECT
				app_fd_tpermisopesca.id,
				app_fd_tpermisopesca.c_permisopesca,
				app_fd_tpermisopesca.c_fechaemision,
				app_fd_tpermisopesca.c_fechacaducidad

				FROM public.app_fd_tpermisopesca
				WHERE app_fd_tpermisopesca.c_matriculadigmer = %s
				ORDER BY app_fd_tpermisopesca.datecreated DESC				
			"""
			cursor.execute(query,[matricula])
			result1 = cursor.fetchall()

		except:
			print(">> No se encontro registros! ")
			result1 = [0,0,0,'NO EXISTE VALORES']

	context = {
		'hist_permiso': result1,

	}

	return HttpResponse(json.dumps(context), content_type="application/json")	


#SOLICITANTE - USUARIO EXTERNO
@login_required(login_url = '/login')
def SL_cuem_solicitante(request):
	print_log("****** SL_cuem_solicitante *******")
	
	context = {
		'certificaciones': "data",
	}

	return render(request, 'cuem_manejopesquero/cuem_solicitante_iniciartramite.html' , context)

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
def delete_files_cueminiciartramite(request):
	print("***** delete_files_cueminiciartramite ******")
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

@login_required(login_url = '/login')
def SL_daf_certificacionesIniciarTramites(request):
	print_log("****** SL_daf_certificacionesIniciarTramites *******")

	dir_area = get_directorDeArea(request.session['direccion_estatuto_id'])
	data = get_dataCertificadosByPermission(request,'frm_certif','')
	

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

		#'es_solicitante': request.session['es_solicitante'],
		#'es_revisor': request.session['es_revisor'],
		#'es_aprobador': request.session['es_aprobador'],

		

	}

	return render(request, 'daf_certificaciones/daf_certificaciones_iniciartramite.html' , context)

@login_required(login_url = '/login')
def SL_daf_certificacionesBandeja(request):
	print_log("****** SL_daf_certificacionesBandeja *******")

	data = get_dataCertificadosByPermission(request,'frm_certifBE','')
	#funcionarios = get_funcionarioByRol(request,request.session['permiso_session'],request.session['isla_trabaja_id'])
	

	context= {
		'foto_perfil' : request.session['foto_perfil'],
		'funcionario_id' : request.session['funcionario_id'],
		'persona_nombres' : request.session['persona_nombres'],
		'puesto_institucional_nm' : request.session['puesto_institucional_nm'],
		'email_institucional': request.session['email_institucional'],
		'telefono_celular': request.session['telefono_celular'],
		'isla_trabaja_user': request.session['isla_trabaja_nm'],
		'isla_trabaja_id_user': request.session['isla_trabaja_id'],

		#'es_solicitante': request.session['es_solicitante'],
		#'es_revisor': request.session['es_revisor'],
		#'es_aprobador': request.session['es_aprobador'],

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

	}

	return render(request, 'daf_certificaciones/daf_certificaciones_estadostramites.html' , context)


@login_required(login_url = '/login')
def data_cuem_masters_pescadores(request):
	print_log("************data_masters****************************")

	with connection.cursor() as cursor:
		try:
			# PAIS
			query = """
				SELECT DISTINCT initcap(c.pais), initcap(c.pais) FROM sia.ciudad as c ORDER BY initcap(c.pais)
			"""
			cursor.execute(query)
			result1 = cursor.fetchall()

			# PROVINCIA
			query = """
				SELECT p.descripcion::text,initcap(p.descripcion), initcap(p.pais_id) FROM sia.provincia p
			"""
			cursor.execute(query)
			result2 = cursor.fetchall()

			# CIUDAD
			query = """
				SELECT DISTINCT initcap(c.ciudad), initcap(c.ciudad), initcap(c.provincia) 
				FROM sia.ciudad as c ORDER BY initcap(c.ciudad)
			"""
			cursor.execute(query)
			result3 = cursor.fetchall()

			# ISLA
			query = """
				SELECT initcap(isla.descripcion),initcap(isla.descripcion) 
				FROM sia.isla as isla 
				INNER JOIN sia.tipoisla as tipo on isla.tipoisla_id = tipo.id 
				WHERE tipo.descripcion = 'ISLA' AND isla.poblada = 'SI' 
				ORDER BY initcap(isla.descripcion)
			"""
			cursor.execute(query)
			result4 = cursor.fetchall()

			# INSTRUCCION ACADEMICA
			query = """
				SELECT DISTINCT initcap(i.descripcion),initcap(i.descripcion) 
				FROM sia.instruccionacademica as i 
				ORDER BY initcap(i.descripcion)
			"""
			cursor.execute(query)
			result5 = cursor.fetchall()

			# COOPERATIVAS
			query = """
				SELECT DISTINCT c.descripcion, c.descripcion FROM sia.cooperativa as c ORDER BY c.descripcion
			"""
			cursor.execute(query)
			result6 = cursor.fetchall()

			# CATEGORIA
			query = """
				SELECT DISTINCT cat.descripcion,cat.descripcion 
				FROM sia.categoria as cat 
				WHERE cat.descripcion = 'ARMADOR' OR cat.descripcion = 'PESCADOR' OR cat.descripcion = 'ARMADOR/PESCADOR' 
				ORDER BY cat.descripcion

			"""
			cursor.execute(query)
			result7 = cursor.fetchall()


		except:
			print(">> No se encontro registros! ")
			result1 = [0,0,0,'NO EXISTE VALORES']

	context = {
		'pais': result1,
		'provincia': result2,
		'ciudad': result3,
		'isla': result4,
		'instruc_academ': result5,
		'cooperativas': result6,
		'categoria': result7,

	}

	return HttpResponse(json.dumps(context), content_type="application/json")
	#return context


@login_required(login_url = '/login')
def data_cuem_masters_embarcaciones(request):
	print_log("************data_masters****************************")

	with connection.cursor() as cursor:
		try:
			# CIUDADES DE ECUADOR
			query = """
				SELECT DISTINCT initcap(c.ciudad), initcap(c.ciudad), initcap(c.provincia) 
				FROM sia.ciudad as c WHERE c.pais='ECUADOR' ORDER BY initcap(c.ciudad)

			"""
			cursor.execute(query)
			result3 = cursor.fetchall()

			# ISLA
			query = """
				SELECT initcap(isla.descripcion),initcap(isla.descripcion) 
				FROM sia.isla as isla 
				INNER JOIN sia.tipoisla as tipo on isla.tipoisla_id = tipo.id 
				WHERE tipo.descripcion = 'ISLA' AND isla.poblada = 'SI' 
				ORDER BY initcap(isla.descripcion)
			"""
			cursor.execute(query)
			result4 = cursor.fetchall()

			# PUERTO
			query = """
				SELECT initcap(p.descripcion), initcap(p.descripcion) 
				FROM sia.puerto as p
			"""
			cursor.execute(query)
			result5 = cursor.fetchall()

			# MATERIALES EMBARCACION
			query = """
				SELECT DISTINCT m.descripcion, m.descripcion 
				FROM sia.materialembarcacion as m 
				ORDER BY m.descripcion
			"""
			cursor.execute(query)
			result6 = cursor.fetchall()

			# MOTOR MARCA
			query = """
				SELECT 
				
				tpr_motor_marca.nombre

				FROM master.tpr_motor_marca
				WHERE tpr_motor_marca.eliminado = 'f'
				ORDER BY tpr_motor_marca.nombre ASC
			"""
			cursor.execute(query)
			result7 = cursor.fetchall()


		except:
			print(">> No se encontro registros! ")
			result1 = [0,0,0,'NO EXISTE VALORES']

	context = {
		'ciudad': result3,
		'isla': result4,
		'puerto': result5,
		'materiales_emb': result6,
		'marca_motores': result7,
	}

	return HttpResponse(json.dumps(context), content_type="application/json")
	#return context

def get_dataLicenciaParmaByPermission(request,param):
	print_log("****** get_dataLicenciaParmaByPermission *******")

	obj=response=""
	data = []
	#isla_trabaja_id = request.session['isla_trabaja_id']

	permisos_user = get_permisos_user(request)
	#print(permisos_user)
	permisos_user = permisos_user["permisos"]

	for perm in permisos_user:
			print_log(perm)
			if perm["permiso_session"] == 's_solicitante': 
				print_log(">>> List Solicitante ")
				obj = concat_url(request,"appfdtlicenciaparma_listall","?func_solicitante_id__id="+request.session['funcionario_id']+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()

				for item in response["results"]:
					item["permiso_session"] = "s_solicitante"
					item["permiso_session_nm"] = "Solicitante"
					data.append(item)

			elif perm["permiso_session"] == 's_parma_tecnico':
				print_log(">>> List Parma Tecnico ")
				obj = concat_url(request,"appfdtlicenciaparma_listall","?func_reasignado_id="+request.session['funcionario_id']+"&isla_usuario_ingreso_id="+isla_trabaja_id+'&estado_tramite=R&aprobar_dirarea=null&'+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()
				
				for item in response["results"]:
					item["permiso_session"] = "s_parma_tecnico"
					item["permiso_session_nm"] = "Parma (Tecnico)"
					data.append(item)

			elif perm["permiso_session"] == 's_parma_visualizador':
				print_log(">>> List Parma Visualizador ")
				obj = concat_url(request,"appfdtlicenciaparma_listall","?func_dirarea_id__id="+request.session['funcionario_id']+"&isla_usuario_ingreso_id="+isla_trabaja_id+'&estado_tramite=T&aprobar_dirarea=null&'+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()
				
				for item in response["results"]:
					item["permiso_session"] = "s_parma_visualizador"
					item["permiso_session_nm"] = "Parma (Visualizador)"
					data.append(item)

			elif perm["permiso_session"] == 's_director_tecnico': 
				print_log(">>> List Director Tecnico ")
				obj = concat_url(request,"appfdtlicenciaparma_listall","?tipo_revision=T&estado_tramite=T&aprobar_dirarea=true&aprobar_tic=null&"+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()
				
				for item in response["results"]:
					item["permiso_session"] = "s_director_tecnico"
					item["permiso_session_nm"] = "Director (Tecnico)"
					data.append(item)

			elif perm["permiso_session"] == 's_director_visualizador': 
				print_log(">>> List Director Visualizador ")
				obj = concat_url(request,"appfdtlicenciaparma_listall","?tipo_revision=T&estado_tramite=T&aprobar_dirarea=true&aprobar_tic=null&"+param)
				response = requests.get(obj["url"], headers=obj["headers"]).json()
				
				for item in response["results"]:
					item["permiso_session"] = "s_director_visualizador"
					item["permiso_session_nm"] = "Director (Visualizador)"
					data.append(item)

	#print_log(data)
	return data

def get_permisos_user(request):
	print_log("***** get_permisos_user ******")

	permisos = []
	permiso = ""
	permiso_nm = ""
	t_es_solicitante=t_es_tecnico=t_es_visualizador=False

	for group in request.user.groups.all():
		es_solicitante=es_tecnico=es_visualizador=False
		permiso_nm = ""

		if group.id == 150:
			es_solicitante = True
			t_es_solicitante = True
			permiso = "s_solicitante"
			permiso_nm = "Solicitante"

		elif group.id == 151:
			es_tecnico = True
			t_es_tecnico = True
			permiso = "s_parma_tecnico"
			permiso_nm = "Parma (Tecnico)"

		elif group.id == 152:
			es_visualizador = True
			t_es_visualizador = True
			permiso = "s_parma_visualizador"
			permiso_nm = "Parma (Visualizador)"

		elif group.id == 153:
			es_tecnico = True
			t_es_tecnico = True
			permiso = "s_director_tecnico"
			permiso_nm = "Director (Tecnico)"

		elif group.id == 154:
			es_visualizador = True
			t_es_visualizador = True
			permiso = "s_director_visualizador"
			permiso_nm = "Director (Visualizador)"

		permisos.append({"permiso_session":permiso,"permiso_session_nm":permiso_nm,"group_id":group.id, "es_tecnico": es_tecnico, "es_visualizador": es_visualizador,'es_solicitante':es_solicitante })

	permisos = sorted(permisos, key = lambda i: i['group_id'], reverse=True)

	context = {
		
		'es_solicitante': t_es_solicitante,
		'es_tecnico': t_es_tecnico,
		'es_visualizador': t_es_visualizador,
		'permisos': permisos,

	}

	return context


