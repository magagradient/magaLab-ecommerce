const path = require("path");
const fs = require("fs");
const { Products } = require("../../../database/indexModels");

const uploadImage = async (req, res) => {
    const { id } = req.params;

    if (!req.file) {
        return res.status(400).json({
            message: "No se subió ninguna imagen.",
            timestamp: new Date()
        });
    }

    try {
        const product = await Products.findByPk(id);

        if (!product) {
            // Borra la imagen subida si no hay producto
            fs.unlinkSync(req.file.path);

            return res.status(404).json({
                message: "Producto no encontrado.",
                timestamp: new Date()
            });
        }

        // Guardar la imagen en el campo correspondiente (ej: 'image' o 'poster')
        product.poster = req.file.filename;
        await product.save();

        return res.status(200).json({
            message: "Imagen subida correctamente.",
            data: product,
            timestamp: new Date()
        });

    } catch (error) {
        console.error("Error al subir imagen:", error);
        return res.status(500).json({
            message: "Error al subir la imagen.",
            error: error.message,
            timestamp: new Date()
        });
    }
};

module.exports = uploadImage;
