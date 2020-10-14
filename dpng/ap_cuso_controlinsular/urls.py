# DJANGO
from django.urls import path, re_path
from django.conf.urls import include, url
from django.contrib import admin

# VIEWS
from . import views


#STATIC
from django.conf import settings
from django.conf.urls.static import static

from django.views import generic



urlpatterns = [
    path('menu_cuso_controlinsular', views.menu_cuso_controlinsular, name='menu_cuso_controlinsular'),
    
    #paths templates
    path('control_turista', views.control_turista, name='control_turista'),
    path('control_pesca', views.control_pesca, name='control_pesca'),
    path('control_contenedores', views.control_contenedores, name='control_contenedores'),
    path('control_patrullaje', views.control_patrullaje, name='control_patrullaje'),
    path('control_aeropuerto_iguanas', views.control_aeropuerto_iguanas, name='control_aeropuerto_iguanas'),
    path('control_aeropuerto_recorridos', views.control_aeropuerto_recorridos, name='control_aeropuerto_recorridos'),
    path('control_aeropuerto_principal', views.control_aeropuerto_principal, name='control_aeropuerto_principal'),
    path('cronograma', views.Cuso_cronograma, name='cronograma'),

    #Control Acta de ingreso de turistas - Sitios
    path('data_ParamActaControlTuristas/',views.data_ParamActaControlTuristas, name = 'data_ParamActaControlTuristas'),
    path('editActaVisitaCuso/',views.editActaVisitaCuso, name = 'editActaVisitaCuso'),
    path('editActaTuristaSitio/',views.editActaTuristaSitio, name = 'editActaTuristaSitio'),
       
    #Control Acta de control de pesca - Especies
    path('data_ParamActaControlPesca/',views.data_ParamActaControlPesca, name = 'data_ParamActaControlPesca'),
    path('editActaControlPesca/',views.editActaControlPesca, name = 'editActaControlPesca'),
    path('editActaPescaEspecie/',views.editActaPescaEspecie, name = 'editActaPescaEspecie'),
    
    #Inspeccion de Contenedores
    path('data_ParamActaControlContenedores/',views.data_ParamActaControlContenedores, name = 'data_ParamActaControlContenedores'),
    path('editActaControlContenedores/',views.editActaControlContenedores, name = 'editActaControlContenedores'),

    #Control de patrullaje general - Hitos - Sitios
    path('data_ParamActaControlPatrullaje/',views.data_ParamActaControlPatrullaje, name = 'data_ParamActaControlPatrullaje'),
    path('editActaControlPatrullaje/',views.editActaControlPatrullaje, name = 'editActaControlPatrullaje'),
    path('editActaControlPatrullajeHito/',views.editActaControlPatrullajeHito, name = 'editActaControlPatrullajeHito'),
    path('editActaControlPatrullajeSitio/',views.editActaControlPatrullajeSitio, name = 'editActaControlPatrullajeSitio'),

    #Control de aeropuerto principal - Guias - Muestras - Vuelos
    path('data_ParamActaControlAeropuerto/',views.data_ParamActaControlAeropuerto, name = 'data_ParamActaControlAeropuerto'),
    path('editActaControlAeropuerto/',views.editActaControlAeropuerto, name = 'editActaControlAeropuerto'),
    path('editActaControlAeropuertoGuias/',views.editActaControlAeropuertoGuias, name = 'editActaControlAeropuertoGuias'),
    path('editActaControlAeropuertoMuestras/',views.editActaControlAeropuertoMuestras, name = 'editActaControlAeropuertoMuestras'),
    path('editActaControlAeropuertoVuelos/',views.editActaControlAeropuertoVuelos, name = 'editActaControlAeropuertoVuelos'),
    
    #Control de aeropuerto - Iguanas
    path('data_ParamActaControlAeropuertoIguanas/',views.data_ParamActaControlAeropuertoIguanas, name = 'data_ParamActaControlAeropuertoIguanas'),
    path('editActaControlAeropuertoIguana/',views.editActaControlAeropuertoIguana, name = 'editActaControlAeropuertoIguana'),
 
    #Control de aeropuerto - Recorridos
    path('data_ParamActaControlAeropuertoRecorridos/',views.data_ParamActaControlAeropuertoRecorridos, name = 'data_ParamActaControlAeropuertoRecorridos'),
    path('editActaControlAeropuertoRecorridos/',views.editActaControlAeropuertoRecorridos, name = 'editActaControlAeropuertoRecorridos'),

    
    #Configuraciones - Sitios
    path('cin_config_sitios', views.cin_config_sitios, name='cin_config_sitios'),

    #Popus - busquedas
    path('data_ParamGuia/', views.data_ParamGuia, name='data_ParamGuia'),
    path('data_ParamEmbarcacion/',views.data_ParamEmbarcacion, name = 'data_ParamEmbarcacion'),
    path('data_ParamPasajero/',views.data_ParamPasajero, name = 'data_ParamPasajero'),
    path('data_ParamSitio/',views.data_ParamSitio, name = 'data_ParamSitio'),
    path('data_ParamPescador/',views.data_ParamPescador, name = 'data_ParamPescador'),
    path('data_ParamEmbarcacionPesquera/',views.data_ParamEmbarcacionPesquera, name = 'data_ParamEmbarcacionPesquera'),
	path('data_ParamEspecie/',views.data_ParamEspecie, name = 'data_ParamEspecie'),
	path('data_ParamHito/',views.data_ParamHito, name = 'data_ParamHito'),
   

    

    


   
    
    
    
    
    
    

]
