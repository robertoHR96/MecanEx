from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import Juego
routerJuego = DefaultRouter()
routerJuego.register(
    prefix="juego", basename="juego", viewset=Juego, 
)