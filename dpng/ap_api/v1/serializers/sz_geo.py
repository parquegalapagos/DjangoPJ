# DJANGO
from django.contrib.auth.models import User
import uuid

# REST
from rest_framework import serializers

# Local
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer
from ap_base.models import *


# GeoPais
class Geo_PaisSerializer(CommonFieldsSerializer):
    
    class Meta:
        model = GeoPais
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GeoPais)
        return item


    def update(self, instance, validated_data):
        # Campos GeoPais
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.continente = validated_data.get('continente', instance.continente)
        instance.iso_2 = validated_data.get('iso_2', instance.iso_2)
        instance.iso_3 = validated_data.get('iso_3', instance.iso_3)
        instance.iso_numeric = validated_data.get('iso_numeric', instance.iso_numeric)
        instance.fips = validated_data.get('fips', instance.fips)
        instance.capital = validated_data.get('descripcion', instance.descripcion)
        instance.id_text = validated_data.get('descripcion', instance.descripcion)
        instance.nacionalidad = validated_data.get('descripcion', instance.descripcion)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item



# GeoProvincia
class Geo_ProvinciaSerializer(CommonFieldsSerializer):

    class Meta:
        model = GeoProvincia
        fields = '__all__'
        #fields = ['descripcion']

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GeoProvincia)
        return item
    
    def update(self, instance, validated_data):
        # Campos GeoProvincia
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.pais_text_id = validated_data.get('pais_text_id', instance.pais_text_id)
        instance.pais_id = validated_data.get('pais_id', instance.pais_id)
        instance.cod_inec_provincia = validated_data.get('cod_inec_provincia', instance.cod_inec_provincia)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Geo_ProvinciaSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = GeoProvincia
        fields = ['id','descripcion','pais']


class Geo_ProvinciaSerializer_label(CommonFieldsSerializer):

    class Meta:
        model = GeoProvincia
        fields = ['id','descripcion']


# GeoCiudad
class Geo_CiudadSerializer(CommonFieldsSerializer):

    class Meta:
        model = GeoCiudad
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GeoCiudad)
        return item

    def update(self, instance, validated_data):
        # Campos GeoCiudad
        instance.pais = validated_data.get('pais', instance.pais)
        instance.provincia = validated_data.get('provincia', instance.provincia)
        instance.ciudad = validated_data.get('ciudad', instance.ciudad)
        instance.provincia_id = validated_data.get('provincia_id', instance.provincia_id)
        instance.pais_id = validated_data.get('pais_id', instance.pais_id)


        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item


# GeoIsla
class Geo_IslaSerializer(CommonFieldsSerializer):
    tipo_isla = serializers.CharField(required=False)
    class Meta:
        model = GeoIsla
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GeoIsla)
        return item

    def update(self, instance, validated_data):
        # Campos GeoIsla

        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.tipo_isla = validated_data.get('tipo_isla', instance.tipo_isla)
        instance.clasificacion = validated_data.get('clasificacion', instance.clasificacion)
        instance.superficie_km = validated_data.get('superficie_km', instance.superficie_km)
        instance.superficie_ha = validated_data.get('superficie_ha', instance.superficie_ha)
        instance.latitud = validated_data.get('latitud', instance.latitud)
        instance.longitud = validated_data.get('longitud', instance.longitud)
        instance.es_poblada = validated_data.get('es_poblada', instance.es_poblada)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.canton_id = validated_data.get('canton_id', instance.canton_id)


        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Geo_IslaSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = GeoIsla
        fields = ['id','descripcion','canton_id','es_poblada']

class Geo_IslaSerializer_label(CommonFieldsSerializer):

    class Meta:
        model = GeoIsla
        fields = ['id','descripcion']

# GeoCanton
class Geo_CantonSerializer(CommonFieldsSerializer):
    class Meta:
        model = GeoCanton
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GeoIsla)
        return item

    def update(self, instance, validated_data):
        # Campos GeoIsla

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Geo_CantonSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = GeoCanton
        fields = ['id','nombre','provincia_id','ciudad_id']

class Geo_CantonSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = GeoCanton
        fields = '__all__'

# GeoParroquia
class Geo_ParroquiaSerializer(CommonFieldsSerializer):
    class Meta:
        model = GeoIsla
        fields = '__all__'

    def create(self, validated_data):

        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GeoIsla)
        return item

    def update(self, instance, validated_data):
        # Campos GeoIsla

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Geo_ParroquiaSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = GeoParroquia
        fields = ['id','nombre','canton_id']

# GeoSitio
class Geo_SitioSerializer(CommonFieldsSerializer):

    class Meta:
        model = GeoSitio
        fields = '__all__'

    def create(self, validated_data):
        #CREACION
        item = CommonFieldsSerializer.create(self, validated_data, GeoSitio)
        return item

    def update(self, instance, validated_data):
        # Campos GthCargoFuncional
        instance.modulo = validated_data.get('modulo', instance.modulo)
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)

        # Actualización
        item = CommonFieldsSerializer.update(self, instance, validated_data)
        item.save()
        return item

class Geo_SitioSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = GeoSitio
        fields = '__all__'

class Geo_SitioSerializer_short(CommonFieldsSerializer):
    isla_id  = Geo_IslaSerializer_label()

    class Meta:
        model = GeoSitio
        fields = ['id','descripcion','modulo','isla_id']

class Geo_SitioSerializer_shortMod(CommonFieldsSerializer):

    class Meta:
        model = GeoSitio
        fields = ['id','descripcion','modulo']