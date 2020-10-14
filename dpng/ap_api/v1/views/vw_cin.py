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
from ap_api.v1.serializers.sz_cin import *

# Models
from ap_cuso_controlinsular.models import CinControlturistas

# Django Filters
from rest_framework.filters import SearchFilter, OrderingFilter

from django_filters import rest_framework as filters
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination

# CONTROL DE TURISTAS
class CinControlturistasViewSet(CommonFilterViewSet):
    __basic_fields = ['id','fecha','pasajero_id','lic_guia_id']
    serializer_class = Cin_ControlturistasSerializer_list
    queryset = CinControlturistas.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_CinControlturistas(Get_post_base):
    serializer_class = Cin_ControlturistasSerializer
    pagination_class = LimitOffsetPagination
    # Get all CinControlturistas
    def get(self, request):
        print("Getting CinControlturistas...")
        return Get_post_base.get(self, request, CinControlturistas)
    def post(self, request):
        print("Getting CinControlturistas...")
        return Get_post_base.post(self, request, Cin_ControlturistasSerializer)

class Get_delete_update_CinControlturistas(Get_delete_update_base):
	serializer_class = Cin_ControlturistasSerializer

	# Get all CinControlturistas
	def get(self, request, pk):
		print("Consultando CinControlturistas...")
		return Get_delete_update_base.get(self, request, pk,CinControlturistas,Cin_ControlturistasSerializer)

	# Update a CinControlturistas
	def put(self, request, pk):
		
		print("Actualizando CinControlturistas...")
		return Get_delete_update_base.put(self, request, pk,CinControlturistas,Cin_ControlturistasSerializer)
#----------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------

#CONTROL TURISTAS - SITIOS
class CinControlTuristaSitioViewSet(CommonFilterViewSet):
    __basic_fields = ['id','controlturistas_id','sitiovisita_id','eliminado', 'estado']
    serializer_class = Cin_ControlTuristaSitioSerializer_list
    queryset = CinControlturistasSitios.objects.all().filter(eliminado='f')#.order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_CinControlTuristaSitio(Get_post_base):
    serializer_class = Cin_ControlTuristaSitioSerializer
    pagination_class = LimitOffsetPagination
    # Get all CinControlturistas
    def get(self, request):
        print("Getting CinControlturistasSitios")
        return Get_post_base.get(self, request, CinControlturistasSitios)
    def post(self, request):
        print("Getting CinControlturistasSitios")
        return Get_post_base.post(self, request, Cin_ControlTuristaSitioSerializer)

class Get_delete_update_CinControlTuristaSitio(Get_delete_update_base):
    serializer_class = Cin_ControlTuristaSitioSerializer

    # Get all CinControlturistas
    def get(self, request, pk):
        print("Consultando CinControlturistasSitios...")
        return Get_delete_update_base.get(self, request, pk,CinControlturistasSitios,Cin_ControlTuristaSitioSerializer)

    # Update a CinControlturistas
    def put(self, request, pk):
        
        print("Actualizando CinControlturistasSitios...")
        return Get_delete_update_base.put(self, request, pk,CinControlturistasSitios,Cin_ControlTuristaSitioSerializer)

#---------------------------------------------------------------------

# CONTROL DE PESCA
class CinControlPescaViewSet(CommonFilterViewSet):
    __basic_fields = ['id','fecha','parma_id','estado']
    serializer_class = Cin_ControlPescaSerializer_list
    queryset = CinControlPesca.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_CinControlPesca(Get_post_base):
    serializer_class = Cin_ControlPescaSerializer
    pagination_class = LimitOffsetPagination
    # Get all CinControlPesca
    def get(self, request):
        print("Getting CinControlPesca...")
        return Get_post_base.get(self, request, Cin_ControlPesca)
    def post(self, request):
        print("Getting CinControlturistas...")
        return Get_post_base.post(self, request, Cin_ControlPescaSerializer)


class Get_delete_update_CinControlPesca(Get_delete_update_base):
    serializer_class = Cin_ControlPescaSerializer

    # Get all CinControlturistas
    def get(self, request, pk):
        print("Consultando CinControlPesca...")
        return Get_delete_update_base.get(self, request, pk,CinControlPesca,Cin_ControlPescaSerializer)

    # Update a CinControlturistas
    def put(self, request, pk):
        
        print("Actualizando CinControlPesca...")
        return Get_delete_update_base.put(self, request, pk,CinControlPesca,Cin_ControlPescaSerializer)
