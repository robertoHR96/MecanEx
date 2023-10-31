from django.db import models

# Create your models here.
class Juego(models.Model):
    texto = models.TextField(blank=False, default="", null=False)
    dificultad = models.IntegerField(default=1, blank=False, null=False)