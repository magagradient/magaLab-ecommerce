const { Users } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        // Validación básica
        if (!email) {
            return responseHelper.errorResponse(
                res,
                "bad_request",
                "El email es requerido.",
                "password_reset_request",
                400
            );
        }

        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                "No se encontró un usuario con ese email.",
                "password_reset_request",
                404
            );
        }

        // Generamos un token simulado (esto luego se mejora con JWT u otro método seguro)
        const token = Math.random().toString(36).substr(2);

        // Simulación de envío de email (por ahora solo se devuelve en la respuesta)
        return responseHelper.successResponse(
            res,
            {
                message: "Solicitud de reseteo recibida.",
                email,
                token, // Solo para testeo en esta etapa
            },
            "password_reset_request"
        );

    } catch (error) {
        console.error("Error al solicitar reseteo de contraseña:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "password_reset_request",
            500
        );
    }
};

module.exports = requestPasswordReset;
