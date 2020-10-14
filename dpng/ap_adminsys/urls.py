# DJANGO
from django.urls import path, re_path
from django.conf.urls import include, url
from django.contrib import admin

# VIEWS
from . import views


#STATIC
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('usuariosPermisos', views.usuariosPermisos, name='usuariosPermisos'),
    path('usuariosPermisos2', views.usuariosPermisos2, name='usuariosPermisos2'),
    path('cambiar_permisos', views.cambiar_permisos, name='cambiar_permisos'),
    path('activar_permisosUser', views.activar_permisosUser, name='activar_permisosUser'),
    path('add_permisosUser', views.add_permisosUser, name='add_permisosUser'),
    path('return_permisosUser', views.return_permisosUser, name='return_permisosUser'),
    path('data_grupos_users', views.data_grupos_users, name='data_grupos_users'),

]
