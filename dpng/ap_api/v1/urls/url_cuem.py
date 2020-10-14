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
    
    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> cuem - Manejo Pesquero >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    path('api/v1/appfdtdatospescador_list/', vw_cuem.AppFdTdatospescadorViewSet.as_view(),name='AppFdTdatospescadorViewSet'),
    path('api/v1/appfdtdatospescador_listall/', vw_cuem.AppFdTdatospescadorViewSet2.as_view(),name='AppFdTdatospescadorViewSet2'),
    path('api/v1/appfdtdatospescador/',vw_cuem.Get_post_AppFdTdatospescador.as_view(),name='Get_post_AppFdTdatospescador'),
    re_path(r'^api/v1/appfdtdatospescador/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuem.Get_delete_update_AppFdTdatospescador.as_view(), name='Get_delete_update_AppFdTdatospescador'),
    
    path('api/v1/appfdtlicenciaparma_list/', vw_cuem.AppFdTlicenciaparmaViewSet.as_view(),name='AppFdTlicenciaparmaViewSet'),
    path('api/v1/appfdtlicenciaparma_app/', vw_cuem.AppFdTlicenciaparmaViewSetApp.as_view(),name='AppFdTlicenciaparmaViewSetApp'),
    path('api/v1/appfdtlicenciaparma_listall/', vw_cuem.AppFdTlicenciaparmaAllViewSet.as_view(),name='AppFdTlicenciaparmaAllViewSet'),
    path('api/v1/appfdtlicenciaparma/',vw_cuem.Get_post_AppFdTlicenciaparma.as_view(),name='Get_post_AppFdTlicenciaparma'),
    re_path(r'^api/v1/appfdtlicenciaparma/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuem.Get_delete_update_AppFdTlicenciaparma.as_view(), name='Get_delete_update_AppFdTlicenciaparma'),
    
    #cab embarcacion pesca
    path('api/v1/appfdtembarcacionpesca_list/', vw_cuem.AppFdTembarcacionpescaViewSet.as_view(),name='AppFdTembarcacionpescaViewSet'),
    path('api/v1/appfdtembarcacionpesca/',vw_cuem.Get_post_AppFdTembarcacionpesca.as_view(),name='Get_post_AppFdTembarcacionpesca'),
    re_path(r'^api/v1/appfdtembarcacionpesca/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuem.Get_delete_update_AppFdTembarcacionpesca.as_view(), name='Get_delete_update_AppFdTFdTembarcacionpesca'),
    
    #cab permisopesca
    path('api/v1/appfdtpermisopesca_list/', vw_cuem.AppFdTpermisopescaViewSet.as_view(),name='AppFdTpermisopescaViewSet'),
    path('api/v1/appfdtpermisopesca_listall/', vw_cuem.AppFdTpermisopescaAllViewSet.as_view(),name='AppFdTpermisopescaAllViewSet'),
    path('api/v1/appfdtpermisopesca/',vw_cuem.Get_post_AppFdTpermisopesca.as_view(),name='Get_post_AppFdTpermisopesca'),
    re_path(r'^api/v1/appfdtpermisopesca/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuem.Get_delete_update_AppFdTpermisopesca.as_view(), name='Get_delete_update_AppFdTpermisopesca'),

    #cab permisocompesblan
    path('api/v1/appfdtpermisocompesblan_list/', vw_cuem.AppFdTpermisocompesblanViewSet.as_view(),name='AppFdTpermisocompesblanViewSet'),
    path('api/v1/appfdtpermisocompesblan/',vw_cuem.Get_post_AppFdTpermisocompesblan.as_view(),name='Get_post_AppFdTpermisocompesblan'),
    re_path(r'^api/v1/appfdtpermisocompesblan/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuem.Get_delete_update_AppFdTpermisocompesblan.as_view(), name='Get_delete_update_AppFdTpermisocompesblan'),

    
    #cab permisolasgosta
    path('api/v1/appfdtpermisocomlangosta_list/', vw_cuem.AppFdTpermisocomlangostaViewSet.as_view(),name='AppFdTpermisocomlangostaViewSet'),
    path('api/v1/appfdtpermisocomlangosta/',vw_cuem.Get_post_AppFdTpermisocomlangosta.as_view(),name='Get_post_AppFdTpermisocomlangosta'),
    re_path(r'^api/v1/appfdtpermisocomlangosta/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuem.Get_delete_update_AppFdTpermisocomlangosta.as_view(), name='Get_delete_update_AppFdpermisocomlangosta'),


    path('api/v1/bsainformetecnico_list/', vw_bsa.BsaInformeTecnicoViewSet.as_view(),name='BsaInformeTecnicoViewSet'),
    path('api/v1/bsainformetecnico/',vw_bsa.Get_post_bsainformetecnico.as_view(),name='Get_post_bsainformetecnico'),
    re_path(r'^api/v1/bsainformetecnico/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_bsainformetecnico.as_view(), name='Get_delete_update_bsainformetecnico'),
]