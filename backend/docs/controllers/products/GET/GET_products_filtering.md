# 📘 Maga Lab - Products API Documentation

Esta documentación describe los endpoints disponibles para la gestión de productos (`products`) en la API de Maga Lab.

---

### 🧪 Recomendaciones para testear en Postman

- No se requieren headers ni parámetros.

- Previo a la prueba, asegurarse de ejecutar seed.js si estás en entorno local.

🔗 Base URL:

`http://localhost:3000/api/products`

---

## 🔎 Funcionalidades de Búsqueda y Filtrado

## 📚 Endpoints disponibles en este archivo:

### 🔍🛒 GET `/api/products/search` → Buscar productos por texto y relaciones  
### 🎛️🛍️ GET `/api/products/filter` → Filtrar productos por múltiples criterios

---

### 🛒🔍 GET /api/products/search

**Método:** `GET`  

**Endpoint:** `/api/products/search`  

### 🧾 Descripción:

- Permite buscar productos por coincidencia parcial en el título, descripción, categoría, serie, estilos, colores, temas y palabras clave. La búsqueda no distingue mayúsculas/minúsculas.

---

**🔢 Parámetros:**

| Nombre | Tipo   | Requerido | Descripción |
|--------|--------|-----------|-------------|
| term   | string | Sí        | Término de búsqueda que se comparará contra el título, descripción y relaciones del producto. |

---

**Ejemplo de Solicitud:**

`GET http://localhost:3000/api/products/search?term=diseño geométrico`

---

### ✅ Respuesta exitosa (200):

```json
{
    "message": "Resultados de la búsqueda.",
    "results": [
        {
            "id_product": 18,
            "title": "Portada Geométrica",
            "description": "Portada con un diseño geométrico y minimalista.",
            "price": "80.99",
            "is_sold": false,
            "is_deleted": false,
            "visible_in_portfolio": true,
            "sold_at": null,
            "id_category": 26,
            "id_series": 22,
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
                    "id_keyword": 73,
                    "name": "Naturaleza"
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
                    "id_color": 96,
                    "name": "Morado"
                }
            ],
            "themes": [
                {
                    "id_theme": 58,
                    "name": "Suave"
                }
            ]
        }
    ],
    "total": 1,
    "timestamp": "2025-04-16T15:05:35.013Z"
}
````
----

## ❌ Posibles errores:

| Código | Descripción                 |
|--------|-----------------------------|
| 400    | Se requiere un término de búsqueda.      |
| 500    | Error al realizar la búsqueda.   |


- Cuando no se envía ningún term en la query string, o está vacío:

```json
{
  "message": "Se requiere un término de búsqueda.",
  "timestamp": "2025-04-16T14:56:21.125Z"
}
```

- Cuando hay un error inesperado en la base de datos o el servidor:

```json
{
  "message": "Error al realizar la búsqueda.",
  "error": "Detalles del error aquí.",
  "timestamp": "2025-04-16T14:56:21.125Z"
}
```
---

### 🛍️🎛️ GET /products/filter

**Método:** `GET`

**Endpoint:** `/api/products/filter`

----

### 🧾 Descripción:
- Permite aplicar múltiples filtros combinables sobre productos, incluyendo texto, relaciones y rangos de precios.
- La búsqueda es case-insensitive y admite coincidencias parciales.

---

**🔢 Parámetros:**

| Nombre      | Descripción                                                                 |
|-------------|-----------------------------------------------------------------------------|
| title       | Filtra por el título del producto.                                          |
| description | Filtra por la descripción del producto.                                     |
| keyword     | Filtra por la palabra clave (relacionada con el modelo Keywords).           |
| category    | Filtra por la categoría del producto.                                       |
| series      | Filtra por la serie del producto.                                           |
| style       | Filtra por el estilo del producto.                                          |
| color       | Filtra por el color del producto.                                           |
| theme       | Filtra por el tema del producto.                                            |
| price_min   | Filtra productos cuyo precio sea mayor o igual a este valor.                |
| price_max   | Filtra productos cuyo precio sea menor o igual a este valor.                |
| is_sold     | Filtra productos por su estado de venta (`true` o `false`).                 |

---

**Ejemplo de Solicitud:**

`GET http://localhost:3000/api/products/filter?color=Verde&style=Moderno`

---

### ✅ Respuesta exitosa (200):
```json
{
  "status": "success",
  "results": [
    {
      "id_product": 11,
      "title": "Portada Colorida",
      "description": "Una portada con muchos colores y formas.",
      "price": "45.99",
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
      "styles": [
        {
          "id_style": 57,
          "name": "Moderno"
        }
      ],
      "colors": [
        {
          "id_color": 94,
          "name": "Verde"
        }
      ],
      "themes": [
        {
          "id_theme": 56,
          "name": "Neutro"
        }
      ]
    },
    {
      "id_product": 17,
      "title": "Portada Surrealista",
      "description": "Una portada surrealista que desafía la realidad.",
      "price": "70.99",
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
      "styles": [
        {
          "id_style": 57,
          "name": "Moderno"
        }
      ],
      "colors": [
        {
          "id_color": 94,
          "name": "Verde"
        }
      ],
      "themes": [
        {
          "id_theme": 56,
          "name": "Neutro"
        }
      ]
    }
  ],
  "total": 2,
  "source": "products/filter",
  "message": "Productos filtrados correctamente.",
  "timestamp": "2025-04-16T15:33:28.576Z"
}
```

⚠️ Nota: los campos `createdAt` y `updatedAt` están presentes solo en entorno de desarrollo. Se excluirán en producción mediante `attributes: { exclude: [...] }.`

---

## ❌ Posibles errores:

| Código | Descripción                 |
|--------|-----------------------------|
| 400    | Error en los parámetros de la solicitud.      |
| 500    | Error al realizar la búsqueda.   |


```json
{
  "message": "Error en los parámetros de la solicitud.",
  "timestamp": "2025-04-16T14:56:21.125Z"
}

```

- Cuando hay un error inesperado en la base de datos o el servidor:

```json
{
  "message": "Error al realizar la búsqueda.",
  "error": "Detalles del error aquí.",
  "timestamp": "2025-04-16T14:56:21.125Z"
}
```


