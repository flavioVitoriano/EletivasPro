from django.views.generic import CreateView, DeleteView
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

from django.http import HttpResponseRedirect

from django.shortcuts import reverse, render
from django.db.models import Q
from django.urls import reverse_lazy

from gestao.errors import *

from backend.models import Eletiva, Registro, Aluno
from gestao.forms import RegistroForm, RegistroFilterForm

@login_required(redirect_field_name="/auth/login/")
def registrar(request):
    data = { "erro": None, "sucesso": None }
    eletivas_dias = {
        'segunda': Eletiva.objects.filter(ativo=True, dia='1'),
        'terca': Eletiva.objects.filter(ativo=True, dia='2'),
        'quarta': Eletiva.objects.filter(ativo=True, dia='3'),
        'quinta': Eletiva.objects.filter(ativo=True, dia='4'),
        'sexta': Eletiva.objects.filter(ativo=True, dia='5'),
    }
    form = RegistroForm()
    form_filter = RegistroFilterForm()
    
    if request.method == "POST":
        form = RegistroForm(request.POST)
        if form.is_valid():
            try:
                form.save()
                data["sucesso"] = "Registro realizado!"    
            except RegistroAtivacaoErro:
                data["erro"] = str(e)
            except RegistroCapacidadeErro as e:
                data["erro"] = str(e)
            except AlunoContinuidadeErro as e:
                data["erro"] = str(e)
            except AlunoDiaErro as e:
                data["erro"] = str(e)
            except Aluno.DoesNotExist:
                data["erro"] = "Esse Sige não está associado a nenhum aluno"

    if request.method == "GET":
        form_filter = RegistroFilterForm(request.GET)

        if form_filter.is_valid():
            dia = form_filter.cleaned_data["dia"]
            disponiveis = form_filter.cleaned_data["disponiveis"]
            form = RegistroForm(dia=dia, disponiveis=disponiveis)


    context = {"form": form, "form_filter": form_filter, "data": data, "eletivas": eletivas_dias }
    return render(request, "registros/registro_add.html", context=context)


@method_decorator(login_required(redirect_field_name="/auth/login/"), name="dispatch")
class RegistroDeleteView(DeleteView):
    model = Registro
    template_name = "registros/registro_delete.html"

    def get_success_url(self):
        return reverse("gestao:alunos")

    def delete(self, *args, **kwargs):
        obj = self.get_object()
        url = self.get_success_url()

        obj.deletar()

        return HttpResponseRedirect(url)

