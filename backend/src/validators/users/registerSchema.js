const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
        "string.empty": "El nombre no puede estar vacío.",
        "string.min": "El nombre debe tener al menos 2 caracteres.",
        "any.required": "El nombre es obligatorio.",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email inválido.",
        "any.required": "El email es obligatorio.",
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "La contraseña debe tener al menos 6 caracteres.",
        "any.required": "La contraseña es obligatoria.",
    }),
});

module.exports = registerSchema;
