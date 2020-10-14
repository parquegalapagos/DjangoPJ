# Django

# DRF

# Local
from .vw_base import Get_post_base,Get_delete_update_base,CommonFilterViewSet
from ap_talentohumano.models import GthCargoFuncional,GthAccionpersonal
from ap_especiesnativas.models import *
from ap_api.v1.serializers.sz_gth import *
from ap_api.v1.serializers.sz_spn import *
from ap_base.pagination import CustomPagination, LargePagination

from django.db.models import Max
import json
from django.core.serializers.json import DjangoJSONEncoder

# Spn_cc
class SpnCentrosCrianzaViewSet(CommonFilterViewSet):
    __basic_fields = ['descripcion','id',]
    serializer_class = Spn_CentrosCrianzaSerializer_list
    queryset = SpnCentrosCrianza.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_spncentroscrianza(Get_post_base):
    serializer_class = Spn_CentrosCrianzaSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SpnCentrosCrianza)

    def post(self, request):
        return Get_post_base.post(self, request, Spn_CentrosCrianzaSerializer)

class Get_delete_update_spncentroscrianza(Get_delete_update_base):
    serializer_class = Spn_CentrosCrianzaSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SpnCentrosCrianza,Spn_CentrosCrianzaSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SpnCentrosCrianza,Spn_CentrosCrianzaSerializer)

# Spn_nidos
class SpnNidosViewSet(CommonFilterViewSet):
    __basic_fields = ['descripcion','sitio_id','id','tipo_nido','fecha_ingreso']
    serializer_class = Spn_NidosSerializer_list
    queryset = SpnNidos.objects.all().filter(eliminado='f').order_by('descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_spnnidos(Get_post_base):
    serializer_class = Spn_NidosSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SpnNidos)

    def post(self, request):
        return Get_post_base.post(self, request, Spn_NidosSerializer)

class Get_delete_update_spnnidos(Get_delete_update_base):
    serializer_class = Spn_NidosSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SpnNidos,Spn_NidosSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SpnNidos,Spn_NidosSerializer)

# Spn_control_huevos_nidos
class SpnControlHuevosNidosViewSet(CommonFilterViewSet):
    __basic_fields = ['num_nido','resp_registro','resp_liberar','id','fecha_protegido','fecha_liberacion',]
    serializer_class = Spn_ControlHuevosNidosSerializer_list
    queryset = SpnControlHuevosNidos.objects.all().filter(eliminado='f').order_by('num_nido')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination 

class Get_post_spncontrolhuevosnidos(Get_post_base):
    serializer_class = Spn_ControlHuevosNidosSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SpnControlHuevosNidos)

    def post(self, request):
        return Get_post_base.post(self, request, Spn_ControlHuevosNidosSerializer)

class Get_delete_update_spncontrolhuevosnidos(Get_delete_update_base):
    serializer_class = Spn_ControlHuevosNidosSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SpnControlHuevosNidos,Spn_ControlHuevosNidosSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SpnControlHuevosNidos,Spn_ControlHuevosNidosSerializer)

# Spn_control_petreles_nidos
class SpnControlPetrelesNidosViewSet(CommonFilterViewSet):
    __basic_fields = ['num_nido','participantes_nombres','id','fecha_revision']
    serializer_class = Spn_ControlPetrelesNidosSerializer_list
    queryset = SpnControlPetrelesNidos.objects.all().filter(eliminado='f').order_by('num_nido')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_spncontrolpetrelesnidos(Get_post_base):
    serializer_class = Spn_ControlPetrelesNidosSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SpnControlPetrelesNidos)

    def post(self, request):
        return Get_post_base.post(self, request, Spn_ControlPetrelesNidosSerializer)

class Get_delete_update_spncontrolpetrelesnidos(Get_delete_update_base):
    serializer_class = Spn_ControlPetrelesNidosSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SpnControlPetrelesNidos,Spn_ControlPetrelesNidosSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SpnControlPetrelesNidos,Spn_ControlPetrelesNidosSerializer)

