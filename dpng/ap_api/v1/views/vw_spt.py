# Django

# DRF

# Local
from .vw_base import Get_post_base,Get_delete_update_base,CommonFilterViewSet
from ap_talentohumano.models import GthCargoFuncional,GthAccionpersonal
from ap_soportetic.models import *
from ap_api.v1.serializers.sz_spt import *
from ap_base.pagination import CustomPagination, MediumPagination

from django.db.models import Max
import json
from django.core.serializers.json import DjangoJSONEncoder
from rest_framework.pagination import LimitOffsetPagination

# Spn_cc
class SptEquiposViewSet(CommonFilterViewSet):
    __basic_fields = ['producto_id','id','marca_id','codigo','administrador_id','codigo_externo',]
    serializer_class = Spt_EquiposSerializer_list
    queryset = SptEquipo.objects.all().filter(eliminado='f').order_by('-marca_id')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_sptequipos(Get_post_base):
    serializer_class = Spt_EquiposSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SptEquipo)

    def post(self, request):
        return Get_post_base.post(self, request, Spt_EquiposSerializer)

class Get_delete_update_sptequipos(Get_delete_update_base):
    serializer_class = Spt_EquiposSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SptEquipo,Spt_EquiposSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SptEquipo,Spt_EquiposSerializer)

# Marca
class SptMarcaViewSet(CommonFilterViewSet):
    __basic_fields = ['descripcion','id']
    serializer_class = Spt_MarcaSerializer_list
    queryset = SptMarca.objects.all().filter(eliminado='f').order_by('descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_sptmarca(Get_post_base):
    serializer_class = Spt_MarcaSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SptMarca)

    def post(self, request):
        return Get_post_base.post(self, request, Spt_MarcaSerializer)

class Get_delete_update_sptmarca(Get_delete_update_base):
    serializer_class = Spt_MarcaSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SptMarca,Spt_MarcaSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SptMarca,Spt_MarcaSerializer)

#Ubicacion
class SptUbicacionViewSet(CommonFilterViewSet):
    __basic_fields = ['descripcion','id']
    serializer_class = Spt_UbicacionSerializer_list
    queryset = SptUbicacion.objects.all().filter(eliminado='f').order_by('descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_sptubicacion(Get_post_base):
    serializer_class = Spt_UbicacionSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SptUbicacion)

    def post(self, request):
        return Get_post_base.post(self, request, Spt_UbicacionSerializer)

class Get_delete_update_sptubicacion(Get_delete_update_base):
    serializer_class = Spt_UbicacionSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SptUbicacion,Spt_UbicacionSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SptUbicacion,Spt_UbicacionSerializer)

#producto
class SptProductoViewSet(CommonFilterViewSet):
    __basic_fields = ['descripcion','id','precio_venta',]
    serializer_class = Spt_ProductoSerializer_list
    queryset = SptProducto.objects.all().filter(eliminado='f').order_by('descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_sptproducto(Get_post_base):
    serializer_class = Spt_ProductoSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SptProducto)

    def post(self, request):
        return Get_post_base.post(self, request, Spt_ProductoSerializer)

class Get_delete_update_sptproducto(Get_delete_update_base):
    serializer_class = Spt_ProductoSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SptProducto,Spt_ProductoSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SptProducto,Spt_ProductoSerializer)

class SptTipoEquipoViewSet(CommonFilterViewSet):
    __basic_fields = ['descripcion','id']
    serializer_class = Spt_TipoEquipoSerializer_list
    queryset = SptTipoEquipo.objects.all().filter(eliminado='f').order_by('descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_spttipoequipo(Get_post_base):
    serializer_class = Spt_TipoEquipoSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SptTipoEquipo)

    def post(self, request):
        return Get_post_base.post(self, request, Spt_TipoEquipoSerializer)

