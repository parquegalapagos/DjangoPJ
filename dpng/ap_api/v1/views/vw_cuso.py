# Django
from django.db.models import Q

# DRF
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework import status

# Local
from .vw_base import Get_post_base, Get_delete_update_base,CommonFilterViewSet
from ap_base.pagination import CustomPagination, LargePagination, MediumPagination
from ap_base.permissions import IsOwnerOrReadOnly, IsAuthenticated

# Serializador
from ap_api.v1.serializers.sz_cuso import *

# Models
from ap_cuso_controlmarino.models import *
from ap_cuso_controlinsular.models import *

# Django Filters
from rest_framework.filters import SearchFilter, OrderingFilter

from django_filters import rest_framework as filters
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination

# CERTIFICACIONES
class CmnActavisitainspecEmbPescaObservacionesViewSet(CommonFilterViewSet):
    __basic_fields = ['id','observacion_id','cab_actpescaemb_id']
    serializer_class = CmnActavisitainspecEmbPescaObservacionesSerializer_list
    queryset = CmnActavisitainspecEmbPescaObservaciones.objects.all() #.filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnActavisitainspecEmbPescaObservaciones(Get_post_base):
    serializer_class = CmnActavisitainspecEmbPescaObservacionesSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        print("Getting CmnActavisitainspecEmbPescaObservacionesSerializer...")
        return Get_post_base.get(self, request, CmnActavisitainspecEmbPescaObservaciones)
    def post(self, request):
        print("Getting CmnActavisitainspecEmbPescaObservacionesSerializer...")
        return Get_post_base.post(self, request, CmnActavisitainspecEmbPescaObservacionesSerializer)

class Get_delete_update_CmnActavisitainspecEmbPescaObservaciones(Get_delete_update_base):
	serializer_class = CmnActavisitainspecEmbPescaObservaciones

	# Get all AppFdTdatospescador
	def get(self, request, pk):
		print("Consultando CmnActavisitainspecEmbPescaObservacionesSerializer...")
		return Get_delete_update_base.get(self, request, pk,CmnActavisitainspecEmbPescaObservaciones,CmnActavisitainspecEmbPescaObservacionesSerializer)

	# Update a AppFdTdatospescador
	def put(self, request, pk):
		
		print("Actualizando CmnActavisitainspecEmbPescaObservacionesSerializer...")
		return Get_delete_update_base.put(self, request, pk,CmnActavisitainspecEmbPescaObservaciones,CmnActavisitainspecEmbPescaObservacionesSerializer)


# CERTIFICACIONES
class CCmnActavisitainspecEmbPescaTripulacionViewSet(CommonFilterViewSet):
    __basic_fields = ['id','parma_id','cab_actpescaemb_id']
    serializer_class = CmnActavisitainspecEmbPescaTripulacionSerializer_list
    queryset = CmnActavisitainspecEmbPescaTripulacion.objects.all() #.filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnActavisitainspecEmbPescaTripulacion(Get_post_base):
    serializer_class = CmnActavisitainspecEmbPescaTripulacionSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        print("Getting CmnActavisitainspecEmbPescaTripulacionSerializer...")
        return Get_post_base.get(self, request, CmnActavisitainspecEmbPescaTripulacion)
    def post(self, request):
        print("Getting CmnActavisitainspecEmbPescaTripulacionSerializer...")
        return Get_post_base.post(self, request, CmnActavisitainspecEmbPescaTripulacionSerializer)

