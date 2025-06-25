const { FavoriteImages } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const byUser = async (req, res) => {
    const { id_user } = req.params;

    try {
        const favorites = await FavoriteImages.findAll({
            where: { id_user: id_user }
        });

        return responseHelper.successResponse(res, favorites, "favorite_images_by_user");
    } catch (error) {
        console.error("Error al obtener favoritos por usuario:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "favorite_images_by_user", 500);
    }
};

module.exports = byUser;
