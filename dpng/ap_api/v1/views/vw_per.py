# Django
from django.db.models import Q

# DRF
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework import status

# Local
from .vw_base import Get_post_base, Get_delete_update_base,CommonFilterViewSet
from ap_api.v1.serializers.sz_per import *

from ap_base.models import PerPersona
from ap_base.pagination import CustomPagination, LargePagination, MediumPagination,AppMovilPagination
from ap_base.permissions import IsOwnerOrReadOnly, IsAuthenticated
from ap_talentohumano.models import PerFuncionario, PerFuncionarioAccionpersonal,PerPersonaCuenta,PerFuncionarioCarnet


#---------freddy-----------------------
from ap_dup_guias.models import PerGuia
#--------------------------------------

from rest_framework.filters import SearchFilter, OrderingFilter

# Django Filters
from django_filters import rest_framework as filters
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination


# PERSONA
class PerPersonaViewSet(CommonFilterViewSet):
    __basic_fields = ['id','nombres','apellidos','identificacion',]
    serializer_class = Per_PersonaSerializer_list
    queryset = PerPersona.objects.all().filter(eliminado='f').order_by('-apellidos')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination


#----------------------------------------------------------------------------------
class PerPersonaViewSetLabel(CommonFilterViewSet):
    __basic_fields = ['id','nombres','apellidos','nombre_completo','identificacion',]
    serializer_class = Per_PersonaSerializer_label
    queryset = PerPersona.objects.all().filter(eliminado='f').order_by('-apellidos')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class PerPersonaViewSet2(CommonFilterViewSet):
    __basic_fields = ['id','nombres','apellidos','identificacion',]
    serializer_class = Per_PersonaFunSerializer_list
    queryset = PerPersona.objects.all().filter(eliminado='f').order_by('-apellidos')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination


class PerPersonaViewSet3(CommonFilterViewSet):
    __basic_fields = ['id','tipo_identificacion','tipo_persona','nombres','apellidos','identificacion',]
    serializer_class = Per_PersonaSerializer_label2
    queryset = PerPersona.objects.all().filter(eliminado='f').order_by('-apellidos')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = AppMovilPagination


class Get_post_perpersona(Get_post_base):
    serializer_class = Per_PersonaSerializer
    pagination_class = LimitOffsetPagination
    # Get all perpersona
    def get(self, request):
        print("Getting perpersona...")
        return Get_post_base.get(self, request, PerPersona)
    def post(self, request):
        print("Getting perpersona...")
        return Get_post_base.post(self, request, Per_PersonaSerializer)

class Get_delete_update_perpersona(Get_delete_update_base):
	serializer_class = Per_PersonaSerializer

	# Get all perpersona
	def get(self, request, pk):
		print("Consultando perpersona...")
		return Get_delete_update_base.get(self, request, pk,PerPersona,Per_PersonaSerializer)

	# Update a perpersona
	def put(self, request, pk):
		
		print("Actualizando perpersona...")
		return Get_delete_update_base.put(self, request, pk,PerPersona,Per_PersonaSerializer)

class Get_post_perpersona_funcionario(Get_post_base):
    serializer_class = Per_PersonaFuncionarioSerializer
    pagination_class = LimitOffsetPagination
    # Get all perpersona
    def get(self, request):
        print("Getting perpersona...")
        return Get_post_base.get(self, request, PerPersona)

    def post(self, request):
        print("Getting perpersona...")
        return Get_post_base.post(self, request, Per_PersonaFuncionarioSerializer)


class Get_delete_update_perpersona_funcionario(Get_delete_update_base):
    serializer_class = Per_PersonaFuncionarioSerializer

    # Get all perpersona
    def get(self, request, pk):
        print("Consultando perpersona...")
        return Get_delete_update_base.get(self, request, pk,PerPersona,Per_PersonaFuncionarioSerializer)

    # Update a perpersona
    def put(self, request, pk):
        
        print("Actualizando perpersona...")
        return Get_delete_update_base.put(self, request, pk,PerPersona,Per_PersonaFuncionarioSerializer)



