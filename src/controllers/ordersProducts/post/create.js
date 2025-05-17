const { OrdersProducts } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    try {
        const { id_order, id_product, quantity, unit_price } = req.body;

        const newRecord = await OrdersProducts.create({
            id_order,
            id_product,
            quantity: quantity || 1,
            unit_price,
        });

        return responseHelper.successResponse(res, newRecord, "ordersProducts_create", 201);
    } catch (error) {
        console.error("Error creating order-product record:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "ordersProducts_create", 500);
    }
};

module.exports = create;
