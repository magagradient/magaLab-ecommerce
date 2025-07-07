const { ProductThemes } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    const { id, id_theme } = req.params;

    try {
        const deleted = await ProductThemes.destroy({
            where: {
                id_product: id,
                id_theme: id_theme
            }
        });

        if (!deleted) {
            return responseHelper.errorResponse(res, "not_found", "Asociación no encontrada.", "product_themes_destroy", 404);
        }

        return responseHelper.successResponse(res, null, "product_themes_destroy");
    } catch (error) {
        console.error("Error al eliminar tema del producto:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "product_themes_destroy", 500);
    }
};

module.exports = destroy;
