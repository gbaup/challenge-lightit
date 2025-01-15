## ⚡️ Challenge Light-It

### 🚀 Tecnologías utilizadas

- **NestJS** - Framework para construir aplicaciones del lado del servidor.
- **MySQL** - Base de datos relacional.
- **Docker** - Herramienta para la contenedorización de aplicaciones.
- **TypeORM** - ORM para manejar la base de datos.

---

### ⚙️ Requisitos previos

1. Docker y Docker Compose instalados ([descargar aquí](https://www.docker.com/get-started)).
2. Node.js y npm instalados ([descargar aquí](https://nodejs.org/)).

---

### 🛠️ Configuración e instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/gbaup/challenge-lightit.git
   cd challenge-lightit
   ```

2. Configurar variables de entorno:
    - Renombrar el archivo `.env.example` a `.env` y configurar los valores necesarios:
      ```env
      DB_HOST=localhost
      DB_PORT=5678
      DB_USER=admin
      DB_PASSWORD=admin
      DB_NAME=challenge
      ```

3. Construir y levantar los contenedores Docker:
   ```bash
   docker-compose up --build
   ```


4. Acceder a la aplicación en: `http://localhost:3000`

---


### 🖼️ Capturas de pantalla

(Opcional) Incluye imágenes o gifs para mostrar funcionalidades clave.

---

### 📖 Documentación de la API

(Opcional) Describe las rutas principales o incluye un enlace a la documentación Swagger:
> La documentación completa de la API está disponible en: `http://localhost:3000/api`.

---

