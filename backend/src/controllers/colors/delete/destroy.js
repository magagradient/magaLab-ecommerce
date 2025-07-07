const { Colors } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const color = await Colors.findByPk(id);

        if (!color) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                `No se encontró un color con el ID ${id}.`,
                "colors_delete",
                404
            );
        }

        await color.destroy();

        return responseHelper.successResponse(res, {}, "colors_delete");
    } catch (error) {
        console.error("Error al eliminar el color:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "colors_delete", 500);
    }
};

module.exports = destroy;
