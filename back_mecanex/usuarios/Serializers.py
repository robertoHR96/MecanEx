from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "username", "first_name", "last_name", "email", ]

class RegisterUsuariosSerializer(serializers.ModelSerializer):
    # *|CURSOR_MARCADOR|*
    class Meta:
        # Telling the serializer that it is going to be used to create a new user.
        model = Usuario
        # Telling the serializer to use the email, username, and password fields of the Usuario model.
        fields = [
            "email",
            "username",
            "password",
            "first_name",
            "last_name",
            "edad",
        ]

    # se sobreescribe el metodo create para que se pueda guardar la contraseña encriptada
    def create(self, validated_data):
        """
        We create a new user, then we get the user from the database, then we set the password, then we
        save the user
        
        :param validated_data: The data that has been validated by the serializer
        :return: The instance of the user that has been created.
        """
        modeloUsuarios = Usuario
        # cogemos los datos del usuario del JSON de la llamada a la api
        # Guardamos el user nuevo en la BD
        usuario_data_obj = Usuario.objects.create(**validated_data, is_Jugador=True, is_Admin=False)
        # buscamos una instancia del usuario para cifrar su password
        instance = modeloUsuarios.objects.get(id=usuario_data_obj.id)
        # ciframos su password
        instance.set_password(usuario_data_obj.password)
        # salvamos la instancia para guardar su nueva contraseña
        instance.save()
        return instance