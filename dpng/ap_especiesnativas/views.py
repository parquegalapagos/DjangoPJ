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
def menu_espnativas(request):
	obj = concat_url(request,"spncentroscrianza_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	menu_centrocrianza = submenu_nidostortuga = submenu_nidospetreles = submenu_flamingos = False
	menu_reportes = menu_dashboard = menu_config = False
	
	for group in request.user.groups.all():
		if group.id == 50 or group.id == 51 or group.id == 100:
			menu_centrocrianza = True

		if group.id == 52 or group.id == 53 or group.id == 100:
			submenu_nidostortuga = True

		if group.id == 54 or group.id == 55 or group.id == 100:
			submenu_nidospetreles = True

		if group.id == 56 or group.id == 57 or group.id == 100:
			submenu_flamingos = True

		if group.id == 58 or group.id == 100:
			menu_reportes = True

		if group.id == 59 or group.id == 100:
			menu_dashboard = True

		if group.id == 60 or group.id == 100:
			menu_config = True

	context = {
		'centroscrianzas': response1["results"],
		'isla_id': request.session['isla_trabaja_id'],
		'menu_centrocrianza': menu_centrocrianza,
		'submenu_nidostortuga': submenu_nidostortuga,
		'submenu_nidospetreles': submenu_nidospetreles,
		'submenu_flamingos': submenu_flamingos,
		'menu_reportes': menu_reportes,
		'menu_dashboard': menu_dashboard,
		'menu_config': menu_config,
		'foto_perfil' : request.session['foto_perfil']
	}
	return render(request, 'especiesnativas/menu_lateral.html',context)

#cargar pagina dashboard
@login_required(login_url = '/login')
def dashboard(request):
	obj = concat_url(request,"spncentroscrianza_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		'centroscrianzas': response1["results"],
		'isla_id': request.session['isla_trabaja_id'],
	}
	return render(request, 'especiesnativas/dashboard.html',context)

	

#cargar pagina centro de crianza
@login_required(login_url = '/login')
def centrosCrianza(request):
	print_log("************centroCrianza****************************")
	obj = concat_url(request,"spncentroscrianza_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"geoislas_list","?field=id&field=descripcion&field=canton_id&es_poblada__in=true&tipo_isla__in=I")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		'centroscrianzas': response1["results"],
		'islas': response2["results"],
	}
	return render(request, 'configuracion/centrosCrianza.html' , context)

#cargar pagina estado actual
@login_required(login_url = '/login')
def estadoActual(request):
	print_log("************estadoActual****************************")
	obj = concat_url(request,"spncentroscrianza_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'centroscrianzas': response1["results"],
	}
	return render(request, 'especiesnativas/estado_actual.html' , context)

#cargar pagina poblacion
@login_required(login_url = '/login')
def poblacion(request):
	print_log("************poblacion****************************")
	obj = concat_url(request,"spnpoblacion","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		'poblacions': response1["results"]
	}
	return render(request,'configuracion/poblacion.html',context)

#cargar pagina sitios
@login_required(login_url = '/login')
def sitios(request):
	print_log("************sitios****************************")
	obj = concat_url(request,"geositios_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	obj = concat_url(request,"siscatalogo_list","?categoria=SPN_MODULO_SITIO")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		'sitios': response1["results"],
		'modulos': response2["results"]
	}
	return render(request, 'configuracion/sitios.html' , context)

#cargar pagina nidos
@login_required(login_url = '/login')
def nidos(request):
	print_log("************nidos****************************")
	#obj = concat_url(request,"spnnidos_list","")
	#response = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"perfuncionario_list","?proceso_estatuto_id__id=PRC_CREI")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()

	#obj = concat_url(request,"geositios_list","?modulo__icontains=3")
	obj = concat_url(request,"geositios_list","?modulo__in=2,3,4")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"siscatalogo_list","?categoria=SPN_TIPO_NIDO")
	response3 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		#'nidos': response["results"],
		'zonas': response1["results"],
		'funcionarios': response2["results"],
		'tipo_nidos': response3["results"],
	}
	return render(request, 'especiesnativas/nidos.html' , context)

#cargar pagina tortugas adultas
@login_required(login_url = '/login')
def tortugasAdultas(request):
	print_log("************tortugasAdultas****************************")
	obj = concat_url(request,"spntortugasadultas_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"spnpoblacion","")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"spncentroscrianza_list","")
	response3 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		'cantidads': response1["results"],
		'poblacions': response2["results"],
		'centrocrianzas': response3["results"]
	}
	return render(request, 'especiesnativas/tortugas_adultas.html' , context)

