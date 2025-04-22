<!-- omit in toc -->
# 🛍️ Maga Lab: ecommerce de diseños digitales para músicos - Backend.

Maga Lab es una plataforma de ecommerce especializada en la venta de diseños digitales exclusivos creados para músicos y bandas, principalmente para portadas de álbumes y/o canciones/single. Estos diseños están optimizados para su uso en plataformas de streaming como Spotify, Apple Music, YouTube, SoundCloud, entre otras. En el futuro, Maga Lab planea expandir sus servicios para incluir otros productos gráficos relacionados con la identidad visual de los artistas.

El sistema permite a los usuarios explorar, filtrar y adquirir diseños de forma sencilla y autónoma.

Este es el backend del proyecto, desarrollado con Node.js y Express, utilizando Sequelize como ORM para una base de datos relacional (MySQL).

---

## 📚 Índice
- [📚 Índice](#-índice)
- [🚀 Features](#-features)
- [🖥️ Tecnologías (implementadas hasta el momento)](#️-tecnologías-implementadas-hasta-el-momento)
- [🔧 Scripts disponibles](#-scripts-disponibles)
- [📦 Instalación](#-instalación)
- [📂 Estructura del proyecto](#-estructura-del-proyecto)
- [⚙️ Configuración del Servidor](#️-configuración-del-servidor)
  - [Flujo del archivo:](#flujo-del-archivo)
  - [Dependencias principales:](#dependencias-principales)
- [🌱 Seeder (`seed.js`)](#-seeder-seedjs)
  - [¿Cómo usarlo?](#cómo-usarlo)
- [📄 `config.json` - Configuración de la Base de Datos](#-configjson---configuración-de-la-base-de-datos)
  - [Estructura:](#estructura)
  - [Variables:](#variables)
  - [Ejemplo de configuración para el entorno de desarrollo:](#ejemplo-de-configuración-para-el-entorno-de-desarrollo)
- [🖼️ `multerConfig.js` – Configuración para subida de archivos](#️-multerconfigjs--configuración-para-subida-de-archivos)
  - [📁 Ubicación de subida](#-ubicación-de-subida)
  - [🔧 Lógica del archivo](#-lógica-del-archivo)
    - [1. Dependencias:](#1-dependencias)
    - [2. Directorio de destino:](#2-directorio-de-destino)
    - [3. Almacenamiento personalizado (`diskStorage`):](#3-almacenamiento-personalizado-diskstorage)
    - [4. Exportación:](#4-exportación)
  - [📦 Ejemplo de uso en una ruta](#-ejemplo-de-uso-en-una-ruta)
- [🌐 `connection.js` – Configuración de la conexión a la Base de Datos](#-connectionjs--configuración-de-la-conexión-a-la-base-de-datos)
  - [**Dependencias**:](#dependencias)
  - [**Variables de entorno utilizadas**:](#variables-de-entorno-utilizadas)
  - [**Configuración de Sequelize**:](#configuración-de-sequelize)
  - [**Lógica del archivo**:](#lógica-del-archivo)
- [🧩 Middlewares](#-middlewares)
  - [Ubicación:](#ubicación)
  - [Uso principal:](#uso-principal)
  - [Ejemplo de log en consola:](#ejemplo-de-log-en-consola)
  - [Código:](#código)
- [🗂️ Modelos (`/models`)](#️-modelos-models)
- [Convención de nombres](#convención-de-nombres)
- [Lista de modelos](#lista-de-modelos)
- [📘 Glosario de términos comunes en e-commerce (inglés)](#-glosario-de-términos-comunes-en-e-commerce-inglés)

---

## [🚀 Features](#-features)

- Filtro avanzado de productos (categoría, estilo, color, tema, palabras clave, etc.)
- CRUD de productos digitales

- API RESTful con Express
- Base de datos relacional con Sequelize + MySQL

- Modularización de controladores, rutas y servicios
- Testeos con Postman (en progreso)

- Middleware para carga de archivos con Multer
- Seguridad con Helmet y CORS


---

##  [🖥️ Tecnologías (implementadas hasta el momento)](#-tecnologías-implementadas-hasta-el-momento)


- **Principales:**
  - Node.js, Express, Sequelize, MySQL2

- **Utilitarias:**
  - Nodemon, dotenv, multer

- **Seguridad:**
  - helmet, cors

- **Node.js (v20.9.0 o superior)**: Entorno de ejecución para JavaScript.
- **Express (v4.21.2)**: Framework web para Node.js.
- **Sequelize (v6.37.6)**: ORM para interactuar con bases de datos relacionales (MySQL).
- **MySQL2**: Paquete para interactuar con bases de datos MySQL.

---

## [🔧 Scripts disponibles](#-scripts-disponibles)

| Comando                 | Descripción                                        |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `npm run dev`           | Inicia el servidor en modo desarrollo con Nodemon, ideal para la fase de desarrollo. |
| `npm start`             | Inicia el servidor en modo producción. Se recomienda para despliegues en producción. |
| `npm run seed`          | Ejecuta el script de seeding general, que carga datos básicos en la base de datos.   |



---

## [📦 Instalación](#-instalación)

1. Clonar el repositorio:
   ```bash
   git clone 
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar el entorno:
   - Crear un archivo `.env` basado en `.env-example` con las siguientes variables:

     ```
     DB_HOST=127.0.0.1
     DB_USER=your_user
     DB_PASSWORD=your_password
     DB_NAME=your_db
     PORT=3000
     ```

4. Iniciar servidor:

   - Modo producción:
     ```bash
     npm start
     ```

   - Modo desarrollo:
     ```bash
     npm run dev
     ```

El servidor correrá en `http://localhost:3000/` (o en el puerto que especifiques).

---

## [📂 Estructura del proyecto](#-estructura-del-proyecto)

```
magaLab-ecommerce/
├── docs/                       # Documentación del proyecto
│   ├── controllers/            # Documentación relacionada con los controladores
│   │   └── controllers.md      # Resumen general de los controladores
│   ├── README.md               # Documento de introducción general al proyecto
│   └── relations.md            # Documentación detallada de las relaciones entre modelos
├── node_modules/               # Dependencias de Node.js
├── src/                        # Código fuente
│   ├── config/                 # Configuración
│   │   ├── config.json         # Configuración general
│   │   └── multerConfig.js     # Configuración de multer
│   ├── controllers/            # Lógica del backend (endpoints)
│   ├── database/               # Conexión a la base de datos
│   │   ├── connection.js       # Conexión a la base de datos
│   ├── middlewares/            # Middlewares de la aplicación
│   ├── models/                 # Modelos de Sequelize
│   ├── routes/                 # Rutas (endpoints)
├── uploads/                    # Archivos subidos
├── .env                        # Variables de entorno
├── .env-example                # Ejemplo de archivo .env
├── package-lock.json           # Archivo de bloqueo de dependencias
├── package.json                # Dependencias y scripts
├── seed.js                     # Archivo de semillas (moved to root)
└── server.js                   # Entrada principal del servidor
```

---

## [⚙️ Configuración del Servidor](#-configuración-del-servidor)

El archivo `server.js` es el punto de entrada principal de la aplicación. En él, se configura el servidor **Express**, se agregan los middlewares necesarios y se establece la conexión con la base de datos.

### Flujo del archivo:

1. **Importación de dependencias**:  
   Se importan las librerías de seguridad (`helmet`, `cors`), middlewares personalizados y las rutas del proyecto.

2. **Middlewares de seguridad y datos**:  
   - **`helmet()`**: Protege la aplicación configurando cabeceras HTTP.
   - **`cors()`**: Permite la comunicación entre diferentes dominios.
   - **`express.json()`**: Middleware para interpretar las solicitudes JSON.
   - **`dbMiddleware`**: Middleware personalizado para gestionar la base de datos.

3. **Rutas**:  
   Se configura una ruta base para la API (`/api`) que luego es extendida en otros archivos de rutas.

4. **Manejo de errores globales**:  
   En caso de que se produzca un error, se captura a nivel global y se responde con un mensaje genérico, pero en el archivo `server.js` está implementado un logger para registrar el error completo con detalles como la ruta solicitada y el tipo de error. Esto facilita la depuración.

5. **Conexión con la base de datos**:  
   La base de datos se conecta antes de que el servidor comience a aceptar peticiones. Si la conexión falla, el servidor no se inicia.

### Dependencias principales:
- **Express**: Framework para crear el servidor.
- **Helmet**: Middleware de seguridad.
- **CORS**: Permite solicitudes entre dominios.
- **Middleware personalizado**: `dbMiddleware` para la conexión con la base de datos.

---

## [🌱 Seeder (`seed.js`)](#-seeder-seedjs)

El archivo `seed.js` se utiliza para poblar la base de datos con datos de ejemplo o predeterminados. Esto facilita las pruebas y permite al equipo de desarrollo verificar rápidamente la funcionalidad de la plataforma. Puedes personalizar los datos insertados modificando este archivo.

1. El archivo seed.js:  
Carga todos los datos base: categorías, series, colores, estilos, productos, imágenes y sus relaciones. Hace un "reset" de las tablas necesarias, pero sin borrar todas las relaciones importantes, y maneja el resto de forma modular.

### ¿Cómo usarlo?
Para ejecutar el seeder, utilizar el siguiente comando:

```bash
npm run seed
``` 

---

## [📄 `config.json` - Configuración de la Base de Datos](#-configjson---configuración-de-la-base-de-datos)

Este archivo contiene las configuraciones para conectar con la base de datos en diferentes entornos (desarrollo, prueba y producción).

### Estructura:

- **development**: Configuración para el entorno de desarrollo.
- **test**: Configuración para el entorno de prueba.
- **production**: Configuración para el entorno de producción.

### Variables:

- **username**: Nombre de usuario para la base de datos.
- **password**: Contraseña para el usuario de la base de datos.
- **database**: Nombre de la base de datos.
- **host**: Dirección del servidor de base de datos (por defecto: `127.0.0.1`).
- **dialect**: El tipo de base de datos (en este caso, MySQL).

### Ejemplo de configuración para el entorno de desarrollo:

```json
{
    "development": {
        "username": "TU_USUARIO",
        "password": "TU_CONTRASEÑA",
        "database": "NOMBRE_DB_DEV",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}
````
---

##  [🖼️ `multerConfig.js` – Configuración para subida de archivos](#-multerconfigjs--configuración-para-subida-de-archivos)

Este archivo define la configuración de **Multer**, un middleware de Node.js que permite manejar archivos `multipart/form-data`, como imágenes.

Se utiliza principalmente para guardar imágenes de productos subidas al servidor, organizándolas en una carpeta específica.

---

### [📁 Ubicación de subida](#-ubicación-de-subida)

- Las imágenes se almacenan en:  
  `uploads/products/`
- Si la carpeta no existe, el sistema la crea automáticamente al ejecutarse.

---

### [🔧 Lógica del archivo](#-lógica-del-archivo)

#### 1. Dependencias:

- **`multer`**: Middleware para manejar archivos.
- **`path`**: Utilizado para construir rutas de forma segura.
- **`fs`**: Permite trabajar con el sistema de archivos.

#### 2. Directorio de destino:

- Se define `uploadDir` como la ruta absoluta hacia `uploads/products/`.
- Se verifica si la carpeta existe. Si no, se crea con `fs.mkdirSync`.

#### 3. Almacenamiento personalizado (`diskStorage`):

- **`destination`**: Indica dónde guardar los archivos subidos.
- **`filename`**: Renombra el archivo usando un prefijo y la fecha actual  
  (por ejemplo: `product-1713123938910.png`).

#### 4. Exportación:

- Se exporta la instancia `upload`, lista para ser usada como middleware en rutas que reciban archivos.

### [📦 Ejemplo de uso en una ruta](#-ejemplo-de-uso-en-una-ruta)

```js
const upload = require("../config/multerConfig");

router.post("/upload", upload.single("image"), (req, res) => {
  res.send("Imagen subida con éxito");
});
````

---

## [🌐 `connection.js` – Configuración de la conexión a la Base de Datos](#-connectionjs--configuración-de-la-conexión-a-la-base-de-datos)

Este archivo se encarga de configurar la conexión entre la aplicación y la base de datos utilizando **Sequelize**, un ORM de Node.js. El archivo lee las variables de entorno para establecer la configuración y luego exporta la instancia de Sequelize para ser utilizada en otras partes de la aplicación.

---

### **Dependencias**:

- **Sequelize**: ORM utilizado para interactuar con la base de datos MySQL.
- **dotenv**: Permite cargar las variables de entorno desde un archivo `.env`.

---

### **Variables de entorno utilizadas**:

- **`DATABASE`**: Nombre de la base de datos.
- **`DBUSER`**: Nombre de usuario para la base de datos.
- **`PASSWORD`**: Contraseña del usuario de la base de datos.
- **`HOST`**: Dirección del servidor de base de datos (por defecto, `127.0.0.1`).

---

### **Configuración de Sequelize**:

- **`dialect`**: Especifica el tipo de base de datos que se está utilizando (en este caso, **MySQL**).
- **`logging`**: Deshabilita el registro de las consultas SQL en la consola (`false` para no mostrar logs).
- **`pool`**: Configura el grupo de conexiones a la base de datos. Los parámetros son:
  - **`max`**: Número máximo de conexiones en el pool.
  - **`min`**: Número mínimo de conexiones en el pool.
  - **`acquire`**: Tiempo máximo (en milisegundos) para que una conexión sea adquirida.
  - **`idle`**: Tiempo máximo (en milisegundos) para que una conexión inactiva se cierre.

---

### **Lógica del archivo**:

1. **Carga de variables de entorno**:  
   Se carga el archivo `.env` utilizando `dotenv.config()` para acceder a las variables de entorno.

2. **Configuración de Sequelize**:  
   Se crea una instancia de **Sequelize** utilizando las variables de entorno para conectar con la base de datos.

3. **Exportación de la instancia de Sequelize**:  
   La instancia `sequelize` se exporta para ser utilizada en otras partes de la aplicación, permitiendo ejecutar consultas a la base de datos.

---

## [🧩 Middlewares](#-middlewares)

Los middlewares se encargan de interceptar y procesar las solicitudes HTTP antes de que lleguen a los controladores. Por ejemplo, el middleware `dbMiddleware` se asegura de que la conexión a la base de datos esté activa antes de cada solicitud, mientras que `helmet` y `cors` son utilizados para asegurar que las cabeceras HTTP sean correctas y permitir solicitudes de dominios cruzados.

`db_middleware.js`

Este middleware mide el tiempo de respuesta de cada solicitud HTTP y muestra un log en la consola con los siguientes datos:

- Método de la solicitud (`GET`, `POST`, etc.)
- Ruta accedida
- Código de estado de la respuesta
- Duración total del procesamiento en milisegundos

### Ubicación:
`src/middlewares/db_middleware.js`

### Uso principal:
Útil para desarrollo y debugging. Permite identificar cuellos de botella o rutas lentas sin necesidad de herramientas externas.

### Ejemplo de log en consola:


### Código:

```js
const dbMiddleware = (req, res, next) => {
    const startTime = Date.now(); // Mide el tiempo de inicio

    res.on("finish", () => { // Ejecuta cuando la respuesta ha sido enviada
        const duration = Date.now() - startTime; 
        console.log(`📡 ${req.method} ${req.url} - Status: ${res.statusCode} - ${duration}ms`);
    });

    next();
};

module.exports = dbMiddleware;
````
Estado actual:
No se está utilizando activamente en producción, pero se mantiene en el proyecto como herramienta útil para análisis de rendimiento o debugging futuro.

---

## [🗂️ Modelos (`/models`)](#️-modelos-models)

Esta carpeta contiene la definición de todos los modelos Sequelize del proyecto **Maga Lab**. Cada archivo representa una tabla en la base de datos y define su estructura, tipos de datos y configuraciones específicas.

## Convención de nombres

- Cada archivo representa un modelo y está en formato `snake_case`.
- Los modelos exportan una función que recibe `sequelize` y `DataTypes`, y devuelven la definición del modelo.

## Lista de modelos

| Archivo                | Descripción                                                  |
|------------------------|--------------------------------------------------------------|
| `authors.js`           | Autores de entradas del blog.                                |
| `blog_posts.js`        | Publicaciones del blog.                                      |
| `cart_items.js`        | Ítems dentro de un carrito de compras.                       |
| `categories.js`        | Categorías asignadas a los productos.                        |
| `colors.js`            | Colores disponibles para productos.                          |
| `coupons.js`           | Cupones de descuento.                                        |
| `download_links.js`    | Enlaces únicos para descarga de productos digitales.         |
| `favorite_images.js`   | Imágenes favoritas de los usuarios.                          |
| `favorite_series.js`   | Series favoritas de los usuarios.                            |
| `invoices.js`          | Facturas generadas por pedidos.                              |
| `keywords.js`          | Palabras clave asociadas a productos.                        |
| `orders.js`            | Pedidos realizados por los usuarios.                         |
| `orders_products.js`   | Relación muchos-a-muchos entre pedidos y productos.          |
| `password_changes.js`  | Historial de cambios de contraseña.                          |
| `password_resets.js`   | Solicitudes de recuperación de contraseña.                   |
| `payments.js`          | Pagos realizados por los usuarios.                           |
| `payment_methods.js`   | Métodos de pago disponibles.                                 |
| `products.js`          | Productos disponibles en el ecommerce.                       |
| `product_colors.js`    | Relación entre productos y colores.                          |
| `product_images.js`    | Imágenes asociadas a los productos.                          |
| `product_keywords.js`  | Relación entre productos y keywords.                         |
| `product_styles.js`    | Relación entre productos y estilos.                          |
| `product_themes.js`    | Relación entre productos y temáticas.                        |
| `product_variants.js`  | Variantes específicas de productos.                          |
| `series.js`            | Series de productos o colecciones.                           |
| `shopping_carts.js`    | Carritos de compras por usuario.                             |
| `styles.js`            | Estilos aplicables a productos.                              |
| `themes.js`            | Temas o categorías estéticas para productos.                 |
| `users.js`             | Información de los usuarios registrados.                     |
| `user_coupons.js`      | Cupones que han sido asignados a usuarios.                   |
| `index.js`             | Exporta todos los modelos para ser utilizados en el proyecto.|

---

> ⚠️ Algunos modelos no tienen relaciones explícitas (aún), como `payments`, `payment_methods`, `download_links`, etc. Están documentados en la sección "Modelos sin relaciones directas".


---

## [📘 Glosario de términos comunes en e-commerce (inglés)](#-glosario-de-términos-comunes-en-e-commerce-inglés)

| Término        | Significado                                                       |
|----------------|-------------------------------------------------------------------|
| **Product**     | Producto.                                                        |
| **Cart**        | Carrito de compras.                                              |
| **Checkout**    | Proceso de finalización de compra.                              |
| **Order**       | Pedido realizado por un cliente.                                |
| **Invoice**     | Factura emitida por una compra.                                 |
| **Coupon**      | Cupón de descuento.                                              |
| **Keyword**     | Palabra clave usada para búsqueda o categorización.             |
| **Style**       | Estilo visual del diseño.                                        |
| **Theme**       | Tema estético general del diseño (dark, vaporwave, etc.).        |
| **Variant**     | Variante específica del producto (ej: tamaño o color diferente). |
| **User**        | Usuario registrado.                                              |
| **Favorite**    | Elemento marcado como favorito por un usuario.                  |
| **Series**      | Conjunto de productos relacionados (colección).                  |
| **Download Link**| Enlace único para que el cliente descargue su producto.         |
| **Payment Method** | Método utilizado para realizar un pago.                     |

---

> 📌 Este glosario se irá ampliando a medida que el proyecto crezca.
