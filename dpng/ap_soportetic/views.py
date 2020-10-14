# Django
from django.db.models import Q
from django.db import connection
import requests
import json

import csv
import sys,os,datetime, logging
from io import BytesIO
from argparse import ArgumentParser
from collections import namedtuple
from datetime import date
from decimal import Decimal

from django.shortcuts import render, render_to_response, get_object_or_404
from django.utils import timezone
from django.core.paginator import Paginator
from django.template import RequestContext, loader

#iniciando sesion
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, authenticate,logout

#para asegurando que haya una sesion activa
from django.contrib.auth.decorators import login_required

#sobre permisos de usuarios
from django.contrib.auth.decorators import permission_required

from django.http import HttpResponse

from django.conf import settings

from django.core.files.base import ContentFile
from ap_base.views import insert_General,update_General,delete_General,concat_url,get_organigrama_position

# Model
from ap_soportetic.models import *
from ap_base.models import *
from ap_talentohumano.models import PerFuncionarioAuth, PerFuncionario
from django.contrib.auth.models import User

# Django Filters
from django_filters import rest_framework as filters

from datetime import date

from ap_talentohumano.views import *


CODE_VERSION = getattr(settings, "CODE_VERSION", None)
DF_URL = getattr(settings, "DF_URL", None)
DF_API_KEY = getattr(settings, "DF_API_KEY", None)
DF_ACCESS_TOKEN = getattr(settings, "DF_ACCESS_TOKEN", None)


@login_required(login_url = '/login')
def menu_soportetic(request):
	return render(request, 'soportetic/menu_lateral.html')

@login_required(login_url = '/login')
def sptEquiposList(request):

	obj = concat_url(request,"sptmarca_list","")
	response = requests.get(obj["url"], headers=obj["headers"]).json()

	obj1 = concat_url(request,"sptproducto_list","")
	response1 = requests.get(obj1["url"], headers=obj1["headers"]).json()

	obj2 = concat_url(request,"sptubicacion_list","")
	response2 = requests.get(obj2["url"], headers=obj2["headers"]).json()

	obj3 = concat_url(request,"siscatalogo_list","?categoria__in=TIPO_EQUIPO_ST,CRITICIDAD_EQUIPO_ST,ESTADO_EQUIPO_ST")
	response3 = requests.get(obj3["url"], headers=obj3["headers"]).json()

	context = {
		'marcas': response["results"],
		'productos': response1["results"],
		'ubicaciones': response2["results"],
        'catalogos': response3["results"]
    }

	return render(request, 'soportetic/equipos/equipos.html', context)

@login_required(login_url = '/login')
def sptSolicitudServicioList(request):

	obj = concat_url(request,"sptmarca_list","")
	response = requests.get(obj["url"], headers=obj["headers"]).json()

	obj1 = concat_url(request,"sptproducto_list","")
	response1 = requests.get(obj1["url"], headers=obj1["headers"]).json()

	obj2 = concat_url(request,"sptubicacion_list","")
	response2 = requests.get(obj2["url"], headers=obj2["headers"]).json()

	obj3 = concat_url(request,"siscatalogo_list","?categoria__in=PRIORIDAD_ST,URGENCIA_ST,TIPO_SERVICIO_ST,TIPO_ACTIVIDAD_ST,CONCLUSION_ST,ESTADO_ST")
	response3 = requests.get(obj3["url"], headers=obj3["headers"]).json()

	obj4 = concat_url(request,"perfuncionario_list","?proceso_estatuto_id__id=PRC_GTI") #RESPONSABLE DE GESTIÓN DE TALENTO HUMANO 
	response4 = requests.get(obj4["url"], headers=obj4["headers"]).json()

	obj5 = concat_url(request,"sptubicacion_list","") #RESPONSABLE DE GESTIÓN DE TALENTO HUMANO 
	response5 = requests.get(obj5["url"], headers=obj5["headers"]).json()

	obj6 = concat_url(request,"spttipoproblema_list","") #RESPONSABLE DE GESTIÓN DE TALENTO HUMANO 
	response6 = requests.get(obj6["url"], headers=obj6["headers"]).json()

	obj7 = concat_url(request,"sptlistapregunta_list","") #RESPONSABLE DE GESTIÓN DE TALENTO HUMANO 
	response7 = requests.get(obj7["url"], headers=obj7["headers"]).json()

	with connection.cursor() as cursor:
		try:
			# PAIS
			query = """
				SELECT
				org_company.id,
				org_company.nombres,
				org_company.identificacion

				FROM master.org_company
				WHERE org_company.estado = 'A'
				ORDER BY org_company.nombres DESC				
			"""
			cursor.execute(query)
			result1 = cursor.fetchall()

		except:
			print_log(">> No se encontro registros! ")
			result1 = [null,'NO EXISTE VALORES','']

	context = {
		'companys': result1,
		'marcas': response["results"],
		'productos': response1["results"],
		'ubicaciones': response2["results"],
        'catalogos': response3["results"],
        'funcTics': response4["results"],
        'ubicaciones': response5["results"],
        'tipoproblemas': response6["results"],
        'preguntas': response7["results"],
        'isla_trabaja_id': request.session['isla_trabaja_id'],
    }

	return render(request, 'soportetic/equipos/solserv.html', context)

