const { Coupons } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const create = async (req, res) => {
    const { code, discount, expiration_date, max_uses, type } = req.body;
    const timestamp = new Date().toISOString();

    try {
        if (!code || !discount || !expiration_date || !type) {
            return responseHelper.errorResponse(res, "missing_fields", "Faltan campos obligatorios.", "coupons_create", 400);
        }

        const newCoupon = await Coupons.create({
            code,
            discount,
            expiration_date,
            max_uses: max_uses || null, // Usos máximos opcionales
            type,
        });

        return responseHelper.successResponse(res, newCoupon, "coupons_create");

    } catch (error) {
        console.error("Error al crear el cupón:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "coupons_create", 500);
    }
};

module.exports = create;
