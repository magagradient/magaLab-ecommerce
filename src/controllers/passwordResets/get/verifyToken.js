const { PasswordResets } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const verifyPasswordResetToken = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            return responseHelper.errorResponse(
                res,
                "bad_request",
                "El token es requerido.",
                "password_reset_verify",
                400
            );
        }

        const resetRequest = await PasswordResets.findOne({ where: { token } });

        if (!resetRequest) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                "Token inválido o inexistente.",
                "password_reset_verify",
                404
            );
        }

        return responseHelper.successResponse(
            res,
            { message: "Token válido." },
            "password_reset_verify"
        );

    } catch (error) {
        console.error("Error al verificar el token de reseteo:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "password_reset_verify",
            500
        );
    }
};

module.exports = verifyPasswordResetToken;
