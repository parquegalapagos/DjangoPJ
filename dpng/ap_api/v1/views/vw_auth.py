from django.shortcuts import render, render_to_response, get_object_or_404, redirect
from django.utils import timezone

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
import sys


#MODELS
from django.contrib.auth.models import User,Group
from ap_usuarioexterno.models import PerPersonaAuth
from ap_talentohumano.models import PerFuncionarioAuth


#FILES UPLOAD
from django.core.files.storage import FileSystemStorage

#REST
from rest_auth.views import LoginView

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView


##################################################
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.views import ObtainJSONWebToken

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER


class LoginViewUserDpng(ObtainJSONWebToken):
    def post(self, request, *args, **kwargs):
        print("---------- LoginViewUserDpng ---------")
        # by default attempts username / passsword combination
        response = super(LoginViewUserDpng, self).post(request, *args, **kwargs)
        # token = response.data['token']  # don't use this to prevent errors
        # below will return null, but not an error, if not found :)
        res = response.data
        token = res.get('token')

        user_uath = {}

        # token ok, get user
        if token:
            user = jwt_decode_handler(token)  # aleady json - don't serialize

            user_auth = User.objects.get(username=user["username"]) # Obtenemos el usuario autenticado

            try:
                per_funcionario_auth = PerFuncionarioAuth.objects.get(user=user_auth) # Funcionario Autenticado

                # Inicializamos valores
                user["nombres"] = ""
                user["apellidos"] = ""
                user["persona_nombres"] = ""
                user["email_institucional"] = ""
                user_uath["direccion_estatuto_id"] = ""
                user_uath["proceso_estatuto_id"] = ""
                user_uath["subproceso_estatuto_id"] = ""
                user_uath["direccion_estatuto_nm"] = ""
                user_uath["proceso_estatuto_nm"] = ""
                user_uath["subproceso_estatuto_nm"] = ""
                user_uath["isla_trabaja_id"] = ""
                user_uath["isla_trabaja_nm"] = ""
                user_uath["funcionario_id"] = ""
                user_uath["funcionario_es_responsable"] = ""
                user_uath["puesto_institucional_id"] = ""
                user_uath["puesto_institucional_nm"] = ""
                user_uath["puesto_distributivo_id"] = ""
                user_uath["puesto_distributivo_nm"] = ""

                # Direccion, proceso y subproceso a la que pertenece el funcionario.
                try:
                    user_uath["direccion_estatuto_id"] = per_funcionario_auth.funcionario_id.direccion_estatuto_id.id
                    user_uath["direccion_estatuto_nm"] = per_funcionario_auth.funcionario_id.direccion_estatuto_id.name
                except:
                    print("Unexpected error: ", sys.exc_info()[0])
                    print(">>Obs: El funcionario no tiene asignado una direccion.")

                try:
                    user_uath["proceso_estatuto_id"] = per_funcionario_auth.funcionario_id.proceso_estatuto_id.id
                    user_uath["proceso_estatuto_nm"] = per_funcionario_auth.funcionario_id.proceso_estatuto_id.name
                except:
                    print("Unexpected error: ", sys.exc_info()[0])
                    print(">>Obs: El funcionario no tiene asignado un Proceso.")

                try:
                    user_uath["subproceso_estatuto_id"] = per_funcionario_auth.funcionario_id.subproceso_estatuto_id.id
                    user_uath["subproceso_estatuto_nm"] = per_funcionario_auth.funcionario_id.subproceso_estatuto_id.name
                except:
                    print("Unexpected error: ", sys.exc_info()[0])
                    print(">>Obs: El funcionario no tiene asignado un Subproceso.")

                try:
                    user_uath["puesto_institucional_id"] = per_funcionario_auth.funcionario_id.cargo_institucional_id.id
                    user_uath["puesto_institucional_nm"] = per_funcionario_auth.funcionario_id.cargo_institucional_id.nombre
                except:
                    print("Unexpected error: ", sys.exc_info()[0])
                    print(">>Obs: El funcionario no tiene asignado un Puesto Institucional.")

                try:
                    user_uath["puesto_distributivo_id"] = per_funcionario_auth.funcionario_id.cargo_distributivo_id.id
                    user_uath["puesto_distributivo_nm"] = per_funcionario_auth.funcionario_id.cargo_distributivo_id.nombre
                except:
                    print("Unexpected error: ", sys.exc_info()[0])
                    print(">>Obs: El funcionario no tiene asignado un Puesto Distributivo.")

                try:
                    user_uath["isla_trabaja_nm"] = per_funcionario_auth.funcionario_id.isla_trabaja_id.descripcion
                    user_uath["isla_trabaja_id"] = per_funcionario_auth.funcionario_id.isla_trabaja_id.id
                    user_uath["funcionario_id"] = per_funcionario_auth.funcionario_id.id
                    user_uath["funcionario_es_responsable"] = per_funcionario_auth.funcionario_id.es_responsable
                    
                    if per_funcionario_auth.funcionario_id.persona_id.nombres:
                        user["nombres"] = per_funcionario_auth.funcionario_id.persona_id.nombres
                    if per_funcionario_auth.funcionario_id.persona_id.apellidos:
                        user["apellidos"] = per_funcionario_auth.funcionario_id.persona_id.apellidos

                    user["persona_nombres"] = user["nombres"] + " " +user["apellidos"]
                    user["email_institucional"] = per_funcionario_auth.funcionario_id.email
                    
                    if per_funcionario_auth.funcionario_id.persona_id:
                        user["telefono_celular"] = per_funcionario_auth.funcionario_id.persona_id.telefono_celular
                    else:
                        user["telefono_celular"] = ""

                except:
                    print("Unexpected error2: ", sys.exc_info()[0])
                    #raise
                
            except Exception as e:
                per_persona_auth = PerPersonaAuth.objects.get(user=user_auth) # Funcionario Autenticado
                
                 # Inicializamos valores
                user["nombres"] = ""
                user["apellidos"] = ""
                user["persona_nombres"] = ""
                user["email_institucional"] = ""
                user_uath["direccion_estatuto_id"] = ""
                user_uath["proceso_estatuto_id"] = ""
                user_uath["subproceso_estatuto_id"] = ""
                user_uath["direccion_estatuto_nm"] = ""
                user_uath["proceso_estatuto_nm"] = ""
                user_uath["subproceso_estatuto_nm"] = ""
                user_uath["isla_trabaja_id"] = ""
                user_uath["isla_trabaja_nm"] = ""
                user_uath["funcionario_id"] = ""
                user_uath["funcionario_es_responsable"] = ""
                user_uath["puesto_institucional_id"] = ""
                user_uath["puesto_institucional_nm"] = ""
                user_uath["puesto_distributivo_id"] = ""
                user_uath["puesto_distributivo_nm"] = ""


                try:
                    #user_uath["isla_trabaja_nm"] = per_funcionario_auth.funcionario_id.isla_trabaja_id.descripcion
                    #user_uath["isla_trabaja_id"] = per_funcionario_auth.funcionario_id.isla_trabaja_id.id
                    #user_uath["funcionario_id"] = per_funcionario_auth.funcionario_id.id
                    #user_uath["funcionario_es_responsable"] = per_funcionario_auth.funcionario_id.es_responsable
                    
                    if per_persona_auth.persona_id.nombres:
                        user["nombres"] = per_persona_auth.persona_id.nombres
                    if per_persona_auth.persona_id.apellidos:
                        user["apellidos"] = per_persona_auth.persona_id.apellidos

                    user["persona_nombres"] = user["nombres"] + " " +user["apellidos"]
                    user["email_institucional"] = per_persona_auth.persona_id.email
                    
                    if per_persona_auth.persona_id:
                        user["telefono_celular"] = per_persona_auth.persona_id.telefono_celular
                    else:
                        user["telefono_celular"] = ""

                except:
                    print("Unexpected error2: ", sys.exc_info()[0])
                    #raise
            


             
            # Grupos que tiene el usuario
            groups = {}
            for g in user_auth.groups.all():
                groups[g.id]=g.name


        else:  # if none, try auth by email
            req = request.data  # try and find email in request
            print(req)
            email = req.get('email')
            password = req.get('password')
            username = req.get('username')

            if email is None or password is None:
                return Response({'success': False, 
                                'message': 'Missing or incorrect credentials',
                                'data': req},
                                status=status.HTTP_400_BAD_REQUEST)

            # email exists in request, try to find user
            try:
                user = User.objects.get(email=email)
               
            except:
                return Response({'success': False, 
                                'message': 'User not found',
                                'data': req},
                                status=status.HTTP_404_NOT_FOUND)

            if not user.check_password(password):
                return Response({'success': False, 
                                'message': 'Incorrect password',
                                'data': req},
                                status=status.HTTP_403_FORBIDDEN)

            # make token from user found by email
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            user = UserSerializer(user).data


        return Response(
            {
                'success': True,
                'message': 'Successfully logged in',
                'session_token': token,
                'user': user,
                'user_uath': user_uath,
                'groups': groups
            }, 
            status=status.HTTP_200_OK
        )



class LogoutUserDpng(APIView):
    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


# Ejemplos de Autenticacion por token de usuario. Este token se registra por usuario en un tabla.
class CustomAuthToken(ObtainAuthToken):


    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                       context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })



class CustomLoginView(LoginView):
    
    def get_response(self):
        orginal_response = super().get_response()

        custom_response = {"user": {
            "username": self.user.username,
            "email": self.user.email
        }}
        
        orginal_response.data.update(custom_response)
        return orginal_response


