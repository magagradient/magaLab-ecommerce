const { Order } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        const orders = await Order.findAll({ order: [["order_date", "DESC"]] });
        return responseHelper.successResponse(res, orders, "orders_index");
    } catch (error) {
        console.error("Error fetching orders:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "orders_index", 500);
    }
};

module.exports = index;
