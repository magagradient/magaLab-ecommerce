const { Orders } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const update = async (req, res) => {
    const { id } = req.params;
    const { total, status } = req.body;

    try {
        const order = await Orders.findByPk(id);

        if (!order) {
            return responseHelper.errorResponse(res, "not_found", "Order not found", "orders_update", 404);
        }

        order.total = total !== undefined ? total : order.total;
        order.status = status !== undefined ? status : order.status;

        await order.save();

        return responseHelper.successResponse(res, order, "orders_update");
    } catch (error) {
        console.error("Error updating order:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "orders_update", 500);
    }
};

module.exports = update;
