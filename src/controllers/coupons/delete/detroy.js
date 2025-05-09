const { Coupons } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const destroy = async (req, res) => {
    const { id } = req.params;
    const timestamp = new Date().toISOString();

    try {
        const coupon = await Coupons.findByPk(id);

        if (!coupon) {
            return responseHelper.errorResponse(res, "coupon_not_found", "Cupón no encontrado.", "coupons_delete", 404);
        }

        await coupon.destroy(); // Elimina el cupón de la base de datos

        return responseHelper.successResponse(res, [], "coupons_delete");

    } catch (error) {
        console.error("Error al eliminar el cupón:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "coupons_delete", 500);
    }
};

module.exports = destroy;
