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
from ap_api.v1.serializers.sz_daf import *

# Models
from ap_daf_certificaciones.models import DafCertificaciones,DafCertificacionesDetalles

# Django Filters
from rest_framework.filters import SearchFilter, OrderingFilter

from django_filters import rest_framework as filters
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination

# CERTIFICACIONES
class DafCertificacionesViewSet(CommonFilterViewSet):
    __basic_fields = ['id','titulo','descripcion','monto','fecha_solicitud','estado_tramite','tipo','aprobar_dirarea','aprobar_compraspub','aprobar_respac','aprobar_planificacion','aprobar_presupuesto','func_solicitante_id','func_dirarea_id','tipo_revision','aprobar_tic','aprobar_mantenimiento','aprobar_obracivil','func_reasignado_id','isla_usuario_ingreso_id','aprobar_adminfinanciero']
    serializer_class = Daf_CertificacionesSerializer_list
    queryset = DafCertificaciones.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_dafcertificaciones(Get_post_base):
    serializer_class = Daf_CertificacionesSerializer
    pagination_class = LimitOffsetPagination
    # Get all dafcertificaciones
    def get(self, request):
        print("Getting dafcertificaciones...")
        return Get_post_base.get(self, request, DafCertificaciones)
    def post(self, request):
        print("Getting dafcertificaciones...")
        return Get_post_base.post(self, request, Daf_CertificacionesSerializer)

class Get_delete_update_dafcertificaciones(Get_delete_update_base):
	serializer_class = Daf_CertificacionesSerializer

	# Get all dafcertificaciones
	def get(self, request, pk):
		print("Consultando dafcertificaciones...")
		return Get_delete_update_base.get(self, request, pk,DafCertificaciones,Daf_CertificacionesSerializer)

	# Update a dafcertificaciones
	def put(self, request, pk):
		
		print("Actualizando dafcertificaciones...")
		return Get_delete_update_base.put(self, request, pk,DafCertificaciones,Daf_CertificacionesSerializer)


# CERTIFICACIONES DETALLES

class Get_post_dafcertificacionesdetalles(Get_post_base):
    serializer_class = Daf_CertificacionesDetallesSerializer
    pagination_class = LimitOffsetPagination
    # Get all dafcertificaciones
    def get(self, request):
        print("Getting dafcertificacionesdetalles...")
        return Get_post_base.get(self, request, DafCertificacionesDetalles)
    def post(self, request):
        print("Getting dafcertificacionesdetalles...")
        return Get_post_base.post(self, request, Daf_CertificacionesDetallesSerializer)

class Get_delete_update_dafcertificacionesdetalles(Get_delete_update_base):
    serializer_class = Daf_CertificacionesDetallesSerializer

    # Get all dafcertificacionesdetalles
    def get(self, request, pk):
        print("Consultando dafcertificacionesdetalles...")
        return Get_delete_update_base.get(self, request, pk,DafCertificacionesDetalles,Daf_CertificacionesDetallesSerializer)

    # Update a dafcertificacionesdetalles
    def put(self, request, pk):
        
        print("Actualizando dafcertificacionesdetalles...")
        return Get_delete_update_base.put(self, request, pk,DafCertificacionesDetalles,Daf_CertificacionesDetallesSerializer)


class Get_post_cabecera_detalle_certificaciones(Get_post_base):
    serializer_class = DafCertificacionesCabDetSerializer
    pagination_class = LimitOffsetPagination
    # Get all certificaciones
    def get(self, request):
        print("Getting certificaciones...")
        return Get_post_base.get(self, request, DafCertificaciones)

    def post(self, request):
        print("Getting certificaciones...")
        return Get_post_base.post(self, request, DafCertificacionesCabDetSerializer)


class Get_delete_update_cabecera_detalle_certificaciones(Get_delete_update_base):
    serializer_class = DafCertificacionesCabDetSerializer

    # Get all certificaciones
    def get(self, request, pk):
        print("Consultando certificaciones...")
        return Get_delete_update_base.get(self, request, pk,DafCertificaciones,DafCertificacionesCabDetSerializer)

    # Update a certificaciones
    def put(self, request, pk):
        
        print("Actualizando certificaciones...")
        return Get_delete_update_base.put(self, request, pk,DafCertificaciones,DafCertificacionesCabDetSerializer)