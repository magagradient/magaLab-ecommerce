# 🛠️ Controladores del Backend - Maga Lab

Este archivo documenta los controladores implementados en el backend de **Maga Lab**, detallando la estructura y los endpoints disponibles.

📅 Última actualización: 21 de abril de 2025

---

## 📋 Resumen de Estado por Entidad

| Entidad            | Estado        | Modularizado | Lógica Avanzada | Documentado |
|--------------------|---------------|--------------|------------------|-------------|
| `products`         | ✅ Completo   | ✅ Sí        | ✅ Sí           | ✅ Sí        |
| `authors`          | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `blogPosts`        | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `cartItems`        | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `categories`       | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `colors`           | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `coupons`          | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `downloadLinks`    | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `favoriteImages`   | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `favoriteSeries`   | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `invoices`         | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `keywords`         | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `orders`           | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `ordersProducts`   | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `passwordChanges`  | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `passwordResets`   | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `paymentMethods`   | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `payments`         | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `productColors`    | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `productImages`    | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `productKeywords`  | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `productStyles`    | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `productThemes`    | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `productVariants`  | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `series`           | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `shoppingCarts`    | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `styles`           | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `themes`           | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `userCoupons`      | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |
| `users`            | 🔄 CRUD       | ❌ No        | ❌ No           | ❌ No        |

---

## 📁 Documentación por Entidad

> Se recomienda consultar los archivos específicos por entidad para detalles de implementación y ejemplos.

- [`products.md`](./products/)


---

## 📚 Glosario de Entidades (selección útil)

- `ordersProducts`: Tabla intermedia entre `orders` y `products`.
- `downloadLinks`: Enlaces únicos generados para la descarga de productos digitales.
- `userCoupons`: Relación entre usuarios y cupones utilizados.


---

📌 *Este archivo funciona como índice general del progreso del backend y se actualiza a medida que se desarrollan nuevos controladores o se mejora su estructura.*

