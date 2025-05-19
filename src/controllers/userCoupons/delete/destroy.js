const { UserCoupons } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const userCoupon = await UserCoupons.findByPk(id);
        if (!userCoupon) {
            return responseHelper.errorResponse(res, "not_found", "Registro no encontrado.", "user_coupons_destroy", 404);
        }

        await userCoupon.destroy();
        return responseHelper.successResponse(res, null, "user_coupons_destroy");
    } catch (error) {
        console.error("Error al eliminar user coupon:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "user_coupons_destroy", 500);
    }
};

module.exports = destroy;