#cargar pagina nidos tortugas
@login_required(login_url = '/login')
def tortugasNidos(request):
	print_log("************tortugasAdultas****************************")
	#obj = concat_url(request,"spncontrolhuevosnidos_list","")
	#response = requests.get(obj["url"], headers=obj["headers"]).json()
	obj = concat_url(request,"perfuncionario_list","?proceso_estatuto_id__id=PRC_CREI")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()
	obj = concat_url(request,"spnnidos_list","?tipo_nido__in=TORTUGA")
	response3 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		#'registros': response["results"],
		'funcionarios': response2["results"],
		'nidos': response3["results"],
	}

	return render(request, 'especiesnativas/tortugas_nidos.html' , context)

#cargar pagina nidos de petreles
@login_required(login_url = '/login')
def petrelesNidos(request):
	print_log("************petrelesNidosPrueba****************************")
	#obj = concat_url(request,"spncontrolpetrelesnidos_list","")
	#response = requests.get(obj["url"], headers=obj["headers"]).json()
	obj = concat_url(request,"perfuncionario_list","?proceso_estatuto_id__id=PRC_CREI")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()
	#obj = concat_url(request,"spnnidos_list","?tipo_nido__in=PETRELES")
	#response3 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		#'registros': response["results"],
		'funcionarios': response2["results"],
		#'nidos': response3["results"],
	}
	return render(request, 'especiesnativas/petrel_nidos.html', context)

#cargar pagina avistamiento de flamingos
@login_required(login_url = '/login')
def flamingosNidos(request):
	print_log("************flamingosNidos****************************")
	#obj = concat_url(request,"spncontrolflamingos_list","")
	#response = requests.get(obj["url"], headers=obj["headers"]).json()
	obj = concat_url(request,"perfuncionario_list","?proceso_estatuto_id__id=PRC_CREI")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	obj = concat_url(request,"geositios_list","?modulo__icontains=4")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()
	obj = concat_url(request,"siscatalogo_list","?categoria=SPN_FLAMINGO_COMPORTAMIENTO")
	response3 = requests.get(obj["url"], headers=obj["headers"]).json()
	obj = concat_url(request,"bioespecie_list","?categoria__in=1,2")
	response4 = requests.get(obj["url"], headers=obj["headers"]).json()
	obj = concat_url(request,"siscatalogo_list","?categoria__in=SPN_DATOS_NIDO,SPN_NIVEL_AGUA,SPN_CARACTERISTICA_AGUA")
	response5 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		#'registros': response["results"],
		'funcionarios': response1["results"],
		'zonas': response2["results"],
		'estados': response3["results"],
		'especies': response4["results"],
		'datos': response5["results"],
	}

	return render(request, 'especiesnativas/flamingos_nidos.html' , context)


#cargar pagina control de huevos
@login_required(login_url = '/login')
def control(request):
	print_log("************control****************************")
	obj = concat_url(request,"spncontrolhuevos_list","")
	response = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"spncentroscrianza_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	
	obj = concat_url(request,"spnpoblacion","")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		'cabeceras': response["results"],
		'centroscrianzas': response1["results"],
		'poblacions': response2["results"],
		'isla_id': request.session['isla_trabaja_id'],
	}
	return render(request, 'especiesnativas/control.html',context)

#cargar pagina control de crecimiento
@login_required(login_url = '/login')
def control_crecimiento(request):
	print_log("************control_crecimiento****************************") 
	obj = concat_url(request,"spncontrolcrecimientogalapaguitos_list","")
	response4 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"spncentroscrianza_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"spnpoblacion","")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"geositios_list","?modulo__icontains=1")
	response3 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		'cabeceras': response4["results"],
		'centroscrianzas': response1["results"],
		'poblacions': response2["results"],
		'sitios': response3["results"],
		'isla_id': request.session['isla_trabaja_id'],
	}
	return render(request, 'especiesnativas/control_crecimiento.html',context)

