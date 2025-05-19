const { Themes } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        const themes = await Themes.findAll();
        return responseHelper.successResponse(res, themes, "themes_index");
    } catch (error) {
        console.error("Error al obtener temas:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "themes_index", 500);
    }
};

module.exports = index;
