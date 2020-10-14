
# DJANGO
from django.contrib.auth.models import User
import uuid

# REST
from rest_framework import serializers

# Local
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer
from ap_talentohumano.models import *
from ap_especiesintroducidas.models import *
from ap_api.v1.serializers.sz_sis import Sis_CatalogoSerializer_short
from ap_api.v1.serializers.sz_geo import *
from ap_api.v1.serializers.sz_bio import *
from ap_api.v1.serializers.sz_per import *


#PatrullaDetalle    
class SpiEspeciesIntroducidasGatoSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpiEspeciesIntroducidasGato
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, SpiEspeciesIntroducidasGato)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.cab_especieintro_id = validated_data.get('cab_especieintro_id', instance.cab_especieintro_id)
        instance.num_estacion = validated_data.get('num_estacion', instance.num_estacion)
        instance.altitud = validated_data.get('altitud', instance.altitud)
        instance.codigo_gps = validated_data.get('codigo_gps', instance.codigo_gps)
        instance.codigo_punto = validated_data.get('codigo_punto', instance.codigo_punto)
        instance.trampa = validated_data.get('trampa', instance.trampa)
        instance.rifle = validated_data.get('rifle', instance.rifle)
        instance.consumido = validated_data.get('consumido', instance.consumido)
        instance.no_consumido = validated_data.get('no_consumido', instance.no_consumido)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.fecha_coloca = validated_data.get('fecha_coloca', instance.fecha_coloca)
        instance.fecha_revisa = validated_data.get('fecha_revisa', instance.fecha_revisa)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class SpiEspeciesIntroducidasGatoSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = SpiEspeciesIntroducidasGato
        fields = '__all__'

#PatrullaDetalle    
class SpiEspeciesIntroducidasAvesSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpiEspeciesIntroducidasAves
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, SpiEspeciesIntroducidasAves)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.cab_especieintro_id = validated_data.get('cab_especieintro_id', instance.cab_especieintro_id)
        instance.sitio_id = validated_data.get('sitio_id', instance.sitio_id)
        instance.codigo_gps = validated_data.get('codigo_gps', instance.codigo_gps)
        instance.codigo_punto = validated_data.get('codigo_punto', instance.codigo_punto)
        instance.eliminadas = validated_data.get('eliminadas', instance.eliminadas)
        instance.escapadas = validated_data.get('escapadas', instance.escapadas)
        instance.num_nidos = validated_data.get('num_nidos', instance.num_nidos)
        instance.num_huevos = validated_data.get('num_huevos', instance.num_huevos)
        instance.tipo_ave = validated_data.get('tipo_ave', instance.tipo_ave)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class SpiEspeciesIntroducidasAvesSerializer_list(CommonFieldsSerializer):
    sitio_id = Geo_SitioSerializer_short();
    class Meta:
        model = SpiEspeciesIntroducidasAves
        fields = '__all__'

#PatrullaDetalle    
class SpiEspeciesIntroducidasCaracolSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpiEspeciesIntroducidasCaracol
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, SpiEspeciesIntroducidasCaracol)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.cab_especieintro_id = validated_data.get('cab_especieintro_id', instance.cab_especieintro_id)
        instance.altitud = validated_data.get('altitud', instance.altitud)
        instance.codigo_gps = validated_data.get('codigo_gps', instance.codigo_gps)
        instance.codigo_punto = validated_data.get('codigo_punto', instance.codigo_punto)
        instance.adultos = validated_data.get('adultos', instance.adultos)
        instance.juveniles = validated_data.get('juveniles', instance.juveniles)
        instance.huevos = validated_data.get('huevos', instance.huevos)
        instance.muertos = validated_data.get('muertos', instance.muertos)
        instance.total = validated_data.get('total', instance.total)
        instance.limpieza_manual = validated_data.get('limpieza_manual', instance.limpieza_manual)
        instance.limpieza_mecanica = validated_data.get('limpieza_mecanica', instance.limpieza_mecanica)
        instance.contorl_quimico = validated_data.get('contorl_quimico', instance.contorl_quimico)
        instance.area = validated_data.get('area', instance.area)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class SpiEspeciesIntroducidasCaracolSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = SpiEspeciesIntroducidasCaracol
        fields = '__all__'

