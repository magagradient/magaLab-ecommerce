const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const ProductThemes = sequelize.define("ProductThemes", {
        id_product: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        id_theme: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }, {
        tableName: "product_themes",
        timestamps: false,
        freezeTableName: true 
    });

    return ProductThemes ;
};
