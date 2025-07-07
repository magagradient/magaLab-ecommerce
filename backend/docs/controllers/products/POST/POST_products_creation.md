# 📘 Maga Lab - Products API Documentation

Esta documentación describe los endpoints disponibles para la gestión de productos (`products`) en la API de Maga Lab.

---

## 🧪 Recomendaciones para testear en Postman

- No se requieren headers ni parámetros especiales.
- Previo a la prueba, asegurarse de ejecutar `src/database/seed.js` si estás en entorno local.

---

## 🔗 Base URL:

`http://localhost:3000/api/products`

---

## 🟨 Creación de productos

### 📚 Endpoints disponibles:

### ➕ POST `/api/products` → Crear un producto
### 📦 POST `/api/products/bulk-create` → Crear múltiples productos
### 📸 POST `api/products/:id/upload-image` → Subir imagen a un producto

---

## ➕ POST /api/products

**Método:** `POST`

**Endpoint:** `/api/products`

### 📜 Descripción

- Crea un nuevo producto en la base de datos.
- Puedes especificar su título, descripción, precio, si está vendido o no, y sus relaciones con categoría y serie.
- Algunos campos tienen valores por defecto si no se incluyen en la solicitud.

## 📩 Body (JSON):

- Tipo: `raw`

```json
{
  "title": "Nueva Portada Moderna",
  "description": "Una portada con diseño moderno y limpio.",
  "price": 35.50,
  "is_sold": false,
  "id_category": 26,
  "id_series": 22
}
```

> ⚠️ Notas:
>- `id_category` y `id_series` deben existir en la base de datos.
>- No incluyas `id_product`, se genera automáticamente.
>- Campos como `sold_at` o `is_sold` son opcionales.

### ✅ Respuesta exitosa (201)

```json
{
  "id_product": 20,
  "title": "Nueva Portada Moderna",
  "description": "Una portada con diseño moderno y limpio.",
  "price": "35.50",
  "is_sold": false,
  "is_deleted": false,
  "visible_in_portfolio": true,
  "sold_at": null,
  "id_category": 26,
  "id_series": 22,
  "created_at": "2025-04-19T21:11:12.000Z",
  "updated_at": "2025-04-19T21:11:12.000Z",
  "createdAt": "2025-04-19T21:11:12.000Z",
  "updatedAt": "2025-04-19T21:11:12.000Z",
  "category": {
    "id_category": 26,
    "name": "Arte Digital"
  },
  "series": {
    "id_series": 22,
    "title": "Serie Básica",
    "description": "Una serie cargada por seed",
    "cover_image": null
  }
}
```

### ❌ Errores posibles:

| Código | Descripción                 |
|--------|-----------------------------|
| 400    | Faltan campos obligatorios.     |
| 500    | Error interno del servidor.       |


```json
{
  "error": "Faltan campos obligatorios: title, price."
}
```

```json
{
  "error": "Error interno del servidor",
  "description": "Detalles del error aquí."
}
```
> Este endpoint es ideal para agregar nuevos productos al catálogo, permitiendo asociarlos a categorías y series existentes desde el inicio.

---

## 📦 POST /api/products/bulk-create

**Método:** `POST`

**Endpoint:** `/api/products/bulk-create`

### 📜 Descripción

- Crea múltiples productos en una sola solicitud.
- Se permite asignar relaciones a categorías, series, palabras clave, estilos, colores y temas.
- Ideal para cargas masivas o sincronización externa.

## 📩 Body (JSON):

- Tipo: `raw`

```json
{
  "products": [
    {
      "title": "Portada Minimalista 33",
      "description": "Una portada minimalista para tu álbum.",
      "price": 25.99,
      "is_sold": false,
      "is_deleted": false,
      "visible_in_portfolio": true,
      "sold_at": null,
      "id_category": 30,
      "id_series": 26,
      "keywords": [81],
      "colors": [102, 103],
      "styles": [65],
      "themes": [64]
    }
  ]
}
```

> ⚠️ **Importante:** Todos los IDs referenciados deben existir previamente en la base de datos:
>
> - `id_category` → en `categories`
> - `id_series` → en `series`
> - `keywords`, `colors`, `styles`, `themes` → arrays de IDs válidos
>
> 🧪 Se recomienda ejecutar previamente el archivo `src/database/seed.js` para evitar errores de integridad referencial.

