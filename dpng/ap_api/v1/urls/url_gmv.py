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
    path('api/v1/gmvespeciescantidades_list/', vw_gmv.GmvEspeciesCantidadesViewSet.as_view(),name='GmvEspeciesCantidadesViewSet'),
    re_path(r'^api/v1/gmvespeciescantidades/(?P<pk>[0-9A-Fa-f-]+)$',vw_gmv.Get_delete_update_gmvespeciescantidades.as_view(),name='Get_delete_update_gmvespeciescantidades'),
    path('api/v1/gmvespeciescantidades/',vw_gmv.Get_post_gmvespeciescantidades.as_view(),name='Get_post_gmvespeciescantidades'), # Url to get update or delete a cargo funcional
]