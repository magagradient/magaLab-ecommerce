const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const PaymentMethods = sequelize.define("PaymentMethods", {
        id_payment_method: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        method_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: "payment_methods",
        timestamps: false,
        freezeTableName: true 
    });

    return PaymentMethods;
};
