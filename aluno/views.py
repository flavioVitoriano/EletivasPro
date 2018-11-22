from django.shortcuts import render
from .registros import *
from .auth_aluno import *
from .models import Eletiva, Aluno, RegistroEletiva

#variaveis globais
eletivas = Eletiva.objects.all()

# Create your views here.

#Pagina principal para o aluno
#Decorador: faz com que seja necessário o aluno estar logado
@require_aluno_logged
def index(request):
    context = {'aluno' : Aluno.objects.get(pk=request.session['aluno_id'])}
    return render(request,"aluno/index.html",context)

def entrar(request):
    #var erro
    erro = None
    if request.method == "POST":
        #pegar a matricula do input
        al_sige = request.POST['matricula_sige']
        aluno = auth(str(al_sige))

        #se o aluno existir, loggar o aluno e redirecionar para o index
        if aluno is not None:
            login(request,aluno)
            return redirect(reverse("aluno:index"))
        else:
            #definir o erro
            erro = 'A matricula informada não existe no sistema'

    context = {
        'erro' : erro,
        'aluno' : Aluno.objects.get(pk=request.session['aluno_id'])
    }

    return render(request,"aluno/entrar.html",context)

#Faz logout e redireciona para o 'entrar'
@require_aluno_logged
def sair(request):
    logout(request)
    return redirect(reverse('home:index'))



#ELETIVAS
@require_aluno_logged
def eletivas(request):
    #Pegar todas as eletivas
    eletivas = Eletiva.objects.all()

    context = {'eletivas' : eletivas,'aluno' : Aluno.objects.get(pk=request.session['aluno_id'])
}
    return render(request,'eletivas/aluno/index.html',context)

@require_aluno_logged
def eletiva(request,id):
    msg = ""
    suc = None
    erro = None
    
    elet = Eletiva.objects.get(pk=id)
    aluno = Aluno.objects.get(pk=request.session['aluno_id'])

    if request.method == "POST":
        r_eletiva,msg = criar_registro(elet,aluno)
        
        if r_eletiva == None:
            erro = msg
        else:
            suc = msg

    context = {
        "eletivas" : eletivas,
        'aluno' : Aluno.objects.get(pk=request.session['aluno_id']),
        "eletiva" : Eletiva.objects.get(pk=id),
        "mensagem" : suc,
        "erro" : erro,
    }

    return render(request,'eletivas/aluno/eletiva.html',context)

@require_aluno_logged
def registros(request):
    context = {
        'aluno' : Aluno.objects.get(pk=request.session['aluno_id']),
        'eletivas' : RegistroEletiva.objects.filter(aluno__pk = request.session['aluno_id']),
    }  
    return render(request,'eletivas/aluno/registros.html',context)

@require_aluno_logged
def registro(request,id):

    context = {
        'aluno' : Aluno.objects.get(pk=request.session['aluno_id']),
        'eletiva' : RegistroEletiva.objects.get(pk=id),        
    }
    return render(request,'eletivas/aluno/registro.html',context)

def deletar(request,id):
    registro = RegistroEletiva.objects.get(pk=id)
    deletar_registro(registro)
    return redirect(reverse('aluno:registros'))