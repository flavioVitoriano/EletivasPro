from import_export import resources
from backend.models import Registro,Eletiva, Aluno

class RegistroResource(resources.ModelResource):
    class Meta:
        model = Registro
        fields =('aluno__sige','aluno__nome','aluno__serie','aluno__turma','eletiva__codigo','eletiva__nome','eletiva__dia','eletiva__periodo')


class EletivaResource(resources.ModelResource):
    class Meta:
        model = Eletiva
        fields = ('codigo','nome','dia','periodo','vagas')


class AlunoResource(resources.ModelResource):
    model = Aluno
    fields = ('sige', 'nome', 'serie', 'turma')