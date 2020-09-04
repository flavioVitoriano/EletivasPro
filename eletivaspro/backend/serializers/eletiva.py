from rest_framework import serializers
from backend.models import Eletiva, Registro, Aluno


class EletivaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eletiva
        fields = '__all__'


class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registro
        fields = '__all__'

    def create(self, validated_data):
        data = validated_data

        return Registro.registrar(aluno=data.get('aluno'), eletiva=data.get('eletiva'))
