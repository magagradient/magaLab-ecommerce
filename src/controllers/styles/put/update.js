const { Styles } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const style = await Styles.findByPk(id);

        if (!style) {
            return responseHelper.errorResponse(res, "not_found", "Estilo no encontrado.", "styles_update", 404);
        }

        if (name) {
            style.name = name;
        }

        await style.save();
        return responseHelper.successResponse(res, style, "styles_update");
    } catch (error) {
        console.error("Error al actualizar estilo:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "styles_update", 500);
    }
};

module.exports = update;
