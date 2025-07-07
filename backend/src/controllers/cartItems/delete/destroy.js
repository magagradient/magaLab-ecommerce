const { CartItems } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const deleteCartItem = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await CartItems.findByPk(id);

        if (!item) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                "Ítem del carrito no encontrado.",
                "cart_item_delete",
                404
            );
        }

        await item.destroy();

        return responseHelper.successResponse(
            res,
            { message: `Ítem con id ${id} eliminado.` },
            "cart_item_delete"
        );
    } catch (error) {
        console.error("Error al eliminar ítem del carrito:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "cart_item_delete",
            500
        );
    }
};

module.exports = deleteCartItem;
