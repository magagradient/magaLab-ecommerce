module.exports = (models) => {
    // users - orders:
    models.Users.hasMany(models.Orders, {
        foreignKey: "id_user",
        as: "userOrders"
    });
    models.Orders.belongsTo(models.Users, {
        foreignKey: "id_user",
        as: "user"
    });

    // orders - products (muchos a muchos):
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

    // OrdersProducts relaciones directas para include:
    models.OrdersProducts.belongsTo(models.Orders, {
        foreignKey: "id_order",
        as: "order"
    });
    models.OrdersProducts.belongsTo(models.Products, {
        foreignKey: "id_product",
        as: "product"
    });
    models.Orders.hasMany(models.OrdersProducts, {
        foreignKey: "id_order",
        as: "orderDetails"
    });
    models.Products.hasMany(models.OrdersProducts, {
        foreignKey: "id_product",
        as: "productOrders"
    });

    // PaymentMethods - Payments:
    models.PaymentMethods.hasMany(models.Payments, {
        foreignKey: "id_payment_method",
        as: "payments"
    });
    models.Payments.belongsTo(models.PaymentMethods, {
        foreignKey: "id_payment_method",
        as: "paymentMethod"
    });

    // Orders - Payments:
    models.Orders.hasMany(models.Payments, {
        foreignKey: "id_order",
        as: "orderPayments"
    });
    models.Payments.belongsTo(models.Orders, {
        foreignKey: "id_order",
        as: "order"
    });
};