#------------------------------------------------------------------------------------------------------

#CONTROL PESCA - ESPECIES
class CinControlPescaEspecieViewSet(CommonFilterViewSet):
    __basic_fields = ['id','controlpesca_id','especie_id','eliminado', 'estado']
    serializer_class = Cin_ControlPescaEspecieSerializer_list
    queryset = CinControlPescaEspecie.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_CinControlPescaEspecie(Get_post_base):
    serializer_class = Cin_ControlPescaEspecieSerializer
    pagination_class = LimitOffsetPagination
    # Get all CinControlturistas
    def get(self, request):
        print("Getting CinControlPescaEspecie")
        return Get_post_base.get(self, request, CinControlPescaEspecie)
    def post(self, request):
        print("Getting CinControlPescaEspecie")
        return Get_post_base.post(self, request, Cin_ControlPescaEspecieSerializer)

class Get_delete_update_CinControlPescaEspecie(Get_delete_update_base):
    serializer_class = Cin_ControlPescaEspecieSerializer

    # Get all CinControlturistas
    def get(self, request, pk):
        print("Consultando CinControlPescaEspecie...")
        return Get_delete_update_base.get(self, request, pk,CinControlPescaEspecie,Cin_ControlPescaEspecieSerializer)

    # Update a CinControlturistas
    def put(self, request, pk):
        
        print("Actualizando CinControlPescaEspecie...")
        return Get_delete_update_base.put(self, request, pk,CinControlPescaEspecie,Cin_ControlPescaEspecieSerializer)


#INSPECCION DE CONTENEDORES
class CinInspeccionContenedoresViewSet(CommonFilterViewSet):
    __basic_fields = ['id','fecha','embarcacion','cod_contenedor','estado']
    serializer_class = Cin_InspeccionContenedores_list
    queryset = CinInspeccionContenedores.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_CinInspeccionContenedores(Get_post_base):
    serializer_class = Cin_InspeccionContenedoresSerializer
    pagination_class = LimitOffsetPagination
    # Get all CinControlCombustible
    def get(self, request):
        print("Getting CinControlContenedor...")
        return Get_post_base.get(self, request, CinInspeccionContenedores)
    def post(self, request):
        print("Getting CinControlContenedor...")
        return Get_post_base.post(self, request, Cin_InspeccionContenedoresSerializer)


class Get_delete_update_CinInspeccionContenedores(Get_delete_update_base):
    serializer_class = Cin_InspeccionContenedoresSerializer

    # Get all CinControlturistas
    def get(self, request, pk):
        print("Consultando CinInspeccionContenedores...")
        return Get_delete_update_base.get(self, request, pk,CinInspeccionContenedores,Cin_InspeccionContenedoresSerializer)

    # Update a CinControlturistas
    def put(self, request, pk):
        
        print("Actualizando CinInspeccionContenedores...")
        return Get_delete_update_base.put(self, request, pk,CinInspeccionContenedores,Cin_InspeccionContenedoresSerializer)



#------------------------------------------------------------------------------------------------------

#CONTROL DE PATRULLAJE
class CinControlPatrullajeViewSet(CommonFilterViewSet):
    __basic_fields = ['id','fecha','estado']
    serializer_class = Cin_ControlPatrullajeSerializer_list
    queryset = CinControlPatrullaje.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_CinControlPatrullaje(Get_post_base):
    serializer_class = Cin_ControlPatrullajeSerializer
    pagination_class = LimitOffsetPagination
    # Get all CinControlCombustible
    def get(self, request):
        print("Getting CinControlPatrullaje...")
        return Get_post_base.get(self, request, CinControlPatrullaje)
    def post(self, request):
        print("Getting CinControlPatrullaje...")
        return Get_post_base.post(self, request, Cin_ControlPatrullajeSerializer)


class Get_delete_update_CinControlPatrullaje(Get_delete_update_base):
    serializer_class = Cin_ControlPatrullajeSerializer
    # Get all CinControlPatrullaje
    def get(self, request, pk):
        print("Consultando CinControlPatrullaje...")
        return Get_delete_update_base.get(self, request, pk,CinControlPatrullaje,Cin_ControlPatrullajeSerializer)

    # Update a CinControlPatrullaje
    def put(self, request, pk):
        print("Actualizando CinControlPatrullaje...")
        return Get_delete_update_base.put(self, request, pk,CinControlPatrullaje,Cin_ControlPatrullajeSerializer)


