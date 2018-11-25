from .models import Professor
from django.shortcuts import redirect, reverse 

#Funções para a autenticação e login do professor na plataforma

#Autenticar o professor, retorna um objeto professor caso sucesso, None caso contrário
def auth(professor_sige,senha):
    #pegar o professor com o sige em questao
    try:
        professor = Professor.objects.get(sige=str(professor_sige))
        if professor is not None:
            if professor.senha == senha:
                return professor
            else:
                return None
        return None
    except:
        return None

#Recebe um objecto professor como parametro, caso não for None, grava o professor na session
def login(request,professor):
    if professor is not None:
        #grava na session: o estado do usuario (logado)
        #o id do professor logado
        request.session['professor_logado'] = True
        request.session['professor_id'] = professor.pk
        return True
    else:
        return False
    return False

#Simplesmente desloga o atual professor do sistema
def logout(request):
    request.session['professor_logado'] = False
    request.session['professor_id'] = None


#Funcao decoradora para checar se o professor está realmente logado
def require_professor_logged(view):
    #funcao a ser retornada caso o professor nao esteja logado
    def redir_entrar(request,**kwargs):
        #redireciona o professor para a tela de login
        return redirect(reverse("professor:entrar"))


    def checar_logado(request,**kwargs):
        #caso o professor esteja logado...
        try:
            if request.session['professor_logado'] == True:
                return view(request,**kwargs)
            else:
                return redir_entrar(request,**kwargs)
        except KeyError:
            return redir_entrar(request,**kwargs)

    return checar_logado
