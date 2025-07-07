const { OrdersProducts } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        const records = await OrdersProducts.findAll();
        return responseHelper.successResponse(res, records, "ordersProducts_index");
    } catch (error) {
        console.error("Error fetching orders-products:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "ordersProducts_index", 500);
    }
};

module.exports = index;
