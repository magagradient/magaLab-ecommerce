const { Users } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const updateRole = async (req, res) => {
    try {
        const userId = req.params.id;
        const { role } = req.body;

        // Validamos si el rol es válido
        if (role !== 'user' && role !== 'admin') {
            return responseHelper.errorResponse(res, "invalid_role", "El rol debe ser 'user' o 'admin'.", "user_update_role", 400);
        }

        // Buscamos al usuario
        const user = await Users.findByPk(userId);

        // Validamos si el usuario existe
        if (!user) {
            return responseHelper.errorResponse(res, "user_not_found", "Usuario no encontrado.", "user_update_role", 404);
        }

        // Actualizamos el rol del usuario
        user.role = role;
        await user.save();

        // Respondemos con el usuario actualizado
        const updatedUser = await Users.findByPk(user.id_user, {
            attributes: { exclude: ["password"] }
        });

        return responseHelper.successResponse(res, updatedUser, "user_update_role");

    } catch (error) {
        console.error("Error al actualizar el rol del usuario:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "user_update_role", 500);
    }
};

module.exports = updateRole;
