from django.db import models
from datetime import datetime
from professor.models import *
# Create your models here.


#Classe aluno para model do aluno
class Aluno(models.Model):

#Series que poderam ser escolhidas, como se trata de ensino medio, 1-3
    series = (
        (1,'1 Série'),
        (2,'2 Série'),
        (3,'3 Série'),
    )

#Turmas que poderam ser escolhidas, de A-D
    turmas = (
        ('A', 'TURMA A'),
        ('B', 'TURMA B'),
        ('C', 'TURMA C'),
        ('D', 'TURMA D'),

    )
    #matricula do sige, necessario para fazer pesquisas
    #esse campo será null default, pois existem excecoes em que o aluno nao tem matricula
    sige = models.CharField("Matricula do SIGE",max_length=7,unique=True,blank=True,null=True)
    nome = models.CharField("Nome", max_length=100)
    serie = models.IntegerField("Numero da série",choices=series, default=1)
    turma = models.CharField("Turma ", max_length=1,choices=turmas,default='A')

    #campos que nao seram usados por default
    #esses campos sao opcionais, dependendo da escola

    cpf = models.CharField("CPF", max_length=11,blank=True,null=True)
    

    #imprimir o nome do aluno ao dar print no objeto

    def __str__(self):
        return self.nome

class RegistroEletiva(models.Model):
    escolhas =(
        ('Sim' , 1),
        ('Não' , 0),
    )
    eletiva = models.ForeignKey(Eletiva,on_delete=models.CASCADE)
    aluno = models.ForeignKey(Aluno,on_delete=models.CASCADE)
    data = models.DateTimeField("Data de criação", default=datetime.now())
    ativo = models.IntegerField("A eletiva está ativada", choices=escolhas, default=1)

    def __str__(self):
        return self.eletiva.nome + ' : ' + self.aluno.nome
    
    def add_registro_eletiva(self):
        eletiva = Eletiva.objects.get(pk = self.eletiva.pk)
        aluno = Aluno.objects.get()
        eletiva.vagas_usadas = eletiva.vagas_usadas + 1
        eletiva.save()
        return

    def atualizar_registros(self):
        eletiva = Eletiva.objects.get(pk = self.eletiva.pk)
        eletiva.vagas_usadas = RegistroEletiva.objects.filter(eletiva__pk = self.eletiva.pk).count()

        self.eletiva.save()                