#CONTROL DE SITIOS - PATRULLAJE
class CinControlSitioPatrullajeViewSet(CommonFilterViewSet):
    __basic_fields = ['id','controlpatrullaje_id','sitio_id','estado']
    serializer_class = Cin_ControlSitioPatrullajeSerializer_list
    queryset = CinControlSitioPatrullaje.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_CinControlSitioPatrullaje(Get_post_base):
    serializer_class = Cin_ControlSitioPatrullajeSerializer
    pagination_class = LimitOffsetPagination

    def get(self, request):
        print("Getting CinControlSitiosPatrullaje...")
        return Get_post_base.get(self, request, CinControlSitioPatrullaje)
    def post(self, request):
        print("Getting CinControlSitiosPatrullaje...")
        return Get_post_base.post(self, request, Cin_ControlSitioPatrullajeSerializer)

class Get_delete_update_CinControlSitioPatrullaje(Get_delete_update_base):
    serializer_class = Cin_ControlSitioPatrullajeSerializer

    # Get all CinControlSitioPatrullaje
    def get(self, request, pk):
        print("Consultando CinControlSitiosPatrullaje...")
        return Get_delete_update_base.get(self, request, pk,CinControlSitioPatrullaje,Cin_ControlSitioPatrullajeSerializer)

    # Update a CinControlSitioPatrullaje
    def put(self, request, pk):
        print("Actualizando CinControlSitiosPatrullaje...")
        return Get_delete_update_base.put(self, request, pk,CinControlSitioPatrullaje,Cin_ControlSitioPatrullajeSerializer)                  


#CONTROL DE HITOS - PATRULLAJE
class CinControlHitoPatrullajeViewSet(CommonFilterViewSet):
    __basic_fields = ['id','controlpatrullaje_id','hito_id','estado']
    serializer_class = Cin_ControlHitoPatrullajeSerializer_list
    queryset = CinControlHitoPatrullaje.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_CinControlHitoPatrullaje(Get_post_base):
    serializer_class = Cin_ControlHitoPatrullajeSerializer
    pagination_class = LimitOffsetPagination

    def get(self, request):
        print("Getting CinControlHitoPatrullaje...")
        return Get_post_base.get(self, request, CinControlHitoPatrullaje)
    def post(self, request):
        print("Getting CinControlHitoPatrullaje...")
        return Get_post_base.post(self, request, Cin_ControlHitoPatrullajeSerializer)

class Get_delete_update_CinControlHitoPatrullaje(Get_delete_update_base):
    serializer_class = Cin_ControlHitoPatrullajeSerializer

    # Get all CinControlSitioPatrullaje
    def get(self, request, pk):
        print("Consultando CinControlHitoPatrullaje...")
        return Get_delete_update_base.get(self, request, pk,CinControlHitoPatrullaje,Cin_ControlHitoPatrullajeSerializer)

    # Update a CinControlSitioPatrullaje
    def put(self, request, pk):
        print("Actualizando CinControlHitoPatrullaje...")
        return Get_delete_update_base.put(self, request, pk,CinControlHitoPatrullaje,Cin_ControlHitoPatrullajeSerializer)                  



#CONTROL DE NOVEDADES - PATRULLAJE
class CinControlNovedadPatrullajeViewSet(CommonFilterViewSet):
    __basic_fields = ['id','sitiopatrullaje_id','descripcion','estado']
    serializer_class = Cin_ControlNovedadPatrullajeSerializer_list
    queryset = CinControlNovedadPatrullaje.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_CinControlNovedadPatrullaje(Get_post_base):
    serializer_class = Cin_ControlNovedadPatrullajeSerializer
    pagination_class = LimitOffsetPagination

    def get(self, request):
        print("Getting CinControlNovedadPatrullaje...")
        return Get_post_base.get(self, request, CinControlNovedadPatrullaje)
    def post(self, request):
        print("Getting CinControlNovedadPatrullaje...")
        return Get_post_base.post(self, request, Cin_ControlNovedadPatrullajeSerializer)

