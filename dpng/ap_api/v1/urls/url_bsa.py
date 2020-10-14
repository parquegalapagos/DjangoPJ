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
    
    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> bsa >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    path('api/v1/trppersonavehiculo_list/', vw_bsa.TrpPersonaVehiculoViewSet.as_view(),name='TrpPersonaVehiculoViewSet'),
    path('api/v1/trppersonavehiculo/',vw_bsa.Get_post_trppersonavehiculo.as_view(),name='Get_post_trppersonavehiculo'),
    re_path(r'^api/v1/trppersonavehiculo/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_trppersonavehiculo.as_view(), name='Get_delete_update_trppersonavehiculo'),
    
    #vehiculo
    path('api/v1/trpvehiculo_list/', vw_bsa.TrpVehiculoViewSet.as_view(),name='TrpVehiculoViewSet'),
    path('api/v1/trpvehiculo/',vw_bsa.Get_post_trpvehiculo.as_view(),name='Get_post_trpvehiculo'),
    re_path(r'^api/v1/trpvehiculo/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_trpvehiculo.as_view(), name='Get_delete_update_trpvehiculo'),

    # vehiculotipo
    path('api/v1/trpvehiculotipo_list/', vw_bsa.TrpVehiculoTipoViewSet.as_view(),name='TrpVehiculoTipoViewSet'),
    path('api/v1/trpvehiculotipo/',vw_bsa.Get_post_trpvehiculotipo.as_view(),name='Get_post_trpvehiculotipo'),
    re_path(r'^api/v1/trpvehiculotipo/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_trpvehiculotipo.as_view(), name='Get_delete_update_trpvehiculotipo'),

    # tipo Usuario
    path('api/v1/trptipousuario_list/', vw_bsa.TrpTipoUsuarioViewSet.as_view(),name='TrpTipoUsuarioViewSet'),
    path('api/v1/trptipousuario/',vw_bsa.Get_post_trptipousuario.as_view(),name='Get_post_trptipousuario'),
    re_path(r'^api/v1/trptipousuario/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_trptipousuario.as_view(), name='Get_delete_update_trptipousuario'),

    #cab materia petreo
    path('api/v1/trpcontrolmaterialpetreo_list/', vw_bsa.TrpControlMaterialPetreoViewSet.as_view(),name='TrpControlMaterialPetreoViewSet'),
    path('api/v1/trpcontrolmaterialpetreo/',vw_bsa.Get_post_trpcontrolmaterialpetreo.as_view(),name='Get_post_trpcontrolmaterialpetreo'),
    re_path(r'^api/v1/trpcontrolmaterialpetreo/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_trpcontrolmaterialpetreo.as_view(), name='Get_delete_update_trpcontrolmaterialpetreo'),
    
    #det materia petreo
    path('api/v1/trpcontrolmaterialpetreodetalle_list/', vw_bsa.TrpControlMaterialPetreoDetalleViewSet.as_view(),name='TrpControlMaterialPetreoDetalleViewSet'),
    path('api/v1/trpcontrolmaterialpetreodetalle/',vw_bsa.Get_post_trpcontrolmaterialpetreodetalle.as_view(),name='Get_post_trpcontrolmaterialpetreodetalle'),
    re_path(r'^api/v1/trpcontrolmaterialpetreodetalle/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_trpcontrolmaterialpetreodetalle.as_view(), name='Get_delete_update_trpcontrolmaterialpetreodetalle'),
    path('api/v1/trpcabdetcontrolmaterialpetreo/',vw_bsa.Get_post_cabecera_detalle_materialPetreo.as_view(),name='Get_post_cabecera_detalle_materialPetreo'),
    re_path(r'^api/v1/trpcabdetcontrolmaterialpetreo/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_cabecera_detalle_materialPetreo.as_view(), name='Get_delete_update_cabecera_detalle_materialPetreo'),


    # Parametro Configuracion
    path('api/v1/bsaparametrosconfig_list/', vw_bsa.BsaParametrosConfigViewSet.as_view(),name='BsaParametrosConfigViewSet'),
    path('api/v1/bsaparametrosconfig/',vw_bsa.Get_post_bsaparametrosconfig.as_view(),name='Get_post_bsaparametrosconfig'),
    re_path(r'^api/v1/bsaparametrosconfig/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_bsaparametrosconfig.as_view(), name='Get_delete_update_bsaparametrosconfig'),

    #cab materia petreo
    path('api/v1/bsainformecampo_list/', vw_bsa.BsaInformeCampoViewSet.as_view(),name='BsaInformeCampoViewSet'),
    path('api/v1/bsainformecampo/',vw_bsa.Get_post_bsainformecampo.as_view(),name='Get_post_bsainformecampo'),
    re_path(r'^api/v1/bsainformecampo/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_bsainformecampo.as_view(), name='Get_delete_update_bsainformecampo'),

    path('api/v1/bsainformecampodetalle_list/', vw_bsa.BsaInformeCampoDetalleViewSet.as_view(),name='BsaInformeCampoDetalleViewSet'),
    path('api/v1/bsainformecampodetalle/',vw_bsa.Get_post_bsainformecampodetalle.as_view(),name='Get_post_bsainformecampodetalle'),
    re_path(r'^api/v1/bsainformecampodetalle/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_bsainformecampodetalle.as_view(), name='Get_delete_update_bsainformecampodetalle'),

    path('api/v1/bsacabdetinformecampo/',vw_bsa.Get_post_cabecera_detalle_informecampo.as_view(),name='Get_post_cabecera_detalle_informecampo'),
    re_path(r'^api/v1/bsacabdetinformecampo/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_cabecera_detalle_informecampo.as_view(), name='Get_delete_update_cabecera_detalle_informecampo'),

    #cab novedades
    path('api/v1/bsainformenovedades_list/', vw_bsa.BsaInformeNovedadesViewSet.as_view(),name='BsaInformeNovedadesViewSet'),
    path('api/v1/bsainformenovedades/',vw_bsa.Get_post_bsainformenovedades.as_view(),name='Get_post_bsainformenovedades'),
    re_path(r'^api/v1/bsainformenovedades/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_bsainformenovedades.as_view(), name='Get_delete_update_bsainformenovedades'),

    path('api/v1/bsainformenovedadesdetalle_list/', vw_bsa.BsaInformeNovedadesDetalleViewSet.as_view(),name='BsaInformeNovedadesDetalleViewSet'),
    path('api/v1/bsainformenovedadesdetalle/',vw_bsa.Get_post_bsainformenovedadesdetalle.as_view(),name='Get_post_bsainformenovedadesdetalle'),
    re_path(r'^api/v1/bsainformenovedadesdetalle/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_bsainformenovedadesdetalle.as_view(), name='Get_delete_update_bsainformenovedadesdetalle'),

    path('api/v1/bsacabdetinformenovedades/',vw_bsa.Get_post_cabecera_detalle_informenovedades.as_view(),name='Get_post_cabecera_detalle_informenovedades'),
    re_path(r'^api/v1/bsacabdetinformenovedades/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_cabecera_detalle_informenovedades.as_view(), name='Get_delete_update_cabecera_detalle_informenovedades'),

    path('api/v1/bsainformetecnico_list/', vw_bsa.BsaInformeTecnicoViewSet.as_view(),name='BsaInformeTecnicoViewSet'),
    path('api/v1/bsainformetecnico/',vw_bsa.Get_post_bsainformetecnico.as_view(),name='Get_post_bsainformetecnico'),
    re_path(r'^api/v1/bsainformetecnico/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_bsainformetecnico.as_view(), name='Get_delete_update_bsainformetecnico'),

    


]