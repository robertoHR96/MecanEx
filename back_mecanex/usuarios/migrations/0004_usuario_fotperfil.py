# Generated by Django 4.2.6 on 2024-02-15 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0003_usuario_edad'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='fotPerfil',
            field=models.BinaryField(null=True),
        ),
    ]