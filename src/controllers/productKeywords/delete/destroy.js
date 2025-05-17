const { ProductKeywords } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    const { id_product, id_keyword } = req.params;

    try {
        const deleted = await ProductKeywords.destroy({ where: { id_product, id_keyword } });
        if (!deleted) {
            return responseHelper.errorResponse(res, "not_found", "Relación no encontrada", "product_keywords_destroy", 404);
        }

        return responseHelper.successResponse(res, null, "product_keywords_destroy");
    } catch (error) {
        console.error("Error al eliminar relación:", error);
        return responseHelper.errorResponse(res, "delete_error", error.message, "product_keywords_destroy", 400);
    }
};

module.exports = destroy;
