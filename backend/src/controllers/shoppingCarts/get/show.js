const { ShoppingCarts } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const showShoppingCart = async (req, res) => {
    try {
        const { id } = req.params;

        const cart = await ShoppingCarts.findByPk(id);

        if (!cart) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                "Carrito no encontrado.",
                "shopping_cart_show",
                404
            );
        }

        return responseHelper.successResponse(
            res,
            cart,
            "shopping_cart_show"
        );

    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "shopping_cart_show",
            500
        );
    }
};

module.exports = showShoppingCart;
