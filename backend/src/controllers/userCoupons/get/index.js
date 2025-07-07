const { UserCoupons } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        const userCoupons = await UserCoupons.findAll();
        return responseHelper.successResponse(res, userCoupons, "user_coupons_index");
    } catch (error) {
        console.error("Error al obtener user coupons:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "user_coupons_index", 500);
    }
};


module.exports = index;
