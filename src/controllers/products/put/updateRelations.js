const { Products, Series, Categories } = require("../../../database/indexModels");

const updateRelations = async (req, res) => {
    const { id } = req.params;
    const {
        keywords,
        styles,
        colors,
        themes,
        id_series,
        id_category,
        images
    } = req.body;

    try {
        const product = await Products.findByPk(id);
        if (!product) {
            return res.status(404).json({
                message: "Producto no encontrado.",
                timestamp: new Date()
            });
        }

        // validar existencia de id_series si se proporciona
        if (id_series !== null && id_series !== undefined) {
            const series = await Series.findByPk(id_series);
            if (!series) {
                return res.status(400).json({
                    message: "La serie proporcionada no existe.",
                    timestamp: new Date()
                });
            }
            await product.update({ id_series });
        }

        // validar existencia de id_category si se proporciona
        if (id_category !== null && id_category !== undefined) {
            const category = await Categories.findByPk(id_category);
            if (!category) {
                return res.status(400).json({
                    message: "La categoría proporcionada no existe.",
                    timestamp: new Date()
                });
            }
            await product.update({ id_category });
        }

        // actualizar relaciones many-to-many
        if (keywords) await product.setKeywords(keywords);
        if (styles) await product.setStyles(styles);
        if (colors) await product.setColors(colors);
        if (themes) await product.setThemes(themes);

        // relación 1:N con imágenes (opcional)
        if (images) {
            await product.setImages([]);
            await Promise.all(images.map(img => product.createImage(img)));
        }

        // obtener el producto actualizado con todas sus asociaciones
        const updatedProduct = await Products.findByPk(id, {
            include: [
                "keywords",
                "styles",
                "colors",
                "themes",
                "series",
                "images",
                "category"
            ]
        });

        return res.status(200).json({
            message: "Relaciones actualizadas correctamente.",
            data: updatedProduct,
            timestamp: new Date()
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al actualizar relaciones del producto.",
            error: error.message,
            timestamp: new Date()
        });
    }
};

module.exports = updateRelations;


