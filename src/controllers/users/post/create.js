const { Users } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper'); // Importamos el responseHelper

const create = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Chequeo básico (por ahora, sin modularizar validaciones)
        if (!name || !email || !password) {
            return responseHelper.errorResponse(res, "bad_request", "Todos los campos son obligatorios.", "user_create", 400);
        }

        if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
            return responseHelper.errorResponse(res, "bad_request", "Los campos deben ser cadenas de texto.", "user_create", 400);
        }

        // Verificar si el email ya existe
        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return responseHelper.errorResponse(res, "email_already_registered", "El email ya está registrado.", "user_create", 409);
        }

        // Crear nuevo usuario
        const newUser = await Users.create({ name, email, password });
        const createdUser = await Users.findByPk(newUser.id_user, {
            attributes: { exclude: ["password"] }
        });

        return responseHelper.successResponse(res, createdUser, "user_create"); // Por ahora usamos successResponse para todo (incluso 201)

    } catch (error) {
        console.error("Error al crear usuario:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "user_create", 500);
    }
};

module.exports = create;