# PERSONA CUENTA
class PerPersonaCuentaViewSet(CommonFilterViewSet):
    __basic_fields = ['persona_id','banco_id',]
    serializer_class = Per_PersonaCuentaSerializer_list
    queryset = PerPersonaCuenta.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_perpersonacuenta(Get_post_base):
	serializer_class = Per_PersonaCuentaSerializer
	# Get all perpersonacuenta
	def get(self, request):
		print("Getting perpersonacuenta...")
		return Get_post_base.get(self, request, PerPersonaCuenta)

	def post(self, request):
		print("Getting perpersonacuenta...")
		return Get_post_base.post(self, request, Per_PersonaCuentaSerializer)

class Get_delete_update_perpersonacuenta(Get_delete_update_base):
	serializer_class = Per_PersonaCuentaSerializer

	# Get all perpersonacuenta
	def get(self, request, pk):
		print("Consultando perpersonacuenta...")
		return Get_delete_update_base.get(self, request, pk,PerPersonaCuenta,Per_PersonaCuentaSerializer)

	# Update a perpersonacuenta
	def put(self, request, pk):
		
		print("Actualizando perpersonacuenta 2333...")
		return Get_delete_update_base.put(self, request, pk,PerPersonaCuenta,Per_PersonaCuentaSerializer)

# FUNCIONARIO FAMILIARES
class PerFuncionarioFamiliaresViewSet(CommonFilterViewSet):
    __basic_fields = ['familiar_id','funcionario_id','id',]
    serializer_class = Per_FuncionarioFamiliaresSerializer_list
    queryset = PerFuncionarioFamiliares.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_perfuncionariofamiliares(Get_post_base):
    serializer_class = Per_FuncionarioFamiliaresSerializer
    # Get all perfuncionariofamiliares
    def get(self, request):
        print("Getting perfuncionariofamiliares...")
        return Get_post_base.get(self, request, PerFuncionarioFamiliares)

    def post(self, request):
        print("Getting perfuncionariofamiliares...")
        return Get_post_base.post(self, request, Per_FuncionarioFamiliaresSerializer)

class Get_delete_update_perfuncionariofamiliares(Get_delete_update_base):
    serializer_class = Per_FuncionarioFamiliaresSerializer

    # Get all perfuncionariofamiliares
    def get(self, request, pk):
        print("Consultando perfuncionariofamiliares...")
        return Get_delete_update_base.get(self, request, pk,PerFuncionarioFamiliares,Per_FuncionarioFamiliaresSerializer)

    # Update a perfuncionariofamiliares
    def put(self, request, pk):
        
        print("Actualizando perfuncionariofamiliares...")
        return Get_delete_update_base.put(self, request, pk,PerFuncionarioFamiliares,Per_FuncionarioFamiliaresSerializer)

# FUNCIONARIO
class PerFuncionarioViewSet(CommonFilterViewSet):
    
    __basic_fields = ['persona_id__nombres','persona_id__apellidos','persona_id__identificacion','email','cargo_institucional_id__id','id','proceso_estatuto_id__id','subproceso_estatuto_id__id','direccion_estatuto_id__id',] 
    serializer_class = Per_FuncionarioSerializer_list
    queryset = PerFuncionario.objects.all().filter(eliminado='f').order_by('persona_id__apellidos')
    filter_backends = (filters.DjangoFilterBackend, SearchFilter, OrderingFilter)
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_perfuncionario(Get_post_base):
    serializer_class = Per_FuncionarioSerializer
    # Get all perfuncionario
    def get(self, request):
        print("Getting perfuncionario...")
        return Get_post_base.get(self, request, PerFuncionario)

    def post(self, request):
        print("Getting perfuncionario...")
        return Get_post_base.post(self, request, Per_FuncionarioSerializer)


class Get_delete_update_perfuncionario(Get_delete_update_base):
	serializer_class = Per_FuncionarioSerializer

	# Get all perfuncionario
	def get(self, request, pk):
		print("Consultando perfuncionario...")
		return Get_delete_update_base.get(self, request, pk,PerFuncionario,Per_FuncionarioSerializer)

	# Update a perfuncionario
	def put(self, request, pk):
		
		print("Actualizando perfuncionario...")
		return Get_delete_update_base.put(self, request, pk,PerFuncionario,Per_FuncionarioSerializer)

