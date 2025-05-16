const { FavoriteImages, Users, ProductImages } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const create = async (req, res) => {
    const { id_user, id_image } = req.body;

    try {
        const user = await Users.findByPk(id_user);
        if (!user) {
            return responseHelper.errorResponse(res, "user_not_found", "Usuario no encontrado.", "favorite_images_create", 404);
        }

        const image = await ProductImages.findByPk(id_image);
        if (!image) {
            return responseHelper.errorResponse(res, "image_not_found", "Imagen no encontrada.", "favorite_images_create", 404);
        }

        const existingFavorite = await FavoriteImages.findOne({
            where: { id_user, id_image }
        });

        if (existingFavorite) {
            return responseHelper.errorResponse(res, "favorite_already_exists", "La imagen ya está en favoritos.", "favorite_images_create", 409);
        }

        const newFavorite = await FavoriteImages.create({ id_user, id_image });

        return responseHelper.successResponse(res, newFavorite, "favorite_images_create");
    } catch (error) {
        console.error("Error al agregar imagen a favoritos:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "favorite_images_create", 500);
    }
};

module.exports = create;
