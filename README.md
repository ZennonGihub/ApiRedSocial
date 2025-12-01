# 🚀 API Red Social 🚀

API RESTful completa para una red social, diseñada con una arquitectura modular y escalable en Node.js. El sistema permite la gestión integral de usuarios, publicaciones, sistema de seguidores, interacciones y seguridad mediante JWT y API Keys.

## Credenciales para Reclutadores

Para probar los endpoints protegidos, puedes usar este
| Usuario | Contraseña |
:---: | :---: |
| `dev_prueba` | `123456` |

📝 Para probar la seguridad en Swagger

Ve al endpoint POST /auth/login y usa las credenciales de arriba.

Copia el Token que recibes en la respuesta (sin comillas).

Sube al inicio de la página y haz clic en el botón "Authorize" 🔓.

Pega el token y dale a Authorize.

Luego en apiKey, coloquen: "123" y apretar Authorize

Ahora el candado estará cerrado 🔒 y y podrás usar todas las funciones

## 🏗️ Arquitectura y Diseño

El proyecto sigue una arquitectura Monolítica Modular, con la intencion de poder facilitar el mantenimiento y la escalabilidad a futuro.

Patrón de Diseño

Se utiliza el patrón Controller-Service-Network (una variante de MVC para APIs):

Network (Rutas): Recibe la petición HTTP y la pasa al controlador.

Controller: Orquesta la lógica de negocio.

Store (Repository): Abstrae la conexión a la base de datos (MySQL), permitiendo cambiar de motor fácilmente.

Diagrama Entidad-Relación (ERD)

La base de datos está normalizada y diseñada para integridad referencial con eliminación en cascada

## ⚙️ Instalación y Configuración Local

1. Clonar el repositorio

```bash
git clone https://github.com/ZennonGihub/ApiRedSocial
cd CursoNodeJs
```

2. Instalar dependencias

```bash
npm install
```

3. crear archivo .env clonando los datos del env-example

4. Ejecutar el proyecto

```bash
npm run dev
```
