# Generated by Django 2.2.4 on 2020-10-07 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ap_serv_ambientales', '0003_auto_20201007_1005'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bsainformecampo',
            name='sitio_id',
            field=models.TextField(blank=True, null=True),
        ),
    ]