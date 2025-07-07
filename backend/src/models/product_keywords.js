const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const ProductKeywords = sequelize.define("ProductKeywords", {
        id_product: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Products",
                key: "id_product",
            },
        },
        id_keyword: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Keywords",
                key: "id_keyword",
            },
        },
    }, {
        tableName: "product_keywords",
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['id_product', 'id_keyword'] // Asegura que la combinación sea única
            }
        ]
    });

    return ProductKeywords;
};
