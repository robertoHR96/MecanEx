from django.contrib import admin
from .models import Juego
# Register your models here.

@admin.register(Juego)
class Juego(admin.ModelAdmin):
    pass