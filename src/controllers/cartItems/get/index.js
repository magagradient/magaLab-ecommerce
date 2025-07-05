const { ShoppingCarts, CartItems, Products } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const cartItemsIndex = async (req, res) => {
    const { user_id, limit = 10, page = 1 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    try {
        const cart = await ShoppingCarts.findOne({
            where: { id_user: user_id },
            include: {
                model: CartItems,
                as: "cartItems",
                include: {
                    model: Products,
                    as: "product",
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
                limit: Number(limit),
                offset: Number(offset),
            },
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
