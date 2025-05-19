const { Products, Categories, Series } = require("../../../database/indexModels");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");

const update = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            is_sold,
            sold_at,
            id_category,
            id_series,
        } = req.body;

        const product = await Products.findByPk(req.params.id);

        if (!product) {
            return errorResponse(res, "not_found", "Producto no encontrado.", "products/update", 404);
        }

        product.title = title ?? product.title;
        product.description = description ?? product.description;
        product.price = price ?? product.price;
        product.is_sold = is_sold ?? product.is_sold;
        product.sold_at = sold_at ?? product.sold_at;
        product.id_category = id_category ?? product.id_category;
        product.id_series = id_series ?? product.id_series;

        await product.save();

        const updatedProduct = await Products.findByPk(product.id_product, {
            attributes: { exclude: ["created_at", "updated_at"] },
            include: [
                { model: Categories, as: "category", attributes: { exclude: ["created_at", "updated_at"] } },
                { model: Series, as: "series", attributes: { exclude: ["created_at", "updated_at"] } },
            ],
        });

        return successResponse(res, updatedProduct, "products/update", "Producto actualizado correctamente.");
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return errorResponse(res, "server_error", "Error interno del servidor", "products/update", 500, { description: error.message });
    }
};

module.exports = update;