@login_required(login_url = '/login')
def data_subtipoProblemaParam(request):
	print_log("************data_subtipoProblemaParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"sptsubtipoproblema_list","?"+data+"")
	response = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response["results"]), content_type="application/json")

@login_required(login_url = '/login')
def spInfoBajasList(request):

	obj2 = concat_url(request,"sptubicacion_list","")
	response2 = requests.get(obj2["url"], headers=obj2["headers"]).json()

	obj4 = concat_url(request,"perfuncionario_list","?proceso_estatuto_id__id=PRC_GTI") #RESPONSABLE DE GESTIÓN DE TALENTO HUMANO 
	response4 = requests.get(obj4["url"], headers=obj4["headers"]).json()

	obj5 = concat_url(request,"sptubicacion_list","") #RESPONSABLE DE GESTIÓN DE TALENTO HUMANO 
	response5 = requests.get(obj5["url"], headers=obj5["headers"]).json()

	context = {
		'ubicaciones': response2["results"],
        'funcTics': response4["results"],
        'ubicaciones': response5["results"]
    }

	return render(request, 'soportetic/equipos/infobajas.html', context)

@login_required(login_url = '/login')
def sptMarcasList(request):
	return render(request, 'soportetic/equipos/marcas.html')

@login_required(login_url = '/login')
def sptPreguntasList(request):
	return render(request, 'soportetic/equipos/preguntas.html')

@login_required(login_url = '/login')
def sptUbicacionList(request):
	return render(request, 'soportetic/equipos/ubicaciones.html')

@login_required(login_url = '/login')
def sptProductoList(request):

	obj2 = concat_url(request,"sptunidadmedida_list","")
	response2 = requests.get(obj2["url"], headers=obj2["headers"]).json()

	obj3 = concat_url(request,"siscatalogo_list","?categoria=TIPO_PRODUCTO")
	response3 = requests.get(obj3["url"], headers=obj3["headers"]).json()

	context = {
		'unidades': response2["results"],
        'tipos': response3["results"]
    }
   
	return render(request, 'soportetic/equipos/productos.html', context)

@login_required(login_url = '/login')
def sptTipoEquipoList(request):
	return render(request, 'soportetic/equipos/tipoequipo.html')

@login_required(login_url = '/login')
def sptUnidadMedidaList(request):
	return render(request, 'soportetic/equipos/unidadmedida.html')


