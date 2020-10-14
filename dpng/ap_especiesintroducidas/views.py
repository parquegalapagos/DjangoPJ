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

#app base
from ap_base.views import concat_url,print_log

PRIVATE_API = getattr(settings, "PRIVATE_API", None)

@login_required(login_url = '/login')
def menu_espintro(request):
	
	context = {
		'foto_perfil' : request.session['foto_perfil']
	}
	return render(request, 'especiesintro/menu_lateral.html',context)


@login_required(login_url = '/login')
def espintroducidas(request):
	
	obj = concat_url(request,"bioespecie_list","?categoria__in=8")
	response = requests.get(obj["url"], headers=obj["headers"]).json()

	obj1 = concat_url(request,"geoislas_list","?es_poblada__in=true")
	response1 = requests.get(obj1["url"], headers=obj1["headers"]).json()

	obj2 = concat_url(request,"geositios_list","?modulo__in=2")
	response2 = requests.get(obj2["url"], headers=obj2["headers"]).json()

	obj3 = concat_url(request,"perfuncionario_list","?proceso_estatuto_id__id=PRC_CREI")
	response3 = requests.get(obj3["url"], headers=obj3["headers"]).json()

	context = {
		'especies': response["results"],
		'funcionarios': response3["results"],
		'islas': response1["results"],
		'sitios': response2["results"],
		'isla_id': request.session['isla_trabaja_id'],
	}
	return render(request, 'especiesintro/espintroducidas.html' , context)

########################################################introducidas########################################################
@login_required(login_url = '/login')
def data_especieintrocab(request):
	print_log("************data_especieintrocab****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spiespeciesintroducidas_list","?"+data+"")
	
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


########################################################introducidas########################################################
@login_required(login_url = '/login')
def data_infoCabEspIntro(request):
	print_log("************data_infoCabEspIntro****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spiespeciesintroducidas_list","?id="+data+"")
	
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


########################################################introducidas########################################################
@login_required(login_url = '/login')
def data_sitioXisla(request):
	print_log("************data_sitioXisla****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"geositios_list","?isla_id__in="+data+"")
	
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def data_metodoXespecie(request):
	print_log("************data_metodoXespecie****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spimetodocontrolespecies_list","?especie_id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")
