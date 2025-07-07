const { Styles } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const show = async (req, res) => {
    const { id } = req.params;

    try {
        const style = await Styles.findByPk(id);

        if (!style) {
            return responseHelper.errorResponse(res, "not_found", "Estilo no encontrado.", "styles_show", 404);
        }

        return responseHelper.successResponse(res, style, "styles_show");
    } catch (error) {
        console.error("Error al buscar estilo:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "styles_show", 500);
    }
};

module.exports = show;
