const { FavoriteImages } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const byUserAndImage = async (req, res) => {
    const { userId, imageId } = req.params;

    try {
        const deleted = await FavoriteImages.destroy({
            where: {
                id_user: userId,
                id_image: imageId
            }
        });

        if (!deleted) {
            return responseHelper.errorResponse(res, "not_found", "Relación usuario-imagen no encontrada.", "favorite_images_delete_user_image", 404);
        }

        return responseHelper.successResponse(res, [], "favorite_images_delete_user_image");
    } catch (error) {
        console.error("Error al eliminar relación usuario-imagen:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "favorite_images_delete_user_image", 500);
    }
};

module.exports = byUserAndImage;
