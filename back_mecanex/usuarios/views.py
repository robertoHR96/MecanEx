from django.shortcuts import render
from rest_framework import viewsets, mixins
from django.views.generic import View
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import HttpResponse, HttpResponseForbidden
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.decorators import action

from .models import Usuario
from .Serializers import * 
from permissions import is_Admin

"""
    Da los datos del usuario y deja modificar menos la contraseña
"""
class UsuariosView( 
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def get_permissions(self):
        if self.action == "retrieve" and self.action == "list":
            permission_classes = [IsAuthenticated]
        else :
            permission_classes = [IsAuthenticated, is_Admin]

        return [permission() for permission in permission_classes]
            
    def get_queryset(self):
        """
        It returns a queryset of Cliente objects that are filtered by the user_id of the user that is
        currently logged in
        Return:

            A queryset of Cliente objects that belong to the user.
        """
        return Usuario.objects.filter(id=self.request.user.id)


"""
    Registra a usuarios
"""

class RegisterUsuariosView(
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    permission_classes = []
    serializer_class = RegisterUsuariosSerializer

    def get_queryset(self):
        """
        It returns the user id of the user who is logged in.
        :return: The user object
        """
        return Usuario.objects.filter(id=self.request.user.id)

    def create(self, request, *args, **kwargs):
        """
        It creates a new object, then returns a response with a success message

        :param request: The request object
        :return: The response is a dictionary with a key of "success" and a value of "ok."
        """
        super().create(request, *args, **kwargs)
        return Response({"success": "ok."}, status=201)
