# Generated by Django 2.2.4 on 2020-07-06 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ap_daf_certificaciones', '0003_auto_20200616_0750'),
    ]

    operations = [
        migrations.AddField(
            model_name='dafcertificaciones',
            name='aprobar_adminfinanciero',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='historicaldafcertificaciones',
            name='aprobar_adminfinanciero',
            field=models.BooleanField(null=True),
        ),
    ]
