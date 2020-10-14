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
from ap_base.models import *

#FILES UPLOAD
from django.core.files.storage import FileSystemStorage


@login_required(login_url = '/login')
def menu_cuso_controlmarino(request):
	print_log("****** menu_cuso_controlmarino *******")
	
	obj2 = concat_url(request,"geositios_list","")
	response2 = requests.get(obj2["url"], headers=obj2["headers"]).json()

	obj3 = concat_url(request,"geositios_list","?descripcion___icontains='PUERTO'")
	response3 = requests.get(obj3["url"], headers=obj3["headers"]).json()

	context= {
		'foto_perfil' : request.session['foto_perfil'],
		'sitios': response2["results"],
		'puertos': response3["results"]
	}

	return render(request, 'cuso_controlmarino/menu_lateral.html')

@login_required(login_url = '/login')
def Cuso_acta_avistamineto(request):
	print_log("****** Cuso_acta_avistamineto111111111 *******")

	obj = concat_url(request,"siscatalogo_list","?categoria=PRG_ACTA_VISITA_CUSO")
	response = requests.get(obj["url"], headers=obj["headers"]).json()
	print_log("****** 2222 *******")
	obj1 = concat_url(request,"geositios_list","")
	response1 = requests.get(obj1["url"], headers=obj1["headers"]).json()
	print_log("****** 33333 *******")
	obj2 = concat_url(request,"geositios_list","?descripcion__icontains=PUERTO")
	response2 = requests.get(obj2["url"], headers=obj2["headers"]).json()
	print_log("****** 44444444 *******")
	context = {
        'preguntas': response["results"],
        #'cprocesos': response16["results"],
		'sitios1': response1["results"],
		'puertos1': response2["results"],
    }

	return render(request, 'cuso_controlmarino/acta_visita_cuso.html',context)

@login_required(login_url = '/login')
def Cuso_acta_inspeccion(request):
	print_log("****** Cuso_acta_inspeccion *******")

	obj = concat_url(request,"siscatalogo_list","?categoria=PRG_ACTA_INSPEC_EMBAR_TURIS_CUSO")
	response = requests.get(obj["url"], headers=obj["headers"]).json()

	obj1 = concat_url(request,"geositios_list","")
	response1 = requests.get(obj1["url"], headers=obj1["headers"]).json()

	obj2 = concat_url(request,"geositios_list","?descripcion__icontains=PUERTO")
	response2 = requests.get(obj2["url"], headers=obj2["headers"]).json()

	context = {
        'preguntas': response["results"],
        #'cprocesos': response16["results"],
		'sitios': response1["results"],
		'puertos': response2["results"],
    }

	return render(request, 'cuso_controlmarino/acta_inspec_cuso.html',context)

@login_required(login_url = '/login')
def Cuso_info_novedades(request):

	obj1 = concat_url(request,"geoislas_list","?clasificacion__in=P&es_poblada__in=true")
	response1 = requests.get(obj1["url"], headers=obj1["headers"]).json()

	obj2 = concat_url(request,"geositios_list","")
	response2 = requests.get(obj2["url"], headers=obj2["headers"]).json()

	obj3 = concat_url(request,"trpvehiculo_list","?institucion=DPNG")
	response3 = requests.get(obj3["url"], headers=obj3["headers"]).json()

	obj4 = concat_url(request,"cmnembarcacionespatrulla_list","")
	response4 = requests.get(obj4["url"], headers=obj4["headers"]).json()

	obj5 = concat_url(request,"sisparametrosconfig_list","?categoria=INF_NOVEDADES_CUSO")
	response5 = requests.get(obj5["url"], headers=obj5["headers"]).json()

	obj6 = concat_url(request,"siscatalogo_list","?categoria=ACTIVIDAD_INFO_NOVEDADES_CUSO")
	response6 = requests.get(obj6["url"], headers=obj6["headers"]).json()

	context = {
		'actividades': response6["results"],
		'parametros': response5["results"],
		'embarcaciones': response4["results"],
		'vehiculos': response3["results"],
        'islas': response1["results"],
        'sitios': response2["results"],
    }

	return render(request, 'cuso_controlmarino/infonovedades.html',context)

