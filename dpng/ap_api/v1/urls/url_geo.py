# Django
from django.urls import path, re_path
from django.conf.urls import include, url

# JWT
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token

# Local
from ap_api.v1.views import *

urlpatterns = [
    
    #>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GEO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    # BIO_ESPECIE
    path('api/v1/bioespecie_list/',vw_bio.BioEspeciesViewSet.as_view(),name='BioEspeciesViewSet'),
    path('api/v1/bioespecie/',vw_bio.Get_post_bioespecies.as_view(),name='Get_post_bioespecies'),
    re_path(r'^api/v1/bioespecie/(?P<pk>[0-9A-Fa-f-]+)$',vw_bio.Get_delete_update_bioespecies.as_view(),name='Get_delete_update_bioespecies'),


    # GEO_ISLA
    path('api/v1/geoislas_list/', vw_geo.GeoIslaViewSet.as_view(),name='GeoIslaViewSet'),
    path('api/v1/geoisla/',vw_geo.Get_post_geoisla.as_view(),name='Get_post_geoisla'),
    re_path(r'^api/v1/geoisla/(?P<pk>[0-9A-Fa-f-]+)$',vw_geo.Get_delete_update_geoisla.as_view(),name='Get_delete_update_geoisla'),

    # GEO_ISLA
    path('api/v1/geositios_list/', vw_geo.GeoSitioViewSet.as_view(),name='GeoSitioViewSet'),
    path('api/v1/geositio/',vw_geo.Get_post_geositio.as_view(),name='Get_post_geositio'),
    re_path(r'^api/v1/geositio/(?P<pk>[0-9A-Fa-f-]+)$',vw_geo.Get_delete_update_geositio.as_view(),name='Get_delete_update_geositio'),

    # GEO_PARROQUIA
    path('api/v1/geoparroquia_list/', vw_geo.GeoParroquiaViewSet.as_view(),name='GeoParroquiaViewSet'),
    path('api/v1/geoparroquia/',vw_geo.Get_post_geoparroquia.as_view(),name='Get_post_geoparroquia'),
    re_path(r'^api/v1/geoparroquia/(?P<pk>[0-9A-Fa-f-]+)$',vw_geo.Get_delete_update_geoparroquia.as_view(),name='Get_delete_update_geoparroquia'),
       
    # GEO_PAIS
    re_path(r'^api/v1/geopais/(?P<pk>[0-9A-Fa-f-]+)$',vw_geo.Get_delete_update_geopais.as_view(),name='Get_delete_update_geopais'),     # urls list all and create new one
    path('api/v1/geopais/',vw_geo.Get_post_geopais.as_view(),name='Get_post_geopais'), # Url to get update or delete a cargo funcional

    # GEO_CANTON
    path('api/v1/geocanton_list/', vw_geo.GeoCantonViewSet.as_view(),name='GeoCantonViewSet'),
    re_path(r'^api/v1/geocanton/(?P<pk>[0-9A-Fa-f-]+)$',vw_geo.Get_delete_update_geocanton.as_view(),name='Get_delete_update_geocanton'),     # urls list all and create new one
    path('api/v1/geocanton/',vw_geo.Get_post_geocanton.as_view(),name='Get_post_geocanton'), # Url to get update or delete a cargo funcional

    # GEO_PROVINCIA
    path('api/v1/geoprovincia_list/', vw_geo.GeoProvinciaViewSet.as_view(),name='GeoProvinciaViewSet'),
    path('api/v1/geoprovincia/', vw_geo.Get_post_geoprovincia.as_view(),name='Get_post_geoprovincia'),
    
    # GEO_CIUDAD
    path('api/v1/geociudad_list/', vw_geo.GeoCiudadViewSet.as_view(),name='GeoCiudadViewSet'),
    path('api/v1/geociudad/',vw_geo.Get_post_geociudad.as_view(),name='Get_post_geociudad'),
    re_path(r'^api/v1/geociudad/(?P<pk>[0-9A-Fa-f-]+)$',vw_geo.Get_delete_update_geociudad.as_view(),name='Get_delete_update_geociudad'),
    


]