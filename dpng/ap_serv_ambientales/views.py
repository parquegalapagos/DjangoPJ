# Django
from django.db.models import Q

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

import requests
import json
import os
import re


from django.core.files.base import ContentFile

from ap_base.views import insert_General,update_General,delete_General,concat_url,get_organigrama_position
from ap_serv_ambientales.models import *
from ap_base.models import *
# Django Filters
from django_filters import rest_framework as filters

from datetime import date

#FILES UPLOAD
from django.core.files.storage import FileSystemStorage

# Create your views here.
@login_required(login_url = '/login')
def menu_bsa(request):
	return render(request, 'serv_ambientales/menu_lateral.html')


#bsa 
@login_required(login_url = '/login')
def trpVehiculoList(request):
	return render(request, 'configuracion/vehiculo.html')

@login_required(login_url = '/login')
def trpVehiculoTipoList(request):
	return render(request, 'configuracion/vehiculotipo.html')

@login_required(login_url = '/login')
def trpTipoUsuarioList(request):
	return render(request, 'configuracion/tipousuario.html')

@login_required(login_url = '/login')
def BsaParametrosConfigList(request):
	return render(request, 'configuracion/bsaparametrosconfig.html')

@login_required(login_url = '/login')
def trpInfoCampo(request):
	obj = concat_url(request,"bsaparametrosconfig_list","?categoria=REP_CAMPO")
	response = requests.get(obj["url"], headers=obj["headers"]).json()

	obj1 = concat_url(request,"bsainformecampo_list","")
	response1 = requests.get(obj1["url"], headers=obj1["headers"]).json()

	obj2 = concat_url(request,"geositios_list","")
	response2 = requests.get(obj2["url"], headers=obj["headers"]).json()

	obj3 = concat_url(request,"trpvehiculo_list","?institucion=DPNG")
	response3 = requests.get(obj3["url"], headers=obj3["headers"]).json()

	obj4 = concat_url(request,"dirdepartment_list","?tipo__in=PRC")
	response4 = requests.get(obj4["url"], headers=obj4["headers"]).json()

	context = {
		'sitios': response2["results"],
	    'parametros': response["results"],
	    'informes': response1["results"],
	    'vehiculos': response3["results"],
	    'procesos': response4["results"],
    }

	return render(request, 'serv_ambientales/infcampo.html',context)

@login_required(login_url = '/login')
def trpInfoNovedad(request):
	obj = concat_url(request,"bsaparametrosconfig_list","?categoria=REP_CAMPO")
	response = requests.get(obj["url"], headers=obj["headers"]).json()

	obj2 = concat_url(request,"geositios_list","")
	response2 = requests.get(obj2["url"], headers=obj["headers"]).json()

	obj4 = concat_url(request,"dirdepartment_list","?tipo__in=PRC")
	response4 = requests.get(obj4["url"], headers=obj4["headers"]).json()

	context = {
		'sitios': response2["results"],
	    'parametros': response["results"],
	    'isla_trabaja_id': request.session['isla_trabaja_id'],
	    'procesos': response4["results"],
    }

	return render(request, 'serv_ambientales/infnovedades.html',context)

@login_required(login_url = '/login')
def trpInfoTecnico(request):
	obj = concat_url(request,"perfuncionario_list","?proceso_estatuto_id__id=PRC_CREI")
	response = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		'funcionarios': response["results"],
		'isla_trabaja_id': request.session['isla_trabaja_id'],
    }

	return render(request, 'serv_ambientales/infpetreos.html',context)

@login_required(login_url = '/login')
def sptMpetreoList(request):

	obj2 = concat_url(request,"trptipousuario_list","")
	response2 = requests.get(obj2["url"], headers=obj2["headers"]).json()

	obj3 = concat_url(request,"trpvehiculotipo_list","")
	response3 = requests.get(obj3["url"], headers=obj3["headers"]).json()

	obj = concat_url(request,"geositios_list","?modulo__in=5")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
	    'sitios': response1["results"],
		'tusuarios': response2["results"],
		'tvehiculos': response3["results"],
    }

	return render(request, 'serv_ambientales/mpetreos.html',context)


