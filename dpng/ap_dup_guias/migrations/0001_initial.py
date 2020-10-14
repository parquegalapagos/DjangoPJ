# Generated by Django 2.2.4 on 2020-08-28 03:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='LicGuia',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('estado', models.CharField(max_length=1)),
                ('usuario_ingreso', models.TextField()),
                ('fecha_ingreso', models.DateTimeField()),
                ('usuario_ultima_modificacion', models.TextField(blank=True, null=True)),
                ('fecha_ultima_modificacion', models.DateTimeField(blank=True, null=True)),
                ('fecha_recepcion', models.DateField(blank=True, null=True)),
                ('fecha_emision', models.DateField(blank=True, null=True)),
                ('fecha_caducidad', models.DateField(blank=True, null=True)),
                ('fecha_retiro', models.DateField(blank=True, null=True)),
                ('isla_usuario_ingreso_id', models.UUIDField(blank=True, null=True)),
                ('asociacion_id', models.UUIDField(blank=True, null=True)),
                ('eliminado', models.BooleanField(blank=True, null=True)),
                ('num_licencia', models.TextField(blank=True, null=True)),
                ('num_licencia_cod', models.TextField(blank=True, null=True)),
                ('migrar', models.BooleanField()),
                ('prev_estado_carnet', models.TextField(blank=True, null=True)),
                ('prev_asociacion_guia', models.TextField(blank=True, null=True)),
                ('prev_categoria_guia', models.TextField(blank=True, null=True)),
                ('prev_especializacion_guia', models.TextField(blank=True, null=True)),
                ('prev_guia_id', models.IntegerField(blank=True, null=True)),
                ('prev_id', models.IntegerField(blank=True, null=True)),
                ('data_qr', models.TextField(blank=True, null=True)),
                ('observaciones0', models.TextField(blank=True, null=True)),
                ('observaciones1', models.TextField(blank=True, null=True)),
                ('motivo_inactividad', models.TextField(blank=True, null=True)),
                ('tipo_tramite', models.TextField(blank=True, null=True)),
                ('f_capacitacion', models.TextField(blank=True, null=True)),
                ('f_competencias_laborales', models.TextField(blank=True, null=True)),
                ('f_aventura_habilidades', models.TextField(blank=True, null=True)),
                ('f_actualizacion', models.TextField(blank=True, null=True)),
                ('aventura_modalidad', models.TextField(blank=True, null=True)),
                ('f_idioma_ingles_b1', models.TextField(blank=True, null=True)),
                ('f_idioma_ingles_b2', models.TextField(blank=True, null=True)),
                ('f_idioma_otros_b1', models.TextField(blank=True, null=True)),
                ('f_idioma_otros', models.TextField(blank=True, null=True)),
                ('f_doc_perdida_sustraccion', models.TextField(blank=True, null=True)),
                ('f_credencial_deterioro', models.TextField(blank=True, null=True)),
                ('sis7_id', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': '"master"."lic_guia"',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='LicGuiaCategoria',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('estado', models.CharField(max_length=1)),
                ('usuario_ingreso', models.TextField()),
                ('fecha_ingreso', models.DateTimeField()),
                ('usuario_ultima_modificacion', models.TextField(blank=True, null=True)),
                ('fecha_ultima_modificacion', models.DateTimeField(blank=True, null=True)),
                ('nombre', models.TextField(blank=True, null=True)),
                ('isla_usuario_ingreso_id', models.UUIDField(blank=True, null=True)),
                ('eliminado', models.BooleanField(blank=True, null=True)),
                ('observacion', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': '"master"."lic_guia_categoria"',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='LicGuiaEspecializacion',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('estado', models.CharField(max_length=1)),
                ('usuario_ingreso', models.TextField()),
                ('fecha_ingreso', models.DateTimeField()),
                ('usuario_ultima_modificacion', models.TextField(blank=True, null=True)),
                ('fecha_ultima_modificacion', models.DateTimeField(blank=True, null=True)),
                ('nombre', models.TextField(blank=True, null=True)),
                ('isla_usuario_ingreso_id', models.UUIDField(blank=True, null=True)),
                ('eliminado', models.BooleanField(blank=True, null=True)),
                ('observacion', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': '"master"."lic_guia_especializacion"',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='LicGuiaEstadoCarnet',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('estado', models.CharField(max_length=1)),
                ('usuario_ingreso', models.TextField()),
                ('fecha_ingreso', models.DateTimeField()),
                ('usuario_ultima_modificacion', models.TextField(blank=True, null=True)),
                ('fecha_ultima_modificacion', models.DateTimeField(blank=True, null=True)),
                ('nombre', models.TextField(blank=True, null=True)),
                ('isla_usuario_ingreso_id', models.UUIDField(blank=True, null=True)),
                ('eliminado', models.BooleanField(blank=True, null=True)),
            ],
            options={
                'db_table': '"master"."lic_guia_estado_carnet"',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='PerGuia',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('estado', models.CharField(max_length=1)),
                ('usuario_ingreso', models.TextField()),
                ('fecha_ingreso', models.DateTimeField()),
                ('usuario_ultima_modificacion', models.TextField(blank=True, null=True)),
                ('fecha_ultima_modificacion', models.DateTimeField(blank=True, null=True)),
                ('usuario', models.TextField(blank=True, null=True)),
                ('clave', models.TextField(blank=True, null=True)),
                ('fecha_inicio_guia', models.DateField(blank=True, null=True)),
                ('isla_usuario_ingreso_id', models.UUIDField(blank=True, null=True)),
                ('eliminado', models.BooleanField(blank=True, null=True)),
                ('migrar', models.BooleanField()),
                ('prev_id', models.IntegerField(blank=True, null=True)),
                ('pagos_pendientes', models.IntegerField(blank=True, null=True)),
                ('registro_forestal', models.CharField(blank=True, max_length=50, null=True)),
                ('observaciones_dba', models.TextField(blank=True, null=True)),
                ('observaciones0', models.TextField(blank=True, null=True)),
                ('observaciones1', models.TextField(blank=True, null=True)),
                ('modalidad_trabajo', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': '"master"."per_guia"',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='PerGuiaInactividad',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('estado', models.CharField(max_length=1)),
                ('usuario_ingreso', models.TextField()),
                ('fecha_ingreso', models.DateTimeField()),
                ('usuario_ultima_modificacion', models.TextField(blank=True, null=True)),
                ('fecha_ultima_modificacion', models.DateTimeField(blank=True, null=True)),
                ('naturaleza', models.TextField(blank=True, null=True)),
                ('isla_usuario_ingreso_id', models.UUIDField(blank=True, null=True)),
                ('eliminado', models.BooleanField(blank=True, null=True)),
                ('observacion', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': '"master"."per_guia_inactividad"',
                'managed': False,
            },
        ),
    ]