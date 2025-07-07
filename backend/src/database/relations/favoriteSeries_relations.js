module.exports = (models) => {
    models.Users.hasMany(models.FavoriteSeries, {
        foreignKey: "id_user",
        as: "userFavoriteSeries"
    });

    models.FavoriteSeries.belongsTo(models.Users, {
        foreignKey: "id_user",
        as: "userFavoriteSeries"
    });

    models.Series.hasMany(models.FavoriteSeries, {
        foreignKey: "id_series",
        as: "seriesFavoriteSeries"
    });
    
    models.FavoriteSeries.belongsTo(models.Series, {
        foreignKey: "id_series",
        as: "seriesFavoriteSeries"
    });
    
};
