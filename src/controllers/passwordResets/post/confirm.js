const bcrypt = require("bcryptjs");
const { Users, PasswordResets } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const confirmPasswordReset = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return responseHelper.errorResponse(res, "bad_request", "Token y nueva contraseña requeridos.", "password_reset_confirm", 400);
        }

        // Buscar el token en la tabla
        const resetEntry = await PasswordResets.findOne({ where: { token, used: false } });

        if (!resetEntry) {
            return responseHelper.errorResponse(res, "invalid_token", "Token inválido o ya utilizado.", "password_reset_confirm", 400);
        }

        // 🔒 Validar expiración
        const now = new Date();
        if (resetEntry.expires_at < now) {
            return responseHelper.errorResponse(
                res,
                "expired_token",
                "El token ha expirado.",
                "password_reset_confirm",
                400
            );
        }
        // Buscar el usuario por id
        const user = await Users.findByPk(resetEntry.id_user);

        if (!user) {
            return responseHelper.errorResponse(res, "not_found", "Usuario no encontrado.", "password_reset_confirm", 404);
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar contraseña
        await user.update({ password: hashedPassword });

        // Marcar token como usado
        await resetEntry.update({ used: true });

        return responseHelper.successResponse(res, { message: "Contraseña actualizada correctamente." }, "password_reset_confirm");

    } catch (error) {
        console.error("Error al confirmar cambio de contraseña:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "password_reset_confirm", 500);
    }
};

module.exports = confirmPasswordReset;
