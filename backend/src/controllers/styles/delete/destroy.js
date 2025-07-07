const { Styles } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const style = await Styles.findByPk(id);

        if (!style) {
            return responseHelper.errorResponse(res, "not_found", "Estilo no encontrado.", "styles_destroy", 404);
        }

        await style.destroy();
        return responseHelper.successResponse(res, null, "styles_destroy");
    } catch (error) {
        console.error("Error al eliminar estilo:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "styles_destroy", 500);
    }
};

module.exports = destroy;
