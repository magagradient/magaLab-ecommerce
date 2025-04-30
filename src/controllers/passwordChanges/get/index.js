const { PasswordChange } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const index = async (req, res) => {
    const { id } = req.params;

    try {
        const history = await PasswordChange.findAll({
            where: { user_id: id },
            attributes: { exclude: ["created_at", "updated_at"] },
            order: [["created_at", "DESC"]],
        });

        if (!history || history.length === 0) {
            return responseHelper.errorResponse(res, "not_found", "No se encontraron cambios de contraseña para este usuario.", "password_change_list", 404);
        }

        return responseHelper.successResponse(res, history, "password_change_list");
    } catch (error) {
        console.error("Error al obtener historial de cambios:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "password_change_list", 500);
    }
};

module.exports = index;
