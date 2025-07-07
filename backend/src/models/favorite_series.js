const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const FavoriteSeries = sequelize.define("FavoriteSeries", {
        id_favorite_series: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_series: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: "favorite_series",
        timestamps: false
    });

    return FavoriteSeries;
};
