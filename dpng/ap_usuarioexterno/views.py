from django.shortcuts import render
from django.db import connection

from django.http import HttpResponse

import requests
import json
import uuid

from django.template import RequestContext, loader
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .token_generator import account_activation_token

#registro e inicio de sesion
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, authenticate, logout

#CORREO
from ap_base.views import send_mail
from django.core.mail import EmailMessage

#REST
from rest_auth.views import LoginView

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView

#MODEL
from django.contrib.auth.models import User
from ap_base.models import PerPersona
from ap_usuarioexterno.models import PerPersonaAuth

from ap_base.views import print_log



# Create your views here.
def registrarse(request):
	return render(request, 'registro/registrarse.html')

def terminosycondiciones(request):
	return render(request, 'registro/terminosycondiciones.html')

#Crear un nuevo usuario en el sistema
def crear_cuenta(request):
	print("----> Crear Cuenta:")
	if request.method == 'POST':
		formulario = UserCreationForm(request.POST)

		if formulario.is_valid:
			nombres = request.POST['userNombres']
			apellidos = request.POST['userApellidos']
			cedula = request.POST['userCedula']
			userName = request.POST['userName']
			correo = request.POST['userEmail']
			clave = request.POST['userContraseña']
			fecha = request.POST['userFechaNaci']
			sexo = request.POST['userSexo']
			estadoCivil = request.POST['userEstadoCivil']

			if(User.objects.raw("SELECT * FROM auth_user where username = %s", [userName] )):
				context = {
					'txt_error': 'El nombre de usuario ingresado ya existe, intente con otro por favor',
				}
				return render(request, 'registro/registrarse.html',context)
			else:
				user = User.objects.create_user(userName,correo,clave)

				user.first_name = nombres
				user.last_name = apellidos
				user.is_active = False
				user.save()


				#Insertar datos en la tabla per_persona
				persona = PerPersona()

				persona.id = uuid.uuid4()
				personaId = persona.id
				persona.identificacion = cedula
				persona.nombres = nombres
				persona.apellidos = apellidos
				persona.sexo = sexo
				persona.fecha_nacimiento = fecha
				persona.email = correo
				persona.estado_civil = estadoCivil
				persona.save()


				#Insertar datos en la tabla per_persona_auth
				user2 = User.objects.raw("SELECT * FROM auth_user where username = %s", [userName] )
				persona_auth = PerPersona.objects.raw("SELECT * FROM per_persona where id = %s", [personaId] )

				for u in user2:
					auxId = u.id
					for per in persona_auth:
						perId = per.id
						with connection.cursor() as c:
							c.execute("INSERT INTO per_persona_auth (persona_id, user_id) values (%s,%s) ", [perId, auxId] )
					with connection.cursor() as cursor:
						cursor.execute("INSERT INTO auth_user_groups (user_id, group_id) values (%s,'101') ", [auxId] )			


				####Enviar email con un token para activacion de la cuenta
				#current_site = get_current_site(request)
				dominio = '172.18.1.60:8020'
				email_subject = 'Activa tu cuenta - SISTEMA S.I.A'
				message = render_to_string('emails/invitacion_email.html', {
					'user': user,
					'domain': dominio, #current_site.domain,
					'uid': urlsafe_base64_encode(force_bytes(user.pk)),
					'token': account_activation_token.make_token(user),
				})
				to_email = correo
				email = EmailMessage(email_subject, message, to=[to_email])
				email.send()

				print('registro completado con exito')

				context = {
					'txt_mensaje': 'Le hemos enviado un email, por favor revise su dirección de correo electrónico para completar el registro',
				}
				return render(request, 'registro/registrarse.html',context)
		else:
			return render(request, 'registro/registrarse.html')

#obtenr datos del registro civil
def get_DatosRegistroCivil2(request):
	cedula = request.GET.get('data')
	url = "http://facturas.galapagos.gob.ec/demon.io/cedula/"+cedula+""
	print_log(url)
	response = requests.get(url)
	return HttpResponse(response);

#enviar correo electronico
def enviar_correo(request):
	print("----> Enviando email")

	titulo = "Activa tu cuenta - SISTEMA S.I.A"
	mensaje = "Su registro se realizó con éxito!!"
	nombre = request.GET.get('nombre')
	apellido = request.GET.get('apellido')

	template = "emails/invitacion_a_registrarse.html"
	emails = []


	if request.GET.get('correo'):
		#print_log(">> Insertando correo......")
		emails.append(request.GET.get('correo'))

	
	context = {
		'user_nombres': nombre+" "+apellido,
		'titulo': titulo,
		'contenido_body': mensaje
	}
	send_mail(titulo,template,context,emails)

	valor = {
		'results': 'OK'
	}

	return HttpResponse(json.dumps(valor), content_type="application/json")

#Funcion para activar al usuario registrado mediante Token
def activate_account(request, uidb64, token):
    try:
        uid = force_bytes(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        login(request, user)
        #return HttpResponse('Your account has been activate successfully')
        return render(request, 'registro/cuenta_activada.html')
    else:
        return HttpResponse('Link de activación es inválido!')



