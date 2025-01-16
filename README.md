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
    - Renombrar el archivo `.env.example` a `.env` y configurar los valores necesarios (serán enviados por mail los que
      fueron utilizados al momento de realizar el challenge).


3. Construir y levantar los contenedores Docker:
   ```bash
   docker-compose up --build
   ```


4. Acceder a la aplicación en: `http://localhost:3000`

---

### 🖼️ Capturas de pantalla

Puedes encontrar las capturas de pantalla [aquí](./assets/screenshots).

---

### 📖 Documentación de la API

Al ser una API con pocos endpoints (un único controlador), se documentarán los mismos a continuación (no se utiliza
Swagger):

1. **GET /patient** - Listar pacientes
    - **Respuesta exitosa:**
        - `200 OK` - Lista de productos.
    - **Respuesta de error:**
        - `500 Internal Server Error` - Error del servidor.


2. **POST /patient** - Crear paciente
    - **Parámetros:**
        - `name` - Nombre del paciente.
        - `email` - Correo electrónico del paciente.
        - `phone` - Teléfono del paciente.
        - `address` - Dirección del paciente.
        - `photo` - Foto del paciente (opcional, archivo).

    - **Respuesta exitosa:**
        - `201 Created` - Paciente creado.
    - **Respuesta de error:**
        - `400 Bad Request` - Parámetros inválidos.
        - `500 Internal Server Error` - Error del servidor.

---

