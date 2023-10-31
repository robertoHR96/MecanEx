from rest_framework import serializers
from .models import Juego

class JuegoSerializar(serializers.ModelSerializer):
    class Meta:
        model = Juego
        fields = "__all__"