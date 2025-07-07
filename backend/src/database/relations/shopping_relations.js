module.exports = (models) => {
    // Un usuario puede tener un carrito:
    models.Users.hasOne(models.ShoppingCarts, {
        foreignKey: "id_user",
        as: "shoppingCart"
    });


    // cada carrito pertenece a un usuario:
    models.ShoppingCarts.belongsTo(models.Users, {
        foreignKey: "id_user",
        as: "user"
    });

    // un carrito puede tener muchos ítems
    models.ShoppingCarts.hasMany(models.CartItems, {
        foreignKey: "id_cart",
        as: "cartItems"
    });

    // cada ítem pertenece a un carrito
    models.CartItems.belongsTo(models.ShoppingCarts, {
        foreignKey: "id_cart",
        as: "cart"
    });
    
    // cada ítem hace referencia a un producto
    models.CartItems.belongsTo(models.Products, {
        foreignKey: "id_product",
        as: "product"
    });

    // Un producto puede estar en varios ítems
    models.Products.hasMany(models.CartItems, {
        foreignKey: "id_product",
        as: "cartItems"
    });
};