const { ProductStyles } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    const { id, styleId } = req.params;

    try {
        const deleted = await ProductStyles.destroy({
            where: {
                id_product: id,
                id_style: styleId
            }
        });

        if (!deleted) {
            return responseHelper.errorResponse(res, "not_found", "Asociación no encontrada.", "product_styles_destroy", 404);
        }

        return responseHelper.successResponse(res, null, "product_styles_destroy");
    } catch (error) {
        console.error("Error al eliminar estilo del producto:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "product_styles_destroy", 500);
    }
};

module.exports = destroy;
