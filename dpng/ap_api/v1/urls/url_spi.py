
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
	path('api/v1/spiespeciesintroducidasgatos_list/', vw_spi.SpiEspeciesIntroducidasGatoViewSet.as_view(),name='SpiEspeciesIntroducidasGatoViewSet'),
    path('api/v1/spiespeciesintroducidasgatos/',vw_spi.Get_post_SpiEspeciesIntroducidasGato.as_view(),name='Get_post_SpiEspeciesIntroducidasGato'),
    re_path(r'^api/v1/spiespeciesintroducidasgatos/(?P<pk>[0-9A-Fa-f-]+)$',vw_spi.Get_delete_update_SpiEspeciesIntroducidasGato.as_view(), name='Get_delete_update_SpiEspeciesIntroducidasGato'),

	path('api/v1/spiespeciesintroducidasaves_list/', vw_spi.SpiEspeciesIntroducidasAvesViewSet.as_view(),name='SpiEspeciesIntroducidasAvesViewSet'),
    path('api/v1/spiespeciesintroducidasaves/',vw_spi.Get_post_SpiEspeciesIntroducidasAves.as_view(),name='Get_post_SpiEspeciesIntroducidasAves'),
    re_path(r'^api/v1/spiespeciesintroducidasaves/(?P<pk>[0-9A-Fa-f-]+)$',vw_spi.Get_delete_update_SpiEspeciesIntroducidasAves.as_view(), name='Get_delete_update_SpiEspeciesIntroducidasAves'),

	path('api/v1/spiespeciesintroducidascaracol_list/', vw_spi.SpiEspeciesIntroducidasCaracolViewSet.as_view(),name='SpiEspeciesIntroducidasCaracolViewSet'),
    path('api/v1/spiespeciesintroducidascaracol/',vw_spi.Get_post_SpiEspeciesIntroducidasCaracol.as_view(),name='Get_post_SpiEspeciesIntroducidasCaracol'),
    re_path(r'^api/v1/spiespeciesintroducidascaracol/(?P<pk>[0-9A-Fa-f-]+)$',vw_spi.Get_delete_update_SpiEspeciesIntroducidasCaracol.as_view(), name='Get_delete_update_SpiEspeciesIntroducidasCaracol'),

	path('api/v1/spiespeciesintroducidashormigas_list/', vw_spi.SpiEspeciesIntroducidasHormigasViewSet.as_view(),name='SpiEspeciesIntroducidasHormigasViewSet'),
    path('api/v1/spiespeciesintroducidashormigas/',vw_spi.Get_post_SpiEspeciesIntroducidasHormigas.as_view(),name='Get_post_SpiEspeciesIntroducidasHormigas'),
    re_path(r'^api/v1/spiespeciesintroducidashormigas/(?P<pk>[0-9A-Fa-f-]+)$',vw_spi.Get_delete_update_SpiEspeciesIntroducidasHormigas.as_view(), name='Get_delete_update_SpiEspeciesIntroducidasHormigas'),

    path('api/v1/spiespeciesintroducidascaceria_list/', vw_spi.SpiEspeciesIntroducidasCaceriaViewSet.as_view(),name='SpiEspeciesIntroducidasCaceriaViewSet'),
    path('api/v1/spiespeciesintroducidascaceria/',vw_spi.Get_post_SpiEspeciesIntroducidasCaceria.as_view(),name='Get_post_SpiEspeciesIntroducidasCaceria'),
    re_path(r'^api/v1/spiespeciesintroducidascaceria/(?P<pk>[0-9A-Fa-f-]+)$',vw_spi.Get_delete_update_SpiEspeciesIntroducidasCaceria.as_view(), name='Get_delete_update_SpiEspeciesIntroducidasCaceria'),

    path('api/v1/spiespeciesintroducidas_list/', vw_spi.SpiEspeciesIntroducidasViewSet.as_view(),name='SpiEspeciesIntroducidasViewSet'),
    path('api/v1/spiespeciesintroducidas/',vw_spi.Get_post_SpiEspeciesIntroducidas.as_view(),name='Get_post_SpiEspeciesIntroducidas'),
    re_path(r'^api/v1/spiespeciesintroducidas/(?P<pk>[0-9A-Fa-f-]+)$',vw_spi.Get_delete_update_SpiEspeciesIntroducidas.as_view(), name='Get_delete_update_SpiEspeciesIntroducidas'),

    path('api/v1/spicabdetespeciesintroducidas/',vw_spi.Get_post_cabecera_detalle_especiesintroducidas.as_view(),name='Get_post_cabecera_detalle_especiesintroducidas'),
    re_path(r'^api/v1/spicabdetespeciesintroducidas/(?P<pk>[0-9A-Fa-f-]+)$',vw_spi.Get_delete_update_cabecera_detalle_especiesintroducidas.as_view(), name='Get_delete_update_cabecera_detalle_especiesintroducidas'),

    path('api/v1/spimetodocontrol_list/', vw_spi.SpiMetodosControlViewSet.as_view(),name='SpiMetodosControlViewSet'),
    path('api/v1/spimetodocontrol/',vw_spi.Get_post_SpiMetodosControl.as_view(),name='Get_post_SpiMetodosControl'),
    re_path(r'^api/v1/spimetodocontrol/(?P<pk>[0-9A-Fa-f-]+)$',vw_spi.Get_delete_update_SpiMetodosControl.as_view(), name='Get_delete_update_SpiMetodosControl'),

    path('api/v1/spimetodocontrolespecies_list/', vw_spi.SpiMetodosControlEspeciesViewSet.as_view(),name='SpiMetodosControlEspeciesViewSet'),
    path('api/v1/spimetodocontrolespecies/',vw_spi.Get_post_SpiMetodosControlEspecies.as_view(),name='Get_post_SpiMetodosControlEspecies'),
    re_path(r'^api/v1/spimetodocontrolespecies/(?P<pk>[0-9A-Fa-f-]+)$',vw_spi.Get_delete_update_SpiMetodosControlEspecies.as_view(), name='Get_delete_update_SpiMetodosControlEspecies'),

]