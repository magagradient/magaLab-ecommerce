const { UserCoupons } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const show = async (req, res) => {
    const { id } = req.params;
    try {
        const userCoupon = await UserCoupons.findByPk(id);
        if (!userCoupon) {
            return responseHelper.errorResponse(res, "not_found", "Registro no encontrado.", "user_coupons_show", 404);
        }
        return responseHelper.successResponse(res, userCoupon, "user_coupons_show");
    } catch (error) {
        console.error("Error al obtener user coupon:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "user_coupons_show", 500);
    }
};

module.exports = show;