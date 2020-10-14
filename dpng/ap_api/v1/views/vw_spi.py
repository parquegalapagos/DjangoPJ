# Django

# DRF

# Local
from .vw_base import Get_post_base,Get_delete_update_base,CommonFilterViewSet
from ap_talentohumano.models import GthCargoFuncional,GthAccionpersonal
from ap_especiesintroducidas.models import *
from ap_api.v1.serializers.sz_gth import *
from ap_api.v1.serializers.sz_spi import *
from ap_base.pagination import CustomPagination, LargePagination

from django.db.models import Max
import json
from django.core.serializers.json import DjangoJSONEncoder

# Django Filters
from rest_framework.filters import SearchFilter, OrderingFilter

from django_filters import rest_framework as filters
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination



#servicios ambientales Vehiculo
class SpiEspeciesIntroducidasViewSet(CommonFilterViewSet):
    __basic_fields = ['id','sitio_id','isla_id','fecha','especie_id']
    serializer_class = SpiEspeciesIntroducidasSerializer_list
    queryset = SpiEspeciesIntroducidas.objects.all().filter(eliminado='f').order_by('-fecha')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_SpiEspeciesIntroducidas(Get_post_base):
    serializer_class = SpiEspeciesIntroducidasSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SpiEspeciesIntroducidas)

    def post(self, request):
        return Get_post_base.post(self, request, SpiEspeciesIntroducidasSerializer)

class Get_delete_update_SpiEspeciesIntroducidas(Get_delete_update_base):
    serializer_class = SpiEspeciesIntroducidas

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SpiEspeciesIntroducidas,SpiEspeciesIntroducidasSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SpiEspeciesIntroducidas,SpiEspeciesIntroducidasSerializer)

#servicios ambientales Vehiculo
class SpiEspeciesIntroducidasGatoViewSet(CommonFilterViewSet):
    __basic_fields = ['id','cab_especieintro_id',]
    serializer_class = SpiEspeciesIntroducidasGatoSerializer_list
    queryset = SpiEspeciesIntroducidasGato.objects.all().filter(eliminado='f').order_by('orden')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_SpiEspeciesIntroducidasGato(Get_post_base):
    serializer_class = SpiEspeciesIntroducidasGatoSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SpiEspeciesIntroducidasGato)

    def post(self, request):
        return Get_post_base.post(self, request, SpiEspeciesIntroducidasGatoSerializer)

class Get_delete_update_SpiEspeciesIntroducidasGato(Get_delete_update_base):
    serializer_class = SpiEspeciesIntroducidasGato

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SpiEspeciesIntroducidasGato,SpiEspeciesIntroducidasGatoSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SpiEspeciesIntroducidasGato,SpiEspeciesIntroducidasGatoSerializer)

#servicios ambientales Vehiculo
class SpiEspeciesIntroducidasCaracolViewSet(CommonFilterViewSet):
    __basic_fields = ['id','cab_especieintro_id',]
    serializer_class = SpiEspeciesIntroducidasCaracolSerializer_list
    queryset = SpiEspeciesIntroducidasCaracol.objects.all().filter(eliminado='f').order_by('orden')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_SpiEspeciesIntroducidasCaracol(Get_post_base):
    serializer_class = SpiEspeciesIntroducidasCaracolSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SpiEspeciesIntroducidasCaracol)

    def post(self, request):
        return Get_post_base.post(self, request, SpiEspeciesIntroducidasCaracolSerializer)

class Get_delete_update_SpiEspeciesIntroducidasCaracol(Get_delete_update_base):
    serializer_class = SpiEspeciesIntroducidasCaracol

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SpiEspeciesIntroducidasCaracol,SpiEspeciesIntroducidasCaracolSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SpiEspeciesIntroducidasCaracol,SpiEspeciesIntroducidasCaracolSerializer)

#servicios ambientales Vehiculo
class SpiEspeciesIntroducidasAvesViewSet(CommonFilterViewSet):
    __basic_fields = ['id','cab_especieintro_id','tipo_ave',]
    serializer_class = SpiEspeciesIntroducidasAvesSerializer_list
    queryset = SpiEspeciesIntroducidasAves.objects.all().filter(eliminado='f').order_by('orden')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_SpiEspeciesIntroducidasAves(Get_post_base):
    serializer_class = SpiEspeciesIntroducidasAvesSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SpiEspeciesIntroducidasAves)

    def post(self, request):
        return Get_post_base.post(self, request, SpiEspeciesIntroducidasAvesSerializer)

class Get_delete_update_SpiEspeciesIntroducidasAves(Get_delete_update_base):
    serializer_class = SpiEspeciesIntroducidasAves

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SpiEspeciesIntroducidasAves,SpiEspeciesIntroducidasAvesSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SpiEspeciesIntroducidasAves,SpiEspeciesIntroducidasAvesSerializer)

