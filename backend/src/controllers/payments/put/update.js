const { Payments } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const update = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const payment = await Payments.findByPk(id);
        if (!payment) {
            return responseHelper.errorResponse(res, "not_found", "Pago no encontrado.", "payment_update", 404);
        }

        payment.status = status;
        await payment.save();

        return responseHelper.successResponse(res, payment, "payment_update");
    } catch (error) {
        console.error("Error al actualizar estado del pago:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "payment_update", 500);
    }
};

module.exports = update;