class Get_delete_update_CmnActavisitainspecEmbPescaTripulacion(Get_delete_update_base):
    serializer_class = CmnActavisitainspecEmbPescaTripulacion

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        print("Consultando CmnActavisitainspecEmbPescaTripulacionSerializer...")
        return Get_delete_update_base.get(self, request, pk,CmnActavisitainspecEmbPescaTripulacion,CmnActavisitainspecEmbPescaTripulacionSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        
        print("Actualizando CmnActavisitainspecEmbPescaTripulacionSerializer...")
        return Get_delete_update_base.put(self, request, pk,CmnActavisitainspecEmbPescaTripulacion,CmnActavisitainspecEmbPescaTripulacionSerializer)


# CERTIFICACIONES
class CmnActavisitainspecEmbpescaViewSet(CommonFilterViewSet):
    __basic_fields = ['id','secuencia','sitio_inspeccion_id','permisopesca_id','capitan_id','guardaparque_id',]
    serializer_class = CmnActavisitainspecEmbpescaSerializer_list
    queryset = CmnActavisitainspecEmbpesca.objects.all().filter(eliminado='f').order_by('-secuencia')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnActavisitainspecEmbpesca(Get_post_base):
    serializer_class = CmnActavisitainspecEmbpescaSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        print("Getting CmnActavisitainspecEmbpescaSerializer...")
        return Get_post_base.get(self, request, CmnActavisitainspecEmbpesca)
    def post(self, request):
        print("Getting CmnActavisitainspecEmbpescaSerializer...")
        return Get_post_base.post(self, request, CmnActavisitainspecEmbpescaSerializer)

class Get_delete_update_CmnActavisitainspecEmbpesca(Get_delete_update_base):
    serializer_class = CmnActavisitainspecEmbpescaSerializer

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        print("Consultando CmnActavisitainspecEmbpescaSerializer...")
        return Get_delete_update_base.get(self, request, pk,CmnActavisitainspecEmbpesca,CmnActavisitainspecEmbpescaSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        
        print("Actualizando CmnActavisitainspecEmbpescaSerializer...")
        return Get_delete_update_base.put(self, request, pk,CmnActavisitainspecEmbpesca,CmnActavisitainspecEmbpescaSerializer)

class Get_post_cabecera_detalle_CmnActavisitainspecEmbpesca(Get_post_base):
    serializer_class = CmnActavisitainspecEmbpescaCabDetSerializer
    pagination_class = LimitOffsetPagination
    # Get all perpersona
    def get(self, request):
        print("Getting perpersona...")
        return Get_post_base.get(self, request, CmnActavisitainspecEmbpesca)

    def post(self, request):
        print("Getting perpersona...")
        return Get_post_base.post(self, request, CmnActavisitainspecEmbpescaCabDetSerializer)


class Get_delete_update_cabecera_detalle_CmnActavisitainspecEmbpesca(Get_delete_update_base):
    serializer_class = CmnActavisitainspecEmbpescaCabDetSerializer

    # Get all perpersona
    def get(self, request, pk):
        print("Consultando perpersona...")
        return Get_delete_update_base.get(self, request, pk,CmnActavisitainspecEmbpesca,CmnActavisitainspecEmbpescaCabDetSerializer)

    # Update a perpersona
    def put(self, request, pk):
        
        print("Actualizando perpersona...")
        return Get_delete_update_base.put(self, request, pk,CmnActavisitainspecEmbpesca,CmnActavisitainspecEmbpescaCabDetSerializer)



########################
# CERTIFICACIONES
class CmnActaInspecEmbarTuristicaObservacionesViewSet(CommonFilterViewSet):
    __basic_fields = ['id','observacion_id','cab_actinspecemb_id']
    serializer_class = CmnActaInspecEmbarTuristicaObservacionesSerializer_list
    queryset = CmnActaInspecEmbarTuristicaObservaciones.objects.all() #.filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnActaInspecEmbarTuristicaObservaciones(Get_post_base):
    serializer_class = CmnActaInspecEmbarTuristicaObservacionesSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        print("Getting CmnActaInspecEmbarTuristicaObservacionesSerializer...")
        return Get_post_base.get(self, request, CmnActaInspecEmbarTuristicaObservaciones)
    def post(self, request):
        print("Getting CmnActaInspecEmbarTuristicaObservacionesSerializer...")
        return Get_post_base.post(self, request, CmnActaInspecEmbarTuristicaObservacionesSerializer)

class Get_delete_update_CmnActaInspecEmbarTuristicaObservaciones(Get_delete_update_base):
    serializer_class = CmnActaInspecEmbarTuristicaObservaciones

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        print("Consultando CmnActaInspecEmbarTuristicaObservacionesSerializer...")
        return Get_delete_update_base.get(self, request, pk,CmnActaInspecEmbarTuristicaObservaciones,CmnActaInspecEmbarTuristicaObservacionesSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        
        print("Actualizando CmnActavisitainspecEmbPescaObservacionesSerializer...")
        return Get_delete_update_base.put(self, request, pk,CmnActaInspecEmbarTuristicaObservaciones,CmnActaInspecEmbarTuristicaObservacionesSerializer)


# CERTIFICACIONES
class CmnActaInspecEmbarTuristicaTripulacionViewSet(CommonFilterViewSet):
    __basic_fields = ['id','parma_id','cab_actinspecemb_id']
    serializer_class = CmnActaInspecEmbarTuristicaTripulacionSerializer_list
    queryset = CmnActaInspecEmbarTuristicaTripulacion.objects.all() #.filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnActaInspecEmbarTuristicaTripulacion(Get_post_base):
    serializer_class = CmnActaInspecEmbarTuristicaTripulacionSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        print("Getting CmnActavisitainspecEmbPescaTripulacionSerializer...")
        return Get_post_base.get(self, request, CmnActaInspecEmbarTuristicaTripulacion)
    def post(self, request):
        print("Getting CmnActavisitainspecEmbPescaTripulacionSerializer...")
        return Get_post_base.post(self, request, CmnActaInspecEmbarTuristicaTripulacionSerializer)

class Get_delete_update_CmnActaInspecEmbarTuristicaTripulacion(Get_delete_update_base):
    serializer_class = CmnActaInspecEmbarTuristicaTripulacion

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        print("Consultando CmnActavisitainspecEmbPescaTripulacionSerializer...")
        return Get_delete_update_base.get(self, request, pk,CmnActaInspecEmbarTuristicaTripulacion,CmnActaInspecEmbarTuristicaTripulacionSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        
        print("Actualizando CmnActavisitainspecEmbPescaTripulacionSerializer...")
        return Get_delete_update_base.put(self, request, pk,CmnActaInspecEmbarTuristicaTripulacion,CmnActaInspecEmbarTuristicaTripulacionSerializer)


# CERTIFICACIONES
class CmnActaInspecEmbarTuristicaViewSet(CommonFilterViewSet):
    __basic_fields = ['id','secuencia','sitio_inspeccion_id','embarcacion_id','capitan_id','guardaparque_id',]
    serializer_class = CmnActaInspecEmbarTuristicaSerializer_list
    queryset = CmnActaInspecEmbarTuristica.objects.all().filter(eliminado='f').order_by('-secuencia')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnActaInspecEmbarTuristica(Get_post_base):
    serializer_class = CmnActaInspecEmbarTuristicaSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        print("Getting CmnActaInspecEmbarTuristicaSerializer...")
        return Get_post_base.get(self, request, CmnActaInspecEmbarTuristica)
    def post(self, request):
        print("Getting CmnActavisitainspecEmbpescaSerializer...")
        return Get_post_base.post(self, request, CmnActaInspecEmbarTuristicaSerializer)

class Get_delete_update_CmnActaInspecEmbarTuristica(Get_delete_update_base):
    serializer_class = CmnActaInspecEmbarTuristicaSerializer

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        print("Consultando CmnActavisitainspecEmbpescaSerializer...")
        return Get_delete_update_base.get(self, request, pk,CmnActaInspecEmbarTuristica,CmnActaInspecEmbarTuristicaSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        
        print("Actualizando CmnActavisitainspecEmbpescaSerializer...")
        return Get_delete_update_base.put(self, request, pk,CmnActaInspecEmbarTuristica,CmnActaInspecEmbarTuristicaSerializer)

class Get_post_cabecera_detalle_CmnActaInspecEmbarTuristica(Get_post_base):
    serializer_class = CmnActaInspecEmbarTuristicaCabDetSerializer
    pagination_class = LimitOffsetPagination
    # Get all perpersona
    def get(self, request):
        print("Getting perpersona...")
        return Get_post_base.get(self, request, CmnActaInspecEmbarTuristica)

    def post(self, request):
        print("Getting perpersona...")
        return Get_post_base.post(self, request, CmnActaInspecEmbarTuristicaCabDetSerializer)


class Get_delete_update_cabecera_detalle_CmnActaInspecEmbarTuristica(Get_delete_update_base):
    serializer_class = CmnActaInspecEmbarTuristicaCabDetSerializer

    # Get all perpersona
    def get(self, request, pk):
        print("Consultando perpersona...")
        return Get_delete_update_base.get(self, request, pk,CmnActaInspecEmbarTuristica,CmnActaInspecEmbarTuristicaCabDetSerializer)

    # Update a perpersona
    def put(self, request, pk):
        
        print("Actualizando perpersona...")
        return Get_delete_update_base.put(self, request, pk,CmnActaInspecEmbarTuristica,CmnActaInspecEmbarTuristicaCabDetSerializer)


#####################################################

#servicios ambientales Vehiculo
class CmnInformeNovedadesViewSet(CommonFilterViewSet):
    __basic_fields = ['id','numero','sitio_id','fecha_elaboracion',]
    serializer_class = CmnInformeNovedadesSerializer_list
    queryset = CmnInformeNovedades.objects.all().filter(eliminado='f').order_by('-numero')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_cmninformenovedades(Get_post_base):
    serializer_class = CmnInformeNovedadesSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, CmnInformeNovedades)

    def post(self, request):
        return Get_post_base.post(self, request, CmnInformeNovedadesSerializer)

class Get_delete_update_cmninformenovedades(Get_delete_update_base):
    serializer_class = CmnInformeNovedades

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnInformeNovedades,CmnInformeNovedadesSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnInformeNovedades,CmnInformeNovedadesSerializer)

#servicios ambientales Vehiculo
class CmnInformeNovedadesDetalleViewSet(CommonFilterViewSet):
    __basic_fields = ['id','cab_infcampo_id',]
    serializer_class = CmnInformeNovedadesDetalleSerializer_list
    queryset = CmnInformeNovedadesDetalle.objects.all().filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_cmninformenovedadesdetalle(Get_post_base):
    serializer_class = CmnInformeNovedadesSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, CmnInformeNovedadesDetalle)

    def post(self, request):
        return Get_post_base.post(self, request, CmnInformeNovedadesDetalleSerializer)

class Get_delete_update_cmninformenovedadesdetalle(Get_delete_update_base):
    serializer_class = CmnInformeNovedadesDetalle

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnInformeNovedadesDetalle,CmnInformeNovedadesDetalleSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnInformeNovedadesDetalle,CmnInformeNovedadesDetalleSerializer)

#servicios ambientales Vehiculo
class CmnInformeNovedadesParticipantesViewSet(CommonFilterViewSet):
    __basic_fields = ['id','cab_infcampo_id',]
    serializer_class = CmnInformeNovedadesParticipantesSerializer_list
    queryset = CmnInformeNovedadesParticipantes.objects.all().filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_cmninformenovedadesparticipantes(Get_post_base):
    serializer_class = CmnInformeNovedadesSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, CmnInformeNovedadesParticipantes)

    def post(self, request):
        return Get_post_base.post(self, request, CmnInformeNovedadesParticipantesSerializer)

