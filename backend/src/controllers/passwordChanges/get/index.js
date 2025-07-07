const { PasswordChanges } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const passwordChangesIndex = async (req, res) => {
    const { id } = req.params;

    try {
        const history = await PasswordChanges.findAll({
            where: { id_user: id },
            attributes: { exclude: ["createdAt", "updatedAt"] }, 
            order: [["change_date", "DESC"]], 
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

module.exports = passwordChangesIndex;
