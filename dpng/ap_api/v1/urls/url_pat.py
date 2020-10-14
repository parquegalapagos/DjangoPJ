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
    
    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PAT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    path('api/v1/patpatente_list/', vw_pat.PatPatenteViewSet.as_view(),name='PatPatenteViewSet'),
    path('api/v1/patpatente_short/', vw_pat.PatPatenteShortViewSet.as_view(),name='PatPatenteShortViewSet'),
    path('api/v1/patpatente/',vw_pat.Get_post_PatPatente.as_view(),name='Get_post_PatPatente'),
    re_path(r'^api/v1/patpatente/(?P<pk>[0-9A-Fa-f-]+)$',vw_pat.Get_delete_update_PatPatente.as_view(), name='Get_delete_update_PatPatente'),
    

]