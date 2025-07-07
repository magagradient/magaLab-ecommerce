const { Series } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    const { title, description, cover_image } = req.body;

    try {
        const newSeries = await Series.create({ title, description, cover_image });
        return responseHelper.successResponse(res, newSeries, "series_create", 201);
    } catch (error) {
        console.error("Error al crear la serie:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "series_create", 500);
    }
};

module.exports = create;
