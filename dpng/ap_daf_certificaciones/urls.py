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
    path('menu_dafcertificaciones', views.menu_dafcertificaciones, name='menu_dafcertificaciones'),
    path('SL_daf_certificacionesIniciarTramites', views.SL_daf_certificacionesIniciarTramites, name='SL_daf_certificacionesIniciarTramites'),
    path('SL_daf_certificacionesBandeja', views.SL_daf_certificacionesBandeja, name='SL_daf_certificacionesBandeja'),
    path('SL_daf_certificacionesEstadoTramite', views.SL_daf_certificacionesEstadoTramite, name='SL_daf_certificacionesEstadoTramite'),
    
    path('data_certificadosParam', views.data_certificadosParam, name='data_certificadosParam'),
    path('data_certificados', views.data_certificados, name='data_certificados'),
    path('notificaciones_certificaciones', views.notificaciones_certificaciones, name='notificaciones_certificaciones'),
    path('get_correo_funcionario_tramite', views.get_correo_funcionario_tramite, name='get_correo_funcionario_tramite'),

    path('upload_files_json', views.upload_files_json, name='upload_files_json'),
    path('upload_files_cert', views.upload_files_cert, name='upload_files_cert'),
    path('delete_files_cert', views.delete_files_cert, name='delete_files_cert'),
    path('get_funcionarioByRol', views.get_funcionarioByRol, name='get_funcionarioByRol'),
    
]
