from django.urls import path
from gestao import views


app_name = "gestao"
urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
    # alunos
    path("alunos/", views.AlunoListView.as_view(), name="alunos"),
    path("alunos/<int:pk>/", views.AlunoDetailView.as_view(), name="aluno_ver"),
    path("alunos/add/", views.AlunoAddView.as_view(), name="aluno_add"),
    path("alunos/<int:pk>/deletar/", views.AlunoDeleteView.as_view(), name="aluno_deletar"),

    # eletivas
    path("eletivas/", views.EletivaListView.as_view(), name="eletivas"),
    path("eletivas/<int:pk>/", views.EletivaDetailView.as_view(), name="eletiva_ver"),
    path("eletivas/add/", views.EletivaAddView.as_view(), name="eletiva_add"),
    path("eletivas/<int:pk>/deletar/", views.EletivaDeleteView.as_view(), name="eletiva_deletar"),

    # registros
    path("registros/", views.registrar, name="registros"),
    path("registros/<int:pk>/deletar/", views.RegistroDeleteView.as_view(),name="registro_deletar"),

    # gestao
    path("gestao/", views.GestaoView.as_view(), name="gestao"),
    path("gestao/gerar/pdf/<int:pk>/", views.EletivaPDFView.as_view(), name="gerar_eletiva"),
    path("gestao/gerar/pdf/eletivas/", views.EletivasPDFView.as_view(), name="gerar_eletivas"),
    path("gestao/gerar/csv/registros/", views.RegistroExport.as_view(), name="gerar_registros"),
    path("gestao/gerar/csv/eletivas/", views.EletivaExport.as_view(), name="gerar_eletivas"),
]