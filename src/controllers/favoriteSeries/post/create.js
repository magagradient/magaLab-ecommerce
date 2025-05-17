const { FavoriteSeries } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    try {
        const { id_user, id_series } = req.body;

        if (!id_user || !id_series) {
            return responseHelper.errorResponse(res, "bad_request", "id_user e id_series son requeridos.", "favorite_series_create", 400);
        }

        const [favorite, created] = await FavoriteSeries.findOrCreate({
            where: { id_user, id_series }
        });

        if (!created) {
            return responseHelper.errorResponse(res, "conflict", "La serie ya está marcada como favorita.", "favorite_series_create", 409);
        }

        return responseHelper.successResponse(res, favorite, "favorite_series_create", 201);
    } catch (error) {
        console.error("Error al crear favorito:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "favorite_series_create", 500);
    }
};

module.exports = create;
