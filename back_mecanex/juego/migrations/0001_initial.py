# Generated by Django 4.2.6 on 2023-10-31 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Juego',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('texto', models.TextField(default='')),
                ('dificultad', models.IntegerField(default=1)),
            ],
        ),
    ]
