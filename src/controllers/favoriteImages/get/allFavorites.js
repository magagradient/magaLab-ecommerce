const { FavoriteImages } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const allFavorites = async (req, res) => {
    try {
        const favorites = await FavoriteImages.findAll();
        return responseHelper.successResponse(res, favorites, "favorite_images_all");
    } catch (error) {
        console.error("Error al obtener todos los favoritos:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "favorite_images_all", 500);
    }
};

module.exports = allFavorites;
