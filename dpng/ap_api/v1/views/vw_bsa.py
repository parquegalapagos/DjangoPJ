# Django

# DRF

# Local
from .vw_base import Get_post_base,Get_delete_update_base,CommonFilterViewSet
from ap_talentohumano.models import GthCargoFuncional,GthAccionpersonal
from ap_serv_ambientales.models import *
from ap_api.v1.serializers.sz_spt import *
from ap_api.v1.serializers.sz_bsa import *
from ap_base.pagination import CustomPagination, LargePagination

from django.db.models import Max
import json
from django.core.serializers.json import DjangoJSONEncoder
from rest_framework.pagination import LimitOffsetPagination


# TipoVehiculo
class TrpVehiculoTipoViewSet(CommonFilterViewSet):
    __basic_fields = ['nombre','id']
    serializer_class = TrpVehiculoTipoSerializer_list
    queryset = TrpVehiculoTipo.objects.all().filter(eliminado='f').order_by('nombre')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_trpvehiculotipo(Get_post_base):
    serializer_class = TrpVehiculoTipoSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, TrpVehiculoTipo)

    def post(self, request):
        return Get_post_base.post(self, request, TrpVehiculoTipoSerializer)

class Get_delete_update_trpvehiculotipo(Get_delete_update_base):
    serializer_class = TrpVehiculoTipoSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,TrpVehiculoTipo,TrpVehiculoTipoSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,TrpVehiculoTipo,TrpVehiculoTipoSerializer)

#servicios ambientales PersonaVehiculo
class TrpPersonaVehiculoViewSet(CommonFilterViewSet):
    __basic_fields = ['persona_id','id','vehiculo_id',]
    serializer_class = TrpPersonaVehiculoSerializer_list
    queryset = TrpPersonaVehiculo.objects.all().filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_trppersonavehiculo(Get_post_base):
    serializer_class = TrpPersonaVehiculoSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, TrpPersonaVehiculo)

    def post(self, request):
        return Get_post_base.post(self, request, TrpPersonaVehiculoSerializer)

class Get_delete_update_trppersonavehiculo(Get_delete_update_base):
    serializer_class = TrpPersonaVehiculoSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,TrpPersonaVehiculo,TrpPersonaVehiculoSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,TrpPersonaVehiculo,TrpPersonaVehiculoSerializer)

#servicios ambientales Vehiculo
class TrpVehiculoViewSet(CommonFilterViewSet):
    __basic_fields = ['id','descripcion','identificador',]
    serializer_class = TrpVehiculoSerializer_list
    queryset = TrpVehiculo.objects.all().filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_trpvehiculo(Get_post_base):
    serializer_class = TrpVehiculoSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, TrpVehiculo)

    def post(self, request):
        return Get_post_base.post(self, request, TrpVehiculoSerializer)

class Get_delete_update_trpvehiculo(Get_delete_update_base):
    serializer_class = TrpVehiculoSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,TrpVehiculo,TrpVehiculoSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,TrpVehiculo,TrpVehiculoSerializer)


#servicios ambientales TipoUsuario

class TrpTipoUsuarioViewSet(CommonFilterViewSet):
    __basic_fields = ['id','descripcion',]
    serializer_class = TrpTipoUsuarioSerializer_list
    queryset = TrpTipoUsuario.objects.all().filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_trptipousuario(Get_post_base):
    serializer_class = TrpTipoUsuarioSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, TrpTipoUsuario)

    def post(self, request):
        return Get_post_base.post(self, request, TrpTipoUsuarioSerializer)

class Get_delete_update_trptipousuario(Get_delete_update_base):
    serializer_class = TrpTipoUsuarioSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,TrpTipoUsuario,TrpTipoUsuarioSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,TrpTipoUsuario,TrpTipoUsuarioSerializer)

class TrpControlMaterialPetreoViewSet(CommonFilterViewSet):
    __basic_fields = ['usuario_id','tipo_usuario_id','id',]
    serializer_class = TrpControlMaterialPetreoSerializer_list
    queryset = TrpControlMaterialPetreo.objects.all().filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_trpcontrolmaterialpetreo(Get_post_base):
    serializer_class = TrpControlMaterialPetreoSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, TrpControlMaterialPetreo)

    def post(self, request):
        return Get_post_base.post(self, request, TrpControlMaterialPetreoSerializer)

class Get_delete_update_trpcontrolmaterialpetreo(Get_delete_update_base):
    serializer_class = TrpControlMaterialPetreoSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,TrpControlMaterialPetreo,TrpControlMaterialPetreoSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,TrpControlMaterialPetreo,TrpControlMaterialPetreoSerializer)

