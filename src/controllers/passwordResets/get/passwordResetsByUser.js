const { Users, PasswordResets } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const passwordResetsByUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await Users.findByPk(id);
        
        if (!user) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                "Usuario no encontrado.",
                "password_resets_get",
                404
            );
        }

        // Obtener todas las solicitudes de reseteo de ese usuario
        const resets = await PasswordResets.findAll({ where: { userId: id } });

        if (resets.length === 0) {
            return responseHelper.successResponse(
                res,
                { message: "No se encontraron solicitudes de reseteo para este usuario." },
                "password_resets_get"
            );
        }

        // Devolver las solicitudes encontradas
        return responseHelper.successResponse(
            res,
            resets,
            "password_resets_get"
        );

    } catch (error) {
        console.error("Error al obtener los reseteos de contraseña:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "password_resets_get",
            500
        );
    }
};

module.exports = passwordResetsByUser;
