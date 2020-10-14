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
from ap_api.v1.serializers.sz_cuem import *

# Models
from ap_cuem_manejopesquero.models import *

# Django Filters
from rest_framework.filters import SearchFilter, OrderingFilter

from django_filters import rest_framework as filters
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination

# CERTIFICACIONES
class AppFdTdatospescadorViewSet(CommonFilterViewSet):
    __basic_fields = ['id','c_cedula','c_nombres','c_apellidos','c_isla','c_estado']
    serializer_class = AppFdT_datospescadorSerializer_list
    queryset = AppFdTdatospescador.objects.all().order_by('-datecreated') #.filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class AppFdTdatospescadorViewSet2(CommonFilterViewSet):
    __basic_fields = ['id','c_cedula','c_nombres','c_apellidos','c_licenciaparma']
    serializer_class = AppFdT_pescadorSerializer_list
    queryset = AppFdTdatospescador.objects.all() #.order_by('-datecreated') #.filter(eliminado='f')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_AppFdTdatospescador(Get_post_base):
    serializer_class = AppFdT_datospescadorSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTdatospescador
    def get(self, request):
        print("Getting AppFdTdatospescador...")
        return Get_post_base.get(self, request, AppFdTdatospescador)
    def post(self, request):
        print("Getting AppFdTdatospescador...")
        return Get_post_base.post(self, request, AppFdT_datospescadorSerializer)

class Get_delete_update_AppFdTdatospescador(Get_delete_update_base):
	serializer_class = AppFdT_datospescadorSerializer

	# Get all AppFdTdatospescador
	def get(self, request, pk):
		print("Consultando AppFdTdatospescador...")
		return Get_delete_update_base.get(self, request, pk,AppFdTdatospescador,AppFdT_datospescadorSerializer)

	# Update a AppFdTdatospescador
	def put(self, request, pk):
		
		print("Actualizando AppFdTdatospescador...")
		return Get_delete_update_base.put(self, request, pk,AppFdTdatospescador,AppFdT_datospescadorSerializer)


# AppFdTlicenciaparma
class AppFdTlicenciaparmaViewSet(CommonFilterViewSet):
    __basic_fields = ['id','c_cedula','c_nombres','c_apellidos','c_licenciaparma','c_fechaemision','c_fechacaducidad','c_estado']
    serializer_class = AppFdT_licenciaparmaSerializer_list
    queryset = AppFdTlicenciaparma.objects.all()#.filter(eliminado='f')#.order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class AppFdTlicenciaparmaAllViewSet(CommonFilterViewSet):
    __basic_fields = ['id','c_cedula','c_nombres','c_apellidos','c_licenciaparma','c_fechaemision','c_fechacaducidad']
    serializer_class = AppFdTlicenciaparmaAllSerializer_list
    queryset = AppFdTlicenciaparma.objects.all() #.filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_AppFdTlicenciaparma(Get_post_base):
    serializer_class = AppFdTlicenciaparmaSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTlicenciaparma
    def get(self, request):
        print("Getting AppFdTlicenciaparma...")
        return Get_post_base.get(self, request, AppFdTlicenciaparma)
    def post(self, request):
        print("Getting AppFdTlicenciaparma...")
        return Get_post_base.post(self, request, AppFdTlicenciaparmaSerializer)

class Get_delete_update_AppFdTlicenciaparma(Get_delete_update_base):
    serializer_class = AppFdTlicenciaparmaSerializer

    # Get all AppFdTlicenciaparma
    def get(self, request, pk):
        print("Consultando AppFdTlicenciaparma...")
        return Get_delete_update_base.get(self, request, pk,AppFdTlicenciaparma,AppFdTlicenciaparmaSerializer)

    # Update a AppFdTlicenciaparma
    def put(self, request, pk):
        
        print("Actualizando AppFdTlicenciaparma...")
        return Get_delete_update_base.put(self, request, pk,AppFdTlicenciaparma,AppFdTlicenciaparmaSerializer)


class AppFdTlicenciaparmaViewSetApp(CommonFilterViewSet):
    __basic_fields = ['id','c_cedula','c_nombres','c_apellidos','c_licenciaparma','c_fechaemision','c_fechacaducidad','c_estado','c_isla']
    serializer_class = AppFdT_licenciaparmaSerializer_app
    queryset = VwUltimaslicenciasParma.objects.filter(eliminado='f')#.order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination


# AppFdTembarcacionpesca
class AppFdTembarcacionpescaViewSet(CommonFilterViewSet):
    __basic_fields = ['id','c_matriculadigmer','c_nombreembarcacion','c_tipoembarcacion','c_puertoregistro','c_estado']
    serializer_class = AppFdT_embarcacionpescaSerializer_list
    queryset = AppFdTembarcacionpesca.objects.all() #.filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

    
class Get_post_AppFdTembarcacionpesca(Get_post_base):
    serializer_class = AppFdT_embarcacionpescaSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTembarcacionpesca
    def get(self, request):
        print("Getting AppFdT_embarcacionpesca...")
        return Get_post_base.get(self, request, AppFdTembarcacionpesca)
    def post(self, request):
        print("Getting AppFdT_embarcacionpesca...")
        return Get_post_base.post(self, request, AppFdT_embarcacionpescaSerializer)


