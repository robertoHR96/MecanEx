from django.contrib import admin
from .models import Juego, PuntucionJuegoUsuario
# Register your models here.

@admin.register(Juego)
class Juego(admin.ModelAdmin):
    pass

@admin.register(PuntucionJuegoUsuario)
class PuntucionJuegoUsuario(admin.ModelAdmin):
    pass