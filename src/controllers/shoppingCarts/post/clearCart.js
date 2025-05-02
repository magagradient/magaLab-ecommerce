const { CartItems } = require("../../../database/indexModels");
const { successResponse, errorResponse } = require("../../../utils/responseHelper");

const clearCart = async (req, res) => {
    const { id } = req.params; 

    try {
        const deletedCount = await CartItems.destroy({
            where: { id_cart: id }
        });

        return successResponse(res, 200, "Carrito vaciado correctamente.", {
            deleted_items: deletedCount,
            id_cart: id
        });
    } catch (error) {
        console.error("Error al vaciar el carrito:", error);
        return errorResponse(res, 500, "Error al vaciar el carrito.", error.message);
    }
};

module.exports = clearCart;
