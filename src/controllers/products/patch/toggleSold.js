const { Products } = require("../../../database/indexModels");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");

const toggleSold = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Products.findByPk(id, {
            include: [{ all: true }]
        });

        if (!product) {
            return errorResponse(res, "not_found", `No se encontró un producto con id ${id}`, "products/toggleSold", 404);
        }

        product.is_sold = !product.is_sold;
        await product.save();

        const updatedProduct = await Products.findByPk(id, {
            include: [{ all: true }]
        });

        return successResponse(res, {
            message: `El estado is_sold del producto con id ${id} fue cambiado a ${updatedProduct.is_sold}`,
            product: updatedProduct
        }, "products/toggleSold");
    } catch (error) {
        console.error(error);
        return errorResponse(res, "server_error", `Error al cambiar el estado is_sold del producto: ${error.message}`, "products/toggleSold", 500);
    }
};

module.exports = toggleSold;
