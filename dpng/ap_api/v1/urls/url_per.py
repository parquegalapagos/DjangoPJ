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
    
    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    # PER_PERSONA
    path('api/v1/perpersona_list/', vw_per.PerPersonaViewSet.as_view(),name='PerPersonaViewSet'),
    path('api/v1/perpersona_label/', vw_per.PerPersonaViewSet3.as_view(),name='PerPersonaViewSet3'),
    path('api/v1/perpersona_list_label/', vw_per.PerPersonaViewSetLabel.as_view(),name='PerPersonaViewSetLabel'),
    path('api/v1/perpersona_fun_list/', vw_per.PerPersonaViewSet2.as_view(),name='PerPersonaViewSet2'),
    path('api/v1/perpersona/',vw_per.Get_post_perpersona.as_view(),name='Get_post_perpersona'),
    re_path(r'^api/v1/perpersona/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perpersona.as_view(), name='Get_delete_update_perpersona'),
    path('api/v1/perpersonafuncionario/',vw_per.Get_post_perpersona_funcionario.as_view(),name='Get_post_perpersona_funcionario'),
    re_path(r'^api/v1/perpersonafuncionario/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perpersona_funcionario.as_view(), name='Get_delete_update_perpersona_funcionario'),

    # PER_FUNCIONARIO
    path('api/v1/perfuncionario_list/', vw_per.PerFuncionarioViewSet.as_view(),name='PerFuncionarioViewSet'),
    
    path('api/v1/perfuncionariodata_list/', vw_per.PerFuncionarioViewSetData.as_view(),name='PerFuncionarioViewSetData'),
    path('api/v1/perfuncionario/',vw_per.Get_post_perfuncionario.as_view(),name='Get_post_perfuncionario'),
    re_path(r'^api/v1/perfuncionario/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perfuncionario.as_view(), name='Get_delete_update_perfuncionario'),
    path('api/v1/perfuncionario_selectbox/',vw_per.PerFuncionario_selectbox.as_view(),name='PerFuncionario_selectbox'),
    path('api/v1/perfuncionario_selectbox2/',vw_per.PerFuncionario_selectbox2.as_view(),name='PerFuncionario_selectbox2'),

    # PER_FUNCIONARIOSANCIONES
    path('api/v1/perfuncionariosanciones_list/', vw_per.PerFuncionarioSancionesViewSet.as_view(),name='PerFuncionarioSancionesViewSet'),
    path('api/v1/perfuncionariosanciones/',vw_per.Get_post_perfuncionariosanciones.as_view(),name='Get_post_perfuncionariosanciones'),
    re_path(r'^api/v1/perfuncionariosanciones/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perfuncionariosanciones.as_view(), name='Get_delete_update_perfuncionariosanciones'),

    # PER_LICENCIAACCIONES
    path('api/v1/perlicenciaacciones_list/', vw_per.PerLicenciaAccionesViewSet.as_view(),name='PerLicenciaAccionesViewSet'),
    path('api/v1/perlicenciaacciones/',vw_per.Get_post_perlicenciaacciones.as_view(),name='Get_post_perlicenciaacciones'),
    re_path(r'^api/v1/perlicenciaacciones/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perlicenciaacciones.as_view(), name='Get_delete_update_perlicenciaacciones'),

    # PerFuncionarioAccionpersonal_traspasosACCIONES
    path('api/v1/pertraspasoacciones_list/', vw_per.PerTraspasoAccionesViewSet.as_view(),name='PerTraspasoAccionesViewSet'),
    path('api/v1/pertraspasoacciones/',vw_per.Get_post_pertraspasoacciones.as_view(),name='Get_post_pertraspasoacciones'),
    re_path(r'^api/v1/pertraspasoacciones/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_pertraspasoacciones.as_view(), name='Get_delete_update_pertraspasoacciones'),


    # PER_INGRESOSACCIONES
    path('api/v1/peringresosacciones_list/', vw_per.PerIngresosAccionesViewSet.as_view(),name='PerIngresosAccionesViewSet'),
    path('api/v1/peringresosacciones/',vw_per.Get_post_peringresosacciones.as_view(),name='Get_post_peringresosacciones'),
    re_path(r'^api/v1/peringresosacciones/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_peringresosacciones.as_view(), name='Get_delete_update_peringresosacciones'),
    
    # PER_PERSONA_CUENTA
    path('api/v1/perpersonacuenta_list/', vw_per.PerPersonaCuentaViewSet.as_view(),name='PerPersonaCuentaViewSet'),
    path('api/v1/perpersonacuenta/',vw_per.Get_post_perpersonacuenta.as_view(),name='Get_post_perpersonacuenta'),
    re_path(r'^api/v1/perpersonacuenta/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perpersonacuenta.as_view(), name='Get_delete_update_perpersonacuenta'),

    # PER_PERSONA_FAMILIARES
    path('api/v1/perfuncionariofamiliares_list/', vw_per.PerFuncionarioFamiliaresViewSet.as_view(),name='PerFuncionarioFamiliaresViewSet'),
    path('api/v1/perfuncionariofamiliares/',vw_per.Get_post_perfuncionariofamiliares.as_view(),name='Get_post_perfuncionariofamiliares'),
    re_path(r'^api/v1/perfuncionariofamiliares/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perfuncionariofamiliares.as_view(), name='Get_delete_update_perfuncionariofamiliares'),

    # PER_ACCIDENTES
    path('api/v1/peraccidentes_list/', vw_per.PerAccidentesViewSet.as_view(),name='PerAccidentesViewSet'),
    path('api/v1/peraccidentes/',vw_per.Get_post_peraccidentes.as_view(),name='Get_post_peraccidentes'),
    re_path(r'^api/v1/peraccidentes/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_peraccidentes.as_view(), name='Get_delete_update_peraccidentes'),
    
    # PER_DISCAPACIDADES
    path('api/v1/perdiscapacidades_list/', vw_per.PerDiscapacidadesViewSet.as_view(),name='PerDiscapacidadesViewSet'),
    path('api/v1/perdiscapacidades/',vw_per.Get_post_perdiscapacidades.as_view(),name='Get_post_perdiscapacidades'),
    re_path(r'^api/v1/perdiscapacidades/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perdiscapacidades.as_view(), name='Get_delete_update_perdiscapacidades'),
   
    # PER_ENFERMEDADES
    path('api/v1/perenfermedades_list/', vw_per.PerEnfermedadesViewSet.as_view(),name='PerEnfermedadesViewSet'),
    path('api/v1/perenfermedades/',vw_per.Get_post_perenfermedades.as_view(),name='Get_post_perenfermedades'),
    re_path(r'^api/v1/perenfermedades/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perenfermedades.as_view(), name='Get_delete_update_perenfermedades'),

     # PER_ETNIAS
    path('api/v1/peretnias_list/', vw_per.PerEtniasViewSet.as_view(),name='PerEtniasViewSet'),
    path('api/v1/peretnias/',vw_per.Get_post_peretnias.as_view(),name='Get_post_peretnias'),
    re_path(r'^api/v1/peretnias/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_peretnias.as_view(), name='Get_delete_update_peretnias'),


    # PER_FUNCIONARIOACCIONPERSONAL
    path('api/v1/perfuncionarioaccionpersonal_list/',vw_per.PerFuncionarioAccionpersonalViewSet.as_view(),name='PerFuncionarioAccionpersonalViewSet'),
    path('api/v1/PerFuncionarioAccionpersonal_ingresos/',vw_per.PerFuncionarioAccionpersonal_ingresos.as_view(),name='PerFuncionarioAccionpersonal_ingresos'),
    path('api/v1/PerFuncionarioAccionpersonal_licencias/',vw_per.PerFuncionarioAccionpersonal_licencias.as_view(),name='PerFuncionarioAccionpersonal_licencias'),
    path('api/v1/PerFuncionarioAccionpersonal_traspasos/',vw_per.PerFuncionarioAccionpersonal_traspasos.as_view(),name='PerFuncionarioAccionpersonal_traspasos'),
    path('api/v1/PerFuncionarioAccionpersonal_encargos/',vw_per.PerFuncionarioAccionpersonal_encargos.as_view(),name='PerFuncionarioAccionpersonal_encargos'),
    path('api/v1/perfuncionarioaccionpersonal/',vw_per.Get_post_perfuncionarioaccionpersonal.as_view(),name='Get_post_perfuncionarioaccionpersonal'),
    re_path(r'^api/v1/perfuncionarioaccionpersonal/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perfuncionarioaccionpersonal.as_view(), name='Get_delete_update_perfuncionarioaccionpersonal'),

    # PER_FUNCIONARIOCARNET
    path('api/v1/PerFuncionarioCarnet_list/', vw_per.PerFuncionarioCarnetViewSet.as_view(),name='PerFuncionarioCarnetViewSet'),
    path('api/v1/perfuncionariocarnet/',vw_per.Get_post_perfuncionariocarnet.as_view(),name='Get_post_perfuncionariocarnet'),
    re_path(r'^api/v1/perfuncionariocarnet/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perfuncionariocarnet.as_view(), name='Get_delete_update_perfuncionariocarnet'),
    path('api/v1/PerFuncionarioCarnet_list/', vw_per.PerFuncionarioCarnetViewSet.as_view(),name='PerFuncionarioCarnetViewSet'),

    # PER_FUNCIONARIOPERMISOS   
    path('api/v1/PerFuncionarioPermisos_list/', vw_per.PerFuncionarioPermisosViewSet.as_view(),name='PerFuncionarioPermisosViewSet'),
    path('api/v1/perfuncionariopermisos/',vw_per.Get_post_perfuncionariopermisos.as_view(),name='Get_post_perfuncionariopermisos'),
    re_path(r'^api/v1/perfuncionariopermisos/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perfuncionariopermisos.as_view(), name='Get_delete_update_perfuncionariopermisos'),

    # PER_FUNCIONARIOCONTROLESRRHH   
    path('api/v1/perFuncionarioControlesRrhh_list/', vw_per.PerFuncionarioControlesRrhhViewSet.as_view(),name='PerFuncionarioControlesRrhhViewSet'),
    path('api/v1/perfuncionariocontrolesrrhh/',vw_per.Get_post_perfuncionariocontrolesrrhh.as_view(),name='Get_post_perfuncionariocontrolesrrhh'),
    re_path(r'^api/v1/perfuncionariocontrolesrrhh/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perfuncionariocontrolesrrhh.as_view(), name='Get_delete_update_perfuncionariocontrolesrrhh'),


   
    

]