class PerFuncionarioViewSetData(CommonFilterViewSet):
    __basic_fields = ['persona_id','email','cargo_institucional_id','id','proceso_estatuto_id','estado','subproceso_estatuto_id',] 
    serializer_class = Per_FuncionarioSerializer_list
    queryset = PerFuncionario.objects.all().filter(eliminado='f').order_by('persona_id__apellidos')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class PerFuncionario_selectbox(CommonFilterViewSet):
    __basic_fields = ['persona_id__nombres','persona_id__apellidos','persona_id__identificacion','email','cargo_institucional_id__id','isla_trabaja_id__id'] 
    serializer_class = Per_FuncionarioSerializer_selectbox
    queryset = PerFuncionario.objects.all().filter(eliminado='f').order_by('persona_id__nombres')
    filter_backends = (filters.DjangoFilterBackend, SearchFilter, OrderingFilter)
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class PerFuncionario_selectbox2(CommonFilterViewSet):
    __basic_fields = ['persona_id__nombres','persona_id__apellidos','persona_id__identificacion','email','cargo_institucional_id__id','isla_trabaja_id__id'] 
    serializer_class = Per_FuncionarioSerializer_selectbox2
    queryset = PerFuncionario.objects.all().filter(eliminado='f').order_by('persona_id__nombres')
    filter_backends = (filters.DjangoFilterBackend, SearchFilter, OrderingFilter)
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination


# Per_FuncionarioAccionpersonal
class PerFuncionarioAccionpersonalViewSet(CommonFilterViewSet):
    __basic_fields = ['accionpersonal_id','funcionario_id','id','fecha_rige_accpersonal','accionpersonal_otros','fecha_ingreso','isla_usuario_ingreso_id','estado',]

    serializer_class = Per_FuncionarioAccionpersonalSerializer_list
    queryset = PerFuncionarioAccionpersonal.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination


class Get_post_perfuncionarioaccionpersonal(Get_post_base):
    serializer_class = Per_FuncionarioAccionpersonalSerializer
    # Get all perfuncionarioaccionpersonal
    def get(self, request):
        print("Getting gthcargofuncional...")
        return Get_post_base.get(self, request, PerFuncionarioAccionpersonal)

    def post(self, request):
    	return Get_post_base.post(self, request, Per_FuncionarioAccionpersonalSerializer)

class Get_delete_update_perfuncionarioaccionpersonal(Get_delete_update_base):
    serializer_class = Per_FuncionarioAccionpersonalSerializer

    # Get all perfuncionarioaccionpersonal
    def get(self, request, pk):
        print("Consultando perfuncionarioaccionpersonal...")
        return Get_delete_update_base.get(self, request, pk,PerFuncionarioAccionpersonal,Per_FuncionarioAccionpersonalSerializer)

    # Update a perfuncionarioaccionpersonal
    def put(self, request, pk):
        
        print("Actualizando perfuncionarioaccionpersonal...")
        return Get_delete_update_base.put(self, request, pk,PerFuncionarioAccionpersonal,Per_FuncionarioAccionpersonalSerializer)

