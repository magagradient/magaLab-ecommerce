const { Series } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const show = async (req, res) => {
    const { id } = req.params;

    try {
        const series = await Series.findByPk(id);

        if (!series) {
            return responseHelper.errorResponse(res, "not_found", "Serie no encontrada.", "series_show", 404);
        }

        return responseHelper.successResponse(res, series, "series_show");
    } catch (error) {
        console.error("Error al obtener la serie:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "series_show", 500);
    }
};

module.exports = show;
