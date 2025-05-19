const path = require("path");
const fs = require("fs");
const { Products } = require("../../../database/indexModels");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");

const uploadImage = async (req, res) => {
    const { id } = req.params;

    if (!req.file) {
        return errorResponse(res, "bad_request", "No se subió ninguna imagen.", "products/uploadImage", 400);
    }

    try {
        const product = await Products.findByPk(id);

        if (!product) {
            // Borra la imagen subida si no hay producto
            fs.unlinkSync(req.file.path);

            return errorResponse(res, "not_found", "Producto no encontrado.", "products/uploadImage", 404);
        }

        // Guardar la imagen en el campo correspondiente (ej: 'poster')
        product.poster = req.file.filename;
        await product.save();

        return successResponse(res, product, "products/uploadImage");
    } catch (error) {
        console.error("Error al subir imagen:", error);
        return errorResponse(res, "server_error", "Error al subir la imagen.", "products/uploadImage", 500);
    }
};

module.exports = uploadImage;
