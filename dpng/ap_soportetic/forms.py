from django import forms
from material import *

from .models import SptEquipo

class SptEquipoForm(forms.ModelForm):
    layout = Layout(
        Fieldset('',
            Row('producto_id','codigo'),
            Row('codigo_externo','modelo'),
            Row('marca_id','referencia'),
            Row('criticidad','tipo_dispositivo'),
            Row('tipo_id','color')),
        Fieldset("INFORMACION ADICIONAL",
            Row('serie_num','ubicacion_id'),
            Row('zona_trabajo','garantia'),
            Row('fecha_compra','duenio_id'),
            Row('administrador_id','proveedor_mantenimiento_id'),
            Row(Span6('estado_producto')),
            Row(Span6('notas')))
    )

    class Meta:
        model = SptEquipo
        fields = ('producto_id','codigo_externo','marca_id','criticidad','tipo_id','codigo','modelo','referencia',
			'tipo_dispositivo','color','serie_num','zona_trabajo','fecha_compra','administrador_id',
			'estado_producto','ubicacion_id','garantia','duenio_id','proveedor_mantenimiento_id','notas')
        labels = {
            'producto_id': 'Producto',
            'marca_id': 'Marca del producto',
            'tipo_id': 'Tipo de producto',
            'serie_num': 'Número Serial',
            'zona_trabajo': 'Zona de trabajo',
            'administrador_id': 'Administrador',
            'ubicacion_id': 'Ubicación',
            'duenio_id': 'Dueño',
            'proveedor_mantenimiento_id': 'Proveedor de Mantenimiento',
        }
        widgets = {
            'producto_id': forms.Select(
                attrs = {
                    'class':'form-control',
                    'style':'width: 500px'
                }
            ),
            'codigo_externo': forms.TextInput(
                attrs = {
                    'class': 'form-control',
                    'style':'width: 500px'
                }
            ),
            'marca_id': forms.Select(
                attrs = {
                    'class':'form-control',
                    'style':'width: 500px'
                }
            ),
            'criticidad': forms.Select(
                attrs = {
                    'class':'form-control',
                    'style':'width: 500px'
                }
            ),
            'tipo_id': forms.Select(
                attrs = {
                    'class':'form-control',
                    'style':'width: 500px'
                }
            ),
            'codigo': forms.TextInput(
                attrs = {
                    'class': 'form-control',
                    'style':'width: 500px'
                }
            ),
            'modelo': forms.TextInput(
                attrs = {
                    'class': 'form-control',
                    'style':'width: 500px'
                }
            ),
            'referencia': forms.TextInput(
                attrs = {
                    'class': 'form-control',
                    'style':'width: 500px'
                }
            ),
            'tipo_dispositivo': forms.Select(
                attrs = {
                    'class':'form-control',
                    'style':'width: 500px'
                }
            ),
            'color': forms.TextInput(
                attrs = {
                    'class': 'form-control',
                    'style':'width: 500px'
                }
            ),
            'serie_num': forms.TextInput(
                attrs = {
                    'class': 'form-control',
                    'style':'width: 500px'
                }
            ),
            'zona_trabajo': forms.TextInput(
                attrs = {
                    'class': 'form-control',
                    'style':'width: 500px'
                }
            ),
            'fecha_compra': forms.DateInput(
            	attrs={
            		'class':'form-control',
            		'type':'date',
            		'style':'width: 150px'
            	}
            ),
            'administrador_id': forms.Select(
                attrs = {
                    'class':'form-control',
                    'style':'width: 500px'
                }
            ),
            'estado_producto': forms.Select(
                attrs = {
                    'class':'form-control',
                    'style':'width: 500px'
                }
            ),
            'ubicacion_id': forms.Select(
                attrs = {
                    'class':'form-control',
                    'style':'width: 500px'
                }
            ),
            'garantia': forms.DateInput(
            	attrs={
            		'class': 'form-control',
            		'type':'date',
            		'style':'width: 150px'
            	}
            ),
            'duenio_id': forms.Select(
                attrs = {
                    'class':'form-control',
                    'style':'width: 500px'
                }
            ),
            'proveedor_mantenimiento_id': forms.Select(
                attrs = {
                    'class':'form-control',
                    'style':'width: 500px'
                }
            ),
            'notas': forms.Textarea(
                attrs = {
                    'class': 'form-control',
                    'style':'width: 500px'
                }
            ),
        }