@login_required(login_url = '/login')
def Cuso_info_monitoreo(request):

	obj5 = concat_url(request,"sisparametrosconfig_list","?categoria=INF_MONITOREO_CUSO")
	response5 = requests.get(obj5["url"], headers=obj5["headers"]).json()

	context = {
		'funcionario_id' : request.session['funcionario_id'],
		'persona_nombres' : request.session['persona_nombres'],
		'parametros': response5["results"],
	 }

	return render(request, 'cuso_controlmarino/infomonitoreos.html',context)

@login_required(login_url = '/login')
def Cuso_info_diario(request):

	obj5 = concat_url(request,"siscatalogo_list","?categoria=SISTEMAS_CUSO")
	response5 = requests.get(obj5["url"], headers=obj5["headers"]).json()

	obj4 = concat_url(request,"siscatalogo_list","?categoria=ESTADO_SISTEMAS_CUSO")
	response4 = requests.get(obj4["url"], headers=obj4["headers"]).json()

	obj = concat_url(request,"tprembarcacionactividad_list","")
	response = requests.get(obj["url"], headers=obj["headers"]).json()

	obj3 = concat_url(request,"cmncamaras_list","")
	response3 = requests.get(obj3["url"], headers=obj3["headers"]).json()

	obj2 = concat_url(request,"sisparametrosconfig_list","?categoria=CAMARA_CUSO")
	response2 = requests.get(obj2["url"], headers=obj2["headers"]).json()

	obj1 = concat_url(request,"geositios_list","")
	response1 = requests.get(obj1["url"], headers=obj1["headers"]).json()

	obj6 = concat_url(request,"siscatalogo_list","?categoria=ACTIVIDAD_EMBARCACION_CUSO")
	response6 = requests.get(obj6["url"], headers=obj6["headers"]).json()

	context = {
		'funcionario_id' : request.session['funcionario_id'],
		'persona_nombres' : request.session['persona_nombres'],
		'isla_trabaja_id': request.session['isla_trabaja_id'],
		'sistemas': response5["results"],
		'estados': response4["results"],
		'tipos_act': response["results"],
		'camaras': response3["results"],
		'preguntas': response2["results"],
		'sitios': response1["results"],
		'actividades': response6["results"],
	}

	return render(request, 'cuso_controlmarino/infodiario.html',context)

@login_required(login_url = '/login')
def Cuso_plan_patrulla(request):

	obj5 = concat_url(request,"sisparametrosconfig_list","?categoria=PLAN_PATRULLA_CUSO")
	response5 = requests.get(obj5["url"], headers=obj5["headers"]).json()

	context = {
		'funcionario_id' : request.session['funcionario_id'],
		'persona_nombres' : request.session['persona_nombres'],
		'parametros': response5["results"],
	 }

	return render(request, 'cuso_controlmarino/planpatrulla.html',context)




@login_required(login_url = '/login')
def Cuso_controlpersonal(request):
	context = {
		'funcionario_id' : request.session['funcionario_id'],
		'persona_nombres' : request.session['persona_nombres'],	
	 }

	return render(request, 'cuso_controlmarino/cro_controlmarino.html',context)

@login_required(login_url = '/login')
def Cuso_acta_retencion(request):

	obj2 = concat_url(request,"cmnproductosretencion_list","")
	response2 = requests.get(obj2["url"], headers=obj2["headers"]).json()

	context = {
        'productos': response2["results"],
    }

	return render(request, 'cuso_controlmarino/acta_retencion.html',context)


