const { Users } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const destroy = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);

        // Validamos que el usuario exista
        if (!user) {
            return responseHelper.errorResponse(res, "user_not_found", responseHelper.errorMessages.user_not_found, "user_destroy", 404);
        }

        // Si el usuario está intentando eliminar su cuenta, actualizamos el campo 'is_deleted' a true
        user.is_deleted = true;
        
        // Guardamos los cambios
        await user.save();

        // Respondemos con el usuario que fue marcado como eliminado
        const deletedUser = await Users.findByPk(user.id_user, {
            attributes: { exclude: ["password"] } // Excluimos la contraseña
        });

        return responseHelper.successResponse(res, deletedUser, "user_destroy");
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "user_destroy", 500);
    }
};

module.exports = destroy;
