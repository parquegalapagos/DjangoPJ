from django.urls import path
from . import views
from ap_base import views as view_base
from django.conf.urls import url

urlpatterns = [
    
    path('generarSessionToken/', view_base.generarSessionToken, name='generarSessionToken'),

    #path('espnativas', views.especies_nativas, name='especies_nativas'),
    path('SP_funcionarios', views.SP_funcionarios, name='SP_funcionarios'),
    path('SP_accPersonal', views.SP_accPersonal, name='SP_accPersonal'),
    path('data_accionPer', views.data_accionPer, name='data_accionPer'),
    path('data_accionesParam', views.data_accionesParam, name='data_accionesParam'),
    path('SP_sanciones', views.SP_sanciones, name='SP_sanciones'),
    path('data_sanciones', views.data_sanciones, name='data_sanciones'),
    path('data_sancionesParam', views.data_sancionesParam, name='data_sancionesParam'),
    path('SP_licencias', views.SP_licencias, name='SP_licencias'),
    path('data_licencias', views.data_licencias, name='data_licencias'),
    path('data_licenciasParam', views.data_licenciasParam, name='data_licenciasParam'),
    path('SP_encargos', views.SP_encargos, name='SP_encargos'),
    path('data_encargos', views.data_encargos, name='data_encargos'),
    path('data_encargosParam', views.data_encargosParam, name='data_encargosParam'),
    path('SP_ingresos', views.SP_ingresos, name='SP_ingresos'),
    path('data_ingreso', views.data_ingreso, name='data_ingreso'),
    path('historial_ingreso', views.historial_ingreso, name='historial_ingreso'),
    path('data_ingresosParam', views.data_ingresosParam, name='data_ingresosParam'),
    path('funcionario_data', views.funcionario_data, name='funcionario_data'),
    path('persona_data', views.persona_data, name='persona_data'),
    #path('funcionario_data', views.funcionario_data, name='funcionario_data'),
    path('funcionario_data2', views.funcionario_data2, name='funcionario_data2'),
    path('get_DatosRegistroCivil', views.get_DatosRegistroCivil, name='get_DatosRegistroCivil'),
    path('get_FamiliaresFunc/', views.get_FamiliaresFunc, name='get_FamiliaresFunc'),
    path('famFun_data/', views.famFun_data, name='famFun_data'),
    path('getCiudadXpais', views.getCiudadXpais, name='getCiudadXpais'),
    path('historial_traspasos', views.historial_traspasos, name='historial_traspasos'),
    path('historial_encargos', views.historial_encargos, name='historial_encargos'),
    path('historial_licencias', views.historial_licencias, name='historial_licencias'),
    path('historial_sanciones', views.historial_sanciones, name='historial_sanciones'),
    path('SP_traslados', views.SP_traslados, name='SP_traslados'),
    path('data_traslados', views.data_traslados, name='data_traslados'),
    path('data_trasladosParam', views.data_trasladosParam, name='data_trasladosParam'),
    path('SP_iniciarTramite', views.SP_iniciarTramite, name='SP_iniciarTramite'),
    path('SL_permisos_bandeja_revisor', views.SL_permisos_bandeja_revisor, name='SL_permisos_bandeja_revisor'),
    path('SL_permisos_bandeja_aprobador', views.SL_permisos_bandeja_aprobador, name='SL_permisos_bandeja_aprobador'),
    path('SL_Permisos_estadotramite', views.SL_Permisos_estadotramite, name='SL_Permisos_estadotramite'),
    path('SP_asistencia', views.SP_asistencia, name='SP_asistencia'),
    path('data_control', views.data_control, name='data_control'),
    path('data_secuencia', views.data_secuencia, name='data_secuencia'),
    path('solicitud_data', views.solicitud_data, name='solicitud_data'),
    path('data_itemAccionPer', views.data_itemAccionPer, name='data_itemAccionPer'),
    path('data_itemPerFuncionarioAccionPer', views.data_itemPerFuncionarioAccionPer, name='data_itemPerFuncionarioAccionPer'),

    path('split', views.split, name='split'),
 
    #configuracion
    path('cuentaBan/', views.cuentaBan, name='cuentaBan'),
    path('get_bancoFunc/', views.get_bancoFunc, name='get_bancoFunc'),
    #enfermedades
    path('accidentes/', views.accidentes, name='accidentes'),
    path('enfermedades/', views.enfermedades, name='enfermedades'),
    path('discapacidades/', views.discapacidades, name='discapacidades'),
    #cargos
    path('distributivo/', views.distributivo, name='distributivo'),
    path('funcional/', views.funcional, name='funcional'),
    path('institucional/', views.institucional, name='institucional'),
    path('ocupacional/', views.ocupacional, name='ocupacional'),
    #otros
    path('rol_laboral/', views.rol_laboral, name='rol_laboral'),
    path('comision/', views.comision, name='comision'),
    path('etnias/', views.etnias, name='etnias'),
    path('licencias/', views.licencias, name='licencias'),
    path('modalidad/', views.modalidad, name='modalidad'),
    path('regimen/', views.regimen, name='regimen'),
    path('sanciones/', views.sanciones, name='sanciones'),
    path('accion_personal/', views.accion_personal, name='accion_personal'), 
    path('personas/', views.personas, name='personas'),

    #Permisos
    path('SL_Permisos/', views.SL_Permisos, name='SL_Permisos'),  
    path('markdown_uploader/', views.markdown_uploader, name='markdown_uploader'),

    #Carnetizacion
    path('CZ_carnetizacion/', views.CZ_carnetizacion, name='CZ_carnetizacion'),
    path('CZ_carnetizacionCargos/', views.CZ_carnetizacionCargos, name='CZ_carnetizacionCargos'),
    path('funcionario_selectbox/', views.funcionario_selectbox, name='funcionario_selectbox'), 
    path('data_carnetizacion/', views.data_carnetizacion, name='data_carnetizacion'),

    path('TP_AccionIngreso/', views.TP_AccionIngreso, name='TP_AccionIngreso'),
    path('TP_ingreso/', views.TP_ingreso, name='TP_ingreso'),
    path('TP_AccionEncargo/', views.TP_AccionEncargo, name='TP_AccionEncargo'),
    path('TP_AccionLicencia/', views.TP_AccionLicencia, name='TP_AccionLicencia'),
    path('TP_AccionTraslados/', views.TP_AccionTraslados, name='TP_AccionTraslados'),
    path('TP_Traslados/', views.TP_Traslados, name='TP_Traslados'),
    

    path('SP_tabFuncionarios/', views.SP_tabFuncionarios, name='SP_tabFuncionarios'),
    path('SP_repFuncionarios/', views.SP_repFuncionarios, name='SP_repFuncionarios'),
    path('SP_repAcciones/', views.SP_repAcciones, name='SP_repAcciones'),
    path('SP_repSanciones/', views.SP_repSanciones, name='SP_repSanciones'),
    path('SP_repTramites/', views.SP_repTramites, name='SP_repTramites'),
    path('SP_repFamiliaresFun/', views.SP_repFamiliaresFun, name='SP_repFamiliaresFun'),
    path('data_funcionarioParam/', views.data_funcionarioParam, name='data_funcionarioParam'),
    path('SP_dashboard/', views.SP_dashboard, name='SP_dashboard'),

    path('data_tramitesParam/', views.data_tramitesParam, name='data_tramitesParam'),
    
    #url(r'^generar_cntz_pdf$', views.generar_cntz_pdf),
    
    
]

