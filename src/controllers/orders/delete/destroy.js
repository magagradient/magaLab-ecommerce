const { Order } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return responseHelper.errorResponse(res, "not_found", "Order not found", "orders_destroy", 404);
        }

        await order.destroy();

        return responseHelper.successResponse(res, null, "orders_destroy");
    } catch (error) {
        console.error("Error deleting order:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "orders_destroy", 500);
    }
};

module.exports = destroy;
