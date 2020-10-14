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
from ap_api.v1.serializers.sz_tpr import *

# Models
from ap_dup_operacionturistica.models import *

# Django Filters
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters import rest_framework as filters
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination

# TprEmbarcacion
class TprEmbarcacionViewSet(CommonFilterViewSet):
    __basic_fields = ['id','nombre']
    serializer_class = Tpr_EmbarcacionSerializer_list
    queryset = TprEmbarcacion.objects.filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class TprEmbarcacionShortViewSet(CommonFilterViewSet):
    __basic_fields = ['id',]
    serializer_class = Tpr_EmbarcacionSerializer_short
    queryset = TprEmbarcacion.objects.filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_TprEmbarcacion(Get_post_base):
    serializer_class = Tpr_EmbarcacionSerializer
    pagination_class = LimitOffsetPagination
    # Get all TprEmbarcacion
    def get(self, request):
        print("Getting TprEmbarcacion...")
        return Get_post_base.get(self, request, TprEmbarcacion)
    def post(self, request):
        print("Getting TprEmbarcacion...")
        return Get_post_base.post(self, request, TprEmbarcacionSerializer)

class Get_delete_update_TprEmbarcacion(Get_delete_update_base):
	serializer_class = Tpr_EmbarcacionSerializer

	# Get all TprEmbarcacion
	def get(self, request, pk):
		print("Consultando TprEmbarcacion...")
		return Get_delete_update_base.get(self, request, pk,TprEmbarcacion,Tpr_EmbarcacionSerializer)

	# Update a TprEmbarcacion
	def put(self, request, pk):
		
		print("Actualizando TprEmbarcacion...")
		return Get_delete_update_base.put(self, request, pk,TprEmbarcacion,Tpr_EmbarcacionSerializer)


class TprEmbarcacionActividadViewSet(CommonFilterViewSet):
    __basic_fields = ['id','nombre',]
    serializer_class = TprEmbarcacionActividadSerializer_list
    queryset = TprEmbarcacionActividad.objects.filter(eliminado='f').order_by('-nombre')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_TprEmbarcacionActividad(Get_post_base):
    serializer_class = TprEmbarcacionActividadSerializer
    pagination_class = LimitOffsetPagination
    # Get all TprEmbarcacion
    def get(self, request):
        print("Getting TprEmbarcacionActividad...")
        return Get_post_base.get(self, request, TprEmbarcacionActividad)
    def post(self, request):
        print("Getting TprEmbarcacionActividad...")
        return Get_post_base.post(self, request, TprEmbarcacionActividadSerializer)

class Get_delete_update_TprEmbarcacionActividad(Get_delete_update_base):
    serializer_class = TprEmbarcacionActividadSerializer

    # Get all TprEmbarcacion
    def get(self, request, pk):
        print("Consultando TprEmbarcacionActividad...")
        return Get_delete_update_base.get(self, request, pk,TprEmbarcacionActividad,TprEmbarcacionActividadSerializer)

    # Update a TprEmbarcacion
    def put(self, request, pk):
        
        print("Actualizando TprEmbarcacionActividad...")
        return Get_delete_update_base.put(self, request, pk,TprEmbarcacionActividad,TprEmbarcacionActividadSerializer)