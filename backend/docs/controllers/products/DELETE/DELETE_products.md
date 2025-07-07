# 📘 Maga Lab - Products API Documentation

Esta documentación describe los endpoints disponibles para la gestión de productos (`products`) en la API de Maga Lab.

---

### 🧪 Recomendaciones para testear en Postman

- No se requieren headers ni parámetros.

- Previo a la prueba, asegurarse de ejecutar seed.js si estás en entorno local.

🔗 Base URL:

`http://localhost:3000/api/products`

---

## 🟥 DELETE - Eliminación de productos o relaciones. 

## 📚 Endpoints disponibles en este archivo:

### 🗑️🔗 DELETE `/api/products/:id` → Eliminar un producto por ID
### 🛠️🔗 DELETE `/api/products/:id/relations/:relationType/:relationId` → Eliminar una relación de un producto

---

### 🗑️🔗 DELETE /api/products/:id

**Método:** `DELETE`  

**Endpoint:** `/api/products/:id`  

### 🧾 Descripción:

- Elimina un producto existente identificado por su :id.
- Devuelve el objeto del producto eliminado, incluyendo sus asociaciones (category y series).
- La eliminación es permanente (no es soft delete).

---

**🔢 Parámetros de ruta:**

| Nombre | Tipo   | Requerido | Descripción |
|--------|--------|-----------|-------------|
| id     | int    | Sí        | ID del producto que se desea eliminar. |


---

**Ejemplo de Solicitud:**

`DELETE http://localhost:3000/api/products/112`

---

### ✅ Respuesta exitosa (200):

```json
{
  "message": "Producto eliminado correctamente.",
  "deleted": {
    "id_product": 112,
    "title": "Portada Minimalista",
    "description": "Una portada minimalista para tu álbum.",
    "price": "25.99",
    "is_sold": false,
    "is_deleted": false,
    "visible_in_portfolio": true,
    "sold_at": null,
    "id_category": 32,
    "created_at": "2025-04-21T20:40:52.000Z",
    "updated_at": "2025-04-21T20:40:52.000Z",
    "id_series": 28,
    "createdAt": "2025-04-21T20:40:52.000Z",
    "updatedAt": "2025-04-21T20:40:52.000Z",
    "category": {
      "id_category": 32,
      "name": "Arte Digital"
    },
    "series": {
      "id_series": 28,
      "title": "Serie Básica",
      "description": "Una serie cargada por seed",
      "cover_image": null
    }
  }
}
```
----

## ❌ Posibles errores:

| Código | Descripción                 |
|--------|-----------------------------|
| 404    | Producto no encontrado.     |
| 500    | 	Error al eliminar producto.|


```json
{
  "error": "Producto no encontrado."
}
```

```json
{
  "error": "Error interno del servidor",
  "description": "Detalles del error aquí."
}
```
---

### 🛠️🔗 DELETE /api/products/:idProduct/remove/:relationType/:relationId

**Método:** `DELETE`  

**Endpoint:** `/api/products/:idProduct/remove/:relationType/:relationId`  

### 🧾 Descripción:

- Elimina una relación específica (por ejemplo, un estilo, color, palabra clave, etc.) asociada a un producto determinado.

---

**🔢 Parámetros:**


| Parám.        | Tipo     | Ubicación | Descripción                                      |
|---------------|----------|-----------|--------------------------------------------------|
| idProduct     | integer  | path      | ID del producto del cual eliminar la relación.  |
| relationType  | string   | path      | Tipo de relación a eliminar (`tags`, `styles`, `colors`, `themes`, `keywords`). |
| relationId    | integer  | path      | ID del elemento asociado que se desea eliminar. |

---

**Ejemplo de Solicitud:**

`DELETE http://localhost:3000/api/products/113/remove/styles/86`

---

### ✅ Respuesta exitosa (200):

```json
{
  "message": "Relación 'styles' con ID '86' eliminada correctamente.",
  "data": {
    "id_product": 113,
    "title": "Portada Abstracta",
    "description": "Una portada con diseño abstracto.",
    "price": "35.99",
    "is_sold": false,
    "is_deleted": false,
    "visible_in_portfolio": true,
    "sold_at": null,
    "id_category": 32,
    "created_at": "2025-04-21T20:40:52.000Z",
    "updated_at": "2025-04-21T20:40:52.000Z",
    "id_series": 28,
    "createdAt": "2025-04-21T20:40:52.000Z",
    "updatedAt": "2025-04-21T20:40:52.000Z",
    "styles": []
  },
  "timestamp": "2025-04-21T20:55:21.316Z"
}
```
----

## ❌ Posibles errores:

| Código | Descripción                 |
|--------|-----------------------------|
| 400    | Tipo de relación no válido. |
| 404    | Producto no encontrado.     |
| 404    | Elemento relacionado no encontrado.     |
| 500    | Error al eliminar la relación del producto.|


Cuando el tipo de relación no es válido:
```json
{
  "error": "Tipo de relación 'styles' no es válido.",
  "validRelations": ["tags", "styles", "colors", "themes", "keywords"]
}
```

Cuando no se encuentra el producto:
```json
{
  "error": "Producto no encontrado."
}
```

Cuando no se encuentra el elemento asociado:
```json
{
  "error": "Elemento con ID '86' no encontrado en 'styles'."
}
```

Cuando ocurre un error al eliminar la relación:
```json
{
  "error": "Error al eliminar la relación 'styles'.",
  "description": "Detalles del error aquí."
}
```

---