const bcrypt = require("bcryptjs");
const { Users, PasswordChanges } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const changePassword = async (req, res) => {
    try {
        const { id_user, currentPassword, newPassword } = req.body;

        if (!id_user || !currentPassword || !newPassword) {
            return responseHelper.errorResponse(
                res,
                "bad_request",
                "Faltan datos requeridos (id_user, currentPassword, newPassword).",
                "password_change_create",
                400
            );
        }

        const user = await Users.findOne({ where: { id_user } });
        if (!user) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                "Usuario no encontrado.",
                "password_change_create",
                404
            );
        }

        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            return responseHelper.errorResponse(
                res,
                "unauthorized",
                "La contraseña actual es incorrecta.",
                "password_change_create",
                401
            );
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedNewPassword });

        const ipAddress = req.ip || req.connection.remoteAddress;

        await PasswordChanges.create({
            id_user: id_user,
            change_date: new Date(), 
            ip_address: ipAddress
        });

        return responseHelper.successResponse(
            res,
            { message: "Contraseña cambiada correctamente." },
            "password_change_create"
        );

    } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "password_change_create",
            500
        );
    }
};

module.exports = changePassword;
