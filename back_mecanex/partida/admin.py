from django.contrib import admin
from .models import Partida
# Register your models here.
@admin.register(Partida)
class Partida(admin.ModelAdmin):
    pass
