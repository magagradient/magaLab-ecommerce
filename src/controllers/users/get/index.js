const { Users } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const index = async (req, res) => {
    try {
        const { limit, page } = req.query;
        const offset = (page - 1) * limit;

        const users = await Users.findAll({
            attributes: { exclude: ["password"] },
            order: [["registration_date", "DESC"]],
            limit: Number(limit),
            offset: Number(offset),
            raw: true,
        });

        if (users.length === 0) {
            return responseHelper.successResponse(res, [], "users_index");
        }

        return responseHelper.successResponse(res, users, "users_index");
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "users_index", 500);
    }
};

module.exports = index;