class Get_delete_update_cmninformenovedadesparticipantes(Get_delete_update_base):
    serializer_class = CmnInformeNovedadesParticipantes

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnInformeNovedadesParticipantes,CmnInformeNovedadesParticipantesSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnInformeNovedadesParticipantes,CmnInformeNovedadesParticipantesSerializer)

class Get_post_cabecera_detalle_informenovedades(Get_post_base):
    serializer_class = CmnInformeNovedadesCabDetSerializer
    pagination_class = LimitOffsetPagination
    # Get all perpersona
    def get(self, request):
        print("Getting perpersona...")
        return Get_post_base.get(self, request, CmnInformeNovedades)

    def post(self, request):
        print("Getting perpersona...")
        return Get_post_base.post(self, request, CmnInformeNovedadesCabDetSerializer)


class Get_delete_update_cabecera_detalle_informenovedades(Get_delete_update_base):
    serializer_class = CmnInformeNovedadesCabDetSerializer

    # Get all perpersona
    def get(self, request, pk):
        print("Consultando perpersona...")
        return Get_delete_update_base.get(self, request, pk,CmnInformeNovedades,CmnInformeNovedadesCabDetSerializer)

    # Update a perpersona
    def put(self, request, pk):
        
        print("Actualizando perpersona...")
        return Get_delete_update_base.put(self, request, pk,CmnInformeNovedades,CmnInformeNovedadesCabDetSerializer)