#### Ejemplo de error por clave foránea:
```json
{
  "message": "Error al crear productos.",
  "error": "Cannot add or update a child row: a foreign key constraint fails (`ecommerce_magalab`.`products`, CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`) ON DELETE SET NULL)"
}
```

> - `id_product` no debe incluirse.
>
> - Puedes enviar entre 1 y muchos productos, pero siempre como array bajo la clave `products`.

### ✅ Respuesta exitosa (201)

```json
{
  "message": "Productos creados exitosamente.",
  "data": [
    {
      "id_product": 34,
      "title": "Portada Minimalista 33",
      "description": "Una portada minimalista para tu álbum.",
      "price": "25.99",
      "is_sold": false,
      "is_deleted": false,
      "visible_in_portfolio": true,
      "sold_at": null,
      "id_category": 30,
      "id_series": 26,
      "category": {
        "id_category": 30,
        "name": "Arte Digital"
      },
      "series": {
        "id_series": 26,
        "title": "Serie Básica",
        "description": "Una serie cargada por seed",
        "cover_image": null
      },
      "keywords": [ ... ],
      "colors": [ ... ],
      "styles": [ ... ],
      "themes": [ ... ],
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "timestamp": "2025-04-20T21:30:00.000Z"
}
```

### ❌ Posibles errores:

| Código | Descripción                 |
|--------|-----------------------------|
| 400    | Formato incorrecto o validación fallida.     |
| 400    | Violación de clave foránea.       |
| 500    | Error interno del servidor.       |


```json
{
  "message": "Debe enviar un array de productos para crear."
}
```

```json
{
  "message": "Error de validación al crear productos.",
  "error": {
    "errors": [
      {
        "message": "El campo 'title' es requerido",
        "type": "notNull Violation",
        "path": "title"
      }
    ]
  }
}
```

```json
{
  "message": "Error al crear productos.",
  "error": "Detalles del error aquí"
}
```

> Este endpoint es útil para realizar cargas masivas de productos, ideal para importar catálogos o trabajar desde archivos externos.

---

## 📸 POST /products/:id/upload-image

**Método:** `POST`

**Endpoint:** `/api/products/:id/upload-image`

### 📜 Descripción

- Sube una imagen a un producto específico.

- El archivo debe ser enviado como `form-data` bajo el campo `file`.

**🔢 Parámetros:**

- `id:` ID del producto al cual se le asociará la imagen.

**Requisitos:**

## 📥 Requisitos:

| Parámetro | Tipo | Requerido | Descripción                              |
|-----------|------|-----------|------------------------------------------|
| id        | int  | Sí        | ID del producto al que subir la imagen. |

>El producto debe existir en la base de datos.

>🗂️ Las imágenes se almacenan en el servidor dentro de src/uploads/products.

### ✅ Respuesta exitosa (200)

```json
{
    "message": "Imagen subida correctamente.",
    "data": {
        "id_product": 86,
        "title": "Portada Minimalista",
        "description": "Una portada minimalista para tu álbum.",
        "price": "25.99",
        "is_sold": false,
        "is_deleted": false,
        "visible_in_portfolio": true,
        "sold_at": null,
        "id_category": 30,
        "created_at": "2025-04-20T20:17:53.000Z",
        "updated_at": "2025-04-20T20:17:53.000Z",
        "id_series": 26,
        "createdAt": "2025-04-20T20:17:53.000Z",
        "updatedAt": "2025-04-20T20:17:53.000Z"
    },
    "timestamp": "2025-04-20T21:05:18.742Z"
}
```

### ❌ Posibles errores:

| Código | Descripción                 |
|--------|-----------------------------|
| 400    | No se subió ninguna imagen.     |
| 404    | Producto no encontrado.       |
| 500    | Error en el servidor.       |


```json
{
    "message": "No se subió ninguna imagen.",
    "timestamp": "fecha_hora"
}
```

```json
{
    "message": "Producto no encontrado.",
    "timestamp": "fecha_hora"
}
```

```json
{
    "message": "Error al subir la imagen.",
    "error": "Detalles del error aquí",
    "timestamp": "fecha_hora"
}
```