#buscar datos de personas segun el parametro ingresado
@login_required(login_url = '/login')
def vehiculo_data(request):
	print("************vehiculo_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"trpvehiculo_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_vehiculoParam(request):
	print("************data_vehiculoParam****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"trpvehiculo_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def vehiculotipo_data(request):
	print("************vehiculotipo_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"trpvehiculotipo_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_vehiculotipoParam(request):
	print("************data_vehiculotipoParam****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"trpvehiculotipo_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#servicios ambientales
#buscar datos de personas segun el parametro ingresado
@login_required(login_url = '/login')
def data_vehiculosXpersona(request):
	print("************data_vehiculosXpersona****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"trppersonavehiculo_list","?persona_id__id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def tipousuario_data(request):
	print("************tipousuario_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"trptipousuario_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def data_tipousuarioParam(request):
	print("************data_tipousuarioParam****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"trptipousuario_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de personas segun el parametro ingresado
@login_required(login_url = '/login')
def controlMaterial_data(request):
	print("************controlMaterial_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"trpcontrolmaterialpetreo_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de personas segun el parametro ingresado
@login_required(login_url = '/login')
def controlMaterialDetalle_data(request):
	print("************controlMaterial_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"trpcontrolmaterialpetreodetalle_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_controlMaterialDetalleParam(request):
	print("************data_controlMaterialParam****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"trpcontrolmaterialpetreodetalle_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_controlMaterialParam(request):
	print("************data_controlMaterialParam****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"trpcontrolmaterialpetreo_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def bsaparametrosconfig_data(request):
	print("************bsaparametrosconfig_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"bsaparametrosconfig_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_bsaparametrosconfigParam(request):
	print("************data_bsaparametrosconfigParam****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"bsaparametrosconfig_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_infoCampoCab(request):
	print("************data_infoCampoCab****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"bsainformecampo_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def data_infoCampoCabParam(request):
	print("************data_infoCampoCab****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"bsainformecampo_list","?"+data+"")

	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def infoTecGestPet_data(request):
	print("************infoTecGestPet_data****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"bsainformetecnico_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def data_infoTecGestPetParam(request):
	print("************data_infoTecGestPetParam****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"bsainformetecnico_list","?"+data+"")

	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def upload_files_json_informe(request):
	print("***** upload_files_json ******")

	file_name = request.POST['file_name']
	file_path = request.POST['file_path']
	filename=""
	result = {} 
	cont = 0
	ruta = file_path

	if request.method == 'POST' and request.FILES['myfile']:

		for myfile in request.FILES.getlist('myfile'):

			fs = FileSystemStorage(location=ruta)
			#fs.remove(myfile.name, myfile)
			my_new_string = re.sub('[^a-zA-Z0-9 \n\.]', '', myfile.name)
			filename = fs.save(my_new_string, myfile)
			uploaded_file_url = fs.url(filename)

		return HttpResponse(filename)

	return HttpResponse("ERROR")


@login_required(login_url = '/login')
def delete_files_informe(request):
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


#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_infoNovedadesCab(request):
	print("************data_infoNovedadesCab****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"bsainformenovedades_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def data_infoNovedadesCabParam(request):
	print("************data_infoNovedadesCabParam****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"bsainformenovedades_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def data_secinfoNovedadesCab(request):
	print("************data_secinfoNovedadesCab****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"bsainformenovedades_list","?field=numero&isla_usuario_ingreso_id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def data_secinfoCampoCab(request):
	print("************data_secinfoCampoCab****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"bsainformecampo_list","?field=numero&isla_usuario_ingreso_id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


@login_required(login_url = '/login')
def update_General_bsa(request):
    print("----------> update_General_bsa")

    dj_url = request.POST.get('dj_url') #URL Django
    body = json.loads(request.POST.get('data')) #Body del JSON.
    idtabla = request.POST.get('idtabla') #URL Django
    obj = concat_url(request,dj_url,idtabla)
    print(obj)
    response = requests.request("PUT", obj["url"], json=json.loads(body), headers=obj["headers"])
    #print("----------> update_General response")   
    return HttpResponse(response)


@login_required(login_url = '/login')
def insert_General_bsa(request):
    print("----------> insert_General_bsa")
    dj_url = request.POST.get('dj_url') #URL Django
    obj = concat_url(request,dj_url,"")
    body = json.loads(request.POST.get('data').replace('\r', '\\r').replace('\n', '\\n'), strict=False)
    response = requests.request("POST", obj["url"], json=json.loads(body), headers=obj["headers"])   
    return HttpResponse(response)


@login_required(login_url = '/login')
def data_subprocesoXproc(request):
	print("************data_subprocesoXproc****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"dirdepartment_list","?parentid__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def datasecuencia_InformeTecGestPetST(request):
	print("************data_subprocesoXproc****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"sissecuencia_list","?codigo__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")