const { CartItems } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const clearCartItems = async (req, res) => {
    const { id_cart } = req.body;

    if (!id_cart) {
        return responseHelper.errorResponse(
            res,
            "bad_request",
            "Falta el id_cart en el cuerpo de la solicitud.",
            "cart_items_clear",
            400
        );
    }

    try {
        const deletedCount = await CartItems.destroy({
            where: { id_cart }
        });

        return responseHelper.successResponse(
            res,
            { message: `Se eliminaron ${deletedCount} ítems del carrito.` },
            "cart_items_clear"
        );
    } catch (error) {
        console.error("Error al vaciar el carrito:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "cart_items_clear",
            500
        );
    }
};

module.exports = clearCartItems;
