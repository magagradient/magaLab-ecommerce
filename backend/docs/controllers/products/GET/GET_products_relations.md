# 📘 Maga Lab - Products API Documentation

Esta documentación describe los endpoints disponibles para la gestión de productos (`products`) en la API de Maga Lab.

---

### 🧪 Recomendaciones para testear en Postman

- No se requieren headers ni parámetros.

- Previo a la prueba, asegurarse de ejecutar seed.js si estás en entorno local.

🔗 Base URL:

`http://localhost:3000/api/products`

---

## 🔗 Funcionalidades de Relaciones

## 📚 Endpoints disponibles en este archivo:

### 🤝📦 GET `/api/products/:id/related` → Obtener productos relacionados  
### 🛍️🔗 GET `/api/products/:id/relations` → Obtener relaciones asociadas a un producto

---

### 🤝📦 GET /api/products/:id/related

**Método:** `GET`  

**Endpoint:** `/api/products/:id/related`  

### 🧾 Descripción:

- Devuelve una lista de productos relacionados con el producto especificado por `:id`.
- La relación se establece mediante coincidencias en categorías, series, estilos, colores, temas y palabras clave.
- Excluye el producto original de los resultados.
- El resultado está ordenado por fecha de creación (`createdAt DESC`) y limitado por defecto a 10 elementos (ajustable con `?limit=`).

---

**🔢 Parámetros de ruta:**

| Nombre | Tipo   | Requerido | Descripción |
|--------|--------|-----------|-------------|
| id     | int    | Sí        | ID del producto base a comparar. |


**🔢 Parámetros de query:**

| Nombre | Tipo   | Requerido | Descripción |
|--------|--------|-----------|-------------|
| limit  | int    | No        | Cantidad máxima de productos relacionados a retornar. Por defecto: 10. |

---

**Ejemplo de Solicitud:**

`GET http://localhost:3000/api/products/18/related?limit=5`

---

### ✅ Respuesta exitosa (200):

```json
{
  "message": "Productos relacionados obtenidos correctamente.",
  "data": [
    {
      "id_product": 6,
      "title": "Portada Abstracta",
      "description": "Una portada con formas abstractas y colores vivos.",
      "price": "60.00",
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
        { "id_keyword": 73, "name": "Naturaleza" }
      ],
      "styles": [
        { "id_style": 55, "name": "Minimalista" }
      ],
      "colors": [
        { "id_color": 96, "name": "Morado" }
      ],
      "themes": [
        { "id_theme": 58, "name": "Suave" }
      ]
    }
  ],
  "total": 1,
  "timestamp": "2025-04-19T18:52:43.019Z"
}
````
----

## ❌ Posibles errores:

| Código | Descripción                 |
|--------|-----------------------------|
| 400    | Producto no encontrado.     |
| 500    | Error en el servidor.       |


```json
{
  "message": "Producto no encontrado.",
  "timestamp": "2025-04-19T18:50:22.511Z"
}
```

```json
{
  "message": "Error al obtener productos relacionados.",
  "error": "Detalles del error aquí.",
  "timestamp": "2025-04-19T18:50:22.511Z"
}
```
---

### 🛍️🔗 GET api/products/:id/relations

**Método:** `GET`

**Endpoint:** `/api/products/:id/relations`

----

### 🧾 Descripción:

- Devuelve las relaciones asociadas al producto especificado por :id.

- Incluye información sobre las categorías, estilos, colores, temas, series y palabras clave asociadas a ese producto.

- El producto original no se incluye en las relaciones.

- El resultado está ordenado por la fecha de creación (createdAt DESC), con un límite por defecto de 10 relaciones (ajustable con el parámetro ?limit=).
---

**🔢 Parámetros de ruta:**

| Nombre | Tipo   | Requerido | Descripción |
|--------|--------|-----------|-------------|
| id     | int    | Sí        | ID del producto cuyas relaciones deseas obtener. |


**🔢 Parámetros de query:**

| Nombre | Tipo   | Requerido | Descripción |
|--------|--------|-----------|-------------|
| limit  | int    | No        | Número máximo de relaciones a retornar. Por defecto: 10. |


---

**Ejemplo de Solicitud:**

`GET http://localhost:3000/api/products/18/relations?limit=5`

---

### ✅ Respuesta exitosa (200):
```json
{
  "message": "Relaciones del producto obtenidas correctamente.",
  "data": {
    "id_product": 18,
    "title": "Portada Abstracta",
    "keywords": [
      { "id_keyword": 73, "name": "Naturaleza" }
    ],
    "styles": [
      { "id_style": 55, "name": "Minimalista" }
    ],
    "colors": [
      { "id_color": 96, "name": "Morado" }
    ],
    "themes": [
      { "id_theme": 58, "name": "Suave" }
    ],
    "series": {
      "id_series": 22,
      "title": "Serie Básica"
    },
    "category": {
      "id_category": 26,
      "name": "Arte Digital"
    }
  },
  "total": 1,
  "timestamp": "2025-04-19T18:52:43.019Z"
}
```
---

## ❌ Posibles errores:

| Código | Descripción                 |
|--------|-----------------------------|
| 400    | Producto no encontrado.     |
| 500    | Error en el servidor.       |


```json
{
  "message": "Producto no encontrado.",
  "timestamp": "2025-04-19T18:50:22.511Z"
}
```

```json
{
  "message": "Error al obtener relaciones del producto.",
  "error": "Detalles del error aquí.",
  "timestamp": "2025-04-19T18:50:22.511Z"
}
```


