const { FavoriteSeries } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCount = await FavoriteSeries.destroy({
            where: { id_favorite_series: id }
        });

        if (deletedCount === 0) {
            return responseHelper.errorResponse(res, "not_found", "Favorito no encontrado.", "favorite_series_destroy", 404);
        }

        return responseHelper.successResponse(res, { message: "Favorito eliminado correctamente." }, "favorite_series_destroy");
    } catch (error) {
        console.error("Error al eliminar favorito:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "favorite_series_destroy", 500);
    }
};

module.exports = destroy;
