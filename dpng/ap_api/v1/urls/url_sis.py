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
    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SIS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    # SIS_CATALOGO
    path('api/v1/siscatalogo_list/', vw_sis.SisCatalogoViewSet.as_view(),name='SisCatalogoViewSet'),
    re_path(r'^api/v1/siscatalogo/(?P<pk>[0-9A-Fa-f-]+)$',vw_sis.Get_delete_update_siscatalogo.as_view(),name='Get_delete_update_siscatalogo'),
     path('api/v1/siscatalogo/',vw_sis.Get_post_siscatalogo.as_view(),name='Get_post_siscatalogo'), # Url to get update or delete a cargo funcional
    # SIS_SECUENCIAS
    path('api/v1/sissecuencia_list/', vw_sis.SisSecuenciaViewSet.as_view(),name='SisSecuenciaViewSet'),
    re_path(r'^api/v1/sissecuencia/(?P<pk>[0-9A-Fa-f-]+)$',vw_sis.Get_delete_update_sissecuencia.as_view(), name='Get_delete_update_sissecuencia'),

 	# Parametro Configuracion
    path('api/v1/sisparametrosconfig_list/', vw_sis.SisParametrosConfigViewSet.as_view(),name='SisParametrosConfigViewSet'),
    path('api/v1/sisparametrosconfig/',vw_sis.Get_post_sisparametrosconfig.as_view(),name='Get_post_sisparametrosconfig'),
    re_path(r'^api/v1/sisparametrosconfig/(?P<pk>[0-9A-Fa-f-]+)$',vw_sis.Get_delete_update_sisparametrosconfig.as_view(), name='Get_delete_update_sisparametrosconfig'),

]