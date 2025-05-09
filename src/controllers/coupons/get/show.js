const { Coupons } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const show = async (req, res) => {
    const { id } = req.params;
    const timestamp = new Date().toISOString();

    try {
        const coupon = await Coupons.findByPk(id);

        if (!coupon) {
            return responseHelper.errorResponse(res, "coupon_not_found", "Cupón no encontrado.", "coupons_show", 404);
        }

        return responseHelper.successResponse(res, coupon, "coupons_show");

    } catch (error) {
        console.error("Error al obtener el cupón:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "coupons_show", 500);
    }
};

module.exports = show;
