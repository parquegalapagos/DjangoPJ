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
from ap_api.v1.serializers.sz_pat import *

# Models
from ap_dup_operacionturistica.models import *

# Django Filters
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters import rest_framework as filters
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination

# PatPatente
class PatPatenteViewSet(CommonFilterViewSet):
    __basic_fields = ['id','embarcacion_id']
    serializer_class = Pat_PatenteSerializer_list
    queryset = PatPatente.objects.filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class PatPatenteShortViewSet(CommonFilterViewSet):
    __basic_fields = ['id',]
    serializer_class = Pat_PatenteSerializer_short
    queryset = PatPatente.objects.filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_PatPatente(Get_post_base):
    serializer_class = Pat_PatenteSerializer
    pagination_class = LimitOffsetPagination
    # Get all PatPatente
    def get(self, request):
        print("Getting PatPatente...")
        return Get_post_base.get(self, request, PatPatente)
    def post(self, request):
        print("Getting PatPatente...")
        return Get_post_base.post(self, request, PatPatenteSerializer)

class Get_delete_update_PatPatente(Get_delete_update_base):
	serializer_class = Pat_PatenteSerializer

	# Get all PatPatente
	def get(self, request, pk):
		print("Consultando PatPatente...")
		return Get_delete_update_base.get(self, request, pk,PatPatente,Pat_PatenteSerializer)

	# Update a PatPatente
	def put(self, request, pk):
		
		print("Actualizando PatPatente...")
		return Get_delete_update_base.put(self, request, pk,PatPatente,Pat_PatenteSerializer)

