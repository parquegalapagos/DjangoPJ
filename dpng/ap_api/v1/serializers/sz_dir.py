# DJANGO
#from django.contrib.auth.models import User
#import uuid

# REST
#from rest_framework import serializers

# Local
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer
from ap_talentohumano.models import DirClasificacionProceso
from ap_base.models import DirDepartment

# Dir_Department
class Dir_DepartmentSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = DirDepartment
        fields = ['id','name','siglas','parentid']

class Dir_DepartmentSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = DirDepartment
        fields = ['id','name','parentid','tipo']

class Dir_DepartmentSerializer_label(CommonFieldsSerializer):

    class Meta:
        model = DirDepartment
        fields = ['id','name']

# Dir_ClasificacionProceso
class Dir_ClasificacionProcesoSerializer_short(CommonFieldsSerializer):

    class Meta:
        model = DirClasificacionProceso
        fields = ['id','nombre']

class Dir_ClasificacionProcesoSerializer_list(CommonFieldsSerializer):

    class Meta:
        model = DirClasificacionProceso
        fields = ['id','nombre']
  
        

    

