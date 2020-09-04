from backend.models import Aluno

def desativar_aluno(aluno):
    aluno.ativo = False
    aluno.registros.all().update(ativo=False)
    aluno.save()

def ativar_aluno(aluno):
    aluno.ativo = True
    aluno.registros.all().update(ativo=False)
    aluno.save()

"""
def desativar_eletiva(eletiva):
    eletiva.ativo = False
    eletiva.registros.all().update(ativo=False)
"""

def run():
    alunos = Aluno.objects.all()

    for aluno in alunos:
        old_serie = aluno.serie
        new_serie = aluno.serie + 1
        
        if (aluno.criado_em.year == 2020):
            print("Aluno: ", aluno.nome, " é desse ano")
            ativar_aluno(aluno)
            continue

        elif new_serie > 3:
            desativar_aluno(aluno)
            print("Aluno: ", aluno.nome, " desativado!")
            continue
        
        else:
            aluno.serie = new_serie
            ativar_aluno(aluno)
            aluno.save()
            print("Aluno: ", aluno.nome, " passado de ano!")