class Get_delete_update_CinControlNovedadPatrullaje(Get_delete_update_base):
    serializer_class = Cin_ControlNovedadPatrullajeSerializer

    # Get all CinControlSitioPatrullaje
    def get(self, request, pk):
        print("Consultando CinControlNovedadPatrullaje...")
        return Get_delete_update_base.get(self, request, pk,CinControlNovedadPatrullaje,Cin_ControlNovedadPatrullajeSerializer)

    # Update a CinControlSitioPatrullaje
    def put(self, request, pk):
        print("Actualizando CinControlNovedadPatrullaje...")
        return Get_delete_update_base.put(self, request, pk,CinControlNovedadPatrullaje,Cin_ControlNovedadPatrullajeSerializer)                  



#=====================================CONTROL AEROPUERTO=================================
#CONTROL DE AEROPUERTO PRINCIPAL
class CinControlAeropuertoViewSet(CommonFilterViewSet):
    __basic_fields = ['id','fecha']
    serializer_class = Cin_ControlAeropuertoSerializer_list
    queryset = CinControlAeropuerto.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_CinControlAeropuerto(Get_post_base):
    serializer_class = Cin_ControlAeropuertoSerializer
    pagination_class = LimitOffsetPagination
    # Get all CinControlCombustible
    def get(self, request):
        print("Getting CinControlAeropuerto...")
        return Get_post_base.get(self, request, CinControlAeropuerto)
    def post(self, request):
        print("Getting CinControlAeropuerto...")
        return Get_post_base.post(self, request, Cin_ControlAeropuertoSerializer)


class Get_delete_update_CinControlAeropuerto(Get_delete_update_base):
    serializer_class = Cin_ControlAeropuertoSerializer

    # Get all CinControlturistas
    def get(self, request, pk):
        print("Consultando CinControlAeropuerto...")
        return Get_delete_update_base.get(self, request, pk,CinControlAeropuerto,Cin_ControlAeropuertoSerializer)

    # Update a CinControlturistas
    def put(self, request, pk):
        
        print("Actualizando CinControlAeropuerto...")
        return Get_delete_update_base.put(self, request, pk,CinControlAeropuerto,Cin_ControlAeropuertoSerializer)                  


#=====================================CONTROL AEROPUERTO REGISTRO GUIAS=================================
#CONTROL DE AEROPUERTO REGISTRO GUIAS
class CinControlAeropuertoGuiasViewSet(CommonFilterViewSet):
    __basic_fields = ['id','controlaerop_id','guia']
    serializer_class = Cin_ControlAeropuertoGuiasSerializer_list
    queryset = CinControlAeropuertoGuia.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_CinControlAeropuertoGuias(Get_post_base):
    serializer_class = Cin_ControlAeropuertoGuiasSerializer
    pagination_class = LimitOffsetPagination
    # Get all CinControlCombustible
    def get(self, request):
        print("Getting CinControlAeropuertoGuias...")
        return Get_post_base.get(self, request, CinControlAeropuertoGuia)
    def post(self, request):
        print("Getting CinControlAeropuertoGuias...")
        return Get_post_base.post(self, request, Cin_ControlAeropuertoGuiasSerializer)


class Get_delete_update_CinControlAeropuertoGuias(Get_delete_update_base):
    serializer_class = Cin_ControlAeropuertoGuiasSerializer

    # Get all Guias
    def get(self, request, pk):
        print("Consultando CinControlAeropuertoGuias...")
        return Get_delete_update_base.get(self, request, pk,CinControlAeropuertoGuia,Cin_ControlAeropuertoGuiasSerializer)

    # Update a Guia
    def put(self, request, pk):
        
        print("Actualizando CinControlAeropuertoGuias...")
        return Get_delete_update_base.put(self, request, pk,CinControlAeropuertoGuia,Cin_ControlAeropuertoGuiasSerializer)                  


#=====================================CONTROL AEROPUERTO REGISTRO MUESTRAS=================================
#CONTROL DE AEROPUERTO REGISTRO MUESTRAS
class CinControlAeropuertoMuestrasViewSet(CommonFilterViewSet):
    __basic_fields = ['id','controlaerop_id','muestra']
    serializer_class = Cin_ControlAeropuertoMuestrasSerializer_list
    queryset = CinControlAeropuertoMuestra.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_CinControlAeropuertoMuestras(Get_post_base):
    serializer_class = Cin_ControlAeropuertoMuestrasSerializer
    pagination_class = LimitOffsetPagination
    # Get all CinControlCombustible
    def get(self, request):
        print("Getting CinControlAeropuertoGuias...")
        return Get_post_base.get(self, request, CinControlAeropuertoMuestra)
    def post(self, request):
        print("Getting CinControlAeropuertoGuias...")
        return Get_post_base.post(self, request, Cin_ControlAeropuertoMuestrasSerializer)