class PerFuncionarioAccionpersonal_ingresos(CommonFilterViewSet):
    __basic_fields = ['accionpersonal_id','funcionario_id','id','fecha_rige_accpersonal',]
    serializer_class = Per_Accionpersonal_ingresos_Serializer
    queryset = PerFuncionarioAccionpersonal.objects.all().filter(Q(eliminado='f'),Q(accionpersonal_id='2b6be56b-aef5-4eef-8a31-9090d7fb8d66') |Q(accionpersonal_id='3eb27e5f-fff8-47c4-a8a6-20593915aa8e') | Q(accionpersonal_id='5a5538e0-2f55-4761-a5db-628be3efb6c3') | Q(accionpersonal_id='b8bb4fde-28a6-41ff-9838-09b8c7e70843') |Q(accionpersonal_id='5c89e060-40cb-4786-8adb-d9500435a486')| Q(accionpersonal_otros__descripcion__startswith='NOMBRA')).order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class PerFuncionarioAccionpersonal_licencias(CommonFilterViewSet):
    __basic_fields = ['accionpersonal_id','funcionario_id','id','fecha_rige_accpersonal',]
    serializer_class = Per_Accionpersonal_licencias_Serializer
    #queryset = PerFuncionarioAccionpersonal.objects.all().filter(eliminado='f',accionpersonal_id='1a7c2e1d-bd87-4f49-ba2b-2f9bf0788f0b').order_by('-fecha_ingreso')
    #queryset = PerFuncionarioAccionpersonal.objects.all().filter(Q(eliminado='f'),Q(accionpersonal_id='1a7c2e1d-bd87-4f49-ba2b-2f9bf0788f0b') | Q(accionpersonal_otros__accion_id='1a7c2e1d-bd87-4f49-ba2b-2f9bf0788f0b') | Q(accionpersonal_otros__accion_id='220d4e36-2e2c-4885-bd33-5e6e75f35896')).order_by('-fecha_ingreso')
    queryset = PerFuncionarioAccionpersonal.objects.all().filter(Q(eliminado='f'),Q(accionpersonal_otros__descripcion__startswith='LIC') | Q(accionpersonal_otros__descripcion__startswith='COMI')| Q(accionpersonal_otros__descripcion__startswith='Lic') | Q(accionpersonal_otros__descripcion__startswith='Com') | Q(accionpersonal_id__descripcion__icontains='Lic') ).order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class PerFuncionarioAccionpersonal_traspasos(CommonFilterViewSet):
    __basic_fields = ['accionpersonal_id','funcionario_id','id','fecha_rige_accpersonal',]
    serializer_class = Per_Accionpersonal_traspasos_Serializer
    queryset = PerFuncionarioAccionpersonal.objects.all().filter(Q(eliminado='f'),Q(accionpersonal_id='6bed0559-5d87-46aa-a42a-42caab5b421b') | Q(accionpersonal_id='5bec1ac6-ecca-4b49-bf3f-dfdd690cda94') | Q(accionpersonal_id='2c27f7da-d578-4c33-ba43-1c8cbbcfa8d4')).order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class PerFuncionarioAccionpersonal_encargos(CommonFilterViewSet):
    __basic_fields = ['accionpersonal_id','funcionario_id','id','fecha_rige_accpersonal','nuevo_puesto_id','estado_ejecucion',]
    serializer_class = Per_Accionpersonal_encargos_Serializer
    queryset = PerFuncionarioAccionpersonal.objects.all().filter(Q(eliminado='f'),Q(accionpersonal_id='59918445-f38d-4c70-868c-51521f1480c2') | Q(accionpersonal_id='9d5ed44e-864f-41d9-9dbe-1862863e1ced') | Q(accionpersonal_otros__descripcion__startswith='Enc') | Q(accionpersonal_otros__descripcion__startswith='ENC')).order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination



# Per_LicenciaAcciones
class PerLicenciaAccionesViewSet(CommonFilterViewSet):
    __basic_fields = ['accpersonal_id','num_informe_tec','id','fecha_rige_accpersonal',]
    serializer_class = Per_LicenciaAccionesSerializer_list
    queryset = PerLicenciaAcciones.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_perlicenciaacciones(Get_post_base):
    serializer_class = Per_LicenciaAccionesSerializer
    # Get all perLicenciaAcciones
    def get(self, request):
        print("Getting perLicenciaAcciones...")
        return Get_post_base.get(self, request, PerLicenciaAcciones)

    def post(self, request):
    	return Get_post_base.post(self, request, Per_LicenciaAccionesSerializer)

class Get_delete_update_perlicenciaacciones(Get_delete_update_base):
    serializer_class = Per_LicenciaAccionesSerializer

    # Get all perLicenciaAcciones
    def get(self, request, pk):
        print("Consultando perLicenciaAcciones...")
        return Get_delete_update_base.get(self, request, pk,PerLicenciaAcciones,Per_LicenciaAccionesSerializer)

    # Update a perLicenciaAcciones
    def put(self, request, pk):
        
        print("Actualizando perLicenciaAcciones...")
        return Get_delete_update_base.put(self, request, pk,PerLicenciaAcciones,Per_LicenciaAccionesSerializer)

# Per_TraspasoAcciones
class PerTraspasoAccionesViewSet(CommonFilterViewSet):
    __basic_fields = ['accpersonal_id','num_memo',]
    serializer_class = Per_TraspasoAccionesSerializer_list
    queryset = PerTraspasoAcciones.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_pertraspasoacciones(Get_post_base):
    serializer_class = Per_TraspasoAccionesSerializer
    # Get all perLicenciaAcciones
    def get(self, request):
        print("Getting perTraspasoAcciones...")
        return Get_post_base.get(self, request, PerTraspasoAcciones)

    def post(self, request):
        return Get_post_base.post(self, request, Per_TraspasoAccionesSerializer)

