# DJANGO
from django.urls import path, re_path
from django.conf.urls import include, url
from django.contrib import admin

# VIEWS
from . import views


#STATIC
from django.conf import settings
from django.conf.urls.static import static

from django.views import generic



urlpatterns = [
    path('menu_cuso_controlmarino', views.menu_cuso_controlmarino, name='menu_cuso_controlmarino'),
    path('acta_visita_cuso', views.Cuso_acta_avistamineto, name='acta_visita_cuso'),
    path('get_lista_numlicencia', views.get_lista_numlicencia, name='get_lista_numlicencia'),

  
]
