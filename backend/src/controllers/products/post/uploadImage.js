const { Products, ProductImages } = require("../../../database/indexModels");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");
const cloudinary = require("../../../../config/cloudinary"); 

const uploadImage = async (req, res) => {
    const { id } = req.params;

    if (!req.file) {
        return errorResponse(res, "bad_request", "No se subió ninguna imagen.", "products/uploadImage", 400);
    }

    try {
        const product = await Products.findByPk(id);
        if (!product) return errorResponse(res, "not_found", "Producto no encontrado.", "products/uploadImage", 404);

        // Subir a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: `products/${id}`, // opcional, organiza por producto
        });

        // Guardar la URL en ProductImages
        await ProductImages.create({
            id_product: product.id_product,
            image_url: result.secure_url,
        });

        return successResponse(res, { product, image_url: result.secure_url }, "products/uploadImage");
    } catch (error) {
        console.error("Error al subir imagen:", error);
        return errorResponse(res, "server_error", "Error al subir la imagen.", "products/uploadImage", 500);
    }
};

module.exports = uploadImage;
