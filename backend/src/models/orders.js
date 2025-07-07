const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Orders = sequelize.define("Order", {
        id_order: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id_user"
            },
            onDelete: "CASCADE"
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("pending", "paid", "canceled"),
            allowNull: false,
            defaultValue: "pending"
        }
    }, {
        tableName: "orders",
        timestamps: false // No incluye `createdAt` ni `updatedAt`
    });

    return Orders;
};
