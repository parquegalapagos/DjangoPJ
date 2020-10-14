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
    
    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SPN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    # spncentroscrianza
    path('api/v1/spncentroscrianza_list/', vw_spn.SpnCentrosCrianzaViewSet.as_view(),name='SpnCentrosCrianzaViewSet'),
    re_path(r'^api/v1/spncentroscrianza/(?P<pk>[0-9A-Fa-f-]+)$',vw_spn.Get_delete_update_spncentroscrianza.as_view(), name='Get_delete_update_spncentroscrianza'),
    path('api/v1/spncentroscrianza/', vw_spn.Get_post_spncentroscrianza.as_view(), name='Get_post_spncentroscrianza'),

    # spncentroscrianza
    path('api/v1/spnpoblacion_list/', vw_spn.SpnPoblacionViewSet.as_view(),name='SpnPoblacionViewSet'),
    re_path(r'^api/v1/spnpoblacion/(?P<pk>[0-9A-Fa-f-]+)$',vw_spn.Get_delete_update_spnpoblacion.as_view(), name='Get_delete_update_spnpoblacion'),
    path('api/v1/spnpoblacion/', vw_spn.Get_post_spnpoblacion.as_view(), name='Get_post_spnpoblacion'),

    # spntortugasAdultas
    path('api/v1/spntortugasadultas_list/', vw_spn.SpnTortugasAdultasViewSet.as_view(),name='SpnTortugasAdultasViewSet'),
    re_path(r'^api/v1/spntortugasadultas/(?P<pk>[0-9A-Fa-f-]+)$',vw_spn.Get_delete_update_spntortugasadultas.as_view(), name='Get_delete_update_spntortugasadultas'),
    path('api/v1/spntortugasadultas/', vw_spn.Get_post_spntortugasadultas.as_view(), name='Get_post_spntortugasadultas'),

    # SPN_ControlHuevos
    path('api/v1/spncontrolhuevos_list/', vw_spn.SpnControlHuevosViewSet.as_view(),name='SpnControlHuevosViewSet'),
    re_path(r'^api/v1/spncontrolhuevos/(?P<pk>[0-9A-Fa-f-]+)$',vw_spn.Get_delete_update_spncontrolhuevos.as_view(), name='Get_delete_update_spncontrolhuevos'),
    path('api/v1/spncontrolhuevos/', vw_spn.Get_post_spncontrolhuevos.as_view(), name='Get_post_spncontrolhuevos'),

    # SPN_ControlHuevosResumen
    path('api/v1/spncontrolhuevosresumen_list/', vw_spn.SpnControlHuevosResumenViewSet.as_view(),name='SpnControlHuevosResumenViewSet'),
    re_path(r'^api/v1/spncontrolhuevosresumen/(?P<pk>[0-9A-Fa-f-]+)$',vw_spn.Get_delete_update_spncontrolhuevosresumen.as_view(), name='Get_delete_update_spncontrolhuevosresumen'),
    path('api/v1/spncontrolhuevosresumen/', vw_spn.Get_post_spncontrolhuevosresumen.as_view(), name='Get_post_spncontrolhuevosresumen'),

    # SPN_ControlHuevosDetalles
    path('api/v1/spncontrolhuevosdetalles_list/', vw_spn.SpnControlHuevosDetallesViewSet.as_view(),name='SpnControlHuevosDetallesViewSet'),
    re_path(r'^api/v1/spncontrolhuevosdetalles/(?P<pk>[0-9A-Fa-f-]+)$',vw_spn.Get_delete_update_spncontrolhuevosdetalles.as_view(), name='Get_delete_update_spncontrolhuevosdetalles'),
    path('api/v1/spncontrolhuevosdetalles/', vw_spn.Get_post_spncontrolhuevosdetalles.as_view(), name='Get_post_spncontrolhuevosdetalles'),

    # SPN_ControlCrecimientoGalapaguitos
    path('api/v1/spncontrolcrecimientogalapaguitos_list/', vw_spn.SpnControlCrecimientoGalapaguitosViewSet.as_view(),name='SpnControlCrecimientoGalapaguitosViewSet'),
    re_path(r'^api/v1/spncontrolcrecimientogalapaguitos/(?P<pk>[0-9A-Fa-f-]+)$',vw_spn.Get_delete_update_spncontrolcrecimientogalapaguitos.as_view(), name='Get_delete_update_spncontrolcrecimientogalapaguitos'),
    path('api/v1/spncontrolcrecimientogalapaguitos/', vw_spn.Get_post_spncontrolcrecimientogalapaguitos.as_view(), name='Get_post_spncontrolcrecimientogalapaguitos'),


    # SPN_ControlCrecimientoGalapaguitos
    path('api/v1/spncontrolcrecimientogalapaguitosdetalles_list/', vw_spn.SpnControlCrecimientoGalapaguitosDetallesViewSet.as_view(),name='SpnControlCrecimientoGalapaguitosDetallesViewSet'),
    re_path(r'^api/v1/spncontrolcrecimientogalapaguitosdetalles/(?P<pk>[0-9A-Fa-f-]+)$',vw_spn.Get_delete_update_spncontrolcrecimientogalapaguitosdetalles.as_view(), name='Get_delete_update_spncontrolcrecimientogalapaguitosdetalles'),
    path('api/v1/spncontrolcrecimientogalapaguitosdetalles/', vw_spn.Get_post_spncontrolcrecimientogalapaguitosdetalles.as_view(), name='Get_post_spncontrolcrecimientogalapaguitosdetalles'),


    # SPN_NIDOS
    path('api/v1/spnnidos_list/', vw_spn.SpnNidosViewSet.as_view(),name='SpnNidosViewSet'),
    re_path(r'^api/v1/spnnidos/(?P<pk>[0-9A-Fa-f-]+)$',vw_spn.Get_delete_update_spnnidos.as_view(), name='Get_delete_update_spnnidos'),
    path('api/v1/spnnidos/', vw_spn.Get_post_spnnidos.as_view(), name='Get_post_spnnidos'),

     # SPN_ControlHuevosNidos
    path('api/v1/spncontrolhuevosnidos_list/', vw_spn.SpnControlHuevosNidosViewSet.as_view(),name='SpnControlHuevosNidosViewSet'),
    re_path(r'^api/v1/spncontrolhuevosnidos/(?P<pk>[0-9A-Fa-f-]+)$',vw_spn.Get_delete_update_spncontrolhuevosnidos.as_view(), name='Get_delete_update_spncontrolhuevosnidos'),
    path('api/v1/spncontrolhuevosnidos/', vw_spn.Get_post_spncontrolhuevosnidos.as_view(), name='Get_post_spncontrolhuevosnidos'),

    # SPN_ControlPetrelesNidos
    path('api/v1/spncontrolpetrelesnidos_list/', vw_spn.SpnControlPetrelesNidosViewSet.as_view(),name='SpnControlPetrelesNidosViewSet'),
    re_path(r'^api/v1/spncontrolpetrelesnidos/(?P<pk>[0-9A-Fa-f-]+)$',vw_spn.Get_delete_update_spncontrolpetrelesnidos.as_view(), name='Get_delete_update_spncontrolpetrelesnidos'),
    path('api/v1/spncontrolpetrelesnidos/', vw_spn.Get_post_spncontrolpetrelesnidos.as_view(), name='Get_post_spncontrolpetrelesnidos'),

    # SPN_ControlFlamingos
    path('api/v1/spncontrolflamingos_list/', vw_spn.SpnControlFlamingosViewSet.as_view(),name='SpnControlFlamingosViewSet'),
    re_path(r'^api/v1/spncontrolflamingos/(?P<pk>[0-9A-Fa-f-]+)$',vw_spn.Get_delete_update_spncontrolflamingos.as_view(), name='Get_delete_update_spncontrolflamingos'),
    path('api/v1/spncontrolflamingos/', vw_spn.Get_post_spncontrolflamingos.as_view(), name='Get_post_spncontrolflamingos'),

    # SPN_ControlFlamingos
    path('api/v1/spncontrolflamingosotrasespecies_list/', vw_spn.SpnControlFlamingosOtrasEspeciesViewSet.as_view(),name='SpnControlFlamingosOtrasEspeciesViewSet'),
    re_path(r'^api/v1/spncontrolflamingosotrasespecies/(?P<pk>[0-9A-Fa-f-]+)$',vw_spn.Get_delete_update_spncontrolflamingosotrasespecies.as_view(), name='Get_delete_update_spncontrolflamingosotrasespecies'),
    path('api/v1/spncontrolflamingosotrasespecies/', vw_spn.Get_post_spncontrolflamingosotrasespecies.as_view(), name='Get_post_spncontrolflamingosotrasespecies'),


    path('api/v1/spnvwcontrolcrecimientogalapaguitos_list/', vw_spn.SpnVwControlCrecimientoGalapaguitosViewSet.as_view(),name='SpnVwControlCrecimientoGalapaguitosViewSet'),
    path('api/v1/spnvwdatoshuevopintura_list/', vw_spn.SpnVwDatosHuevosPinturaViewSet.as_view(),name='SpnVwDatosHuevosPinturaViewSet'),
    path('api/v1/spnvwdatoscontrolcrecehuevopintura_list/', vw_spn.SpnVwDatosControlCreceHuevoxPinturaViewSet.as_view(),name='SpnVwDatosControlCreceHuevoxPinturaViewSet'),
    path('api/v1/spnvwresumenhuevosincubados_list/', vw_spn.SpnVwResumenHuevosIncubadosViewSet.as_view(),name='SpnVwResumenHuevosIncubadosViewSet'),
    path('api/v1/spnvwresumenhuevosincubadosdetalles_list/', vw_spn.SpnVwResumenHuevosIncubadosDetallesViewSet.as_view(),name='SpnVwResumenHuevosIncubadosDetallesViewSet'),
    path('api/v1/spnvwresumenhuevosincubadosperiodo_list/', vw_spn.SpnVwResumenHuevosIncubadosPerdiodoDetallesViewSet.as_view(),name='SpnVwResumenHuevosIncubadosPerdiodoDetallesViewSet'),
    path('api/v1/spnvwdetallecontrolcrecimiento_list/', vw_spn.SpnVwDetalleControlCrecimientoViewSet.as_view(),name='SpnVwDetalleControlCrecimientoViewSet'),
    path('api/v1/spnvwestadoactualcc_list/', vw_spn.SpnVwEstadoActualCCViewSet.as_view(),name='SpnVwEstadoActualCCViewSet'),


]