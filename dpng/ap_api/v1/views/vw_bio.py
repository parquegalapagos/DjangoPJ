# Django

# DRF

# Local
from .vw_base import Get_post_base,Get_delete_update_base,CommonFilterViewSet
from ap_talentohumano.models import GthCargoFuncional,GthAccionpersonal
from ap_especiesnativas.models import *
from ap_api.v1.serializers.sz_gth import *
from ap_api.v1.serializers.sz_spn import *
from ap_api.v1.serializers.sz_bio import *
from ap_base.pagination import CustomPagination, LargePagination

from django.db.models import Max
import json
from django.core.serializers.json import DjangoJSONEncoder


# Spn_cc
class BioEspeciesViewSet(CommonFilterViewSet):
    __basic_fields = ['nombre_comun','id','categoria','tipo_pesca_gmv',]
    serializer_class = Bio_EspeciesSerializer_list
    queryset = BioEspecie.objects.all().filter(eliminado='f').order_by('-nombre_comun')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_bioespecies(Get_post_base):
    serializer_class = Bio_EspeciesSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, BioEspecie)

    def post(self, request):
        return Get_post_base.post(self, request, Bio_EspeciesSerializer)

class Get_delete_update_bioespecies(Get_delete_update_base):
    serializer_class = Bio_EspeciesSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,BioEspecie,Bio_EspeciesSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,BioEspecie,Bio_EspeciesSerializer)