from django.db import models, transaction
from django.db.models import F
from gestao.errors import check_all_errors
from .aluno import Aluno

dias = (
    ("0", "Dia não definido"),
    ("1", "Segunda"),
    ("2", "Terça"),
    ("3", "Quarta"),
    ("4", "Quinta"),
    ("5", "Sexta"),
)

periodos = (
    ("0", "Turno não definido"),
    ("1", "Manhã"),
    ("2", "Tarde"),
)

semestres = (
    (1, "1 semestre"),
    (2, "2 semestre"),
)


class Eletiva(models.Model):
    class Meta:
        ordering = ["dia", "nome"]

    codigo = models.CharField("Codigo", max_length=6)
    nome = models.CharField("Nome", max_length=100)
    responsavel = models.CharField("Nome do Responsável", max_length=100, default="", blank=True)
    vagas = models.IntegerField("Número disponível de vagas", default=32)
    vagas_usadas = models.IntegerField("Vagas_preenchidas", default=0)
    dia = models.CharField("Dia da eletiva", max_length=1, choices=dias, default="0")
    periodo = models.CharField("Período da eletiva", max_length=1, choices=periodos, default="0")
    ativo = models.BooleanField("Eletiva está ativa", default=False)
    ano = models.IntegerField("Ano da Eletiva")
    semestre = models.IntegerField("Semestre da Eletiva", choices=semestres)
    criado_em = models.DateTimeField("Data de criação", auto_now_add=True)

    # Retorna todas as eletivas ativas
    @classmethod
    def ativas(cls):
        try:
            e = cls.objects.filter(ativo=True)
            return e
        except cls.DoesNotExist:
            return None

    @transaction.atomic
    def desativar(self):
        for registro in self.registros:
            registro.ativo = False

        self.ativo = False

    def atualizar_vagas(self):
        vagas = len(self.registros.all())
        self.vagas_usadas = F("vagas")
        self.save()

    def __str__(self):
        return self.nome


class Registro(models.Model):
    class Meta:
        ordering = ["aluno__nome", "aluno__serie", "aluno__turma"]

    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE, related_name="registros")
    eletiva = models.ForeignKey(Eletiva, on_delete=models.CASCADE, related_name="registros")
    data = models.DateTimeField("Data de criação", auto_now_add=True)
    ativo = models.BooleanField("Registro ativo", default=True)

    @classmethod
    def ativos(cls):
        return cls.objects.filter(ativo=True)

    # Cria um novo registro
    @classmethod
    @transaction.atomic
    def registrar(cls, aluno=None, eletiva=None):
        check_all_errors(cls, aluno, eletiva)

        registro = cls.objects.create(aluno=aluno, eletiva=eletiva)
        registro.eletiva.vagas_usadas = F('vagas_usadas') + 1
        registro.eletiva.save()
        registro.save()

        return registro

    def deletar(self):
        self.eletiva.vagas_usadas = F('vagas_usadas') - 1
        self.eletiva.save()
        super().delete()

    def delete(self):
        self.deletar()
