const { PaymentMethods } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    const { method_name } = req.body;

    try {
        const newMethod = await PaymentMethods.create({ method_name });
        return responseHelper.successResponse(res, newMethod, "payment_method_create");
    } catch (error) {
        console.error("Error al crear método de pago:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "payment_method_create", 500);
    }
};

module.exports = create;
