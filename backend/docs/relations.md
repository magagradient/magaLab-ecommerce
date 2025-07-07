# 📘 Relaciones del Proyecto Maga Lab

Este documento tiene dos secciones:

1. [🔍 Vista General](#vista-general) – resumen conceptual de las relaciones.
2. [💻 Detalle Técnico](#detalle-técnico) – relaciones Sequelize con código.

---

| Modelo         | Relaciona con                                        | Tipo de Relación    |
|----------------|------------------------------------------------------|---------------------|
| Authors        | BlogPosts                                             | 1 a N               |
| Users          | UserCoupons, Orders, FavoriteImages, FavoriteSeries, ShoppingCart | 1 a N / 1 a 1 |
| Coupons        | UserCoupons                                           | 1 a N               |
| Products       | Categories, ProductImages, Colors, Styles, Themes, Keywords, Orders | N a 1 / N a N |
| ProductImages  | FavoriteImages                                        | 1 a N               |
| ShoppingCarts  | CartItems                                             | 1 a N               |
| Series         | FavoriteSeries                                        | 1 a N               |


>**Nota:**  
Modelos actualmente sin relaciones: `PasswordChanges`, `PasswordResets`, `PaymentMethods`, `Payments`, `DownloadLinks`

---

## [🔍 Vista General](#vista-general)

### Blog
- Un autor puede tener muchos posts.
- Cada post pertenece a un autor.

### Cupones
- Un `UserCoupon` vincula un cupón a un usuario específico.
- Un `UserCoupon` registra el uso de un cupón.

### Ecommerce
- Un producto pertenece a una categoría.
- Una categoría puede tener muchos productos.
- Un producto puede tener muchas imágenes.
- Productos pueden asociarse a múltiples colores, estilos, temas y palabras clave (relaciones N a N).

### Favorite Images
- Un usuario puede marcar muchas imágenes como favoritas.
- Una imagen puede ser favorita por muchos usuarios.

### Favorite Series
- Un usuario puede tener muchas series favoritas.
- Una serie puede ser favorita por muchos usuarios.

### Orders
- Un usuario puede tener muchos pedidos.
- Un pedido puede contener varios productos y viceversa (relación N a N).

### Shopping Cart
- Un usuario tiene un único carrito.
- Un carrito puede contener muchos ítems.

### Modelos sin relaciones directas:
- `PasswordChanges`, `PasswordResets`, `PaymentMethods`, `Payments`, `DownloadLinks`

---

## [💻 Detalle Técnico](#detalle-técnico)

👉 *La siguiente sección incluye el código Sequelize que implementa cada relación.*

### Blog

```js
models.Authors.hasMany(models.BlogPosts, {
    foreignKey: "author_id",
    as: "posts"
});
models.BlogPosts.belongsTo(models.Authors, {
    foreignKey: "author_id",
    as: "author"
});
```

### Cupones

```js
models.UserCoupons.belongsTo(models.Users, {
    foreignKey: "id_user",
    as: "user"
});
models.UserCoupons.belongsTo(models.Coupons, {
    foreignKey: "id_coupon",
    as: "coupon"
});
```

### Ecommerce

```js
// Products - Categories
models.Categories.hasMany(models.Products, {
    foreignKey: "id_category",
    as: "products"
});
models.Products.belongsTo(models.Categories, {
    foreignKey: "id_category",
    as: "category"
});

// Products - Images
models.Products.hasMany(models.ProductImages, {
    foreignKey: "id_product",
    as: "images"
});
models.ProductImages.belongsTo(models.Products, {
    foreignKey: "id_product",
    as: "product"
});

// Products - Colors
models.Products.belongsToMany(models.Colors, {
    through: models.ProductColors,
    foreignKey: "id_product",
    as: "colors"
});
models.Colors.belongsToMany(models.Products, {
    through: models.ProductColors,
    foreignKey: "id_color",
    as: "products"
});

// Products - Styles
models.Products.belongsToMany(models.Styles, {
    through: models.ProductStyles,
    foreignKey: "id_product",
    as: "styles"
});
models.Styles.belongsToMany(models.Products, {
    through: models.ProductStyles,
    foreignKey: "id_style",
    as: "products"
});

// Products - Themes
models.Products.belongsToMany(models.Themes, {
    through: models.ProductThemes,
    foreignKey: "id_product",
    as: "themes"
});
models.Themes.belongsToMany(models.Products, {
    through: models.ProductThemes,
    foreignKey: "id_theme",
    as: "products"
});

// Products - Keywords
models.Products.belongsToMany(models.Keywords, {
    through: models.ProductKeywords,
    foreignKey: "id_product",
    as: "keywords"
});
models.Keywords.belongsToMany(models.Products, {
    through: models.ProductKeywords,
    foreignKey: "id_keyword",
    as: "products"
});
```

### Favorite Images

```js
models.Users.hasMany(models.FavoriteImages, {
    foreignKey: "id_user",
    as: "userFavorites"
});
models.FavoriteImages.belongsTo(models.Users, {
    foreignKey: "id_user",
    as: "user"
});

models.ProductImages.hasMany(models.FavoriteImages, {
    foreignKey: "id_image",
    as: "imageFavorites"
});
models.FavoriteImages.belongsTo(models.ProductImages, {
    foreignKey: "id_image",
    as: "image"
});
```

### Favorite Series

```js
models.Users.hasMany(models.FavoriteSeries, {
    foreignKey: "id_user",
    as: "userFavoriteSeries"
});
models.FavoriteSeries.belongsTo(models.Users, {
    foreignKey: "id_user",
    as: "user"
});

models.Series.hasMany(models.FavoriteSeries, {
    foreignKey: "id_series",
    as: "seriesFavoriteSeries"
});
models.FavoriteSeries.belongsTo(models.Series, {
    foreignKey: "id_series",
    as: "series"
});
```

### Orders

```js
// Users - Orders
models.Users.hasMany(models.Orders, {
    foreignKey: "id_user",
    as: "userOrders"
});
models.Orders.belongsTo(models.Users, {
    foreignKey: "id_user",
    as: "user"
});

// Orders - Products (Many-to-Many)
models.Orders.belongsToMany(models.Products, {
    through: models.OrdersProducts,
    foreignKey: "id_order",
    as: "orderedProducts"
});
models.Products.belongsToMany(models.Orders, {
    through: models.OrdersProducts,
    foreignKey: "id_product",
    as: "orders"
});
```

### Shopping Cart

```js
models.Users.hasOne(models.ShoppingCarts, {
    foreignKey: "id_user",
    as: "shoppingCart"
});
models.ShoppingCarts.belongsTo(models.Users, {
    foreignKey: "id_user",
    as: "user"
});

models.ShoppingCarts.hasMany(models.CartItems, {
    foreignKey: "id_cart",
    as: "cartItems"
});
models.CartItems.belongsTo(models.ShoppingCarts, {
    foreignKey: "id_cart",
    as: "cart"
});
```
---

### 🛠️ Inicialización de Modelos

```js
const models = {
    Users: UsersModel(sequelize, DataTypes),
    Products: ProductsModel(sequelize, DataTypes),
    // Agregar los demás modelos según sea necesario...
};

// Configuración de las relaciones entre modelos
relations(models);

// Función para conectar a la base de datos
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("✅ Base de datos conectada con éxito");
    } catch (error) {
        console.error("❌ Error al conectar a la base de datos:", error.message);
        process.exit(1);
    }
};

// Exportar modelos, conexión y sequelize
module.exports = { sequelize, connectDB, ...models };

```
>**Nota**: La función relations(models) configura las asociaciones entre los modelos antes de sincronizar la base de datos.

---

### Modelos sin relaciones directas

Actualmente no tienen relaciones Sequelize definidas, pero pueden agregarse en el futuro:

- `PasswordChanges`
- `PasswordResets`
- `PaymentMethods`
- `Payments`
- `DownloadLinks`