# Spn_control_flamingos
class SpnControlFlamingosViewSet(CommonFilterViewSet):
    __basic_fields = ['sitio_id','encargados_nombres','id','fecha','control_flamingos_id',]
    serializer_class = Spn_ControlFlamingosSerializer_list
    queryset = SpnControlFlamingos.objects.all().filter(eliminado='f').order_by('sitio_id')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_spncontrolflamingos(Get_post_base):
    serializer_class = Spn_ControlFlamingosSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SpnControlFlamingos)

    def post(self, request):
        return Get_post_base.post(self, request, Spn_ControlFlamingosSerializer)

class Get_delete_update_spncontrolflamingos(Get_delete_update_base):
    serializer_class = Spn_ControlFlamingosSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SpnControlFlamingos,Spn_ControlFlamingosSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SpnControlFlamingos,Spn_ControlFlamingosSerializer)

# Spn_control_flamingos_otras_especies
class SpnControlFlamingosOtrasEspeciesViewSet(CommonFilterViewSet):
    __basic_fields = ['individuo_id','control_flamingos_id','id','tipo','estado_comportamiento',]
    serializer_class = Spn_ControlFlamingosOtrasEspeciesSerializer_list
    queryset = SpnControlFlamingosOtrasEspecies.objects.all().filter(eliminado='f').order_by('tipo')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_spncontrolflamingosotrasespecies(Get_post_base):
    serializer_class = Spn_ControlFlamingosOtrasEspeciesSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SpnControlFlamingosOtrasEspecies)

    def post(self, request):
        return Get_post_base.post(self, request, Spn_ControlFlamingosOtrasEspeciesSerializer)

class Get_delete_update_spncontrolflamingosotrasespecies(Get_delete_update_base):
    serializer_class = Spn_ControlFlamingosOtrasEspeciesSerializer

    # Get all gthcargofuncional
    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SpnControlFlamingosOtrasEspecies,Spn_ControlFlamingosOtrasEspeciesSerializer)

    # Update a gthcargofuncional
    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SpnControlFlamingosOtrasEspecies,Spn_ControlFlamingosOtrasEspeciesSerializer)

# Spn_poblacion
class SpnPoblacionViewSet(CommonFilterViewSet):
    __basic_fields = ['descripcion','id',]
    serializer_class = Spn_poblacionSerializer_list
    queryset = SpnPoblacion.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_spnpoblacion(Get_post_base):
    serializer_class = Spn_PoblacionSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SpnPoblacion)

    def post(self, request):
        return Get_post_base.post(self, request, Spn_PoblacionSerializer)

class Get_delete_update_spnpoblacion(Get_delete_update_base):
    serializer_class = Spn_PoblacionSerializer

    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SpnPoblacion,Spn_PoblacionSerializer)

    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SpnPoblacion,Spn_PoblacionSerializer)

# SpnTortugasAdultas
class SpnTortugasAdultasViewSet(CommonFilterViewSet):
    __basic_fields = ['centro_crianza_id','poblacion_id','anio','id','mes','periodo',]
    serializer_class = Spn_TortugasAdultasSerializer_list
    queryset = SpnTortugasAdultas.objects.all().filter(eliminado='f').order_by('centro_crianza_id','poblacion_id','anio','mes')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_spntortugasadultas(Get_post_base):
    serializer_class = Spn_TortugasAdultasSerializer
    # 
    def get(self, request):
        return Get_post_base.get(self, request, SpnTortugasAdultas)

    def post(self, request):
        return Get_post_base.post(self, request, Spn_TortugasAdultasSerializer)

class Get_delete_update_spntortugasadultas(Get_delete_update_base):
    serializer_class = Spn_TortugasAdultasSerializer

    def get(self, request, pk):
        return Get_delete_update_base.get(self, request, pk,SpnTortugasAdultas,Spn_TortugasAdultasSerializer)

    def put(self, request, pk):
        return Get_delete_update_base.put(self, request, pk,SpnTortugasAdultas,Spn_TortugasAdultasSerializer)

