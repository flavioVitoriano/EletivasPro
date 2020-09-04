from django.utils.http import is_safe_url
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import REDIRECT_FIELD_NAME, login as auth_login, logout as auth_logout
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.debug import sensitive_post_parameters
from django.views.generic import FormView, RedirectView, TemplateView
from django.shortcuts import reverse

from backend.models import Aluno, Eletiva, Registro

@method_decorator(login_required(login_url="/auth/login/"), name="dispatch")
class HomeView(TemplateView):
    template_name = "gestao/home_page.html"

    def get_context_data(self, **kwargs):
        context =  super().get_context_data(**kwargs)
        quantidades = {}

        quantidades['alunos'] = Aluno.objects.all().count()
        quantidades['eletivas'] = Eletiva.objects.all().count()
        quantidades['registros'] = Registro.objects.all().count()

        context['quantidades'] = quantidades
        context['ultimas_eletivas'] = Eletiva.objects.all().order_by('-criado_em')[:5]
        context['ultimos_registros'] = Registro.objects.all().order_by('-data')[:10]
        context['ultimos_alunos'] = Aluno.objects.all().order_by('-criado_em')[:5]

        return context
