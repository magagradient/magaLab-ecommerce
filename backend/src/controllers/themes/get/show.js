const { Themes } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const show = async (req, res) => {
    try {
        const theme = await Themes.findByPk(req.params.id);
        if (!theme) {
            return responseHelper.errorResponse(res, "not_found", "Tema no encontrado.", "themes_show", 404);
        }
        return responseHelper.successResponse(res, theme, "themes_show");
    } catch (error) {
        console.error("Error al obtener tema:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "themes_show", 500);
    }
};

module.exports = show;
