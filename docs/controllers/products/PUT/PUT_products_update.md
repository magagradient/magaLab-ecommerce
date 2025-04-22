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

## 🛠️ Asignación de relaciones

## 📚 Endpoints disponibles en este archivo:

### 🟪 PUT `/api/products/:idProduct/assign/:relationType` → Asignar relaciones a un producto
### 🔄 PUT `/api/products/:id` → Actualizar un producto
### 🔗 PUT `/api/products/:id/relations` → Actualizar relaciones de un producto


## ENDPOINTS: 

## 🟪 PUT /products/:idProduct/assign/:relationType

**Método:** `PUT`

**Endpoint:** `/api/products/:idProduct/assign/:relationType`

---

### 🧾 Descripción:
 
- Asigna uno o varios elementos de una relación a un producto específico, indicado por su ID.
- La relación puede ser styles, colors, themes, shapes, etc.
- Devuelve la información actualizada del producto, incluyendo las asociaciones correspondientes.


**🔢 Parámetros de ruta:**

| Nombre        | Tipo   | Requerido | Descripción                                                            |
|---------------|--------|-----------|------------------------------------------------------------------------|
| idProduct     | int    | Sí        | ID del producto al cual se le asignarán relaciones.                    |
| relationType  | string | Sí        | Tipo de relación a asignar (styles, colors, themes, shapes, etc.).     |

**Ejemplo de Solicitud:**

| Qué hacer        | URL                                           | Body Ejemplo              |
|------------------|-----------------------------------------------|---------------------------|
| Asignar estilos  | `PUT /api/products/105/assign/styles`         | `{ "styles": [81] }`      |
| Asignar colores  | `PUT /api/products/105/assign/colors`         | `{ "colors": [5, 6] }`    |
| Asignar temáticas| `PUT /api/products/105/assign/themes`         | `{ "themes": [3] }`       |


## 📥 Body (JSON):
```json
{
  "styles": [81]
}
```
o
```json
{
  "colors": [5, 6]
}
```

o
```json
{
  "themes": [3]
}
```

## ✅ Respuesta exitosa (200):
```json
{
  "message": "Relación 'styles' asignada correctamente.",
  "data": {
    // objeto del producto actualizado
  },
  "timestamp": "2025-04-20T23:55:05.418Z"
}
```
>Nota: el mensaje cambiará dinámicamente según el tipo de relación asignada.

### ❌ Errores posibles:

| Código | Descripción                 |
|--------|-----------------------------|
| 400    | Se requiere un array de IDs para asignar.     |
| 400    | Tipo de relación no es válido.     |
| 404    | Producto no encontrado.       |
| 400    | Uno o más IDs proporcionados no son válidos.       |
| 500    | Error al asignar relación al producto.    |

```json
{
  "message": "Se requiere un array de IDs para asignar.",
  "timestamp": "2025-04-21T12:34:56Z"
}
```

```json
{
  "message": "Tipo de relación 'invalidRelation' no es válido.",
  "validRelations": ["tags", "styles", "colors", "themes", "keywords"],
  "timestamp": "2025-04-21T12:34:56Z"
}
```

```json
{
  "message": "Producto no encontrado.",
  "timestamp": "2025-04-21T12:34:56Z"
}
```

```json
{
  "message": "Uno o más IDs proporcionados no son válidos.",
  "timestamp": "2025-04-21T12:34:56Z"
}

```json
{
  "message": "Error al asignar relación 'tags' al producto.",
  "error": "Detalles del error aquí.",
  "timestamp": "2025-04-21T12:34:56Z"
}
```

>Este endpoint permite asignar dinámicamente estilos, colores, temáticas u otras categorías a un producto en la plataforma Maga Lab.

---
### 🔄 PUT /api/products/:id

**Método:** `PATCH`

**Endpoint:** `/api/products/:id`

---

### 🧾 Descripción:
 
- Actualiza los datos de un producto existente.
- Solo se actualizarán los campos enviados en el cuerpo de la solicitud (`req.body`).


**🔢 Parámetros de ruta:**

| Nombre | Tipo   | Requerido | Descripción |
|--------|--------|-----------|-------------|
| id     | int    | Sí        | ID del producto que se desea actualizar. |


## 📥 Body (JSON):

| Campo        | Tipo     | Requerido | Descripción |
|--------------|----------|-----------|-------------|
| title        | string   | No        | Título del producto. |
| description  | string   | No        | Descripción del producto. |
| price        | decimal  | No        | Precio del producto. |
| is_sold      | boolean  | No        | Estado de venta (true si ya se vendió, false si todavía está disponible). |
| sold_at      | date     | No        | Fecha en que el producto fue vendido (formato ISO 8601). |
| id_category  | int      | No        | ID de la categoría a la cual pertenece el producto. |
| id_series    | int      | No        | ID de la serie a la cual pertenece el producto (puede ser null si no pertenece a ninguna serie). |

>⚡ Nota: Solo es necesario enviar los campos que quieras actualizar. Los que no envíes, se mantienen como están.

**Ejemplo de Solicitud:**

http://localhost:3000/api/products/109

**Body:**
```json
{
    "title": "Portada Abstracta Moderna 3",
    "price": 29.00,
    "is_sold": true
}
```

### ✅ Respuesta exitosa (200):
```json
{
    "id_product": 109,
    "title": "Portada Abstracta Moderna 3",
    "description": "Portada moderna con un estilo abstracto y colores vibrantes.",
    "price": "29.00",
    "is_sold": true,
    "is_deleted": false,
    "visible_in_portfolio": true,
    "sold_at": null,
    "id_category": 31,
    "created_at": "2025-04-20T23:34:47.000Z",
    "updated_at": "2025-04-21T01:14:00.000Z",
    "id_series": 27,
    "createdAt": "2025-04-20T23:34:47.000Z",
    "updatedAt": "2025-04-21T01:14:00.000Z",
    "category": {
        "id_category": 31,
        "name": "Arte Digital"
    },
    "series": {
        "id_series": 27,
        "title": "Serie Básica",
        "description": "Una serie cargada por seed",
        "cover_image": null
    }
}
```

### ❌ Errores posibles:

| Código | Descripción                 |
|--------|-----------------------------|
| 404    | Producto no encontrado.     |
| 500    | Error interno del servidor. |


Cuando el producto con el id especificado no existe.

```json
{
  "error": "Producto no encontrado."
}
```

Si ocurre un problema interno en el servidor.

```json
{
  "error": "Error interno del servidor",
  "description": "Descripción técnica del error"
}
```

---

>Este endpoint permite actualizar los datos de un producto existente en el sistema. Se pueden modificar atributos como el título, la descripción, el precio, y otros campos asociados al producto.

---

### 🔄 🔗 PUT /api/products/:id/relations

**Método:** `PATCH`

**Endpoint:** `/api/products/:id/relations`

---

### 🧾 Descripción:
 
- Actualiza relaciones de un producto, como serie, categoría, palabras clave, estilos, colores, temas e imágenes.


**🔢 Parámetros de ruta:**

| Nombre | Tipo   | Requerido | Descripción |
|--------|--------|-----------|-------------|
| id     | int    | Sí        | ID del producto. |


**Ejemplo de Solicitud:**

`PUT http://localhost:3000/api/products/109`

