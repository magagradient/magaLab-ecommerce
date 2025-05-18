const { Payments, PaymentMethods } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        const payments = await Payments.findAll({
            include: [{ model: PaymentMethods,
                as: "paymentMethod",
                attributes: ["method_name"] }],
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });

        return responseHelper.successResponse(res, payments, "payment_list");
    } catch (error) {
        console.error("Error al obtener pagos:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "payment_list", 500);
    }
};

module.exports = index;
