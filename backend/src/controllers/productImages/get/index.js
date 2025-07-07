const { ProductImages } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    const { id } = req.params; // id_product

    try {
        const images = await ProductImages.findAll({
            where: { id_product: id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        return responseHelper.successResponse(res, images, "product_images_list");
    } catch (error) {
        console.error("Error al obtener imágenes:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "product_images_list", 500);
    }
};

module.exports = index;
