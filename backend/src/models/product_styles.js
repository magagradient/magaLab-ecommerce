const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const ProductStyles = sequelize.define("ProductStyles", {
        id_product: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Products",
                key: "id_product",
            },
        },
        id_style: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Styles",
                key: "id_style",
            },
        },
    }, {
        tableName: "product_styles",
        timestamps: false,
    });

    return ProductStyles;
};