#buscar datos de personas segun el parametro ingresado
@login_required(login_url = '/login')
def equipo_data(request):
	print_log("************marca_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"sptequipo_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_equipoParam(request):
	print_log("************data_marcasParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"sptequipo_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de personas segun el parametro ingresado
@login_required(login_url = '/login')
def marca_data(request):
	print_log("************marca_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"sptmarca_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_marcasParam(request):
	print_log("************data_marcasParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"sptmarca_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de personas segun el parametro ingresado
@login_required(login_url = '/login')
def ubicacion_data(request):
	print_log("************marca_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"sptubicacion_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_ubicacionesParam(request):
	print_log("************data_ubicacionesParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"sptubicacion_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de personas segun el parametro ingresado
@login_required(login_url = '/login')
def producto_data(request):
	print_log("************producto_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"sptproducto_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_ProductoParam(request):
	print_log("************data_ProductoParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"sptproducto_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def tipoequipo_data(request):
	print_log("************tipoequipo_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"spttipoequipo_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def data_tipoequipoParam(request):
	print_log("************data_tipoequipoParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spttipoequipo_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de personas segun el parametro ingresado
@login_required(login_url = '/login')
def unidadmedida_data(request):
	print_log("************unidadmedida_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"sptunidadmedida_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_unidadmedidaParam(request):
	print_log("************data_unidadmedidaParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"sptunidadmedida_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


#@login_required(login_url = '/login')
def get_remote_data_sysaid(request):
	print_log("************get_remote_data_sysaid****************************")

	msj_dba = "Datos sincronizados desde el sysaid"
	_table="service_req"
	_idtable = request.GET.get('data')
	#_idtable = "5000"
	mjson = ""

	url = DF_URL+'/_table/'+_table+'?filter=id%3D'+str(_idtable)
	print_log(url)
	headers = {"X-DreamFactory-Api-Key": DF_API_KEY}
	response = requests.get(url, headers = headers)

	if response.status_code==200:
		mjson = json.loads(response.text)
		print_log(">>> Datos del Sysaid: ")
		print_log(mjson)
		
		isla_obj = GeoIsla(id=request.session['isla_trabaja_id'])

		# TIPO PROBLEMA
		name_type = mjson["resource"][0]["problem_type"]
		existe_mptype = False
		tipoProbl=""

		try:
			mptype = SptTipoProblema.objects.filter(descripcion=name_type)
			for item in mptype:
				existe_mptype = True
				tproblema_id = item.id
				tipoProbl = SptTipoProblema(id=item.id)
				print_log(tipoProbl.id)

		except:
			print_log(">> Error no existe tipo de problema %s!" % name_type)
			
		if existe_mptype==False:
			tipoProbl = SptTipoProblema.objects.create(descripcion=name_type,eliminado=False,estado='A',isla_usuario_ingreso_id=isla_obj,usuario_ingreso=request.session['username'],observaciones_dba=msj_dba)

		#print_log(tipoProbl)


		# SUBTIPO PROBLEMA
		
		name_subtype = mjson["resource"][0]["problem_sub_type"]
		existe_subtype = False
		subtipo=""
		try:
			mpsubtype = SptSubTipoProblema.objects.filter(descripcion=name_subtype)
			for item in mpsubtype:
				subtipo = item
				print_log(subtipo)
				existe_subtype = True
		except:
			print_log(">> Error no existe subtipo de problema %s!" % name_subtype)
		
		if existe_subtype==False:
			subtipo = SptSubTipoProblema.objects.create(descripcion=name_subtype,tipoproblema=tipoProbl ,eliminado=False,estado='A',isla_usuario_ingreso_id=isla_obj,usuario_ingreso=request.session['username'],observaciones_dba=msj_dba)
		
		
		#print_log(mjson["resource"][0])

		# busca usuario asignado y empleado
		try:
			
			#funcionario_id = PerFuncionario(id=funcionario_id)
			user_name = mjson["resource"][0]["responsibility"]
			print_log(">>> responsibility:"+user_name)

			print_log("*********************************************************")
			"""	
			#user_ = User.objects.get(username=user_name)
			#print_log(user_)
			#funcionario_id = str(PerFuncionarioAuth.objects.get(user=user_).funcionario_id.id)
			#funcionario_nombres = PerFuncionarioAuth.objects.get(user=user_).funcionario_id.persona_id.nombres
			#funcionario_apellidos = PerFuncionarioAuth.objects.get(user=user_).funcionario_id.persona_id.apellidos
			#funcionario_nm = funcionario_nombres + " " + funcionario_apellidos
			#usuario_id = PerFuncionarioAuth.objects.get(user=user_).user.id
			"""
			
			"""
			obj = concat_url(request,"perfuncionariodata_list","?email__icontains="+user_name+"")
			response = requests.get(obj["url"], headers=obj["headers"]).json()
			print_log("*********************************************************")

			print_log(response["results"][0]["id"])
			print_log(response["results"][0]["persona_id"]["nombre_completo"])
			funcionario_id = response["results"][0]["id"]
			funcionario_nm = response["results"][0]["persona_id"]["nombre_completo"]
			funcionario_em = response["results"][0]["email"]
			usuario_id = user_name
			"""
			#funcionario_id = response["results"][0]["id"]
			funcionario_nm = user_name
			#funcionario_em = response["results"][0]["email"]
			#usuario_id = user_name

		except:
			funcionario_id = None
			funcionario_nm = None
			funcionario_em = None
			usuario_id = None
			print_log("Error no existe el usuario responsable/asignado %s!" % user_name)


		# busca usuario solicita
		try:
			
			#funcionario_id = PerFuncionario(id=funcionario_id)

			#user_name_sol = mjson["resource"][0]["submit_user"]
			user_name_sol = mjson["resource"][0]["request_user"]
			print_log(">>> user_name_sol:"+user_name_sol)
			print_log("*********************************************************")
			print_log(user_name_sol)
			#user_sol = User.objects.get(username=user_name_sol)
			#funcionario_id_sol = str(PerFuncionarioAuth.objects.get(user=user_sol).funcionario_id.id)
			#funcionario_nombres_sol = PerFuncionarioAuth.objects.get(user=user_sol).funcionario_id.persona_id.nombres
			#funcionario_apellidos_sol = PerFuncionarioAuth.objects.get(user=user_sol).funcionario_id.persona_id.apellidos
			#funcionario_nm_sol = funcionario_nombres + " " + funcionario_apellidos
			#usuario_id_sol = PerFuncionarioAuth.objects.get(user=user_sol).user.id
			#func_id = PerFuncionario.objects.filter(email__icontains="omoreira@galapagos.gob.ec")
			#obj = concat_url(request,"perfuncionariodata_list","?email__icontains="+user_name_sol+"")
			obj = concat_url(request,"perfuncionariodata_list","?email__icontains="+user_name_sol+"")
			response1 = requests.get(obj["url"], headers=obj["headers"]).json()
			print_log("*********************************************************")
			print_log(response1["results"][0]["id"])
			print_log(response1["results"][0]["persona_id"]["nombre_completo"])
			funcionario_id_sol = response1["results"][0]["id"]
			funcionario_nm_sol = response1["results"][0]["persona_id"]["nombre_completo"]
			funcionario_em_sol = response1["results"][0]["email"]
		except:
			funcionario_id_sol = None
			funcionario_nm_sol = None
			funcionario_em_sol = None
			print_log("Error no existe el usuario Solicitante %s!" % user_name_sol)

		########################################################
		# STATUS
		########################################################
		mestado = mjson["resource"][0]["status"]
		if mestado==1:
			mestado_txt='open'
		elif mestado == 6:
			mestado_txt='done'
		else:
			mestado_txt='working'


		print_log(tipoProbl.id)
		print_log(subtipo.id)

		record = {
			'title': mjson["resource"][0]["title"],
			'ext_problem_type':mjson["resource"][0]["problem_type"],
			'ext_problem_sub_type':mjson["resource"][0]["problem_sub_type"],
			'ext_status' : mjson["resource"][0]["status"],
			'ext_urgency' : mjson["resource"][0]["urgency"],
			'ext_priority' : mjson["resource"][0]["priority"],
			'ext_location' : mjson["resource"][0]["location"],
			'ext_submit_user' : mjson["resource"][0]["submit_user"],
			'ext_full_name' : mjson["resource"][0]["full_name"],
			'ext_responsibility' : mjson["resource"][0]["full_name"],
			'description' : mjson["resource"][0]["description"]+'\n'+mjson["resource"][0]["insert_time"]+'\n'+mjson["resource"][0]["insert_time"][:-4],
			'ext_insert_time' : mjson["resource"][0]["insert_time"],#[:-4],
			'request_date' : mjson["resource"][0]["insert_time"],#[:-4],
			'due_date' : mjson["resource"][0]["due_date"],#[:-4],
			'urgency' : mjson["resource"][0]["urgency"],
			'priority' : mjson["resource"][0]["priority"],
			'ext_email_account' : mjson["resource"][0]["email_account"],
			'ext_responsibility' : mjson["resource"][0]["responsibility"],
			'problem_type' : str(tipoProbl.id),
			'problem_subtype' : str(subtipo.id),
			#'assigned_to_id' : funcionario_id,
			'assigned_to_nombre' : funcionario_nm,
			#'assigned_to_email' : funcionario_em,
			#'assigned_to' : usuario_id,
			'solicita_id_fun' : funcionario_id_sol,
			'solicita_nombre' : funcionario_nm_sol,
			'solicita_email' : funcionario_em_sol,
			#'user' : muser,
			'state' : mestado_txt,

		}

		print_log(">>>>>>>> record:")
		print_log(record)
		

	return HttpResponse(json.dumps(record), content_type="application/json")

	
#buscar datos de personas segun el parametro ingresado
@login_required(login_url = '/login')
def solserv_data(request):
	print_log("************solserv_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"sptsolicitudservicio_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_solservParam(request):
	print_log("************data_solservParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"sptsolicitudservicio_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_equipoCustParam(request):
	print_log("************data_equipoCustParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spthistcustodioequipo_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_infoBajaCabParam(request):
	print_log("************data_infoBajaCabParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"sptinformebajas_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def data_infoBajaCab(request):
	print_log("************data_infoBajaCab****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"sptinformebajas_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def data_secinfoBajaCab(request):
	print_log("************data_secinfoBajaCab****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"sptinformebajas_list","?tipo_reporte="+data+"&field=secuencia")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


#buscar datos de personas segun el parametro ingresado
@login_required(login_url = '/login')
def pregunta_data(request):
	print_log("************pregunta_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"sptlistapregunta_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_preguntasParam(request):
	print_log("************data_preguntasParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"sptlistapregunta_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


def getmarca_by_name(request,name):
	data = 'descripcion__icontains='+name+''
	obj = concat_url(request,"sptmarca_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	
	return(response1["results"]);

def get_location_by_name(request,name):
	data = 'descripcion__icontains='+name+''
	obj = concat_url(request,"sptubicacion_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	
	return(response1["results"]);

def get_producto_by_name(request,name,precio):
	data = 'descripcion__icontains='+name+'&precio_venta__in='+precio+''
	obj = concat_url(request,"sptproducto_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	
	return(response1["results"]);

def get_equipo_by_codigo(request,codigo):
	data = 'codigo__icontains='+codigo+''
	obj = concat_url(request,"sptequipo_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	
	return(response1["results"]);

def import_product(request):  
	current_path = "static/media/soporte_tic/"
	file_name = request.GET.get('file_name')
	prod_file=os.path.join (current_path,file_name)
	result = {} 
	print_log("*************archivo a importar ***********************")
	nombre_cat = "";
	nombre = "";
	codigo = "";
	nombre_cat = "";
	name_location = "";
	name_party = "";
	name_brand = "";
	#encoding = 'UTF-8'
	encoding = 'ISO-8859-1'
	if prod_file:
		print_log( "----------- INICIA A IMPORTACION DE EQUIPOS ---------")
		header=True
		lines = csv.reader(open(prod_file, 'r', encoding=encoding), delimiter=';')
		acum = 1

		for line in lines:
			if not header:
				
				#vaux = bytes(line[17].encode())
				habilitado = line[17].strip().upper()
				
				if (habilitado=="S"):
					nombre_cat =line[5].strip().upper()
				print_log("11111111111111111111111111111")
				#print_log(nombre_cat.count('/'))
				if (nombre_cat.count('/')>=1):
					nombreArr= nombre_cat.split('/')
					lennombre = len(nombreArr)-1
					print_log(lennombre)
					if(len(nombreArr) > 2):
						nombreProd = nombreArr[(lennombre-1)] +' '+nombreArr[lennombre]
					else:
						nombreProd = nombreArr[lennombre]

					nombreBusar = nombreProd.strip() +' '+ line[8].upper().strip()
					nombreProd  = nombreProd.strip() +' '+ line[8].upper().strip()+' '+ line[7].upper().strip()+' '+ line[13].upper().strip()
					
					print_log(nombreProd)
					#nombre = nombre+ (bytes(line[8].encode("UTF-8"))).decode('ISO-8859-1').strip()+' '+(bytes(line[7].encode())).decode('ISO-8859-1').strip()+' '+(bytes(line[13].encode())).decode('utf_8').strip()
					codigo = line[0].strip()
					codigo_externo = line[1].strip()
					serie = line[6].strip()
					criticidad = line[9].upper().strip()
					print_log("222222222222222222222222222222222")
					color = line[13].upper().strip()
					name_location=line[19].upper().strip()
					name_ubicacion=line[20].upper().strip()
					ced_func=line[21].upper().strip()
					name_party=line[22].upper().strip()
					name_brand=line[8].upper().strip()
					modelo=line[7].upper().strip()

					valor_contable=line[38].replace(',', '')
					valor_residual=line[39].replace(',', '')
					valor_libros  = line[40].replace(',', '')
					valor_dep_acum  = line[41].replace(',', '')
					depreciable   =line[33].upper().strip()
					vida_util   = line[36]
					cuenta_contable   =line[32].upper().strip()
					precio_costo   = line[11].replace(',', '')
					fecha_ingreso   =line[34].upper().strip()
					print(fecha_ingreso)
					(day, month, year) = [int(d) for d in fecha_ingreso.split('/')]
					fecha_ingreso_aux = date(year, month, day)

					marca = SptMarca()
					mbrand = getmarca_by_name(request,name_brand)
					if len(mbrand) > 0:
						marca=mbrand
					else:
						marca_id = uuid.uuid4()
						b4 = SptMarca(id=marca_id, descripcion=name_brand, estado='A', eliminado = 'f')
						b4.save()  # Overrides the previous blog with ID=3!

					ubicacion = SptUbicacion()
					mubicacion = get_location_by_name(request,name_ubicacion)
					if len(mubicacion) > 0:
						ubicacion=mubicacion
					else:
						ubicacion_id = uuid.uuid4()
						b4 = SptUbicacion(id=ubicacion_id, descripcion=name_ubicacion, bodega=name_location, estado='A', eliminado = 'f')
						b4.save()  # Overrides the previous blog with ID=3!

					producto = SptProducto()
					print("************************************"+nombreBusar+"************"+precio_costo)
					mproducto = get_producto_by_name(request,nombreBusar,precio_costo)
					#print_log(len(mproducto))
					if len(mproducto) > 0:
						producto=mproducto
						bandProd = 0
					else:
						producto_id = uuid.uuid4()
						producto = SptProducto(id=producto_id, descripcion=nombreProd, tipo='ACT', udm_por_defecto='u', estado='A', eliminado = 'f', fecha_ingreso_producto=fecha_ingreso_aux, precio_venta=Decimal(precio_costo), valor_residual=Decimal(valor_residual), vida_util=vida_util, cuenta_contable=cuenta_contable, depreciable=depreciable ,valor_contable=Decimal(valor_contable) ,valor_libro=Decimal(valor_libros), valor_depreciacion_acumulada=Decimal(valor_dep_acum))
						producto.save()  # Overrides the previous blog with ID=3!
						print_log(producto.id)
						bandProd = 1
						print("************************************producto creado")

					
					print_log(name_party+"---"+ced_func)
					funcionario = PerFuncionario()
					funcionariores = funcionario_data2(request,ced_func)

					if len(funcionariores) > 0:
						funcionario=funcionariores
					else:
						persona = PerPersona()
						mpersona = persona_data_2(request,ced_func)
						print_log(mpersona)
						if len(mpersona) > 0:
							persona.id = mpersona[0].get('id')
						else:
							persona_id = uuid.uuid4()
							b4 = PerPersona(id=persona_id, nombres=name_party, identificacion=ced_func, estado='A', eliminado = 'f')
							b4.save()  # Overrides the previous blog with ID=3!
							persona.id = persona_id
						print_log("-------------------------------------------")
						print_log(persona)
						b4 = PerFuncionario(id=uuid.uuid4(), persona_id=persona, estado='A', eliminado = 'f')
						b4.save()  # Overrides the previous blog with ID=3!
					
					equipo = SptEquipo()
					mequipo = get_equipo_by_codigo(request,codigo)
					print_log(mequipo)
					if len(mequipo) > 0:
						equipo=mequipo
					else:
						print_log("-------------------------------------------")
						print_log(nombreProd)

						print_log("+++++++++++++++++++++++++++++++++++++++++++")
						print("************************************producto***************************************")
						#producto_ = get_producto_by_name(request,nombreProd,precio_costo)
						#print_log(producto.count)
						#print_log(producto)
						marca_ = getmarca_by_name(request,name_brand)
						ubicacion_ = get_location_by_name(request,name_ubicacion)
						funcionario_ = funcionario_data2(request,ced_func)

						productoIns = SptProducto()
						ubicacion = SptUbicacion()
						marca = SptMarca()
						duenio = PerPersona()
						funcionario = PerFuncionario()

						if bandProd == 1:
							productoIns.id=producto.id
						else:
							productoIns.id=producto[0].get('id')

						marca.id=marca_[0].get('id')
						ubicacion.id=ubicacion_[0].get('id')
						duenio.id='89571404-d6bb-11e6-b2e3-000c29e38a2f'
						funcionario.id = funcionario_[0].get('id')
						
						#print_log(name_location)
						#print_log(producto.id)
						b = SptEquipo(id=uuid.uuid4(), producto_id=productoIns, marca_id=marca, modelo=modelo, codigo=codigo, codigo_externo=codigo_externo, serie_num=serie, criticidad='B', fecha_compra=fecha_ingreso_aux, estado_equipo='B' ,color=color ,administrador_id= funcionario, duenio_id=duenio, ubicacion_id=ubicacion, estado='A', eliminado = 'f')
						b.save()  # Overrides the previous blog with ID=3!

				else:
					pass
				print_log("********************///////////////////////////////********************")
				acum = acum+1
			header=False
			result.update({'result':'OK'})

	return HttpResponse(json.dumps(result), content_type="application/json")

"""
@login_required(login_url = '/login')
def upload_filesEq_json(request):
	print_log_log("***** upload_files_json ******")

	file_path = request.POST['file_path']
	#id_table = request.POST['id_table']
	filename=""
	result = {} 
	cont = 0


	if request.method == 'POST' and request.FILES['myfile']:
		ruta = file_path
		
		print_log_log(">> file_path: "+str(file_path) )
		#print_log_log(">> id: "+str(id_table) )
		print_log_log(">> Ruta: "+str(ruta))
		
		if not os.path.isdir(ruta):
			print_log_log('>> The directory is not present. Creating a new one..')
			#os.mkdir(ruta, 0777)
			os.mkdir(ruta)
		else:
			print_log_log('>> The directory is present.')

		for myfile in request.FILES.getlist('myfile'):
			print_log_log(">>> myfile: "+myfile.name)
			#rutafile = file_path + myfile.name
			#print_log_log(">>>> rutafile: "+rutafile)
			fs = FileSystemStorage(location=ruta)
			#fs.remove(myfile.name, myfile)
			nm_file = re.sub('[^a-zA-Z0-9 \n\.\_\s]', '', myfile.name)
			filename = fs.save(nm_file, myfile)
			uploaded_file_url = fs.url(filename)

			result.update({'file'+str(cont):filename})
			cont=cont +1

		print_log_log(result)
		return HttpResponse(json.dumps(result), content_type="application/json")

	
	return HttpResponse("ERROR")
	#return HttpResponse(json.dumps(result), content_type="application/json")"""


def _remote_data(cls, doc_request):
    pool = Pool()
    User = Pool().get('res.user')
    user = User(Transaction().user)

    Config = pool.get('maintenance.configuration')
    Accion = pool.get('maintenance.request_service.actions')
    config = Config(1)
    if not config.ext_url:
        return False
    if not config.ext_apikey:
        return False
    _table="service_req"
    url = config.ext_url+'/_table/'+_table+'/'+str(doc_request.ext_id)
    headers = {"X-DreamFactory-Api-Key": config.ext_apikey,"Content-Type":"application/json"}
    if doc_request.state=='open':
        mestado = 1
    if doc_request.state=='working':
        mestado = 2
    if doc_request.state=='done':
        mestado = 6
    body = {"solution":doc_request.approved_notes,
            "status":mestado}
    response = requests.put(url, headers = headers,data=json.dumps(body))
    _table="work_report"
    url = config.ext_url+'/_table/'+_table
    #if response.status_code==200:
    for action in  doc_request.actions:
        if action.ext_id==0:
            body = {
					"resource": [{
						"service_req_id":doc_request.ext_id,
						"user_name":str(action.user.name),
						"from_time": action.from_time.strftime("%Y-%m-%d %H:%M:%S.%f"),
						"to_time": action.to_time.strftime("%Y-%m-%d %H:%M:%S.%f"),
						"description": str(action.message),
						"account_id":config.ext_account
					}]
                }
            responseR = requests.post(url, headers = headers,data=json.dumps(body))
            if responseR.status_code==200:
                mjsonR = json.loads(responseR.text)
                action.update_external_id(action, mjsonR["resource"][0]["id"])
        else:
            try:
                mname= str(action.user.name)
            except:
                mname =''

            body = {
                "resource": [{
						"id":str(action.ext_id),
						"user_name":mname,
						"from_time": action.from_time.strftime("%Y-%m-%d %H:%M:%S.%f"),
						"to_time": action.to_time.strftime("%Y-%m-%d %H:%M:%S.%f"),
						"description": str(action.message),
						"account_id":config.ext_account
                    }]
                }
            responseR = requests.put(url, headers = headers,data=json.dumps(body))
    return True


def update_data_remote(request):
	print_log("************update_data_remote****************************")
	resolucion = request.GET.get('resolucion')
	estado = request.GET.get('estado')
	id = request.GET.get('id')
	_table="service_req"
	url = DF_URL+'/_table/'+_table+'/'+str(id)
	print(url)
	#print(DF_API_KEY)
	apikey='451504b8e72856253d80421d40bc0d82cabd76903404ed5aad05a1dcadf04802';
	headers = {"X-DreamFactory-Api-Key": apikey,"Content-Type":"application/json"}
	body = {"solution":resolucion,
			"status":estado}
	response = requests.put(url, headers = headers,data=json.dumps(body))
	return HttpResponse(response)   


@login_required(login_url = '/login')
def datasecuencia_SolicitudServicio(request):
	print("************data_subprocesoXproc****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"sissecuencia_list","?codigo__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")