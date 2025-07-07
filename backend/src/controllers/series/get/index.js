const { Series } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        const series = await Series.findAll();
        return responseHelper.successResponse(res, series, "series_index");
    } catch (error) {
        console.error("Error al obtener series:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "series_index", 500);
    }
};

module.exports = index;
