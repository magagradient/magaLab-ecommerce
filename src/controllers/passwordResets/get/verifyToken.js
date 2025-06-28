const { PasswordResets } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const verifyPasswordResetToken = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            return responseHelper.errorResponse(res, "bad_request", "El token es requerido.", "password_reset_verify", 400);
        }

        const resetEntry = await PasswordResets.findOne({ where: { token, used: false } });

        if (!resetEntry) {
            return responseHelper.errorResponse(res, "invalid_token", "Token inválido o ya utilizado.", "password_reset_verify", 400);
        }

        // ✅ Verificación de expiración
        const now = new Date();
        if (resetEntry.expires_at < now) {
            return responseHelper.errorResponse(
                res,
                "expired_token",
                "El token ha expirado.",
                "password_reset_verify",
                400
            );
        }

        return responseHelper.successResponse(
            res,
            { message: "Token verificado con éxito." },
            "password_reset_verify"
        );
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "password_reset_verify", 500);
    }
};

module.exports = verifyPasswordResetToken;
