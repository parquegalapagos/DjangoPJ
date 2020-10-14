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
    
    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TPR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    path('api/v1/tprembarcacion_list/', vw_tpr.TprEmbarcacionViewSet.as_view(),name='TprEmbarcacionViewSet'),
    path('api/v1/tprembarcacion_short/', vw_tpr.TprEmbarcacionShortViewSet.as_view(),name='TprEmbarcacionShortViewSet'),
    path('api/v1/tprembarcacion/',vw_tpr.Get_post_TprEmbarcacion.as_view(),name='Get_post_TprEmbarcacion'),
    re_path(r'^api/v1/tprembarcacion/(?P<pk>[0-9A-Fa-f-]+)$',vw_tpr.Get_delete_update_TprEmbarcacion.as_view(), name='Get_delete_update_TprEmbarcacion'),
    
    path('api/v1/tprembarcacionactividad_list/', vw_tpr.TprEmbarcacionActividadViewSet.as_view(),name='TprEmbarcacionActividadViewSet'),
    path('api/v1/tprembarcacionactividad/',vw_tpr.Get_post_TprEmbarcacionActividad.as_view(),name='Get_post_TprEmbarcacionActividad'),
    re_path(r'^api/v1/tprembarcacionactividad/(?P<pk>[0-9A-Fa-f-]+)$',vw_tpr.Get_delete_update_TprEmbarcacionActividad.as_view(), name='Get_delete_update_TprEmbarcacionActividad'),
]