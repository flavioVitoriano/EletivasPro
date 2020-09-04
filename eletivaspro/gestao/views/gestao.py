from django.views.generic import TemplateView, FormView, View
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import reverse

from backend.models import Eletiva
from gestao.forms import EletivaSelectForm
from gestao.resources import RegistroResource, EletivaResource

from easy_pdf.views import PDFTemplateView


@method_decorator(login_required(redirect_field_name="/auth/login/"), name="dispatch")
class GestaoView(TemplateView):
    template_name = "gestao/gestao.html"
    form_class = EletivaSelectForm

    def get(self, *args, **kwargs):
        context = self.get_context_data()
        form = context["form"]

        if form.is_valid():
            eletiva = form.cleaned_data["eletiva"]
            return HttpResponseRedirect(reverse("gestao:gerar_eletiva", kwargs={'pk': eletiva.pk }))

        return super(GestaoView, self).get(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(GestaoView, self).get_context_data(**kwargs)
        
        context["form"] = self.form_class(self.request.GET or None)

        return context


@method_decorator(login_required(redirect_field_name="/auth/login/"), name="dispatch")
class PassarAlunosDeAnoView(TemplateView):
    template_name = "gestao/gestao.html"
    form_class = EletivaSelectForm

    def post(self, *args, **kwargs):
        context = self.get_context_data()
        
        return super(GestaoView, self).get(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(GestaoView, self).get_context_data(**kwargs)
        
        context["form"] = self.form_class(self.request.GET or None)

        return context


@method_decorator(login_required(redirect_field_name="/auth/login/"), name="dispatch")
class EletivaPDFView(PDFTemplateView):
    template_name = "eletivas/eletiva_pdf.html"

    def get_context_data(self, **kwargs):
        context = super(EletivaPDFView, self).get_context_data(**kwargs)
        
        context['eletiva'] = Eletiva.objects.get(pk=kwargs["pk"])
        
        return context


@method_decorator(login_required(redirect_field_name="/auth/login/"), name="dispatch")
class EletivasPDFView(PDFTemplateView):
    template_name = "eletivas/eletivas_pdf.html"

    def get_context_data(self, **kwargs):
        context = super(EletivasPDFView, self).get_context_data(**kwargs)

        context['eletivas'] = Eletiva.objects.all()

        return context


@method_decorator(login_required(redirect_field_name="/auth/login/"), name="dispatch")
class RegistroExport(View):

    def get(self, *args, **kwargs ):
        dataset = RegistroResource().export()
        response = HttpResponse(dataset.csv, content_type="csv")
        response['Content-Disposition'] = 'attachment; filename=registros.csv'
        return response


@method_decorator(login_required(redirect_field_name="/auth/login/"), name="dispatch")
class EletivaExport(View):

    def get(self, *args, **kwargs ):
        dataset = EletivaResource().export()
        response = HttpResponse(dataset.csv, content_type="csv")
        response['Content-Disposition'] = 'attachment; filename=eletiva.csv'
        return response