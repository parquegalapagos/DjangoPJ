# Django

# DRF

# Local
from .vw_base import Get_post_base,Get_delete_update_base,CommonFilterViewSet
from ap_talentohumano.models import GthCargoFuncional,GthAccionpersonal
from ap_api.v1.serializers.sz_gth import *
from ap_base.pagination import CustomPagination, LargePagination

# Gth_CargoFuncionalSerializer
class GthBaseNombramientoViewSet(CommonFilterViewSet):
    __basic_fields = ['nombre',]
    serializer_class = Gth_BaseNombramientoSerializer_list
    queryset = GthBaseNombramiento.objects.all()
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_gthbasenombramiento(Get_post_base):
    serializer_class = Gth_BaseNombramientoSerializer
    # Get all gthbasenombramiento
    def get(self, request):
        print("Getting gthbasenombramiento...")
        return Get_post_base.get(self, request, GthBaseNombramiento)

    def post(self, request):
        print("Getting gthbasenombramiento...")
        return Get_post_base.post(self, request, Gth_BaseNombramientoSerializer)

# Gth_CargoFuncionalSerializer
class GthCargoFuncionalViewSet(CommonFilterViewSet):
    __basic_fields = ['identificador','nombre',]
    serializer_class = Gth_CargoFuncionalSerializer_list
    queryset = GthCargoFuncional.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_gthcargofuncional(Get_post_base):
    serializer_class = Gth_CargoFuncionalSerializer
    # Get all gthcargofuncional
    def get(self, request):
        print("Getting gthcargofuncional...")
        return Get_post_base.get(self, request, GthCargoFuncional)

    def post(self, request):
        print("Getting gthcargofuncional...")
        return Get_post_base.post(self, request, Gth_CargoFuncionalSerializer)

class Get_delete_update_gthcargofuncional(Get_delete_update_base):
	serializer_class = Gth_CargoFuncionalSerializer

	# Get all gthcargofuncional
	def get(self, request, pk):
		print("Consultando gthcargofuncional...")
		return Get_delete_update_base.get(self, request, pk,GthCargoFuncional,Gth_CargoFuncionalSerializer)

	# Update a gthcargofuncional
	def put(self, request, pk):
		
		print("Actualizando gthcargofuncional...")
		return Get_delete_update_base.put(self, request, pk,GthCargoFuncional,Gth_CargoFuncionalSerializer)


# Gth_CargoDistributivoSerializer
class GthCargoDistributivoViewSet(CommonFilterViewSet):
    __basic_fields = ['nombre',]
    serializer_class = Gth_CargoDistributivoSerializer_list
    queryset = GthCargoDistributivo.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_gthcargodistributivo(Get_post_base):
    serializer_class = Gth_CargoDistributivoSerializer
    # Get all gthcargodistributivo
    def get(self, request):
        print("Getting gthcargodistributivo...")
        return Get_post_base.get(self, request, GthCargoDistributivo)

    def post(self, request):
        print("Getting gthcargodistributivo...")
        return Get_post_base.post(self, request, Gth_CargoDistributivoSerializer)

class Get_delete_update_gthcargodistributivo(Get_delete_update_base):
    serializer_class = Gth_CargoDistributivoSerializer

    # Get all gthcargodistributivo
    def get(self, request, pk):
        print("Consultando gthcargodistributivo...")
        return Get_delete_update_base.get(self, request, pk,GthCargoDistributivo,Gth_CargoDistributivoSerializer)

    # Update a gthcargodistributivo
    def put(self, request, pk):
        
        print("Actualizando gthcargodistributivo...")
        return Get_delete_update_base.put(self, request, pk,GthCargoDistributivo,Gth_CargoDistributivoSerializer)

