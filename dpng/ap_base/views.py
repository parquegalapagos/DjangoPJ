import os
from django.shortcuts import render, render_to_response, get_object_or_404, redirect
from django.utils import timezone
from datetime import datetime,date

from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from ap_usuarioexterno.token_generator import account_activation_token

#from .models import Persona
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

#FILES UPLOAD
from django.core.files.storage import FileSystemStorage
import base64


#REST
from rest_auth.views import LoginView

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView

#MODEL
from django.contrib.auth.models import User
from ap_talentohumano.models import PerFuncionarioCarnet 

#MAIL
from ap_base.mailer import Mailer
from django.core.mail import EmailMessage

PRIVATE_API = getattr(settings, "PRIVATE_API", None)
API_IP_SERVER = getattr(settings, "API_IP_SERVER", None)
API_VERSION = getattr(settings, "API_VERSION", None)
CODE_VERSION = getattr(settings, "CODE_VERSION", None) 


def generarSessionToken(request,user,password):
	print("---- Generar Session Token ---")

	url = "http://"+API_IP_SERVER+"/api/v1/api-token-auth-jwt/"
	print("session********")
	headers = {'content-type': "application/json"}
	body = '{"username":"'+user+'", "password":"'+password+'"}';
	
	response = requests.post(url, headers=headers,data=body)
	# TOKEN
	request.session['session_token'] = response.json()["session_token"]
	# USER INFORMATION
	request.session['username'] = response.json()["user"]["username"]
	request.session['persona_nombres'] = response.json()["user"]["persona_nombres"]
	request.session['email_institucional'] = response.json()["user"]["email_institucional"]
	request.session['telefono_celular'] = response.json()["user"]["telefono_celular"]

	request.session['isla_trabaja_id'] = response.json()["user_uath"]["isla_trabaja_id"]
	request.session['isla_trabaja_nm'] = response.json()["user_uath"]["isla_trabaja_nm"]
	request.session['funcionario_id'] = response.json()["user_uath"]["funcionario_id"]

	request.session['direccion_estatuto_id'] = response.json()["user_uath"]["direccion_estatuto_id"]
	request.session['proceso_estatuto_id'] = response.json()["user_uath"]["proceso_estatuto_id"]
	request.session['subproceso_estatuto_id'] = response.json()["user_uath"]["subproceso_estatuto_id"]
	request.session['direccion_estatuto_nm'] = response.json()["user_uath"]["direccion_estatuto_nm"]
	request.session['proceso_estatuto_nm'] = response.json()["user_uath"]["proceso_estatuto_nm"]
	request.session['subproceso_estatuto_nm'] = response.json()["user_uath"]["subproceso_estatuto_nm"]
	request.session['funcionario_es_responsable'] = response.json()["user_uath"]["funcionario_es_responsable"]
	request.session['puesto_institucional_id'] = response.json()["user_uath"]["puesto_institucional_id"]
	request.session['puesto_institucional_nm'] = response.json()["user_uath"]["puesto_institucional_nm"]
	request.session['puesto_distributivo_id'] = response.json()["user_uath"]["puesto_distributivo_id"]
	request.session['puesto_distributivo_nm'] = response.json()["user_uath"]["puesto_distributivo_nm"]
	request.session['groups'] = response.json()["groups"]
	request.session['version_code'] = CODE_VERSION

	try:
		if PerFuncionarioCarnet.objects.filter(funcionario_id = str(request.session['funcionario_id'])).exists():
			request.session['foto_perfil'] = PerFuncionarioCarnet.objects.get(funcionario_id = str(request.session['funcionario_id'])).foto
		else:
			request.session['foto_perfil'] = "persona_vacio.png"
	except Exception as e:
		request.session['foto_perfil'] = "persona_vacio.png";

	#print("TOKEN: ")
	#print(response.json()["session_token"])


def index(request):
	# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
	return render(request, 'base/index.html')


@login_required(login_url = '/login')
def _logout(request):
	try:
		logout(request)
		print("Logout...")
	except:
		pass
	return render(request, 'index.html')


def password_reset(request):
	return render(request, 'base/password_reset.html')