class Get_delete_update_pertraspasoacciones(Get_delete_update_base):
    serializer_class = Per_TraspasoAccionesSerializer

    # Get all perLicenciaAcciones
    def get(self, request, pk):
        print("Consultando perTraspasoAcciones...")
        return Get_delete_update_base.get(self, request, pk,PerTraspasoAcciones,Per_TraspasoAccionesSerializer)

    # Update a perLicenciaAcciones
    def put(self, request, pk):
        
        print("Actualizando perTraspasoAcciones...")
        return Get_delete_update_base.put(self, request, pk,PerTraspasoAcciones,Per_TraspasoAccionesSerializer)

# Per_IngresosAcciones
class PerIngresosAccionesViewSet(CommonFilterViewSet):
    __basic_fields = ['accionpersonal_id',]
    serializer_class = Per_IngresosAccionesSerializer_list
    queryset = PerIngresosAcciones.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_peringresosacciones(Get_post_base):
    serializer_class = Per_IngresosAccionesSerializer
    # Get all peringresosacciones
    def get(self, request):
        print("Getting peringresosacciones...")
        return Get_post_base.get(self, request, PerIngresosAcciones)

    def post(self, request):
    	return Get_post_base.post(self, request, Per_IngresosAccionesSerializer)

class Get_delete_update_peringresosacciones(Get_delete_update_base):
    serializer_class = Per_IngresosAccionesSerializer

    # Get all peringresosacciones
    def get(self, request, pk):
        print("Consultando peringresosacciones...")
        return Get_delete_update_base.get(self, request, pk,PerIngresosAcciones,Per_IngresosAccionesSerializer)

    # Update a peringresosacciones
    def put(self, request, pk):
        
        print("Actualizando peringresosacciones...")
        return Get_delete_update_base.put(self, request, pk,PerIngresosAcciones,Per_IngresosAccionesSerializer)

