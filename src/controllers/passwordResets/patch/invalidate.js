const { PasswordResets } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const invalidatePasswordResetToken = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            return responseHelper.errorResponse(
                res,
                "bad_request",
                "El token es requerido.",
                "password_reset_invalidate",
                400
            );
        }

        const resetEntry = await PasswordResets.findOne({ where: { token } });

        if (!resetEntry) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                "Token no encontrado.",
                "password_reset_invalidate",
                404
            );
        }

        if (resetEntry.used) {
            return responseHelper.errorResponse(
                res,
                "already_invalidated",
                "El token ya estaba invalidado.",
                "password_reset_invalidate",
                400
            );
        }

        resetEntry.used = true;
        await resetEntry.save();

        return responseHelper.successResponse(
            res,
            { message: "Token invalidado correctamente." },
            "password_reset_invalidate"
        );

    } catch (error) {
        console.error("Error al invalidar el token de reseteo:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "password_reset_invalidate",
            500
        );
    }
};

module.exports = invalidatePasswordResetToken;
