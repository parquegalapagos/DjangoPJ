import uuid

# DJANGO
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import Group

from ap_base.models import *
from ap_base.models import PerPersona


# Create your models here.
class PerPersonaAuth(models.Model):
    user = models.OneToOneField(User, related_name="user_persona_id", on_delete=models.CASCADE, db_column="user_id")
    persona_id = models.ForeignKey(PerPersona, models.DO_NOTHING, blank=True, null=True,db_column="persona_id", related_name="auth_personaid")

    def __str__(self):
        return self.user.username

    class Meta:
        managed = True

        db_table = u'"master\".\"per_persona_auth"'



class TrmTramites(models.Model):
    ESTADO_TRAMITE = (
        ("B","BORRADOR"),
        ("T","EN TRAMITE"),
        ("A","APROBADO PARA IMPRIMIR"),
        ("I","IMPRESO"),
        ("D","DEVUELTO"),
    )

    TIPO_TRAMITE = (
        ("PARMA","PARMA"),
        ("PERMISO_PESCA","PERMISO PESCA"),
    )

    id = models.CharField(primary_key=True, max_length=255)
    secuencia = models.CharField(max_length=50,blank=True, null=True)
    fecha_solicitud = models.DateField(blank=True, null=True)
    archivos = models.TextField(blank=True, null=True)

    isla_tramite = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_tramite", related_name="trm_isla_tramite")
    per_solicitante_id = models.ForeignKey(PerPersona, models.DO_NOTHING, blank=True, null=True,db_column="per_solicitante_id",related_name="per_solicitante_id")

    ap_aprobador = models.BooleanField(null=True)
    ap_revisor = models.BooleanField(null=True)
    estado_tramite = models.CharField(max_length=20,null=True, choices=ESTADO_TRAMITE)
    tipo_tramite = models.CharField(max_length=20,null=True, choices=TIPO_TRAMITE)

    observacion = models.TextField(blank=True, null=True)

    estado = models.CharField(max_length=1,null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    usuario_ingreso = models.TextField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)


    class Meta:
        managed = True

        db_table = u'"master\".\"trm_tramites"'


class TrmTramitesDetalles(models.Model):
    ESTADO_TRAMITE = (
        ("B","BORRADOR"),
        ("T","EN TRAMITE"),
        ("A","APROBADO PARA IMPRIMIR"),
        ("I","IMPRESO"),
        ("D","DEVUELTO"),
    )

    TIPO_TRAMITE = (
        ("PARMA","PARMA"),
        ("PERMISO_PESCA","PERMISO PESCA"),
    )

    id = models.CharField(primary_key=True, max_length=255)
    trm_tramites_id = models.ForeignKey(TrmTramites, models.DO_NOTHING, blank=True, null=True,db_column="trm_tramites_id",related_name="trm_tramites")
    per_persona_id = models.ForeignKey(PerPersona, models.DO_NOTHING, blank=True, null=True,db_column="per_persona_id", related_name="trm_tramite_persona_id")
    fecha_observacion = models.DateField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    estado_tramite = models.CharField(max_length=20,null=True, choices=ESTADO_TRAMITE)
    tipo_tramite = models.CharField(max_length=20,null=True, choices=TIPO_TRAMITE)

    estado = models.CharField(max_length=1,null=True)
    eliminado = models.BooleanField(blank=True, null=True)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateTimeField(auto_now=True, null=True)
    isla_usuario_ingreso_id = models.ForeignKey(GeoIsla, models.DO_NOTHING, blank=True, null=True,db_column="isla_usuario_ingreso_id")
    usuario_ingreso = models.TextField()
    usuario_ultima_modificacion = models.TextField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    observaciones_dba = models.TextField(blank=True, null=True)


    class Meta:
        managed = True

        db_table = u'"master\".\"trm_tramites_detalles"'