# Gth_CargoFuncionalSerializer
class  SpnControlHuevosViewSet(CommonFilterViewSet):
    __basic_fields = ['num_caja','num_incubadora','grupo_nacimiento','centro_crianza_id','poblacion_id',]
    serializer_class = Spn_ControlHuevosSerializer_list
    queryset = SpnControlHuevos.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_spncontrolhuevos(Get_post_base):
    serializer_class = Spn_ControlHuevosSerializer
    # Get all spncontrolhuevos
    def get(self, request):
        print("Getting spncontrolhuevos...")
        return Get_post_base.get(self, request, SpnControlHuevos)

    def post(self, request):
        print("Getting spncontrolhuevos...")
        return Get_post_base.post(self, request, Spn_ControlHuevosSerializer)

class Get_delete_update_spncontrolhuevos(Get_delete_update_base):
	serializer_class = Spn_ControlHuevosSerializer

	# Get all spncontrolhuevos
	def get(self, request, pk):
		print("Consultando spncontrolhuevos...")
		return Get_delete_update_base.get(self, request, pk,SpnControlHuevos,Spn_ControlHuevosSerializer)

	# Update a spncontrolhuevos
	def put(self, request, pk):
		
		print("Actualizando spncontrolhuevos...")
		return Get_delete_update_base.put(self, request, pk,SpnControlHuevos,Spn_ControlHuevosSerializer)


# Gth_CargoFuncionalSerializer
class  SpnControlHuevosResumenViewSet(CommonFilterViewSet):
    __basic_fields = ['control_huevos_id','fecha_postura','num_nido','num_hembra','fecha_ingreso',]
    serializer_class = Spn_ControlHuevosResumenSerializer_list
    queryset = SpnControlHuevosResumen.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_spncontrolhuevosresumen(Get_post_base):
    serializer_class = Spn_ControlHuevosResumenSerializer
    # Get all spncontrolhuevosresumen
    def get(self, request):
        print("Getting spncontrolhuevosresumen...")
        return Get_post_base.get(self, request, SpnControlHuevosResumen)

    def post(self, request):
        print("Getting spncontrolhuevosresumen...")
        print(request)
        return Get_post_base.post(self, request, Spn_ControlHuevosResumenSerializer)

class Get_delete_update_spncontrolhuevosresumen(Get_delete_update_base):
    serializer_class = Spn_ControlHuevosSerializer

    # Get all spncontrolhuevosresumen
    def get(self, request, pk):
        print("Consultando spncontrolhuevosresumen...")
        return Get_delete_update_base.get(self, request, pk,SpnControlHuevosResumen,Spn_ControlHuevosResumenSerializer)

    # Update a spncontrolhuevosresumen
    def put(self, request, pk):
        
        print("Actualizando spncontrolhuevosresumen...")
        return Get_delete_update_base.put(self, request, pk,SpnControlHuevosResumen,Spn_ControlHuevosResumenSerializer)

    # Delete a spncontrolhuevosresumen
    def delete(self, request, pk):
        
        print("Eliminando spncontrolhuevosresumen...")
        #print(Get_delete_update_base.delete(self, request, pk,SpnControlHuevosResumen))
        return Get_delete_update_base.delete(self, request, pk,SpnControlHuevosResumen)


# Gth_CargoFuncionalSerializer
class  SpnControlHuevosDetallesViewSet(CommonFilterViewSet):
    __basic_fields = ['num_huevo','num_nido','num_hembra','fecha_cambio_sustrato','fecha_eclosion','num_pintura','fecha_sacado',]
    serializer_class = Spn_ControlHuevosDetallesSerializer_list
    queryset = SpnControlHuevosDetalles.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_spncontrolhuevosdetalles(Get_post_base):
    serializer_class = Spn_ControlHuevosDetallesSerializer
    # Get all spncontrolhuevosdetalles
    def get(self, request):
        print("Getting spncontrolhuevosdetalles...")
        return Get_post_base.get(self, request, SpnControlHuevosDetalles)

    def post(self, request):
        print("Getting spncontrolhuevosdetalles...")
        return Get_post_base.post(self, request, Spn_ControlHuevosDetallesSerializer)

