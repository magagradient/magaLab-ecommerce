const { Colors } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    const { name } = req.body;

    try {
        const existingColor = await Colors.findOne({ where: { name } });

        if (existingColor) {
            return responseHelper.errorResponse(
                res,
                "duplicate_color",
                `Ya existe un color con el nombre ${name}.`,
                "colors_create",
                400
            );
        }

        const newColor = await Colors.create({ name });

        return responseHelper.successResponse(res, newColor, "colors_create");
    } catch (error) {
        console.error("Error al crear el color:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "colors_create", 500);
    }
};

module.exports = create;