class Get_delete_update_spttipoequipo(Get_delete_update_base):
    serializer_class = Spt_TipoEquipoSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SptTipoEquipo,Spt_TipoEquipoSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SptTipoEquipo,Spt_TipoEquipoSerializer)

class SptUnidadMedidaViewSet(CommonFilterViewSet):
    __basic_fields = ['descripcion','id']
    serializer_class = Spt_UnidadMedidaSerializer_list
    queryset = SptUnidadMedida.objects.all().filter(eliminado='f').order_by('descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_sptunidadmedida(Get_post_base):
    serializer_class = Spt_UnidadMedidaSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SptUnidadMedida)

    def post(self, request):
        return Get_post_base.post(self, request, Spt_UnidadMedidaSerializer)

class Get_delete_update_sptunidadmedida(Get_delete_update_base):
    serializer_class = Spt_UnidadMedidaSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SptUnidadMedida,Spt_UnidadMedidaSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SptUnidadMedida,Spt_UnidadMedidaSerializer)

#producto
class SptSolicitudServicioViewSet(CommonFilterViewSet):
    __basic_fields = ['secuencia','titulo','sysaid_ticket','equipo_id','sysaid_userasignado','sysaid_usersolicitante','sysaid_fe_solicitud','id','tipo_actividad','estado_solicitud',]
    serializer_class = Spt_SolicitudServicioSerializer_list
    queryset = SptSolicitudServicio.objects.all().filter(eliminado='f').order_by('secuencia')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_sptsolicitudservicio(Get_post_base):
    serializer_class = Spt_SolicitudServicioSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SptSolicitudServicio)

    def post(self, request):
        return Get_post_base.post(self, request, Spt_SolicitudServicioSerializer)

class Get_delete_update_sptsolicitudservicio(Get_delete_update_base):
    serializer_class = Spt_SolicitudServicioSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SptSolicitudServicio,Spt_SolicitudServicioSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SptSolicitudServicio,Spt_SolicitudServicioSerializer)


#producto
class SptTipoProblemaViewSet(CommonFilterViewSet):
    __basic_fields = ['id','descripcion',]
    serializer_class = Spt_TipoProblemaSerializer_list
    queryset = SptTipoProblema.objects.all().filter(eliminado='f').order_by('descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_spttipoproblema(Get_post_base):
    serializer_class = Spt_TipoProblemaSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SptTipoProblema)

    def post(self, request):
        return Get_post_base.post(self, request, Spt_TipoProblemaSerializer)

class Get_delete_update_spttipoproblema(Get_delete_update_base):
    serializer_class = Spt_SolicitudServicioSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SptTipoProblema,Spt_TipoProblemaSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SptTipoProblema,Spt_TipoProblemaSerializer)

#producto
class SptSubTipoProblemaViewSet(CommonFilterViewSet):
    __basic_fields = ['id','descripcion','tipoproblema',]
    serializer_class = Spt_SubTipoProblemaSerializer_list
    queryset = SptSubTipoProblema.objects.all().filter(eliminado='f').order_by('descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_sptsubtipoproblema(Get_post_base):
    serializer_class = Spt_SubTipoProblemaSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SptSubTipoProblema)

    def post(self, request):
        return Get_post_base.post(self, request, Spt_SubTipoProblemaSerializer)

class Get_delete_update_sptsubtipoproblema(Get_delete_update_base):
    serializer_class = Spt_SubTipoProblemaSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SptSubTipoProblema,Spt_SubTipoProblemaSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SptSubTipoProblema,Spt_SubTipoProblemaSerializer)

#servicios ambientales Vehiculo
class SptInformeBajaViewSet(CommonFilterViewSet):
    __basic_fields = ['id','secuencia','solicitudservicio_id','equipo_id','funcionario_id','fecha','tipo_reporte',]
    serializer_class = SptInformeBajaSerializer_list
    queryset = SptInformeBaja.objects.all().filter(eliminado='f').order_by('-secuencia')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_sptinformebaja(Get_post_base):
    serializer_class = SptInformeBajaSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SptInformeBaja)

    def post(self, request):
        return Get_post_base.post(self, request, SptInformeBajaSerializer)

