from __future__ import absolute_import, unicode_literals
import os
from celery import Celery, shared_task
from django.conf import settings
from celery.schedules import crontab
# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dpng.settings')

app = Celery('dpng')

# Using a string here means the worker don't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

app.conf.beat_schedule = {
	# TALENTO HUMANO
    'uath-enviar-notifications_accpersonal': {
        'task': 'pc_uath_notificacionesUath',
        'schedule': crontab(minute=42, hour='0,3,6,9,12,14,15,18,21'),
        #'schedule': 20.0,
    },
    'uath-actualizar-ingresos': {
        'task': 'pc_uath_accionpersonal',
        'schedule': 5.0,
    },
    'uath-enviar-notifications_controlPersonal': {
        'task': 'pc_uath_controlpersonal_asistencia',
        'schedule': crontab(minute=42, hour='12,16'),
    },

    

}