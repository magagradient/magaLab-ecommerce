const { Products, Categories, Series } = require("../../../database/indexModels");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    try {
        const product = await Products.findByPk(req.params.id, {
            include: [
                { model: Categories, as: "category" },
                { model: Series, as: "series" }
            ]
        });

        if (!product) {
            return errorResponse(res, "not_found", "Producto no encontrado.", "products_destroy", 404);
        }

        await product.destroy();

        return successResponse(res, { id: product.id_product }, "products_destroy", "Producto eliminado correctamente.");

    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return errorResponse(res, "server_error", "Error interno del servidor", "products_destroy", 500, error.message);
    }
};

module.exports = destroy;
