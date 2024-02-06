from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import NivelView 
routerNivel = DefaultRouter()
routerNivel.register(
    prefix="nivel", basename="nivel", viewset=NivelView, 
)


