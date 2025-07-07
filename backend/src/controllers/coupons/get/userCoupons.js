const { UserCoupons, Coupons } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const userCoupons = async (req, res) => {
    const { id_user} = req.params;

    try {
        const userCouponsList = await UserCoupons.findAll({
            where: { id_user: id_user },
            include: [
                {
                    model: Coupons,
                    as: "coupon", // Asumiendo que la relación está definida correctamente
                    attributes: ["id_coupon", "code", "discount", "expiration_date"],
                },
            ],
        });

        if (userCouponsList.length === 0) {
            return responseHelper.successResponse(res, [], "user_coupons_index");
        }

        return responseHelper.successResponse(res, userCouponsList, "user_coupons_index");

    } catch (error) {
        console.error("Error al obtener los cupones del usuario:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "user_coupons_index", 500);
    }
};

module.exports = userCoupons;
