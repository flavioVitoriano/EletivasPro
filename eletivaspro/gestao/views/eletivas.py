from django.views.generic import ListView, CreateView, DetailView, DeleteView
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

from django.shortcuts import reverse
from django.db.models import Q
from django.urls import reverse_lazy

from backend.models import Eletiva, Registro
from gestao.forms import EletivaForm


@method_decorator(login_required(login_url="/auth/login/"), name="dispatch")
class EletivaListView(ListView):
    model = Eletiva
    template_name = 'eletivas/eletivas_list.html'

    def get_queryset(self):
        busca = self.request.GET.get("busca")
        obj_list = Eletiva.objects.filter(ativo=True)

        if busca:
            obj_list = self.model.objects.filter(Q(nome__icontains=busca) | Q(nome__istartswith=busca))

        return obj_list


@method_decorator(login_required(login_url="/auth/login/"), name="dispatch")
class EletivaAddView(CreateView):
    template_name = 'eletivas/eletiva_add.html'
    form_class = EletivaForm
    success_url = reverse_lazy("gestao:eletivas")


@method_decorator(login_required(login_url="/auth/login/"), name="dispatch")
class EletivaDetailView(DetailView):
    template_name = 'eletivas/eletiva_ver.html'
    model = Eletiva

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['eletiva'] = self.object
        context['form'] = EletivaForm(instance=self.object)
        context["registros"] = Registro.objects.filter(eletiva=self.object)

        return context


@method_decorator(login_required(login_url="/auth/login/"), name="dispatch")
class EletivaDeleteView(DeleteView):
    model = Eletiva
    success_url = "eletivas/"