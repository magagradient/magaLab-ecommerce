const { OrdersProducts } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const update = async (req, res) => {
    const { id_order, id_product } = req.params;
    const { quantity, unit_price } = req.body;

    try {
        const record = await OrdersProducts.findOne({
            where: { id_order, id_product },
        });

        if (!record) {
            return responseHelper.errorResponse(res, "not_found", "Record not found", "ordersProducts_update", 404);
        }

        record.quantity = quantity !== undefined ? quantity : record.quantity;
        record.unit_price = unit_price !== undefined ? unit_price : record.unit_price;

        await record.save();

        return responseHelper.successResponse(res, record, "ordersProducts_update");
    } catch (error) {
        console.error("Error updating order-product record:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "ordersProducts_update", 500);
    }
};

module.exports = update;
