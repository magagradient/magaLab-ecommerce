const { Products } = require("../../../database/indexModels");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");

const toggleSold = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Products.findByPk(id);

        if (!product) {
            return errorResponse(res, "not_found", `No se encontró un producto con id ${id}`, "products/toggleSold", 404);
        }

        product.is_sold = !product.is_sold;
        await product.save();

        return successResponse(
            res,
            `El estado is_sold del producto con id ${id} fue cambiado a ${product.is_sold}`,
            "products/toggleSold",
            { product }
        );

    } catch (error) {
        console.error(error);
        return errorResponse(res, "server_error", `Error al cambiar el estado is_sold del producto: ${error.message}`, "products/toggleSold", 500);
    }
};

module.exports = toggleSold;
