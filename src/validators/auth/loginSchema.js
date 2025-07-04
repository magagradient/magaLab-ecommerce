const Joi = require("joi");

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Formato de email inválido.",
        "any.required": "El email es obligatorio.",
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "La contraseña debe tener al menos 6 caracteres.",
        "any.required": "La contraseña es obligatoria.",
    }),
});

module.exports = loginSchema;
