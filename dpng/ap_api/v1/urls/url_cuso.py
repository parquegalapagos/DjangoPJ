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
    path('api/v1/cmnactavisitainspecembpescaobservacion_list/', vw_cuso.CmnActavisitainspecEmbPescaObservacionesViewSet.as_view(),name='CmnActavisitainspecEmbPescaObservacionesViewSet'),
    path('api/v1/cmnactavisitainspecembpescaobservacion/',vw_cuso.Get_post_CmnActavisitainspecEmbPescaObservaciones.as_view(),name='Get_post_CmnActavisitainspecEmbPescaObservaciones'),
    re_path(r'^api/v1/cmnactavisitainspecembpescaobservacion/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnActavisitainspecEmbPescaObservaciones.as_view(), name='Get_delete_update_CmnActavisitainspecEmbPescaObservaciones'),
    
    path('api/v1/cmnactavisitainspecembpescatripulacion_list/', vw_cuso.CCmnActavisitainspecEmbPescaTripulacionViewSet.as_view(),name='CCmnActavisitainspecEmbPescaTripulacionViewSet'),
    path('api/v1/cmnactavisitainspecembpescatripulacion/',vw_cuso.Get_post_CmnActavisitainspecEmbPescaTripulacion.as_view(),name='Get_post_CmnActavisitainspecEmbPescaTripulacion'),
    re_path(r'^api/v1/cmnactavisitainspecembpescatripulacion/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnActavisitainspecEmbPescaTripulacion.as_view(), name='Get_delete_update_CmnActavisitainspecEmbPescaTripulacion'),
    
    #cab embarcacion pesca
    path('api/v1/cmnactavisitainspecembpesca_list/', vw_cuso.CmnActavisitainspecEmbpescaViewSet.as_view(),name='CmnActavisitainspecEmbpescaViewSet'),
    path('api/v1/cmnactavisitainspecembpesca/',vw_cuso.Get_post_CmnActavisitainspecEmbpesca.as_view(),name='Get_post_CmnActavisitainspecEmbpesca'),
    re_path(r'^api/v1/cmnactavisitainspecembpesca/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnActavisitainspecEmbpesca.as_view(), name='Get_delete_update_CmnActavisitainspecEmbpesca'),
    
    path('api/v1/cusocabdetcmnactavisitainspecembpesca/',vw_cuso.Get_post_cabecera_detalle_CmnActavisitainspecEmbpesca.as_view(),name='Get_post_cabecera_detalle_CmnActavisitainspecEmbpesca'),
    re_path(r'^api/v1/cusocabdetcmnactavisitainspecembpesca/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_cabecera_detalle_CmnActavisitainspecEmbpesca.as_view(), name='Get_delete_update_cabecera_detalle_CmnActavisitainspecEmbpesca'),

 #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> cuem - Manejo Pesquero >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    path('api/v1/cmnactainspecembturisobservacion_list/', vw_cuso.CmnActaInspecEmbarTuristicaObservacionesViewSet.as_view(),name='CmnActaInspecEmbarTuristicaObservacionesViewSet'),
    path('api/v1/cmnactainspecembturisobservacion/',vw_cuso.Get_post_CmnActaInspecEmbarTuristicaObservaciones.as_view(),name='Get_post_CmnActaInspecEmbarTuristicaObservaciones'),
    re_path(r'^api/v1/cmnactainspecembturisobservacion/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnActaInspecEmbarTuristicaObservaciones.as_view(), name='Get_delete_update_CmnActaInspecEmbarTuristicaObservaciones'),
    
    path('api/v1/cmnactainspecembturistripulacion_list/', vw_cuso.CmnActaInspecEmbarTuristicaTripulacionViewSet.as_view(),name='CmnActaInspecEmbarTuristicaTripulacionViewSet'),
    path('api/v1/cmnactainspecembturistripulacion/',vw_cuso.Get_post_CmnActaInspecEmbarTuristicaTripulacion.as_view(),name='Get_post_CmnActaInspecEmbarTuristicaTripulacion'),
    re_path(r'^api/v1/cmnactainspecembturistripulacion/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnActaInspecEmbarTuristicaTripulacion.as_view(), name='Get_delete_update_CmnActaInspecEmbarTuristicaTripulacion'),
    
#cab embarcacion turistica
    path('api/v1/cmnactainspecembturis_list/', vw_cuso.CmnActaInspecEmbarTuristicaViewSet.as_view(),name='CmnActaInspecEmbarTuristicaViewSet'),
    path('api/v1/cmnactainspecembturis/',vw_cuso.Get_post_CmnActaInspecEmbarTuristica.as_view(),name='Get_post_CmnActaInspecEmbarTuristica'),
    re_path(r'^api/v1/cmnactainspecembturis/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnActaInspecEmbarTuristica.as_view(), name='Get_delete_update_CmnActaInspecEmbarTuristica'),
    
    path('api/v1/cusocabdetcmnactainspecembturis/',vw_cuso.Get_post_cabecera_detalle_CmnActaInspecEmbarTuristica.as_view(),name='Get_post_cabecera_detalle_CmnActaInspecEmbarTuristica'),
    re_path(r'^api/v1/cusocabdetcmnactainspecembturis/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_cabecera_detalle_CmnActaInspecEmbarTuristica.as_view(), name='Get_delete_update_cabecera_detalle_CmnActaInspecEmbarTuristica'),


#cab novedades
    path('api/v1/cmninformenovedades_list/', vw_cuso.CmnInformeNovedadesViewSet.as_view(),name='CmnInformeNovedadesViewSet'),
    path('api/v1/cmninformenovedades/',vw_cuso.Get_post_cmninformenovedades.as_view(),name='Get_post_cmninformenovedades'),
    re_path(r'^api/v1/cmninformenovedades/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_cmninformenovedades.as_view(), name='Get_delete_update_cmninformenovedades'),

    path('api/v1/cmninformenovedadesdetalle_list/', vw_cuso.CmnInformeNovedadesDetalleViewSet.as_view(),name='CmnInformeNovedadesDetalleViewSet'),
    path('api/v1/cmninformenovedadesdetalle/',vw_cuso.Get_post_cmninformenovedadesdetalle.as_view(),name='Get_post_cmninformenovedadesdetalle'),
    re_path(r'^api/v1/cmninformenovedadesdetalle/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_cmninformenovedadesdetalle.as_view(), name='Get_delete_update_bsainformenovedadesdetalle'),

    path('api/v1/cmninformenovedadesparticipantes_list/', vw_cuso.CmnInformeNovedadesParticipantesViewSet.as_view(),name='CmnInformeNovedadesParticipantesViewSet'),
    path('api/v1/cmninformenovedadesparticipantes/',vw_cuso.Get_post_cmninformenovedadesparticipantes.as_view(),name='Get_post_cmninformenovedadesparticipantes'),
    re_path(r'^api/v1/cmninformenovedadesparticipantes/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_cmninformenovedadesparticipantes.as_view(), name='Get_delete_update_cmninformenovedadesparticipantes'),


    path('api/v1/cmncabdetinformenovedades/',vw_cuso.Get_post_cabecera_detalle_informenovedades.as_view(),name='Get_post_cabecera_detalle_informenovedades'),
    re_path(r'^api/v1/cmncabdetinformenovedades/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_cabecera_detalle_informenovedades.as_view(), name='Get_delete_update_cabecera_detalle_informenovedades'),

#cab novedades
    path('api/v1/cmninformemonitoreo_list/', vw_cuso.CmnInformeMonitoreoViewSet.as_view(),name='CmnInformeMonitoreoViewSet'),
    path('api/v1/cmninformemonitoreo/',vw_cuso.Get_post_cmninformemonitoreo.as_view(),name='Get_post_cmninformemonitoreo'),
    re_path(r'^api/v1/cmninformemonitoreo/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_cmninformemonitoreo.as_view(), name='Get_delete_update_cmninformemonitoreo'),

    path('api/v1/cmninformemonitoreodetalle_list/', vw_cuso.CmnInformeMonitoreoDetalleViewSet.as_view(),name='CmnInformeMonitoreoDetalleViewSet'),
    path('api/v1/cmninformemonitoreodetalle/',vw_cuso.Get_post_cmninformemonitoreodetalle.as_view(),name='Get_post_cmninformemonitoreodetalle'),
    re_path(r'^api/v1/cmninformemonitoreodetalle/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_cmninformemonitoreodetalle.as_view(), name='Get_delete_update_cmninformemonitoreodetalle'),

    path('api/v1/cmncabdetinformemonitoreo/',vw_cuso.Get_post_cabecera_detalle_informemonitoreo.as_view(),name='Get_post_cabecera_detalle_informemonitoreo'),
    re_path(r'^api/v1/cmncabdetinformemonitoreo/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_cabecera_detalle_informemonitoreo.as_view(), name='Get_delete_update_cabecera_detalle_informemonitoreo'),

    path('api/v1/cmnembarcacionespatrulla_list/', vw_cuso.CmnEmbarcacionesPatrullaViewSet.as_view(),name='CmnEmbarcacionesPatrullaViewSet'),
    path('api/v1/cmnembarcacionespatrulla/',vw_cuso.Get_post_cmnembarcacionespatrulla.as_view(),name='Get_post_cmnembarcacionespatrulla'),
    re_path(r'^api/v1/cmnembarcacionespatrulla/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_cmnembarcacionespatrulla.as_view(), name='Get_delete_update_cmnembarcacionespatrulla'),


    path('api/v1/cmnplanpatrulla_list/', vw_cuso.CmnPlanPatrullaViewSet.as_view(),name='CmnPlanPatrullaViewSet'),
    path('api/v1/cmnplanpatrulla/',vw_cuso.Get_post_cmnplanpatrulla.as_view(),name='Get_post_cmnplanpatrulla'),
    re_path(r'^api/v1/cmnplanpatrulla/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_cmnplanpatrulla.as_view(), name='Get_delete_update_cmnplanpatrulla'),

    path('api/v1/cmnplanpatrulladetalle_list/', vw_cuso.CmnPlanPatrullaDetalleViewSet.as_view(),name='CmnPlanPatrullaDetalleViewSet'),
    path('api/v1/cmnplanpatrulladetalle/',vw_cuso.Get_post_cmnplanpatrulladetalle.as_view(),name='Get_post_cmnplanpatrulladetalle'),
    re_path(r'^api/v1/cmnplanpatrulladetalle/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_cmnplanpatrulladetalle.as_view(), name='Get_delete_update_cmnplanpatrulladetalle'),

    path('api/v1/cmncabdetplanpatrulla/',vw_cuso.Get_post_cabecera_detalle_planpatrulla.as_view(),name='Get_post_cabecera_detalle_planpatrulla'),
    re_path(r'^api/v1/cmncabdetplanpatrulla/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_cabecera_detalle_planpatrulla.as_view(), name='Get_delete_update_cabecera_detalle_planpatrulla'),



    path('api/v1/cmnproductosretencion_list/', vw_cuso.CmnProductosRetencionViewSet.as_view(),name='CmnProductosRetencionViewSet'),
    path('api/v1/cmnproductosretencion/',vw_cuso.Get_post_CmnProductosRetencion.as_view(),name='Get_post_CmnProductosRetencion'),
    re_path(r'^api/v1/cmnproductosretencion/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnProductosRetencion.as_view(), name='Get_delete_update_CmnProductosRetencion'),
    
    path('api/v1/cmnparticipantesactaretencion_list/', vw_cuso.CmnParticipantesActaRetencionViewSet.as_view(),name='CmnParticipantesActaRetencionViewSet'),
    path('api/v1/cmnparticipantesactaretencion/',vw_cuso.Get_post_CmnParticipantesActaRetencion.as_view(),name='Get_post_CmnParticipantesActaRetencion'),
    re_path(r'^api/v1/cmnparticipantesactaretencion/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnParticipantesActaRetencion.as_view(), name='Get_delete_update_CmnParticipantesActaRetencion'),
    
    path('api/v1/cmnimplicadosactaretencion_list/', vw_cuso.CmnImplicadosActaRetencionViewSet.as_view(),name='CmnImplicadosActaRetencionViewSet'),
    path('api/v1/cmnimplicadosactaretencion/',vw_cuso.Get_post_CmnImplicadosActaRetencion.as_view(),name='Get_post_CmnImplicadosActaRetencion'),
    re_path(r'^api/v1/cmnimplicadosactaretencion/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnImplicadosActaRetencion.as_view(), name='Get_delete_update_CmnImplicadosActaRetencion'),
    
    path('api/v1/cmnproductosactaretencion_list/', vw_cuso.CmnProductosActaRetencionViewSet.as_view(),name='CmnProductosActaRetencionViewSet'),
    path('api/v1/cmnproductosactaretencion/',vw_cuso.Get_post_CmnProductosActaRetencion.as_view(),name='Get_post_CmnProductosActaRetencion'),
    re_path(r'^api/v1/cmnproductosactaretencion/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnProductosActaRetencion.as_view(), name='Get_delete_update_CmnProductosActaRetencion'),
   
    #cab embarcacion pesca
    path('api/v1/cmnactaretencion_list/', vw_cuso.CmnActaRetencionViewSet.as_view(),name='CmnActaRetencionViewSet'),
    path('api/v1/cmnactaretencion/',vw_cuso.Get_post_CmnActaRetencion.as_view(),name='Get_post_CmnActaRetencion'),
    re_path(r'^api/v1/cmnactaretencion/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnActaRetencion.as_view(), name='Get_delete_update_CmnActaRetencion'),
    
    path('api/v1/cmnactaretencioncabdet/',vw_cuso.Get_post_cabecera_detalle_CmnActaRetencion.as_view(),name='Get_post_cabecera_detalle_CmnActaRetencion'),
    re_path(r'^api/v1/cmnactaretencioncabdet/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_cabecera_detalle_CmnActaRetencion.as_view(), name='Get_delete_update_cabecera_detalle_CmnActaRetencion'),

    #cab embarcacion pesca
    path('api/v1/cmnactividadfuncionarios_list/', vw_cuso.CmnActividadFuncionariosViewSet.as_view(),name='CmnActividadFuncionariosViewSet'),
    path('api/v1/cmnactividadfuncionarios/',vw_cuso.Get_post_CmnActividadFuncionarios.as_view(),name='Get_post_CmnActividadFuncionarios'),
    re_path(r'^api/v1/cmnactividadfuncionarios/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnActividadFuncionarios.as_view(), name='Get_delete_update_CmnActividadFuncionarios'),

    path('api/v1/cmndiasactividadfuncionarios_list/', vw_cuso.CmnDiasActividadFuncionariosViewSet.as_view(),name='CmnDiasActividadFuncionariosViewSet'),
    path('api/v1/cmndiasactividadfuncionarios/',vw_cuso.Get_post_CmnDiasActividadFuncionarios.as_view(),name='Get_post_CmnDiasActividadFuncionarios'),
    re_path(r'^api/v1/cmndiasactividadfuncionarios/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnDiasActividadFuncionarios.as_view(), name='Get_delete_update_CmnDiasActividadFuncionarios'),

    path('api/v1/cmnactividadfuncionariosdias_list/',vw_cuso.CmnActividadFuncionarios_diasViewSet.as_view(),name='CmnActividadFuncionarios_diasViewSet'),

    path('api/v1/cmncontrolpersonal_list/', vw_cuso.CmnControlPersonalViewSet.as_view(),name='CmnControlPersonalViewSet'),
    path('api/v1/cmncontrolpersonal/',vw_cuso.Get_post_CmnControlPersonal.as_view(),name='Get_post_CmnControlPersonal'),
    re_path(r'^api/v1/cmncontrolpersonal/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnControlPersonal.as_view(), name='Get_delete_update_CmnControlPersonal'),

    path('api/v1/cmnembarcacionesexternas_list/', vw_cuso.CmnEmbarcacionesExternasViewSet.as_view(),name='CmnEmbarcacionesExternasViewSet'),
    path('api/v1/cmnembarcacionesexternas/',vw_cuso.Get_post_CmnEmbarcacionesExternas.as_view(),name='Get_post_CmnEmbarcacionesExternas'),
    re_path(r'^api/v1/cmnembarcacionesexternas/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnEmbarcacionesExternas.as_view(), name='Get_delete_update_CmnEmbarcacionesExternas'),

    path('api/v1/cmncamaras_list/', vw_cuso.CmnCamarasViewSet.as_view(),name='CmnCamarasViewSet'),
    path('api/v1/cmncamaras/',vw_cuso.Get_post_CmnCamaras.as_view(),name='Get_post_CmnCamaras'),
    re_path(r'^api/v1/cmncamaras/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnCamaras.as_view(), name='Get_delete_update_CmnCamaras'),

    path('api/v1/cmncmonitreportediarioimagenes_list/', vw_cuso.CmnCmonitReporteDiarioImagenesViewSet.as_view(),name='CmnCmonitReporteDiarioImagenesViewSet'),
    path('api/v1/cmncmonitreportediarioimagenes/',vw_cuso.Get_post_CmnCmonitReporteDiarioImagenes.as_view(),name='Get_post_CmnCmonitReporteDiarioImagenes'),
    re_path(r'^api/v1/cmncmonitreportediarioimagenes/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnCmonitReporteDiarioImagenes.as_view(), name='Get_delete_update_CmnCmonitReporteDiarioImagenes'),
    
    path('api/v1/cmncmonitreportediariocamaras_list/', vw_cuso.CmnCmonitReporteDiarioCamarasViewSet.as_view(),name='CmnCmonitReporteDiarioCamarasViewSet'),
    path('api/v1/cmncmonitreportediariocamaras/',vw_cuso.Get_post_CmnCmonitReporteDiarioCamaras.as_view(),name='Get_post_CmnCmonitReporteDiarioCamaras'),
    re_path(r'^api/v1/cmncmonitreportediariocamaras/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnCmonitReporteDiarioCamaras.as_view(), name='Get_delete_update_CmnCmonitReporteDiarioCamaras'),

    path('api/v1/cmncmonitreportediarioembarcaciones_list/', vw_cuso.CmnCmonitReporteDiarioEmbarcacionesViewSet.as_view(),name='CmnCmonitReporteDiarioEmbarcacionesViewSet'),
    path('api/v1/cmncmonitreportediarioembarcaciones/',vw_cuso.Get_post_CmnCmonitReporteDiarioEmbarcaciones.as_view(),name='Get_post_CmnCmonitReporteDiarioEmbarcaciones'),
    re_path(r'^api/v1/cmncmonitreportediarioembarcaciones/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnCmonitReporteDiarioEmbarcaciones.as_view(), name='Get_delete_update_CmnCmonitReporteDiarioEmbarcaciones'),

    path('api/v1/cmncmonitreportediarioembarcacionesactividad_list/', vw_cuso.CmnCmonitReporteDiarioEmbarcacionesActividadViewSet.as_view(),name='CmnCmonitReporteDiarioEmbarcacionesActividadViewSet'),
    path('api/v1/cmncmonitreportediarioembarcacionesactividad/',vw_cuso.Get_post_CmnCmonitReporteDiarioEmbarcacionesActividad.as_view(),name='Get_post_CmnCmonitReporteDiarioEmbarcacionesActividad'),
    re_path(r'^api/v1/cmncmonitreportediarioembarcacionesactividad/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnCmonitReporteDiarioEmbarcacionesActividad.as_view(), name='Get_delete_update_CmnCmonitReporteDiarioEmbarcacionesActividad'),

    path('api/v1/cmncmonitreportediariosistema_list/', vw_cuso.CmnCmonitReporteDiarioSistemasViewSet.as_view(),name='CmnCmonitReporteDiarioSistemasViewSet'),
    path('api/v1/cmncmonitreportediariosistema/',vw_cuso.Get_post_CmnCmonitReporteDiarioSistemas.as_view(),name='Get_post_CmnCmonitReporteDiarioSistemas'),
    re_path(r'^api/v1/cmncmonitreportediariosistema/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnCmonitReporteDiarioSistemas.as_view(), name='Get_delete_update_CmnCmonitReporteDiarioSistemas'),

    path('api/v1/cmncmonitreportediario_list/', vw_cuso.CmnCmonitReporteDiarioViewSet.as_view(),name='CmnCmonitReporteDiarioViewSet'),
    path('api/v1/cmncmonitreportediario/',vw_cuso.Get_post_CmnCmonitReporteDiario.as_view(),name='Get_post_CmnCmonitReporteDiario'),
    re_path(r'^api/v1/cmncmonitreportediario/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_CmnCmonitReporteDiario.as_view(), name='Get_delete_update_CmnCmonitReporteDiario'),

    path('api/v1/cmncabdetreportediario/',vw_cuso.Get_post_cabecera_detalle_CmnCmonitReporteDiario.as_view(),name='Get_post_cabecera_detalle_CmnCmonitReporteDiario'),
    re_path(r'^api/v1/cmncabdetreportediario/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuso.Get_delete_update_cabecera_detalle_CmnCmonitReporteDiario.as_view(), name='Get_delete_update_cabecera_detalle_CmnCmonitReporteDiario'),



]