#cargar pagina ver control de crecimiento
@login_required(login_url = '/login')
def ver_control_crecimiento(request):
	print_log("************ver_control_crecimiento****************************")
	obj = concat_url(request,"spncentroscrianza_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"spnpoblacion","")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()
	
	context = {
		'centroscrianzas': response1["results"],
		'poblacions': response2["results"],
	}
	return render(request, 'especiesnativas/ver_control_crecimiento.html',context)

#cargar pagina reporte de grupo
@login_required(login_url = '/login')
def reporte_grupo(request):
	print_log("************reporte_grupo****************************")
	obj = concat_url(request,"spncentroscrianza_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'centroscrianzas': response1["results"],
	}
	return render(request, 'especiesnativas/reporte_grupo.html',context)

#cargar pagina buscar por numero de pintura
@login_required(login_url = '/login')
def buscar_pintura(request):
	print_log("************control_crecimiento****************************")
	obj = concat_url(request,"spncentroscrianza_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'centroscrianzas': response1["results"],
	}
	return render(request, 'especiesnativas/buscar_pintura.html',context)

#cargar pagina reporte de control de crecimiento
@login_required(login_url = '/login')
def reporte_control_crecimiento(request):
	print_log("************control_crecimiento****************************")
	obj = concat_url(request,"spncentroscrianza_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	context = {
		'centroscrianzas': response1["results"],
	}
	return render(request, 'especiesnativas/reporte_control_crecimiento.html',context)

#cargar pagina control de crecimiento encontrados
@login_required(login_url = '/login')
def control_crecimiento_encontrados(request):
	print_log("************control_crecimiento_encontrado****************************")
	obj = concat_url(request,"spncentroscrianza_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	obj = concat_url(request,"spnpoblacion","")
	response2 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		'centroscrianzas': response1["results"],
		'poblacions': response2["results"],
	}
	return render(request, 'especiesnativas/control_crecimiento_encontrados.html',context)


#cargar data de control de huevos segun los paraemtros ingresadas
@login_required(login_url = '/login')
def data_ControlHuevos(request):
	print_log("************data_ControlHuevos****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spncontrolhuevos_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar control de abecera crecimiento segun los parametros ingresados
@login_required(login_url = '/login')
def dataCabmedicionesParam(request):
	print_log("************dataCabmedicionesParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spncabcontrolcrecimientogalapaguitos_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar datos de detalle de contrl de crecimineto segun los parametros
@login_required(login_url = '/login')
def data_medicionesParam(request):
	print_log("************data_medicionesParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spncontrolcrecimientogalapaguitos_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


#cargar datos de la ultima medicion del control de crecimiento segun los parametros ingresados
@login_required(login_url = '/login')
def data_ultimaMedicionParam(request):
	print_log("************data_detalleHuevosParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spnvwcontrolcrecimientogalapaguitos_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")


#cargar datos del individuo segun el numero de tortuga ingresado
@login_required(login_url = '/login')
def datos_huevopintura(request):
	print_log("************datos_huevopintura****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spnvwdatoshuevopintura_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data control de crecimiento segun los parametros
@login_required(login_url = '/login')
def data_controlcreceParam(request):
	print_log("************data_controlcreceParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spnvwdatoscontrolcrecehuevopintura_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data control de huevos segun los parametros
@login_required(login_url = '/login')
def data_huevosCentroCrianza(request):
	print_log("************data_controlcreceParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spnvwresumenhuevosincubados_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data control de huevos segun los parametros
@login_required(login_url = '/login')
def data_huevosCentroCrianzaDetalles(request):
	print_log("************data_controlcreceParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spnvwresumenhuevosincubadosdetalles_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data segun los parametros
@login_required(login_url = '/login')
def data_huevosCentroCrianzaPeriodoDetalles(request):
	print_log("************data_controlcreceParam****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spnvwresumenhuevosincubadosperiodo_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data segun los parametros
@login_required(login_url = '/login')
def data_detalleControlCrecimiento(request):
	print_log("************data_detalleControlCrecimiento****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spnvwdetallecontrolcrecimiento_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data segun el id
@login_required(login_url = '/login')
def editCentroCrianza(request):
	print_log("************editCentroCrianza****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"spncentroscrianza_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data segun el id
@login_required(login_url = '/login')
def editPoblacion(request):
	print_log("************editPoblacion****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"spnpoblacion_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data segun el id
@login_required(login_url = '/login')
def editTortugasAdultas(request):
	print_log("************editTortugasAdultas****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"spntortugasadultas_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data segun los parametros ingresados
@login_required(login_url = '/login')
def dataTortugasAdultas(request):
	print_log("************dataTortugasAdultas****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"spntortugasadultas_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data estado actual segun los parametros ingresados
@login_required(login_url = '/login')
def data_estadoActualCC(request):
	print_log("************data_estadoActualCC****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"spnvwestadoactualcc_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data nidos de tortugas segun el id
@login_required(login_url = '/login')
def editTortugasNido(request):
	print_log("************editTortugasNido****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"spncontrolhuevosnidos_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data de nidos segun el id
@login_required(login_url = '/login')
def editNido(request):
	print_log("************editNido****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"spnnidos_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data petreles segun el id
@login_required(login_url = '/login')
def editPetrelesNido(request):
	print_log("************editPetrelesNido****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"spncontrolpetrelesnidos_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data falmingos segun el id
@login_required(login_url = '/login')
def editFla(request):
	print_log("************editFla****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"spncontrolflamingos_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data avistamiento de otras aves segun los parametros
@login_required(login_url = '/login')
def data_observAves(request):
	print_log("************data_observAves****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"spncontrolflamingosotrasespecies_list","?control_flamingos_id__in="+data+"&tipo__in=1")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data avistamiento de otras especies segun los parametros
@login_required(login_url = '/login')
def data_observOtrasEsp(request):
	print_log("************data_observAves****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"spncontrolflamingosotrasespecies_list","?control_flamingos_id__in="+data+"&tipo__in=2")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data avistamiento de nidos segun los parametros
@login_required(login_url = '/login')
def data_datosNidos(request):
	print_log("************data_datosNidos****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"spncontrolflamingosotrasespecies_list","?control_flamingos_id__in="+data+"&tipo__in=3")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data avistamiento de aves segun los parametros
@login_required(login_url = '/login')
def data_observFla(request):
	print_log("************data_observAves****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"spncontrolflamingosotrasespecies_list","?control_flamingos_id__in="+data+"&tipo__in=0")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data tortugas nidos segun los parametros
@login_required(login_url = '/login')
def data_ParamTorNido(request):
	print_log("************data_ParamTorNido****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spncontrolhuevosnidos_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data avistamiento de petreles segun los parametros
@login_required(login_url = '/login')
def data_ParamPet(request):
	print_log("************data_ParamPet****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spncontrolpetrelesnidos_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar data avistamiento de flamingos segun los parametros
@login_required(login_url = '/login')
def data_ParamFla(request):
	print_log("************data_ParamFla****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spncontrolflamingos_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar pagina especies
@login_required(login_url = '/login')
def especies(request):
	print_log("************especies****************************")
	#obj = concat_url(request,"spncontrolflamingos_list","")
	#response = requests.get(obj["url"], headers=obj["headers"]).json()
	obj = concat_url(request,"bioespecie_list","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	obj = concat_url(request,"siscatalogo_list","?categoria__in=TIPO_ESPECIE,SPN_CLASIFICACION_ESPECIE,SPN_CATEGORIA_ESPECIES")
	response5 = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
		#'registros': response["results"],
		'especies': response1["results"],
		'catalogos': response5["results"],
	}

	return render(request, 'configuracion/especies.html' , context)

#cargar datos de especie segun id
@login_required(login_url = '/login')
def editEspecies(request):
	print_log("************editEspecies****************************")
	data = request.GET.get('data')
	obj = concat_url(request,"bioespecie_list","?id__in="+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")

#cargar pagina reporte avistamineto
@login_required(login_url = '/login')
def reporteAvistamientos(request):
	return render(request, 'especiesnativas/reporte_avistamientos.html')

#cargar pagina reporte avistamineto
@login_required(login_url = '/login')
def reportePetreles(request):
	return render(request, 'especiesnativas/rep_petreles.html')


@login_required(login_url = '/login')
def update_General_mediciones(request):
    print("----------> update_General_mediciones")

    dj_url = request.POST.get('dj_url') #URL Django
    body = json.loads(request.POST.get('data')) #Body del JSON.
    idtabla = request.POST.get('idtabla') #URL Django
    obj = concat_url(request,dj_url,idtabla)
    print(obj)
    response = requests.request("PUT", obj["url"], json=json.loads(body), headers=obj["headers"])
    #print("----------> update_General response")   
    return HttpResponse(response)


@login_required(login_url = '/login')
def insert_General_mediciones(request):
    print("----------> insert_General_mediciones")
    dj_url = request.POST.get('dj_url') #URL Django
    obj = concat_url(request,dj_url,"")
    body = json.loads(request.POST.get('data').replace('\r', '\\r').replace('\n', '\\n'), strict=False)
    response = requests.request("POST", obj["url"], json=json.loads(body), headers=obj["headers"])   
    return HttpResponse(response)



#cargar data avistamiento de flamingos segun los parametros
@login_required(login_url = '/login')
def data_ParamNido(request):
	print_log("************data_ParamNido****************************")
	data = request.GET.get('data')
	print_log(data)
	obj = concat_url(request,"spnnidos_list","?"+data+"")
	
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")