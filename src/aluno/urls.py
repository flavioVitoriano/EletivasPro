from django.urls import path
from . import views

app_name = "aluno"
urlpatterns = [
    path("", views.index , name="index"),
    path("entrar/",views.entrar, name="entrar"),
    path("sair/",views.sair,name="sair"),
    path("eletivas/",views.eletivas,name="eletivas"),
    path("eletiva/<int:id>", views.eletiva, name="eletiva"),
    path("eletivas/registros/",views.registros, name="registros"),
    path("eletivas/registros/<int:id>",views.registro,name="registro"),
    path("eletivas/registros/<int:id>/deletar",views.deletar,name="deletar_registro"),
]
