const crypto = require("crypto");
const { Users, PasswordResets } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");
const { sendResetEmail } = require("../../../utils/mailer");

const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return responseHelper.errorResponse(res, "bad_request", "Se requiere un correo electrónico.", "password_reset_request", 400);
        }

        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return responseHelper.errorResponse(res, "not_found", "No se encontró un usuario con ese correo.", "password_reset_request", 404);
        }

        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

        await PasswordResets.create({
            id_user: user.id_user,
            token,
            used: false,
            expires_at: expiresAt,
        });

        await sendResetEmail(user.email, token); // 📬 enviar email

        return responseHelper.successResponse(
            res,
            { message: "Solicitud recibida. Revisá tu correo para continuar." },
            "password_reset_request"
        );
    } catch (error) {
        console.error("Error al solicitar reseteo de contraseña:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "password_reset_request", 500);
    }
};

module.exports = requestPasswordReset;
