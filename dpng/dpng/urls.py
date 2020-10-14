"""dpng URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import handler404,handler500
from django.conf.urls import include, url

urlpatterns = [
    #path('admin/', admin.site.urls),
    path('', include('ap_base.urls')),
    path('', include('ap_talentohumano.urls')),
    path('', include('ap_especiesnativas.urls')),
    path('', include('ap_soportetic.urls')),
    path('', include('ap_adminsys.urls')),
    path('', include('ap_daf_certificaciones.urls')),
    path('', include('ap_serv_ambientales.urls')),
    path('', include('ap_cuem_manejopesquero.urls')),
    path('', include('ap_cuso_controlmarino.urls')),
    path('', include('ap_cuso_controlinsular.urls')),
    path('', include('ap_usuarioexterno.urls')),
    path('', include('ap_dup_operacionturistica.urls')),
    path('', include('ap_dup_guias.urls')),
    
    #path('', include('ap_api.v1.urls')),
    path('', include('ap_api.v1.urls.url_auth')),
    path('', include('ap_api.v1.urls.url_daf')),
    path('', include('ap_api.v1.urls.url_geo')),
    path('', include('ap_api.v1.urls.url_gth')),
    path('', include('ap_api.v1.urls.url_org')),
    path('', include('ap_api.v1.urls.url_per')),
    path('', include('ap_api.v1.urls.url_sis')),
    path('', include('ap_api.v1.urls.url_spn')),
    path('', include('ap_api.v1.urls.url_spt')),
    path('', include('ap_api.v1.urls.url_cuem')),
    path('', include('ap_api.v1.urls.url_bsa')),
    path('', include('ap_api.v1.urls.url_lic')),
    path('', include('ap_api.v1.urls.url_pat')),
    path('', include('ap_api.v1.urls.url_tpr')),
    path('', include('ap_api.v1.urls.url_cin')),
    path('', include('ap_api.v1.urls.url_gmv')),
    path('', include('ap_api.v1.urls.url_cuso')),
    path('', include('ap_api.v1.urls.url_spi')),
    path('', include('ap_api.v1.urls.url_trm')),


    #path('admin/', admin.site.urls),
    #path('core/', include('ap_galapagos_scheduling.core.urls', namespace='core')),
    #path('sitios/', include('ap_galapagos_scheduling.sitio.urls', namespace='sitio')),
    #path('guia/', include('ap_galapagos_scheduling.guia.urls', namespace='guia')),
    #path('operador/<str:operador>/', include('ap_galapagos_scheduling.reserva.urls', namespace='reserva')),
    #path('operador/<str:operador>/', include('ap_galapagos_scheduling.turista.urls', namespace='turista')),
    

    

]

handler404 = 'ap_base.views.error_404_view'
handler500 = 'ap_base.views.error_500_view'