#cargar pagina reporte de tramites
@login_required(login_url = '/login')
def data_actavisitaParam(request):
	print_log("************data_actavisitaParam****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cmnactavisitainspecembpesca_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def actavisita_data(request):
	print("************actavisita_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cmnactavisitainspecembpesca_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")



#cargar pagina reporte de tramites
@login_required(login_url = '/login')
def data_actainspecParam(request):
	print_log("************data_actainspecParam****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cmnactainspecembturis_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def actainspec_data(request):
	print("************actainspec_data****************************")
	data = request.POST.get('data')
	obj = concat_url(request,"cmnactainspecembturis_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def update_General_post(request):
    print("----------> update_General")

    dj_url = request.POST.get('dj_url') #URL Django
    body = json.loads(request.POST.get('data')) #Body del JSON.
    idtabla = request.POST.get('idtabla') #URL Django
    obj = concat_url(request,dj_url,idtabla)
    print(obj)
    response = requests.request("PUT", obj["url"], json=json.loads(body), headers=obj["headers"])
    #print("----------> update_General response")
    
    return HttpResponse(response)

#CRUD GENERAL
@login_required(login_url = '/login')
def insert_General_post(request):
	print("----------> insert_General")

	dj_url = request.POST.get('dj_url')
	obj = concat_url(request,dj_url,"")
	body = json.loads(request.POST.get('data').replace('\r', '\\r').replace('\n', '\\n'), strict=False)
	print(body)
	response = requests.request("POST", obj["url"], json=json.loads(body), headers=obj["headers"])
	return HttpResponse(response)


#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_infoNovedadesCabCuso(request):
	print("************data_infoNovedadesCab****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cmninformenovedades_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def data_infoNovedadesCabParamCuso(request):
	print("************data_infoNovedadesCabParam****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"cmninformenovedades_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_infoMonitoreoCabCuso(request):
	print("************data_infoMonitoreoCabCuso****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cmninformemonitoreo_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def data_infoMonitoreoCabParamCuso(request):
	print("************data_infoMonitoreoCabParamCuso****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"cmninformemonitoreo_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def get_lista_embPat(request):
	print("************get_lista_embPat****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"cmnembarcacionespatrulla_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_planpatrullaCabCuso(request):
	print("************data_planpatrullaCabCuso****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cmnplanpatrulla_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def data_planpatrullaCabParamCuso(request):
	print("************data_planpatrullaCabParamCuso****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"cmnplanpatrulla_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")



#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_actaretencionCabCuso(request):
	print("************data_infoNovedadesCab****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cmnactaretencion_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def data_actaretencionCabParamCuso(request):
	print("************data_actaretencionCabParamCuso****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"cmnactaretencion_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def data_funcionariosactividades(request):
	print("************data_funcionariosactividades****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"cmnactividadfuncionariosdias_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def data_diasfuncionariosactividades(request):
	print("************data_diasfuncionariosactividades****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"cmndiasactividadfuncionarios_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def data_parametrosconfig(request):
	print("************data_parametrosconfig****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"sisparametrosconfig_list","?categoria=CRONOGRAMA_CUSO")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def data_controlpersonal(request):
	print("************data_controlpersonal****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"cmncontrolpersonal_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def data_diasfuncionariosCm(request):
	print("************data_diasfuncionariosactividades****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"cmncontrolpersonal_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def data_actividadescronogramaCm(request):
	print("************data_diasfuncionariosactividades****************************")
	obj = concat_url(request,"siscatalogo_list","?categoria__in=ACTIVIDADES_CM_CRONOGRAMA_ACT,ACTIVIDADES_APOYO_CM_CRONOGRAMA_ACT,DIAS_CM_CRONOGRAMA_ACT,RECURSOS_PUESTOS_CONTROL_CM_CRONOGRAMA_ACT")
	response = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response["results"]), content_type="application/json")


@login_required(login_url = '/login')
def data_secinfoDiarioCab(request):
	print("************data_secinfoDiarioCab****************************")
	#data = request.GET.get('data')
	obj = concat_url(request,"cmncmonitreportediario","?field=num_reporte")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def data_infoDiarioCab(request):
	print("************data_infoDiarioCab****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"cmncmonitreportediario_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def data_infoDiarioCabParamCuso(request):
	print("************data_infoDiarioCabParamCuso****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"cmncmonitreportediario_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def data_secinfoDiarioCab(request):
	print("************data_secinfoDiarioCab****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"cmncmonitreportediario_list","?field=num_reporte&isla_usuario_ingreso_id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")