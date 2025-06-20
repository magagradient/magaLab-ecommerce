const { ProductColors } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    const { id, id_color } = req.params;

    try {
        const deleted = await ProductColors.destroy({
            where: {
                id_product: id,
                id_color: id_color
            }
        });

        if (deleted === 0) {
            return responseHelper.errorResponse(res, "not_found", "Relación producto-color no encontrada.", "product_colors_delete", 404);
        }

        return responseHelper.successResponse(res, null, "product_colors_delete");
    } catch (error) {
        console.error("Error al eliminar color del producto:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "product_colors_delete", 500);
    }
};

module.exports = destroy;
