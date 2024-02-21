from rest_framework import serializers
from .models import Nivel, PuntucionNivelUsuario

class NivelSerializar(serializers.ModelSerializer):
    class Meta:
        model = Nivel 
        fields = "__all__"


class PuntucionNivelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuntucionNivelUsuario
        fields = "__all__"