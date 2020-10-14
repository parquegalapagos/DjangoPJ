# Django
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Models
from .models import PerPersona
from ap_talentohumano.models import PerFuncionario,PerFuncionarioAuth
from django.contrib.auth.models import User 

# ADMINISTRADOR
@admin.register(PerFuncionarioAuth)
class PerFuncionarioAuthAdmin(admin.ModelAdmin):

	list_display = ('pk','user')
	list_display_links = ('pk','user')
	search_fields = ('user__email','user__first_name','user__last_name')
	list_filter = ('user__email','user__first_name')
	fieldsets = (
		('Perfil del Funcionario',{
			'fields':(('user','observaciones')),
		}),
		
	)

class PerFuncionarioAuthInline(admin.StackedInline):

	model = PerFuncionarioAuth
	can_delete = False
	verbose_name_plural = 'Perfiles de Funcionario'



class UserAdmin(BaseUserAdmin):

	inlines = (PerFuncionarioAuthInline,)
	list_display = ('username','email','first_name','last_name','is_active','is_staff')

admin.site.unregister(User)
admin.site.register(User,UserAdmin)


# PERSONA
@admin.register(PerPersona)
class PerPersonaAdmin(admin.ModelAdmin):
	list_display = ('pk','identificacion','nombres','apellidos')
	list_display_links = ('pk',)
	search_fields = ('identificacion','nombres','apellidos',)
	fieldsets = (
		('Datos Generales',{
			'fields':(

				'identificacion',
				'nombres', 'apellidos',


			),
		}),
	)

# PERFUNCIONARIO
@admin.register(PerFuncionario)
class PerFuncionarioAdmin(admin.ModelAdmin):
	list_display = ('pk','persona_id')
	list_display_links = ('pk',)
	search_fields = ('persona_id__identificacion','persona_id__nombres','persona_id__apellidos',)
	
	fieldsets = (
		('Datos Generales',{
			'fields':(

				'persona_id',
				'email', 
				'direccion_estatuto_id',
				'proceso_estatuto_id',
				'subproceso_estatuto_id', 
				'cargo_funcional_id',
				'es_responsable',
				'isla_trabaja_id'



			),
		}),
	)
