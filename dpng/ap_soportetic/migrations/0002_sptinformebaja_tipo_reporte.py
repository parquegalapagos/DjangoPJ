# Generated by Django 2.2.4 on 2020-10-07 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ap_soportetic', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='sptinformebaja',
            name='tipo_reporte',
            field=models.CharField(blank=True, max_length=1, null=True),
        ),
    ]
