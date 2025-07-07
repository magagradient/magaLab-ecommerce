const { Payments } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");


const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const payment = await Payments.findByPk(id);
        if (!payment) {
            return responseHelper.errorResponse(res, "not_found", "Pago no encontrado.", "payment_delete", 404);
        }

        await payment.destroy();
        return responseHelper.successResponse(res, null, "payment_delete");
    } catch (error) {
        console.error("Error al eliminar pago:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "payment_delete", 500);
    }
};

module.exports = destroy;
