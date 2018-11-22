from django.db import models

# Create your models here.

#Model Professor
class Professor(models.Model):
    nome = models.CharField("Nome",max_length=80)
    disciplina = models.CharField("Disciplina",max_length=50)
    sige = models.CharField("Matricula SIGE",max_length=7)
    senha = models.CharField("Senha",max_length =80)

    def __str__(self):
        return self.nome

#Model Eletiva
class Eletiva(models.Model):
    dias = (
        ('1','Segunda'),
        ('2','Terça'),
        ('3','Quarta'),
        ('4','Quinta'),
        ('5','Sexta'),
    )
    periodos = (
        ('1', 'Manhã'),
        ('2','Tarde'),
    )

    professor = models.ForeignKey(Professor,on_delete=models.CASCADE)
    nome = models.CharField("Nome",max_length=50)
    vagas = models.IntegerField("Número disponível de vagas",default=32)
    vagas_usadas = models.IntegerField("Vagas_preenchidas (deixe zero!)", default=0)
    dia = models.CharField("Dia da eletiva",max_length=1,choices=dias,default='1')
    periodo = models.CharField("Período da eletiva",max_length=1,choices=periodos,default='1')
    desc = models.TextField("Descrição da eletiva")


    def __str__(self):
        return self.nome