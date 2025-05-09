const { Coupons } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const index = async (req, res) => {
    const timestamp = new Date().toISOString();

    try {
        const coupons = await Coupons.findAll({
            raw: true, // Devuelve objetos planos directamente
        });

        if (coupons.length === 0) {
            return responseHelper.successResponse(res, [], "coupons_index");
        }

        return responseHelper.successResponse(res, coupons, "coupons_index");

    } catch (error) {
        console.error("Error al obtener cupones:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "coupons_index", 500);
    }
};

module.exports = index;
