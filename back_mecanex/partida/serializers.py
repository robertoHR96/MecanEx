from rest_framework import serializers
from .models import Partida

class PartidaByUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partida
        fields = "__all__"