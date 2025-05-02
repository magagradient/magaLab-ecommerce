const { ShoppingCarts, CartItems, Products } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const getActiveCartByUser = async (req, res) => {
    try {
        const { id_user } = req.params;

        const cart = await ShoppingCarts.findOne({
            where: { id_user },
            include: [
                {
                    model: CartItems,
                    include: [
                        {
                            model: Products
                        }
                    ]
                }
            ]
        });

        if (!cart) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                "No se encontró un carrito activo para este usuario.",
                "get_user_cart",
                404
            );
        }

        return responseHelper.successResponse(
            res,
            cart,
            "get_user_cart"
        );

    } catch (error) {
        console.error("Error al obtener el carrito del usuario:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "get_user_cart",
            500
        );
    }
};

module.exports = getActiveCartByUser;
