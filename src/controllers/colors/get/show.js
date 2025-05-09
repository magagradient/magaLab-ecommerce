const { Colors } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const show = async (req, res) => {
    const { id } = req.params;

    try {
        const color = await Colors.findByPk(id);

        if (!color) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                `No se encontró un color con el ID ${id}.`,
                "colors_show",
                404
            );
        }

        return responseHelper.successResponse(res, color, "colors_show");
    } catch (error) {
        console.error("Error al obtener el color:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "colors_show", 500);
    }
};

module.exports = show;
