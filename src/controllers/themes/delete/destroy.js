const { Themes } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    try {
        const theme = await Themes.findByPk(req.params.id);
        if (!theme) {
            return responseHelper.errorResponse(res, "not_found", "Tema no encontrado.", "themes_destroy", 404);
        }

        await theme.destroy();
        return responseHelper.successResponse(res, null, "themes_destroy");
    } catch (error) {
        console.error("Error al eliminar tema:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "themes_destroy", 500);
    }
};

module.exports = destroy;