# Gth_CargoInstitucionalSerializer
class GthCargoInstitucionalViewSet(CommonFilterViewSet):
    __basic_fields = ['nombre',]
    serializer_class = Gth_CargoInstitucionalSerializer_list
    queryset = GthCargoInstitucional.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_gthcargoinstitucional(Get_post_base):
    serializer_class = Gth_CargoInstitucionalSerializer
    # Get all gthcargoinstitucional
    def get(self, request):
        print("Getting gthcargoinstitucional...")
        return Get_post_base.get(self, request, GthCargoInstitucional)

    def post(self, request):
        print("Getting gthcargoinstitucional...")
        return Get_post_base.post(self, request, Gth_CargoInstitucionalSerializer)

class Get_delete_update_gthcargoinstitucional(Get_delete_update_base):
    serializer_class = Gth_CargoInstitucionalSerializer

    # Get all gthcargoinstitucional
    def get(self, request, pk):
        print("Consultando gthcargoinstitucional...")
        return Get_delete_update_base.get(self, request, pk,GthCargoInstitucional,Gth_CargoInstitucionalSerializer)

    # Update a gthcargoinstitucional
    def put(self, request, pk):
        
        print("Actualizando gthcargoinstitucional...")
        return Get_delete_update_base.put(self, request, pk,GthCargoInstitucional,Gth_CargoInstitucionalSerializer)

# Gth_CargoOcupacionalSerializer
class GthCargoOcupacionalViewSet(CommonFilterViewSet):
    __basic_fields = ['nombre',]
    serializer_class = Gth_CargoOcupacionalSerializer_list
    queryset = GthCargoOcupacional.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_gthcargoocupacional(Get_post_base):
    serializer_class = Gth_CargoOcupacionalSerializer
    # Get all gthcargoocupacional
    def get(self, request):
        print("Getting gthcargoocupacional...")
        return Get_post_base.get(self, request, GthCargoOcupacional)

    def post(self, request):
        print("Getting gthcargoocupacional...")
        return Get_post_base.post(self, request, Gth_CargoOcupacionalSerializer)

class Get_delete_update_gthcargoocupacional(Get_delete_update_base):
    serializer_class = Gth_CargoOcupacionalSerializer

    # Get all gthcargoocupacional
    def get(self, request, pk):
        print("Consultando gthcargoocupacional...")
        return Get_delete_update_base.get(self, request, pk,GthCargoOcupacional,Gth_CargoOcupacionalSerializer)

    # Update a gthcargoocupacional
    def put(self, request, pk):
        
        print("Actualizando gthcargoocupacional...")
        return Get_delete_update_base.put(self, request, pk,GthCargoOcupacional,Gth_CargoOcupacionalSerializer)

