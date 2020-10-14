# Django
from django.db.models import Q

# DRF
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView,ListAPIView
from rest_framework.response import Response
from rest_framework import status

# Local
from .vw_base import Get_post_base,Get_delete_update_base,CommonFilterViewSet
from ap_base.models import GeoPais,GeoProvincia,GeoCiudad,GeoIsla,GeoSitio
from ap_base.pagination import CustomPagination, LargePagination
from ap_base.permissions import IsOwnerOrReadOnly, IsAuthenticated
from ap_api.v1.serializers.sz_geo import *

from rest_framework.filters import SearchFilter, OrderingFilter

# Django Filters
from django_filters import rest_framework as filters
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination

# GeoPais
class Get_post_geopais(Get_post_base):
	serializer_class = Geo_PaisSerializer
	pagination_class = LargePagination

	# Get all geopais
	def get(self, request):
		print("Getting geopais...")
		return Get_post_base.get(self, request, GeoPais)

	

class Get_delete_update_geopais(Get_delete_update_base):
	serializer_class = Geo_PaisSerializer

	# Get all geopais
	def get(self, request, pk):
		print("Consultando geopais...")
		return Get_delete_update_base.get(self, request, pk,GeoPais,Geo_PaisSerializer)

	# Update a geopais
	def put(self, request, pk):
		print("Actualizando geopais...")
		return Get_delete_update_base.put(self, request, pk,GeoPais,Geo_PaisSerializer)

# GeoProvincia
class Get_post_geoprovincia(Get_post_base):
	serializer_class = Geo_ProvinciaSerializer
	pagination_class = LargePagination
	# Get all geoprovincia
	def get(self, request):
		print("Getting geoprovincia...")
		return Get_post_base.get(self, request, GeoProvincia)

class Get_delete_update_geoprovincia(Get_delete_update_base):
	serializer_class = Geo_ProvinciaSerializer

	# Get all geoprovincia
	def get(self, request, pk):
		print("Consultando geopais...")
		return Get_delete_update_base.get(self, request, pk,GeoProvincia,Geo_ProvinciaSerializer)

	# Update a geoprovincia
	def put(self, request, pk):
		print("Actualizando geoprovincia...")
		return Get_delete_update_base.put(self, request, pk,GeoProvincia,Geo_ProvinciaSerializer)

class GeoProvinciaViewSet(CommonFilterViewSet):
	__basic_fields = ['id','pais_text_id','pais',]
	serializer_class = Geo_ProvinciaSerializer
	queryset = GeoProvincia.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
	filter_fields = __basic_fields
	search_fields = __basic_fields
	ordering_fields = __basic_fields
	pagination_class = LargePagination


# CIUDAD
class Get_post_geociudad(Get_post_base):
	serializer_class = Geo_CiudadSerializer
	# Get all geociudad
	def get(self, request):
		print("Getting geociudad...")
		return Get_post_base.get(self, request, GeoCiudad)

class Get_delete_update_geociudad(Get_delete_update_base):
	serializer_class = Geo_CiudadSerializer

	# Get all geociudad
	def get(self, request, pk):
		print("Consultando geociudad...")
		return Get_delete_update_base.get(self, request, pk,GeoCiudad,Geo_CiudadSerializer)

	# Update a geociudad
	def put(self, request, pk):
		
		print("Actualizando geociudad...")
		return Get_delete_update_base.put(self, request, pk,GeoCiudad,Geo_CiudadSerializer)

class GeoCiudadViewSet(CommonFilterViewSet):
	__basic_fields = ['id','pais_id','pais',]
	serializer_class = Geo_CiudadSerializer
	queryset = GeoCiudad.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
	filter_fields = __basic_fields
	search_fields = __basic_fields
	ordering_fields = __basic_fields
	pagination_class = LargePagination


