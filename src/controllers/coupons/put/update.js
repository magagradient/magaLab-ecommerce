const { Coupons } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const update = async (req, res) => {
    const { id } = req.params;
    const { code, discount, expiration_date, max_uses, type } = req.body;
    const timestamp = new Date().toISOString();

    try {
        const coupon = await Coupons.findByPk(id);

        if (!coupon) {
            return responseHelper.errorResponse(res, "coupon_not_found", "Cupón no encontrado.", "coupons_update", 404);
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
