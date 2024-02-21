from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import NivelView, PuntucionNivelUsuarioView 
routerNivel = DefaultRouter()
routerNivel.register(
    prefix="nivel", basename="nivel", viewset=NivelView, 
)

routerPuntuacionNivel = DefaultRouter()
routerPuntuacionNivel.register(
    prefix="puntuacionNivel", basename="puntuacionNivel", viewset=PuntucionNivelUsuarioView, 
)


