from django.db import models

# Create your models here.
class Juego(models.Model):
    titulo = models.TextField(blank=False, default="", null=False)
    descripcion = models.TextField(blank=False, default="", null=False)