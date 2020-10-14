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

#SERIALIZADOR CIN
#from ap_api.v1.serializers.sz_cin import 

#CORREO
from ap_base.views import send_mail
from ap_base.models import *

#FILES UPLOAD
from django.core.files.storage import FileSystemStorage


#========================================= VIEWS ACCESS TEMPLATES CIN ==========================================
#Template menu principal
@login_required(login_url = '/login')
def menu_cuso_controlinsular(request):
	print_log("****** menu_controlinsular *******")
	menu_config = True
	context = {
		'menu_config': menu_config
	}
	return render(request, 'cuso_controlinsular/menu_lateral.html', context)

@login_required(login_url = '/login')
def Cuso_cronograma(request):
	context = {
		'funcionario_id' : request.session['funcionario_id'],
		'persona_nombres' : request.session['persona_nombres'],
		
	 }

	return render(request, 'cuso_controlinsular/cronograma.html',context)

#Template control ingreso de turistas
@login_required(login_url = '/login')
def control_turista(request):
	print_log("****** control_turista *******")
	context = {
		'funcionario_id' : request.session['funcionario_id'],
		'persona_nombres' : request.session['persona_nombres'],
	}
	return render(request, 'cuso_controlinsular/control_turista.html', context)

#Template control de registros de pesca
@login_required(login_url = '/login')
def control_pesca(request):
	print_log("****** control_pesca *******")
	context = {
		'funcionario_id' : request.session['funcionario_id'],
		'persona_nombres' : request.session['persona_nombres'],
	}
	return render(request, 'cuso_controlinsular/control_pesca.html', context)

#Template control de patrullaje (hitos, sitios, novedades)
@login_required(login_url = '/login')
def control_patrullaje(request):
	print_log("****** control_patrullaje*******")
	obj = concat_url(request,"cinfuncionarios_list","")
	response = requests.get(obj["url"], headers=obj["headers"]).json()
	
	obj2 = concat_url(request,"siscatalogo_list","?categoria=CIN_CTPATRULLAJE_ESTADO_HITO")
	response2 = requests.get(obj2["url"], headers=obj2["headers"]).json()

	obj3 = concat_url(request,"siscatalogo_list","?categoria=CIN_CTPATRULLAJE_AREA")
	response3 = requests.get(obj3["url"], headers=obj3["headers"]).json()

	obj4 = concat_url(request,"siscatalogo_list","?categoria=CIN_CTPATRULLAJE_NOVEDAD")
	response4 = requests.get(obj4["url"], headers=obj4["headers"]).json()


	context = {
		'funcionarios': response["results"],
		'estados_hito': response2["results"],
		'areas': response3["results"],
		'novedades': response4["results"],
	}
	return render(request, 'cuso_controlinsular/control_patrullaje.html',context)

#Template inspeccion de contenedores
@login_required(login_url = '/login')
def control_contenedores(request):
	print_log("****** control_contenedores *******")
	
	obj = concat_url(request,"siscatalogo_list","?categoria=CIN_CTCONTENEDORES_EMBARCACIONES")
	response = requests.get(obj["url"], headers=obj["headers"]).json()
	
	context = {
		'funcionario_id' : request.session['funcionario_id'],
		'persona_nombres' : request.session['persona_nombres'],
		'embarcaciones' : response["results"]
	}
	return render(request, 'cuso_controlinsular/control_contenedores.html', context)	

#Template control de aeropuerto principal
@login_required(login_url = '/login')
def control_aeropuerto_principal(request):
	print_log("****** control_aeropuerto_principal *******")
	
	obj = concat_url(request,"cinfuncionarios_list","")
	response = requests.get(obj["url"], headers=obj["headers"]).json()
	
	obj2 = concat_url(request,"siscatalogo_list","?categoria=CIN_CTAEROPUERTO_AREA_TRABAJO")
	response2 = requests.get(obj2["url"], headers=obj2["headers"]).json()
	
	obj3 = concat_url(request,"siscatalogo_list","?categoria=CIN_CTAEROPUERTO_TIPO_GUIA")
	response3 = requests.get(obj3["url"], headers=obj3["headers"]).json()
	
	obj4 = concat_url(request,"siscatalogo_list","?categoria=CIN_CTAEROPUERTO_TIPO_PESCA")
	response4 = requests.get(obj4["url"], headers=obj4["headers"]).json()
	
	obj5 = concat_url(request,"siscatalogo_list","?categoria=CIN_CTAEROPUERTO_TIPO_MUESTRA")
	response5 = requests.get(obj5["url"], headers=obj5["headers"]).json()
	
	obj6 = concat_url(request,"siscatalogo_list","?categoria=CIN_CTAEROPUERTO_AEROLINEA")
	response6 = requests.get(obj6["url"], headers=obj6["headers"]).json()

	context = {
		'funcionarios': response["results"],
		'areas': response2["results"],
		'tipos_guia': response3["results"],
		'tipos_pesca': response4["results"],
		'tipos_muestra': response5["results"],
		'aerolineas' : response6['results'],
	}

	return render(request, 'cuso_controlinsular/control_aerop_principal.html', context)

