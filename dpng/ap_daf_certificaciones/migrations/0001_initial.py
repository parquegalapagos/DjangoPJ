# Generated by Django 2.2.4 on 2020-06-02 23:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import simple_history.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ap_talentohumano', '0001_initial'),
        ('ap_base', '0002_sissecuencia_prefijo'),
    ]

    operations = [
        migrations.CreateModel(
            name='DafCertificaciones',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('secuencia', models.CharField(blank=True, max_length=50, null=True)),
                ('tipo', models.CharField(choices=[('B', 'BIEN(BODEGA)'), ('C', 'CONSULTORIA'), ('O', 'OBRA CIVIL'), ('S', 'SERVICIO')], max_length=2, null=True)),
                ('tipo_revision', models.CharField(choices=[('M', 'MANTENIMIENTO'), ('O', 'OBRA CIVIL'), ('T', 'TIC')], max_length=2, null=True)),
                ('titulo', models.CharField(max_length=200)),
                ('descripcion', models.TextField(blank=True, null=True)),
                ('monto', models.FloatField(blank=True, null=True)),
                ('fecha_solicitud', models.DateField(blank=True, null=True)),
                ('archivos', models.TextField(blank=True, null=True)),
                ('archivos_proformas', models.TextField(blank=True, null=True)),
                ('archivos_otros', models.TextField(blank=True, null=True)),
                ('archivos_certificacion', models.TextField(blank=True, null=True)),
                ('doc_tic', models.TextField(blank=True, null=True)),
                ('doc_mantenimiento', models.TextField(blank=True, null=True)),
                ('doc_obracivil', models.TextField(blank=True, null=True)),
                ('obs_solicitante', models.TextField(blank=True, null=True)),
                ('catalogo_elect', models.BooleanField(help_text='Existe bien o Servicio en catalogo Electronico', null=True)),
                ('aprobar_dirarea', models.BooleanField(null=True)),
                ('aprobar_tic', models.BooleanField(null=True)),
                ('aprobar_mantenimiento', models.BooleanField(null=True)),
                ('aprobar_obracivil', models.BooleanField(null=True)),
                ('aprobar_bodega', models.BooleanField(null=True)),
                ('aprobar_compraspub', models.BooleanField(null=True)),
                ('aprobar_respac', models.BooleanField(null=True)),
                ('aprobar_planificacion', models.BooleanField(null=True)),
                ('aprobar_presupuesto', models.BooleanField(null=True)),
                ('estado_tramite', models.CharField(choices=[('B', 'BORRADOR'), ('T', 'EN TRAMITE'), ('A', 'APROBADO'), ('D', 'DEVUELTO'), ('C', 'CANCELADO'), ('F', 'FINALIZADO'), ('R', 'REASIGNADO')], max_length=20, null=True)),
                ('usuario_ingreso', models.TextField()),
                ('fecha_ingreso', models.DateTimeField(auto_now_add=True)),
                ('usuario_ultima_modificacion', models.TextField(blank=True, null=True)),
                ('fecha_ultima_modificacion', models.DateTimeField(auto_now=True, null=True)),
                ('estado', models.CharField(max_length=1)),
                ('eliminado', models.BooleanField(blank=True, null=True)),
                ('observaciones', models.TextField(blank=True, null=True)),
                ('observaciones_dba', models.TextField(blank=True, null=True)),
                ('func_dirarea_id', models.ForeignKey(blank=True, db_column='func_dirarea_id', null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='func_dirarea_id', to='ap_talentohumano.PerFuncionario')),
                ('func_reasignado_id', models.ForeignKey(blank=True, db_column='func_reasignado_id', null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='func_reasignado_id', to='ap_talentohumano.PerFuncionario')),
                ('func_solicitante_id', models.ForeignKey(blank=True, db_column='func_solicitante_id', null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='func_solicitante_id', to='ap_talentohumano.PerFuncionario')),
                ('isla_usuario_ingreso_id', models.ForeignKey(blank=True, db_column='isla_usuario_ingreso_id', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='ap_base.GeoIsla')),
            ],
            options={
                'db_table': '"master"."daf_certificaciones"',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='HistoricalDafCertificacionesDetalles',
            fields=[
                ('id', models.UUIDField(db_index=True)),
                ('fecha_observacion', models.DateField(blank=True, null=True)),
                ('observacion', models.TextField(blank=True, null=True)),
                ('estado_tramite', models.CharField(choices=[('B', 'BORRADOR'), ('T', 'EN TRAMITE'), ('A', 'APROBADO'), ('D', 'DEVUELTO'), ('C', 'CANCELADO'), ('R', 'REASIGNADO'), ('F', 'FINALIZADO')], max_length=20, null=True)),
                ('usuario_ingreso', models.TextField()),
                ('fecha_ingreso', models.DateTimeField(blank=True, editable=False)),
                ('usuario_ultima_modificacion', models.TextField(blank=True, null=True)),
                ('fecha_ultima_modificacion', models.DateTimeField(blank=True, editable=False, null=True)),
                ('estado', models.CharField(max_length=1)),
                ('eliminado', models.BooleanField(blank=True, null=True)),
                ('observaciones', models.TextField(blank=True, null=True)),
                ('observaciones_dba', models.TextField(blank=True, null=True)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('daf_certificaciones_id', models.ForeignKey(blank=True, db_column='daf_certificaciones_id', db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='ap_daf_certificaciones.DafCertificaciones')),
                ('funcionario_id', models.ForeignKey(blank=True, db_column='funcionario_id', db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='ap_talentohumano.PerFuncionario')),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('isla_usuario_ingreso_id', models.ForeignKey(blank=True, db_column='isla_usuario_ingreso_id', db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='ap_base.GeoIsla')),
            ],
            options={
                'verbose_name': 'historical daf certificaciones detalles',
                'db_table': '"audit"."daf_certificaciones_detalles"',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalDafCertificaciones',
            fields=[
                ('id', models.UUIDField(db_index=True)),
                ('secuencia', models.CharField(blank=True, max_length=50, null=True)),
                ('tipo', models.CharField(choices=[('B', 'BIEN(BODEGA)'), ('C', 'CONSULTORIA'), ('O', 'OBRA CIVIL'), ('S', 'SERVICIO')], max_length=2, null=True)),
                ('tipo_revision', models.CharField(choices=[('M', 'MANTENIMIENTO'), ('O', 'OBRA CIVIL'), ('T', 'TIC')], max_length=2, null=True)),
                ('titulo', models.CharField(max_length=200)),
                ('descripcion', models.TextField(blank=True, null=True)),
                ('monto', models.FloatField(blank=True, null=True)),
                ('fecha_solicitud', models.DateField(blank=True, null=True)),
                ('archivos', models.TextField(blank=True, null=True)),
                ('archivos_proformas', models.TextField(blank=True, null=True)),
                ('archivos_otros', models.TextField(blank=True, null=True)),
                ('archivos_certificacion', models.TextField(blank=True, null=True)),
                ('doc_tic', models.TextField(blank=True, null=True)),
                ('doc_mantenimiento', models.TextField(blank=True, null=True)),
                ('doc_obracivil', models.TextField(blank=True, null=True)),
                ('obs_solicitante', models.TextField(blank=True, null=True)),
                ('catalogo_elect', models.BooleanField(help_text='Existe bien o Servicio en catalogo Electronico', null=True)),
                ('aprobar_dirarea', models.BooleanField(null=True)),
                ('aprobar_tic', models.BooleanField(null=True)),
                ('aprobar_mantenimiento', models.BooleanField(null=True)),
                ('aprobar_obracivil', models.BooleanField(null=True)),
                ('aprobar_bodega', models.BooleanField(null=True)),
                ('aprobar_compraspub', models.BooleanField(null=True)),
                ('aprobar_respac', models.BooleanField(null=True)),
                ('aprobar_planificacion', models.BooleanField(null=True)),
                ('aprobar_presupuesto', models.BooleanField(null=True)),
                ('estado_tramite', models.CharField(choices=[('B', 'BORRADOR'), ('T', 'EN TRAMITE'), ('A', 'APROBADO'), ('D', 'DEVUELTO'), ('C', 'CANCELADO'), ('F', 'FINALIZADO'), ('R', 'REASIGNADO')], max_length=20, null=True)),
                ('usuario_ingreso', models.TextField()),
                ('fecha_ingreso', models.DateTimeField(blank=True, editable=False)),
                ('usuario_ultima_modificacion', models.TextField(blank=True, null=True)),
                ('fecha_ultima_modificacion', models.DateTimeField(blank=True, editable=False, null=True)),
                ('estado', models.CharField(max_length=1)),
                ('eliminado', models.BooleanField(blank=True, null=True)),
                ('observaciones', models.TextField(blank=True, null=True)),
                ('observaciones_dba', models.TextField(blank=True, null=True)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('func_dirarea_id', models.ForeignKey(blank=True, db_column='func_dirarea_id', db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='ap_talentohumano.PerFuncionario')),
                ('func_reasignado_id', models.ForeignKey(blank=True, db_column='func_reasignado_id', db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='ap_talentohumano.PerFuncionario')),
                ('func_solicitante_id', models.ForeignKey(blank=True, db_column='func_solicitante_id', db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='ap_talentohumano.PerFuncionario')),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('isla_usuario_ingreso_id', models.ForeignKey(blank=True, db_column='isla_usuario_ingreso_id', db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='ap_base.GeoIsla')),
            ],
            options={
                'verbose_name': 'historical daf certificaciones',
                'db_table': '"audit"."daf_certificaciones"',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='DafCertificacionesDetalles',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('fecha_observacion', models.DateField(blank=True, null=True)),
                ('observacion', models.TextField(blank=True, null=True)),
                ('estado_tramite', models.CharField(choices=[('B', 'BORRADOR'), ('T', 'EN TRAMITE'), ('A', 'APROBADO'), ('D', 'DEVUELTO'), ('C', 'CANCELADO'), ('R', 'REASIGNADO'), ('F', 'FINALIZADO')], max_length=20, null=True)),
                ('usuario_ingreso', models.TextField()),
                ('fecha_ingreso', models.DateTimeField(auto_now_add=True)),
                ('usuario_ultima_modificacion', models.TextField(blank=True, null=True)),
                ('fecha_ultima_modificacion', models.DateTimeField(auto_now=True, null=True)),
                ('estado', models.CharField(max_length=1)),
                ('eliminado', models.BooleanField(blank=True, null=True)),
                ('observaciones', models.TextField(blank=True, null=True)),
                ('observaciones_dba', models.TextField(blank=True, null=True)),
                ('daf_certificaciones_id', models.ForeignKey(blank=True, db_column='daf_certificaciones_id', null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='daf_certificaciones_id', to='ap_daf_certificaciones.DafCertificaciones')),
                ('funcionario_id', models.ForeignKey(blank=True, db_column='funcionario_id', null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='daf_cert_det_funcionario_id', to='ap_talentohumano.PerFuncionario')),
                ('isla_usuario_ingreso_id', models.ForeignKey(blank=True, db_column='isla_usuario_ingreso_id', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='ap_base.GeoIsla')),
            ],
            options={
                'db_table': '"master"."daf_certificaciones_detalles"',
                'ordering': ['-fecha_ingreso'],
                'managed': True,
            },
        ),
    ]