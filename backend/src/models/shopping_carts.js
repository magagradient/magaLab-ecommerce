const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const ShoppingCarts = sequelize.define('ShoppingCarts', {
        id_cart: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'shopping_carts',
        timestamps: false,
        freezeTableName: true 
    });

    return ShoppingCarts;
};
