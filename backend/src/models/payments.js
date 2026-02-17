const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Payments = sequelize.define("Payments", {
        id_payment: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Orders",
                key: "id_order",
            },
            onDelete: "CASCADE",
        },
        id_payment_method: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "payment_methods", 
                key: "id_payment_method",
            },
            onDelete: "CASCADE",
        },
        status: {
            type: DataTypes.ENUM("completed", "rejected", "under_review"),
            allowNull: false,
        },
        payment_date: {
            type: DataTypes.DATE,  // ✅ CORREGIDO: Sequelize usa DataTypes.DATE
            defaultValue: DataTypes.NOW,
        },
        amount_paid: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    }, {
        tableName: "payments",
        timestamps: false,
    });

    return Payments;
};
