const { Colors } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        const colors = await Colors.findAll();

        if (colors.length === 0) {
            return responseHelper.successResponse(res, [], "colors_index");
        }

        return responseHelper.successResponse(res, colors, "colors_index");
    } catch (error) {
        console.error("Error al obtener los colores:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "colors_index", 500);
    }
};

module.exports = index;
