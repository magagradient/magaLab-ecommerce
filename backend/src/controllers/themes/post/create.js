const { Themes } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return responseHelper.errorResponse(res, "invalid_data", "El campo 'name' es obligatorio.", "themes_create", 400);
        }

        const theme = await Themes.create({ name });
        return responseHelper.successResponse(res, theme, "themes_create");
    } catch (error) {
        console.error("Error al crear tema:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "themes_create", 500);
    }
};

module.exports = create;
