const { UserCoupons, Coupons, Users } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const applyCoupon = async (req, res) => {
    const { id_user, id_coupon } = req.params;

    try {
        const user = await Users.findByPk(id_user);
        const coupon = await Coupons.findByPk(id_coupon);

        if (!user || !coupon) {
            return responseHelper.errorResponse(res, "user_or_coupon_not_found", "Usuario o cupón no encontrado.", "apply_coupon", 404);
        }

        // Verificar si el cupón ya fue usado por este usuario (opcional)
        const existingCoupon = await UserCoupons.findOne({
            where: {
                id_user: id_user,
                id_coupon: id_coupon,
            },
        });

        if (existingCoupon) {
            return responseHelper.errorResponse(res, "coupon_already_used", "El cupón ya ha sido utilizado por este usuario.", "apply_coupon", 400);
        }

        // Asociar el cupón al usuario
        const newUserCoupon = await UserCoupons.create({
            id_user: id_user,
            id_coupon: id_coupon,
        });

        return responseHelper.successResponse(res, {
            userCoupon: newUserCoupon,
            user,
            coupon
        }, "apply_coupon");

    } catch (error) {
        console.error("Error al aplicar el cupón al usuario:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "apply_coupon", 500);
    }
};

module.exports = applyCoupon;
