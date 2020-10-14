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
from ap_api.v1.serializers.sz_trm import *

# Models
from ap_usuarioexterno.models import TrmTramites,TrmTramitesDetalles

# Django Filters
from rest_framework.filters import SearchFilter, OrderingFilter

from django_filters import rest_framework as filters
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination


# TRAMITES
class TrmTramitesViewSet(CommonFilterViewSet):
    __basic_fields = ['id','fecha_solicitud','estado_tramite','tipo_tramite','ap_aprobador','ap_revisor','per_solicitante_id','isla_tramite']
    serializer_class = Trm_TramitesSerializer_list
    queryset = TrmTramites.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_trmtramites(Get_post_base):
    serializer_class = Trm_TramitesSerializer
    pagination_class = LimitOffsetPagination
    # Get all trmtramites
    def get(self, request):
        print("Getting trmtramites...")
        return Get_post_base.get(self, request, TrmTramites)
    def post(self, request):
        print("Getting trmtramites...")
        return Get_post_base.post(self, request, Trm_TramitesSerializer)

class Get_delete_update_trmtramites(Get_delete_update_base):
	serializer_class = Trm_TramitesSerializer

	# Get all trmtramites
	def get(self, request, pk):
		print("Consultando trmtramites...")
		return Get_delete_update_base.get(self, request, pk,TrmTramites,Trm_TramitesSerializer)

	# Update a trmtramites
	def put(self, request, pk):
		
		print("Actualizando trmtramites...")
		return Get_delete_update_base.put(self, request, pk,TrmTramites,Trm_TramitesSerializer)


# TRAMITES DETALLES
class Get_post_trmtramitesdetalles(Get_post_base):
    serializer_class = Trm_TramitesDetallesSerializer
    pagination_class = LimitOffsetPagination
    # Get all trmtramitesdetalles
    def get(self, request):
        print("Getting trmtramitesdetalles...")
        return Get_post_base.get(self, request, TrmTramitesDetalles)
    def post(self, request):
        print("Getting trmtramitesdetalles...")
        return Get_post_base.post(self, request, Trm_TramitesDetallesSerializer)

class Get_delete_update_trmtramitesdetalles(Get_delete_update_base):
    serializer_class = Trm_TramitesDetallesSerializer

    # Get all trmtramitesdetalles
    def get(self, request, pk):
        print("Consultando trmtramitesdetalles...")
        return Get_delete_update_base.get(self, request, pk,TrmTramitesDetalles,Trm_TramitesDetallesSerializer)

    # Update a trmtramitesdetalles
    def put(self, request, pk):
        
        print("Actualizando trmtramitesdetalles...")
        return Get_delete_update_base.put(self, request, pk,TrmTramitesDetalles,Trm_TramitesDetallesSerializer)


