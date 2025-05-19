const { Products, Series, Categories } = require("../../../database/indexModels");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");

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
            return errorResponse(res, "not_found", "Producto no encontrado.", "products/updateRelations", 404);
        }

        // Construir objeto de actualización para series y categorías si vienen
        const updateFields = {};
        if (id_series !== undefined && id_series !== null) {
            const series = await Series.findByPk(id_series);
            if (!series) {
                return errorResponse(res, "bad_request", "La serie proporcionada no existe.", "products/updateRelations", 400);
            }
            updateFields.id_series = id_series;
        }
        if (id_category !== undefined && id_category !== null) {
            const category = await Categories.findByPk(id_category);
            if (!category) {
                return errorResponse(res, "bad_request", "La categoría proporcionada no existe.", "products/updateRelations", 400);
            }
            updateFields.id_category = id_category;
        }

        if (Object.keys(updateFields).length > 0) {
            await product.update(updateFields);
        }

        // Validar que sean arrays para relaciones many-to-many
        if (Array.isArray(keywords)) await product.setKeywords(keywords);
        if (Array.isArray(styles)) await product.setStyles(styles);
        if (Array.isArray(colors)) await product.setColors(colors);
        if (Array.isArray(themes)) await product.setThemes(themes);

        // Relación 1:N imágenes (si aplica)
        if (Array.isArray(images)) {
            await product.setImages([]); // eliminar anteriores
            await Promise.all(images.map(img => product.createImage(img)));
        }

        // Obtener producto actualizado con relaciones
        const updatedProduct = await Products.findByPk(id, {
            attributes: { exclude: ["created_at", "updated_at"] },
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

        return successResponse(res, updatedProduct, "products/updateRelations", "Relaciones actualizadas correctamente.");
    } catch (error) {
        console.error(error);
        return errorResponse(res, "server_error", "Error al actualizar relaciones del producto.", "products/updateRelations", 500, { description: error.message });
    }
};

module.exports = updateRelations;
