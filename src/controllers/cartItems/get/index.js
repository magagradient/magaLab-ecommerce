const { ShoppingCarts, CartItems, Products } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const cartItemsIndex = async (req, res) => {
    const { user_id } = req.query;

    try {
        if (!user_id) {
            return responseHelper.errorResponse(
                res,
                "bad_request",
                "Se requiere el parámetro user_id.",
                "cart_item_list",
                400
            );
        }

        const cart = await ShoppingCarts.findOne({
            where: { id_user: user_id },
            include: {
                model: CartItems,
                as: "cartItems",
                include: {
                    model: Products,
                    as: "product",
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                }
            }
        });

        if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                "No se encontraron ítems en el carrito del usuario.",
                "cart_item_list",
                404
            );
        }

        return responseHelper.successResponse(res, cart.cartItems, "cart_item_list");
    } catch (error) {
        console.error("Error al obtener ítems del carrito:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "cart_item_list",
            500
        );
    }
};

module.exports = cartItemsIndex;
