const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const FavoriteProducts = sequelize.define("FavoriteProducts", {
        id_favorite_product: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_product: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: "favorite_products",
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ["id_user", "id_product"]
            }
        ]
    });

    return FavoriteProducts;
};