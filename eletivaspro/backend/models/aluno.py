from django.db import models

series = (
    (1, "1 Série"),
    (2, "2 Série"),
    (3, "3 Série"),
)

turmas = (
    ("A", "TURMA A"),
    ("B", "TURMA B"),
    ("C", "TURMA C"),
    ("D", "TURMA D"),
)


class Aluno(models.Model):
    class Meta:
        verbose_name = "Aluno"
        verbose_name_plural = "Alunos"

    sige = models.CharField("Matricula do SIGE", max_length=7, unique=True, blank=True, null=True)
    nome = models.CharField("Nome", max_length=100)
    serie = models.IntegerField("Numero da série", choices=series, default=1)
    turma = models.CharField("Turma", max_length=1, choices=turmas, default="A")
    criado_em = models.DateTimeField("Data de criação", auto_now_add=True)
    ativo = models.BooleanField('Aluno Ativo', default=True)

    def __str__(self):
        return self.nome