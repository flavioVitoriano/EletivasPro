from django import forms

class LoginAlunoForm(forms.Form):
    sige = forms.CharField("Matricula do SIGE",max_length=7,widget=forms.NumberInput)
    
