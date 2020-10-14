# Django
from django.urls import path, re_path
from django.conf.urls import include, url

# JWT
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token

# Local
from ap_api.v1.views import vw_trm


urlpatterns = [

	#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TRM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 

	# trm_tramites
	path('api/v1/trmtramites_list/', vw_trm.TrmTramitesViewSet.as_view(),name='TrmTramitesViewSet'),
    re_path(r'^api/v1/trmtramites/(?P<pk>[0-9A-Fa-f-]+)$',vw_trm.Get_delete_update_trmtramites.as_view(), name='Get_delete_update_trmtramites'),
    path('api/v1/trmtramites/', vw_trm.Get_post_trmtramites.as_view(), name='Get_post_trmtramites'),

    # trm_tramitesdetalles
    re_path(r'^api/v1/trmtramitesdetalles/(?P<pk>[0-9A-Fa-f-]+)$',vw_trm.Get_delete_update_trmtramitesdetalles.as_view(), name='Get_delete_update_trmtramitesdetalles'),
    path('api/v1/trmtramitesdetalles/', vw_trm.Get_post_trmtramitesdetalles.as_view(), name='Get_post_trmtramitesdetalles'),

]
