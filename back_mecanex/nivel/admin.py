from django.contrib import admin
from .models import Nivel, PuntucionNivelUsuario

# Register your models here.

@admin.register(Nivel)
class Nivel(admin.ModelAdmin):
    pass

@admin.register(PuntucionNivelUsuario)
class PuntucionNivelUsuario(admin.ModelAdmin):
    pass