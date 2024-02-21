from rest_framework import serializers
from .models import Juego, PuntucionJuegoUsuario

class JuegoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Juego
        fields = "__all__"

class PuntuacionJuegoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuntucionJuegoUsuario 
        fields = "__all__"