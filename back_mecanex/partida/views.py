from django.shortcuts import render
from rest_framework import viewsets, mixins
from django.views.generic import View
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import HttpResponse, HttpResponseForbidden
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Partida
from .serializers import PartidaByUserSerializer
class PartidaByUser( mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,):

    permission_classes = [IsAuthenticated]
    serializer_class = PartidaByUserSerializer

    def get_queryset(self):
        user = self.request.user.id
        print(user)
        queryset = Partida.objects.filter(usuario=user)
        return queryset