from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import JuegoView, PuntucionJuegoUsuarioView

routerJuego = DefaultRouter()
routerJuego.register(
    prefix="juego", basename="juego", viewset=JuegoView, 
)

routerPuntuacionJuego = DefaultRouter()
routerPuntuacionJuego.register(
    prefix="puntuacionJuego", basename="puntuacionJuego", viewset=PuntucionJuegoUsuarioView, 
)