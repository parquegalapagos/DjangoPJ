#DJANGO
import uuid
import json
from django.contrib.auth.models import User

#REST
from rest_framework import serializers

#DRF DYNAMIC FIELDS

#Local 
from ap_api.v1.models import DjangoCommonFields
from ap_base.models import GeoIsla
from ap_talentohumano.models import PerFuncionarioAuth


class CommonFieldsSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(format='hex_verbose',required=False)
    estado = serializers.CharField(default='A')
    usuario_ingreso = serializers.CharField(required=False)
    usuario_ultima_modificacion = serializers.CharField(required=False,allow_null=True)
    fecha_ingreso = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",required=False,allow_null=True)
    fecha_ultima_modificacion = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",required=False,allow_null=True)
    eliminado = serializers.BooleanField(default=False)
    

    class Meta:
        model = DjangoCommonFields
        fields = '__all__'
        depth = 3

    def __init__(self, *args, **kwargs):
        super(CommonFieldsSerializer, self).__init__(*args, **kwargs)

        if 'context' in kwargs:
            if 'request' in kwargs['context']:
                tabs = kwargs['context']['request'].query_params.getlist('field', [])
                print(tabs)
                if tabs:
                    #tabs = tabs.split(',')
                    included = set(tabs)
                    existing = set(self.fields.keys())

                    for other in existing - included:
                        self.fields.pop(other)
                        

    def create(self, validated_data, ObjModel):
        print("************** VALIDATE DATA **************")
        
        isla = PerFuncionarioAuth.objects.get(user=self.context['request'].user).funcionario_id.isla_trabaja_id.id
        isla_obj = GeoIsla(id=isla)

        #CAMPOS GENERALES - INFORMACION DEL USUARIO
        ###### FIELD: ID
        print(validated_data)
        try:
            if validated_data["id"]:
                print(">> id generado por el formulario")
                print(validated_data['id'])
        except:
            print(">> id generado desde el API")
            validated_data['id'] = uuid.uuid4()
            print(validated_data['id'])

        ###### FIELD: usuario_ingreso
        try:
            if validated_data["usuario_ingreso"]:
                print(">> usuario_ingreso generado por el formulario")
                print(validated_data['usuario_ingreso'])
        except:
            print(">> usuario_ingreso generado desde el API")
            validated_data['usuario_ingreso'] = self.context['request'].user.username
            
        ###### FIELD: isla_usuario_ingreso_id
        try:
            if validated_data["isla_usuario_ingreso_id"]:
                print(">> isla_usuario_ingreso_id generado por el formulario")
                print(validated_data['isla_usuario_ingreso_id'])
        except:
            print(">> isla_usuario_ingreso_id generado desde el API")
            validated_data['isla_usuario_ingreso_id'] = isla_obj


        #CREACION
        item = ObjModel.objects.create(**validated_data)
        print(item)
        
        return item

    def update(self, instance, validated_data):

        #print("-------------------22222222222222222")
        #print(validated_data)

        for attr, value in instance.__dict__.items():
            #print(attr, value)
            attr = validated_data.get(str(attr), attr)

        # Campos Comunes en todas las tablas
        instance.usuario_ultima_modificacion = self.context['request'].user.username
        instance.fecha_ultima_modificacion = validated_data.get('fecha_ultima_modificacion', instance.fecha_ultima_modificacion)
        instance.isla_usuario_ingreso_id = validated_data.get('isla_usuario_ingreso_id', instance.isla_usuario_ingreso_id)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.eliminado = validated_data.get('eliminado', instance.eliminado)
        instance.save()

        return instance



