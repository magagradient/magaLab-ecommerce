const { Coupons } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const update = async (req, res) => {
    const { id } = req.params;
    const { code, discount, expiration_date, max_uses, type } = req.body;

    try {
        const coupon = await Coupons.findByPk(id);

        if (!coupon) {
            return responseHelper.errorResponse(res, "coupon_not_found", "Cupón no encontrado.", "coupons_update", 404);
        }

        // Validar código único (si se actualiza)
        if (code) {
            const existingCoupon = await Coupons.findOne({ where: { code } });
            if (existingCoupon && existingCoupon.id_coupon !== coupon.id_coupon) {
                return responseHelper.errorResponse(res, "coupon_code_exists", "El código del cupón ya está en uso.", "coupons_update", 400);
            }
        }

        // Validar descuento
        if (discount <= 0 || discount > 100) {
            return responseHelper.errorResponse(res, "invalid_discount", "El descuento debe estar entre 1 y 100.", "coupons_update", 400);
        }

        // Actualizar los campos
        coupon.code = code || coupon.code;
        coupon.discount = discount || coupon.discount;
        coupon.expiration_date = expiration_date || coupon.expiration_date;
        coupon.max_uses = max_uses || coupon.max_uses;
        coupon.type = type || coupon.type;

        await coupon.save();

        return responseHelper.successResponse(res, coupon, "coupons_update");

    } catch (error) {
        console.error("Error al actualizar el cupón:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "coupons_update", 500);
    }
};

module.exports = update;
