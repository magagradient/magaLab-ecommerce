const { Users } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const requestPasswordChange = async (req, res) => {
    try {
        const { email } = req.body;

        // Validar que el email esté presente
        if (!email) {
            return responseHelper.errorResponse(res, "bad_request", "Se requiere un correo electrónico.", "password_change_request", 400);
        }

        // Verificar si el usuario existe con el email proporcionado
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return responseHelper.errorResponse(res, "not_found", "No se encuentra un usuario con ese correo.", "password_change_request", 404);
        }

        // Aquí no se implementa ningún token ni lógica de seguridad, solo respondemos con un mensaje
        return responseHelper.successResponse(res, { message: "Solicitud de cambio de contraseña recibida. Por favor, sigue las instrucciones." }, "password_change_request");

    } catch (error) {
        console.error("Error al solicitar cambio de contraseña:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "password_change_request", 500);
    }
};

module.exports = requestPasswordChange;
