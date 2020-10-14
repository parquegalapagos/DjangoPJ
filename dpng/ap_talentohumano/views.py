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
from django.core.files.base import ContentFile

from ap_base.views import insert_General,update_General,delete_General,concat_url,get_organigrama_position,print_log
from ap_talentohumano.models import *
from ap_base.models import *
# Django Filters
from django_filters import rest_framework as filters

from datetime import date

from django.utils.decorators import method_decorator

# PDF
"""
from django.views.generic import View
from ap_talentohumano.utils import render_to_pdf #created in step 4
from xhtml2pdf import pisa
try:  # python2 and python3
    from .utils import extract_request_variables
except:
    from utils import extract_request_variables

from django.template.loader import get_template
"""


# Constantes
# PRIVATE_API = getattr(settings, "PRIVATE_API", None)
RESPONSABLE_TALENTOHUMANO_ID = "95c36f5d-1c1c-46ce-8c6f-017b54c6e131" #gth_cargo_institucional
RESPONSABLE_FINANCIERO_ID = "54ae661c-bf0a-11e6-ad71-000c29e38a2f" #gth_cargo_institucional



from django import template

register = template.Library()

@register.filter(name='split')
def split(value, key):
  """
    Returns the value turned into a list.
  """
  return value.split(key)

#cargar info al momento de llamar a la pagina del menu
@login_required(login_url = '/login')
def menu_talentohumano(request):

	menu_accion_personal = menu_encargos = menu_ingresos = menu_licencias = menu_personaldpng = False
	menu_traslados = menu_sancion = menu_control_asistencia = False
	menu_permisos = menu_permisos_revisor = menu_permisos_aprobador = menu_carnetizacion = menu_configuracion = False

	
	obj = concat_url(request,"gthcargofuncional_list","?field=id&field=nombre")
	response14 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"gthmodalidadlaboral_list","?field=id&field=nombre")
	response15 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"dirclasificacionproceso_list","?field=id&field=nombre")
	response16 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"geoislas_list","?field=id&field=descripcion&field=canton_id&es_poblada__in=true&tipo_isla__in=I")
	response17 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"geoparroquia_list","?canton_id__in=540e8376-bc9a-11e6-ab89-000c29e38a2f,4d1e1d38-bc9a-11e6-ab89-000c29e38a2f,4655a6b0-bc9a-11e6-ab89-000c29e38a2f")
	response18 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"geocanton_list","?field=id&field=nombre&field=provincia_id")#**********
	response5 = requests.get(obj["url"], headers=obj["headers"]).json()

	# CARGA DATOS INICIALES
	obj = concat_url(request,"orgorganizacionbanco_list","?field=id&field=nombre_comercial")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"siscatalogo_list","?field=id&field=label&field=valor&field=categoria")
	response3 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"gthsanciones_list","?field=id&field=descripcion&field=tipo_id")
	response4 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"dirdepartment_list","?tipo__in=DIR,PRC,SPC")
	response9 = requests.get(obj["url"], headers=obj["headers"]).json()


	request.session['menu_permisos_revisor'] = False
	request.session['menu_permisos_aprobador'] = False

	for group in request.user.groups.all():
		if group.id == 1 or group.id == 2 or group.id == 3 or group.id == 4:
			menu_permisos = True

			if group.id == 3:
				menu_permisos_revisor = True
				request.session['menu_permisos_revisor'] = True
			if group.id == 4:
				menu_permisos_aprobador = True
				request.session['menu_permisos_aprobador'] = True

		if group.id == 5 or group.id == 6 or group.id == 7:
			menu_accion_personal = True

		if group.id == 8:
			menu_configuracion = True

		if group.id == 9 or group.id == 10:
			menu_carnetizacion = True

		if group.id == 11:
			menu_encargos = True

		if group.id == 12 or group.id == 13:
			menu_ingresos = True
			
		if group.id == 14 or group.id == 15:
			menu_licencias = True	

		if group.id == 16 or group.id == 17:
			menu_personaldpng = True

		if group.id == 18:
			menu_traslados = True

		if group.id == 19 or group.id == 20:
			menu_sancion = True

		if group.id == 21 or group.id == 22:
			menu_control_asistencia = True


	context= {
		'cargos': response14["results"],
		'modalidades': response15["results"],
		'cprocesos': response16["results"],
		'islas': response17["results"],
		'parroquias': response18["results"],

		'menu_configuracion': menu_configuracion,
		'menu_carnetizacion': menu_carnetizacion,
		'menu_permisos': menu_permisos,
		'menu_permisos_revisor': menu_permisos_revisor,
		'menu_permisos_aprobador': menu_permisos_aprobador,
		'menu_accion_personal': menu_accion_personal,
		'menu_encargos': menu_encargos,
		'menu_ingresos': menu_ingresos,
		'menu_licencias': menu_licencias,
		'menu_personaldpng': menu_personaldpng,
		'menu_traslados': menu_traslados,
		'menu_sancion': menu_sancion,
		'menu_control_asistencia': menu_control_asistencia,
		'cantones': response5["results"],
		'bancos': response2["results"],
		'catalogos': response3["results"],
		'sanciones': response4["results"],
		'direcciones': response9["results"],
		'foto_perfil' : request.session['foto_perfil']	
		#'parroquias': response6["results"], 
		
	}

	return render(request, 'talentohumano/menu_lateral.html' , context)

#personas
#cargar info de  la pagina funcionarios
@login_required(login_url = '/login')
def SP_funcionarios(request):
	#obj = concat_url(request,"perfuncionario_list","")
	#response = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"geopais","?field=id&field=descripcion")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"geoprovincia_list","?pais_text_id=ECUADOR&field=id&field=descripcion&field=pais_text_id")
	response4 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"geocanton_list","?field=id&field=nombre&field=provincia_id")#**********
	response5 = requests.get(obj["url"], headers=obj["headers"]).json()

	#obj = concat_url(request,"geoparroquia_list","?field=id&field=nombre&field=canton_id")
	obj = concat_url(request,"geoparroquia_list","?canton_id__in=540e8376-bc9a-11e6-ab89-000c29e38a2f,4d1e1d38-bc9a-11e6-ab89-000c29e38a2f,4655a6b0-bc9a-11e6-ab89-000c29e38a2f")
	response6 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"perdiscapacidades","")
	response7 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"perenfermedades","")
	response8 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"peretnias","")
	response9 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"gthbasenombramiento_list","")
	response10 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"gthcargoocupacional_list","?field=id&field=nombre")
	response13 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"gthcargoinstitucional_list","?field=id&field=nombre")
	response11 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"gthcargodistributivo_list","?field=id&field=nombre")
	response12 = requests.get(obj["url"], headers=obj["headers"]).json()
	
	context= {
		#'personas': response["results"],
		'etnias': response9["results"],
		'paises': response2["results"],
		'provincias': response4["results"],
		'cantones': response5["results"],
		'parroquias': response6["results"],
		'discapacidades': response7["results"],
		'enfermedades': response8["results"],
		'bases': response10["results"],
		'gocupacionals': response13["results"],
		'ginstitucionals': response11["results"],
		'gdistributivos': response12["results"],
	}
	return render(request, 'talentohumano/SP_funcionarios.html', context)

