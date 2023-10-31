from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import *


routerPartidaByUser = DefaultRouter()
routerPartidaByUser.register(
    prefix="partidaByUser", basename="partidaByUser", viewset=PartidaByUser
)