class Get_delete_update_sptinformebaja(Get_delete_update_base):
    serializer_class = SptInformeBaja

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SptInformeBaja,SptInformeBajaSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SptInformeBaja,SptInformeBajaSerializer)

#servicios ambientales Vehiculo
class SptInformeBajaDetalleViewSet(CommonFilterViewSet):
    __basic_fields = ['id','cab_infbaja_id',]
    serializer_class = SptInformeBajaDetalleSerializer_list
    queryset = SptInformeBajaDetalle.objects.all().filter(eliminado='f').order_by('orden')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_sptinformebajadetalle(Get_post_base):
    serializer_class = SptInformeBajaSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SptInformeBajaDetalle)

    def post(self, request):
        return Get_post_base.post(self, request, SptInformeBajaDetalleSerializer)

class Get_delete_update_sptinformebajadetalle(Get_delete_update_base):
    serializer_class = SptInformeBajaDetalle

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SptInformeBajaDetalle,SptInformeBajaDetalleSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SptInformeBajaDetalle,SptInformeBajaDetalleSerializer)

class Get_post_cabecera_detalle_informebaja(Get_post_base):
    serializer_class = SptInformeBajaCabDetSerializer
    pagination_class = LimitOffsetPagination
    # Get all perpersona
    def get(self, request):
        print("Getting perpersona...")
        return Get_post_base.get(self, request, SptInformeBaja)

    def post(self, request):
        print("Getting perpersona...")
        return Get_post_base.post(self, request, SptInformeBajaCabDetSerializer)


class Get_delete_update_cabecera_detalle_informebaja(Get_delete_update_base):
    serializer_class = SptInformeBajaCabDetSerializer

    # Get all perpersona
    def get(self, request, pk):
        print("Consultando perpersona...")
        return Get_delete_update_base.get(self, request, pk,SptInformeBaja,SptInformeBajaCabDetSerializer)

    # Update a perpersona
    def put(self, request, pk):
        
        print("Actualizando perpersona...")
        return Get_delete_update_base.put(self, request, pk,SptInformeBaja,SptInformeBajaCabDetSerializer)

class SptEquipoCustodioHistViewSet(CommonFilterViewSet):
    __basic_fields = ['id','equipo_id','new_custodio_id','old_custodio_id',]
    serializer_class = SptEquipoCustodioHistSerializer_list
    queryset = SptEquipoCustodioHist.objects.all().filter(eliminado='f').order_by('fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_sptequipocustodiohist(Get_post_base):
    serializer_class = SptEquipoCustodioHistSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SptEquipoCustodioHist)

    def post(self, request):
        return Get_post_base.post(self, request, SptEquipoCustodioHistSerializer)

class Get_delete_update_sptequipocustodiohist(Get_delete_update_base):
    serializer_class = SptEquipoCustodioHistSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SptEquipoCustodioHist,SptEquipoCustodioHistSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SptEquipoCustodioHist,SptEquipoCustodioHistSerializer)


class SptListaPreguntaViewSet(CommonFilterViewSet):
    __basic_fields = ['categoria','id','pregunta',]
    serializer_class = SptListaPreguntaSerializer_list
    queryset = SptListaPregunta.objects.all().filter(eliminado='f').order_by('categoria','orden')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_sptlistapregunta(Get_post_base):
    serializer_class = SptListaPreguntaSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SptListaPregunta)

    def post(self, request):
        return Get_post_base.post(self, request, SptListaPreguntaSerializer)

class Get_delete_update_sptlistapregunta(Get_delete_update_base):
    serializer_class = SptListaPreguntaSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SptListaPregunta,SptListaPreguntaSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SptListaPregunta,SptListaPreguntaSerializer)