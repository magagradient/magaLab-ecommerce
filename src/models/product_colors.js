const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const ProductColors = sequelize.define("ProductColors", {
        id_product: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Products",
                key: "id_product"
            }
        },
        id_color: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Colors",
                key: "id_color"
            }
        }
    }, {
        tableName: "product_colors",
        timestamps: false
    });

    return ProductColors;
};
