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

from .models import Nivel
from .serializers import NivelSerializar
from permissions import is_Admin

class NivelView( mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,):
    
    queryset = Nivel.objects.all()
    serializer_class = NivelSerializar

    def get_permissions(self):
        if self.action == "list" or self.action == "retrieve" or self.action=="niveles_por_juego":
            permission_classes= []
        else:
            permission_classes = [IsAuthenticated, is_Admin ]

        return [permission() for permission in permission_classes]
    


    @action(detail=False, methods=['GET'])
    def niveles_por_juego(self, request):
        juego_id = request.query_params.get('juego_id')
        if juego_id is None:
            return Response("Se requiere proporcionar un ID de juego", status=status.HTTP_400_BAD_REQUEST)
        
        try:
            niveles = Nivel.objects.filter(juego_id=juego_id)
            serializer = NivelSerializar(niveles, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Nivel.DoesNotExist:
            return Response("No se encontraron niveles para el juego proporcionado", status=status.HTTP_404_NOT_FOUND)