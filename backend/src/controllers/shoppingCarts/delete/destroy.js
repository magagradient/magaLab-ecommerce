const { ShoppingCarts } = require("../../../database/indexModels");
const { errorResponse, successResponse } = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const cart = await ShoppingCarts.findByPk(id);

        if (!cart) {
            return errorResponse(res, 404, "Carrito no encontrado.");
        }

        if (cart.is_deleted) {
            return errorResponse(res, 400, "El carrito ya fue eliminado.");
        }

        cart.is_deleted = true;
        await cart.save();

        return successResponse(res, 200, "Carrito eliminado correctamente (soft delete).", { id_cart: id });
    } catch (error) {
        console.error("Error al eliminar el carrito:", error);
        return errorResponse(res, 500, "Error al eliminar el carrito.", error.message);
    }
};

module.exports = destroy;
