const { FavoriteSeries } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const byUserAndSeries = async (req, res) => {
    try {
        const { id_user, id_series } = req.params;

        if (!id_user || !id_series) {
            return responseHelper.errorResponse(res, "bad_request", "id_user e id_series son requeridos.", "favorite_series_destroy_user_series", 400);
        }

        const deletedCount = await FavoriteSeries.destroy({
            where: { id_user, id_series }
        });

        if (deletedCount === 0) {
            return responseHelper.errorResponse(res, "not_found", "No se encontró el favorito para ese usuario y serie.", "favorite_series_destroy_user_series", 404);
        }

        return responseHelper.successResponse(res, { message: "Favorito eliminado correctamente." }, "favorite_series_destroy_user_series");
    } catch (error) {
        console.error("Error al eliminar favorito:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "favorite_series_destroy_user_series", 500);
    }
};

module.exports = byUserAndSeries;
