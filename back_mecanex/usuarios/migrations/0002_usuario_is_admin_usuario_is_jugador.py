# Generated by Django 4.2.6 on 2024-02-06 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='is_Admin',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usuario',
            name='is_Jugador',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
    ]