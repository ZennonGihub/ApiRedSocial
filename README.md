# 🚀 API Red Social 🚀

API RESTful completa para una red social, diseñada con una arquitectura modular y escalable en Node.js. El sistema permite la gestión integral de usuarios, publicaciones, sistema de seguidores, interacciones y seguridad mediante JWT y API Keys.

## Credenciales para probrar la api

Para probar los endpoints protegidos, puedes usar este
| Usuario | Contraseña |
|:---: | :---: |
| `dev_prueba` | `123456` |

📝 Para probar las rutas protegias en Swagger

Ve al endpoint POST /auth/login y usa las credenciales de arriba.

Copia el Token que recibes en la respuesta (sin comillas).

Sube al inicio de la página y haz clic en el botón "Authorize" 🔓.

Pega el token y dale a Authorize.

Luego en apiKey, coloca: "123" y apreta Authorize

Ahora el candado estará cerrado 🔒 y y podrás usar todas las funciones

## 🏗️ Arquitectura y Diseño

El proyecto sigue una arquitectura Monolítica Modular, con la intencion de poder facilitar el mantenimiento y la escalabilidad a futuro.

Patrón de Diseño

Se utiliza el patrón Controller-Service-Network (una variante de MVC para APIs):

Network (Rutas): Recibe la petición HTTP y la pasa al controlador.

Controller: Maneja la lógica de negocio.

Store (Repository): Abstrae la conexión a la base de datos, lo que permite cambiar de motor fácilmente si es necesario.

Diagrama Entidad-Relación
![Diagrama de Base de Datos](./img/Diagrama.jpeg)

La base de datos está normalizada y diseñada para integridad referencial con eliminación en cascada

## Tecnologias

**Lenguaje y Base de Datos:**

- **Node.js & Express:** Arquitectura RESTful.
- **MySQL:** Base de datos relacional principal.
- **Redis:** Base de datos en memoria utilizada para **Caching** y reducción de latencia en consultas frecuentes.

**Librerías:**

**Seguridad y Autenticación:**

- 👮 **Passport.js:** Middleware de autenticación robusto (Estrategia Local/JWT).
- 🔑 **jsonwebtoken (JWT):** Manejo de sesiones stateless.
- 🔐 **bcryptjs:** Encriptación segura de contraseñas.
- 🛡️ **Joi:** Validación estricta de esquemas de datos.

**Utilidades:**

- 💥 **Boom:** Manejo de errores HTTP amigables y estandarizados.
- 📄 **swagger-ui-express:** Documentación visual de la API.
- 🌐 **cors:** Gestión de políticas de acceso cruzado.
- ⚙️ **dotenv:** Configuración de entorno segura.

## ⚙️ Instalación y Configuración Local

### (Preerequisitos: Tener redis)

> ⚠️ **Nota Importante:** Si solo deseas probar la API, no es necesario instalar nada.
> 👉 **[Probar de manera online](https://api-red-social-five.vercel.app/api-docs/)**

1. Clonar el repositorio

```bash
git clone https://github.com/ZennonGihub/ApiRedSocial
cd ApiRedSocial
```

2. Instalar dependencias

```bash
npm install
```

3. crear archivo .env clonando los datos del env-example

```properties
PORT=3000
API_KEY=tu_api_key

# -- Seguridad (JWT) --
JWT_SECRET=tu_secreto_super_seguro

# -- Base de Datos (MySQL) --
DB_NAME=nombre_base_datos
DB_USER=root
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=3306

# -- Redis (Caché) --
REDIS_URL=redis://default:password@host:port
REDIS_PASSWORD=redis_password
REDIS_HOST=redis_host
REDIS_PORT=18444
```

4. Ejecutar el proyecto

```bash
npm run dev
```
