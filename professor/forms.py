from django import forms
from .models import *


class EletivaForm(forms.ModelForm):
    class Meta:
        model = Eletiva
        fields = ['nome', 'vagas', 'desc','dia','periodo']

        #atributos dos widgets
        widgets = {'nome': forms.TextInput(attrs={"class": "w3-input w3-border w3-white"}),
                   'vagas': forms.NumberInput(attrs={"class": "w3-input w3-border w3-white"}),
                   'desc': forms.Textarea(attrs={"class": "w3-input w3-border w3-white"}),
                   'dia' : forms.Select(attrs={"class" : "w3-select w3-border"}, choices = Eletiva.dias),
                   'periodo' : forms.Select(attrs={"class" : "w3-select w3-border"}, choices=Eletiva.periodos),
                   }
