# Django


# DRF
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework import status

# Local
from .vw_base import Get_post_base, Get_delete_update_base,CommonFilterViewSet
from ap_api.v1.serializers.sz_org import *
from ap_base.models import OrgOrganizacion
from ap_base.pagination import CustomPagination,LargePagination
from ap_base.permissions import IsOwnerOrReadOnly, IsAuthenticated


# ORG_ORGANIZACION
class OrgOrganizacionViewSet(CommonFilterViewSet):
	__basic_fields = ['nombre_comercial','modulo']
	serializer_class = Org_OrganizacionSerializer_short
	queryset = OrgOrganizacion.objects.all().filter(eliminado='f').order_by('nombre_comercial')
	filter_fields = __basic_fields
	search_fields = __basic_fields
	ordering_fields = __basic_fields

# ORG_ORGANIZACION_BANCO
class OrgOrganizacionBancoViewSet(CommonFilterViewSet):
	__basic_fields = ['nombre_comercial',]
	serializer_class = Org_OrganizacionSerializer_short
	queryset = OrgOrganizacion.objects.all().filter(eliminado='f',tipo_id='f42e9c13-7219-4245-ac7f-3381cbb37f50').order_by('nombre_comercial')
	filter_fields = __basic_fields
	search_fields = __basic_fields
	ordering_fields = __basic_fields
	pagination_class = LargePagination



