# DJANGO
from django.urls import path, re_path
from django.conf.urls import include, url
from django.contrib import admin
from django.urls import reverse_lazy
from django.contrib.auth.views import PasswordResetView
from django.contrib.auth import views as auth_views


# VIEWS
from . import views
from ap_especiesnativas import views as views_espnativas
from ap_talentohumano import views as viewsalentohumano
from ap_soportetic import views as viewsoportetic
from ap_adminsys import views as viewsysadmin
from ap_serv_ambientales import views as viewbsa
from ap_daf_certificaciones import views as views_daf_certificaciones
from ap_cuem_manejopesquero import views as views_cuem_manejopesquero
from ap_cuso_controlmarino import views as views_cuso_controlmarino
from ap_cuso_controlinsular import views as views_cuso_controlinsular

from ap_especiesintroducidas import views as views_espintroducidas
from ap_usuarioexterno import views as viewsregistro
from django.contrib.auth import views as auth_views

#STATIC
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', views.index, name='index'),

    path('admin/', admin.site.urls),
    path('login', views.autenticar, name='login'),
    path('logout', views._logout, name='logout'),
    #path('accounts/login/', auth_views.LoginView.as_view()),
    path('accounts/login/', views.error_500_view),
    
    path('password_reset', views.password_reset, name="password_reset"),
    path('olvido', views.password_reset_email, name="password_reset_email"),
    
    url(r'^password_reset_confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', views.password_reset_confirm, name='password_reset_confirm'),
    
    url(r'^password_reset_confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/cambiar_password', views.cambiar_password, name='cambiar_password'),
    path('password_reset_done', views.password_reset_done, name="password_reset_done"),

    
    path('home', views.home, name='home'),
    path('app', views.app, name='app'),
    path('menu_talentohumano', viewsalentohumano.menu_talentohumano, name='menu_talentohumano'),
    path('menu_espnativas', views_espnativas.menu_espnativas, name='menu_espnativas'),
    path('menu_opsistema', viewsysadmin.menu_opsistema, name='menu_opsistema'),
    path('menu_dafcertificaciones', views_daf_certificaciones.menu_dafcertificaciones, name='menu_dafcertificaciones'),
    path('menu_soportetic', viewsoportetic.menu_soportetic, name='menu_soportetic'),
    path('menu_bsa', viewbsa.menu_bsa, name='menu_bsa'),
    path('menu_cuemManejopesquero', views_cuem_manejopesquero.menu_cuemManejopesquero, name='menu_cuemManejopesquero'),
    path('menu_cuso_controlmarino', views_cuso_controlmarino.menu_cuso_controlmarino, name='menu_cuso_controlmarino'),
    path('menu_cuso_controlinsular', views_cuso_controlinsular.menu_cuso_controlinsular, name='menu_cuso_controlinsular'),
    path('registrarse', viewsregistro.registrarse, name='registrarse'),
    path('menu_espintro', views_espintroducidas.menu_espintro, name='menu_espintro'),
    
    path('insert_General', views.insert_General, name='insert_General'),
    path('update_General', views.update_General, name='update_General'),
    path('delete_General', views.delete_General, name='delete_General'),
    path('upload_files', views.upload_files, name='upload_files'),
    
    path('upload_image', views.upload_image, name='upload_image'),
    path('change_password', views.change_password, name='change_password'),

    url(r'^jet/', include('jet.urls', 'jet')),  # Django JET URLS
    url(r'^jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),  # Django JET dashboard URLS

    url(r'session_security/', include('session_security.urls')),
   
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 