#PatrullaDetalle    
class SpiEspeciesIntroducidasHormigasSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpiEspeciesIntroducidasHormigas
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, SpiEspeciesIntroducidasHormigas)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.cab_especieintro_id = validated_data.get('cab_especieintro_id', instance.cab_especieintro_id)
        instance.metodo_control = validated_data.get('metodo_control', instance.metodo_control)
        instance.hormiga_was = validated_data.get('hormiga_was', instance.hormiga_was)
        instance.hormiga_phe = validated_data.get('hormiga_phe', instance.hormiga_phe)
        instance.hormiga_sol = validated_data.get('hormiga_sol', instance.hormiga_sol)
        instance.hormiga_car = validated_data.get('hormiga_car', instance.hormiga_car)
        instance.hormiga_tap = validated_data.get('hormiga_tap', instance.hormiga_tap)
        instance.hormiga_mon = validated_data.get('hormiga_mon', instance.hormiga_mon)
        instance.hormiga_end = validated_data.get('hormiga_end', instance.hormiga_end)
        instance.hormiga_end = validated_data.get('hormiga_end', instance.hormiga_end)
        instance.area = validated_data.get('area', instance.area)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class SpiEspeciesIntroducidasHormigasSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = SpiEspeciesIntroducidasHormigas
        fields = '__all__'

class SpiEspeciesIntroducidasCaceriaSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpiEspeciesIntroducidasCaceria
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, SpiEspeciesIntroducidasCaceria)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.cab_especieintro_id = validated_data.get('cab_especieintro_id', instance.cab_especieintro_id)
        instance.metodo_control = validated_data.get('metodo_control', instance.metodo_control)
        instance.cabra_h = validated_data.get('cabra_h', instance.cabra_h)
        instance.cabra_m = validated_data.get('cabra_m', instance.cabra_m)
        instance.cabra_j = validated_data.get('cabra_j', instance.cabra_j)
        instance.asno_h = validated_data.get('asno_h', instance.asno_h)
        instance.asno_m = validated_data.get('asno_m', instance.asno_m)
        instance.asno_j = validated_data.get('asno_j', instance.asno_j)
        instance.cerdo_h = validated_data.get('cerdo_h', instance.cerdo_h)
        instance.cerdo_m = validated_data.get('cerdo_m', instance.cerdo_m)
        instance.cerdo_j = validated_data.get('cerdo_j', instance.cerdo_j)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.observacion = validated_data.get('observacion', instance.observacion)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class SpiEspeciesIntroducidasCaceriaSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = SpiEspeciesIntroducidasCaceria
        fields = '__all__'

#plan Patrulla   
class SpiEspeciesIntroducidasSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpiEspeciesIntroducidas
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, SpiEspeciesIntroducidas)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.encargado_id = validated_data.get('encargado_id', instance.encargado_id)
        instance.invitado = validated_data.get('invitado', instance.invitado)
        instance.sitio_id = validated_data.get('sitio_id', instance.sitio_id)
        instance.isla_id = validated_data.get('isla_id', instance.isla_id)
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.fecha_coloca_cebo = validated_data.get('fecha_coloca_cebo', instance.fecha_coloca_cebo)
        instance.fecha_revisa_cebo = validated_data.get('fecha_revisa_cebo', instance.fecha_revisa_cebo)
        instance.total_municiones = validated_data.get('total_municiones', instance.total_municiones)
        instance.municiones_usadas = validated_data.get('municiones_usadas', instance.municiones_usadas)
        instance.metodo_control = validated_data.get('metodo_control', instance.metodo_control)
        instance.tipo_rifle = validated_data.get('tipo_rifle', instance.tipo_rifle)    
        instance.zona_barrio = validated_data.get('zona_barrio', instance.zona_barrio)    
        instance.propietario = validated_data.get('propietario', instance.propietario)
        instance.hora_inicio = validated_data.get('hora_inicio', instance.hora_inicio)     
        instance.hora_fin = validated_data.get('hora_fin', instance.hora_fin)     
        instance.horario = validated_data.get('horario', instance.horario)
        instance.track = validated_data.get('track', instance.track)
        instance.track2 = validated_data.get('track2', instance.track2)
        instance.altitud1 = validated_data.get('altitud1', instance.altitud1)
        instance.altitud2 = validated_data.get('altitud2', instance.altitud2)
        instance.especie_id = validated_data.get('especie_id', instance.especie_id)
        instance.numero_wpt = validated_data.get('numero_wpt', instance.numero_wpt)      
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.area = validated_data.get('area', instance.area)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class SpiEspeciesIntroducidasSerializer_list(CommonFieldsSerializer):
    #encargado_id = Per_FuncionarioSerializer_short()
    isla_id = Geo_IslaSerializer_short()
    sitio_id = Geo_SitioSerializer_short()
    especie_id = Bio_EspeciesSerializer_short()
    det_gatos = SpiEspeciesIntroducidasGatoSerializer_list(many=True, read_only=True)
    det_caracoles  = SpiEspeciesIntroducidasCaracolSerializer_list(many=True, read_only=True)
    det_aves  = SpiEspeciesIntroducidasAvesSerializer_list(many=True, read_only=True)
    det_hormigas  = SpiEspeciesIntroducidasHormigasSerializer_list(many=True, read_only=True)
    det_caceria  = SpiEspeciesIntroducidasCaceriaSerializer_list(many=True, read_only=True)

    class Meta:
        model = SpiEspeciesIntroducidas
        fields = '__all__'


