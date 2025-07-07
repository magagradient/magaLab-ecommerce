const { Users } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const update = async (req, res) => {
    try {
        const { name, password } = req.body; // Excluimos is_deleted de aquí, no debe ser actualizado por el usuario
        const user = await Users.findByPk(req.params.id);

        // Validamos que el usuario exista
        if (!user) {
            return responseHelper.errorResponse(res, "user_not_found", responseHelper.errorMessages.user_not_found, "user_update", 404);
        }

        // Si se pasó el 'name', lo actualizamos
        if (name) user.name = name;
        // Si se pasó el 'password', lo actualizamos
        if (password) user.password = password;

        // **No permitimos actualizar is_deleted** desde aquí
        // Esto previene que los usuarios puedan modificar el campo 'is_deleted'.

        // Guardamos los cambios
        await user.save();

        // Obtenemos el usuario actualizado sin la contraseña
        const updatedUser = await Users.findByPk(user.id_user, {
            attributes: { exclude: ["password"] }
        });

        // Respondemos con el usuario actualizado
        return responseHelper.successResponse(res, updatedUser, "user_update");

    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "user_update", 500);
    }
};

module.exports = update;