# Gth_Comisiones
class GthComisionesViewSet(CommonFilterViewSet):
    __basic_fields = ['descripcion',]
    serializer_class = Gth_ComisionesSerializer_list
    queryset = GthComisiones.objects.all().filter(eliminado='f').order_by('-descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_gthcomisiones(Get_post_base):
    serializer_class = Gth_ComisionesSerializer
    # Get all gthcomisiones
    def get(self, request):
        print("Getting gthcomisiones...")
        return Get_post_base.get(self, request, GthComisiones)

    def post(self, request):
        print("Getting gthcomisiones...")
        return Get_post_base.post(self, request, Gth_ComisionesSerializer)

class Get_delete_update_gthcomisiones(Get_delete_update_base):
    serializer_class = Gth_ComisionesSerializer

    # Get all gthcomisiones
    def get(self, request, pk):
        print("Consultando gthcomisiones...")
        return Get_delete_update_base.get(self, request, pk,GthComisiones,Gth_ComisionesSerializer)

    # Update a gthcomisiones
    def put(self, request, pk):
        
        print("Actualizando gthcomisiones...")
        return Get_delete_update_base.put(self, request, pk,GthComisiones,Gth_ComisionesSerializer)

# Gth_Licencias
class GthLicenciasViewSet(CommonFilterViewSet):
    __basic_fields = ['descripcion',]
    serializer_class = Gth_LicenciasSerializer_list
    queryset = GthLicencias.objects.all().filter(eliminado='f').order_by('-descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_gthlicencias(Get_post_base):
    serializer_class = Gth_LicenciasSerializer
    # Get all gthlicencias
    def get(self, request):
        print("Getting gthlicencias...")
        return Get_post_base.get(self, request, GthLicencias)

    def post(self, request):
        print("Getting gthlicencias...")
        return Get_post_base.post(self, request, Gth_LicenciasSerializer)

class Get_delete_update_gthlicencias(Get_delete_update_base):
    serializer_class = Gth_LicenciasSerializer

    # Get all gthlicencias
    def get(self, request, pk):
        print("Consultando gthlicencias...")
        return Get_delete_update_base.get(self, request, pk,GthLicencias,Gth_LicenciasSerializer)

    # Update a gthlicencias
    def put(self, request, pk):
        
        print("Actualizando gthlicencias...")
        return Get_delete_update_base.put(self, request, pk,GthLicencias,Gth_LicenciasSerializer)

# Gth_Modalidadlaboral
class GthModalidadLaboralViewSet(CommonFilterViewSet):
    __basic_fields = ['nombre',]
    serializer_class = Gth_ModalidadLaboralSerializer_list
    queryset = GthModalidadLaboral.objects.all().filter(eliminado='f').order_by('-nombre')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_gthmodalidadlaboral(Get_post_base):
    serializer_class = Gth_ModalidadLaboralSerializer
    # Get all gthmodalidadlaboral
    def get(self, request):
        print("Getting gthmodalidadlaboral...")
        return Get_post_base.get(self, request, GthModalidadLaboral)

    def post(self, request):
        print("Getting gthmodalidadlaboral...")
        return Get_post_base.post(self, request, Gth_ModalidadLaboralSerializer)

class Get_delete_update_gthmodalidadlaboral(Get_delete_update_base):
    serializer_class = Gth_ModalidadLaboralSerializer

    # Get all gthmodalidadlaboral
    def get(self, request, pk):
        print("Consultando gthmodalidadlaboral...")
        return Get_delete_update_base.get(self, request, pk,GthModalidadLaboral,Gth_ModalidadLaboralSerializer)

    # Update a gthmodalidadlaboral
    def put(self, request, pk):
        
        print("Actualizando gthmodalidadlaboral...")
        return Get_delete_update_base.put(self, request, pk,GthModalidadLaboral,Gth_ModalidadLaboralSerializer)


# Gth_RegimenLaboral
class GthRegimenLaboralViewSet(CommonFilterViewSet):
    __basic_fields = ['descripcion',]
    serializer_class = Gth_RegimenLaboralSerializer_list
    queryset = GthRegimenLaboral.objects.all().filter(eliminado='f').order_by('-descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_gthregimenlaboral(Get_post_base):
    serializer_class = Gth_RegimenLaboralSerializer
    # Get all gthregimenlaboral
    def get(self, request):
        print("Getting gthregimenlaboral...")
        return Get_post_base.get(self, request, GthRegimenLaboral)

    def post(self, request):
        print("Getting gthregimenlaboral...")
        return Get_post_base.post(self, request, Gth_RegimenLaboralSerializer)

class Get_delete_update_gthregimenlaboral(Get_delete_update_base):
    serializer_class = Gth_RegimenLaboralSerializer

    # Get all gthregimenlaboral
    def get(self, request, pk):
        print("Consultando gthregimenlaboral...")
        return Get_delete_update_base.get(self, request, pk,GthRegimenLaboral,Gth_RegimenLaboralSerializer)

    # Update a gthregimenlaboral
    def put(self, request, pk):
        
        print("Actualizando gthregimenlaboral...")
        return Get_delete_update_base.put(self, request, pk,GthRegimenLaboral,Gth_RegimenLaboralSerializer)

# Gth_RoLaboral
class GthRolLaboralViewSet(CommonFilterViewSet):
    __basic_fields = ['descripcion',]
    serializer_class = Gth_RolLaboralSerializer_list
    queryset = GthRolLaboral.objects.all().filter(eliminado='f').order_by('-descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_gthrollaboral(Get_post_base):
    serializer_class = Gth_RolLaboralSerializer
    # Get all gthrolaboral
    def get(self, request):
        print("Getting gthrollaboral...")
        return Get_post_base.get(self, request, GthRolLaboral)

    def post(self, request):
        print("Getting gthrollaboral...")
        return Get_post_base.post(self, request, Gth_RolLaboralSerializer)

class Get_delete_update_gthrollaboral(Get_delete_update_base):
    serializer_class = Gth_RolLaboralSerializer

    # Get all gthrolaboral
    def get(self, request, pk):
        print("Consultando gthrollaboral...")
        return Get_delete_update_base.get(self, request, pk,GthRolLaboral,Gth_RolLaboralSerializer)

    # Update a gthrollaboral
    def put(self, request, pk):
        
        print("Actualizando gthrollaboral...")
        return Get_delete_update_base.put(self, request, pk,GthRolLaboral,Gth_RolLaboralSerializer)

# Gth_Sanciones
class GthSancionesViewSet(CommonFilterViewSet):
    __basic_fields = ['descripcion','tipo_id',]
    serializer_class = Gth_SancionesSerializer_list
    queryset = GthSanciones.objects.all().filter(eliminado='f').order_by('-descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_gthsanciones(Get_post_base):
    serializer_class = Gth_SancionesSerializer
    # Get all gthsanciones
    def get(self, request):
        print("Getting gthsanciones...")
        return Get_post_base.get(self, request, GthSanciones)

    def post(self, request):
        print("Getting gthsanciones...")
        return Get_post_base.post(self, request, Gth_SancionesSerializer)

class Get_delete_update_gthsanciones(Get_delete_update_base):
    serializer_class = Gth_SancionesSerializer

    # Get all gthsanciones
    def get(self, request, pk):
        print("Consultando gthsanciones...")
        return Get_delete_update_base.get(self, request, pk,GthSanciones,Gth_SancionesSerializer)

    # Update a gthsanciones
    def put(self, request, pk):
        
        print("Actualizando gthsanciones...")
        return Get_delete_update_base.put(self, request, pk,GthSanciones,Gth_SancionesSerializer)

# Gth_AccionpersonalSerializer
class GthAccionPersonalViewSet(CommonFilterViewSet):
    __basic_fields = ['descripcion','accion_id','tipo',]
    serializer_class = Gth_AccionPersonalSerializer_list
    queryset = GthAccionpersonal.objects.all().filter(eliminado='f').order_by('-descripcion')
    filter_fields = __basic_fields
    search_fields = __basic_fields
    ordering_fields = __basic_fields
    pagination_class = LargePagination

class Get_post_gthaccionpersonal(Get_post_base):
    serializer_class = Gth_AccionpersonalSerializer
    # Get all gthaccionpersonal
    def get(self, request):
        print("Getting gthcargofuncional...")
        return Get_post_base.get(self, request, GthAccionpersonal)

    def post(self, request):
    	return Get_post_base.post(self, request, Gth_AccionpersonalSerializer)

class Get_delete_update_gthaccionpersonal(Get_delete_update_base):
    serializer_class = Gth_AccionpersonalSerializer

    # Get all gthaccionpersonal
    def get(self, request, pk):
        print("Consultando gthaccionpersonal...")
        return Get_delete_update_base.get(self, request, pk,GthAccionpersonal,Gth_AccionpersonalSerializer)

    # Update a gthaccionpersonal
    def put(self, request, pk):
        
        print("Actualizando gthaccionpersonal...")
        return Get_delete_update_base.put(self, request, pk,GthAccionpersonal,Gth_AccionpersonalSerializer)







