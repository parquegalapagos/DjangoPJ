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
    path('menu_cuso_controlmarino', views.menu_cuso_controlmarino, name='menu_cuso_controlmarino'),
    path('infonovedades', views.Cuso_info_novedades, name='infonovedades'),
    path('infomonitoreos', views.Cuso_info_monitoreo, name='infomonitoreos'),
    path('planpatrulla', views.Cuso_plan_patrulla, name='planpatrulla'),
    
    path('cro_controlmarino', views.Cuso_controlpersonal, name='cro_controlmarino'),
    path('infodiario', views.Cuso_info_diario, name='infodiario'),
    path('acta_retencion', views.Cuso_acta_retencion, name='acta_retencion'),
    path('acta_visita_cuso', views.Cuso_acta_avistamineto, name='acta_visita_cuso'),
    path('acta_inspec_cuso', views.Cuso_acta_inspeccion, name='acta_inspec_cuso'),
    path('data_actavisitaParam', views.data_actavisitaParam, name='data_actavisitaParam'),
	path('actavisita_data', views.actavisita_data, name='actavisita_data'),
	path('data_actainspecParam', views.data_actainspecParam, name='data_actainspecParam'),
	path('actainspec_data', views.actainspec_data, name='actainspec_data'),
	path('update_General_post', views.update_General_post, name='update_General_post'),
	path('insert_General_post', views.insert_General_post, name='insert_General_post'),
	path('data_infoNovedadesCabCuso',views.data_infoNovedadesCabCuso, name='data_infoNovedadesCabCuso'),
	path('data_infoNovedadesCabParamCuso',views.data_infoNovedadesCabParamCuso, name='data_infoNovedadesCabParamCuso'),
	path('data_infoMonitoreoCabCuso',views.data_infoMonitoreoCabCuso, name='data_infoMonitoreoCabCuso'),
	path('data_infoMonitoreoCabParamCuso',views.data_infoMonitoreoCabParamCuso, name='data_infoMonitoreoCabParamCuso'),
	path('get_lista_embPat',views.get_lista_embPat, name='get_lista_embPat'),
	path('data_planpatrullaCabCuso',views.data_planpatrullaCabCuso, name='data_planpatrullaCabCuso'),
	path('data_planpatrullaCabParamCuso',views.data_planpatrullaCabParamCuso, name='data_planpatrullaCabParamCuso'),
	path('data_actaretencionCabCuso',views.data_actaretencionCabCuso, name='data_actaretencionCabCuso'),
	path('data_actaretencionCabParamCuso',views.data_actaretencionCabParamCuso, name='data_actaretencionCabParamCuso'),
	path('data_funcionariosactividades',views.data_funcionariosactividades, name='data_funcionariosactividades'),
	path('data_diasfuncionariosactividades',views.data_diasfuncionariosactividades, name='data_diasfuncionariosactividades'),
	path('data_parametrosconfig',views.data_parametrosconfig, name='data_parametrosconfig'),
	path('data_controlpersonal',views.data_controlpersonal, name='data_controlpersonal'),
	path('data_diasfuncionariosCm',views.data_diasfuncionariosCm, name='data_diasfuncionariosCm'),
	path('data_actividadescronogramaCm',views.data_actividadescronogramaCm, name='data_actividadescronogramaCm'),

	path('data_secinfoDiarioCab',views.data_secinfoDiarioCab, name='data_secinfoDiarioCab'),
	path('data_infoDiarioCab',views.data_infoDiarioCab, name='data_infoDiarioCab'),
	path('data_infoDiarioCabParamCuso',views.data_infoDiarioCabParamCuso, name='data_infoDiarioCabParamCuso'),
	path('data_secinfoDiarioCab',views.data_secinfoDiarioCab, name='data_secinfoDiarioCab'),
]
