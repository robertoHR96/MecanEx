from django.contrib import admin
from .models import Nivel

# Register your models here.

@admin.register(Nivel)
class Nivel(admin.ModelAdmin):
    pass
