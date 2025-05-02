const { ShoppingCarts } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, expires_at } = req.body;

        const cart = await ShoppingCarts.findByPk(id);
        if (!cart) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                "Carrito no encontrado.",
                "shopping_cart_update",
                404
            );
        }

        // Actualizar los campos permitidos
        if (status) cart.status = status;
        if (expires_at) cart.expires_at = expires_at;

        // Guardar los cambios
        await cart.save();

        return responseHelper.successResponse(
            res,
            {
                message: "Carrito actualizado correctamente.",
                data: cart,
            },
            "shopping_cart_update"
        );
    } catch (error) {
        console.error("Error al actualizar carrito:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "shopping_cart_update",
            500
        );
    }
};

module.exports = updateCart;
