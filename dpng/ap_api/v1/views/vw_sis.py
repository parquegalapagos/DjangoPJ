# Django

# DRF
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework import status

# Local
from .vw_base import Get_post_base, Get_delete_update_base,CommonFilterViewSet
from ap_api.v1.serializers.sz_sis import *
from ap_base.models import SisCatalogo
from ap_base.pagination import CustomPagination,LargePagination
from ap_base.permissions import IsOwnerOrReadOnly, IsAuthenticated
from ap_talentohumano.models import PerFuncionario, PerFuncionarioAccionpersonal


# PERSONA
class SisCatalogoViewSet(CommonFilterViewSet):
	__basic_fields = ['label','valor','categoria',]
	serializer_class = Sis_CatalogoSerializer
	queryset = SisCatalogo.objects.all().filter(eliminado='f').order_by('-label')
	filter_fields = __basic_fields
	search_fields = __basic_fields
	ordering_fields = __basic_fields
	pagination_class = LargePagination

class Get_post_siscatalogo(Get_post_base):
    serializer_class = Sis_CatalogoSerializer
    # Get all gthcargoinstitucional
    def get(self, request):
        print("Getting siscatalogo...")
        return Get_post_base.get(self, request, SisCatalogo)

    def post(self, request):
        print("Getting siscatalogo...")
        return Get_post_base.post(self, request, Sis_CatalogoSerializer)


class Get_delete_update_siscatalogo(Get_delete_update_base):
	serializer_class = Sis_CatalogoSerializer

	# Get all siscatalogo
	def get(self, request, pk):
		print("Consultando siscatalogo...")
		return Get_delete_update_base.get(self, request, pk,SisCatalogo,Sis_CatalogoSerializer)

	# Update a siscatalogo
	def put(self, request, pk):
		
		print("Actualizando siscatalogo...")
		return Get_delete_update_base.put(self, request, pk,SisCatalogo,Sis_CatalogoSerializer)

#SisSecuencias
class SisSecuenciaViewSet(CommonFilterViewSet):
	__basic_fields = ['anio','codigo',]
	serializer_class = Sis_SecuenciaSerializer
	queryset = SisSecuencia.objects.all().filter(eliminado='f').order_by('-anio')
	filter_fields = __basic_fields
	search_fields = __basic_fields
	ordering_fields = __basic_fields
	pagination_class = LargePagination


class Get_delete_update_sissecuencia(Get_delete_update_base):
	serializer_class = Sis_SecuenciaSerializer

	# Get all sissecuencia
	def get(self, request, pk):
		print("Consultando sissecuencia...")
		return Get_delete_update_base.get(self, request, pk,SisSecuencia,Sis_SecuenciaSerializer)

	# Update a sissecuencia
	def put(self, request, pk):
		
		print("Actualizando sissecuencia...")
		return Get_delete_update_base.put(self, request, pk,SisSecuencia,Sis_SecuenciaSerializer)



# Parametro Configuracion

class SisParametrosConfigViewSet(CommonFilterViewSet):
    __basic_fields = ['id','nombre','categoria','valor',]
    serializer_class = SisParametrosConfigSerializer_list
    queryset = SisParametrosConfig.objects.all().filter(eliminado='f')

    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_sisparametrosconfig(Get_post_base):
    serializer_class = SisParametrosConfigSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SisParametrosConfig)

    def post(self, request):
        return Get_post_base.post(self, request, SisParametrosConfigSerializer)

class Get_delete_update_sisparametrosconfig(Get_delete_update_base):

    serializer_class = SisParametrosConfigSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SisParametrosConfig,SisParametrosConfigSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):

        return Get_delete_update_base.put(self, request, pk,SisParametrosConfig,SisParametrosConfigSerializer)