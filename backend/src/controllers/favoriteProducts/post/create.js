const { FavoriteProducts } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    try {
        const { id_product } = req.body;
        const { id_user } = req.user;

        const favorite = await FavoriteProducts.create({
            id_user,
            id_product
        });

        return responseHelper.successResponse(res, favorite, "favorite_products_create");
    } catch (error) {
        console.error("Error al agregar favorito:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "favorite_products_create", 500);
    }
};

module.exports = create;