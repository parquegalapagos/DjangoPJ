# DJANGO
from django.urls import path, re_path
from django.conf.urls import include, url
from django.contrib import admin

# VIEWS
from . import views


#STATIC
from django.conf import settings
from django.conf.urls.static import static

from django.views import generic

urlpatterns = [
	
	#servicios ambientales
	path('menu_bsa', views.menu_bsa, name='menu_bsa'),
	path('mpetreos',views.sptMpetreoList, name='mpetreos'),

	path('data_vehiculosXpersona',views.data_vehiculosXpersona, name='data_vehiculosXpersona'),
	path('vehiculo',views.trpVehiculoList, name='vehiculo'),
	path('vehiculotipo',views.trpVehiculoTipoList, name='vehiculotipo'),
	path('tipousuario',views.trpTipoUsuarioList, name='tipousuario'),
	path('bsaparametrosconfig',views.BsaParametrosConfigList, name='bsaparametrosconfig'),
	
	path('data_vehiculoParam',views.data_vehiculoParam, name='data_vehiculoParam'),
	path('vehiculo_data',views.vehiculo_data, name='vehiculo_data'),

	path('data_vehiculotipoParam',views.data_vehiculotipoParam, name='data_vehiculotipoParam'),
	path('vehiculotipo_data',views.vehiculotipo_data, name='vehiculotipo_data'),

	path('data_tipousuarioParam',views.data_tipousuarioParam, name='data_tipotipousuarioParam'),
	path('tipousuario_data',views.tipousuario_data, name='tipousuario_data'),

	path('controlMaterial_data',views.controlMaterial_data, name='controlMaterial_data'),
	path('data_controlMaterialParam',views.data_controlMaterialParam, name='data_controlMaterialParam'),
	path('data_controlMaterialDetalleParam',views.data_controlMaterialDetalleParam, name='data_controlMaterialDetalleParam'),
	path('infcampo',views.trpInfoCampo, name='infcampo'),
	path('data_infoCampoCab',views.data_infoCampoCab, name='data_infoCampoCab'),
	path('data_infoCampoCabParam',views.data_infoCampoCabParam, name='data_infoCampoCabParam'),
	path('data_secinfoCampoCab',views.data_secinfoCampoCab, name='data_secinfoCampoCab'),
	
	path('data_bsaparametrosconfigParam',views.data_bsaparametrosconfigParam, name='data_bsaparametrosconfigParam'),
	path('bsaparametrosconfig_data',views.bsaparametrosconfig_data, name='bsaparametrosconfig_data'),

	path('infpetreos',views.trpInfoTecnico, name='infpetreos'),
	path('data_infoTecGestPetParam',views.data_infoTecGestPetParam, name='data_infoTecGestPetParam'),
	path('infoTecGestPet_data',views.infoTecGestPet_data, name='infoTecGestPet_data'),

	path('upload_files_json_informe',views.upload_files_json_informe, name='upload_files_json_informe'),
	path('delete_files_informe',views.delete_files_informe, name='delete_files_informe'),

	path('infnovedades',views.trpInfoNovedad, name='infnovedades'),
	path('data_infoNovedadesCab',views.data_infoNovedadesCab, name='data_infoNovedadesCab'),
	path('data_infoNovedadesCabParam',views.data_infoNovedadesCabParam, name='data_infoNovedadesCabParam'),
	path('data_secinfoNovedadesCab',views.data_secinfoNovedadesCab, name='data_secinfoNovedadesCab'),

	path('update_General_bsa',views.update_General_bsa, name='update_General_bsa'),
	path('insert_General_bsa',views.insert_General_bsa, name='insert_General_bsa'),

	path('data_subprocesoXproc',views.data_subprocesoXproc, name='data_subprocesoXproc'),
	path('datasecuencia_InformeTecGestPetST',views.datasecuencia_InformeTecGestPetST, name='datasecuencia_InformeTecGestPetST'),
]