@login_required(login_url = '/login')
def change_password(request):

	if request.is_ajax():
		try:
			# extract new_password value from POST/JSON here, then
			usuario = request.POST.get('usuario')
			password = request.POST.get('pass')
			user = User.objects.get(username=usuario)	
		except user.DoesNotExist:
			return HttpResponse("USER_NOT_FOUND")
		else:
			user.set_password(password)
			user.save()

		#_logout(request);

		return HttpResponse("OK")
	else:
		return HttpResponse(status = 400)


#enviar email para recuperación de contraseña
def password_reset_email(request):
	print("-----> password_reset_email:")
	if request.method == 'POST':
		userEmail = request.POST['email']

		if(User.objects.get(email=userEmail)):
			user = User.objects.get(email=userEmail)
			
			dominio = '172.18.1.60:8020'
			email_subject = 'Recuperar Contraseña - SISTEMA S.I.A'
			message = render_to_string('base/password_reset_email.html', {
				'user': user,
				'domain': dominio, #current_site.domain,
				'uid': urlsafe_base64_encode(force_bytes(user.pk)),
				'token': account_activation_token.make_token(user),
			})
			to_email = userEmail
			email = EmailMessage(email_subject, message, to=[to_email])
			email.send()

			context = {
				'txt_error': 'Le hemos enviado al correo electrónico instrucciones para recuperar su contraseña, si existe una cuenta con el correo electrónico que ingresó, en unos instantes recibirá un email.',
			}
			return render(request, 'base/password_reset.html',context)

		else:
			context = {
				'txt_error': 'La dirección de correo electrónico ingresado no se encuentra registrado en el sistema',
			}
			return render(request, 'base/password_reset.html',context)
		

	else:
		return render(request, 'base/password_reset.html')


