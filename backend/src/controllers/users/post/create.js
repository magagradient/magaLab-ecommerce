const { Users } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper'); 
const bcrypt = require("bcryptjs");

const create = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // chequeo básico
        if (!name || !email || !password) {
            return responseHelper.errorResponse(res, "bad_request", "Todos los campos son obligatorios.", "user_create", 400);
        }

        if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
            return responseHelper.errorResponse(res, "bad_request", "Los campos deben ser cadenas de texto.", "user_create", 400);
        }

        const normalizedEmail = email.toLowerCase().trim();

        // verificar si el email ya existe
        const existingUser = await Users.findOne({ where: { email: normalizedEmail } });
        if (existingUser) {
            return responseHelper.errorResponse(res, "email_already_registered", "El email ya está registrado.", "user_create", 409);
        }

        // hash de password
        const hashedPassword = await bcrypt.hash(password, 10);

        // crear nuevo usuario (guardar hash)
        const newUser = await Users.create({ 
            name, 
            email: normalizedEmail, 
            password: hashedPassword 
        });

        const createdUser = await Users.findByPk(newUser.id_user, {
            attributes: { exclude: ["password"] }
        });

        return responseHelper.successResponse(res, createdUser, "user_create");

    } catch (error) {
        console.error("Error al crear usuario:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "user_create", 500);
    }
};

module.exports = create;