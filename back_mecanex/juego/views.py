from django.shortcuts import render
from rest_framework import viewsets, mixins
from django.views.generic import View
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import HttpResponse, HttpResponseForbidden
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Juego
from .serializers import *
from permissions import is_Admin

class JuegoView( mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,):
    
    queryset = Juego.objects.all()
    serializer_class = JuegoSerializar

    def get_permissions(self):
        if self.action == "list" or self.action == "retrieve":
            permission_classes= []
        else:
            permission_classes = [IsAuthenticated, is_Admin ]

        return [permission() for permission in permission_classes]


