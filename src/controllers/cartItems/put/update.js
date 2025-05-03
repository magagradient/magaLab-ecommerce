const { CartItems } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const update = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
        return responseHelper.errorResponse(
            res,
            "bad_request",
            "La cantidad debe ser un número mayor o igual a 1.",
            "cart_item_update",
            400
        );
    }

    try {
        const item = await CartItems.findByPk(id);

        if (!item) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                "Ítem del carrito no encontrado.",
                "cart_item_update",
                404
            );
        }

        item.quantity = quantity;
        await item.save();

        return responseHelper.successResponse(res, item, "cart_item_update");
    } catch (error) {
        console.error("Error al actualizar ítem del carrito:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "cart_item_update",
            500
        );
    }
};

module.exports = update;
