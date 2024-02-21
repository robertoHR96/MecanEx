from django.db import models

#     Create your models here.
from juego.models import Juego
from usuarios.models import Usuario

class Nivel(models.Model):
    juego = models.ForeignKey(Juego, on_delete=models.CASCADE)
    texto = models.TextField(blank=False, null=False, default="")
    dificultad = models.IntegerField(blank=False, null=False)

class PuntucionNivelUsuario(models.Model):
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE, null=False)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=False)
    puntuacion = models.IntegerField(blank=False, null=False)
    fecha = models.DateTimeField(auto_now_add=True,blank=False, null=False)