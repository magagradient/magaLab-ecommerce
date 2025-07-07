const { Themes } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const update = async (req, res) => {
    try {
        const theme = await Themes.findByPk(req.params.id);
        if (!theme) {
            return responseHelper.errorResponse(res, "not_found", "Tema no encontrado.", "themes_update", 404);
        }

        const { name } = req.body;
        if (!name) {
            return responseHelper.errorResponse(res, "invalid_data", "El campo 'name' es obligatorio.", "themes_update", 400);
        }

        await theme.update({ name });
        return responseHelper.successResponse(res, theme, "themes_update");
    } catch (error) {
        console.error("Error al actualizar tema:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "themes_update", 500);
    }
};

module.exports = update;
