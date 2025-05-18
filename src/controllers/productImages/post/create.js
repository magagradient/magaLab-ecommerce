const { ProductImages } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    const { id } = req.params; // id_product
    let images = req.body;

    // Aceptamos un objeto o array
    if (!images) {
        return responseHelper.errorResponse(res, "invalid_data", "No se enviaron datos de imágenes.", "product_images_create", 400);
    }

    if (!Array.isArray(images)) {
        images = [images];
    }

    try {
        const records = images.map(img => ({
            id_product: id,
            image_url: img.image_url,
        }));

        await ProductImages.bulkCreate(records);

        return responseHelper.successResponse(res, null, "product_images_create");
    } catch (error) {
        console.error("Error al agregar imágenes:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "product_images_create", 500);
    }
};

module.exports = create;
