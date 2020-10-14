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
from ap_api.v1.serializers.sz_lic import *

# Models
from ap_dup_guias.models import *

# Django Filters
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters import rest_framework as filters
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination

# LICGUIA
class LicGuiaViewSet(CommonFilterViewSet):
    __basic_fields = ['id','guia_id']
    serializer_class = Lic_GuiaSerializer_list
    queryset = LicGuia.objects.filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class LicGuiaShortViewSet(CommonFilterViewSet):
    __basic_fields = ['id','guia_id']
    serializer_class = Lic_GuiaSerializer_short
    queryset = LicGuia.objects.filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination


class LicGuiaShortViewSetApp(CommonFilterViewSet):
    __basic_fields = ['id',]
    serializer_class = Lic_GuiaSerializer_app
    queryset = VwUltimaslicenciasGuias.objects.filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_LicGuia(Get_post_base):
    serializer_class = Lic_GuiaSerializer
    pagination_class = LimitOffsetPagination
    # Get all LicGuia
    def get(self, request):
        print("Getting LicGuia...")
        return Get_post_base.get(self, request, LicGuia)
    def post(self, request):
        print("Getting LicGuia...")
        return Get_post_base.post(self, request, LicGuiaSerializer)

class Get_delete_update_LicGuia(Get_delete_update_base):
	serializer_class = Lic_GuiaSerializer

	# Get all LicGuia
	def get(self, request, pk):
		print("Consultando LicGuia...")
		return Get_delete_update_base.get(self, request, pk,LicGuia,Lic_GuiaSerializer)

	# Update a LicGuia
	def put(self, request, pk):
		
		print("Actualizando LicGuia...")
		return Get_delete_update_base.put(self, request, pk,LicGuia,Lic_GuiaSerializer)

