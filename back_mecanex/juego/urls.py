from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import JuegoView
routerJuego = DefaultRouter()
routerJuego.register(
    prefix="juego", basename="juego", viewset=JuegoView, 
)