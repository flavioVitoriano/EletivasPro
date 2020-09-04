from django.views.generic import ListView, CreateView, DetailView, DeleteView
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

from django.shortcuts import reverse
from django.db.models import Q
from django.urls import reverse_lazy

from backend.models import Aluno, Registro
from gestao.forms import AlunoForm


@method_decorator(login_required(login_url="/auth/login/"), name="dispatch")
class AlunoListView(ListView):
    model = Aluno
    template_name = 'alunos/alunos_list.html'

    def get_queryset(self):
        busca = self.request.GET.get("busca")
        obj_list = Aluno.objects.all().filter(ativo=True)

        if busca:
            obj_list = self.model.objects.filter(Q(nome__icontains=busca) | Q(nome__istartswith=busca))

        return obj_list


@method_decorator(login_required(login_url="/auth/login/"), name="dispatch")
class AlunoAddView(CreateView):
    template_name = 'alunos/aluno_add.html'
    form_class = AlunoForm
    success_url = reverse_lazy("gestao:alunos")

@method_decorator(login_required(login_url="/auth/login/"), name="dispatch")
class AlunoDetailView(DetailView):
    template_name = 'alunos/aluno_ver.html'
    model = Aluno

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context["registros_ativos"] = Registro.objects.filter(aluno=self.object, ativo=True)
        context["registros"] = Registro.objects.filter(aluno=self.object)
        context["form"] = AlunoForm(instance=self.object)

        return context

@method_decorator(login_required(login_url="/auth/login/"), name="dispatch")
class AlunoDeleteView(DeleteView):
    model = Aluno
    success_url = "alunos/"