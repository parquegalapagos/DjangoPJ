# Django
from django.urls import path, re_path
from django.conf.urls import include, url

# JWT
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token

# Local
from ap_api.v1.views import *

urlpatterns = [
    
  #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CIN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
  #cin_controlturista
  path('api/v1/cincontrolturista_list/',vw_cin.CinControlturistasViewSet.as_view(),name='CinControlturistasViewSet'),
  re_path(r'^api/v1/cincontrolturista/(?P<pk>[0-9A-Fa-f-]+)$',vw_cin.Get_delete_update_CinControlturistas.as_view(), name='Get_delete_update_CinControlturistas'),
  path('api/v1/cincontrolturista/', vw_cin.Get_post_CinControlturistas.as_view(), name='Get_post_CinControlturistas'),

  #cin_controlturista-sitio
  path('api/v1/cincontrolturistasitio_list/',vw_cin.CinControlTuristaSitioViewSet.as_view(),name='CinControlTuristaSitioViewSet'),
  re_path(r'^api/v1/cincontrolturistasitio/(?P<pk>[0-9A-Fa-f-]+)$',vw_cin.Get_delete_update_CinControlTuristaSitio.as_view(), name='Get_delete_update_CinControlTuristaSitio'),
  path('api/v1/cincontrolturistasitio/', vw_cin.Get_post_CinControlTuristaSitio.as_view(), name='Get_post_CinControlTuristaSitio'),

  #control pesca
  path('api/v1/cincontrolpesca_list/',vw_cin.CinControlPescaViewSet.as_view(),name='CinControlPescaViewSet'),
	re_path(r'^api/v1/cincontrolpesca/(?P<pk>[0-9A-Fa-f-]+)$',vw_cin.Get_delete_update_CinControlPesca.as_view(), name='Get_delete_update_CinControlPesca'),
	path('api/v1/cincontrolpesca/', vw_cin.Get_post_CinControlPesca.as_view(), name='Get_post_CinControlPesca'),    
   
  #control pesca-especie
  path('api/v1/cincontrolpescaespecie_list/',vw_cin.CinControlPescaEspecieViewSet.as_view(),name='CinControlPescaEspecieViewSet'),
  re_path(r'^api/v1/cincontrolpescaespecie/(?P<pk>[0-9A-Fa-f-]+)$',vw_cin.Get_delete_update_CinControlPescaEspecie.as_view(), name='Get_delete_update_CinControlPescaEspecie'),
  path('api/v1/cincontrolpescaespecie/', vw_cin.Get_post_CinControlPescaEspecie.as_view(), name='Get_post_CinControlPescaEspecie'),

  #control patrullaje
  path('api/v1/cincontrolpatrullaje_list/',vw_cin.CinControlPatrullajeViewSet.as_view(),name='CinControlPatrullajeViewSet'),
  re_path(r'^api/v1/cincontrolpatrullaje/(?P<pk>[0-9A-Fa-f-]+)$',vw_cin.Get_delete_update_CinControlPatrullaje.as_view(), name='Get_delete_update_CinControlPatrullaje'),
  path('api/v1/cincontrolpatrullaje/', vw_cin.Get_post_CinControlPatrullaje.as_view(), name='Get_post_CinControlPatrullaje'),

  #control patrullaje - sitio
  path('api/v1/cincontrolsitiopatrullaje_list/',vw_cin.CinControlSitioPatrullajeViewSet.as_view(),name='CinControlSitioPatrullajeViewSet'),
  re_path(r'^api/v1/cincontrolsitiopatrullaje/(?P<pk>[0-9A-Fa-f-]+)$',vw_cin.Get_delete_update_CinControlSitioPatrullaje.as_view(), name='Get_delete_update_CinControlSitioPatrullaje'),
  path('api/v1/cincontrolsitiopatrullaje/', vw_cin.Get_post_CinControlSitioPatrullaje.as_view(), name='Get_post_CinControlSitioPatrullaje'),

  #control patrullaje - hito
  path('api/v1/cincontrolhitopatrullaje_list/',vw_cin.CinControlHitoPatrullajeViewSet.as_view(),name='CinControlHitoPatrullajeViewSet'),
  re_path(r'^api/v1/cincontrolhitopatrullaje/(?P<pk>[0-9A-Fa-f-]+)$',vw_cin.Get_delete_update_CinControlHitoPatrullaje.as_view(), name='Get_delete_update_CinControlHitoPatrullaje'),
  path('api/v1/cincontrolhitopatrullaje/', vw_cin.Get_post_CinControlHitoPatrullaje.as_view(), name='Get_post_CinControlHitoPatrullaje'),
  
  #control patrullaje - novedad
  path('api/v1/cincontrolnovedadpatrullaje_list/',vw_cin.CinControlNovedadPatrullajeViewSet.as_view(),name='CinControlNovedadPatrullajeViewSet'),
  re_path(r'^api/v1/cincontrolnovedadpatrullaje/(?P<pk>[0-9A-Fa-f-]+)$',vw_cin.Get_delete_update_CinControlNovedadPatrullaje.as_view(), name='Get_delete_update_CinControlNovedadPatrullaje'),
  path('api/v1/cincontrolnovedadpatrullaje/', vw_cin.Get_post_CinControlNovedadPatrullaje.as_view(), name='Get_post_CinControlNovedadPatrullaje'),
  
  #inspeccion de contenedores
  path('api/v1/cininspeccioncontenedores_list/',vw_cin.CinInspeccionContenedoresViewSet.as_view(),name='CinInspeccionContenedoresViewSet'),
  re_path(r'^api/v1/cininspeccioncontenedores/(?P<pk>[0-9A-Fa-f-]+)$',vw_cin.Get_delete_update_CinInspeccionContenedores.as_view(), name='Get_delete_update_CinInspeccionContenedores'),
  path('api/v1/cininspeccioncontenedores/', vw_cin.Get_post_CinInspeccionContenedores.as_view(), name='Get_post_CinInspeccionContenedores'),    

  #control aeropuerto principal
  path('api/v1/cincontrolaeropuerto_list/',vw_cin.CinControlAeropuertoViewSet.as_view(),name='CinControlAeropuertoViewSet'),
  re_path(r'^api/v1/cincontrolaeropuerto/(?P<pk>[0-9A-Fa-f-]+)$',vw_cin.Get_delete_update_CinControlAeropuerto.as_view(), name='Get_delete_update_CinControlAeropuerto'),
  path('api/v1/cincontrolaeropuerto/', vw_cin.Get_post_CinControlAeropuerto.as_view(), name='Get_post_CinControlAeropuerto'),    

  #control aeropuerto principal-registro-guias
  path('api/v1/cincontrolaeropuertoguias_list/',vw_cin.CinControlAeropuertoGuiasViewSet.as_view(),name='CinControlAeropuertoGuiasViewSet'),
  re_path(r'^api/v1/cincontrolaeropuertoguias/(?P<pk>[0-9A-Fa-f-]+)$',vw_cin.Get_delete_update_CinControlAeropuertoGuias.as_view(), name='Get_delete_update_CinControlAeropuertoGuias'),
  path('api/v1/cincontrolaeropuertoguias/', vw_cin.Get_post_CinControlAeropuertoGuias.as_view(), name='Get_post_CinControlAeropuertoGuias'),    

  #control aeropuerto principal-registro-muestras
  path('api/v1/cincontrolaeropuertomuestras_list/',vw_cin.CinControlAeropuertoMuestrasViewSet.as_view(),name='CinControlAeropuertoMuestrasViewSet'),
  re_path(r'^api/v1/cincontrolaeropuertomuestras/(?P<pk>[0-9A-Fa-f-]+)$',vw_cin.Get_delete_update_CinControlAeropuertoMuestras.as_view(), name='Get_delete_update_CinControlAeropuertoMuestras'),
  path('api/v1/cincontrolaeropuertomuestras/', vw_cin.Get_post_CinControlAeropuertoMuestras.as_view(), name='Get_post_CinControlAeropuertoMuestras'),    

  #control aeropuerto principal-registro-vuelos
  path('api/v1/cincontrolaeropuertovuelos_list/',vw_cin.CinControlAeropuertoVuelosViewSet.as_view(),name='CinControlAeropuertoVuelosViewSet'),
  re_path(r'^api/v1/cincontrolaeropuertovuelos/(?P<pk>[0-9A-Fa-f-]+)$',vw_cin.Get_delete_update_CinControlAeropuertoVuelos.as_view(), name='Get_delete_update_CinControlAeropuertoVuelos'),
  path('api/v1/cincontrolaeropuertovuelos/', vw_cin.Get_post_CinControlAeropuertoVuelos.as_view(), name='Get_post_CinControlAeropuertoVuelos'),    

  #control aeropuerto iguanas
  path('api/v1/cincontrolaeropuertoiguanas_list/',vw_cin.CinControlAeropuertoIguanasViewSet.as_view(),name='CinControlAeropuertoIguanasViewSet'),
  re_path(r'^api/v1/cincontrolaeropuertoiguanas/(?P<pk>[0-9A-Fa-f-]+)$',vw_cin.Get_delete_update_CinControlAeropuertoIguanas.as_view(), name='Get_delete_update_CinControlAeropuertoIguanas'),
  path('api/v1/cincontrolaeropuertoiguanas/', vw_cin.Get_post_CinControlAeropuertoIguanas.as_view(), name='Get_post_CinControlAeropuertoIguanas'),    

   #control aeropuerto recorridos
  path('api/v1/cincontrolaeropuertorecorridos_list/',vw_cin.CinControlAeropuertoRecorridosViewSet.as_view(),name='CinControlAeropuertoRecorridosViewSet'),
  re_path(r'^api/v1/cincontrolaeropuertorecorridos/(?P<pk>[0-9A-Fa-f-]+)$',vw_cin.Get_delete_update_CinControlAeropuertoRecorridos.as_view(), name='Get_delete_update_CinControlAeropuertoRecorridos'),
  path('api/v1/cincontrolaeropuertorecorridos/', vw_cin.Get_post_CinControlAeropuertoRecorridos.as_view(), name='Get_post_CinControlAeropuertoRecorridos'),    

  #Funcionarios COntrol Insular
  path('api/v1/cinfuncionarios_list/',vw_cin.CinFuncionariosViewSet.as_view(),name='CinFuncionariosViewSet'),
  re_path(r'^api/v1/cinfuncionarios/(?P<pk>[0-9A-Fa-f-]+)$',vw_cin.Get_delete_update_CinFuncionarios.as_view(), name='Get_delete_update_CinFuncionarios'),
  path('api/v1/cinfuncionarios/', vw_cin.Get_post_CinFuncionarios.as_view(), name='Get_post_CinFuncionarios'),    
   
  #Limites - hitos
  path('api/v1/cinhitos_list/',vw_cin.CinHitosViewSet.as_view(),name='CinHitosViewSet'),
  re_path(r'^api/v1/cinhitos/(?P<pk>[0-9A-Fa-f-]+)$',vw_cin.Get_delete_update_CinHitos.as_view(), name='Get_delete_update_CinHitos'),
  path('api/v1/cinhitos/', vw_cin.Get_post_CinHitos.as_view(), name='Get_post_CinHitos'),    
  
]