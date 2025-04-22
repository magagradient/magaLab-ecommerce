module.exports = (models) => {
    // Relación directa
    models.Users.hasMany(models.FavoriteImages, {
        foreignKey: "id_user",
        as: "userFavorites"
    });

    models.FavoriteImages.belongsTo(models.Users, {
        foreignKey: "id_user",
        as: "user"
    });

    models.ProductImages.hasMany(models.FavoriteImages, {
        foreignKey: "id_image",
        as: "imageFavorites"
    });

    models.FavoriteImages.belongsTo(models.ProductImages, {
        foreignKey: "id_image",
        as: "image"
    });

    // Relación muchos a muchos a través de FavoriteImages
    models.Users.belongsToMany(models.ProductImages, {
        through: models.FavoriteImages,
        foreignKey: "id_user",
        otherKey: "id_image",
        as: "favoriteImages"
    });

    models.ProductImages.belongsToMany(models.Users, {
        through: models.FavoriteImages,
        foreignKey: "id_image",
        otherKey: "id_user",
        as: "favoritedByUsers"
    });
};
