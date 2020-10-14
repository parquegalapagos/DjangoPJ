# Django

# DRF

# Local
from .vw_base import Get_post_base,Get_delete_update_base,CommonFilterViewSet


from ap_api.v1.serializers.sz_gmv import *
from ap_base.pagination import CustomPagination, LargePagination

from django.db.models import Max
import json
from django.core.serializers.json import DjangoJSONEncoder
from ap_base.models import *
from ap_cuem_manejopesquero.models import *


# Spn_cc
class GmvEspeciesCantidadesViewSet(CommonFilterViewSet):
    __basic_fields = ['especie_id','id',]
    serializer_class = GmvEspeciesCantidadesSerializer_list
    queryset = GmvEspeciesCantidades.objects.all().filter(eliminado='f').order_by('-especie_id')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_gmvespeciescantidades(Get_post_base):
    serializer_class = GmvEspeciesCantidadesSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, GmvEspeciesCantidades)

    def post(self, request):
        return Get_post_base.post(self, request, GmvEspeciesCantidadesSerializer)

class Get_delete_update_gmvespeciescantidades(Get_delete_update_base):
    serializer_class = GmvEspeciesCantidadesSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,GmvEspeciesCantidades,GmvEspeciesCantidadesSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,GmvEspeciesCantidades,GmvEspeciesCantidadesSerializer)

# GmvGuiadomProductos
class GmvGuiadomProductosViewSet(CommonFilterViewSet):
    __basic_fields = ['especie_id','id','guiamovdom_id',]
    serializer_class = GmvGuiadomProductosSerializer_list
    queryset = GmvGuiadomProductos.objects.all().filter(eliminado='f').order_by('-guiamovdom_id')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_gmvguiadomproductos(Get_post_base):
    serializer_class = GmvGuiadomProductosSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, GmvGuiadomProductos)

    def post(self, request):
        return Get_post_base.post(self, request, GmvGuiadomProductosSerializer)

class Get_delete_update_gmvguiadomproductos(Get_delete_update_base):
    serializer_class = GmvGuiadomProductosSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,GmvGuiadomProductos,GmvGuiadomProductosSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,GmvGuiadomProductos,GmvGuiadomProductosSerializer)

#GmvGuiadomProductospescado
class GmvGuiadomProductosPescadoViewSet(CommonFilterViewSet):
    __basic_fields = ['especie_id','id','guiamovdom_id',]
    serializer_class = GmvGuiadomProductosPescadoSerializer_list
    queryset = GmvGuiadomProductospescado.objects.all().filter(eliminado='f').order_by('-guiamovdom_id')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_gmvguiadomproductospescado(Get_post_base):
    serializer_class = GmvGuiadomProductosPescadoSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, GmvGuiadomProductospescado)

    def post(self, request):
        return Get_post_base.post(self, request, GmvGuiadomProductosPescadoSerializer)

class Get_delete_update_gmvguiadomproductospescado(Get_delete_update_base):
    serializer_class = GmvGuiadomProductosPescadoSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,GmvGuiadomProductospescado,GmvGuiadomProductosPescadoSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,GmvGuiadomProductospescado,GmvGuiadomProductosPescadoSerializer)

#GmvGuiadom
class GmvGuiadomViewSet(CommonFilterViewSet):
    __basic_fields = ['nguiadomestica','id',]
    serializer_class = GmvGuiadomSerializer_list
    queryset = GmvGuiadom.objects.all().filter(eliminado='f').order_by('-nguiadomestica')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_gmvguiadom(Get_post_base):
    serializer_class = GmvGuiadomSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, GmvGuiadom)

    def post(self, request):
        return Get_post_base.post(self, request, GmvGuiadomSerializer)

class Get_delete_update_gmvguiadom(Get_delete_update_base):
    serializer_class = GmvGuiadomSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,GmvGuiadom,GmvGuiadomSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,GmvGuiadom,GmvGuiadomSerializer)