from django.shortcuts import redirect,reverse


#Funcao decoradora para checar se o aluno está realmente logado
def aluno_required(view,url_login="aluno:login"):
    #funcao a ser retornada caso o aluno nao esteja logado
    def redir_entrar(request, **kwargs):
        #redireciona o aluno para a tela de login
        return redirect(reverse(url_login))


    def checar_logado(request, **kwargs):
        #caso o aluno esteja logado...
        try:
            if request.session["aluno_logado"] == True and request.session['aluno'] is not None:
                return view(request,**kwargs)
            else:
                return redir_entrar(request,**kwargs)
        except KeyError:
            return redir_entrar(request,**kwargs)

    return checar_logado