#servicios ambientales Vehiculo
class CmnInformeMonitoreoViewSet(CommonFilterViewSet):
    __basic_fields = ['id','numero','funcionario_id','fecha_presentacion',]
    serializer_class = CmnInformeMonitoreoSerializer_list
    queryset = CmnInformeMonitoreo.objects.all().filter(eliminado='f').order_by('-numero')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_cmninformemonitoreo(Get_post_base):
    serializer_class = CmnInformeMonitoreoSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, CmnInformeMonitoreo)

    def post(self, request):
        return Get_post_base.post(self, request, CmnInformeMonitoreoSerializer)

class Get_delete_update_cmninformemonitoreo(Get_delete_update_base):
    serializer_class = CmnInformeMonitoreo

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnInformeMonitoreo,CmnInformeMonitoreoSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnInformeMonitoreo,CmnInformeMonitoreoSerializer)

#monitoreo
class CmnInformeMonitoreoDetalleViewSet(CommonFilterViewSet):
    __basic_fields = ['id','cab_infmonitoreo_id',]
    serializer_class = CmnInformeMonitoreoDetalleSerializer_list
    queryset = CmnInformeMonitoreoDetalle.objects.all().filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_cmninformemonitoreodetalle(Get_post_base):
    serializer_class = CmnInformeMonitoreoSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, CmnInformeMonitoreoDetalle)

    def post(self, request):
        return Get_post_base.post(self, request, CmnInformeMonitoreoDetalleSerializer)

class Get_delete_update_cmninformemonitoreodetalle(Get_delete_update_base):
    serializer_class = CmnInformeMonitoreoDetalle

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnInformeMonitoreoDetalle,CmnInformeMonitoreoDetalleSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnInformeMonitoreoDetalle,CmnInformeMonitoreoDetalleSerializer)

class Get_post_cabecera_detalle_informemonitoreo(Get_post_base):
    serializer_class = CmnInformeMonitoreoCabDetSerializer
    pagination_class = LimitOffsetPagination
    # Get all perpersona
    def get(self, request):
        print("Getting perpersona...")
        return Get_post_base.get(self, request, CmnInformeMonitoreo)

    def post(self, request):
        print("Getting perpersona...")
        return Get_post_base.post(self, request, CmnInformeMonitoreoCabDetSerializer)


class Get_delete_update_cabecera_detalle_informemonitoreo(Get_delete_update_base):
    serializer_class = CmnInformeMonitoreoCabDetSerializer

    # Get all perpersona
    def get(self, request, pk):
        print("Consultando perpersona...")
        return Get_delete_update_base.get(self, request, pk,CmnInformeMonitoreo,CmnInformeMonitoreoCabDetSerializer)

    # Update a perpersona
    def put(self, request, pk):
        
        print("Actualizando perpersona...")
        return Get_delete_update_base.put(self, request, pk,CmnInformeMonitoreo,CmnInformeMonitoreoCabDetSerializer)


#servicios ambientales Vehiculo
class CmnEmbarcacionesPatrullaViewSet(CommonFilterViewSet):
    __basic_fields = ['id','nombre','tipo','puerto_operacion_id',]
    serializer_class = CmnEmbarcacionesPatrullaSerializer_list
    queryset = CmnEmbarcacionesPatrulla.objects.all().filter(eliminado='f').order_by('-nombre')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_cmnembarcacionespatrulla(Get_post_base):
    serializer_class = CmnEmbarcacionesPatrullaSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, CmnEmbarcacionesPatrulla)

    def post(self, request):
        return Get_post_base.post(self, request, CmnEmbarcacionesPatrullaSerializer)

class Get_delete_update_cmnembarcacionespatrulla(Get_delete_update_base):
    serializer_class = CmnEmbarcacionesPatrulla

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnEmbarcacionesPatrulla,CmnEmbarcacionesPatrullaSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnEmbarcacionesPatrulla,CmnEmbarcacionesPatrullaSerializer)


