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
    
    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GTH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    # GTH_CARGODISTRIBUTIVO
    path('api/v1/gthcargodistributivo_list/', vw_gth.GthCargoDistributivoViewSet.as_view(),name='GthCargoDistributivoViewSet'),
    re_path(r'^api/v1/gthcargodistributivo/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthcargodistributivo.as_view(), name='Get_delete_update_gthcargodistributivo'),
    path('api/v1/gthcargodistributivo/', vw_gth.Get_post_gthcargodistributivo.as_view(), name='Get_post_gthcargodistributivo'),

    # GTH_CARGOFUNCIONAL
    path('api/v1/gthcargofuncional_list/', vw_gth.GthCargoFuncionalViewSet.as_view(),name='GthCargoFuncionalViewSet'),
    re_path(r'^api/v1/gthcargofuncional/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthcargofuncional.as_view(), name='Get_delete_update_gthcargofuncional'),
    path('api/v1/gthcargofuncional/', vw_gth.Get_post_gthcargofuncional.as_view(), name='Get_post_gthcargofuncional'),

    # GTH_CARGOINSTITUCIONAL
    path('api/v1/gthcargoinstitucional_list/', vw_gth.GthCargoInstitucionalViewSet.as_view(),name='GthCargoInstitucionalViewSet'),
    re_path(r'^api/v1/gthcargoinstitucional/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthcargoinstitucional.as_view(), name='Get_delete_update_gthcargoinstitucional'),
    path('api/v1/gthcargoinstitucional/', vw_gth.Get_post_gthcargoinstitucional.as_view(), name='Get_post_gthcargoinstitucional'),

    # GTH_CARGOOCUPACIONAL
    path('api/v1/gthcargoocupacional_list/', vw_gth.GthCargoOcupacionalViewSet.as_view(),name='GthCargoOcupacionalViewSet'),
    re_path(r'^api/v1/gthcargoocupacional/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthcargoocupacional.as_view(), name='Get_delete_update_gthcargoocupacional'),
    path('api/v1/gthcargoocupacional/', vw_gth.Get_post_gthcargoocupacional.as_view(), name='Get_post_gthcargoocupacional'),

    # GTH_BASENOmbramiento
    path('api/v1/gthbasenombramiento_list/', vw_gth.GthBaseNombramientoViewSet.as_view(),name='GthBaseNombramientoViewSet'),

    # GTH_COMISIONES
    path('api/v1/gthcomisiones_list/', vw_gth.GthComisionesViewSet.as_view(),name='GthComisionesViewSet'),
    re_path(r'^api/v1/gthcomisiones/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthcomisiones.as_view(), name='Get_delete_update_gthcomisiones'),
    path('api/v1/gthcomisiones/', vw_gth.Get_post_gthcomisiones.as_view(), name='Get_post_gthcomisiones'),

    # GTH_LICENCIAS
    path('api/v1/gthlicencias_list/', vw_gth.GthLicenciasViewSet.as_view(),name='GthLicenciasViewSet'),
    re_path(r'^api/v1/gthlicencias/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthlicencias.as_view(), name='Get_delete_update_gthlicencias'),
    path('api/v1/gthlicencias/', vw_gth.Get_post_gthlicencias.as_view(), name='Get_post_gthlicencias'),

    # GTH_MODALIDADLABORAL
    path('api/v1/gthmodalidadlaboral_list/', vw_gth.GthModalidadLaboralViewSet.as_view(),name='GthModalidadLaboralViewSet'),
    re_path(r'^api/v1/gthmodalidadlaboral/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthmodalidadlaboral.as_view(), name='Get_delete_update_gthmodalidadlaboral'),
    path('api/v1/gthmodalidadlaboral/', vw_gth.Get_post_gthmodalidadlaboral.as_view(), name='Get_post_gthmodalidadlaboral'),

    # GTH_REGIMENLABORAL
    path('api/v1/gthregimenlaboral_list/', vw_gth.GthRegimenLaboralViewSet.as_view(),name='GthRegimenLaboralViewSet'),
    re_path(r'^api/v1/gthregimenlaboral/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthregimenlaboral.as_view(), name='Get_delete_update_gthregimenlaboral'),
    path('api/v1/gthregimenlaboral/', vw_gth.Get_post_gthregimenlaboral.as_view(), name='Get_post_gthregimenlaboral'),

    # GTH_ROLLABORAL
    path('api/v1/gthrollaboral_list/', vw_gth.GthRolLaboralViewSet.as_view(),name='GthRolLaboralViewSet'),
    re_path(r'^api/v1/gthrollaboral/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthrollaboral.as_view(), name='Get_delete_update_gthrollaboral'),
    path('api/v1/gthrollaboral/', vw_gth.Get_post_gthrollaboral.as_view(), name='Get_post_gthrollaboral'),

    # GTH_SANCIONES
    path('api/v1/gthsanciones_list/', vw_gth.GthSancionesViewSet.as_view(),name='GthSancionesViewSet'),
    re_path(r'^api/v1/gthsanciones/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthsanciones.as_view(), name='Get_delete_update_gthsanciones'),
    path('api/v1/gthsanciones/', vw_gth.Get_post_gthsanciones.as_view(), name='Get_post_gthsanciones'),
    
    # GTH_ACCIONPERSONAL
    path('api/v1/gthaccionpersonal_list/', vw_gth.GthAccionPersonalViewSet.as_view(),name='GthAccionPersonalViewSet'),
    path('api/v1/gthaccionpersonal/',vw_gth.Get_post_gthaccionpersonal.as_view(),name='Get_post_gthaccionpersonal'),
    re_path(r'^api/v1/gthaccionpersonal/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthaccionpersonal.as_view(), name='Get_delete_update_gthaccionpersonal'),

    


]