class Get_delete_update_CinControlAeropuertoMuestras(Get_delete_update_base):
    serializer_class = Cin_ControlAeropuertoMuestrasSerializer

    # Get all Guias
    def get(self, request, pk):
        print("Consultando CinControlAeropuertoMuestra...")
        return Get_delete_update_base.get(self, request, pk,CinControlAeropuertoMuestra,Cin_ControlAeropuertoMuestrasSerializer)

    # Update a Guia
    def put(self, request, pk):
        
        print("Actualizando CinControlAeropuertoMuestra...")
        return Get_delete_update_base.put(self, request, pk,CinControlAeropuertoMuestra,Cin_ControlAeropuertoMuestrasSerializer)                  



#=====================================CONTROL AEROPUERTO REGISTRO VUELOS=================================
#CONTROL DE AEROPUERTO REGISTRO VUELOS
class CinControlAeropuertoVuelosViewSet(CommonFilterViewSet):
    __basic_fields = ['id','controlaerop_id','aerolinea']
    serializer_class = Cin_ControlAeropuertoVuelosSerializer_list
    queryset = CinControlAeropuertoVuelo.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_CinControlAeropuertoVuelos(Get_post_base):
    serializer_class = Cin_ControlAeropuertoVuelosSerializer
    pagination_class = LimitOffsetPagination
    # Get all CinControlCombustible
    def get(self, request):
        print("Getting CinControlAeropuertoVuelos...")
        return Get_post_base.get(self, request, CinControlAeropuertoVuelo)
    def post(self, request):
        print("Getting CinControlAeropuertoVuelos...")
        return Get_post_base.post(self, request, Cin_ControlAeropuertoVuelosSerializer)


class Get_delete_update_CinControlAeropuertoVuelos(Get_delete_update_base):
    serializer_class = Cin_ControlAeropuertoVuelosSerializer

    # Get all Guias
    def get(self, request, pk):
        print("Consultando CinControlAeropuertoVuelo...")
        return Get_delete_update_base.get(self, request, pk,CinControlAeropuertoVuelo,Cin_ControlAeropuertoVuelosSerializer)

    # Update a Guia
    def put(self, request, pk):
        
        print("Actualizando CinControlAeropuertoVuelo...")
        return Get_delete_update_base.put(self, request, pk,CinControlAeropuertoVuelo,Cin_ControlAeropuertoVuelosSerializer)                  




