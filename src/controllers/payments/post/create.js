const { Payments } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    const { id_order, id_payment_method, status, amount_paid } = req.body;

    try {
        const newPayment = await Payments.create({
            id_order,
            id_payment_method,
            status,
            amount_paid
        });

        return responseHelper.successResponse(res, newPayment, "payment_create");
    } catch (error) {
        console.error("Error al registrar pago:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "payment_create", 500);
    }
};

module.exports = create;
