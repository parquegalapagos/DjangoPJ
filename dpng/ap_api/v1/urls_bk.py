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

    ##################################### AUTH #################################################

    url(r'^api/v1/auth-jwt/', obtain_jwt_token),
    url(r'^api/v1/auth-jwt-refresh/', refresh_jwt_token),
    url(r'^api/v1/auth-jwt-verify/', verify_jwt_token),
    # JWT Personalizado
    path(r'api/v1/api-token-auth-jwt/', vw_auth.LoginViewUserDpng.as_view()),
    # Log Out
    url(r'^api/v1/logout-jwt/', vw_auth.LogoutUserDpng.as_view()),

    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SIS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    # SIS_CATALOGO
    path('api/v1/siscatalogo_list/', vw_sis.SisCatalogoViewSet.as_view(),name='SisCatalogoViewSet'),
    re_path(r'^api/v1/siscatalogo/(?P<pk>[0-9A-Fa-f-]+)$',vw_sis.Get_delete_update_siscatalogo.as_view(),name='Get_delete_update_siscatalogo'),
     path('api/v1/siscatalogo/',vw_sis.Get_post_siscatalogo.as_view(),name='Get_post_siscatalogo'), # Url to get update or delete a cargo funcional
    # SIS_SECUENCIAS
    path('api/v1/sissecuencia_list/', vw_sis.SisSecuenciaViewSet.as_view(),name='SisSecuenciaViewSet'),
    re_path(r'^api/v1/sissecuencia/(?P<pk>[0-9A-Fa-f-]+)$',vw_sis.Get_delete_update_sissecuencia.as_view(), name='Get_delete_update_sissecuencia'),



    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GEO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    # BIO_ESPECIE
    path('api/v1/bioespecie_list/', vw_bio.BioEspeciesViewSet.as_view(),name='BioEspeciesViewSet'),
    path('api/v1/bioespecie/',vw_bio.Get_post_bioespecies.as_view(),name='Get_post_bioespecies'),
    re_path(r'^api/v1/bioespecie/(?P<pk>[0-9A-Fa-f-]+)$',vw_bio.Get_delete_update_bioespecies.as_view(),name='Get_delete_update_bioespecies'),


    # GEO_ISLA
    path('api/v1/geoislas_list/', vw_geo.GeoIslaViewSet.as_view(),name='GeoIslaViewSet'),
    path('api/v1/geoisla/',vw_geo.Get_post_geoisla.as_view(),name='Get_post_geoisla'),
    re_path(r'^api/v1/geoisla/(?P<pk>[0-9A-Fa-f-]+)$',vw_geo.Get_delete_update_geoisla.as_view(),name='Get_delete_update_geoisla'),

    # GEO_ISLA
    path('api/v1/geositios_list/', vw_geo.GeoSitioViewSet.as_view(),name='GeoSitioViewSet'),
    path('api/v1/geositio/',vw_geo.Get_post_geositio.as_view(),name='Get_post_geositio'),
    re_path(r'^api/v1/geositio/(?P<pk>[0-9A-Fa-f-]+)$',vw_geo.Get_delete_update_geositio.as_view(),name='Get_delete_update_geositio'),

    # GEO_PARROQUIA
    path('api/v1/geoparroquia_list/', vw_geo.GeoParroquiaViewSet.as_view(),name='GeoParroquiaViewSet'),
    path('api/v1/geoparroquia/',vw_geo.Get_post_geoparroquia.as_view(),name='Get_post_geoparroquia'),
    re_path(r'^api/v1/geoparroquia/(?P<pk>[0-9A-Fa-f-]+)$',vw_geo.Get_delete_update_geoparroquia.as_view(),name='Get_delete_update_geoparroquia'),
       
	# GEO_PAIS
    re_path(r'^api/v1/geopais/(?P<pk>[0-9A-Fa-f-]+)$',vw_geo.Get_delete_update_geopais.as_view(),name='Get_delete_update_geopais'),     # urls list all and create new one
    path('api/v1/geopais/',vw_geo.Get_post_geopais.as_view(),name='Get_post_geopais'), # Url to get update or delete a cargo funcional

    # GEO_CANTON
    path('api/v1/geocanton_list/', vw_geo.GeoCantonViewSet.as_view(),name='GeoCantonViewSet'),
    re_path(r'^api/v1/geocanton/(?P<pk>[0-9A-Fa-f-]+)$',vw_geo.Get_delete_update_geocanton.as_view(),name='Get_delete_update_geocanton'),     # urls list all and create new one
    path('api/v1/geocanton/',vw_geo.Get_post_geocanton.as_view(),name='Get_post_geocanton'), # Url to get update or delete a cargo funcional

    # GEO_PROVINCIA
    path('api/v1/geoprovincia_list/', vw_geo.GeoProvinciaViewSet.as_view(),name='GeoProvinciaViewSet'),
    path('api/v1/geoprovincia/', vw_geo.Get_post_geoprovincia.as_view(),name='Get_post_geoprovincia'),
    
    # GEO_CIUDAD
    path('api/v1/geociudad_list/', vw_geo.GeoCiudadViewSet.as_view(),name='GeoCiudadViewSet'),
    path('api/v1/geociudad/',vw_geo.Get_post_geociudad.as_view(),name='Get_post_geociudad'),
    re_path(r'^api/v1/geociudad/(?P<pk>[0-9A-Fa-f-]+)$',vw_geo.Get_delete_update_geociudad.as_view(),name='Get_delete_update_geociudad'),

    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GTH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    # GTH_CARGODISTRIBUTIVO
    path('api/v1/gthcargodistributivo_list/', vw_gth.GthCargoDistributivoViewSet.as_view(),name='GthCargoDistributivoViewSet'),
    re_path(r'^api/v1/gthcargodistributivo/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthcargodistributivo.as_view(), name='Get_delete_update_gthcargodistributivo'),
    path('api/v1/gthcargodistributivo/', vw_gth.Get_post_gthcargodistributivo.as_view(), name='Get_post_gthcargodistributivo'),

    # GTH_CARGOFUNCIONAL
    path('api/v1/gthcargofuncional_list/', vw_gth.GthCargoFuncionalViewSet.as_view(),name='GthCargoFuncionalViewSet'),
    re_path(r'^api/v1/gthcargofuncional/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthcargofuncional.as_view(), name='Get_delete_update_gthcargofuncional'),
    path('api/v1/gthcargofuncional/', vw_gth.Get_post_gthcargofuncional.as_view(), name='Get_post_gthcargofuncional'),

    # GTH_CARGOINSTITUCIONAL
    path('api/v1/gthcargoinstitucional_list/', vw_gth.GthCargoInstitucionalViewSet.as_view(),name='GthCargoInstitucionalViewSet'),
    re_path(r'^api/v1/gthcargoinstitucional/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthcargoinstitucional.as_view(), name='Get_delete_update_gthcargoinstitucional'),
    path('api/v1/gthcargoinstitucional/', vw_gth.Get_post_gthcargoinstitucional.as_view(), name='Get_post_gthcargoinstitucional'),

    # GTH_CARGOOCUPACIONAL
    path('api/v1/gthcargoocupacional_list/', vw_gth.GthCargoOcupacionalViewSet.as_view(),name='GthCargoOcupacionalViewSet'),
    re_path(r'^api/v1/gthcargoocupacional/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthcargoocupacional.as_view(), name='Get_delete_update_gthcargoocupacional'),
    path('api/v1/gthcargoocupacional/', vw_gth.Get_post_gthcargoocupacional.as_view(), name='Get_post_gthcargoocupacional'),

    # GTH_BASENOmbramiento
    path('api/v1/gthbasenombramiento_list/', vw_gth.GthBaseNombramientoViewSet.as_view(),name='GthBaseNombramientoViewSet'),

    # GTH_COMISIONES
    path('api/v1/gthcomisiones_list/', vw_gth.GthComisionesViewSet.as_view(),name='GthComisionesViewSet'),
    re_path(r'^api/v1/gthcomisiones/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthcomisiones.as_view(), name='Get_delete_update_gthcomisiones'),
    path('api/v1/gthcomisiones/', vw_gth.Get_post_gthcomisiones.as_view(), name='Get_post_gthcomisiones'),

    # GTH_LICENCIAS
    path('api/v1/gthlicencias_list/', vw_gth.GthLicenciasViewSet.as_view(),name='GthLicenciasViewSet'),
    re_path(r'^api/v1/gthlicencias/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthlicencias.as_view(), name='Get_delete_update_gthlicencias'),
    path('api/v1/gthlicencias/', vw_gth.Get_post_gthlicencias.as_view(), name='Get_post_gthlicencias'),

    # GTH_MODALIDADLABORAL
    path('api/v1/gthmodalidadlaboral_list/', vw_gth.GthModalidadLaboralViewSet.as_view(),name='GthModalidadLaboralViewSet'),
    re_path(r'^api/v1/gthmodalidadlaboral/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthmodalidadlaboral.as_view(), name='Get_delete_update_gthmodalidadlaboral'),
    path('api/v1/gthmodalidadlaboral/', vw_gth.Get_post_gthmodalidadlaboral.as_view(), name='Get_post_gthmodalidadlaboral'),

    # GTH_REGIMENLABORAL
    path('api/v1/gthregimenlaboral_list/', vw_gth.GthRegimenLaboralViewSet.as_view(),name='GthRegimenLaboralViewSet'),
    re_path(r'^api/v1/gthregimenlaboral/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthregimenlaboral.as_view(), name='Get_delete_update_gthregimenlaboral'),
    path('api/v1/gthregimenlaboral/', vw_gth.Get_post_gthregimenlaboral.as_view(), name='Get_post_gthregimenlaboral'),

    # GTH_ROLLABORAL
    path('api/v1/gthrollaboral_list/', vw_gth.GthRolLaboralViewSet.as_view(),name='GthRolLaboralViewSet'),
    re_path(r'^api/v1/gthrollaboral/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthrollaboral.as_view(), name='Get_delete_update_gthrollaboral'),
    path('api/v1/gthrollaboral/', vw_gth.Get_post_gthrollaboral.as_view(), name='Get_post_gthrollaboral'),

    # GTH_SANCIONES
    path('api/v1/gthsanciones_list/', vw_gth.GthSancionesViewSet.as_view(),name='GthSancionesViewSet'),
    re_path(r'^api/v1/gthsanciones/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthsanciones.as_view(), name='Get_delete_update_gthsanciones'),
    path('api/v1/gthsanciones/', vw_gth.Get_post_gthsanciones.as_view(), name='Get_post_gthsanciones'),
    
    # GTH_ACCIONPERSONAL
    path('api/v1/gthaccionpersonal_list/', vw_gth.GthAccionPersonalViewSet.as_view(),name='GthAccionPersonalViewSet'),
    path('api/v1/gthaccionpersonal/',vw_gth.Get_post_gthaccionpersonal.as_view(),name='Get_post_gthaccionpersonal'),
    re_path(r'^api/v1/gthaccionpersonal/(?P<pk>[0-9A-Fa-f-]+)$',vw_gth.Get_delete_update_gthaccionpersonal.as_view(), name='Get_delete_update_gthaccionpersonal'),


    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
     # PER_PERSONA
    path('api/v1/perpersona_list/', vw_per.PerPersonaViewSet.as_view(),name='PerPersonaViewSet'),
    path('api/v1/perpersona_fun_list/', vw_per.PerPersonaViewSet2.as_view(),name='PerPersonaViewSet2'),
    path('api/v1/perpersona/',vw_per.Get_post_perpersona.as_view(),name='Get_post_perpersona'),
    re_path(r'^api/v1/perpersona/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perpersona.as_view(), name='Get_delete_update_perpersona'),
    path('api/v1/perpersonafuncionario/',vw_per.Get_post_perpersona_funcionario.as_view(),name='Get_post_perpersona_funcionario'),
    re_path(r'^api/v1/perpersonafuncionario/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perpersona_funcionario.as_view(), name='Get_delete_update_perpersona_funcionario'),

    # PER_FUNCIONARIO
    path('api/v1/perfuncionario_list/', vw_per.PerFuncionarioViewSet.as_view(),name='PerFuncionarioViewSet'),
    path('api/v1/perfuncionariodata_list/', vw_per.PerFuncionarioViewSetData.as_view(),name='PerFuncionarioViewSetData'),
    path('api/v1/perfuncionario/',vw_per.Get_post_perfuncionario.as_view(),name='Get_post_perfuncionario'),
    re_path(r'^api/v1/perfuncionario/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perfuncionario.as_view(), name='Get_delete_update_perfuncionario'),
    path('api/v1/perfuncionario_selectbox/',vw_per.PerFuncionario_selectbox.as_view(),name='PerFuncionario_selectbox'),
    path('api/v1/perfuncionario_selectbox2/',vw_per.PerFuncionario_selectbox2.as_view(),name='PerFuncionario_selectbox2'),

    # PER_FUNCIONARIOSANCIONES
    path('api/v1/perfuncionariosanciones_list/', vw_per.PerFuncionarioSancionesViewSet.as_view(),name='PerFuncionarioSancionesViewSet'),
    path('api/v1/perfuncionariosanciones/',vw_per.Get_post_perfuncionariosanciones.as_view(),name='Get_post_perfuncionariosanciones'),
    re_path(r'^api/v1/perfuncionariosanciones/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perfuncionariosanciones.as_view(), name='Get_delete_update_perfuncionariosanciones'),

    # PER_LICENCIAACCIONES
    path('api/v1/perlicenciaacciones_list/', vw_per.PerLicenciaAccionesViewSet.as_view(),name='PerLicenciaAccionesViewSet'),
    path('api/v1/perlicenciaacciones/',vw_per.Get_post_perlicenciaacciones.as_view(),name='Get_post_perlicenciaacciones'),
    re_path(r'^api/v1/perlicenciaacciones/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perlicenciaacciones.as_view(), name='Get_delete_update_perlicenciaacciones'),

    # PerFuncionarioAccionpersonal_traspasosACCIONES
    path('api/v1/pertraspasoacciones_list/', vw_per.PerTraspasoAccionesViewSet.as_view(),name='PerTraspasoAccionesViewSet'),
    path('api/v1/pertraspasoacciones/',vw_per.Get_post_pertraspasoacciones.as_view(),name='Get_post_pertraspasoacciones'),
    re_path(r'^api/v1/pertraspasoacciones/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_pertraspasoacciones.as_view(), name='Get_delete_update_pertraspasoacciones'),


    # PER_INGRESOSACCIONES
    path('api/v1/peringresosacciones_list/', vw_per.PerIngresosAccionesViewSet.as_view(),name='PerIngresosAccionesViewSet'),
    path('api/v1/peringresosacciones/',vw_per.Get_post_peringresosacciones.as_view(),name='Get_post_peringresosacciones'),
    re_path(r'^api/v1/peringresosacciones/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_peringresosacciones.as_view(), name='Get_delete_update_peringresosacciones'),
    
    # PER_PERSONA
    path('api/v1/perpersona/',vw_per.Get_post_perpersona.as_view(),name='Get_post_perpersona'),

    # PER_PERSONA_CUENTA
    path('api/v1/perpersonacuenta_list/', vw_per.PerPersonaCuentaViewSet.as_view(),name='PerPersonaCuentaViewSet'),
    path('api/v1/perpersonacuenta/',vw_per.Get_post_perpersonacuenta.as_view(),name='Get_post_perpersonacuenta'),
    re_path(r'^api/v1/perpersonacuenta/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perpersonacuenta.as_view(), name='Get_delete_update_perpersonacuenta'),

    # PER_PERSONA_FAMILIARES
    path('api/v1/perfuncionariofamiliares_list/', vw_per.PerFuncionarioFamiliaresViewSet.as_view(),name='PerFuncionarioFamiliaresViewSet'),
    path('api/v1/perfuncionariofamiliares/',vw_per.Get_post_perfuncionariofamiliares.as_view(),name='Get_post_perfuncionariofamiliares'),
    re_path(r'^api/v1/perfuncionariofamiliares/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perfuncionariofamiliares.as_view(), name='Get_delete_update_perfuncionariofamiliares'),

    # PER_ACCIDENTES
    path('api/v1/peraccidentes_list/', vw_per.PerAccidentesViewSet.as_view(),name='PerAccidentesViewSet'),
    path('api/v1/peraccidentes/',vw_per.Get_post_peraccidentes.as_view(),name='Get_post_peraccidentes'),
    re_path(r'^api/v1/peraccidentes/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_peraccidentes.as_view(), name='Get_delete_update_peraccidentes'),
    
    # PER_DISCAPACIDADES
    path('api/v1/perdiscapacidades_list/', vw_per.PerDiscapacidadesViewSet.as_view(),name='PerDiscapacidadesViewSet'),
    path('api/v1/perdiscapacidades/',vw_per.Get_post_perdiscapacidades.as_view(),name='Get_post_perdiscapacidades'),
    re_path(r'^api/v1/perdiscapacidades/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perdiscapacidades.as_view(), name='Get_delete_update_perdiscapacidades'),
   
    # PER_ENFERMEDADES
    path('api/v1/perenfermedades_list/', vw_per.PerEnfermedadesViewSet.as_view(),name='PerEnfermedadesViewSet'),
    path('api/v1/perenfermedades/',vw_per.Get_post_perenfermedades.as_view(),name='Get_post_perenfermedades'),
    re_path(r'^api/v1/perenfermedades/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perenfermedades.as_view(), name='Get_delete_update_perenfermedades'),

     # PER_ETNIAS
    path('api/v1/peretnias_list/', vw_per.PerEtniasViewSet.as_view(),name='PerEtniasViewSet'),
    path('api/v1/peretnias/',vw_per.Get_post_peretnias.as_view(),name='Get_post_peretnias'),
    re_path(r'^api/v1/peretnias/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_peretnias.as_view(), name='Get_delete_update_peretnias'),


    # PER_FUNCIONARIOACCIONPERSONAL
    path('api/v1/perfuncionarioaccionpersonal_list/',vw_per.PerFuncionarioAccionpersonalViewSet.as_view(),name='PerFuncionarioAccionpersonalViewSet'),
    path('api/v1/PerFuncionarioAccionpersonal_ingresos/',vw_per.PerFuncionarioAccionpersonal_ingresos.as_view(),name='PerFuncionarioAccionpersonal_ingresos'),
    path('api/v1/PerFuncionarioAccionpersonal_licencias/',vw_per.PerFuncionarioAccionpersonal_licencias.as_view(),name='PerFuncionarioAccionpersonal_licencias'),
    path('api/v1/PerFuncionarioAccionpersonal_traspasos/',vw_per.PerFuncionarioAccionpersonal_traspasos.as_view(),name='PerFuncionarioAccionpersonal_traspasos'),
    path('api/v1/PerFuncionarioAccionpersonal_encargos/',vw_per.PerFuncionarioAccionpersonal_encargos.as_view(),name='PerFuncionarioAccionpersonal_encargos'),
    path('api/v1/perfuncionarioaccionpersonal/',vw_per.Get_post_perfuncionarioaccionpersonal.as_view(),name='Get_post_perfuncionarioaccionpersonal'),
    re_path(r'^api/v1/perfuncionarioaccionpersonal/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perfuncionarioaccionpersonal.as_view(), name='Get_delete_update_perfuncionarioaccionpersonal'),

    # PER_FUNCIONARIOCARNET
    path('api/v1/PerFuncionarioCarnet_list/', vw_per.PerFuncionarioCarnetViewSet.as_view(),name='PerFuncionarioCarnetViewSet'),
    path('api/v1/perfuncionariocarnet/',vw_per.Get_post_perfuncionariocarnet.as_view(),name='Get_post_perfuncionariocarnet'),
    re_path(r'^api/v1/perfuncionariocarnet/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perfuncionariocarnet.as_view(), name='Get_delete_update_perfuncionariocarnet'),
    path('api/v1/PerFuncionarioCarnet_list/', vw_per.PerFuncionarioCarnetViewSet.as_view(),name='PerFuncionarioCarnetViewSet'),

    # PER_FUNCIONARIOPERMISOS   
    path('api/v1/PerFuncionarioPermisos_list/', vw_per.PerFuncionarioPermisosViewSet.as_view(),name='PerFuncionarioPermisosViewSet'),
    path('api/v1/perfuncionariopermisos/',vw_per.Get_post_perfuncionariopermisos.as_view(),name='Get_post_perfuncionariopermisos'),
    re_path(r'^api/v1/perfuncionariopermisos/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perfuncionariopermisos.as_view(), name='Get_delete_update_perfuncionariopermisos'),

    # PER_FUNCIONARIOCONTROLESRRHH   
    path('api/v1/perFuncionarioControlesRrhh_list/', vw_per.PerFuncionarioControlesRrhhViewSet.as_view(),name='PerFuncionarioControlesRrhhViewSet'),
    path('api/v1/perfuncionariocontrolesrrhh/',vw_per.Get_post_perfuncionariocontrolesrrhh.as_view(),name='Get_post_perfuncionariocontrolesrrhh'),
    re_path(r'^api/v1/perfuncionariocontrolesrrhh/(?P<pk>[0-9A-Fa-f-]+)$',vw_per.Get_delete_update_perfuncionariocontrolesrrhh.as_view(), name='Get_delete_update_perfuncionariocontrolesrrhh'),


    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ORG >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 

    # ORG_ORGANIZACION
    path('api/v1/orgorganizacionbanco_list/', vw_org.OrgOrganizacionBancoViewSet.as_view(),name='OrgOrganizacionBancoViewSet'),
    
    # DIR_DEPARTMENT
    path('api/v1/dirdepartment_list/', vw_dir.DirDepartmentViewSet.as_view(),name='DirDepartmentViewSet'),
    # DIR_CALSIFIACIONPROCESO
    path('api/v1/dirclasificacionproceso_list/', vw_dir.DirClasificacionProcesoViewSet.as_view(),name='DirClasificacionProcesoViewSet'),

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

    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DAF >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    
    #  daf_certificaciones
    path('api/v1/dafcertificaciones_list/', vw_daf.DafCertificacionesViewSet.as_view(),name='DafCertificacionesViewSet'),
    re_path(r'^api/v1/dafcertificaciones/(?P<pk>[0-9A-Fa-f-]+)$',vw_daf.Get_delete_update_dafcertificaciones.as_view(), name='Get_delete_update_dafcertificaciones'),
    path('api/v1/dafcertificaciones/', vw_daf.Get_post_dafcertificaciones.as_view(), name='Get_post_dafcertificaciones'),

    #  daf_certificaciones_detalles
    re_path(r'^api/v1/dafcertificacionesdetalles/(?P<pk>[0-9A-Fa-f-]+)$',vw_daf.Get_delete_update_dafcertificacionesdetalles.as_view(), name='Get_delete_update_dafcertificacionesdetalles'),
    path('api/v1/dafcertificacionesdetalles/', vw_daf.Get_post_dafcertificacionesdetalles.as_view(), name='Get_post_dafcertificacionesdetalles'),

    path('api/v1/dafcabdetcertificaciones/',vw_daf.Get_post_cabecera_detalle_certificaciones.as_view(),name='Get_post_cabecera_detalle_certificaciones'),
    re_path(r'^api/v1/dafcabdetcertificaciones/(?P<pk>[0-9A-Fa-f-]+)$',vw_daf.Get_delete_update_cabecera_detalle_certificaciones.as_view(), name='Get_delete_update_cabecera_detalle_certificaciones'),
    
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

    # unidadmedida
    path('api/v1/sptunidadmedida_list/', vw_spt.SptUnidadMedidaViewSet.as_view(),name='SptUnidadMedidaViewSet'),
    path('api/v1/sptunidadmedida/',vw_spt.Get_post_sptunidadmedida.as_view(),name='Get_post_sptunidadmedida'),
    re_path(r'^api/v1/sptunidadmedida/(?P<pk>[0-9A-Fa-f-]+)$',vw_spt.Get_delete_update_sptunidadmedida.as_view(), name='Get_delete_update_sptunidadmedida'),

    # equipos
    path('api/v1/sptequipo_list/', vw_spt.SptEquiposViewSet.as_view(),name='SptEquiposViewSet'),
    path('api/v1/sptequipo/',vw_spt.Get_post_sptequipos.as_view(),name='Get_post_sptequipos'),
    re_path(r'^api/v1/sptequipo/(?P<pk>[0-9A-Fa-f-]+)$',vw_spt.Get_delete_update_sptequipos.as_view(), name='Get_delete_update_sptequipos'),


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
    path('api/v1/bsaparametrosconfig_list/', vw_bsa.BsaParametrosConfigViewSet.as_view(),name='BsaParametrosConfigViewSet'),
    path('api/v1/bsaparametrosconfig/',vw_bsa.Get_post_bsaparametrosconfig.as_view(),name='Get_post_bsaparametrosconfig'),
    re_path(r'^api/v1/bsaparametrosconfig/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_bsaparametrosconfig.as_view(), name='Get_delete_update_bsaparametrosconfig'),

    path('api/v1/bsainformecampo_list/', vw_bsa.BsaInformeCampoViewSet.as_view(),name='BsaInformeCampoViewSet'),
    path('api/v1/bsainformecampo/',vw_bsa.Get_post_bsainformecampo.as_view(),name='Get_post_bsainformecampo'),
    re_path(r'^api/v1/bsainformecampo/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_bsainformecampo.as_view(), name='Get_delete_update_bsainformecampo'),

    path('api/v1/bsainformecampodetalle_list/', vw_bsa.BsaInformeCampoDetalleViewSet.as_view(),name='BsaInformeCampoDetalleViewSet'),
    path('api/v1/bsainformecampodetalle/',vw_bsa.Get_post_bsainformecampodetalle.as_view(),name='Get_post_bsainformecampodetalle'),
    re_path(r'^api/v1/bsainformecampodetalle/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_bsainformecampodetalle.as_view(), name='Get_delete_update_bsainformecampodetalle'),

    path('api/v1/bsacabdetinformecampo/',vw_bsa.Get_post_cabecera_detalle_informecampo.as_view(),name='Get_post_cabecera_detalle_informecampo'),
    re_path(r'^api/v1/bsacabdetinformecampo/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_cabecera_detalle_informecampo.as_view(), name='Get_delete_update_cabecera_detalle_informecampo'),

    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> cuem - Manejo Pesquero >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    path('api/v1/appfdtdatospescador_list/', vw_cuem.AppFdTdatospescadorViewSet.as_view(),name='AppFdTdatospescadorViewSet'),
    path('api/v1/appfdtdatospescador/',vw_cuem.Get_post_AppFdTdatospescador.as_view(),name='Get_post_AppFdTdatospescador'),
    re_path(r'^api/v1/appfdtdatospescador/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuem.Get_delete_update_AppFdTdatospescador.as_view(), name='Get_delete_update_AppFdTdatospescador'),
    
    path('api/v1/appfdtlicenciaparma_list/', vw_cuem.AppFdTlicenciaparmaViewSet.as_view(),name='AppFdTlicenciaparmaViewSet'),
    path('api/v1/appfdtlicenciaparma/',vw_cuem.Get_post_AppFdTlicenciaparma.as_view(),name='Get_post_AppFdTlicenciaparma'),
    re_path(r'^api/v1/appfdtlicenciaparma/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuem.Get_delete_update_AppFdTlicenciaparma.as_view(), name='Get_delete_update_AppFdTlicenciaparma'),
    
    #cab embarcacion pesca
   # path('api/v1/appfdtembarcacionpesca_list/', vw_cuem.AppFdTembarcacionpescaViewSet.as_view(),name='AppFdTembarcacionpescaViewSet'),
   # path('api/v1/appfdtembarcacionpesca/',vw_cuem.Get_post_AppFdTembarcacionpesca.as_view(),name='Get_post_AppFdTembarcacionpesca'),
   # re_path(r'^api/v1/appfdtembarcacionpesca/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuem.Get_delete_update_AppFdTembarcacionpesca.as_view(), name='Get_delete_update_AppFdTFdTembarcacionpesca'),
    
    #cab permisopesca
    #path('api/v1/appfdtpermisopesca_list/', vw_cuem.AppFdTpermisopescaViewSet.as_view(),name='AppFdTpermisopescaViewSet'),
    #path('api/v1/appfdtpermisopesca/',vw_cuem.Get_post_AppFdTpermisopesca.as_view(),name='Get_post_AppFdTpermisopesca'),
   # re_path(r'^api/v1/appfdtpermisopesca/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuem.Get_delete_update_AppFdTpermisopesca.as_view(), name='Get_delete_update_AppFdTpermisopesca'),

    #cab permisocompesblan
    path('api/v1/appfdtpermisocompesblan_list/', vw_cuem.AppFdTpermisocompesblanViewSet.as_view(),name='AppFdTpermisocompesblanViewSet'),
    path('api/v1/appfdtpermisocompesblan/',vw_cuem.Get_post_AppFdTpermisocompesblan.as_view(),name='Get_post_AppFdTpermisocompesblan'),
    re_path(r'^api/v1/appfdtpermisocompesblan/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuem.Get_delete_update_AppFdTpermisocompesblan.as_view(), name='Get_delete_update_AppFdTpermisocompesblan'),

    
    #cab permisolasgosta
    path('api/v1/appfdtpermisocomlangosta_list/', vw_cuem.AppFdTpermisocomlangostaViewSet.as_view(),name='AppFdTpermisocomlangostaViewSet'),
    path('api/v1/appfdtpermisocomlangosta/',vw_cuem.Get_post_AppFdTpermisocomlangosta.as_view(),name='Get_post_AppFdTpermisocomlangosta'),
    re_path(r'^api/v1/appfdtpermisocomlangosta/(?P<pk>[0-9A-Fa-f-]+)$',vw_cuem.Get_delete_update_AppFdTpermisocomlangosta.as_view(), name='Get_delete_update_AppFdpermisocomlangosta'),


    path('api/v1/bsainformetecnico_list/', vw_bsa.BsaInformeTecnicoViewSet.as_view(),name='BsaInformeTecnicoViewSet'),
    path('api/v1/bsainformetecnico/',vw_bsa.Get_post_bsainformetecnico.as_view(),name='Get_post_bsainformetecnico'),
    re_path(r'^api/v1/bsainformetecnico/(?P<pk>[0-9A-Fa-f-]+)$',vw_bsa.Get_delete_update_bsainformetecnico.as_view(), name='Get_delete_update_bsainformetecnico'),
]