class TrpControlMaterialPetreoDetalleViewSet(CommonFilterViewSet):
    __basic_fields = ['cab_matpetreo_id','fecha_viaje','sitio_extraccion_id','id',]
    serializer_class = TrpControlMaterialPetreoDetalleSerializer_list
    queryset = TrpControlMaterialPetreoDetalle.objects.all().filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_trpcontrolmaterialpetreodetalle(Get_post_base):
    serializer_class = TrpControlMaterialPetreoDetalleSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, TrpControlMaterialPetreoDetalle)

    def post(self, request):
        return Get_post_base.post(self, request, TrpControlMaterialPetreoDetalleSerializer)

class Get_delete_update_trpcontrolmaterialpetreodetalle(Get_delete_update_base):
    serializer_class = TrpControlMaterialPetreoDetalleSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,TrpControlMaterialPetreoDetalle,TrpControlMaterialPetreoDetalleSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,TrpControlMaterialPetreoDetalle,TrpControlMaterialPetreoDetalleSerializer)

class Get_post_cabecera_detalle_materialPetreo(Get_post_base):
    serializer_class = TrpControlMaterialPetreoCabDetSerializer
    pagination_class = LimitOffsetPagination
    # Get all perpersona
    def get(self, request):
        print("Getting perpersona...")
        return Get_post_base.get(self, request, TrpControlMaterialPetreo)

    def post(self, request):
        print("Getting perpersona...")
        return Get_post_base.post(self, request, TrpControlMaterialPetreoCabDetSerializer)


class Get_delete_update_cabecera_detalle_materialPetreo(Get_delete_update_base):
    serializer_class = TrpControlMaterialPetreoCabDetSerializer

    # Get all perpersona
    def get(self, request, pk):
        print("Consultando perpersona...")
        return Get_delete_update_base.get(self, request, pk,TrpControlMaterialPetreo,TrpControlMaterialPetreoCabDetSerializer)

    # Update a perpersona
    def put(self, request, pk):
        
        print("Actualizando perpersona...")
        return Get_delete_update_base.put(self, request, pk,TrpControlMaterialPetreo,TrpControlMaterialPetreoCabDetSerializer)



# Parametro Configuracion

class BsaParametrosConfigViewSet(CommonFilterViewSet):
    __basic_fields = ['id','nombre','categoria','valor',]
    serializer_class = BsaParametrosConfigSerializer_list
    queryset = BsaParametrosConfig.objects.all().filter(eliminado='f')

    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_bsaparametrosconfig(Get_post_base):
    serializer_class = BsaParametrosConfigSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, BsaParametrosConfig)

    def post(self, request):
        return Get_post_base.post(self, request, BsaParametrosConfigSerializer)

class Get_delete_update_bsaparametrosconfig(Get_delete_update_base):

    serializer_class = BsaParametrosConfigSerializer



    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,BsaParametrosConfig,BsaParametrosConfigSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):

        return Get_delete_update_base.put(self, request, pk,BsaParametrosConfig,BsaParametrosConfigSerializer)


#servicios ambientales Vehiculo
class BsaInformeCampoViewSet(CommonFilterViewSet):
    __basic_fields = ['id','numero','sitio_id','fecha_presentacion',]
    serializer_class = BsaInformeCampoSerializer_list
    queryset = BsaInformeCampo.objects.all().filter(eliminado='f').order_by('-numero')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_bsainformecampo(Get_post_base):
    serializer_class = BsaInformeCampoSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, BsaInformeCampo)

    def post(self, request):
        return Get_post_base.post(self, request, BsaInformeCampoSerializer)

class Get_delete_update_bsainformecampo(Get_delete_update_base):
    serializer_class = BsaInformeCampo

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,BsaInformeCampo,BsaInformeCampoSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,BsaInformeCampo,BsaInformeCampoSerializer)

#servicios ambientales Vehiculo
class BsaInformeCampoDetalleViewSet(CommonFilterViewSet):
    __basic_fields = ['id','cab_infcampo_id',]
    serializer_class = BsaInformeCampoDetalleSerializer_list
    queryset = BsaInformeCampoDetalle.objects.all().filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_bsainformecampodetalle(Get_post_base):
    serializer_class = BsaInformeCampoSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, BsaInformeCampoDetalle)

    def post(self, request):
        return Get_post_base.post(self, request, BsaInformeCampoDetalleSerializer)

class Get_delete_update_bsainformecampodetalle(Get_delete_update_base):
    serializer_class = BsaInformeCampoDetalle

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,BsaInformeCampoDetalle,BsaInformeCampoDetalleSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,BsaInformeCampoDetalle,BsaInformeCampoDetalleSerializer)

