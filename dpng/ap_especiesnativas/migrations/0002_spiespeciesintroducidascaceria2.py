# Generated by Django 2.2.4 on 2020-10-12 14:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ap_base', '0005_sisparametrosconfig'),
        ('ap_especiesnativas', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SpiEspeciesIntroducidasCaceria2',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('pto_gps', models.TextField(blank=True, null=True)),
                ('cabra_h', models.IntegerField(blank=True, null=True)),
                ('cabra_m', models.IntegerField(blank=True, null=True)),
                ('cabra_j', models.IntegerField(blank=True, null=True)),
                ('asno_h', models.IntegerField(blank=True, null=True)),
                ('asno_m', models.IntegerField(blank=True, null=True)),
                ('asno_j', models.IntegerField(blank=True, null=True)),
                ('cerdo_h', models.IntegerField(blank=True, null=True)),
                ('cerdo_m', models.IntegerField(blank=True, null=True)),
                ('cerdo_j', models.IntegerField(blank=True, null=True)),
                ('vacuno_h', models.IntegerField(blank=True, null=True)),
                ('vacuno_m', models.IntegerField(blank=True, null=True)),
                ('vacuno_j', models.IntegerField(blank=True, null=True)),
                ('observacion', models.TextField(blank=True, null=True)),
                ('observaciones_dba', models.TextField(blank=True, null=True)),
                ('usuario_ingreso', models.TextField()),
                ('fecha_ingreso', models.DateTimeField(auto_now_add=True)),
                ('usuario_ultima_modificacion', models.TextField(blank=True, null=True)),
                ('fecha_ultima_modificacion', models.DateTimeField(auto_now=True, null=True)),
                ('estado', models.CharField(max_length=1)),
                ('eliminado', models.BooleanField(blank=True, null=True)),
                ('cab_especieintro_id', models.ForeignKey(blank=True, db_column='cab_especieintro_id', null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='det_caceria2', to='ap_especiesnativas.SpiEspeciesIntroducidas')),
                ('isla_usuario_ingreso_id', models.ForeignKey(blank=True, db_column='isla_usuario_ingreso_id', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='ap_base.GeoIsla')),
            ],
            options={
                'db_table': '"master"."spi_especies_introducidas_caceria2"',
                'managed': True,
            },
        ),
    ]
