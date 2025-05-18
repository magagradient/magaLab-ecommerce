const { ProductColors } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const clear = async (req, res) => {
    const { id } = req.params;

    try {
        await ProductColors.destroy({ where: { id_product: id } });

        return responseHelper.successResponse(res, null, "product_colors_clear");
    } catch (error) {
        console.error("Error al eliminar todos los colores del producto:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "product_colors_clear", 500);
    }
};

module.exports = clear;
