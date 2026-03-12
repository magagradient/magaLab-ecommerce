const { FavoriteProducts } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        const { id_user } = req.query;

        const whereClause = id_user ? { id_user } : {};

        const favorites = await FavoriteProducts.findAll({
            where: whereClause,
            order: [["created_at", "DESC"]],
            raw: true
        });

        return responseHelper.successResponse(res, favorites, "favorite_products_index");
    } catch (error) {
        console.error("Error al obtener favoritos de productos:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "favorite_products_index", 500);
    }
};

module.exports = index;