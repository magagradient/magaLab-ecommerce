const { FavoriteImages } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const create = async (req, res) => {
    const { id_user, id_image } = req.body;

    try {
        const newFavorite = await FavoriteImages.create({ id_user, id_image });

        return responseHelper.successResponse(res, newFavorite, "favorite_images_create");
    } catch (error) {
        console.error("Error al agregar imagen a favoritos:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "favorite_images_create", 500);
    }
};

module.exports = create;
