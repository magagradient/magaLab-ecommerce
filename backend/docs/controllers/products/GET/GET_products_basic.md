# 📘 Maga Lab - Products API Documentation

Esta documentación describe los endpoints disponibles para la gestión de productos (`products`) en la API de Maga Lab.

---

## 🧪 Recomendaciones para testear en Postman

- No se requieren headers ni parámetros especiales.
- Previo a la prueba, asegurarse de ejecutar `seed.js` si estás en entorno local.

---

## 🔗 Base URL:

`http://localhost:3000/api/products`

---

## 📦 Funcionalidades Básicas

## 📚 Endpoints disponibles en este archivo:

### 📦 GET `/api/products` → Obtener todos los productos
### 🆔 GET `/api/products/:id` → Obtener un producto por ID
### 🔁 GET `/api/products/status/:type` → Obtener productos por estado

---

## 📦 GET /api/products

**Método:** `GET`

**Endpoint:** `/api/products`

---

### 🧾 Descripción:

- Obtiene todos los productos disponibles en la base de datos.
- Incluye relaciones mediante Sequelize (`include`): category, series, keywords, colors, styles, themes.
- Ordenados por fecha de creación descendente (`createdAt`).

**🔗 Ejemplo de solicitud:**  
`GET http://localhost:3000/api/products`

### ✅ Respuesta exitosa (200):
```json
{
  "results": [
    {
      "id_product": 1,
      "title": "Portada Minimalista",
      "description": "Una portada minimalista para tu álbum.",
      "price": "25.99",
      "is_sold": false,
      "is_deleted": false,
      "visible_in_portfolio": true,
      "sold_at": null,
      "id_category": null,
      "id_series": 18,
      "createdAt": "2025-04-16T13:30:46.000Z",
      "updatedAt": "2025-04-16T13:30:46.000Z",
      "category": null,
      "series": {
        "id_series": 18,
        "title": "Serie Básica",
        "description": "Una serie cargada por seed",
        "cover_image": null
      },
      "keywords": [
        { "id_keyword": 63, "name": "Digital Art" }
      ],
      "colors": [
        { "id_color": 82, "name": "Rojo" },
        { "id_color": 83, "name": "Azul" }
      ],
      "styles": [
        { "id_style": 48, "name": "Minimalista" }
      ],
      "themes": [
        { "id_theme": 47, "name": "Oscuro" }
      ]
    }
  ],
  "total": 1,
  "status": "success",
  "source": "products",
  "timestamp": "2025-04-16T13:34:26.884Z"
}
```

> 💡 **Nota:** Se pueden excluir los campos `createdAt` y `updatedAt` usando `attributes: { exclude: [...] }` si no son necesarios en frontend.

## ❌ Errores posibles:

| Código | Descripción                 |
|--------|-----------------------------|
| 404    | No hay productos disponibles |
| 500    | Error interno del servidor   |


```json
{
  "error": "No hay productos disponibles."
}
```

```json
{
  "error": "Error interno del servidor",
  "description": "Detalles del error aquí."
}
```
---

### 🆔 GET api/products/:id

**Método:** `GET`

**Endpoint:** `/:id`

---

### 🧾 Descripción:

- Devuelve información detallada de un producto por su ID.
- Incluye todas las relaciones disponibles.
- ⚠️ Si usás seeds de prueba, los IDs pueden cambiar. `:id` debe ser un valor numérico.

---

**🔢 Parámetros:**

| Nombre | Tipo   | Descripción                         |
|--------|--------|-------------------------------------|
| id     | number | ID numérico del producto a buscar   |


**Ejemplo de Solicitud:**

`GET http://localhost:3000/api/products/13`


### ✅ Respuesta exitosa (200):
```json
{
    "status": "success",
    "product": {
        "id_product": 13,
        "title": "Portada Retro",
        "description": "Una portada con un estilo retro y nostálgico.",
        "price": "30.99",
        "is_sold": false,
        "is_deleted": false,
        "visible_in_portfolio": true,
        "sold_at": null,
        "id_category": 26,
        "id_series": 22,
        "createdAt": "2025-04-16T14:49:01.000Z",
        "updatedAt": "2025-04-16T14:49:01.000Z",
        "category": {
            "id_category": 26,
            "name": "Arte Digital"
        },
        "series": {
            "id_series": 22,
            "title": "Serie Básica",
            "description": "Una serie cargada por seed",
            "cover_image": null
        },
        "keywords": [
            {
                "id_keyword": 72,
                "name": "Arte Abstracto"
            }
        ],
        "styles": [
            {
                "id_style": 55,
                "name": "Minimalista"
            }
        ],
        "colors": [
            {
                "id_color": 92,
                "name": "Rojo"
            },
            {
                "id_color": 94,
                "name": "Verde"
            }
        ],
        "themes": [
            {
                "id_theme": 55,
                "name": "Claro"
            }
        ]
    },
    "source": "products/:id",
    "message": "Producto encontrado.",
    "timestamp": "2025-04-16T16:06:54.314Z"
}
```

## ❌ Posibles errores:

| Código | Descripción                 |
|--------|-----------------------------|
| 404    | Producto no encontrado      |
| 500    | Error al procesar la solicitud   |

---

### 🔁 GET /api/products/status/:type

**Método:** `GET`

**Endpoint:** `api/products/status/:type` 

---

### 🧾 Descripción:

- Devuelve una lista de productos filtrados por su estado: vendidos o disponibles.

- Incluye relaciones con category y series.

- El orden varía según el tipo:

     `"sold"` → ordenado por `sold_at DESC`

    `"available"` → ordenado por `createdAt DESC`

Ideal para mostrar secciones dinámicas en el frontend, como "Más recientes" o "Vendidos recientemente".
---

**Parámetros de Ruta:**

| Nombre | Tipo   | Descripción            | Valores permitidos     |
|--------|--------|------------------------|-------------------------|
| type   | string | Estado del producto    | `"sold"`, `"available"`     |


---

**🔗 Ejemplo de uso:** 

`GET /api/products/status/available` 

`GET /api/products/status/sold` 

**Ejemplo de Respuesta Exitosa (200):**
```json
{
  "status": "success",
  "results": [
    {
      "id_product": 1,
      "title": "Portada abstracta",
      "description": "Un diseño lleno de formas y líneas.",
      "price": "39.99",
      "is_sold": true,
      "is_deleted": false,
      "visible_in_portfolio": true,
      "sold_at": "2025-04-01T13:00:00.000Z",
      "id_category": 4,
      "id_series": 2,
      "category": {
        "id_category": 4,
        "name": "Ilustración"
      },
      "series": {
        "id_series": 2,
        "title": "Serie Completa",
        "description": "Serie original de venta limitada",
        "cover_image": null
      }
    }
  ],
  "total": 1,
  "filter": "sold",
  "ordered_by": "sold_at DESC",
  "source": "/products/status/:type",
  "timestamp": "2025-04-16T16:10:00.000Z"
}
```

## ❌ Posibles errores:

| Código | Descripción                 |
|--------|-----------------------------|
| 400    | 	Parámetro inválido (type no es "sold" ni "available")      |
| 500    | Error interno al procesar la solicitud  |


```json
{
  "status": "error",
  "message": "Parámetro inválido. Usá 'sold' o 'available'.",
  "timestamp": "2025-04-16T16:11:00.000Z"
}
```

```json
{
  "error": "Error interno del servidor",
  "description": "Detalles del error aquí."
}
```

> 💡 **Tip de desarrollo:** Este endpoint es útil para armar secciones dinámicas como "Más recientes" o "Vendidos recientemente" en el frontend.
