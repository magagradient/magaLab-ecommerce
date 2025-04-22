const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const ProductVariants = sequelize.define('ProductVariants', {
        id_variant: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_product: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        stock: DataTypes.INTEGER
    }, {
        tableName: 'product_variants',
        timestamps: false
    });

    return ProductVariants;
};
