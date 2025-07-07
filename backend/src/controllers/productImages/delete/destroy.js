const { ProductImages } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    const { id, imageId } = req.params;

    try {
        const deleted = await ProductImages.destroy({
            where: { id_product: id, id_image: imageId },
        });

        if (deleted === 0) {
            return responseHelper.errorResponse(res, "not_found", "Imagen no encontrada.", "product_images_delete", 404);
        }

        return responseHelper.successResponse(res, null, "product_images_delete");
    } catch (error) {
        console.error("Error al eliminar imagen:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "product_images_delete", 500);
    }
};

module.exports = destroy;
