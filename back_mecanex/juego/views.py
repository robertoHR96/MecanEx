from django.shortcuts import render
from rest_framework import viewsets, mixins,  pagination
from django.views.generic import View
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import HttpResponse, HttpResponseForbidden
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Juego, PuntucionJuegoUsuario
from .serializers import *
from permissions import is_Admin

class CustomPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class JuegoView( mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,):
    
    queryset = Juego.objects.all()
    serializer_class = JuegoSerializer

    def get_permissions(self):
        if self.action == "list" or self.action == "retrieve":
            permission_classes= []
        else:
            permission_classes = [IsAuthenticated, is_Admin ]

        return [permission() for permission in permission_classes]


class PuntucionJuegoUsuarioView(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet):
    
    serializer_class = PuntuacionJuegoSerializer
    permission_classes= [IsAuthenticated]
    pagination_class = CustomPagination

    def get_queryset(self):
        if self.action == "list":
            return get_list_or_404(PuntucionJuegoUsuario, usuario=self.request.user.id)
        else:
            return get_object_or_404(PuntucionJuegoUsuario, usuario=self.request.user.id)
    
    
    def perform_create(self, serializer):
        if self.request.user.id != serializer.validated_data['usuario'].id:
            raise PermissionDenied("No tienes permiso para crear una puntuación para otro usuario.")
        serializer.save()