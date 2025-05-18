const { PaymentMethods } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const update = async (req, res) => {
    const { id } = req.params;
    const { method_name } = req.body;

    try {
        const method = await PaymentMethods.findByPk(id);
        if (!method) {
            return responseHelper.errorResponse(res, "not_found", "Método de pago no encontrado.", "payment_method_update", 404);
        }

        method.method_name = method_name;
        await method.save();

        return responseHelper.successResponse(res, method, "payment_method_update");
    } catch (error) {
        console.error("Error al actualizar método de pago:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "payment_method_update", 500);
    }
};

module.exports = update;
