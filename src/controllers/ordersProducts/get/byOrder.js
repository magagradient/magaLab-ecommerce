const { OrdersProducts } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const byOrder = async (req, res) => {
    const { id_order } = req.params;
    try {
        const records = await OrdersProducts.findAll({
            where: { id_order },
        });
        return responseHelper.successResponse(res, records, "ordersProducts_byOrder");
    } catch (error) {
        console.error("Error fetching products by order:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "ordersProducts_byOrder", 500);
    }
};

module.exports = byOrder;
