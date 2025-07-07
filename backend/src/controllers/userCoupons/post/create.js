const { UserCoupons } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    const { id_user, id_coupon, used = 0, granted_date } = req.body;
    if (!id_user || !id_coupon) {
        return responseHelper.errorResponse(res, "invalid_data", "id_user y id_coupon son requeridos.", "user_coupons_create", 400);
    }

    try {
        const newUserCoupon = await UserCoupons.create({ id_user, id_coupon, used, granted_date });
        return responseHelper.successResponse(res, newUserCoupon, "user_coupons_create", 201);
    } catch (error) {
        console.error("Error al crear user coupon:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "user_coupons_create", 500);
    }
};

module.exports = create;