#buscar datos del funcionario segun el parametro ingresado
@login_required(login_url = '/login')
def funcionario_data(request):
	print_log("************funcionario_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"perfuncionario_list","?search="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

@login_required(login_url = '/login')
def funcionario_data2(request,data):
	print_log("************funcionario_data aux****************************")
	#data = request.GET.get('data')
	obj = concat_url(request,"perfuncionario_list","?search="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	#print(response1["results"][0].id)
	return(response1["results"])

#buscar datos de personas segun el parametro ingresado
@login_required(login_url = '/login')
def persona_data_2(request,data):
	print_log("************persona_data aux****************************")
	#data = request.GET.get('data')
	obj = concat_url(request,"perpersona_fun_list","?search="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return(response1["results"])


#buscar datos del funcionario segun los parametros ingresados
@login_required(login_url = '/login')
def data_funcionarioParam(request):
	print_log("************data_funcionarioParam****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"perfuncionariodata_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de personas segun el parametro ingresado
@login_required(login_url = '/login')
def persona_data(request):
	print_log("************persona_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"perpersona_fun_list","?search="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar info de la pagina de accion personal
@login_required(login_url = '/logout')
def SP_accPersonal(request):

	print_log("************accPersonal****************************")

	es_responsable = es_root = False

	for group in request.user.groups.all():
		if group.id == 6: # UATH - ACCION PERSONAL - RESPONSABLE
			es_responsable = True
			break

	if request.user.is_superuser:
		obj = concat_url(request,"perfuncionarioaccionpersonal_list","")
		es_root = True
		
	elif es_responsable:
		obj = concat_url(request,"perfuncionarioaccionpersonal_list","")
		print_log("es responsable!")

	
	obj2 = concat_url(request,"gthaccionpersonal_list","")
	response2 = requests.get(obj2["url"], headers=obj2["headers"]).json()
	obj3 = concat_url(request,"perfuncionario_list","?proceso_estatuto_id__id=PRC_GTH&field=id&field=persona_id") #RESPONSABLE DE GESTIÓN DE TALENTO HUMANO 
	response3 = requests.get(obj3["url"], headers=obj3["headers"]).json()
	obj4 = concat_url(request,"perfuncionario_list","?direccion_estatuto_id__id=DIR_DAF&field=id&field=persona_id") # DIRECTOR ADMINISTRATIVO FINANCIERO
	response4 = requests.get(obj4["url"], headers=obj4["headers"]).json()

	isla_trabaja_user = request.session['isla_trabaja_nm']
	isla_trabaja_user_id = request.session['isla_trabaja_id']

	obj = concat_url(request,"gthcargoocupacional_list","?field=id&field=nombre&field=nombre_corto")
	response10 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"gthcargoinstitucional_list","?field=id&field=nombre")
	response11 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"gthcargodistributivo_list","?field=id&field=nombre")
	response12 = requests.get(obj["url"], headers=obj["headers"]).json()


	obj13 = concat_url(request,"perfuncionario_selectbox","?cargo_institucional_id__id="+RESPONSABLE_TALENTOHUMANO_ID+"&field=id") #RESPONSABLE DE GESTIÓN DE TALENTO HUMANO 
	response13 = requests.get(obj13["url"], headers=obj13["headers"]).json()
	obj14 = concat_url(request,"perfuncionario_selectbox","?cargo_institucional_id__id="+RESPONSABLE_FINANCIERO_ID+"&field=id") # DIRECTOR ADMINISTRATIVO FINANCIERO
	response14 = requests.get(obj14["url"], headers=obj14["headers"]).json()

	if response13["results"] == []:
		rrhhresps_default = ""
	else:
		rrhhresps_default = response13["results"][0]["id"]

	if response14["results"] == []:
		aut_nominadoras_default = ""
	else:
		aut_nominadoras_default = response14["results"][0]["id"]

	context = {
		#'acciones': response1["results"],
		'items': response2["results"],
		'rrhhresps': response3["results"],
		'aut_nominadoras': response4["results"],
		'rrhhresps_default': rrhhresps_default,
		'aut_nominadoras_default': aut_nominadoras_default,
		'isla_trabaja_user': isla_trabaja_user,
		'isla_trabaja_user_id': isla_trabaja_user_id,
		#'funcionarios': response4["results"],
		'es_responsable': es_responsable,
		'es_root': es_root,
		'gocupacionals': response10["results"],
		'ginstitucionals': response11["results"],
		'gdistributivos': response12["results"],
	}
	return render(request, 'talentohumano/SP_accPersonal.html' , context)

#buscar datos de accion de personal segun el id ingreado
@login_required(login_url = '/login')
def data_accionPer(request):
	print_log("************persona_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"perfuncionarioaccionpersonal_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de accion de personal segun los parametros ingresados
@login_required(login_url = '/login')
def data_accionesParam(request):
	print_log("************data_accionesParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"perfuncionarioaccionpersonal_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar datos de gthaccionpersonal
@login_required(login_url = '/login')
def data_itemPerFuncionarioAccionPer(request):
	print_log("************data_itemPerFuncionarioAccionPer****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"perfuncionarioaccionpersonal_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar info de pagina de sanciones
@login_required(login_url = '/login')
def SP_sanciones(request):
	print_log("************SP_sanciones****************************") 
	#obj = concat_url(request,"perfuncionariosanciones_list","")
	#response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj1 = concat_url(request,"gthregimenlaboral_list","?field=id&field=descripcion")
	response5 = requests.get(obj1["url"], headers=obj1["headers"]).json()

	context = {
		#'fsanciones': response1["results"],
		'regimens': response5["results"],
	}
	return render(request, 'talentohumano/SP_sanciones.html' , context)

#buscar sanciones x id
@login_required(login_url = '/login')
def data_sanciones(request):
	print_log("************data_sanciones****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"perfuncionariosanciones_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar sanciones x parametros
@login_required(login_url = '/login')
def data_sancionesParam(request):
	print_log("************data_sancionesParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"perfuncionariosanciones_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar info de pagina de licencias
@login_required(login_url = '/login')
def SP_licencias(request):
	print_log("************SP_licencias****************************")
	context = {
	}
	return render(request, 'talentohumano/SP_licencias.html', context)

#buscar licencias x id
@login_required(login_url = '/login')
def data_licencias(request):
	print_log("************persona_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"PerFuncionarioAccionpersonal_licencias","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar licencias x parametros
@login_required(login_url = '/login')
def data_licenciasParam(request):
	print_log("************data_licenciasParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"PerFuncionarioAccionpersonal_licencias","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar info de pagina de encargos
@login_required(login_url = '/login')
def SP_encargos(request):
	print_log("************SP_licencias****************************")

	obj = concat_url(request,"gthcargoocupacional_list","?field=id&field=nombre")
	response10 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"gthcargoinstitucional_list","?field=id&field=nombre")
	response11 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		#'acciones': response1["results"],
		'gocupacionals': response10["results"],
		'ginstitucionals': response11["results"],
	}
	return render(request, 'talentohumano/SP_encargos.html', context)

#buscar traslados x id
@login_required(login_url = '/login')
def data_itemAccionPer(request):
	print_log("************data_trasladosParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"PerFuncionarioAccionpersonal_traspasos","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar encargos x id
@login_required(login_url = '/login')
def data_encargos(request):
	print_log("************persona_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"PerFuncionarioAccionpersonal_encargos","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar encargos x parametros
@login_required(login_url = '/login')
def data_encargosParam(request):
	print_log("************data_accionesParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"PerFuncionarioAccionpersonal_encargos","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar info de pagina de traspasos
@login_required(login_url = '/login')
def SP_traslados(request):
	print_log("************SP_traslados****************************")
	obj = concat_url(request,"gthcargoocupacional_list","?field=id&field=nombre")
	response10 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"gthcargoinstitucional_list","?field=id&field=nombre")
	response11 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		#'acciones': response1["results"],
		'gocupacionals': response10["results"],
		'ginstitucionals': response11["results"],
	}
	return render(request, 'talentohumano/SP_traslados.html' , context)

#buscar traspasos x id
@login_required(login_url = '/login')
def data_traslados(request):
	print_log("************data_traslados****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"PerFuncionarioAccionpersonal_traspasos","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar traspasos x parametros
@login_required(login_url = '/login')
def data_trasladosParam(request):
	print_log("************data_trasladosParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"PerFuncionarioAccionpersonal_traspasos","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar historial traspasos
@login_required(login_url = '/login')
def historial_traspasos(request):
	print_log("************data_traslados****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"PerFuncionarioAccionpersonal_traspasos","?funcionario_id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#ingresos
#cargar info pagina ingresos
@login_required(login_url = '/login')
def SP_ingresos(request):
	print_log("************SP_ingresos****************************")
	#obj = concat_url(request,"PerFuncionarioAccionpersonal_ingresos","")
	#response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"gthbasenombramiento_list","")
	response9 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"gthcargoocupacional_list","?field=id&field=nombre")
	response10 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"gthcargoinstitucional_list","?field=id&field=nombre")
	response11 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"gthcargodistributivo_list","?field=id&field=nombre")
	response12 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		#'ingresos': response1["results"],
		'bases': response9["results"],
		'gocupacionals': response10["results"],
		'ginstitucionals': response11["results"],
		'gdistributivos': response12["results"],
	}
	return render(request, 'talentohumano/SP_ingresos.html', context)

@login_required(login_url = '/login')
def TP_AccionIngreso(request):
	today = date.today()
	items = PerFuncionarioAccionpersonal.objects.all().filter(Q(estado='A'),Q(eliminado='f'),Q(accionpersonal_id='2b6be56b-aef5-4eef-8a31-9090d7fb8d66'),Q(estado_ejecucion='C')|Q(estado_ejecucion='A'),Q(fecha_rige_accpersonal__lte=today))
	print_log("*************************************************************************")
	print_log(today)

	for e in items:
		
		obj = PerFuncionario.objects.get(pk=e.funcionario_id.id)
		
		if e.nuevo_isla_trabaja_id != None:
			isla_obj  = GeoIsla(id=e.nuevo_isla_trabaja_id)
			obj.isla_trabaja_id = isla_obj
		else:
			obj.isla_trabaja_id = None
		if e.nuevo_dir_estatuto_id != None:
			direccion = DirDepartment(id=e.nuevo_dir_estatuto_id)
			obj.direccion_estatuto_id   = direccion
		else:
			obj.direccion_estatuto_id = None
		if e.nuevo_proc_estatuto_id != None:
			proceso   = DirDepartment(id=e.nuevo_proc_estatuto_id)
			obj.proceso_estatuto_id     = proceso
		else:
			obj.proceso_estatuto_id = None
		if e.nuevo_subprc_estatuto_id != None:
			subprc    = DirDepartment(id=e.nuevo_subprc_estatuto_id)
			obj.subproceso_estatuto_id  = subprc
		else:
			obj.subproceso_estatuto_id = None
		if e.nuevo_cargo_institucional_id != None:
			institucional  = GthCargoInstitucional(id=e.nuevo_cargo_institucional_id)
			obj.cargo_institucional_id  = institucional
		else:
			obj.cargo_institucional_id = None
		if e.nuevo_cargo_ocupacional_id != None:
			ocupacional    = GthCargoOcupacional(id=e.nuevo_cargo_ocupacional_id)
			obj.cargo_ocupacional_id    = ocupacional
		else:
			obj.cargo_ocupacional_id = None
		if e.nuevo_cargo_distributivo_id != None:
			distributivo   = GthCargoDistributivo(id=e.nuevo_cargo_distributivo_id)
			obj.cargo_distributivo_id   = distributivo
		else:
			obj.cargo_distributivo_id = None
		if e.modalidad_laboral_id != None:
			modalidad      = GthModalidadLaboral(id=e.modalidad_laboral_id)
			obj.modalidad_laboral_id    = modalidad
		else:
			obj.modalidad_laboral_id = None
	
		obj.rmu                     = e.nuevo_rmu
		obj.fecha_ingreso_png       = e.fecha_rige_accpersonal
		obj.save()

		obj2 = PerFuncionarioAccionpersonal.objects.get(pk=e.id)
		obj2.estado_ejecucion = "P"
		obj2.save()

	return HttpResponse("OK")

@login_required(login_url = '/login')
def TP_ingreso(request):
	today = date.today()
	items = PerIngresosAcciones.objects.all().filter(Q(estado='A'),Q(eliminado='f'),Q(estado_ejecucion='C')|Q(estado_ejecucion='A')|Q(estado_ejecucion='P'),Q(fecha_desde__lte=today))
	print_log("*************************************************************************22222")
	print_log(today)

	for e in items:
		if(e.estado_ejecucion != "P"):
			objA = PerFuncionarioAccionpersonal.objects.get(pk=e.accionpersonal_id.id)
			obj  = PerFuncionario.objects.get(pk=objA.funcionario_id.id)
			
			if e.cargo_funcional_id != None:
				funcional   = GthCargoFuncional(id=e.cargo_funcional_id)
				obj.cargo_funcional_id  = funcional
			else:
				obj.cargo_funcional_id  = None
			if e.base_legal != None:
				base        = GthBaseNombramiento(id=e.base_legal)
				obj.base_nombramiento_id    = base
			else:
				obj.base_nombramiento_id  = None
			if e.parroquia_id != None:
				parroquia   = GeoParroquia(id=e.parroquia_id)
				obj.parroquia_trabaja_id    = parroquia
			else:
				obj.parroquia_trabaja_id  = None

			obj.clasificacion_proceso_id= e.clasificacion_proceso_id
			obj.tipo_actividad          = e.tipo_actividad
			obj.partida_individual      = e.num_partidaInd
			obj.grado                   = e.grado
			obj.escala                  = e.escala
			obj.save()

		obj2 = PerIngresosAcciones.objects.get(pk=e.id)
		obj2.estado_ejecucion = "P"
		obj2.save()

	return HttpResponse("OK")
 
@login_required(login_url = '/login')
def TP_AccionLicencia(request):
	today = date.today()
	items = PerFuncionarioAccionpersonal.objects.all().filter(Q(estado='A'),Q(eliminado='f'),Q(estado_ejecucion='C')|Q(estado_ejecucion='A')|Q(estado_ejecucion='P'),Q(fecha_rige_accpersonal__lte=today),Q(accionpersonal_id='1a7c2e1d-bd87-4f49-ba2b-2f9bf0788f0b') | Q(accionpersonal_otros__accion_id='1a7c2e1d-bd87-4f49-ba2b-2f9bf0788f0b') | Q(accionpersonal_otros__accion_id='220d4e36-2e2c-4885-bd33-5e6e75f35896'))
	print_log("*************************************************************************3333")
	print_log(today)

	for e in items:
		obj2 = PerFuncionarioAccionpersonal.objects.get(pk=e.id)
		print_log(e.fecha_hasta_accpersonal)
		if e.fecha_hasta_accpersonal < today:
			obj2.estado_ejecucion = "F"
		else:
			obj2.estado_ejecucion = "P"
		obj2.save()

	return HttpResponse("OK")


#necargos y subrogaciones solo actualiza en funcionario los campos que se necesitan
@login_required(login_url = '/login')
def TP_AccionEncargo(request):
	today = date.today()
	items = PerFuncionarioAccionpersonal.objects.all().filter(Q(estado='A'),Q(eliminado='f'),Q(accionpersonal_id='59918445-f38d-4c70-868c-51521f1480c2')|Q(accionpersonal_id='9d5ed44e-864f-41d9-9dbe-1862863e1ced'),Q(estado_ejecucion='C')|Q(estado_ejecucion='A')|Q(estado_ejecucion='P'),Q(fecha_rige_accpersonal__lte=today))
	print_log("*************************************************************************encargo")
	print_log(today)

	for e in items:
		if(e.estado_ejecucion != "P"):
			obj = PerFuncionario.objects.get(pk=e.funcionario_id.id)
			
			if e.nuevo_isla_trabaja_id != None:
				isla_obj  = GeoIsla(id=e.nuevo_isla_trabaja_id)
				obj.isla_trabaja_id = isla_obj
			else:
				obj.isla_trabaja_id = None
			if e.nuevo_dir_estatuto_id != None:
				direccion = DirDepartment(id=e.nuevo_dir_estatuto_id)
				obj.direccion_estatuto_id   = direccion
			else:
				obj.direccion_estatuto_id = None
			if e.nuevo_proc_estatuto_id != None:
				proceso   = DirDepartment(id=e.nuevo_proc_estatuto_id)
				obj.proceso_estatuto_id     = proceso
			else:
				obj.proceso_estatuto_id = None
			if e.nuevo_subprc_estatuto_id != None:
				subprc    = DirDepartment(id=e.nuevo_subprc_estatuto_id)
				obj.subproceso_estatuto_id  = subprc
			else:
				obj.subproceso_estatuto_id = None
			if e.nuevo_cargo_institucional_id != None:
				institucional  = GthCargoInstitucional(id=e.nuevo_cargo_institucional_id)
				obj.cargo_institucional_id  = institucional
			else:
				obj.cargo_institucional_id = None
			if e.nuevo_cargo_ocupacional_id != None:
				ocupacional    = GthCargoOcupacional(id=e.nuevo_cargo_ocupacional_id)
				obj.cargo_ocupacional_id    = ocupacional
			else:
				obj.cargo_ocupacional_id = None
			if e.nuevo_cargo_distributivo_id != None:
				distributivo   = GthCargoDistributivo(id=e.nuevo_cargo_distributivo_id)
				obj.cargo_distributivo_id   = distributivo
			else:
				obj.cargo_distributivo_id = None

			obj.rmu = e.nuevo_rmu
			obj.save()

		obj2 = PerFuncionarioAccionpersonal.objects.get(pk=e.id)
		if e.fecha_hasta_accpersonal < today:
			obj2.estado_ejecucion = "F"
		else:
			obj2.estado_ejecucion = "P"
		obj2.save()

	return HttpResponse("OK")

#necargos y subrogaciones solo actualiza en funcionario los campos que se necesitan
@login_required(login_url = '/login')
def TP_AccionTraslados(request):
	today = date.today()
	items = PerFuncionarioAccionpersonal.objects.all().filter(Q(estado='A'),Q(eliminado='f'),Q(accionpersonal_id='6bed0559-5d87-46aa-a42a-42caab5b421b') | Q(accionpersonal_id='5bec1ac6-ecca-4b49-bf3f-dfdd690cda94')| Q(accionpersonal_id='2c27f7da-d578-4c33-ba43-1c8cbbcfa8d4'),Q(estado_ejecucion='C')|Q(estado_ejecucion='A')|Q(estado_ejecucion='P'),Q(fecha_rige_accpersonal__lte=today))
	print_log("*************************************************************************traslados")

	for e in items:
		print_log(e.nuevo_dir_estatuto_id)
		if(e.estado_ejecucion != "P"):
			obj = PerFuncionario.objects.get(pk=e.funcionario_id.id)
			if e.nuevo_isla_trabaja_id != None:
				isla_obj  = GeoIsla(id=e.nuevo_isla_trabaja_id)
				obj.isla_trabaja_id = isla_obj
			else:
				obj.isla_trabaja_id = None
			if e.nuevo_dir_estatuto_id != None:
				direccion = DirDepartment(id=e.nuevo_dir_estatuto_id)
				obj.direccion_estatuto_id   = direccion
			else:
				obj.direccion_estatuto_id = None
			if e.nuevo_proc_estatuto_id != None:
				proceso   = DirDepartment(id=e.nuevo_proc_estatuto_id)
				obj.proceso_estatuto_id     = proceso
			else:
				obj.proceso_estatuto_id = None
			if e.nuevo_subprc_estatuto_id != None:
				subprc    = DirDepartment(id=e.nuevo_subprc_estatuto_id)
				obj.subproceso_estatuto_id  = subprc
			else:
				obj.subproceso_estatuto_id = None
			if e.nuevo_cargo_institucional_id != None:
				institucional  = GthCargoInstitucional(id=e.nuevo_cargo_institucional_id)
				obj.cargo_institucional_id  = institucional
			else:
				obj.cargo_institucional_id = None
			if e.nuevo_cargo_ocupacional_id != None:
				ocupacional    = GthCargoOcupacional(id=e.nuevo_cargo_ocupacional_id)
				obj.cargo_ocupacional_id    = ocupacional
			else:
				obj.cargo_ocupacional_id = None
			if e.nuevo_cargo_distributivo_id != None:
				distributivo   = GthCargoDistributivo(id=e.nuevo_cargo_distributivo_id)
				obj.cargo_distributivo_id   = distributivo
			else:
				obj.cargo_distributivo_id = None

			obj.rmu  = e.nuevo_rmu
			obj.save()

		obj2 = PerFuncionarioAccionpersonal.objects.get(pk=e.id)
		if e.fecha_hasta_accpersonal != None:
			if e.fecha_hasta_accpersonal < today:
				obj2.estado_ejecucion = "F"
			else:
				obj2.estado_ejecucion = "P"
		else:
				obj2.estado_ejecucion = "F"
		obj2.save()

	return HttpResponse("OK")

@login_required(login_url = '/login')
def TP_Traslados(request):
	today = date.today()
	items = PerTraspasoAcciones.objects.all().filter(Q(estado='A'),Q(eliminado='f'),Q(estado_ejecucion='C')|Q(estado_ejecucion='A'),Q(fecha_desde__lte=today))
	print_log("*************************************************************************22222")
	print_log(today)

	for e in items:
		objA = PerFuncionarioAccionpersonal.objects.get(pk=e.accionpersonal_id.id)
		obj  = PerFuncionario.objects.get(pk=objA.funcionario_id.id)

		if e.id_cargo != None:
			funcional   = GthCargoFuncional(id=e.id_cargo)
			obj.cargo_funcional_id  = funcional
		else:
			obj.cargo_funcional_id  = None
		obj.save()

		obj2 = PerTraspasoAcciones.objects.get(pk=e.id)
		obj2.estado_ejecucion = "P"
		obj2.save()

	return HttpResponse("OK")
	
#buscar ingresos x id
@login_required(login_url = '/login')
def data_ingreso(request):
	print_log("************persona_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"PerFuncionarioAccionpersonal_ingresos","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar historial ingresos
@login_required(login_url = '/login')
def historial_ingreso(request):
	print_log("************historial_ingreso****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"PerFuncionarioAccionpersonal_ingresos","?funcionario_id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#buscar ingresos x parametros
@login_required(login_url = '/login')
def data_ingresosParam(request):
	print_log("************data_ingresosParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"PerFuncionarioAccionpersonal_ingresos","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#encargos
#buscar historial encargos
@login_required(login_url = '/login')
def historial_encargos(request):
	print_log("************historial_encargos****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"PerFuncionarioAccionpersonal_encargos","?funcionario_id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#licencias
#buscar historial licencias
@login_required(login_url = '/login')
def historial_licencias(request):
	print_log("************historial_licencias****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"PerFuncionarioAccionpersonal_licencias","?funcionario_id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#sanciones
#buscar historial sanciones
@login_required(login_url = '/login')
def historial_sanciones(request):
	print_log("************historial_sanciones****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"perfuncionariosanciones_list","?funcionario_id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#sp_iniciarTramite cargar pagina de tramites
@login_required(login_url = '/login')
def SP_iniciarTramite(request):
	print_log("************SP_iniciarTramite****************************")
	if request.user.is_superuser:
		obj = concat_url(request,"PerFuncionarioPermisos_list","?estado_revisor!=A&estado_aprobador!=A&estado_tramite=BORRADOR")
	else:	
		obj = concat_url(request,"PerFuncionarioPermisos_list","?estado_revisor!=A&estado_aprobador!=A&estado_tramite=BORRADOR&funcionario_id__id="+request.session['funcionario_id'])
	
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"perfuncionario_selectbox","")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()

	# Datos del usuario autenticado
	isla_trabaja_id = request.session['isla_trabaja_id']
	isla_trabaja = request.session['isla_trabaja_nm']
	funcionario_id = request.session['funcionario_id']
	persona_nombres = request.session['persona_nombres']

	context = {
		'permisos': response1["results"],
		'funcionarios': response2["results"],
		'isla_trabaja_id': isla_trabaja_id,
		'isla_trabaja': isla_trabaja,
		'funcionario_id': funcionario_id,
		'persona_nombres': persona_nombres

	}
	return render(request, 'talentohumano/SP_iniciarTramite.html', context)

#SL_Permisos_estadotramite cargar pagina de permisos
@login_required(login_url = '/login')
def SL_Permisos_estadotramite(request):
	print_log("************SL_Permiso_estadotramite****************************")
	if request.user.is_superuser:
		obj = concat_url(request,"PerFuncionarioPermisos_list","")
	else:	
		obj = concat_url(request,"PerFuncionarioPermisos_list","?funcionario_id__id="+request.session['funcionario_id'])
	
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"perfuncionario_selectbox","")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()

	# Datos del usuario autenticado
	isla_trabaja_id = request.session['isla_trabaja_id']
	isla_trabaja = request.session['isla_trabaja_nm']
	funcionario_id = request.session['funcionario_id']
	persona_nombres = request.session['persona_nombres']

	context = {
		'permisos': response1["results"],
		'funcionarios': response2["results"],
		'isla_trabaja_id': isla_trabaja_id,
		'isla_trabaja': isla_trabaja,
		'funcionario_id': funcionario_id,
		'persona_nombres': persona_nombres

	}
	return render(request, 'talentohumano/SL_permisos_estadosolicitud.html', context)

#cargar pagina de permisos bandeja revisor
@login_required(login_url = '/login')
def SL_permisos_bandeja_revisor(request):
	print_log("************SL_permisos_bandeja_revisor****************************")
	perfil = ""
	response1 = response2 = ""

	# REVISOR(3) Y APROBADOR(4)
	if request.session['menu_permisos_revisor']: 
		perfil = "REVISOR"
		obj1 = concat_url(request,"PerFuncionarioPermisos_list","?estado_tramite=TRAMITE&estado_revisor!=A&estado_aprobador!=A&revisor_id__id="+request.session['funcionario_id']+"&funcionario_id__isla_trabaja_id__id="+request.session['isla_trabaja_id'])
		response1 = requests.get(obj1["url"], headers=obj1["headers"]).json()

	print_log(perfil)
	#response3 = request.session['funcionarios']
	obj = concat_url(request,"perfuncionario_selectbox","")
	response3 = requests.get(obj["url"], headers=obj["headers"]).json()

	# Datos del usuario autenticado
	isla_trabaja_id = request.session['isla_trabaja_id']
	isla_trabaja = request.session['isla_trabaja_nm']
	funcionario_id = request.session['funcionario_id']
	persona_nombres = request.session['persona_nombres']
	aprobador_id = request.session['funcionario_id']

	#result = get_jefe_inmediato(request,response3)

	context = {
		'permisos': response1["results"],
		'funcionarios': response3["results"],
		'isla_trabaja_id': isla_trabaja_id,
		'isla_trabaja': isla_trabaja,
		'funcionario_id': funcionario_id,
		'persona_nombres': persona_nombres,
		'aprobador_id': aprobador_id,
		'perfil': perfil

	}
	return render(request, 'talentohumano/SL_permisos_bandeja.html', context)

#cargar pagina de permisos bandeja de aprobador
@login_required(login_url = '/login')
def SL_permisos_bandeja_aprobador(request):
	print_log("************SL_permisos_bandeja_aprobador****************************")

	perfil = ""
	response1 = response2 = ""

	# REVISOR(3) Y APROBADOR(4)
	if request.session['menu_permisos_aprobador']:
		perfil = "APROBADOR"
		#obj = concat_url(request,"PerFuncionarioPermisos_list","?estado_tramite=TRAMITE&estado_revisor=A&estado_aprobador!=A&aprobador_id__id="+request.session['funcionario_id']+"&funcionario_id__isla_trabaja_id__id="+request.session['isla_trabaja_id'])
		obj1 = concat_url(request,"PerFuncionarioPermisos_list","?estado_tramite=TRAMITE&estado_revisor=A&estado_aprobador!=A&funcionario_id__isla_trabaja_id__id="+request.session['isla_trabaja_id'])
		response1 = requests.get(obj1["url"], headers=obj1["headers"]).json()

	print_log(perfil)
	#response3 = request.session['funcionarios']
	obj = concat_url(request,"perfuncionario_selectbox","")
	response3 = requests.get(obj["url"], headers=obj["headers"]).json()

	# Datos del usuario autenticado
	isla_trabaja_id = request.session['isla_trabaja_id']
	isla_trabaja = request.session['isla_trabaja_nm']
	funcionario_id = request.session['funcionario_id']
	persona_nombres = request.session['persona_nombres']
	aprobador_id = request.session['funcionario_id']

	context = {
		'permisos': response1["results"],
		'funcionarios': response3["results"],
		'isla_trabaja_id': isla_trabaja_id,
		'isla_trabaja': isla_trabaja,
		'funcionario_id': funcionario_id,
		'persona_nombres': persona_nombres,
		'aprobador_id': aprobador_id,
		'perfil': perfil

	}
	return render(request, 'talentohumano/SL_permisos_bandeja.html', context)


#sp_iniciarTramite cargar pagina de controles rrhh
@login_required(login_url = '/login')
def SP_asistencia(request):
	print_log("************SP_asistencia****************************")
	obj = concat_url(request,"perFuncionarioControlesRrhh_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'controles': response1["results"],
	}
	return render(request, 'talentohumano/SP_asistencia.html', context)

#cargar data de controles rrhh segun los parametros ingresados
@login_required(login_url = '/login')
def data_control(request):
	print_log("************data_control****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"perFuncionarioControlesRrhh_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data de permiso segun los parametros ingresados
@login_required(login_url = '/login')
def solicitud_data(request):
	print_log("************solicitud_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"PerFuncionarioPermisos_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data de secuencia
@login_required(login_url = '/login')
def data_secuencia(request):
	print_log("************data_secuencia****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"sissecuencia_list","?codigo__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#getCiudadXpais
#obtener ciudades x pais
@login_required(login_url = '/login')
def getCiudadXpais(request):
	print_log("************getCiudadXpais****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"geociudad_list","?pais_id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cuenta bancaria
@login_required(login_url = '/login')
def cuentaBan(request):
	print_log("************cuentaBan****************************")
	obj = concat_url(request,"perpersonacuenta_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'cuentasBanc': response1["results"],
	}
	return render(request, 'configuracion/cuentaBan.html', context)

#obtenr datos del registro civil
@login_required(login_url = '/login')
def get_DatosRegistroCivil(request):
	#id = request.GET.get('id')
	session_token = request.GET.get('session_token')
	cedula = request.GET.get('data')
	url = "http://facturas.galapagos.gob.ec/demon.io/cedula/"+cedula+""
	print_log(url)
	response = requests.get(url)
	return HttpResponse(response);

#obtner info de cuanta bancaria de funcionario segun el parametro ingresado
@login_required(login_url = '/login')
def get_bancoFunc(request):
	print_log("************get_bancoFunc****************************")
	data = request.GET.get('id')
	obj = concat_url(request,"perpersonacuenta_list","?persona_id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#obtner info de familiares de funcionario segun el id
@login_required(login_url = '/login')
def famFun_data(request):
	print_log("************get_FamiliaresFunc****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"perfuncionariofamiliares_list","?id="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#obtner info de familiares de funcionario segun el parametro ingresado
@login_required(login_url = '/login')
def get_FamiliaresFunc(request):
	print_log("************get_FamiliaresFunc****************************")
	data = request.GET.get('id')
	obj = concat_url(request,"perfuncionariofamiliares_list","?funcionario_id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar pagina de accidentes
@login_required(login_url = '/login')
def accidentes(request):
	print_log("************accidentes****************************")
	obj = concat_url(request,"peraccidentes_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'accidentes': response1["results"],
	}
	
	return render(request, 'configuracion/accidentes.html', context)

#cargar pagina de ENFERMEDADES
@login_required(login_url = '/login')
def enfermedades(request):
	print_log("************enfermedades****************************")
	obj = concat_url(request,"perenfermedades_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'enfermedades': response1["results"],
	}
	return render(request, 'configuracion/enfermedades.html', context)

#cargar pagina de ACCIONPERSONAL
@login_required(login_url = '/login')
def accion_personal(request):
	print_log("************accion_personal****************************")
	obj = concat_url(request,"gthaccionpersonal_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"gthaccionpersonal_list","?tipo__in=PO")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"perfuncionario_list","?proceso_estatuto_id__id=PRC_GTH")
	response19 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		'acciones': response1["results"],
		'accionTipos': response2["results"],
		'funcionarios': response19["results"],
	}
	return render(request, 'configuracion/accion_personal.html', context)

#cargar pagina discapacidades
@login_required(login_url = '/login')
def discapacidades(request):
	print_log("************discapacidades****************************")
	obj = concat_url(request,"perdiscapacidades_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'discapacidades': response1["results"],
	}
	return render(request, 'configuracion/discapacidades.html', context)

#cargar pagina cargo distributivo
@login_required(login_url = '/login')
def distributivo(request):
	print_log("************distributivo****************************")
	obj = concat_url(request,"gthcargodistributivo","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	print_log(response1["next"])
	print_log(response1["previous"])
	context = {
		'distributivos': response1["results"],
		'next_url':response1["next"],
		'previous_url':response1["previous"]
	}
	return render(request, 'configuracion/distributivo.html', context)

#cargar pagina cargo funcional
@login_required(login_url = '/login')
def funcional(request):

	print_log("************funcional****************************")
	obj = concat_url(request,"gthcargofuncional_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'funcionals': response1["results"],
	}
	return render(request, 'configuracion/funcional.html', context)

#cargar pagina cargo institucional
@login_required(login_url = '/login')
def institucional(request):
	print_log("************institucional****************************")
	obj = concat_url(request,"gthcargoinstitucional_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'institucionals': response1["results"],
	}
	return render(request, 'configuracion/institucional.html', context)

#cargar pagina cargo ocupacional
@login_required(login_url = '/login')
def ocupacional(request):
	print_log("************ocupacional****************************")
	obj = concat_url(request,"gthcargoocupacional_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'ocupacionals': response1["results"],
	}
	return render(request, 'configuracion/ocupacional.html', context)

#otros

#cargar pagina comision
@login_required(login_url = '/login')
def comision(request):
	print_log("************comision****************************")
	obj = concat_url(request,"gthaccionpersonal_list","?accion_id__in=220d4e36-2e2c-4885-bd33-5e6e75f35896")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'comisiones': response1["results"],
	}
	return render(request, 'configuracion/comision.html', context)

#cargar pagina etnias
@login_required(login_url = '/login')
def etnias(request):
	print_log("************etnias****************************")
	obj = concat_url(request,"peretnias_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'etnias': response1["results"],
	}
	return render(request, 'configuracion/etnias.html', context)

#cargar pagina licencias
@login_required(login_url = '/login')
def licencias(request):
	print_log("************licencias****************************")
	obj = concat_url(request,"gthaccionpersonal_list","?accion_id__in=1a7c2e1d-bd87-4f49-ba2b-2f9bf0788f0b")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'licencias': response1["results"],
	}
	return render(request, 'configuracion/licencias.html', context)

#cargar pagina modalidad
@login_required(login_url = '/login')
def modalidad(request):
	print_log("************modalidad****************************")
	obj = concat_url(request,"gthmodalidadlaboral_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'modalidads': response1["results"],
	}
	return render(request, 'configuracion/modalidad.html', context)

#cargar pagina regimen
@login_required(login_url = '/login')
def regimen(request):
	print_log("************regimen****************************")
	obj = concat_url(request,"gthregimenlaboral_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'regimens': response1["results"],
	}
	return render(request, 'configuracion/regimen.html', context)

#cargar pagina rol
@login_required(login_url = '/login')
def rol_laboral(request):
	print_log("************rol_laboral****************************")
	obj = concat_url(request,"gthrollaboral_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'rols': response1["results"],
	}
	return render(request, 'configuracion/rol_laboral.html', context)

#cargar pagina sanciones
@login_required(login_url = '/login')
def sanciones(request):
	print_log("************sanciones****************************")
	obj = concat_url(request,"gthsanciones_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'sanciones': response1["results"],
	}
	return render(request, 'configuracion/sanciones.html', context)

#cargar pagina personas
@login_required(login_url = '/login')
def personas(request):
	obj = concat_url(request,"perpersona","")
	response = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"geopais","?field=id&field=descripcion")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"geoprovincia_list","?pais_text_id=ECUADOR&field=id&field=descripcion&field=pais_text_id")
	response4 = requests.get(obj["url"], headers=obj["headers"]).json()

	

	obj = concat_url(request,"peretnias","")
	response9 = requests.get(obj["url"], headers=obj["headers"]).json()
	
	context= {
		'personas': response["results"],
		'etnias': response9["results"],
		'paises': response2["results"],
		'provincias': response4["results"],
		
	}
	return render(request, 'configuracion/personas.html', context)

@login_required(login_url = '/login')
def markdown_uploader(request):
    """
    Makdown image upload for locale storage
    and represent as json to markdown editor.
    """
    
    if 'markdown-image-upload' in request.FILES:
        image = request.FILES['image']
        image_types = [
            'image/png', 'image/jpg',
            'image/jpeg', 'image/pjpeg', 'image/gif'
        ]
        if image.content_type not in image_types:
            data = json.dumps({
                'status': 405,
                'error': _('Bad image format.')
            })
            return HttpResponse(
                data, content_type="application/json", status=405)

        tmp_file = os.path.join(settings.UPLOAD_PATH, image.name)
        path = default_storage.save(tmp_file, ContentFile(image.read()))
        img_url = os.path.join(settings.MEDIA_URL, path)

        data = json.dumps({
            'status': 200,
            'link': img_url,
            'name': image.name
        })
        return HttpResponse(data, content_type='application/json')
    return HttpResponse(_('Invalid request!'))

#cargar pagina permisos
@login_required(login_url = '/login')
def SL_Permisos(request):
	obj = concat_url(request,"master.gth_solicitudpermiso","filter=(eliminado='f')&order=descripcion%20ASC")
	response = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
        'items': response["resource"]
    }

	return render(request, 'talentohumano/SL_Permisos.html', context)

#cargar pagina carnetizacion
@login_required(login_url = '/login')
def CZ_carnetizacion(request):

	obj = concat_url(request,"PerFuncionarioCarnet_list","")
	response = requests.get(obj["url"], headers=obj["headers"]).json()

	#obj = concat_url(request,"perfuncionario_selectbox","")
	#response2 = requests.get(obj["url"], headers=obj["headers"]).json()


	obj = concat_url(request,"siscatalogo_list","?categoria=CARGO_CARNET")
	response3 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
        'ctnz_funcionariocarnet_list': response["results"],
        #'cntz_funcionarioid_selectbox': response2["results"],
        'cargos': response3["results"]
    }
    
	return render(request, 'talentohumano/CZ_carnetizacion.html', context)

#cargar datos de funcionarios para los select box
@login_required(login_url = '/login')
def funcionario_selectbox(request):
	print_log("......................funcionario_selectbox")
	obj = concat_url(request,"perfuncionario_selectbox","")
	response = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response["results"]), content_type="application/json")

#cargar datos carnetizacion segun el id
@login_required(login_url = '/login')
def data_carnetizacion(request):
	print_log("************persona_data****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"PerFuncionarioCarnet_list","?id__in="+data+"")
	response = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response["results"]), content_type="application/json")

#cargar datos de sis catalogo segun el parametro ingresado
@login_required(login_url = '/login')
def CZ_carnetizacionCargos(request):

	obj = concat_url(request,"siscatalogo_list","?categoria=CARGO_CARNET")
	response = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
        'items': response["results"]
    }
    
	return render(request, 'configuracion/carnet_cargos.html', context)



def get_jefe_inmediato(request,funcionarios):
	print_log("******************* get_jefe_inmediato ************************")

	organigrama_position = get_organigrama_position(request)
	
	# USUARIO TIENE UN DIRECCION
	if organigrama_position == "es_dir":

		# SE VA A BUSCAR FUNCIONARIOS QUE ESTEN AL MISMO NIVEL JERARQUICO
		for item in funcionarios:
			if item["direccion_estatuto_id"] is not None:

				# SI EXISTE COINCIDENCIA
				if request.session['direccion_estatuto_id'] == item["direccion_estatuto_id"]["id"]:
					
					# VERIFICAR CUAL ES EL RESPONSABLE DE LA DIRECCION
					if item["cargo_institucional_id"] is not None and item["es_responsable"] == True:
						print_log(">>>> =========================================")
						print_log(">>>> FUNCIONARIO: "+item["persona_id"]["nombres"])
						print_log(">>>> DIRECCION: "+item["direccion_estatuto_id"]["name"])
						print_log(">>>> CARGO INSTITUCIONAL: "+item["cargo_institucional_id"]["nombre"])
						print_log(">>>> =========================================")

						context = {
							'funcionario_id': item["id"],
							'persona_nombres': item["persona_id"]["nombre_completo"]
						}
						return context
						

	# USUARIO TIENE UN PROCESO 
	if organigrama_position == "es_prc":

		# SE VA A BUSCAR FUNCIONARIOS QUE ESTEN AL MISMO NIVEL JERARQUICO
		for item in funcionarios:
			if item["proceso_estatuto_id"] is not None:

				# SI EXISTE COINCIDENCIA
				if request.session['proceso_estatuto_id'] == item["proceso_estatuto_id"]["id"]:
					
					# VERIFICAR CUAL ES EL RESPONSABLE DEL PROCESO
					if item["cargo_institucional_id"] is not None and item["es_responsable"] == True:
						print_log(">>>> =========================================")
						print_log(">>>> FUNCIONARIO: "+item["persona_id"]["nombres"])
						print_log(">>>> PROCESO: "+item["proceso_estatuto_id"]["name"])
						print_log(">>>> CARGO INSTITUCIONAL: "+item["cargo_institucional_id"]["nombre"])
						print_log(">>>> =========================================")
						
						context = {
							'funcionario_id': item["id"],
							'persona_nombres': item["persona_id"]["nombre_completo"]
						}
						return context

	# USUARIO TIENE UN SUBPROCESO 
	if organigrama_position == "es_subprc":

		# SE VA A BUSCAR FUNCIONARIOS QUE ESTEN AL MISMO NIVEL JERARQUICO
		for item in funcionarios:
			if item["subproceso_estatuto_id"] is not None:

				# SI EXISTE COINCIDENCIA
				if request.session['subproceso_estatuto_id'] == item["subproceso_estatuto_id"]["id"]:
					
					# VERIFICAR CUAL ES EL RESPONSABLE DEL SUBPROCESO
					if item["cargo_institucional_id"] is not None and item["es_responsable"] == True:
						print_log(">>>> =========================================")
						print_log(">>>> FUNCIONARIO: "+item["persona_id"]["nombres"])
						print_log(">>>> SUBPROCESO: "+item["subproceso_estatuto_id"]["name"])
						print_log(">>>> CARGO INSTITUCIONAL: "+item["cargo_institucional_id"]["nombre"])
						print_log(">>>> =========================================")
						
						context = {
							'funcionario_id': item["id"],
							'persona_nombres': item["persona_id"]["nombre_completo"]
						}
						return context

#cargar pagina reporte funcionario
@login_required(login_url = '/login')
def SP_repFuncionarios(request):
	print_log("************repFuncionarios****************************")
	context = {}
	return render(request, 'talentohumano/SP_repFuncionarios.html',context)

#cargar pagina tabla de funcionarios
@login_required(login_url = '/login')
def SP_tabFuncionarios(request):
	print_log("************repFuncionarios****************************")
	context = {}
	return render(request, 'talentohumano/SP_tabFuncionarios.html',context)

#cargar pagina reporte Acciones
@login_required(login_url = '/login')
def SP_repAcciones(request):
	print_log("************SP_repAcciones****************************")
	context = {}
	return render(request, 'talentohumano/SP_repAcciones.html',context)

#cargar pagina reporte de sanciones
@login_required(login_url = '/login')
def SP_repSanciones(request):
	print_log("************SP_repSanciones****************************")
	context = {}
	return render(request, 'talentohumano/SP_repSanciones.html',context)

#cargar pagina reporte de tramites
@login_required(login_url = '/login')
def SP_repTramites(request):
	print_log("************SP_repTramites****************************")
	context = {}
	return render(request, 'talentohumano/SP_repTramites.html',context)

#cargar pagina reporte de familiares y funcionarios
@login_required(login_url = '/login')
def SP_repFamiliaresFun(request):
	print_log("************SP_repFamiliaresFun****************************")
	context = {}
	return render(request, 'talentohumano/SP_repFamiliaresFun.html',context)

#cargar pagina dashboard
@login_required(login_url = '/login')
def SP_dashboard(request):
	print_log("************SP_dashboard****************************")
	obj2 = concat_url(request,"gthaccionpersonal_list","")
	response = requests.get(obj2["url"], headers=obj2["headers"]).json()
	context = {
		'acciones': response["results"],
	}
	return render(request, 'talentohumano/SP_dashboard.html',context)

#cargar pagina reporte de tramites
@login_required(login_url = '/login')
def data_tramitesParam(request):
	print_log("************data_tramitesParam****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"PerFuncionarioPermisos_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


"""
def link_callback(uri, rel):
    
    #Convert HTML URIs to absolute system paths so xhtml2pdf can access those
    #resources
    
    result = finders.find(uri)
    if result:
        if not isinstance(result, (list, tuple)):
            result = [result]
        result = list(os.path.realpath(path) for path in result)
        path = result[0]
    else:
        sUrl = settings.STATIC_URL  # Typically /static/
        sRoot = settings.STATIC_ROOT  # Typically /home/userX/project_static/
        mUrl = settings.MEDIA_URL  # Typically /media/
        mRoot = settings.MEDIA_ROOT  # Typically /home/userX/project_static/media/

        if uri.startswith(mUrl):
            path = os.path.join(mRoot, uri.replace(mUrl, ""))
        elif uri.startswith(sUrl):
            path = os.path.join(sRoot, uri.replace(sUrl, ""))
        else:
            return uri

    # make sure that file exists
    if not os.path.isfile(path):
        raise Exception(
            'media URI must start with %s or %s' % (sUrl, mUrl)
        )
    return path
    
def generar_cntz_pdf(request):
	print_log(" ********* generar_cntz_pdf **********")
	template_path = 'pdf/user_print_loger.html'
	context = extract_request_variables(request)
	print_log(context)
	
	response = HttpResponse(content_type='application/pdf')
	response['Content-Disposition'] = 'attachment; filename="report.pdf"'

	template = get_template(template_path)
	html = template.render(context)
	if request.POST.get('show_html', ''):
		response['Content-Type'] = 'application/text'
		response['Content-Disposition'] = 'attachment; filename="report.txt"'
		response.write(html)
	else:
		pisaStatus = pisa.CreatePDF(
		html, dest=response, link_callback=link_callback)
		if pisaStatus.err:
			return HttpResponse('We had some errors with code %s <pre>%s</pre>' % (pisaStatus.err,html))
	return response"""