#servicios ambientales Vehiculo
class CmnPlanPatrullaViewSet(CommonFilterViewSet):
    __basic_fields = ['id','numero','responsable_id','fecha_inicio','embarcacion_id',]
    serializer_class = CmnPlanPatrullaSerializer_list
    queryset = CmnPlanPatrulla.objects.all().filter(eliminado='f').order_by('-numero')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_cmnplanpatrulla(Get_post_base):
    serializer_class = CmnPlanPatrullaSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, CmnPlanPatrulla)

    def post(self, request):
        return Get_post_base.post(self, request, CmnPlanPatrullaSerializer)

class Get_delete_update_cmnplanpatrulla(Get_delete_update_base):
    serializer_class = CmnPlanPatrulla

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnPlanPatrulla,CmnPlanPatrullaSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnPlanPatrulla,CmnPlanPatrullaSerializer)

#monitoreo
class CmnPlanPatrullaDetalleViewSet(CommonFilterViewSet):
    __basic_fields = ['id','cab_planpatrulla_id',]
    serializer_class = CmnPlanPatrullaDetalleSerializer_list
    queryset = CmnPlanPatrullaDetalle.objects.all().filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_cmnplanpatrulladetalle(Get_post_base):
    serializer_class = CmnPlanPatrullaSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, CmnPlanPatrullaDetalle)

    def post(self, request):
        return Get_post_base.post(self, request, CmnPlanPatrullaDetalleSerializer)

class Get_delete_update_cmnplanpatrulladetalle(Get_delete_update_base):
    serializer_class = CmnPlanPatrullaDetalle

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnPlanPatrullaDetalle,CmnPlanPatrullaDetalleSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnPlanPatrullaDetalle,CmnPlanPatrullaDetalleSerializer)

class Get_post_cabecera_detalle_planpatrulla(Get_post_base):
    serializer_class = CmnPlanPatrullaCabDetSerializer
    pagination_class = LimitOffsetPagination
    # Get all perpersona
    def get(self, request):
        print("Getting perpersona...")
        return Get_post_base.get(self, request, CmnPlanPatrulla)

    def post(self, request):
        print("Getting perpersona...")
        return Get_post_base.post(self, request, CmnPlanPatrullaCabDetSerializer)


class Get_delete_update_cabecera_detalle_planpatrulla(Get_delete_update_base):
    serializer_class =CmnPlanPatrullaCabDetSerializer

    # Get all perpersona
    def get(self, request, pk):
        print("Consultando perpersona...")
        return Get_delete_update_base.get(self, request, pk,CmnPlanPatrulla,CmnPlanPatrullaCabDetSerializer)

    # Update a perpersona
    def put(self, request, pk):
        
        print("Actualizando perpersona...")
        return Get_delete_update_base.put(self, request, pk,CmnPlanPatrulla,CmnPlanPatrullaCabDetSerializer)



class CmnProductosRetencionViewSet(CommonFilterViewSet):
    __basic_fields = ['id','descripcion','tipo',]
    serializer_class = CmnProductosRetencionSerializer_list
    queryset = CmnProductosRetencion.objects.all().filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnProductosRetencion(Get_post_base):
    serializer_class = CmnProductosRetencionSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        return Get_post_base.get(self, request, CmnProductosRetencion)
    def post(self, request):
        return Get_post_base.post(self, request, CmnProductosRetencionSerializer)

class Get_delete_update_CmnProductosRetencion(Get_delete_update_base):
    serializer_class = CmnProductosRetencionSerializer

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnProductosRetencion,CmnProductosRetencionSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnProductosRetencion,CmnProductosRetencionSerializer)

# CERTIFICACIONES
class CmnParticipantesActaRetencionViewSet(CommonFilterViewSet):
    __basic_fields = ['id','acta_retencion_id','funcionario_id','persona_id']
    serializer_class = CmnParticipantesActaRetencionSerializer_list
    queryset = CmnParticipantesActaRetencion.objects.all().filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnParticipantesActaRetencion(Get_post_base):
    serializer_class = CmnParticipantesActaRetencionSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        return Get_post_base.get(self, request, CmnParticipantesActaRetencion)
    def post(self, request):
        return Get_post_base.post(self, request, CmnParticipantesActaRetencionSerializer)

class Get_delete_update_CmnParticipantesActaRetencion(Get_delete_update_base):
    serializer_class = CmnParticipantesActaRetencion

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnParticipantesActaRetencion,CmnParticipantesActaRetencionSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnParticipantesActaRetencion,CmnParticipantesActaRetencionSerializer)

class CmnImplicadosActaRetencionViewSet(CommonFilterViewSet):
    __basic_fields = ['id','acta_retencion_id','parma_id','persona_id']
    serializer_class = CmnImplicadosActaRetencionSerializer_list
    queryset = CmnImplicadosActaRetencion.objects.all().filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnImplicadosActaRetencion(Get_post_base):
    serializer_class = CmnImplicadosActaRetencionSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        return Get_post_base.get(self, request, CmnImplicadosActaRetencion)
    def post(self, request):
        return Get_post_base.post(self, request, CmnImplicadosActaRetencionSerializer)

