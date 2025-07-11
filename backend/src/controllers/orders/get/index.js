const { Orders } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        const { limit, page } = req.query;
        const offset = (page - 1) * limit;

        const orders = await Orders.findAll({
            order: [["order_date", "DESC"]],
            limit: Number(limit),
            offset: Number(offset),
        });

        return responseHelper.successResponse(res, orders, "orders_index");
    } catch (error) {
        console.error("Error fetching orders:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "orders_index", 500);
    }
};

module.exports = index;
