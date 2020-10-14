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
    
    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DAF >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    
    #  daf_certificaciones
    path('api/v1/dafcertificaciones_list/', vw_daf.DafCertificacionesViewSet.as_view(),name='DafCertificacionesViewSet'),
    re_path(r'^api/v1/dafcertificaciones/(?P<pk>[0-9A-Fa-f-]+)$',vw_daf.Get_delete_update_dafcertificaciones.as_view(), name='Get_delete_update_dafcertificaciones'),
    path('api/v1/dafcertificaciones/', vw_daf.Get_post_dafcertificaciones.as_view(), name='Get_post_dafcertificaciones'),

    #  daf_certificaciones_detalles
    re_path(r'^api/v1/dafcertificacionesdetalles/(?P<pk>[0-9A-Fa-f-]+)$',vw_daf.Get_delete_update_dafcertificacionesdetalles.as_view(), name='Get_delete_update_dafcertificacionesdetalles'),
    path('api/v1/dafcertificacionesdetalles/', vw_daf.Get_post_dafcertificacionesdetalles.as_view(), name='Get_post_dafcertificacionesdetalles'),

    path('api/v1/dafcabdetcertificaciones/',vw_daf.Get_post_cabecera_detalle_certificaciones.as_view(),name='Get_post_cabecera_detalle_certificaciones'),
    re_path(r'^api/v1/dafcabdetcertificaciones/(?P<pk>[0-9A-Fa-f-]+)$',vw_daf.Get_delete_update_cabecera_detalle_certificaciones.as_view(), name='Get_delete_update_cabecera_detalle_certificaciones'),
   


]