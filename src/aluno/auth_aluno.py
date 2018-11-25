from .models import Aluno
from django.shortcuts import redirect, reverse 

#Funções para a autenticação e login do aluno na plataforma

#Autenticar o aluno, retorna um objeto aluno caso sucesso, None caso contrário
def auth(aluno_sige):
    #pegar o aluno com o sige em questao
    try:
        aluno = Aluno.objects.get(sige=str(aluno_sige))
        return aluno
    except:
        return None

#Recebe um objecto aluno como parametro, caso não for None, grava o aluno na session
def login(request,aluno):
    if aluno is not None:
        #grava na session: o estado do usuario (logado)
        #o id do aluno logado
        request.session['aluno_logado'] = True
        request.session['aluno_id'] = aluno.pk
        return True
    else:
        return False
    return False

#Simplesmente desloga o atual aluno do sistema
def logout(request):
    request.session['aluno_logado'] = False
    request.session['aluno_id'] = None


#Funcao decoradora para checar se o aluno está realmente logado
def require_aluno_logged(view):
    #funcao a ser retornada caso o aluno nao esteja logado
    def redir_entrar(request, **kwargs):
        #redireciona o aluno para a tela de login
        return redirect(reverse("aluno:entrar"))


    def checar_logado(request, **kwargs):
        #caso o aluno esteja logado...
        try:
            if request.session['aluno_logado'] == True:
                return view(request,**kwargs)
            else:
                return redir_entrar(request,**kwargs)
        except KeyError:
            return redir_entrar(request,**kwargs)

    return checar_logado
