const { FavoriteImages } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const byId = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await FavoriteImages.destroy({ where: { id_favorite_image: id } });

        if (!deleted) {
            return responseHelper.errorResponse(res, "not_found", "Favorito no encontrado.", "favorite_images_delete", 404);
        }

        return responseHelper.successResponse(res, [], "favorite_images_delete");
    } catch (error) {
        console.error("Error al eliminar favorito:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "favorite_images_delete", 500);
    }
};

module.exports = byId;
