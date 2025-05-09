const { Colors } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const color = await Colors.findByPk(id);

        if (!color) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                `No se encontró un color con el ID ${id}.`,
                "colors_update",
                404
            );
        }

        // Verificar si el nuevo nombre ya existe
        const existingColor = await Colors.findOne({ where: { name } });
        if (existingColor) {
            return responseHelper.errorResponse(
                res,
                "duplicate_color",
                `Ya existe un color con el nombre ${name}.`,
                "colors_update",
                400
            );
        }

        // Actualizar el color
        color.name = name;
        await color.save();

        return responseHelper.successResponse(res, color, "colors_update");
    } catch (error) {
        console.error("Error al actualizar el color:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "colors_update", 500);
    }
};

module.exports = update;
