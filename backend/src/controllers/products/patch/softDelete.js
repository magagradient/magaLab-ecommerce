const { Products } = require("../../../database/indexModels");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");

const softDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Products.findByPk(id);

        if (!product) {
            return errorResponse(res, "not_found", "Producto no encontrado", "products/softDelete", 404);
        }

        await product.destroy(); // Soft delete

        return successResponse(
            res,
            `Producto con id ${id} eliminado (soft delete) correctamente.`,
            "products/softDelete",
            { product }
        );

    } catch (error) {
        console.error(error);
        return errorResponse(res, "server_error", "Error al realizar el soft delete: " + error.message, "products/softDelete", 500);
    }
};


module.exports = softDelete;
