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
    
    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> spt >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    # marca
    path('api/v1/sptmarca_list/', vw_spt.SptMarcaViewSet.as_view(),name='SptMarcaViewSet'),
    path('api/v1/sptmarca/',vw_spt.Get_post_sptmarca.as_view(),name='Get_post_sptmarca'),
    re_path(r'^api/v1/sptmarca/(?P<pk>[0-9A-Fa-f-]+)$',vw_spt.Get_delete_update_sptmarca.as_view(), name='Get_delete_update_sptmarca'),

    # ubicacion
    path('api/v1/sptubicacion_list/', vw_spt.SptUbicacionViewSet.as_view(),name='SptUbicacionViewSet'),
    path('api/v1/sptubicacion/',vw_spt.Get_post_sptubicacion.as_view(),name='Get_post_sptubicacion'),
    re_path(r'^api/v1/sptubicacion/(?P<pk>[0-9A-Fa-f-]+)$',vw_spt.Get_delete_update_sptubicacion.as_view(), name='Get_delete_update_sptubicacion'),

    # producto
    path('api/v1/sptproducto_list/', vw_spt.SptProductoViewSet.as_view(),name='SptProductoViewSet'),
    path('api/v1/sptproducto/',vw_spt.Get_post_sptproducto.as_view(),name='Get_post_sptproducto'),
    re_path(r'^api/v1/sptproducto/(?P<pk>[0-9A-Fa-f-]+)$',vw_spt.Get_delete_update_sptproducto.as_view(), name='Get_delete_update_sptproducto'), 

    # tipoequipo
    path('api/v1/spttipoequipo_list/', vw_spt.SptTipoEquipoViewSet.as_view(),name='SptTipoEquipoViewSet'),
    path('api/v1/spttipoequipo/',vw_spt.Get_post_spttipoequipo.as_view(),name='Get_post_spttipoequipo'),
    re_path(r'^api/v1/spttipoequipo/(?P<pk>[0-9A-Fa-f-]+)$',vw_spt.Get_delete_update_spttipoequipo.as_view(), name='Get_delete_update_spttipoequipo'),

    # tipoproblema
    path('api/v1/spttipoproblema_list/', vw_spt.SptTipoProblemaViewSet.as_view(),name='SptTipoProblemaViewSet'),
    path('api/v1/spttipoproblema/',vw_spt.Get_post_spttipoproblema.as_view(),name='Get_post_spttipoproblema'),
    re_path(r'^api/v1/spttipoproblema/(?P<pk>[0-9A-Fa-f-]+)$',vw_spt.Get_delete_update_spttipoproblema.as_view(), name='Get_delete_update_spttipoproblema'),

    # tipoproblema
    path('api/v1/sptsubtipoproblema_list/', vw_spt.SptSubTipoProblemaViewSet.as_view(),name='SptSubTipoProblemaViewSet'),
    path('api/v1/sptsubtipoproblema/',vw_spt.Get_post_sptsubtipoproblema.as_view(),name='Get_post_sptsubtipoproblema'),
    re_path(r'^api/v1/sptsubtipoproblema/(?P<pk>[0-9A-Fa-f-]+)$',vw_spt.Get_delete_update_sptsubtipoproblema.as_view(), name='Get_delete_update_sptsubtipoproblema'),

    # unidadmedida
    path('api/v1/sptunidadmedida_list/', vw_spt.SptUnidadMedidaViewSet.as_view(),name='SptUnidadMedidaViewSet'),
    path('api/v1/sptunidadmedida/',vw_spt.Get_post_sptunidadmedida.as_view(),name='Get_post_sptunidadmedida'),
    re_path(r'^api/v1/sptunidadmedida/(?P<pk>[0-9A-Fa-f-]+)$',vw_spt.Get_delete_update_sptunidadmedida.as_view(), name='Get_delete_update_sptunidadmedida'),

    # equipos
    path('api/v1/sptequipo_list/', vw_spt.SptEquiposViewSet.as_view(),name='SptEquiposViewSet'),
    path('api/v1/sptequipo/',vw_spt.Get_post_sptequipos.as_view(),name='Get_post_sptequipos'),
    re_path(r'^api/v1/sptequipo/(?P<pk>[0-9A-Fa-f-]+)$',vw_spt.Get_delete_update_sptequipos.as_view(), name='Get_delete_update_sptequipos'),

    # equipos
    path('api/v1/sptsolicitudservicio_list/', vw_spt.SptSolicitudServicioViewSet.as_view(),name='SptSolicitudServicioViewSet'),
    path('api/v1/sptsolicitudservicio/',vw_spt.Get_post_sptsolicitudservicio.as_view(),name='Get_post_sptsolicitudservicio'),
    re_path(r'^api/v1/sptsolicitudservicio/(?P<pk>[0-9A-Fa-f-]+)$',vw_spt.Get_delete_update_sptsolicitudservicio.as_view(), name='Get_delete_update_sptsolicitudservicio'),

     #cab bajas
    path('api/v1/sptinformebajas_list/', vw_spt.SptInformeBajaViewSet.as_view(),name='SptInformeBajaViewSet'),
    path('api/v1/sptinformebajas/',vw_spt.Get_post_sptinformebaja.as_view(),name='Get_post_sptinformebaja'),
    re_path(r'^api/v1/sptinformebajas/(?P<pk>[0-9A-Fa-f-]+)$',vw_spt.Get_delete_update_sptinformebaja.as_view(), name='Get_delete_update_sptinformebaja'),

    path('api/v1/sptinformebajasdetalle_list/', vw_spt.SptInformeBajaDetalleViewSet.as_view(),name='SptInformeBajaDetalleViewSet'),
    path('api/v1/sptinformebajadetalle/',vw_spt.Get_post_sptinformebajadetalle.as_view(),name='Get_post_sptinformebajadetalle'),
    re_path(r'^api/v1/sptinformebajadetalle/(?P<pk>[0-9A-Fa-f-]+)$',vw_spt.Get_delete_update_sptinformebajadetalle.as_view(), name='Get_delete_update_sptinformebajadetalle'),

    path('api/v1/sptcabdetinformebaja/',vw_spt.Get_post_cabecera_detalle_informebaja.as_view(),name='Get_post_cabecera_detalle_informebaja'),
    re_path(r'^api/v1/sptcabdetinformebaja/(?P<pk>[0-9A-Fa-f-]+)$',vw_spt.Get_delete_update_cabecera_detalle_informebaja.as_view(), name='Get_delete_update_cabecera_detalle_informebaja'),


    path('api/v1/spthistcustodioequipo_list/', vw_spt.SptEquipoCustodioHistViewSet.as_view(),name='SptEquipoCustodioHistViewSet'),
    path('api/v1/spthistcustodioequipo/',vw_spt.Get_post_sptequipocustodiohist.as_view(),name='Get_post_sptequipocustodiohist'),
    re_path(r'^api/v1/spthistcustodioequipo/(?P<pk>[0-9A-Fa-f-]+)$',vw_spt.Get_delete_update_sptequipocustodiohist.as_view(), name='Get_delete_update_sptequipocustodiohist'),

    path('api/v1/sptlistapregunta_list/', vw_spt.SptListaPreguntaViewSet.as_view(),name='SptListaPreguntaViewSet'),
    path('api/v1/sptlistapregunta/',vw_spt.Get_post_sptlistapregunta.as_view(),name='Get_post_sptlistapregunta'),
    re_path(r'^api/v1/sptlistapregunta/(?P<pk>[0-9A-Fa-f-]+)$',vw_spt.Get_delete_update_sptlistapregunta.as_view(), name='Get_delete_update_sptlistapregunta'),

]