class Get_delete_update_CmnImplicadosActaRetencion(Get_delete_update_base):
    serializer_class = CmnImplicadosActaRetencion

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnImplicadosActaRetencion,CmnImplicadosActaRetencionSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnImplicadosActaRetencion,CmnImplicadosActaRetencionSerializer)



# CERTIFICACIONES
class CmnProductosActaRetencionViewSet(CommonFilterViewSet):
    __basic_fields = ['id','acta_retencion_id']
    serializer_class = CmnProductosActaRetencionSerializer_list
    queryset = CmnProductosActaRetencion.objects.all().filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnProductosActaRetencion(Get_post_base):
    serializer_class = CmnProductosActaRetencionSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        return Get_post_base.get(self, request, CmnProductosActaRetencion)
    def post(self, request):
        return Get_post_base.post(self, request, CmnProductosActaRetencionSerializer)

class Get_delete_update_CmnProductosActaRetencion(Get_delete_update_base):
    serializer_class = CmnProductosActaRetencion

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnProductosActaRetencion,CmnProductosActaRetencionSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnProductosActaRetencion,CmnProductosActaRetencionSerializer)


# CERTIFICACIONES
class CmnActaRetencionViewSet(CommonFilterViewSet):
    __basic_fields = ['id','numero','acta_inspeccion_id','fecha_ingreso']
    serializer_class = CmnActaRetencionSerializer_list
    queryset = CmnActaRetencion.objects.all().filter(eliminado='f').order_by('-numero')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnActaRetencion(Get_post_base):
    serializer_class = CmnActaRetencionSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        return Get_post_base.get(self, request, CmnActaRetencion)
    def post(self, request):
        return Get_post_base.post(self, request, CmnActaRetencionSerializer)

class Get_delete_update_CmnActaRetencion(Get_delete_update_base):
    serializer_class = CmnActaRetencionSerializer

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnActaRetencion,CmnActaRetencionSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnActaRetencion,CmnActaRetencionSerializer)

class Get_post_cabecera_detalle_CmnActaRetencion(Get_post_base):
    serializer_class = CmnActaRetencionCabDetSerializer
    pagination_class = LimitOffsetPagination
    # Get all perpersona
    def get(self, request):
        return Get_post_base.get(self, request, CmnActaRetencion)

    def post(self, request):
        return Get_post_base.post(self, request, CmnActaRetencionCabDetSerializer)


class Get_delete_update_cabecera_detalle_CmnActaRetencion(Get_delete_update_base):
    serializer_class = CmnActaRetencionCabDetSerializer

    # Get all perpersona
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnActaRetencion,CmnActaRetencionCabDetSerializer)

    # Update a perpersona
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnActaRetencion,CmnActaRetencionCabDetSerializer)


# CERTIFICACIONES
class CmnActividadFuncionariosViewSet(CommonFilterViewSet):
    __basic_fields = ['id','actividad_id','funcionario_id','anio','mes',]
    serializer_class = CmnActividadFuncionariosSerializer_list
    queryset = CmnActividadFuncionarios.objects.all().filter(eliminado='f').order_by('actividad_id','anio','mes')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnActividadFuncionarios(Get_post_base):
    serializer_class = CmnActividadFuncionariosSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        return Get_post_base.get(self, request, CmnActividadFuncionarios)
    def post(self, request):
        return Get_post_base.post(self, request, CmnActividadFuncionariosSerializer)

class Get_delete_update_CmnActividadFuncionarios(Get_delete_update_base):
    serializer_class = CmnActividadFuncionarios

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnActividadFuncionarios,CmnActividadFuncionariosSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnActividadFuncionarios,CmnActividadFuncionariosSerializer)


# CERTIFICACIONES
class CmnDiasActividadFuncionariosViewSet(CommonFilterViewSet):
    __basic_fields = ['id','actividad_funcionario_id','anio','mes',]
    serializer_class = CmnDiasActividadFuncionariosSerializer_list
    queryset = CmnDiasActividadFuncionarios.objects.all().filter(eliminado='f').order_by('actividad_funcionario_id')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnDiasActividadFuncionarios(Get_post_base):
    serializer_class = CmnDiasActividadFuncionariosSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        return Get_post_base.get(self, request, CmnDiasActividadFuncionarios)
    def post(self, request):
        return Get_post_base.post(self, request, CmnDiasActividadFuncionariosSerializer)

class Get_delete_update_CmnDiasActividadFuncionarios(Get_delete_update_base):
    serializer_class = CmnDiasActividadFuncionarios

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnDiasActividadFuncionarios,CmnDiasActividadFuncionariosSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnDiasActividadFuncionarios,CmnDiasActividadFuncionariosSerializer)


class CmnActividadFuncionarios_diasViewSet(CommonFilterViewSet):
    __basic_fields = ['id','actividad_id','funcionario_id','anio','mes',]
    serializer_class = CmnActividadFuncionarios_dias_Serializer
    queryset = CmnActividadFuncionarios.objects.all().filter(eliminado='f').order_by('actividad_id','anio','mes')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination


