const { FavoriteSeries } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const show = async (req, res) => {
    try {
        const { id } = req.params;

        const favorite = await FavoriteSeries.findByPk(id, { raw: true });

        if (!favorite) {
            return responseHelper.errorResponse(res, "not_found", "Favorito no encontrado.", "favorite_series_show", 404);
        }

        return responseHelper.successResponse(res, favorite, "favorite_series_show");
    } catch (error) {
        console.error("Error al obtener favorito:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "favorite_series_show", 500);
    }
};

module.exports = show;
