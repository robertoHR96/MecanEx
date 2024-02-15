from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class Usuario(AbstractUser):
    # T####his is a way to make the email field the username field.
    email = models.EmailField(unique=True)
    is_Admin = models.BooleanField(null = False)
    is_Jugador = models.BooleanField(null = False)
    edad = models.IntegerField(default=0, null=False, blank=False)
    fotPerfil = models.BinaryField(null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

