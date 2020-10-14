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
    path('menu_cuemManejopesquero', views.menu_cuemManejopesquero, name='menu_cuemManejopesquero'),
    path('data_cuem_masters_pescadores', views.data_cuem_masters_pescadores, name='data_cuem_masters_pescadores'),
    
    path('SL_cuem_pescadores', views.SL_cuem_pescadores, name='SL_cuem_pescadores'),
    path('SL_cuem_parma', views.SL_cuem_parma, name='SL_cuem_parma'),
    #path('SL_cuem_embarcacionpesca', views.SL_cuem_embarcacionpesca, name='SL_cuem_embarcacionpesca'),
    #path('SL_cuem_permisopesca', views.SL_cuem_permisopesca, name='SL_cuem_permisopesca'),

    path('SL_cuem_embarcacionespescaPesca', views.SL_cuem_embarcacionespescaPesca, name='SL_cuem_embarcacionespescaPesca'),
    path('get_lista_pescadores', views.get_lista_pescadores, name='get_lista_pescadores'),
    path('get_data_pescador', views.get_data_pescador, name='get_data_pescador'),
    
    path('pescador_data', views.pescador_data, name='pescador_data'),

    path('get_lista_licenciaparma', views.get_lista_licenciaparma, name='get_lista_licenciaparma'),
    path('get_data_licenciaparma', views.get_data_licenciaparma, name='get_licenciaparma'),
    path('get_historialparma', views.get_historialparma, name='get_historialparma'),

    path('SL_cuem_inspeccionTecnicaEmbarcacion', views.SL_cuem_inspeccionTecnicaEmbarcacion, name='SL_cuem_inspeccionTecnicaEmbarcacion'),
    path('get_lista_inspecciontecnicaembarcacion', views.get_lista_inspecciontecnicaembarcacion, name='get_lista_inspecciontecnicaembarcacion'),
    path('get_data_inspecciontecnicaembarcacion', views.get_data_inspecciontecnicaembarcacion, name='get_data_inspecciontecnicaembarcacion'),

    path('data_cuem_masters_embarcaciones', views.data_cuem_masters_embarcaciones, name='data_cuem_masters_embarcaciones'),
    path('get_lista_embarcacionesPesca', views.get_lista_embarcacionesPesca, name='get_lista_embarcacionesPesca'),
    path('get_data_embarcacionpesca', views.get_data_embarcacionpesca, name='get_data_embarcacionpesca'),
    path('get_historialpermisopesca', views.get_historialpermisopesca, name='get_historialpermisopesca'),

    path('SL_cuem_permisopesca', views.SL_cuem_permisopesca, name='SL_cuem_permisopesca'),
    path('get_lista_permisopesca', views.get_lista_permisopesca, name='get_lista_permisopesca'),
    path('get_data_permisopesca', views.get_data_permisopesca, name='get_data_permisopesca'),

    path('SL_cuem_solicitante', views.SL_cuem_solicitante, name='SL_cuem_solicitante'),

    path('upload_files_json', views.upload_files_json, name='upload_files_json'),
    path('delete_files_cueminiciartramite', views.delete_files_cueminiciartramite, name='delete_files_cueminiciartramite'),
    
    #path('get_historialparma', views.get_historialparma, name='get_historialparma'),
    
]