def password_reset_confirm(request, uidb64, token):
    try:
        uid = force_bytes(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        context = {
        	'usuario': user.username
        }
        print("usuario: "+ user.username)
        return render(request, 'base/password_reset_confirm.html', context)
    else:
        return HttpResponse('Link para recuperar contraseña ya no es válido!')


def cambiar_password(request, uidb64, token):
	print("-----> cambiar_contraseña:")
	
	if request.is_ajax():
		try:
			usuarioN = request.POST.get('nombreusuario')
			password1 = request.POST.get('pass')

			print("Username: "+ usuarioN)

			user = User.objects.get(username=usuarioN)

			print("Nombre: "+ user.first_name)

		except user.DoesNotExist:
			return HttpResponse("USER_NOT_FOUND")
		else:
			user.set_password(password1)
			user.save()
			
		return HttpResponse("OK")	
	else:
		return HttpResponse(status = 400)		


def password_reset_done(request):
	return render(request, 'base/password_reset_done.html')

def autenticar(request):
	print("-----> Login:")
	if request.method == 'POST':
		formulario = AuthenticationForm(request.POST)
		global menu
		global num
		global nameUss

		if formulario.is_valid:
			user = request.POST['userLogin']
			clave = request.POST['passLogin']
			acceso = authenticate(username=user,password=clave)

			if acceso is not None:
				print('acceso valido')
				if acceso.is_active:
					login(request, acceso)
					template = loader.get_template('app.html')

					# TOKEN DE SESSION
					generarSessionToken(request,user,clave)
					

					

					context= {		
						'foto_perfil' : request.session['foto_perfil'],
						'version_code': request.session['version_code']
					}

					
					return HttpResponse(template.render(context,request))
					
			else:
				print("Error Autenticacion!!!")
				print("Usuario o Contrasenias Invalidas!!! ")
				context = {
					'txt_error': 'Usuario y Contraseña Invalidas.',
				}
				return render(request, 'index.html',context)
		else:
			return render(request, 'index.html')

	else:
		template = loader.get_template('index.html')
		context = {
			'usuario': '',

		}
		return HttpResponse(template.render(context,request))

@login_required(login_url = '/login')
def home(request):
	context = {
		'foto_perfil' : request.session['foto_perfil'],
		'email_institucional': request.session['email_institucional']
	}					

	return render(request, 'base/home.html',context)

@login_required(login_url = '/login')
def app(request):
	context = {
		'foto_perfil' : request.session['foto_perfil'],
		'email_institucional': request.session['email_institucional'],
		'version_code': request.session['version_code']
	}		
	return render(request, 'base/app.html',context)

@login_required(login_url = '/login')
def menu(request):
	return render(request, 'base/menu_lateral.html')

"""
def upload_files(request):
    if request.method == 'POST' and request.FILES['myfile']:
        myfile = request.FILES['myfile']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        return HttpResponse("OK")

    return HttpResponse("ERROR")
"""

@login_required(login_url = '/login')
def upload_files(request):
	print("***** upload_files ******")
	filename=""

	if request.method == 'POST' and request.FILES['myfile']:
		file_path = request.POST['file_path']
		print(">> file_path: "+str(file_path) )

		if not os.path.isdir(file_path):
			print('>> The directory is not present. Creating a new one..')
			os.mkdir(file_path, 777)
		else:
			print('>> The directory is present.')

		for myfile in request.FILES.getlist('myfile'):
			fs = FileSystemStorage(location=file_path)
			#fs.remove(myfile.name, myfile)
			filename = fs.save(myfile.name, myfile)
			uploaded_file_url = fs.url(filename)
		return HttpResponse(filename)

	return HttpResponse("ERROR")

@login_required(login_url = '/login')
def error_404_view(request, excepon):
	data = {"name": "ThePythonDjango.com"}
	return render(request,'error_404.html', data)

@login_required(login_url = '/login')
def error_500_view(request):
	data = {"name": "ThePythonDjango.com"}
	return render(request,'error_404.html', data)


#CRUD GENERAL
@login_required(login_url = '/login')
def insert_General(request):
	print("----------> insert_General")

	dj_url = request.GET.get('dj_url')
	obj = concat_url(request,dj_url,"")
	body = json.loads(request.GET.get('data').replace('\r', '\\r').replace('\n', '\\n'), strict=False)
	print(body)
	response = requests.request("POST", obj["url"], json=json.loads(body), headers=obj["headers"])
	return HttpResponse(response)


@login_required(login_url = '/login')
def update_General(request):
    print("----------> update_General")

    dj_url = request.GET.get('dj_url') #URL Django
    print(dj_url)
    body = json.loads(request.GET.get('data')) #Body del JSON.
    print(body)
    idtabla = request.GET.get('idtabla') #URL Django
    obj = concat_url(request,dj_url,idtabla)

    response = requests.request("PUT", obj["url"], json=json.loads(body), headers=obj["headers"])
    #print("----------> update_General response")
    
    return HttpResponse(response)

@login_required(login_url = '/login')
def delete_General(request):
	print("----------> delete_General")

	dj_url = request.GET.get('dj_url') #URL Django
	#body = json.loads(request.GET.get('data')) #Body del JSON.
	#print(body)
	idtabla = request.GET.get('idtabla') #URL Django
	obj = concat_url(request,dj_url,idtabla)
	#obj = concat_url(request,dj_url,body['id'])
	#del body['id'] # Se elimina id del json
	response = requests.request("DELETE", obj["url"],  headers=obj["headers"])
	return HttpResponse(response)



################################################
def concat_url(request,dj_url,params):
	""" api_request: Hace la petición al DjangoRestApi """
	
	print("--- concat_url ---")
	session_token = request.session['session_token']
	authorization = 'PNG' + ' ' + session_token
	headers = {
		'Authorization': authorization,
		'content-type': "application/json",
		'cache-control': "no-cache"
	}
		
	url_ = "http://"+API_IP_SERVER+'/'+API_VERSION+'/'

	if params != '':
		url = url_+dj_url+"/"+params
	else:
		url = url_+dj_url+"/"

	print("url: "+url)

	return {
		'session_token': session_token,
		'headers': headers,
		'url': url 
	}


@login_required(login_url = '/login')
def upload_image(request):
	print("---------------> upload_image")

	base64_img = request.POST['base64_img']
	base64_img = base64_img.split('base64,')
	file_name = request.POST['file_name']
	file_path = request.POST['file_path']

	print(file_name)

	if request.method == 'POST':
		try:
			if not os.path.isdir(file_path):
				print_log('>> The directory is not present. Creating a new one..')
				#os.mkdir(ruta, 0777)
				os.mkdir(file_path)
			else:
				print_log('>> The directory is present.')
				
			image_64_decode =base64.b64decode(base64_img[1])
			#image_result = open(file_path+file_name+'.jpeg', 'wb')
			image_result = open(file_path+file_name, 'wb') # create a writable image and write the decoding result
			image_result.write(image_64_decode)
			
		except Exception as e:
			print(str(e))


		return HttpResponse("OK")

	return HttpResponse("ERROR")


def get_organigrama_position(request):
	print("************get_organigrama_position****************************")

	print(">> USUARIO ACTUAL: " + request.session['persona_nombres'])

	if request.session['funcionario_es_responsable']:
		print(">> TIENE ENCARGO/SUBROGACION: SI")

		if request.session['direccion_estatuto_id'] and request.session['proceso_estatuto_id'] and request.session['subproceso_estatuto_id']:
			print(">> PROCESO: " + request.session['proceso_estatuto_id'])
			return "es_prc"
		elif request.session['direccion_estatuto_id'] and request.session['proceso_estatuto_id']:
			print(">> DIRECCION: " + request.session['direccion_estatuto_id'])
			return "es_dir"
		elif request.session['direccion_estatuto_id']:
			print(">> DIRECCION GENERAL: DPNG")
			return "es_dir_general"
		else:
			print(">> No tiene asignado ninguna Direccion, Proceso y Subproceso. ")
			return "None"

	else:
		print(">> TIENE ENCARGO/SUBROGACION: NO")

		if request.session['direccion_estatuto_id'] and request.session['proceso_estatuto_id'] and request.session['subproceso_estatuto_id']:
			print(">> SUBPROCESO: " + request.session['subproceso_estatuto_nm'])
			return "es_subprc"
		elif request.session['direccion_estatuto_id'] and request.session['proceso_estatuto_id']:
			print(">> PROCESO: " + request.session['proceso_estatuto_nm'])
			return "es_prc"
		elif request.session['direccion_estatuto_id']:
			print(">> DIRECCION: " + request.session['direccion_estatuto_nm'])
			return "es_dir"
		else:
			print(">> No tiene asignado ninguna Direccion, Proceso y Subproceso. ")
			return "None"


def send_mail(subject,template,context,to_emails):
	print(">>>>>>>>>> Enviar Correo >>>>>>>>>>>>>")
	mail = Mailer()
	mail.send_messages(subject=subject,
					template=template,
					context=context,
					to_emails=to_emails)
	print(">> Fin Enviar Correo >>")
	print('>>>>>>>>>>>>')
	return '>> OK'


"""
* Funcion: get_directorDeArea
* Descripcion: Obtiene el director dependiendo a la direccion que pertenezca el usuario/funcionario.
* Parametros:
*   - direccion_estatuto_id(String): id de la tabla public.dir_department(direccion) a la que pertenece el usuario solicitante.  
* Retorna(Dict): Retorna un diccionario con el nombre e id del director de area.         
"""

def get_directorDeArea(direccion_estatuto_id):
	print(">>>>>>>>>> get_directorDeArea >>>>>>>>>>>>>")
	print(direccion_estatuto_id)

	query="""
		SELECT
		per_funcionario.id,
		concat(per_persona.nombres, ' ', per_persona.apellidos) as nombre_completo,
		geo_isla.descripcion as isla,
		dir_department.id as direccion_id,
		dir_department.name as direccion,
		gth_cargo_institucional.id AS cargo_institucional,
		gth_cargo_institucional.nombre AS cargo_institucional

		FROM master.per_funcionario
		LEFT JOIN master.per_persona on per_persona.id = per_funcionario.persona_id
		LEFT JOIN master.gth_cargo_institucional on gth_cargo_institucional.id = per_funcionario.cargo_institucional_id
		LEFT JOIN public.dir_department on dir_department.id = per_funcionario.direccion_estatuto_id 
		LEFT JOIN master.geo_isla on geo_isla.id = per_funcionario.isla_trabaja_id
		WHERE per_funcionario.estado = 'A' AND per_funcionario.eliminado='f' 
		AND gth_cargo_institucional.nombre LIKE %s and dir_department.id = %s

	"""

	result1 = User.objects.raw(query, ['%DIRECTOR%', direccion_estatuto_id] )
			
	for item in result1:
		directorarea_id = item.id
		directorarea_nombres = item.nombre_completo

	result = {
		'directorarea_id': directorarea_id,
		'directorarea_nombres': directorarea_nombres
	}

	return result


def print_log(msj):
	fecha = datetime.now()
	fecha = fecha.strftime("%d/%b/%Y %H:%M:%S")
	str_ = "[" + str(fecha) + "]: "
	try:
		if msj:
			str_ = str_ + msj

		print(str_)
	except:
		print(str_)
		print(msj)

	