# Per_FuncionarioPermisos
class PerFuncionarioPermisosViewSet(CommonFilterViewSet):
    __basic_fields = ['funcionario_id','id','estado_revisor','estado_aprobador','motivo_id','fecha_desde','fecha_hasta','estado_tramite']
    serializer_class = Per_FuncionarioPermisosSerializer_list
    queryset = PerFuncionarioPermisos.objects.all().filter(eliminado='f').order_by('-fecha_ultima_modificacion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_perfuncionariopermisos(Get_post_base):
    serializer_class = Per_FuncionarioPermisosSerializer
    # Get all perfuncionariopermisos
    def get(self, request):
        print("Getting perfuncionariopermisos...")
        return Get_post_base.get(self, request, PerFuncionarioPermisos)

    def post(self, request):
        return Get_post_base.post(self, request, Per_FuncionarioPermisosSerializer)

class Get_delete_update_perfuncionariopermisos(Get_delete_update_base):
    serializer_class = Per_FuncionarioPermisosSerializer

    # Get all perfuncionariopermisos
    def get(self, request, pk):
        print("Consultando perfuncionariopermisos...")
        return Get_delete_update_base.get(self, request, pk,PerFuncionarioPermisos,Per_FuncionarioPermisosSerializer)

    # Update a perFuncionarioPermisos
    def put(self, request, pk):
        
        print("Actualizando perFuncionarioPermisos...")
        return Get_delete_update_base.put(self, request, pk,PerFuncionarioPermisos,Per_FuncionarioPermisosSerializer)

# Per_FuncionarioControlesRrhh
class PerFuncionarioControlesRrhhViewSet(CommonFilterViewSet):
    __basic_fields = ['funcionario_id','id','tipo','estado_notificacion',]
    serializer_class = Per_FuncionarioControlesRrhhSerializer_list
    queryset = VwPerFuncionarioControlesRrhh.objects.all()
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_perfuncionariocontrolesrrhh(Get_post_base):
    serializer_class = Per_FuncionarioControlesRrhhSerializer
    # Get all perfuncionariopermisos
    def get(self, request):
        print("Getting perfuncionariocontrolesrrhh...")
        return Get_post_base.get(self, request, PerFuncionarioControlesRrhh)

    def post(self, request):
        return Get_post_base.post(self, request, Per_FuncionarioControlesRrhhSerializer)

class Get_delete_update_perfuncionariocontrolesrrhh(Get_delete_update_base):
    serializer_class = Per_FuncionarioControlesRrhhSerializer

    # Get all perfuncionariocontrolesrrhh
    def get(self, request, pk):
        print("Consultando perfuncionariocontrolesrrhh...")
        return Get_delete_update_base.get(self, request, pk,PerFuncionarioControlesRrhh,Per_FuncionarioControlesRrhhSerializer)

    # Update a perfuncionariocontrolesrrhh
    def put(self, request, pk):
        
        print("Actualizando perfuncionariocontrolesrrhh...")
        return Get_delete_update_base.put(self, request, pk,PerFuncionarioControlesRrhh,Per_FuncionarioControlesRrhhSerializer)

# Per_AccidentesSerializer
class PerAccidentesViewSet(CommonFilterViewSet):
    __basic_fields = ['descripcion',]
    serializer_class = Per_AccidentesSerializer_list
    queryset = PerAccidentes.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_peraccidentes(Get_post_base):
    serializer_class = Per_AccidentesSerializer
    # Get all peraccidentes
    def get(self, request):
        print("Getting peraccidentes...")
        return Get_post_base.get(self, request, PerAccidentes)

    def post(self, request):
    	return Get_post_base.post(self, request, Per_AccidentesSerializer)

class Get_delete_update_peraccidentes(Get_delete_update_base):
    serializer_class = Per_AccidentesSerializer

    # Get all peraccidentes
    def get(self, request, pk):
        print("Consultando peraccidentes...")
        return Get_delete_update_base.get(self, request, pk,PerAccidentes,Per_AccidentesSerializer)

    # Update a peraccidentes
    def put(self, request, pk):
        
        print("Actualizando peraccidentes...")
        return Get_delete_update_base.put(self, request, pk,PerAccidentes,Per_AccidentesSerializer)

# Per_DiscapacidadesSerializer
class PerDiscapacidadesViewSet(CommonFilterViewSet):
    __basic_fields = ['descripcion',]
    serializer_class = Per_DiscapacidadesSerializer_list
    queryset = PerDiscapacidades.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_perdiscapacidades(Get_post_base):
    serializer_class = Per_DiscapacidadesSerializer
    # Get all peraccidentes
    def get(self, request):
        print("Getting perdiscapacidades...")
        return Get_post_base.get(self, request, PerDiscapacidades)

    def post(self, request):
    	return Get_post_base.post(self, request, Per_DiscapacidadesSerializer)

class Get_delete_update_perdiscapacidades(Get_delete_update_base):
    serializer_class = Per_DiscapacidadesSerializer

    # Get all peraccidentes
    def get(self, request, pk):
        print("Consultando perdiscapacidades...")
        return Get_delete_update_base.get(self, request, pk,PerDiscapacidades,Per_DiscapacidadesSerializer)

    # Update a peraccidentes
    def put(self, request, pk):
        
        print("Actualizando perdiscapacidades...")
        return Get_delete_update_base.put(self, request, pk,PerDiscapacidades,Per_DiscapacidadesSerializer)

# Per_Enfermedades
class PerEnfermedadesViewSet(CommonFilterViewSet):
    __basic_fields = ['id','descripcion','categoria_id',]
    serializer_class = Per_EnfermedadesSerializer_list
    queryset = PerEnfermedades.objects.all().filter(eliminado='f').order_by('-descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_perenfermedades(Get_post_base):
    serializer_class = Per_EnfermedadesSerializer
    # Get all perenfermedades
    def get(self, request):
        print("Getting perenfermedades...")
        return Get_post_base.get(self, request, PerEnfermedades)

    def post(self, request):
    	return Get_post_base.post(self, request, Per_EnfermedadesSerializer)

class Get_delete_update_perenfermedades(Get_delete_update_base):
    serializer_class = Per_EnfermedadesSerializer

    # Get all perenfermedades
    def get(self, request, pk):
        print("Consultando perenfermedades...")
        return Get_delete_update_base.get(self, request, pk,PerEnfermedades,Per_EnfermedadesSerializer)

    # Update a perenfermedades
    def put(self, request, pk):
        
        print("Actualizando perenfermedades...")
        return Get_delete_update_base.put(self, request, pk,PerEnfermedades,Per_EnfermedadesSerializer)

# Per_Etnias
class PerEtniasViewSet(CommonFilterViewSet):
    __basic_fields = ['descripcion']
    serializer_class = Per_EtniasSerializer_list
    queryset = PerEtnias.objects.all().filter(eliminado='f').order_by('-descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_peretnias(Get_post_base): 
    serializer_class = Per_EtniasSerializer
    # Get all peretnias
    def get(self, request):
        print("Getting peretnias...")
        return Get_post_base.get(self, request, PerEtnias)

    def post(self, request):
    	return Get_post_base.post(self, request, Per_EtniasSerializer)

class Get_delete_update_peretnias(Get_delete_update_base):
    serializer_class = Per_EtniasSerializer

    # Get all peretnias
    def get(self, request, pk):
        print("Consultando peretnias...")
        return Get_delete_update_base.get(self, request, pk,PerEtnias,Per_EtniasSerializer)

    # Update a peretnias
    def put(self, request, pk):
        
        print("Actualizando peretnias...")
        return Get_delete_update_base.put(self, request, pk,PerEtnias,Per_EtniasSerializer)

# Per_FuncionarioSanciones
class PerFuncionarioSancionesViewSet(CommonFilterViewSet):
    __basic_fields = ['funcionario_id','id','mes_sancion','anio_sancion','fecha_sancion','fecha_ingreso']
    serializer_class = Per_FuncionarioSancionesSerializer_list
    queryset = PerFuncionarioSanciones.objects.all().filter(eliminado='f').order_by('-anio_sancion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_perfuncionariosanciones(Get_post_base): 
    serializer_class = Per_FuncionarioSancionesSerializer
    # Get all perfuncionariosanciones
    def get(self, request):
        print("Getting perfuncionariosanciones...")
        return Get_post_base.get(self, request, PerFuncionarioSanciones)

    def post(self, request):
    	return Get_post_base.post(self, request, Per_FuncionarioSancionesSerializer)

class Get_delete_update_perfuncionariosanciones(Get_delete_update_base):
    serializer_class = Per_FuncionarioSancionesSerializer

    # Get all perfuncionariosanciones
    def get(self, request, pk):
        print("Consultando perfuncionariosanciones...")
        return Get_delete_update_base.get(self, request, pk,PerFuncionarioSanciones,Per_FuncionarioSancionesSerializer)

    # Update a perfuncionariosanciones
    def put(self, request, pk):
        
        print("Actualizando perfuncionariosanciones...")
        return Get_delete_update_base.put(self, request, pk,PerFuncionarioSanciones,Per_FuncionarioSancionesSerializer)


# PerFuncionarioCarnet
class PerFuncionarioCarnetViewSet(CommonFilterViewSet):
    __basic_fields = ['id','funcionario_id',]
    serializer_class = Per_FuncionarioCarnetSerializer_list
    queryset = PerFuncionarioCarnet.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_perfuncionariocarnet(Get_post_base): 
    serializer_class = Per_FuncionarioCarnetSerializer
    # Get all PerFuncionarioCarnet
    def get(self, request):
        print("Getting perfuncionariocarnet...")
        return Get_post_base.get(self, request, PerFuncionarioCarnet)

    def post(self, request):
        return Get_post_base.post(self, request, Per_FuncionarioCarnetSerializer)

class Get_delete_update_perfuncionariocarnet(Get_delete_update_base):
    serializer_class = Per_FuncionarioCarnetSerializer

    # Get all PerFuncionarioCarnet
    def get(self, request, pk):
        print("Consultando PerFuncionarioCarnet...")
        return Get_delete_update_base.get(self, request, pk,PerFuncionarioCarnet,Per_FuncionarioCarnetSerializer)

    # Update a PerFuncionarioCarnet
    def put(self, request, pk):
        
        print("Actualizando perfuncionariocarnet...")
        return Get_delete_update_base.put(self, request, pk,PerFuncionarioCarnet,Per_FuncionarioCarnetSerializer)



