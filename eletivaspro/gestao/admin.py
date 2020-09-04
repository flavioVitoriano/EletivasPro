from django.contrib import admin
from gestao.resources import *
from backend.models import Aluno, Eletiva
from import_export.admin import ImportExportModelAdmin

# Register your models here.

def desativar(modeladmin, request, queryset):
    for aluno in queryset:
        aluno.ativo = False
        aluno.save()
desativar.short_description = 'desativar alunos selecionados'

def ativar(modeladmin, request, queryset):
    for aluno in queryset:
        aluno.ativo=True
        aluno.save()
ativar.short_description = 'ativar alunos selecionados'


class AlunoAdmin(ImportExportModelAdmin):
    resource_class = AlunoResource
    actions = [ativar, desativar]
    list_filter = ['ativo', ]
admin.site.register(Aluno, AlunoAdmin)


class EletivaAdmin(ImportExportModelAdmin):
    resource_class = EletivaResource

admin.site.register(Eletiva, EletivaAdmin)