#cabecera detalle informe campo
class SpiEspeciesIntroducidasCabDetSerializer(CommonFieldsSerializer):
    #migrar =  serializers.BooleanField(required=False)
    det_gatos = SpiEspeciesIntroducidasGatoSerializer(many=True)
    det_caracoles  = SpiEspeciesIntroducidasCaracolSerializer(many=True)
    det_aves  = SpiEspeciesIntroducidasAvesSerializer(many=True)
    det_hormigas  = SpiEspeciesIntroducidasHormigasSerializer(many=True)
    det_caceria  = SpiEspeciesIntroducidasCaceriaSerializer(many=True)

    class Meta:
        model = SpiEspeciesIntroducidas
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        #CREACION
        detalle_gatos     = validated_data.pop('det_gatos')
        detalle_caracoles = validated_data.pop('det_caracoles')
        detalle_aves      = validated_data.pop('det_aves')
        detalle_hormigas  = validated_data.pop('det_hormigas')
        detalle_caceria  = validated_data.pop('det_caceria')

        print("*******************************************create22222")
        cabecera = CommonFieldsSerializer.create(self, validated_data, SpiEspeciesIntroducidas)
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_gatos:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            print("**********SpiEspeciesIntroducidasGato")
            #print(detalle)
            SpiEspeciesIntroducidasGato.objects.create(cab_especieintro_id=cabecera, **detalle)

        print("*******************************************create")
        for detalle in detalle_caracoles:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            print("**********SpiEspeciesIntroducidasCaracol")
            #print(detalle)
            SpiEspeciesIntroducidasCaracol.objects.create(cab_especieintro_id=cabecera, **detalle) 

        for detalle in detalle_aves:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            print("**********SpiEspeciesIntroducidasAves")
            #print(detalle)
            SpiEspeciesIntroducidasAves.objects.create(cab_especieintro_id=cabecera, **detalle)  

        for detalle in detalle_hormigas:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            print("**********SpiEspeciesIntroducidasHormigas")
            #print(detalle)
            SpiEspeciesIntroducidasHormigas.objects.create(cab_especieintro_id=cabecera, **detalle)

        for detalle in detalle_caceria:
            #CAMPOS INFORMACION DEL USUARIO
            detalle['id'] = uuid.uuid4()
            detalle['usuario_ingreso'] = self.context['request'].user.username
            detalle['isla_usuario_ingreso_id'] = isla_obj
            #CommonFieldsSerializer.create_relate(self, validated_data, PerPersona,persona_id,persona)
            print("**********SpiEspeciesIntroducidasCaceria")
            #print(detalle)
            SpiEspeciesIntroducidasCaceria.objects.create(cab_especieintro_id=cabecera, **detalle)  

        return cabecera

    def update(self, instance, validated_data):
        print("--------------->>>>>>")
        print(validated_data)
        print("--------------->>>>>>IIIIIIIIIIIIIIII")
        print(instance)
        # Campos PerPersona
        
        instance.encargado_id = validated_data.get('encargado_id', instance.encargado_id)
        instance.invitado = validated_data.get('invitado', instance.invitado)
        instance.sitio_id = validated_data.get('sitio_id', instance.sitio_id)
        instance.isla_id = validated_data.get('isla_id', instance.isla_id)
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.fecha_coloca_cebo = validated_data.get('fecha_coloca_cebo', instance.fecha_coloca_cebo)
        instance.fecha_revisa_cebo = validated_data.get('fecha_revisa_cebo', instance.fecha_revisa_cebo)
        instance.total_municiones = validated_data.get('total_municiones', instance.total_municiones)
        instance.municiones_usadas = validated_data.get('municiones_usadas', instance.municiones_usadas)
        instance.metodo_control = validated_data.get('metodo_control', instance.metodo_control)
        instance.tipo_rifle = validated_data.get('tipo_rifle', instance.tipo_rifle)    
        instance.zona_barrio = validated_data.get('zona_barrio', instance.zona_barrio)    
        instance.propietario = validated_data.get('propietario', instance.propietario)
        instance.hora_inicio = validated_data.get('hora_inicio', instance.hora_inicio)     
        instance.hora_fin = validated_data.get('hora_fin', instance.hora_fin)     
        instance.horario = validated_data.get('horario', instance.horario)
        instance.track = validated_data.get('track', instance.track)
        instance.track2 = validated_data.get('track2', instance.track2)
        instance.altitud1 = validated_data.get('altitud1', instance.altitud1)
        instance.altitud2 = validated_data.get('altitud2', instance.altitud2)
        instance.especie_id = validated_data.get('especie_id', instance.especie_id)
        instance.numero_wpt = validated_data.get('numero_wpt', instance.numero_wpt)      
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.area = validated_data.get('area', instance.area)
        
        print("--------------->>>>>>2222")
        detalle_gatos     = validated_data.pop('det_gatos')
        detalle_caracoles = validated_data.pop('det_caracoles')
        detalle_aves      = validated_data.pop('det_aves')
        detalle_hormigas  = validated_data.pop('det_hormigas')
        detalle_caceria  = validated_data.pop('det_caceria')

        cabecera = CommonFieldsSerializer.update(self, instance, validated_data)
        
        #isla_id = self.context['request'].user.usuarioperfil.isla_usuario_ingreso
        isla_id = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla_id)

        for detalle in detalle_gatos:
            #CAMPOS INFORMACION DEL USUARIO
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle == "":
                id_detalle = 0

            if id_detalle != 0:
                SpiEspeciesIntroducidasGato.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)
            else:                    
                detalle['id'] = uuid.uuid4()
                SpiEspeciesIntroducidasGato.objects.filter(cab_especieintro_id=detalle['cab_especieintro_id']).create(**detalle)

        for detalle in detalle_caracoles:
            #CAMPOS INFORMACION DEL USUARIO
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle == "":
                id_detalle = 0

            if id_detalle != 0:
                SpiEspeciesIntroducidasCaracol.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)
            else:                    
                detalle['id'] = uuid.uuid4()
                SpiEspeciesIntroducidasCaracol.objects.filter(cab_especieintro_id=detalle['cab_especieintro_id']).create(**detalle)  

        for detalle in detalle_aves:
            #CAMPOS INFORMACION DEL USUARIO
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle == "":
                id_detalle = 0

            if id_detalle != 0:
                SpiEspeciesIntroducidasAves.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)
            else:                    
                detalle['id'] = uuid.uuid4()
                SpiEspeciesIntroducidasAves.objects.filter(cab_especieintro_id=detalle['cab_especieintro_id']).create(**detalle) 

        for detalle in detalle_hormigas:
            #CAMPOS INFORMACION DEL USUARIO
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle == "":
                id_detalle = 0

            if id_detalle != 0:
                SpiEspeciesIntroducidasHormigas.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)
            else:                    
                detalle['id'] = uuid.uuid4()
                SpiEspeciesIntroducidasHormigas.objects.filter(cab_especieintro_id=detalle['cab_especieintro_id']).create(**detalle) 

        for detalle in detalle_caceria:
            #CAMPOS INFORMACION DEL USUARIO
            try:  # python2 and python3
                id_detalle = detalle.pop('id')
            except:
                id_detalle = 0

            if id_detalle == "":
                id_detalle = 0

            if id_detalle != 0:
                SpiEspeciesIntroducidasCaceria.objects.filter(id=id_detalle).update(id=id_detalle, **detalle)
            else:                    
                detalle['id'] = uuid.uuid4()
                SpiEspeciesIntroducidasCaceria.objects.filter(cab_especieintro_id=detalle['cab_especieintro_id']).create(**detalle) 
        
        return cabecera


#PatrullaDetalle    
class SpiMetodosControlSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpiMetodosControl
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, SpiMetodosControl)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.metodo = validated_data.get('metodo', instance.metodo)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class SpiMetodosControlSerializer_list(CommonFieldsSerializer):
    class Meta:
        model = SpiMetodosControl
        fields = '__all__'

#PatrullaDetalle    
class SpiMetodosControlEspeciesSerializer(CommonFieldsSerializer):

    class Meta:
        model = SpiMetodosControlEspecies
        fields = '__all__'

    def create(self, validated_data):
        item = CommonFieldsSerializer.create(self, validated_data, SpiMetodosControlEspecies)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.metodo_id = validated_data.get('metodo_id', instance.metodo_id)
        instance.especie_id = validated_data.get('especie_id', instance.especie_id)
        instance.observacion = validated_data.get('observacion', instance.observacion)
        instance.estado = validated_data.get('estado', instance.estado)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item
    
class SpiMetodosControlEspeciesSerializer_list(CommonFieldsSerializer):
    metodo_id = SpiMetodosControlSerializer_list()
    especie_id = Bio_EspeciesSerializer_short()
    class Meta:
        model = SpiMetodosControlEspecies
        fields = '__all__'