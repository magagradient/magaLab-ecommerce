module.exports = (models) => {
  models.Users.hasMany(models.FavoriteProducts, {
      foreignKey: "id_user",
      as: "userFavoriteProducts"
  });

  models.FavoriteProducts.belongsTo(models.Users, {
      foreignKey: "id_user",
      as: "userFavoriteProducts"
  });

  models.Products.hasMany(models.FavoriteProducts, {
      foreignKey: "id_product",
      as: "productFavoriteProducts"
  });
  
  models.FavoriteProducts.belongsTo(models.Products, {
      foreignKey: "id_product",
      as: "productFavoriteProducts"
  });
};