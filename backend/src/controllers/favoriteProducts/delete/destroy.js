const { FavoriteProducts } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const remove = async (req, res) => {
    try {
        const { id_product } = req.params;
        const { id_user } = req.user;

        const deleted = await FavoriteProducts.destroy({
            where: {
                id_user,
                id_product
            }
        });

        if (!deleted) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                "Favorito no encontrado.",
                "favorite_products_delete",
                404
            );
        }

        return responseHelper.successResponse(res, null, "favorite_products_delete");
    } catch (error) {
        console.error("Error al eliminar favorito:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "favorite_products_delete", 500);
    }
};

module.exports = remove;