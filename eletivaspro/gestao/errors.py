# Erros e exceções
# Erros nos Registros

# raise esse erro quando a eletiva não estiver ativa
class RegistroAtivacaoErro(Exception):
    pass


# raise esse erro quando o numero de registros for igual ao numero de vagas maximas
class RegistroCapacidadeErro(Exception):
    pass


# raise esse erro quando o aluno já estiver cadastrado em uma eletiva no mesmo dia
class AlunoDiaErro(Exception):
    pass


# raise esse erro quando o aluno já estiver cursado esse curso em um periodo anterior
class AlunoContinuidadeErro(Exception):
    pass


# Checar os erros
def registro_erro(cls, eletiva):
    # Eletiva ativa
    if eletiva.ativo == False:
        raise RegistroAtivacaoErro("A Eletiva não está ativa")
    # Numero de registros na Eletiva
    elif eletiva.vagas == eletiva.vagas_usadas:
        raise RegistroCapacidadeErro("A Eletiva já alcançou o número maximo de registros")
    else:
        return True


def continuidade_erro(cls, aluno, eletiva):
    try:
        d_registros = cls.objects.filter(aluno=aluno, ativo=False)
        for registro in d_registros:
            if registro.eletiva.pk == eletiva.pk:
                raise AlunoContinuidadeErro("O aluno já fez essa eletiva em algum semestre passado")
                return False
            else:
                continue
        return True
    except cls.DoesNotExist:
        return True


def dia_erro(cls, aluno, eletiva):
    # checar pelo dia
    try:
        registros = cls.objects.filter(aluno=aluno, ativo=True)
        for registro in registros:
            if registro.eletiva.dia == eletiva.dia:
                raise AlunoDiaErro("O aluno já se registrou em uma eletiva nesse dia")
                return False
            else:
                continue
    except cls.DoesNotExist:
        return True


# Funcao final
def check_all_errors(cls, aluno, eletiva):
    registro_erro(cls, eletiva)
    continuidade_erro(cls, aluno, eletiva)
    dia_erro(cls, aluno, eletiva)
