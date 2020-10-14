# Generated by Django 2.1.15 on 2020-07-04 21:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ap_base', '0002_sissecuencia_prefijo'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrgCompany',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('tipo', models.CharField(max_length=1)),
                ('tipo_identificacion', models.CharField(blank=True, max_length=1, null=True)),
                ('identificacion', models.CharField(blank=True, max_length=32, null=True)),
                ('nombres', models.CharField(blank=True, max_length=80, null=True)),
                ('estado', models.CharField(max_length=1)),
                ('eliminado', models.BooleanField(blank=True, null=True)),
                ('fecha_ingreso', models.DateTimeField(auto_now_add=True)),
                ('fecha_ultima_modificacion', models.DateTimeField(auto_now=True, null=True)),
                ('usuario_ingreso', models.TextField()),
                ('usuario_ultima_modificacion', models.TextField(blank=True, null=True)),
                ('observaciones', models.TextField(blank=True, null=True)),
                ('observaciones_dba', models.TextField(blank=True, null=True)),
                ('isla_usuario_ingreso_id', models.ForeignKey(blank=True, db_column='isla_usuario_ingreso_id', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='ap_base.GeoIsla')),
            ],
            options={
                'db_table': '"master"."org_company"',
                'managed': True,
            },
        ),
    ]
