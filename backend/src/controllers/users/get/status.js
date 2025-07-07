const { Users } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const status = async (req, res) => {
    try {
        // Obtener el parámetro de consulta 'is_deleted'
        const { is_deleted } = req.query;

        // Validación básica de 'is_deleted' para ser un valor booleano
        if (is_deleted !== 'true' && is_deleted !== 'false') {
            return responseHelper.errorResponse(res, "bad_request", "El valor de is_deleted debe ser 'true' o 'false'.", "user_get_by_status", 400);
        }

        // Convertir 'is_deleted' a booleano
        const isDeleted = is_deleted === 'true';

        // Buscar los usuarios según el valor de is_deleted
        const users = await Users.findAll({
            where: { is_deleted: isDeleted },
            attributes: { exclude: ["password"] }, // Excluir la contraseña en la respuesta
        });

        // Si no hay usuarios, respondemos con un mensaje adecuado
        if (users.length === 0) {
            return responseHelper.successResponse(res, [], "user_get_by_status");
        }

        return responseHelper.successResponse(res, users, "user_get_by_status");

    } catch (error) {
        console.error("Error al obtener usuarios por estado:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "user_get_by_status", 500);
    }
};

module.exports = status;
