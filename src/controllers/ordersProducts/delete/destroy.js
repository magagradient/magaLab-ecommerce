const { OrdersProducts } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    const { id_order, id_product } = req.params;

    try {
        const record = await OrdersProducts.findOne({
            where: { id_order, id_product },
        });

        if (!record) {
            return responseHelper.errorResponse(res, "not_found", "Record not found", "ordersProducts_destroy", 404);
        }

        await record.destroy();

        return responseHelper.successResponse(res, null, "ordersProducts_destroy");
    } catch (error) {
        console.error("Error deleting order-product record:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "ordersProducts_destroy", 500);
    }
};

module.exports = destroy;
