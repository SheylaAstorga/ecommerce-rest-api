# 🛒 API REST E-commerce

API REST desarrollada con **Node.js**, **Express** y **PostgreSQL**, siguiendo una arquitectura **MVC**, con autenticación mediante **JWT**, autorización por roles, validaciones con **express-validator** y documentación completa mediante **Swagger**.

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Token)
- bcrypt
- express-validator
- Swagger (swagger-jsdoc + swagger-ui-express)
- pnpm

---

## 📂 Arquitectura del proyecto

```
src/
├── config/
├── controllers/
├── docs/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── validators/
└── server.js
```

---

## ✨ Funcionalidades

- Registro e inicio de sesión de usuarios.
- Autenticación mediante JWT.
- Autorización por roles (Administrador / Usuario).
- CRUD de usuarios.
- CRUD de categorías.
- CRUD de productos.
- CRUD de pedidos.
- CRUD de detalles de pedidos.
- Gestión automática del stock al realizar una compra.
- Transacciones con PostgreSQL (BEGIN, COMMIT y ROLLBACK).
- Validación de datos.
- Documentación interactiva con Swagger.

---

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar al proyecto:

```bash
cd Mi-API
```

Instalar dependencias:

```bash
pnpm install
```

Crear el archivo `.env` con las variables correspondientes.

Iniciar el servidor:

```bash
pnpm start
```

---

## 🔐 Variables de entorno

Crear un archivo `.env` con las siguientes variables:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=ecommerce

JWT_SECRET=tu_clave_secreta
```

---

## 📚 Documentación Swagger

Una vez iniciado el servidor, acceder desde el navegador a:

```
http://localhost:3000/api-docs
```

Desde Swagger es posible:

- Consultar todos los endpoints.
- Probar cada operación.
- Autenticarse mediante el botón **Authorize** utilizando un JWT.

---

## 🗄️ Base de datos

La aplicación utiliza PostgreSQL.

Las principales entidades son:

- Usuarios
- Categorías
- Productos
- Pedidos
- Detalle de pedidos

---

## 👩‍💻 Autora

**Sheyla Astorga**

Estudiante de la Tecnicatura Universitaria en Programación (UTN) y desarrolladora Full Stack.

GitHub: *(agregar cuando el repositorio esté publicado)*