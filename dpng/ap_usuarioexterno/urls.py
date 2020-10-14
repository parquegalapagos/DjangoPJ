# DJANGO
from django.urls import path, re_path
from django.conf.urls import include, url
from django.contrib import admin

# VIEWS
from . import views
from ap_base import views as viewsbase


#STATIC
from django.conf import settings
from django.conf.urls.static import static

from django.views import generic


urlpatterns = [
	path('registrarse', views.registrarse, name='registrarse'),
	path('terminosycondiciones', views.terminosycondiciones, name='terminosycondiciones'),
	path('success-registro', views.crear_cuenta, name='success-registro'),
	path('enviar_correo', views.enviar_correo, name='enviar_correo'),
	path('get_DatosRegistroCivil2', views.get_DatosRegistroCivil2, name='get_DatosRegistroCivil2'),
	
	url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.activate_account, name='activate'),
	path('index', viewsbase.index, name='index'),
]