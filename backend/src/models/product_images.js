const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const ProductImages = sequelize.define("ProductImages", {
        id_image: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_product: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Products",
                key: "id_product"
            }
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        tableName: "product_images",
        timestamps: false,
        freezeTableName: true 
    });

    return ProductImages;
};
