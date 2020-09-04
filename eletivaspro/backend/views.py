from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from django_filters import rest_framework as filters

from backend.models import *
from backend.serializers import *
from .errors import RegistrationError


class BasePagination(PageNumberPagination):
    page_size = 20
    page_query_param = 'page'
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'current': self.page.number,
            'count': self.page.paginator.count,
            'page_size': self.page_size,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })


class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    pagination_class = BasePagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('sige', )

    @action(methods=['get'], detail=True)
    def registros(self, request, pk=None):
        aluno = get_object_or_404(Aluno, pk=pk)
        registros = aluno.registros.all()
        serializer = RegistroSerializer(registros, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class EletivaViewSet(viewsets.ModelViewSet):
    queryset = Eletiva.objects.all()
    serializer_class = EletivaSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('dia', 'periodo', 'ativo')

    @action(methods=["get"], detail=True)
    def registros(self, request, pk=None):
        eletiva = get_object_or_404(Eletiva, pk=pk)
        serializer = RegistroSerializer(eletiva.registros.all(), many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["get"], detail=False)
    def ativas(self, request):
        queryset = Eletiva.objects.filter(ativo=False)
        serializer = EletivaSerializer(data=queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class RegistroViewSet(viewsets.ModelViewSet):
    queryset = Registro.objects.all()
    serializer_class = RegistroSerializer
    pagination_class = BasePagination

    def create(self, request, pk=None):
        serializer = RegistroSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            serializer.save()
        except Exception as error:
            return Response({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_200_OK)
