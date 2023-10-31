from django.db import models
from usuarios.models import Usuario
from juego.models import Juego
# Create your models here.
class Partida(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    juego = models.ForeignKey(Juego, on_delete=models.CASCADE)
    puntuacion = models.IntegerField(default=0, blank=False, null=False)
    fecha = models.DateField(auto_now_add=True)
