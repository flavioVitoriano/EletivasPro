from django.urls import path
from . import views


app_name = "professor"

urlpatterns = [
    path('',views.index,name='index'),
    path('entrar/',views.entrar,name='entrar'),
    path('sair/',views.sair,name='sair'),
    path('eletivas/',views.eletivas,name='eletivas'),
    path('eletivas/<int:id>',views.eletiva,name='eletiva'),
    path('eletivas/cadastrar/',views.eletivas_cadastrar,name='eletivas_cadastrar'),
]