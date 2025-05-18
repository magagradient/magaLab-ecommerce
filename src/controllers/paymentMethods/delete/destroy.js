const { PaymentMethods } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const method = await PaymentMethods.findByPk(id);
        if (!method) {
            return responseHelper.errorResponse(res, "not_found", "Método de pago no encontrado.", "payment_method_delete", 404);
        }

        await method.destroy();
        return responseHelper.successResponse(res, null, "payment_method_delete");
    } catch (error) {
        console.error("Error al eliminar método de pago:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "payment_method_delete", 500);
    }
};

module.exports = destroy;
