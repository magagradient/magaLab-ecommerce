const { ProductImages } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const clear = async (req, res) => {
    const { id } = req.params;

    try {
        await ProductImages.destroy({ where: { id_product: id } });

        return responseHelper.successResponse(res, null, "product_images_clear");
    } catch (error) {
        console.error("Error al eliminar imágenes:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "product_images_clear", 500);
    }
};

module.exports = clear;