# CERTIFICACIONES
class CmnControlPersonalViewSet(CommonFilterViewSet):
    __basic_fields = ['id','funcionario_id','anio','mes',]
    serializer_class = CmnControlPersonalSerializer_list
    queryset = CmnControlPersonal.objects.all().filter(eliminado='f').order_by('funcionario_id')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnControlPersonal(Get_post_base):
    serializer_class = CmnControlPersonalSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        return Get_post_base.get(self, request, CmnControlPersonal)
    def post(self, request):
        return Get_post_base.post(self, request, CmnControlPersonalSerializer)

class Get_delete_update_CmnControlPersonal(Get_delete_update_base):
    serializer_class = CmnControlPersonal

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnControlPersonal,CmnControlPersonalSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnControlPersonal,CmnControlPersonalSerializer)


# CERTIFICACIONES
class CmnEmbarcacionesExternasViewSet(CommonFilterViewSet):
    __basic_fields = ['id','nombre','capitan_nombre',]
    serializer_class = CmnEmbarcacionesExternasSerializer_list
    queryset = CmnEmbarcacionesExternas.objects.all().filter(eliminado='f').order_by('nombre')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnEmbarcacionesExternas(Get_post_base):
    serializer_class = CmnEmbarcacionesExternasSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        return Get_post_base.get(self, request, CmnEmbarcacionesExternas)
    def post(self, request):
        return Get_post_base.post(self, request, CmnEmbarcacionesExternasSerializer)

class Get_delete_update_CmnEmbarcacionesExternas(Get_delete_update_base):
    serializer_class = CmnEmbarcacionesExternas

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnEmbarcacionesExternas,CmnEmbarcacionesExternasSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnEmbarcacionesExternas,CmnEmbarcacionesExternasSerializer)

# CERTIFICACIONES
class CmnCamarasViewSet(CommonFilterViewSet):
    __basic_fields = ['id','descripcion',]
    serializer_class = CmnCamarasSerializer_list
    queryset = CmnCamaras.objects.all().filter(eliminado='f').order_by('descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnCamaras(Get_post_base):
    serializer_class = CmnCamarasSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        return Get_post_base.get(self, request, CmnCamaras)
    def post(self, request):
        return Get_post_base.post(self, request, CmnCamarasSerializer)

class Get_delete_update_CmnCamaras(Get_delete_update_base):
    serializer_class = CmnCamarasSerializer

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnCamaras,CmnCamarasSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnCamaras,CmnCamarasSerializer)


# CERTIFICACIONES
class CmnCmonitReporteDiarioImagenesViewSet(CommonFilterViewSet):
    __basic_fields = ['id','reporte_id',]
    serializer_class = CmnCmonitReporteDiarioImagenesSerializer_list
    queryset = CmnCmonitReporteDiarioImagenes.objects.all().filter(eliminado='f').order_by('titulo')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnCmonitReporteDiarioImagenes(Get_post_base):
    serializer_class = CmnCmonitReporteDiarioImagenesSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        return Get_post_base.get(self, request, CmnCmonitReporteDiarioImagenes)
    def post(self, request):
        return Get_post_base.post(self, request, CmnCmonitReporteDiarioImagenesSerializer)

class Get_delete_update_CmnCmonitReporteDiarioImagenes(Get_delete_update_base):
    serializer_class = CmnCmonitReporteDiarioImagenesSerializer

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnCmonitReporteDiarioImagenes,CmnCmonitReporteDiarioImagenesSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnCmonitReporteDiarioImagenes,CmnCmonitReporteDiarioImagenesSerializer)


# CERTIFICACIONES
class CmnCmonitReporteDiarioCamarasViewSet(CommonFilterViewSet):
    __basic_fields = ['id','reporte_id','camara_id',]
    serializer_class = CmnCmonitReporteDiarioCamarasSerializer_list
    queryset = CmnCmonitReporteDiarioCamaras.objects.all().filter(eliminado='f').order_by('reporte_id')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnCmonitReporteDiarioCamaras(Get_post_base):
    serializer_class = CmnCmonitReporteDiarioCamarasSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        return Get_post_base.get(self, request, CmnCmonitReporteDiarioCamaras)
    def post(self, request):
        return Get_post_base.post(self, request, CmnCmonitReporteDiarioCamarasSerializer)

class Get_delete_update_CmnCmonitReporteDiarioCamaras(Get_delete_update_base):
    serializer_class = CmnCmonitReporteDiarioCamarasSerializer

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnCmonitReporteDiarioCamaras,CmnCmonitReporteDiarioCamarasSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnCmonitReporteDiarioCamaras,CmnCmonitReporteDiarioCamarasSerializer)

# CERTIFICACIONES
class CmnCmonitReporteDiarioEmbarcacionesViewSet(CommonFilterViewSet):
    __basic_fields = ['id','reporte_id','tipo_embarcacion_id','tipo',]
    serializer_class = CmnCmonitReporteDiarioEmbarcacionesSerializer_list
    queryset = CmnCmonitReporteDiarioEmbarcaciones.objects.all().filter(eliminado='f').order_by('reporte_id')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnCmonitReporteDiarioEmbarcaciones(Get_post_base):
    serializer_class = CmnCmonitReporteDiarioEmbarcacionesSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        return Get_post_base.get(self, request, CmnCmonitReporteDiarioEmbarcaciones)
    def post(self, request):
        return Get_post_base.post(self, request, CmnCmonitReporteDiarioEmbarcacionesSerializer)

