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
    
	#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ORG >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 

    # ORG_ORGANIZACION
    path('api/v1/orgorganizacionbanco_list/', vw_org.OrgOrganizacionBancoViewSet.as_view(),name='OrgOrganizacionBancoViewSet'),
    path('api/v1/orgorganizacion_list/', vw_org.OrgOrganizacionViewSet.as_view(),name='OrgOrganizacionViewSet'),
    
    # DIR_DEPARTMENT
    path('api/v1/dirdepartment_list/', vw_dir.DirDepartmentViewSet.as_view(),name='DirDepartmentViewSet'),
    # DIR_CALSIFIACIONPROCESO
    path('api/v1/dirclasificacionproceso_list/', vw_dir.DirClasificacionProcesoViewSet.as_view(),name='DirClasificacionProcesoViewSet'),


]