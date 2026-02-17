const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const FavoriteImages = sequelize.define("FavoriteImages", {
        id_favorite_image: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_image: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: "favorite_images",
        timestamps: false,
        freezeTableName: true 
    });

    return FavoriteImages;
};
