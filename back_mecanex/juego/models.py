from django.db import models

from usuarios.models import Usuario
# Create your models here.
class Juego(models.Model):
    titulo = models.TextField(blank=False, default="", null=False)
    descripcion = models.TextField(blank=False, default="", null=False)


class PuntucionJuegoUsuario(models.Model):
    juego = models.ForeignKey(Juego, on_delete=models.CASCADE, null=False)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=False)
    puntuacion = models.IntegerField(blank=False, null=False)
    fecha = models.DateTimeField(auto_now_add=True,blank=False, null=False)