#Template control de recorrido - iguanas
@login_required(login_url = '/login')
def control_aeropuerto_iguanas(request):
	obj = concat_url(request,"cinfuncionarios_list","")
	response = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		'funcionarios': response["results"],
	}
	print_log("****** control_aeropuerto_iguanas *******")
	return render(request, 'cuso_controlinsular/control_iguanas.html',context)

#Template aeropuerto recorridos
@login_required(login_url = '/login')
def control_aeropuerto_recorridos(request):
	print_log("****** control_aeropuerto_recorridos *******")

	obj = concat_url(request,"cinfuncionarios_list","")
	response = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		'funcionarios': response["results"]
	}
	return render(request, 'cuso_controlinsular/control_aerop_recorrido.html', context)

#==============================================================================================================

#===================================== CONTROL DE INGRESO DE TURISTAS =========================================

#Buscar actas de ingreso de turistas por parametros 
@login_required(login_url = '/login')
def data_ParamActaControlTuristas(request):
	print_log("************data_ParamactaVisitaCuso****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"cincontrolturista_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


#Buscar actas de ingreso turistas segun el id
@login_required(login_url = '/login')
def editActaVisitaCuso(request):
	print_log("************editActaVisitaCuso****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cincontrolturista_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


#Buscar registros de sitios segun el id del acta de control de turistas
@login_required(login_url = '/login')
def editActaTuristaSitio(request):
	print_log("************editActaTuristaSitio****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cincontrolturistasitio_list","?controlturistas_id__id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#==============================================================================================================

#============================================ CONTROL DE PESCA ================================================

#Buscar actas de control de pesca por parametros
@login_required(login_url = '/login')
def data_ParamActaControlPesca(request):
	print_log("************data_ParamActaControlPesca****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"cincontrolpesca_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar acta de control de pesca segun el id
@login_required(login_url = '/login')
def editActaControlPesca(request):
	print_log("************editActaControlPesca****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cincontrolpesca_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar registros de especies segun el id de acta de control de pesca
@login_required(login_url = '/login')
def editActaPescaEspecie(request):
	print_log("************editActaPescaEspecie****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cincontrolpescaespecie_list","?controlpesca_id__id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#==============================================================================================================

#========================================== CONTRO PATRULLAJE =================================================
#Buscar actas de control de patrullaje por parametros
@login_required(login_url = '/login')
def data_ParamActaControlPatrullaje(request):
	print_log("************data_ParamActaControlPatrullaje****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"cincontrolpatrullaje_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar acta de control de patrullaje segun el id
@login_required(login_url = '/login')
def editActaControlPatrullaje(request):
	print_log("************editActaControlPatrullaje****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cincontrolpatrullaje_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar registros de verificacion de hitos segun id de acta de control de patrullaje
@login_required(login_url = '/login')
def editActaControlPatrullajeHito(request):
	print_log("************editActaPatrullajeHito****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cincontrolhitopatrullaje_list","?controlpatrullaje_id__id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar registros de sitios segun id de acta de control de patrullaje
@login_required(login_url = '/login')
def editActaControlPatrullajeSitio(request):
	print_log("************editActaControlPatrullajeSitio****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cincontrolsitiopatrullaje_list","?controlpatrullaje_id__id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#=========================================================================================================

#================================== INSPECCION DE CONTENEDORES ===========================================
#Buscar actas de inspeccion de contenedores por parametros
@login_required(login_url = '/login')
def data_ParamActaControlContenedores(request):
	print_log("************data_ParamActaControlContenedores****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"cininspeccioncontenedores_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar acta de control de contenedores segun el id.
@login_required(login_url = '/login')
def editActaControlContenedores(request):
	print_log("************editActaControlContenedores****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cininspeccioncontenedores_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")
#=========================================================================================================

#================================= CONTROL AEROPUERTO PRINCIPAL ==========================================
#Buscar acta de control de aeropuerto principal segun parametros
@login_required(login_url = '/login')
def data_ParamActaControlAeropuerto(request):
	print_log("************data_ParamActaControlAeropuerto****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"cincontrolaeropuerto_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar acta de control de aeropuerto principal segun id
@login_required(login_url = '/login')
def editActaControlAeropuerto(request):
	print_log("************editActaControlAeropuertoRecorridos****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cincontrolaeropuerto_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar registros de guias segun el id del acta de control de aeropuerto principal
@login_required(login_url = '/login')
def editActaControlAeropuertoGuias(request):
	print_log("************editActaControlAeropuertoRecorridos****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cincontrolaeropuertoguias_list","?controlaerop_id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar registros de muestras segun el id de acta de control de aeropuerto principal
@login_required(login_url = '/login')
def editActaControlAeropuertoMuestras(request):
	print_log("************editActaControlAeropuertoMuestras****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cincontrolaeropuertomuestras_list","?controlaerop_id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar registros de vuelos segun el id de acta de control de aeropuerto principal
@login_required(login_url = '/login')
def editActaControlAeropuertoVuelos(request):
	print_log("************editActaControlAeropuertoVuelos****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cincontrolaeropuertovuelos_list","?controlaerop_id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")
#=========================================================================================================

#================================== CONTROL AEROPUERTO IGUANAS ===========================================
#Buscar acta de control de aeropuerto-iguanas segun parametros
@login_required(login_url = '/login')
def data_ParamActaControlAeropuertoIguanas(request):
	print_log("************data_ParamActaControlAeropuertoIguanas****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"cincontrolaeropuertoiguanas_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar acta de control de aeropuerto-iguanas segun el id
@login_required(login_url = '/login')
def editActaControlAeropuertoIguana(request):
	print_log("************editActaControlAeropuertoIguana****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cincontrolaeropuertoiguanas_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#=========================================================================================================

#=============================== CONTROL AEROPUERTO RECORRIDOS ===========================================
#Buscar acta de control aeropuerto-recorridos por parametros
@login_required(login_url = '/login')
def data_ParamActaControlAeropuertoRecorridos(request):
	print_log("************data_ParamActaControlAeropuertoRecorridos****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"cincontrolaeropuertorecorridos_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar acta de control aeropuerto-recorridos segun el id.
@login_required(login_url = '/login')
def editActaControlAeropuertoRecorridos(request):
	print_log("************editActaControlAeropuertoRecorridos****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cincontrolaeropuertorecorridos_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")
#=========================================================================================================


#======================================== VIEWS DATA POPUS  ==============================================

#Buscar guias turisticos segun parametros
@login_required(login_url = '/login')
def data_ParamGuia(request):
	print_log("************data_ParamGuia****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"licguia_short","?"+data+"")
	
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


#Buscar embarcaciones turisticas segun parametros
@login_required(login_url = '/login')
def data_ParamEmbarcacion(request):
	print_log("************data_ParamEmbarcacion****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"patpatente_list","?"+data+"")
	
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


#Buscar pasajeros segun parametros
@login_required(login_url = '/login')
def data_ParamPasajero(request):
	print_log("************data_ParamEmbarcacion****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"perpersona_list_label","?"+data+"")
	
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar sitios segun parametros
@login_required(login_url = '/login')
def data_ParamSitio(request):
	print_log("************data_ParamSitio****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"geositios_list","?"+data+"")
	
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar pescadores segun parametros
@login_required(login_url = '/login')
def data_ParamPescador(request):
	print_log("************data_ParamPescador****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"appfdtlicenciaparma_list","?"+data+"")
	
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar embarcaciones pesqueras segun parametros
@login_required(login_url = '/login')
def data_ParamEmbarcacionPesquera(request):
	print_log("************data_ParamEmbarcacionPesquera****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"appfdtpermisopesca_list","?"+data+"")
	
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar especies segun parametros
@login_required(login_url = '/login')
def data_ParamEspecie(request):
	print_log("************data_ParamEmbarcacionPesquera****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"bioespecie_list","?"+data+"")
	
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar hitos segun los parametros
@login_required(login_url = '/login')
def data_ParamHito(request):
	print_log("************data_ParamHito****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"cinhitos_list","?"+data+"")
	
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#Buscar catalogo de sitios - configuracion
@login_required(login_url = '/login')
def cin_config_sitios(request):
	print_log("****** sitios - catalago *******")
	obj = concat_url(request,"geositios_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	obj = concat_url(request,"siscatalogo_list","?categoria=CIN_MODULO_SITIO")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()
	
	context = {
		'sitios': response1["results"],
		'modulos': response2["results"],
	}

	return render(request, 'configuracion/config_sitios.html', context)


