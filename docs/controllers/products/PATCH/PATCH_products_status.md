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

## ✏️ Modificaciones parciales

## 📚 Endpoints disponibles en este archivo:

### 🟧 PATCH `/api/products/:id/toggle-sold` → Cambiar estado de venta de un producto
### 🗑️ PATCH `/api/products/:id/soft-delete` → Marcar un producto como eliminado

---

## 🟧 PATCH api/products/:id/toggle-sold

**Método:** `PATCH`

**Endpoint:** `/api/products/:id/toggle-sold`

---

### 🧾 Descripción:
 
- Cambia el estado de venta (`is_sold`) de un producto especificado por su ID.
- Si el producto está marcado como vendido, lo cambia a disponible, y viceversa.
- Devuelve la información completa del producto actualizado, incluyendo relaciones.


**🔗 Ejemplo de solicitud:**  

`PATCH http://localhost:3000/api/products/13/toggle-sold`

**🔢 Parámetros de ruta:**

| Nombre | Tipo   | Requerido | Descripción |
|--------|--------|-----------|-------------|
| id     | int    | Sí        | ID del producto cuyo estado de venta se actualizará. |

### ✅ Respuesta exitosa (200):
```json
{
  "ok": true,
  "message": "El estado is_sold del producto con id 13 fue cambiado a true",
  "product": {
    "id_product": 13,
    "title": "Portada Retro",
    "description": "Una portada con un estilo retro y nostálgico.",
    "price": "30.99",
    "is_sold": true,
    "is_deleted": false,
    "visible_in_portfolio": true,
    "sold_at": null,
    "id_category": 26,
    "created_at": "2025-04-16T14:49:01.000Z",
    "updated_at": "2025-04-19T20:35:13.000Z",
    "id_series": 22,
    "category": {
      "id_category": 26,
      "name": "Arte Digital"
    },
    "images": [
      {
        "id_image": 15,
        "id_product": 13,
        "image_url": "https://miweb.com/img5.jpg"
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
    "styles": [
      {
        "id_style": 55,
        "name": "Minimalista"
      }
    ],
    "themes": [
      {
        "id_theme": 55,
        "name": "Claro"
      }
    ],
    "series": {
      "id_series": 22,
      "title": "Serie Básica",
      "description": "Una serie cargada por seed"
    },
    "keywords": [
      {
        "id_keyword": 72,
        "name": "Arte Abstracto"
      }
    ]
  }
}
```

## ❌ Posibles errores:

| Código | Descripción                 |
|--------|-----------------------------|
| 404    | Producto no encontrado.     |
| 500    | Error en el servidor        |


```json
{
  "ok": false,
  "message": "No se encontró un producto con id 13"
}
```

```json
{
  "ok": false,
  "message": "Error al cambiar el estado is_sold del producto",
  "error": "Detalles del error aquí."
}
```

>Este endpoint es útil para actualizar el estado de disponibilidad o venta de un producto sin tener que realizar una actualización completa.
---

## 🗑️ PATCH /products/:id/soft-delete

**Método:** `PATCH`

**Endpoint:** `/api/products/:id/soft-delete`

---

### 🧾 Descripción:
 
- Marca un producto como eliminado sin borrarlo físicamente de la base de datos (soft delete).
- Esto se logra cambiando el valor de `is_deleted` a `true`.
- Útil para mantener los datos almacenados sin mostrar productos eliminados en las vistas o interfaces.


**🔗 Ejemplo de solicitud:**

`PATCH http://localhost:3000/api/products/11/soft-delete`

**🔢 Parámetros de ruta:**

| Nombre | Tipo   | Requerido | Descripción |
|--------|--------|-----------|-------------|
| id     | int    | Sí        | ID del producto a marcar como eliminado. |

### ✅ Respuesta exitosa (200):
```json
{
  "message": "Producto marcado como eliminado (soft delete)",
  "data": {
    "id_product": 11,
    "title": "Portada Colorida",
    "description": "Una portada con muchos colores y formas.",
    "price": "45.99",
    "is_sold": false,
    "is_deleted": true,
    "visible_in_portfolio": true,
    "sold_at": null,
    "id_category": 26,
    "created_at": "2025-04-16T14:49:01.000Z",
    "updated_at": "2025-04-16T14:49:01.000Z",
    "id_series": 22,
    "createdAt": "2025-04-16T14:49:01.000Z",
    "updatedAt": "2025-04-19T20:48:56.325Z"
  }
}
```

## ❌ Posibles errores:

| Código | Descripción                 |
|--------|-----------------------------|
| 404    | Producto no encontrado.     |
| 400    | El producto ya está marcado como eliminado.        |
| 500    | Error en el servidor        |


```json
{
  "error": "Producto no encontrado"
}
```

```json
{
  "error": "El producto ya está marcado como eliminado"
}
```

```json
{
  "error": "Error al realizar el soft delete",
  "details": "Detalles del error aquí."
}
```
---

>Este endpoint permite realizar una "eliminación lógica" del producto sin perder los datos reales, facilitando la recuperación o auditoría futura.


