from django import forms

from backend.models import Aluno, Eletiva, Registro
from django.db.models import Q, F


class AlunoForm(forms.ModelForm):
    class Meta:
        model = Aluno
        fields = ('sige', 'nome', 'serie', 'turma')
        widgets = {
            'sige': forms.NumberInput(),
            'nome': forms.TextInput(),
        }


class EletivaForm(forms.ModelForm):
    class Meta:
        model = Eletiva
        exclude = ('criado_em', 'vagas_usadas')
        widgets = {
            "ativo": forms.CheckboxInput(attrs={"default": True}),
        }


class RegistroForm(forms.Form):
    sige = forms.CharField(label="Sige do aluno", widget=forms.NumberInput())
    eletiva = forms.ModelChoiceField(queryset=Eletiva.objects.filter(ativo=True))

    def __init__(self, *args, **kwargs):
        dia = kwargs.pop('dia', None)
        disponiveis = kwargs.pop('disponiveis', None)

        super(RegistroForm, self).__init__(*args, **kwargs)

        if dia:
            self.fields['eletiva'].queryset = Eletiva.objects.filter(dia=dia, ativo=True)

        if disponiveis:
            self.fields['eletiva'].queryset = self.fields['eletiva'].queryset.filter(ativo=True).exclude(vagas_usadas__gte=F('vagas'))
            

    def save(self, commit=True):
        aluno = Aluno.objects.get(sige=self.cleaned_data["sige"])
        eletiva = self.cleaned_data["eletiva"]

        return Registro.registrar(aluno, eletiva)


dias = (
    ("0","Dia não definido"),
    ("1","Segunda"),
    ("2","Terça"),
    ("3","Quarta"),
    ("4","Quinta"),
    ("5","Sexta"),
)

periodos = (
    ("0","Turno não definido"),
    ("1", "Manhã"),
    ("2","Tarde"),
)


class RegistroFilterForm(forms.Form):
    dia = forms.ChoiceField(label="dia", choices=dias)
    disponiveis = forms.BooleanField(label="apenas eletivas disponíveis")


class EletivaSelectForm(forms.Form):
    eletiva = forms.ModelChoiceField(queryset=Eletiva.objects.filter(ativo=True))

    def __init__(self, *args, **kwargs):
        dia = kwargs.pop('dia', None)
        super(EletivaSelectForm, self).__init__(*args, **kwargs)

        if dia:
            self.fields['eletiva'].queryset = Eletiva.objects.filter(dia=dia, ativo=True)