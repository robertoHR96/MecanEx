from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import * 

urlpatterns = [
    # A path to obtain a token.
    path("auth/login/", TokenObtainPairView.as_view(), name="login"),
    # A path to refresh the token.
    path("auth/refresh/", TokenRefreshView.as_view(), name="refresh"),
    # path("empresa/RegisterUser/", EmpresaRegisterUser.as_view()),
    # path("empresa/LoginUser/", EmpresaLoginUser.as_view()),
]

routerUsuarios = DefaultRouter()
routerUsuarios.register(
    prefix="Usuarios", basename="Usuarios", viewset=UsuariosView
)
routerRegisterUsuarios = DefaultRouter()
routerRegisterUsuarios.register(
    prefix="RegisterUsuarios", basename="RegisterUsuarios", viewset=RegisterUsuariosView
)
