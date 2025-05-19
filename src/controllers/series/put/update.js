const { Series } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const update = async (req, res) => {
    const { id } = req.params;
    const { title, description, cover_image } = req.body;

    try {
        const series = await Series.findByPk(id);

        if (!series) {
            return responseHelper.errorResponse(res, "not_found", "Serie no encontrada.", "series_update", 404);
        }

        await series.update({ title, description, cover_image });
        return responseHelper.successResponse(res, series, "series_update");
    } catch (error) {
        console.error("Error al actualizar la serie:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "series_update", 500);
    }
};

module.exports = update;
