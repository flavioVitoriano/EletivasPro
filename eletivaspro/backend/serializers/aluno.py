from rest_framework import serializers
from backend.models import Aluno


class AlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aluno
        fields = '__all__'
