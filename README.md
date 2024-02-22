# Mecanex

Mecanex es una aplicación diseñada para mejorar la velocidad y precisión en la mecanografía a través de niveles progresivos. Esta aplicación ha sido creada utilizando Django para el backend y React para el frontend.

<img src="https://raw.githubusercontent.com/robertoHR96/MecanEx/main/assets/capExample.png"/>

## Características

- **Niveles progresivos:** Avanza a través de desafíos de mecanografía cada vez más difíciles a medida que mejoras tus habilidades.
- **Seguimiento de progreso:** Visualiza tu progreso y estadísticas para identificar áreas de mejora.
- **Interfaz intuitiva:** Diseño limpio y amigable para una experiencia de usuario mejorada.
- **Backend robusto:** Desarrollado con Django, ofreciendo seguridad y escalabilidad.
- **Frontend dinámico:** Utiliza React para una interfaz de usuario interactiva y receptiva.

## Tecnologías Utilizadas

- **Backend:** Django
- **Frontend:** React
- **Base de Datos:** (Especificar aquí la base de datos utilizada, por ejemplo, SQLite, PostgreSQL)
- **Lenguajes:** Python, JavaScript (ES6+)
- **Herramientas adicionales:** (Agregar cualquier otra herramienta o biblioteca importante utilizada, como Webpack, Babel, etc.)

## Instalación

1. Clona este repositorio: `git clone https://github.com/tu_usuario/mecanex.git`
2. Instala las dependencias del backend:

`cd ./back_mecanex`

  ` -- x -- pip install -r requirements.txt`

3. Realiza las migraciones de la BD:

Para realizar las migraciones de la base de datos debes tener configurar uan base de datos que concuerde con el apartado `DATABASES = []` alojado en el fichero `MecanEX/back_mecanex/back_mecanex/settings.py`. Puedes modificar este apartado o crear una BD con estas epecificaciones.

Despues se ejecutaran los comandos para crear las tablas en dicha base datos con los siguientes dos comandos:

`python manage.py makemigrations`

`python manage.py migrate`

4. Instala las dependencias del frontend:

`cd ./mecanex`

`npm install`

## Uso

1. Inicia el servidor backend:

`cd ./back_mecanex`

`python manage.py runserver`

3. Inicia el servidor frontend en otra terminal:

`cd ./mecanex`

`npm start`

4. Accede a la aplicación desde tu navegador: `http://localhost:3000`

## Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/feature-name`).
3. Realiza tus cambios y haz commits describiendo detalladamente las modificaciones.
4. Haz push de tu rama (`git push origin feature/feature-name`).
5. Abre un Pull Request.

## Créditos

Este proyecto fue creado por Roberto Hermoso https://github.com/robertoHR96 y está inspirado en la necesidad de mejorar la mecanografía de manera progresiva.

## Licencia