#=====================================CONTROL AEROPUERTO REGISTRO VUELOS=================================
#CONTROL DE AEROPUERTO REGISTRO VUELOS
class CinFuncionariosViewSet(CommonFilterViewSet):
    __basic_fields = ['id','identificacion','nombre_completo']
    serializer_class = Cin_FuncionariosSerializer_list
    #queryset = CinFuncionarios.objects.all()#.filter(eliminado='f').order_by('-fecha_ingreso')
    queryset = CinFuncionarios.objects.all().order_by('-identificacion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_CinFuncionarios(Get_post_base):
    serializer_class = Cin_FuncionariosSerializer
    pagination_class = LimitOffsetPagination
    # Get all CinControlCombustible
    def get(self, request):
        print("Getting CinFuncionarios...")
        return Get_post_base.get(self, request, CinFuncionarios)
    def post(self, request):
        print("Getting CinFuncionarios...")
        return Get_post_base.post(self, request, Cin_FuncionariosSerializer)


class Get_delete_update_CinFuncionarios(Get_delete_update_base):
    serializer_class = Cin_FuncionariosSerializer

    # Get all Guias
    def get(self, request, pk):
        print("Consultando CinFuncionarios....")
        return Get_delete_update_base.get(self, request, pk,CinFuncionarios,Cin_FuncionariosSerializer)

    # Update a Guia
    def put(self, request, pk):
        
        print("Actualizando CinFuncionarios....")
        return Get_delete_update_base.put(self, request, pk,CinFuncionarios,Cin_FuncionariosSerializer)                  


#CONTROL DE AEROPUERTO IGUANAS
class CinControlAeropuertoIguanasViewSet(CommonFilterViewSet):
    __basic_fields = ['id','fecha','estado']
    serializer_class = Cin_ControlAeropuertoIguanasSerializer_list
    queryset = CinControlAeropuertoIguanas.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_CinControlAeropuertoIguanas(Get_post_base):
    serializer_class = Cin_ControlAeropuertoIguanasSerializer
    pagination_class = LimitOffsetPagination
    # Get all CinControlCombustible
    def get(self, request):
        print("Getting CinControlAeropuertoIguanas...")
        return Get_post_base.get(self, request, CinControlAeropuertoIguanas)
    def post(self, request):
        print("Getting CinControlAeropuertoIguanas...")
        return Get_post_base.post(self, request, Cin_ControlAeropuertoIguanasSerializer)


class Get_delete_update_CinControlAeropuertoIguanas(Get_delete_update_base):
    serializer_class = Cin_ControlAeropuertoIguanasSerializer

    # Get all CinControlturistas
    def get(self, request, pk):
        print("Consultando CinControlAeropuertoIguanas...")
        return Get_delete_update_base.get(self, request, pk,CinControlAeropuertoIguanas,Cin_ControlAeropuertoIguanasSerializer)

    # Update a CinControlturistas
    def put(self, request, pk):
        
        print("Actualizando CinControlAeropuertoIguanas...")
        return Get_delete_update_base.put(self, request, pk,CinControlAeropuertoIguanas,Cin_ControlAeropuertoIguanasSerializer)                  


#CONTROL AEROPUERTO RECORRIDOS
class CinControlAeropuertoRecorridosViewSet(CommonFilterViewSet):
    __basic_fields = ['id','fecha','sitio_id','estado']
    serializer_class = Cin_ControlAeropuertoRecorridosSerializer_list
    queryset = CinControlAeropuertoRecorridos.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_CinControlAeropuertoRecorridos(Get_post_base):
    serializer_class = Cin_ControlAeropuertoRecorridosSerializer
    pagination_class = LimitOffsetPagination
    # Get all CinControlCombustible
    def get(self, request):
        print("Getting CinControlAeropuertoRecorridos...")
        return Get_post_base.get(self, request, CinControlAeropuertoRecorridos)
    def post(self, request):
        print("Getting CinControlAeropuertoRecorridos...")
        return Get_post_base.post(self, request, Cin_ControlAeropuertoRecorridosSerializer)


class Get_delete_update_CinControlAeropuertoRecorridos(Get_delete_update_base):
    serializer_class = Cin_ControlAeropuertoRecorridosSerializer

    # Get all CinControlturistas
    def get(self, request, pk):
        print("Consultando CinControlAeropuertoRecorridos...")
        return Get_delete_update_base.get(self, request, pk,CinControlAeropuertoRecorridos,Cin_ControlAeropuertoRecorridosSerializer)

    # Update a CinControlturistas
    def put(self, request, pk):
        
        print("Actualizando CinControlAeropuertoRecorridos...")
        return Get_delete_update_base.put(self, request, pk,CinControlAeropuertoRecorridos,Cin_ControlAeropuertoRecorridosSerializer)                  

#HITOS - LIMITES
class CinHitosViewSet(CommonFilterViewSet):
    __basic_fields = ['id','isla','area','punto']
    serializer_class = Cin_HitosSerializer_list
    queryset = CinHitos.objects.all()
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = MediumPagination

class Get_post_CinHitos(Get_post_base):
    serializer_class = Cin_HitosSerializer
    pagination_class = LimitOffsetPagination
    # Get all CinControlCombustible
    def get(self, request):
        print("Getting CinHitos...")
        return Get_post_base.get(self, request, CinHitos)
    def post(self, request):
        print("Getting CinHitos...")
        return Get_post_base.post(self, request, Cin_HitosSerializer)


class Get_delete_update_CinHitos(Get_delete_update_base):
    serializer_class = Cin_HitosSerializer

    # Get all CinControlturistas
    def get(self, request, pk):
        print("Consultando CinHitos...")
        return Get_delete_update_base.get(self, request, pk,CinHitos,Cin_HitosSerializer)

    # Update a CinControlturistas
    def put(self, request, pk):
        
        print("Actualizando CinHitos...")
        return Get_delete_update_base.put(self, request, pk,CinHitos,Cin_HitosSerializer)                  
