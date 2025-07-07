const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const OrdersProducts = sequelize.define("OrdersProducts", {
        id_order: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "orders",
                key: "id_order"
            },
            onDelete: "CASCADE"
        },
        id_product: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "products",
                key: "id_product"
            },
            onDelete: "CASCADE"
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        unit_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: "orders_products",
        timestamps: false // No incluye `createdAt` ni `updatedAt`
    });

    return OrdersProducts;
};
