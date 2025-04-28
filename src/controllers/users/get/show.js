const { Users } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper'); 

const show = async (req, res) => {
    const userId = req.params.id;
    if (isNaN(userId)) {
        return responseHelper.errorResponse(res, "invalid_id", "ID inválido proporcionado.", "user_show", 400);
    }

    try {
        const user = await Users.findByPk(userId, {
            attributes: { exclude: ["password"] }
        });

        if (!user) {
            return responseHelper.errorResponse(res, "user_not_found", "Usuario no encontrado.", "user_show", 404);
        }

        return responseHelper.successResponse(res, user, "user_show");

    } catch (error) {
        console.error("Error al obtener usuario:", error);

        return responseHelper.errorResponse(res, "server_error", error.message, "user_show", 500);
    }
};

module.exports = show;
