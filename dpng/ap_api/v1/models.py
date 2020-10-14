from django.db import models
from ap_base.models import GeoIsla


class DjangoCommonFields(models.Model):
    id = models.UUIDField(primary_key=True)
    eliminado = models.BooleanField(blank=True, null=True)
    usuario_ingreso = models.TextField(blank=True, null=True)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column='isla_usuario_ingreso_id')
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True,null=True)
    estado = models.CharField(max_length=1)

    class Meta:
        managed = False
        db_table = 'django.django_common_fields'


