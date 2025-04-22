const ecommerceRelations = require("./ecommerce_relations");
const usersRelations = require("./users_relations");
const ordersRelations = require("./orders_relations");
const couponsRelations = require("./coupons_relations");
const blogRelations = require("./blog_relations");
const favoriteImagesRelations = require("./favoriteImages_relations");
const favoriteSeriesRelations = require("./favoriteSeries_relations");
const keywordsRelations = require("./keywords_relations");
const shoppingRelations = require("./shopping_relations");

module.exports = (models) => {
    ecommerceRelations(models);
    usersRelations(models);
    ordersRelations(models);
    couponsRelations(models);
    blogRelations(models);
    favoriteImagesRelations(models);
    favoriteSeriesRelations(models);
    keywordsRelations(models);
    shoppingRelations(models);
};
