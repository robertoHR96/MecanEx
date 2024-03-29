"""
URL configuration for back_mecanex project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import include, re_path
from rest_framework_swagger.views import get_swagger_view
# Para la documentacion de la api
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from juego.urls import routerJuego, routerPuntuacionJuego
from nivel.urls import routerNivel, routerPuntuacionNivel
from usuarios.urls import *
urlpatterns = [


    path('admin/', admin.site.urls),

    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),

    # Rutas de la api de usuarios(AUTH)
    path("", include("usuarios.urls")),

    path("", include(routerJuego.urls)),
    path("", include(routerPuntuacionJuego.urls)),
    path("", include(routerNivel.urls)),
    path("", include(routerPuntuacionNivel.urls)),
    path("", include(routerUsuarios.urls)),
    path("", include(routerRegisterUsuarios.urls)),
    
]
