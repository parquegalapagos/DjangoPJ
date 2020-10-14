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
	print_log("****** Cuso_acta_avistamineto *******")

	obj = concat_url(request,"siscatalogo_list","?categoria=PRG_ACTA_VISITA_CUSO")
	response = requests.get(obj["url"], headers=obj["headers"]).json()

	context = {
        'preguntas': response["results"]
    }

	return render(request, 'cuso_controlmarino/acta_visita_cuso.html',context)

@login_required(login_url = '/login')
def get_lista_embarcacionesTuris(request):
	print("************get_lista_embarcacionesTuristica****************************")
	data = request.GET.get('data')
	print(data)
	obj = concat_url(request,"patpatente_list","?"+data+"")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()
	return HttpResponse(json.dumps(response1["results"]), content_type="application/json")