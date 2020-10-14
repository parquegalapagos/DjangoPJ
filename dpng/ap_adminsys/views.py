from django.shortcuts import render
from django.db.models import Q
from django.db import connection
from django.http import JsonResponse
from django.contrib import messages
from django.http import HttpResponse



import requests
import json

#para asegurando que haya una sesion activa
from django.contrib.auth.decorators import login_required

#Vistas
from ap_base.views import insert_General,update_General,delete_General,concat_url,get_organigrama_position

#MODEL
from django.contrib.auth.models import User
from ap_talentohumano.models import PerFuncionarioCarnet



@login_required(login_url = '/login')
def menu_opsistema(request):
	menu_accion_personal = menu_encargos = menu_ingresos = menu_licencias = menu_personaldpng = False
	
	context= {
		'menu_configuracion': '',
		'foto_perfil' : request.session['foto_perfil']	
		
	}

	return render(request, 'adminsys/menu_lateral.html' , context)


@login_required(login_url = '/login')
def usuariosPermisos(request):
	print("************usuariosPermisos****************************")

	obj = concat_url(request,"PerFuncionarioAccionpersonal_licencias","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	usuarios = User.objects.all()
	
	context = {
		'usuarios': usuarios,
	}

	return render(request, 'adminsys/SIS_usuariospermisos.html', context)

@login_required(login_url = '/login')
def usuariosPermisos2(request):
	print("************usuariosPermisos****************************")

	obj = concat_url(request,"PerFuncionarioAccionpersonal_licencias","")
	response1 = requests.get(obj["url"], headers=obj["headers"]).json()

	usuarios = User.objects.all()
	
	context = {
		'usuarios': usuarios,
	}

	return render(request, 'adminsys/SIS_usuariospermisos2.html', context)

@login_required(login_url = '/login')
def cambiar_permisos(request):
	print("************cambiar_permisos****************************")

	if request.method == 'POST':
		usuario1 = request.POST.get('user1_id')
		usuario2 = request.POST.get('user2_id')
		print(">>usuario1")
		print(usuario1)

		print(">>usuario2")
		print(usuario2)

		permisos1 =  User.objects.raw("SELECT * FROM auth_user_groups where user_id = %s", [usuario1] )
		permisos2 =  User.objects.raw("SELECT * FROM auth_user_groups where user_id = %s", [usuario2] )

		for itemx in permisos1:
			print(itemx.id)

		for itemx2 in permisos2:
			print(itemx2.id)

		# CASE 1: SWITCH BETWEEN TWO USERS
		
		
		with connection.cursor() as cursor:
			cursor.execute("DELETE FROM auth_user_groups WHERE user_id = %s", [usuario1])
			cursor.execute("DELETE FROM auth_user_groups WHERE user_id = %s", [usuario2])

			for p1 in permisos1:
				print("p1")
				print(p1.group_id)
				cursor.execute("INSERT INTO auth_user_groups (user_id, group_id,estado) values (%s,%s,%s) ", [usuario2, p1.group_id, p1.estado] )

				#cursor.execute("INSERT INTO auth_user_groups_user (user_group, user_from, user_to, estado) values (%s,%s,%s,%s) ", [p1.group_id, usuario1, usuario2, '0'] )


			for p2 in permisos2:
				print("p2")
				print(p2.group_id)
				cursor.execute("INSERT INTO auth_user_groups (user_id, group_id,estado) values (%s,%s,%s) ", [usuario1, p2.group_id,p2.estado] )

				#cursor.execute("INSERT INTO auth_user_groups_user (user_group, user_from, user_to, estado) values (%s,%s,%s,%s) ", [p2.group_id, usuario2, usuario1, '0'] )


		# CASE 2: SWITCH PERMS FROM USER 1 TO USER 2
		"""
		with connection.cursor() as cursor:

			for p1 in permisos1:
				print("Permiso 1")
				cursor.execute("INSERT INTO auth_user_groups_user (user_group, user_from, user_to, estado) values (%s,%s,%s,%s) ", [p1.group_id, usuario1, usuario2, '0'] )
				cursor.execute("INSERT INTO auth_user_groups (user_id, group_id) values (%s,%s) ", [usuario2, p1.group_id] )

			for p2 in permisos2:
				print("Permiso 2")
				cursor.execute("INSERT INTO auth_user_groups_user (user_group, user_from, user_to, estado) values (%s,%s,%s,%s) ", [p2.group_id, usuario2, usuario1, '0'] )
				
		"""
	#	messages.info(request, 'Procesado con exito!')



	#usuarios = User.objects.all()
	
	#context = {
	#	'usuarios': usuarios,
	#}
	#return render(request, 'adminsys/SIS_usuariospermisos.html', context)

	context = {
		'salida': "OK",
	}
	return HttpResponse(json.dumps(context), content_type="application/json")


def data_grupos_users(request):
	print("************listar_grupos****************************")
	user_id = request.GET.get('user')

	with connection.cursor() as cursor:
		try:
			cursor.execute("SELECT auth_user_groups.id, auth_user_groups.user_id, auth_user_groups.group_id , auth_group.id, auth_group.name, auth_user_groups.estado  FROM auth_user_groups LEFT JOIN auth_group on auth_group.id = auth_user_groups.group_id where user_id = %s", [user_id]  )
			result1 = cursor.fetchall()
		except:
			print(">> No se encontro registros! ")
			result1 = [0,0,0,'NO EXISTE VALORES']

	return JsonResponse(result1, safe=False)


@login_required(login_url = '/login')
def add_permisosUser(request):
	print("************cambiar_permisos****************************")

	if request.method == 'POST':
		usuario1 = request.POST.get('user1_id')
		usuario2 = request.POST.get('user2_id')
		print(">>usuario1")
		print(usuario1)

		print(">>usuario2")
		print(usuario2)

		permisos1 =  User.objects.raw("SELECT * FROM auth_user_groups where user_id = %s", [usuario1] )
		#permisos2 =  User.objects.raw("SELECT * FROM auth_user_groups where user_id = %s", [usuario2] )

		for itemx in permisos1:
			print(itemx.id)

		# CASE 1: SWITCH BETWEEN TWO USERS
		
		with connection.cursor() as cursor:
			cursor.execute("UPDATE auth_user_groups SET estado = 0 WHERE user_id = %s and estado = 2", [usuario2])
		
			for p2 in permisos1:
				print("p2")
				print(p2.group_id)
				cursor.execute("INSERT INTO auth_user_groups (user_id, group_id,estado) values (%s,%s,1) ", [usuario2, p2.group_id] )

				#cursor.execute("INSERT INTO auth_user_groups_user (user_group, user_from, user_to, estado) values (%s,%s,%s,%s) ", [p2.group_id, usuario2, usuario1, '0'] )
		#messages.info(request, 'Procesado con exito!')



	#usuarios = User.objects.all()
	
	context = {
		'salida': "OK",
	}
	return HttpResponse(json.dumps(context), content_type="application/json")


@login_required(login_url = '/login')
def return_permisosUser(request):
	print("************return_permisos****************************")

	if request.method == 'POST':
		usuario2 = request.POST.get('user2_id')

		print(">>usuario2")
		print(usuario2)

		permisos =  User.objects.raw("SELECT * FROM auth_user_groups where user_id = %s", [usuario2] )
		
		# CASE 1: SWITCH BETWEEN TWO USERS	
		with connection.cursor() as cursor:
			cursor.execute("DELETE FROM auth_user_groups WHERE user_id = %s and estado = 1", [usuario2])
			cursor.execute("UPDATE auth_user_groups SET estado = 2 WHERE user_id = %s", [usuario2])
		
	context = {
		'salida': "OK",
	}
	return HttpResponse(json.dumps(context), content_type="application/json")

@login_required(login_url = '/login')
def activar_permisosUser(request):
	print("************activar_permisosUser****************************")

	if request.method == 'POST':
		usuario2 = request.POST.get('user2_id')
		evento   = request.POST.get('evento')

		print(">>usuario2")
		print(usuario2)
		print(evento)

		if evento == "1":
			eventoAux = 3;
			estadoAux = 0;
		else:
			eventoAux = 0;
			estadoAux = 3;

		print(eventoAux)

		# CASE 1: SWITCH BETWEEN TWO USERS	
		with connection.cursor() as cursor:
			cursor.execute("UPDATE auth_user_groups SET estado = %s WHERE user_id = %s and estado = %s", [eventoAux,usuario2,estadoAux])
		
	context = {
		'salida': "OK",
	}
	return HttpResponse(json.dumps(context), content_type="application/json")