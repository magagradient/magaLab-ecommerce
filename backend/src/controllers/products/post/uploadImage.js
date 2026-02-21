const { Products, ProductImages } = require("../../../database/indexModels");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");
const cloudinary = require("../../../../config/cloudinary"); 

const uploadImage = async (req, res) => {
    const { id } = req.params;
    const { type } = req.body; 

    if (!req.file) {
        return errorResponse(res, "bad_request", "No se subió ninguna imagen.", "products/uploadImage", 400);
    }

    try {
        const product = await Products.findByPk(id);

        if (!product) {
            return errorResponse(res, "not_found", "Producto no encontrado.", "products/uploadImage", 404);
        }

        // subir a cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: `products/${id}`,
        });

        // guardar en ProductImages
        const image = await ProductImages.create({
            product_id: product.id_product,   
            url: result.secure_url,           
            type: type || "gallery",          
        });

        return successResponse(
            res,
            { image },
            "products/uploadImage"
        );

    } catch (error) {
        console.error("Error al subir imagen:", error);
        return errorResponse(res, "server_error", "Error al subir la imagen.", "products/uploadImage", 500);
    }
};

module.exports = uploadImage;