class Get_delete_update_CmnCmonitReporteDiarioEmbarcaciones(Get_delete_update_base):
    serializer_class = CmnCmonitReporteDiarioEmbarcacionesSerializer

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnCmonitReporteDiarioEmbarcaciones,CmnCmonitReporteDiarioEmbarcacionesSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnCmonitReporteDiarioEmbarcaciones,CmnCmonitReporteDiarioEmbarcacionesSerializer)

# CERTIFICACIONES
class CmnCmonitReporteDiarioEmbarcacionesActividadViewSet(CommonFilterViewSet):
    __basic_fields = ['id','reporte_id','actividad_id','embarcacion_id']
    serializer_class = CmnCmonitReporteDiarioEmbarcacionesActividadSerializer_list
    queryset = CmnCmonitReporteDiarioEmbarcacionesActividad.objects.all().filter(eliminado='f').order_by('reporte_id')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnCmonitReporteDiarioEmbarcacionesActividad(Get_post_base):
    serializer_class = CmnCmonitReporteDiarioEmbarcacionesActividadSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        return Get_post_base.get(self, request, CmnCmonitReporteDiarioEmbarcacionesActividad)
    def post(self, request):
        return Get_post_base.post(self, request, CmnCmonitReporteDiarioEmbarcacionesActividadSerializer)

class Get_delete_update_CmnCmonitReporteDiarioEmbarcacionesActividad(Get_delete_update_base):
    serializer_class = CmnCmonitReporteDiarioEmbarcacionesActividadSerializer

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnCmonitReporteDiarioEmbarcacionesActividad,CmnCmonitReporteDiarioEmbarcacionesActividadSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnCmonitReporteDiarioEmbarcacionesActividad,CmnCmonitReporteDiarioEmbarcacionesActividadSerializer)


# CERTIFICACIONES
class CmnCmonitReporteDiarioSistemasViewSet(CommonFilterViewSet):
    __basic_fields = ['id','reporte_id',]
    serializer_class = CmnCmonitReporteDiarioSistemasSerializer_list
    queryset = CmnCmonitReporteDiarioSistemas.objects.all().filter(eliminado='f').order_by('reporte_id')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnCmonitReporteDiarioSistemas(Get_post_base):
    serializer_class = CmnCmonitReporteDiarioSistemasSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        return Get_post_base.get(self, request, CmnCmonitReporteDiarioSistemas)
    def post(self, request):
        return Get_post_base.post(self, request, CmnCmonitReporteDiarioSistemasSerializer)

class Get_delete_update_CmnCmonitReporteDiarioSistemas(Get_delete_update_base):
    serializer_class = CmnCmonitReporteDiarioSistemasSerializer

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnCmonitReporteDiarioSistemas,CmnCmonitReporteDiarioSistemasSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnCmonitReporteDiarioSistemas,CmnCmonitReporteDiarioSistemasSerializer)


# CERTIFICACIONES
class CmnCmonitReporteDiarioViewSet(CommonFilterViewSet):
    __basic_fields = ['id','num_reporte','fecha_reporte']
    serializer_class = CmnCmonitReporteDiarioSerializer_list
    queryset = CmnCmonitReporteDiario.objects.all().filter(eliminado='f').order_by('-num_reporte')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_CmnCmonitReporteDiario(Get_post_base):
    serializer_class = CmnCmonitReporteDiarioSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        return Get_post_base.get(self, request, CmnCmonitReporteDiario)
    def post(self, request):
        return Get_post_base.post(self, request, CmnCmonitReporteDiarioSerializer)

class Get_delete_update_CmnCmonitReporteDiario(Get_delete_update_base):
    serializer_class = CmnCmonitReporteDiarioSerializer

    # Get all AppFdTdatospescador
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnCmonitReporteDiario,CmnCmonitReporteDiarioSerializer)

    # Update a AppFdTdatospescador
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnCmonitReporteDiario,CmnCmonitReporteDiarioSerializer)

class Get_post_cabecera_detalle_CmnCmonitReporteDiario(Get_post_base):
    serializer_class = CmnCmonitReporteDiarioCabDetSerializer
    pagination_class = LimitOffsetPagination
    # Get all perpersona
    def get(self, request):
        return Get_post_base.get(self, request, CmnCmonitReporteDiario)

    def post(self, request):
        return Get_post_base.post(self, request, CmnCmonitReporteDiarioCabDetSerializer)


class Get_delete_update_cabecera_detalle_CmnCmonitReporteDiario(Get_delete_update_base):
    serializer_class = CmnCmonitReporteDiarioCabDetSerializer

    # Get all perpersona
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,CmnCmonitReporteDiario,CmnCmonitReporteDiarioCabDetSerializer)

    # Update a perpersona
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,CmnCmonitReporteDiario,CmnCmonitReporteDiarioCabDetSerializer)