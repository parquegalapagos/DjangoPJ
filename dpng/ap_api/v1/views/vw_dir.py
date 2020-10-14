# Django


# DRF
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework import status

# Local
from .vw_base import Get_post_base, Get_delete_update_base,CommonFilterViewSet
from ap_api.v1.serializers.sz_dir import *
from ap_base.pagination import CustomPagination, LargePagination
from ap_base.permissions import IsOwnerOrReadOnly, IsAuthenticated
from ap_talentohumano.models import DirDepartment

# Dir_Department
class DirDepartmentViewSet(CommonFilterViewSet):
    __basic_fields = ['id','name','parentid','tipo']
    serializer_class = Dir_DepartmentSerializer_list
    queryset = DirDepartment.objects.all()
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

# DirClasificacionProceso
class DirClasificacionProcesoViewSet(CommonFilterViewSet):
    __basic_fields = ['id','nombre']
    serializer_class = Dir_ClasificacionProcesoSerializer_list
    queryset = DirClasificacionProceso.objects.all()
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination
    