class Get_delete_update_spncontrolhuevosdetalles(Get_delete_update_base):
    serializer_class = Spn_ControlHuevosSerializer

    # Get all spncontrolhuevosdetalles
    def get(self, request, pk):
        print("Consultando spncontrolhuevosdetalles...")
        return Get_delete_update_base.get(self, request, pk,SpnControlHuevosDetalles,Spn_ControlHuevosDetallesSerializer)

    # Update a spncontrolhuevosdetalles
    def put(self, request, pk):
        
        print("Actualizando spncontrolhuevosdetalles...")
        return Get_delete_update_base.put(self, request, pk,SpnControlHuevosDetalles,Spn_ControlHuevosDetallesSerializer)

# Gth_CargoFuncionalSerializer
class  SpnControlCrecimientoGalapaguitosViewSet(CommonFilterViewSet):
    __basic_fields = ['id','grupo_nacimiento','centro_crianza_id','poblacion_id','periodo','anio','det_control_crecimiento_id']
    serializer_class = Spn_ControlCrecimientoGalapaguitosSerializer_list
    queryset = SpnControlCrecimientoGalapaguitos.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_spncontrolcrecimientogalapaguitos(Get_post_base):
    serializer_class = Spn_ControlCrecimientoGalapaguitosSerializer
    # Get all spncabcontrolcrecimientogalapaguitos
    def get(self, request):
        print("Getting spncontrolcrecimientogalapaguitos...")
        return Get_post_base.get(self, request, SpnControlCrecimientoGalapaguitos)

    def post(self, request):
        print("Getting spncontrolcrecimientogalapaguitos...")
        return Get_post_base.post(self, request, Spn_ControlCrecimientoGalapaguitosSerializer)

class Get_delete_update_spncontrolcrecimientogalapaguitos(Get_delete_update_base):
    serializer_class = Spn_ControlCrecimientoGalapaguitosSerializer

    # Get all spncabcontrolcrecimientogalapaguitos
    def get(self, request, pk):
        print("Consultando spncontrolcrecimientogalapaguitos...")
        return Get_delete_update_base.get(self, request, pk,SpnControlCrecimientoGalapaguitos,Spn_ControlCrecimientoGalapaguitosSerializer)

    # Update a spncabcontrolcrecimientogalapaguitos
    def put(self, request, pk):
        
        print("Actualizando spncabcontrolcrecimientogalapaguitos...")
        return Get_delete_update_base.put(self, request, pk,SpnControlCrecimientoGalapaguitos,Spn_ControlCrecimientoGalapaguitosSerializer)

    # Delete a spncontrolhuevosresumen
    def delete(self, request, pk):
        
        print("Eliminando spncontrolhuevosresumen...")
        #print(Get_delete_update_base.delete(self, request, pk,SpnControlHuevosResumen))
        return Get_delete_update_base.delete(self, request, pk,SpnControlCrecimientoGalapaguitos)

#  SpnControlCrecimientoGalapaguitos
class  SpnControlCrecimientoGalapaguitosDetallesViewSet(CommonFilterViewSet):
    __basic_fields = ['num_pintura','control_crecimiento_id','fecha_medida','muerta','repatriada','estado_ingreso']
    serializer_class = Spn_ControlCrecimientoGalapaguitosDetallesSerializer_list
    queryset = SpnControlCrecimientoGalapaguitosDetalles.objects.all().filter(eliminado='f').order_by('num_pintura')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_spncontrolcrecimientogalapaguitosdetalles(Get_post_base):
    serializer_class = Spn_ControlCrecimientoGalapaguitosDetallesSerializer_list
    # Get all spncontrolcrecimiento
    def get(self, request):
        print("Getting spncontrolcrecimientodetalles...")
        return Get_post_base.get(self, request, SpnControlCrecimientoGalapaguitosDetalles)

    def post(self, request):
        print("Getting spncontrolcrecimientodetalles...")
        print(request)
        return Get_post_base.post(self, request, Spn_ControlCrecimientoGalapaguitosDetallesSerializer_list)


class Get_post_spncontrolcrecimientogalapaguitosdetalles(Get_post_base):
    serializer_class = Spn_ControlCrecimientoGalapaguitosDetallesSerializer
    # Get all spncontrolhuevosdetalles
    def get(self, request):
        print("Getting spncontrolcrecimientogalapaguitosdetalles...")
        return Get_post_base.get(self, request, SpnControlCrecimientoGalapaguitosDetalles)

    def post(self, request):
        print("Getting spncontrolcrecimientogalapaguitosdetalles...")
        return Get_post_base.post(self, request, Spn_ControlCrecimientoGalapaguitosDetallesSerializer)

