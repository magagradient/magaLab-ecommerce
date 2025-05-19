const { Series } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const series = await Series.findByPk(id);

        if (!series) {
            return responseHelper.errorResponse(res, "not_found", "Serie no encontrada.", "series_destroy", 404);
        }

        await series.destroy(); // Hard delete
        return responseHelper.successResponse(res, null, "series_destroy");
    } catch (error) {
        console.error("Error al eliminar la serie:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "series_destroy", 500);
    }
};

module.exports = destroy;
