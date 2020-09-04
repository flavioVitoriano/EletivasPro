from django.urls import path, include
from rest_framework.routers import DefaultRouter
from backend import views

app_name = "backend"
backendRouter = DefaultRouter()
backendRouter.register("alunos", views.AlunoViewSet, basename="alunos")
backendRouter.register("eletivas", views.EletivaViewSet, basename="eletivas")
backendRouter.register("registros", views.RegistroViewSet, "registros")

urlpatterns = [
    path('', include(backendRouter.urls))
]