**Body:**
```json
{
    "id_series": 27,  
    "id_category": 31 
}
```

- `id_series` (opcional): El ID de la serie a la que pertenece el producto.

- `id_category` (opcional): El ID de la categoría a la que pertenece el producto.

- `keywords` (opcional): Un arreglo de palabras clave asociadas al producto.

- `styles` (opcional): Un arreglo de estilos del producto.

- `colors` (opcional): Un arreglo con los colores asociados al producto.

- `themes` (opcional): Un arreglo con los temas asociados al producto.

- `images` (opcional): Un arreglo de objetos con las URLs de las imágenes y su texto alternativo (alt_text).

### ✅ Respuesta exitosa (200):
```json
{
    "message": "Relaciones actualizadas correctamente.",
    "data": {
        "id_product": 108,
        "title": "Portada Clásica",
        "description": "Portada con un diseño clásico y atemporal.",
        "price": "40.99",
        "is_sold": false,
        "is_deleted": false,
        "visible_in_portfolio": true,
        "sold_at": null,
        "id_category": 31,
        "created_at": "2025-04-20T23:34:47.000Z",
        "updated_at": "2025-04-20T23:34:47.000Z",
        "id_series": 27,
        "createdAt": "2025-04-20T23:34:47.000Z",
        "updatedAt": "2025-04-20T23:34:47.000Z",
        "keywords": [],
        "styles": [
            {
                "id_style": 84,
                "name": "Clásico",
                "ProductStyles": {
                    "id_product": 108,
                    "id_style": 84
                }
            }
        ],
        "colors": [
            {
                "id_color": 121,
                "name": "Morado",
                "ProductColors": {
                    "id_product": 108,
                    "id_color": 121
                }
            }
        ],
        "themes": [
            {
                "id_theme": 83,
                "name": "Suave",
                "ProductThemes": {
                    "id_product": 108,
                    "id_theme": 83
                }
            }
        ],
        "series": {
            "id_series": 27,
            "title": "Serie Básica",
            "description": "Una serie cargada por seed",
            "cover_image": null
        },
        "images": [
            {
                "id_image": 67,
                "id_product": 108,
                "image_url": "https://miweb.com/img7.jpg"
            }
        ],
        "category": {
            "id_category": 31,
            "name": "Arte Digital"
        }
    },
    "timestamp": "2025-04-21T02:08:16.153Z"
}
```
Explicación de la respuesta:

- `message`: Mensaje de éxito.

- `data`: Objeto con los datos actualizados del producto, incluyendo todas las relaciones asociadas (serie, categoría, palabras clave, estilos, colores, temas, imágenes).

- `timestamp`: Fecha y hora en la que se generó la respuesta.

### ❌ Errores posibles:

| Código | Descripción                 |
|--------|-----------------------------|
| 404    | Producto no encontrado.     |
| 400    | La serie proporcionada no existe. |
| 400    | La categoría proporcionada no existe.     |
| 500    | Error al actualizar relaciones del producto. |

Si el producto con el id proporcionado no existe.

```json
{
    "message": "Producto no encontrado.",
    "timestamp": "2025-04-21T02:08:16.153Z"
}
```

Si el `id_series` proporcionado no corresponde a una serie válida.

```json
{
    "message": "La serie proporcionada no existe.",
    "timestamp": "2025-04-21T02:08:16.153Z"
}
```

Si el `id_category` proporcionado no corresponde a una categoría válida.

```json
{
    "message": "La categoría proporcionada no existe.",
    "timestamp": "2025-04-21T02:08:16.153Z"
}
```

En caso de que ocurra un error interno al intentar actualizar las relaciones.

```json
{
    "message": "Error al actualizar relaciones del producto.",
    "error": "Descripción del error",
    "timestamp": "2025-04-21T02:08:16.153Z"
}
```

---

>Este endpoint permite actualizar las relaciones de un producto de manera eficiente, asociando o modificando las categorías, series, estilos, colores, temas e imágenes del producto sin necesidad de crear nuevos productos. La actualización de estas relaciones facilita la organización y categorización de los productos dentro de la plataforma.

---


