const { Orders } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const show = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Orders.findByPk(id);
        if (!order) {
            return responseHelper.errorResponse(res, "not_found", "Order not found", "orders_show", 404);
        }
        return responseHelper.successResponse(res, order, "orders_show");
    } catch (error) {
        console.error("Error fetching order:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "orders_show", 500);
    }
};

module.exports = show;
