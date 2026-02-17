const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const CartItems = sequelize.define('CartItems', {
        id_item: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_cart: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_product: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        tableName: 'cart_items',
        timestamps: false,
        freezeTableName: true 
    });

    return CartItems;
};
