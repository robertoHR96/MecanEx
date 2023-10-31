from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class Usuario(AbstractUser):
    # T####his is a way to make the email field the username field.
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

