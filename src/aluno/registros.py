from .models import *


#Funcoes para se tratar Eletivas e registros


#funcao para checar a disponibilidade da eletiva para o aluno
def checar_registro_dia(eletiva,aluno):
    try:
        registros = RegistroEletiva.objects.filter(aluno__pk = aluno.pk)
    except RegistroEletiva.DoesNotExist:
        return True
    
    for registro in registros:
        if registro.eletiva.dia == eletiva.dia:
            return False
            break
        else:
            continue
    
    return True

#funcao para checar se o aluno já se escreveu antigamente em uma eletiva
def checar_registro_disp(eletiva,aluno):
    try:
        registros = RegistroEletiva.objects.filter(aluno__pk = aluno.pk)
    except RegistroEletiva.DoesNotExist:
        return True
    
    for registro in registros:
        if eletiva.pk == registro.eletiva.pk:
            return False
            break
        else:
            continue
    
    return True


#criar um registro para a eletiva
def criar_registro(eletiva,aluno):
    #checar possiveis erros

    #caso a eletiva nao possua vagas...
    if eletiva.vagas_usadas >= eletiva.vagas:
        return None,"A eletiva em questão não possue vagas"
    #caso o aluno já tenha se cadastrado em uma eletiva no mesmo dia...
    elif checar_registro_dia(eletiva,aluno) == False:
        return None,"Você já se cadastrou em uma eletiva nesse dia"
    
    #caso o aluno já tenha se cadastrado nessa mesma eletiva um ano passado...
    elif checar_registro_disp(eletiva,aluno) == False:
        return None,"Você já fez essa eletiva em semestres passados"

    #finalmente cadastrar
    else:
        #criar o registro do aluno
        registro = RegistroEletiva(eletiva=eletiva,aluno=aluno)
        #adicionar um ao numero de vagas da eletiva
        registro.eletiva.vagas_usadas += 1
        registro.eletiva.save()
        registro.save()
        return registro,"Registro realizado com sucesso!"


def deletar_registro(registro):
    registro.eletiva.vagas_usadas -= 1
    registro.eletiva.save()
    RegistroEletiva.objects.get(pk=registro.pk).delete()