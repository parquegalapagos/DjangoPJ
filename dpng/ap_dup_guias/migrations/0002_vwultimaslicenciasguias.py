# Generated by Django 2.2.4 on 2020-10-02 20:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ap_dup_guias', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='VwUltimaslicenciasGuias',
            fields=[
                ('id', models.UUIDField(db_column='id', primary_key=True, serialize=False)),
                ('identificacion', models.TextField(blank=True, db_column='identificacion', null=True)),
                ('nombres', models.TextField(blank=True, db_column='nombres', null=True)),
                ('apellidos', models.TextField(blank=True, db_column='apellidos', null=True)),
                ('nombre_completo', models.TextField(blank=True, db_column='nombre_completo', null=True)),
                ('num_licencia', models.TextField(blank=True, db_column='num_licencia', null=True)),
                ('especializacion', models.TextField(blank=True, db_column='especializacion', null=True)),
                ('fecha_emision', models.DateField(blank=True, db_column='fecha_emision', null=True)),
                ('fecha_caducidad', models.DateField(blank=True, db_column='fecha_caducidad', null=True)),
                ('tipo_tramite', models.TextField(blank=True, db_column='tipo_tramite', null=True)),
                ('estado', models.TextField(blank=True, db_column='estado', null=True)),
                ('eliminado', models.BooleanField(blank=True, null=True)),
            ],
            options={
                'db_table': '"master"."vw_ultimaslicencias_guias"',
                'managed': False,
            },
        ),
    ]