class Get_delete_update_spncontrolcrecimientogalapaguitosdetalles(Get_delete_update_base):
    serializer_class = Spn_ControlCrecimientoGalapaguitosDetallesSerializer

    # Get all spncontrolcrecimientogalapaguitos
    def get(self, request, pk):
        print("Consultando spncontrolcrecimientogalapaguitosdetalles...")
        return Get_delete_update_base.get(self, request, pk,SpnControlCrecimientoGalapaguitosDetalles,Spn_ControlCrecimientoGalapaguitosDetallesSerializer)

    # Update a spncontrolcrecimientogalapaguitos
    def put(self, request, pk):
        
        print("Actualizando spncontrolcrecimientogalapaguitosdetalles...")
        return Get_delete_update_base.put(self, request, pk,SpnControlCrecimientoGalapaguitosDetalles,Spn_ControlCrecimientoGalapaguitosDetallesSerializer)



class  SpnVwControlCrecimientoGalapaguitosViewSet(CommonFilterViewSet):
    __basic_fields = ['grupo_nacimiento','centro_crianza_id','poblacion','anio',]
    serializer_class = Spn_VwControlCrecimientoGalapaguitosSerializer_list
    queryset = VwSpnControlCrecimientoMaxMes.objects.all()
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class  SpnVwDatosHuevosPinturaViewSet(CommonFilterViewSet):
    __basic_fields = ['grupo_nacimiento','centro_crianza_id','poblacion','num_pintura',]
    serializer_class = Spn_VwDatosHuevosPinturaSerializer_list
    queryset = VwSpnDatosHuevoxPintura.objects.all()
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class  SpnVwDatosControlCreceHuevoxPinturaViewSet(CommonFilterViewSet):
    __basic_fields = ['grupo_nacimiento','centro_crianza_id','num_pintura',]
    serializer_class = Spn_VwDatosControlCreceHuevoxPinturaSerializer_list
    queryset = VwSpnDatosControlCreceHuevoxPintura.objects.all()
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class  SpnVwResumenHuevosIncubadosViewSet(CommonFilterViewSet):
    __basic_fields = ['grupo_nacimiento','centro_crianza_id','poblacion_id']
    serializer_class = Spn_VwResumenHuevosIncubadosSerializer_list
    queryset = VwSpnResumenHuevosIncubados.objects.all()
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class  SpnVwResumenHuevosIncubadosDetallesViewSet(CommonFilterViewSet):
    __basic_fields = ['grupo_nacimiento','centro_crianza_id','poblacion']
    serializer_class = Spn_VwResumenHuevosIncubadosDetallesSerializer_list
    queryset = VwSpnResumenHuevosIncubadosDetalles.objects.all()
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class  SpnVwResumenHuevosIncubadosPerdiodoDetallesViewSet(CommonFilterViewSet):
    __basic_fields = ['grupo_nacimiento','centro_crianza_id','fecha_medida','periodo','anio','periodo_medida']
    serializer_class = Spn_VwResumenHuevosIncubadosPerdiodoSerializer_list
    queryset = VwSpnResumenHuevosIncubadosPerdiodo.objects.all()
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class  SpnVwDetalleControlCrecimientoViewSet(CommonFilterViewSet):
    __basic_fields = ['grupo_nacimiento','centro_crianza_id','fecha_medida','periodo','anio','periodo_medida']
    serializer_class = Spn_VwDetalleControlCrecimientoSerializer_list
    queryset = VwSpnDetalleControlCrecimiento.objects.all()
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class  SpnVwEstadoActualCCViewSet(CommonFilterViewSet):
    __basic_fields = ['grupo_nacimiento','centro_crianza','des_poblacion','centro_crianza_id','periodo',]
    serializer_class = Spn_VwEstadoActualCC_list
    queryset = VwSpnEstadoActualCC.objects.all()
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination
