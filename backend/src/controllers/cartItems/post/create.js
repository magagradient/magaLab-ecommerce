const { CartItems } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const createCartItem = async (req, res) => {
    const { id_cart, id_product, quantity = 1 } = req.body;

    if (!id_cart || !id_product) {
        return responseHelper.errorResponse(
            res,
            "bad_request",
            "Faltan parámetros obligatorios: id_cart o id_product.",
            "cart_item_create",
            400
        );
    }

    try {
        const existingItem = await CartItems.findOne({
            where: { id_cart, id_product }
        });

        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
            return responseHelper.successResponse(res, existingItem, "cart_item_create");
        }

        const newItem = await CartItems.create({
            id_cart,
            id_product,
            quantity
        });

        return responseHelper.successResponse(res, newItem, "cart_item_create");
    } catch (error) {
        console.error("Error al agregar ítem al carrito:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "cart_item_create",
            500
        );
    }
};

module.exports = createCartItem;
