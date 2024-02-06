from rest_framework import serializers
from .models import Nivel

class NivelSerializar(serializers.ModelSerializer):
    class Meta:
        model = Nivel 
        fields = "__all__"