class Get_post_cabecera_detalle_informecampo(Get_post_base):
    serializer_class = BsaInformeCampoCabDetSerializer
    pagination_class = LimitOffsetPagination
    # Get all perpersona
    def get(self, request):
        print("Getting perpersona...")
        return Get_post_base.get(self, request, BsaInformeCampo)

    def post(self, request):
        print("Getting perpersona...")
        return Get_post_base.post(self, request, BsaInformeCampoCabDetSerializer)


class Get_delete_update_cabecera_detalle_informecampo(Get_delete_update_base):
    serializer_class = BsaInformeCampoCabDetSerializer

    # Get all perpersona
    def get(self, request, pk):
        print("Consultando perpersona...")
        return Get_delete_update_base.get(self, request, pk,BsaInformeCampo,BsaInformeCampoCabDetSerializer)

    # Update a perpersona
    def put(self, request, pk):
        
        print("Actualizando perpersona...")
        return Get_delete_update_base.put(self, request, pk,BsaInformeCampo,BsaInformeCampoCabDetSerializer)


#servicios ambientales Vehiculo
class BsaInformeTecnicoViewSet(CommonFilterViewSet):
    __basic_fields = ['id','numero','tema','fecha','tecnicos','archivo',]
    serializer_class = BsaInformeTecnicoSerializer_list
    queryset = BsaInformeTecnico.objects.all().filter(eliminado='f').order_by('-numero')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_bsainformetecnico(Get_post_base):
    serializer_class = BsaInformeTecnicoSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, BsaInformeTecnico)

    def post(self, request):
        return Get_post_base.post(self, request, BsaInformeTecnicoSerializer)

class Get_delete_update_bsainformetecnico(Get_delete_update_base):
    serializer_class = BsaInformeTecnico

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,BsaInformeTecnico,BsaInformeTecnicoSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,BsaInformeTecnico,BsaInformeTecnicoSerializer)


#####################################################

#servicios ambientales Vehiculo
class BsaInformeNovedadesViewSet(CommonFilterViewSet):
    __basic_fields = ['id','numero','sitio_id','fecha_entrega','isla_usuario_ingreso_id',]
    serializer_class = BsaInformeNovedadesSerializer_list
    queryset = BsaInformeNovedades.objects.all().filter(eliminado='f').order_by('-numero')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_bsainformenovedades(Get_post_base):
    serializer_class = BsaInformeNovedadesSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, BsaInformeNovedades)

    def post(self, request):
        return Get_post_base.post(self, request, BsaInformeNovedadesSerializer)

class Get_delete_update_bsainformenovedades(Get_delete_update_base):
    serializer_class = BsaInformeNovedades

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,BsaInformeNovedades,BsaInformeNovedadesSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,BsaInformeNovedades,BsaInformeNovedadesSerializer)

#servicios ambientales Vehiculo
class BsaInformeNovedadesDetalleViewSet(CommonFilterViewSet):
    __basic_fields = ['id','cab_infcampo_id',]
    serializer_class = BsaInformeNovedadesDetalleSerializer_list
    queryset = BsaInformeNovedadesDetalle.objects.all().filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_bsainformenovedadesdetalle(Get_post_base):
    serializer_class = BsaInformeNovedadesSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, BsaInformeNovedadesDetalle)

    def post(self, request):
        return Get_post_base.post(self, request, BsaInformeNovedadesDetalleSerializer)

class Get_delete_update_bsainformenovedadesdetalle(Get_delete_update_base):
    serializer_class = BsaInformeNovedadesDetalle

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,BsaInformeNovedadesDetalle,BsaInformeNovedadesDetalleSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,BsaInformeNovedadesDetalle,BsaInformeNovedadesDetalleSerializer)

class Get_post_cabecera_detalle_informenovedades(Get_post_base):
    serializer_class = BsaInformeNovedadesCabDetSerializer
    pagination_class = LimitOffsetPagination
    # Get all perpersona
    def get(self, request):
        print("Getting perpersona...")
        return Get_post_base.get(self, request, BsaInformeNovedades)

    def post(self, request):
        print("Getting perpersona...")
        return Get_post_base.post(self, request, BsaInformeNovedadesCabDetSerializer)


class Get_delete_update_cabecera_detalle_informenovedades(Get_delete_update_base):
    serializer_class = BsaInformeNovedadesCabDetSerializer

    # Get all perpersona
    def get(self, request, pk):
        print("Consultando perpersona...")
        return Get_delete_update_base.get(self, request, pk,BsaInformeNovedades,BsaInformeNovedadesCabDetSerializer)

    # Update a perpersona
    def put(self, request, pk):
        
        print("Actualizando perpersona...")
        return Get_delete_update_base.put(self, request, pk,BsaInformeNovedades,BsaInformeNovedadesCabDetSerializer)