#servicios ambientales Vehiculo
class SpiEspeciesIntroducidasHormigasViewSet(CommonFilterViewSet):
    __basic_fields = ['id','cab_especieintro_id',]
    serializer_class = SpiEspeciesIntroducidasHormigasSerializer_list
    queryset = SpiEspeciesIntroducidasHormigas.objects.all().filter(eliminado='f').order_by('orden')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_SpiEspeciesIntroducidasHormigas(Get_post_base):
    serializer_class = SpiEspeciesIntroducidasHormigasSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SpiEspeciesIntroducidasHormigas)

    def post(self, request):
        return Get_post_base.post(self, request, SpiEspeciesIntroducidasHormigasSerializer)

class Get_delete_update_SpiEspeciesIntroducidasHormigas(Get_delete_update_base):
    serializer_class = SpiEspeciesIntroducidasHormigas

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SpiEspeciesIntroducidasHormigas,SpiEspeciesIntroducidasHormigasSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SpiEspeciesIntroducidasHormigas,SpiEspeciesIntroducidasHormigasSerializer)

#servicios ambientales Vehiculo
class SpiEspeciesIntroducidasCaceriaViewSet(CommonFilterViewSet):
    __basic_fields = ['id','cab_especieintro_id',]
    serializer_class = SpiEspeciesIntroducidasCaceriaSerializer_list
    queryset = SpiEspeciesIntroducidasCaceria.objects.all().filter(eliminado='f').order_by('orden')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_SpiEspeciesIntroducidasCaceria(Get_post_base):
    serializer_class = SpiEspeciesIntroducidasCaceriaSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SpiEspeciesIntroducidasCaceria)

    def post(self, request):
        return Get_post_base.post(self, request, SpiEspeciesIntroducidasCaceriaSerializer)

class Get_delete_update_SpiEspeciesIntroducidasCaceria(Get_delete_update_base):
    serializer_class = SpiEspeciesIntroducidasCaceria

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SpiEspeciesIntroducidasCaceria,SpiEspeciesIntroducidasCaceriaSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SpiEspeciesIntroducidasCaceria,SpiEspeciesIntroducidasCaceriaSerializer)


class Get_post_cabecera_detalle_especiesintroducidas(Get_post_base):
    serializer_class = SpiEspeciesIntroducidasCabDetSerializer
    pagination_class = LimitOffsetPagination
    # Get all perpersona
    def get(self, request):
        print("Getting perpersona...")
        return Get_post_base.get(self, request, SpiEspeciesIntroducidas)

    def post(self, request):
        print("Getting perpersona...")
        return Get_post_base.post(self, request, SpiEspeciesIntroducidasCabDetSerializer)


class Get_delete_update_cabecera_detalle_especiesintroducidas(Get_delete_update_base):
    serializer_class = SpiEspeciesIntroducidasCabDetSerializer

    # Get all perpersona
    def get(self, request, pk):
        print("Consultando perpersona...")
        return Get_delete_update_base.get(self, request, pk,SpiEspeciesIntroducidas,SpiEspeciesIntroducidasCabDetSerializer)

    # Update a perpersona
    def put(self, request, pk):
        
        print("Actualizando perpersona...")
        return Get_delete_update_base.put(self, request, pk,SpiEspeciesIntroducidas,SpiEspeciesIntroducidasCabDetSerializer)


#servicios ambientales Vehiculo
class SpiMetodosControlViewSet(CommonFilterViewSet):
    __basic_fields = ['id','metodo',]
    serializer_class = SpiMetodosControlSerializer_list
    queryset = SpiMetodosControl.objects.all().filter(eliminado='f').order_by('metodo')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_SpiMetodosControl(Get_post_base):
    serializer_class = SpiMetodosControlSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SpiMetodosControl)

    def post(self, request):
        return Get_post_base.post(self, request, SpiMetodosControlSerializer)

class Get_delete_update_SpiMetodosControl(Get_delete_update_base):
    serializer_class = SpiMetodosControl

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SpiMetodosControl,SpiMetodosControlSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SpiMetodosControl,SpiMetodosControlSerializer)

#servicios ambientales Vehiculo
class SpiMetodosControlEspeciesViewSet(CommonFilterViewSet):
    __basic_fields = ['id','metodo_id','especie_id',]
    serializer_class = SpiMetodosControlEspeciesSerializer_list
    queryset = SpiMetodosControlEspecies.objects.all().filter(eliminado='f').order_by('id')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_SpiMetodosControlEspecies(Get_post_base):
    serializer_class = SpiMetodosControlEspeciesSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SpiMetodosControlEspecies)

    def post(self, request):
        return Get_post_base.post(self, request, SpiMetodosControlEspeciesSerializer)

class Get_delete_update_SpiMetodosControlEspecies(Get_delete_update_base):
    serializer_class = SpiMetodosControlEspecies

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SpiMetodosControlEspecies,SpiMetodosControlEspeciesSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SpiMetodosControlEspecies,SpiMetodosControlEspeciesSerializer)