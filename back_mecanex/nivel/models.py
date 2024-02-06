from django.db import models

#     Create your models here.
from juego.models import Juego

class Nivel(models.Model):
    juego = models.ForeignKey(Juego, on_delete=models.CASCADE)
    texto = models.TextField(blank=False, null=False, default="")
    dificultad = models.IntegerField(blank=False, null=False)

