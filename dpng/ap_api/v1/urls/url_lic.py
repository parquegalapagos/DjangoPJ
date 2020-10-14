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
    
    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> LIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    path('api/v1/licguia_list/', vw_lic.LicGuiaViewSet.as_view(),name='LicGuiaViewSet'),
    path('api/v1/licguia_short/', vw_lic.LicGuiaShortViewSet.as_view(),name='LicGuiaShortViewSet'),
    path('api/v1/licguia_app/', vw_lic.LicGuiaShortViewSetApp.as_view(),name='LicGuiaShortViewSetApp'),
    path('api/v1/licguia/',vw_lic.Get_post_LicGuia.as_view(),name='Get_post_LicGuia'),
    re_path(r'^api/v1/licguia/(?P<pk>[0-9A-Fa-f-]+)$',vw_lic.Get_delete_update_LicGuia.as_view(), name='Get_delete_update_LicGuia'),
    
    
]