class Get_delete_update_AppFdTembarcacionpesca(Get_delete_update_base):
    serializer_class = AppFdT_embarcacionpescaSerializer

    # Get all AppFdTembarcacionpesca
    def get(self, request, pk):
        print("Consultando AppFdT_embarcacionpesca...")
        return Get_delete_update_base.get(self, request, pk,AppFdTembarcacionpesca,AppFdT_embarcacionpescaSerializer)

    # Update a AppFdTembarcacionpesca
    def put(self, request, pk):
        
        print("Actualizando AppFdT_embarcacionpesca...")
        return Get_delete_update_base.put(self, request, pk,AppFdTembarcacionpesca,AppFdT_embarcacionpescaSerializer)



# AppFdTpermisopesca
class AppFdTpermisopescaViewSet(CommonFilterViewSet):
    __basic_fields = ['id','c_matriculadigmer','c_nombreembarcacion','c_tipoembarcacion','c_fechaemision','c_fechacaducidad','c_permisopesca']
    serializer_class = AppFdTpermisopescaSerializer_list
    queryset = AppFdTpermisopesca.objects.all() #.filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class AppFdTpermisopescaAllViewSet(CommonFilterViewSet):
    __basic_fields = ['id','c_matriculadigmer','c_nombreembarcacion','c_tipoembarcacion','c_fechaemision','c_fechacaducidad','c_permisopesca']
    serializer_class = AppFdTpermisopescaAllSerializer_list
    queryset = AppFdTpermisopesca.objects.all() #.filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

    
class Get_post_AppFdTpermisopesca(Get_post_base):
    serializer_class = AppFdTpermisopescaSerializer
    pagination_class = LimitOffsetPagination
    # Get all AppFdTpermisopesca
    def get(self, request):
        print("Getting AppFdTpermisopesca...")
        return Get_post_base.get(self, request, AppFdTpermisopesca)
    def post(self, request):
        print("Getting AppFdTpermisopesca...")
        return Get_post_base.post(self, request, AppFdTpermisopescaSerializer)

class Get_delete_update_AppFdTpermisopesca(Get_delete_update_base):
    serializer_class = AppFdTpermisopescaSerializer

    # Get all AppFdTpermisopesca
    def get(self, request, pk):
        print("Consultando AppFdT_permisopesca...")
        return Get_delete_update_base.get(self, request, pk,AppFdTpermisopesca,AppFdTpermisopescaSerializer)

    # Update a AppFdTpermisopesca
    def put(self, request, pk):
        
        print("Actualizando AppFdT_permisopesca...")
        return Get_delete_update_base.put(self, request, pk,AppFdTpermisopesca,AppFdTpermisopescaSerializer)



# PERMISO PESCA BLANCA
class AppFdTpermisocompesblanViewSet(CommonFilterViewSet):
    __basic_fields = ['id','c_isla','estado']
    serializer_class = AppFdT_permisocompesblanSerializer_list
    queryset = AppFdTpermisocompesblan.objects.all() #.filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination
              
class Get_post_AppFdTpermisocompesblan(Get_post_base):
    serializer_class = AppFdT_permisocompesblanSerializer
    pagination_class = LimitOffsetPagination                          
    # Get all AppFdtpermisocompesblan
    def get(self, request):
        print("Getting AppFdTpermisocompesblan...")
        return Get_post_base.get(self, request, AppFdTpermisocompesblan)
    def post(self, request):
        print("Getting AppFdTpermisocompesblan...")
        return Get_post_base.post(self, request, AppFdTpermisocompesblanSerializer)


class Get_delete_update_AppFdTpermisocompesblan(Get_delete_update_base):
    serializer_class = AppFdT_permisocompesblanSerializer

    # Get all AppFdTpermisocompesblan
    def get(self, request, pk):
        print("Consultando AppFdTpermisocompesblan...")
        return Get_delete_update_base.get(self, request, pk,AppFdTpermisocompesblan,AppFdT_permisocompesblanSerializer)

    # Update a AppFdTpermisocompesblan
    def put(self, request, pk):
        
        print("Actualizando AppFdTpermisocompesblan...")
        return Get_delete_update_base.put(self, request, pk,AppFdTpermisocompesblan,AppFdT_permisocompesblanSerializer)


# tpermisocomlangosta
class AppFdTpermisocomlangostaViewSet(CommonFilterViewSet):
    __basic_fields = ['id','c_isla','estado']
    serializer_class = AppFdT_permisocomlangostaSerializer_list
    queryset = AppFdTpermisocomlangosta.objects.all() #.filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination
              
class Get_post_AppFdTpermisocomlangosta(Get_post_base):
    serializer_class = AppFdT_permisocomlangostaSerializer
    pagination_class = LimitOffsetPagination                          
    # Get all AppFdtpermisocomlangosta
    def get(self, request):
        print("Getting AppFdTpermisocomlangosta...")
        return Get_post_base.get(self, request, AppFdTpermisocomlangosta)
    def post(self, request):
        print("Getting AppFdTpermisocomlangosta...")
        return Get_post_base.post(self, request, AppFdTpermisocomlangostaSerializer)


class Get_delete_update_AppFdTpermisocomlangosta(Get_delete_update_base):
    serializer_class = AppFdT_permisocomlangostaSerializer

    # Get all AppFdTpermisocomlangosta
    def get(self, request, pk):
        print("Consultando AppFdTpermisocomlangosta...")
        return Get_delete_update_base.get(self, request, pk,AppFdTpermisocomlangosta,AppFdT_permisocomlangostaSerializer)

    # Update a AppFdTpermisocomlangosta
    def put(self, request, pk):
        
        print("Actualizando AppFdTpermisocomlangosta...")
        return Get_delete_update_base.put(self, request, pk,AppFdTpermisocomlangosta,AppFdT_permisocomlangostaSerializer)
