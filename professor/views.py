from django.shortcuts import render,redirect,reverse, get_object_or_404
from django.http import Http404
from .forms import *
from .models import Eletiva,Professor
from aluno.models import RegistroEletiva
from .auth_professor import *

# Create your views here.


@require_professor_logged
def index(request):
    professor= Professor.objects.get(pk=request.session["professor_id"])
    context={
         "professor":professor,
         "eletivas" : Eletiva.objects.filter(professor__pk=request.session['professor_id']),
    }
    return render(request, "professor/index.html",context)


#AUTENTICAÇÃO
def entrar(request):
     erro = None
     msg = None
     if request.method == "POST":
          sige_professor = request.POST['matricula_professor']
          senha = request.POST['senha_professor']

          professor = auth(sige_professor,senha)
          
          if professor == None:
               erro = "Ocorreu um erro"
          else:
               login(request,professor)
               msg = "Sucesso!"
               return redirect(reverse("professor:index"))

     context = {'erro' : erro,
     'mensagem' : msg,
     }
     return render(request,'professor/entrar.html',context)

def sair(request):
     logout(request)
     return redirect('home:index')

#ELETIVAS

@require_professor_logged
def eletivas(request):
    eletivas = Eletiva.objects.filter(professor__pk = request.session['professor_id']) 

    context = {
          'eletivas' : eletivas,
          'professor' : Professor.objects.get(pk=request.session['professor_id']),
          'eletivas' : Eletiva.objects.filter(professor__pk= request.session['professor_id']),
    }
    return render(request, 'eletivas/professor/index.html', context)

@require_professor_logged
def eletiva(request,id):
     eletiva = get_object_or_404(Eletiva,pk=id)
     erro = None
     msg = None
     try:
          registros = RegistroEletiva.objects.filter(eletiva__pk = id)
     except RegistroEletiva.DoesNotExist:
          registros = None

     #Verificar o dono da eletiva
     if not eletiva.professor.pk == request.session['professor_id']:
          raise Http404()

     
     if request.method == "POST":
          form = EletivaForm(request.POST)
         

          if form.is_valid():
               #pegar a eletiva em questão
               eletiva = Eletiva.objects.get(pk=id)
               temp_eletiva = form.save(commit=False)
               #Fazer a assimilação
               eletiva.nome = temp_eletiva.nome
               eletiva.vagas = temp_eletiva.vagas
               eletiva.desc = temp_eletiva.desc
               eletiva.dia = temp_eletiva.dia
               eletiva.periodo = temp_eletiva.periodo
               eletiva.save()
               msg = "Sucesso ao modificar a eletiva"
          else:
               erro = "Ocorreu um erro ao mudar a eletiva"
     else:
          form = EletivaForm()
     context = {'eletiva' : eletiva,
     'form' : form,
     'erro' : erro,
     'mensagem' : msg,
     'professor' : Professor.objects.get(pk=request.session['professor_id']),
     'eletivas' : Eletiva.objects.filter(professor__pk= request.session['professor_id']),
     'registros' : registros,
     } 
     return render(request,'eletivas/professor/eletiva.html',context)

@require_professor_logged
def eletivas_cadastrar(request):
    erro = None
    msg = None
    if request.method == "POST":
       form = EletivaForm(request.POST)
       
       if form.is_valid():
            eletiva = form.save(commit=False)
            eletiva.professor = Professor.objects.get(pk=request.session['professor_id'])
            eletiva.save()
            msg = "A eletiva foi cadastrada com sucesso"
       else:
            erro = 'Houve um erro'
    else:
        form = EletivaForm()
    
    context = {'form' : form,
               'erro' : erro,
               'mensagem' : msg,
               'professor' : Professor.objects.get(pk=request.session['professor_id']),
               'eletivas' : Eletiva.objects.filter(professor__pk=request.session['professor_id']),
               }
    return render(request, 'eletivas/professor/cadastrar.html',context)