# ISLA
class GeoIslaViewSet(CommonFilterViewSet):
	__basic_fields = ['id','descripcion','es_poblada','canton_id','tipo_isla',]
	serializer_class = Geo_IslaSerializer_short
	queryset = GeoIsla.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
	filter_fields = __basic_fields
	search_fields = __basic_fields
	ordering_fields = __basic_fields
	pagination_class = LargePagination

class Get_post_geoisla(Get_post_base):
	serializer_class = Geo_IslaSerializer
	# Get all geoisla
	def get(self, request):
		print("Getting geoisla...")
		return Get_post_base.get(self, request, GeoIsla)

class Get_delete_update_geoisla(Get_delete_update_base):
	serializer_class = Geo_IslaSerializer

	# Get all geoisla
	def get(self, request, pk):
		print("Consultando geoisla...")
		return Get_delete_update_base.get(self, request, pk,GeoIsla,Geo_IslaSerializer_list)

	# Update a geoisla
	def put(self, request, pk):
		
		print("Actualizando geoisla...")
		return Get_delete_update_base.put(self, request, pk,GeoIsla,Geo_IslaSerializer_list)

# ISLA
class GeoCantonViewSet(CommonFilterViewSet):
	__basic_fields = ['id','nombre','provincia_id','ciudad_id',]
	serializer_class = Geo_CantonSerializer_short
	queryset = GeoCanton.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
	filter_fields = __basic_fields
	search_fields = __basic_fields
	ordering_fields = __basic_fields
	pagination_class = LargePagination

class Get_post_geocanton(Get_post_base):
	serializer_class = Geo_CantonSerializer
	# Get all geocanton
	def get(self, request):
		print("Getting geocanton...")
		return Get_post_base.get(self, request, GeoCanton)

class Get_delete_update_geocanton(Get_delete_update_base):
	serializer_class = Geo_CantonSerializer

	# Get all geocanton
	def get(self, request, pk):
		print("Consultando geocanton...")
		return Get_delete_update_base.get(self, request, pk,GeoCanton,Geo_CantonSerializer_list)

	# Update a geocanton
	def put(self, request, pk):
		
		print("Actualizando geocanton...")
		return Get_delete_update_base.put(self, request, pk,GeoCanton,Geo_CantonSerializer_list)

# PARROQUIAS	
class GeoParroquiaViewSet(CommonFilterViewSet):
	__basic_fields = ['id','canton_id','nombre',]
	serializer_class = Geo_ParroquiaSerializer_short
	queryset = GeoParroquia.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
	filter_fields = __basic_fields
	search_fields = __basic_fields
	ordering_fields = __basic_fields
	pagination_class = LargePagination

class Get_post_geoparroquia(Get_post_base):
	serializer_class = Geo_ParroquiaSerializer
	# Get all geoisla
	def get(self, request):
		print("Getting geoparroquia...")
		return Get_post_base.get(self, request, GeoIsla)

class Get_delete_update_geoparroquia(Get_delete_update_base):
	serializer_class = Geo_ParroquiaSerializer

	# Get all geoparroquia
	def get(self, request, pk):
		print("Consultando geoparroquia...")
		return Get_delete_update_base.get(self, request, pk,GeoParroquia,Geo_ParroquiaSerializer_list)

	# Update a geoparroquia
	def put(self, request, pk):
		
		print("Actualizando geoparroquia...")
		return Get_delete_update_base.put(self, request, pk,GeoParroquia,Geo_ParroquiaSerializer_list)

# sitios	
class GeoSitioViewSet(CommonFilterViewSet):
    __basic_fields = ['id','isla_id','descripcion','modulo',]
    serializer_class = Geo_SitioSerializer_short
    queryset = GeoSitio.objects.all().filter(eliminado='f').order_by('descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_geositio(Get_post_base):
    serializer_class = Geo_SitioSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, GeoSitio)

    def post(self, request):
        return Get_post_base.post(self, request, Geo_SitioSerializer)

class Get_delete_update_geositio(Get_delete_update_base):
    serializer_class = Geo_SitioSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,GeoSitio,Geo_SitioSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,GeoSitio,Geo_SitioSerializer)




