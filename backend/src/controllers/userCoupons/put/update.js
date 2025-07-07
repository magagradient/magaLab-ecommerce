const { UserCoupons } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const update = async (req, res) => {
    const { id } = req.params;
    const { used, granted_date } = req.body;

    try {
        const userCoupon = await UserCoupons.findByPk(id);
        if (!userCoupon) {
            return responseHelper.errorResponse(res, "not_found", "Registro no encontrado.", "user_coupons_update", 404);
        }

        if (used !== undefined) userCoupon.used = used;
        if (granted_date !== undefined) userCoupon.granted_date = granted_date;

        await userCoupon.save();
        return responseHelper.successResponse(res, userCoupon, "user_coupons_update");
    } catch (error) {
        console.error("Error al actualizar user coupon:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "user_coupons_update", 500);
    }
};

module.exports = update;