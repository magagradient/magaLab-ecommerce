const { Order } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const byUser = async (req, res) => {
    const { id_user } = req.params;
    try {
        const orders = await Order.findAll({
            where: { id_user },
            order: [["order_date", "DESC"]],
        });
        return responseHelper.successResponse(res, orders, "orders_byUser");
    } catch (error) {
        console.error("Error fetching orders by user:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "orders_byUser", 500);
    }
};

module.exports = byUser;
