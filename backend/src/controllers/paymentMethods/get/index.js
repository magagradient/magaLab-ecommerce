const { PaymentMethods } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        const methods = await PaymentMethods.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });

        return responseHelper.successResponse(res, methods, "payment_method_list");
    } catch (error) {
        console.error("Error al obtener métodos de pago:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "payment_method_list", 500);
    }
};

module.exports = index;
