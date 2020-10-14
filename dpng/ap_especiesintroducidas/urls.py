from django.urls import path
from . import views


urlpatterns = [
    path('espintroducidas/', views.espintroducidas, name='espintroducidas'),
    path('data_especieintrocab/', views.data_especieintrocab, name='data_especieintrocab'),
    path('data_infoCabEspIntro/', views.data_infoCabEspIntro, name='data_infoCabEspIntro'),
    path('data_sitioXisla/', views.data_sitioXisla, name='data_sitioXisla'),
    path('data_metodoXespecie/', views.data_metodoXespecie, name='data_metodoXespecie'),
]