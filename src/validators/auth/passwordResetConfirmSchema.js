const Joi = require("joi");

const passwordResetConfirmSchema = Joi.object({
    token: Joi.string().required().messages({
        "any.required": "El token es obligatorio.",
    }),
    newPassword: Joi.string().min(6).required().messages({
        "string.min": "La nueva contraseña debe tener al menos 6 caracteres.",
        "any.required": "La nueva contraseña es obligatoria.",
    }),
});

module.exports = passwordResetConfirmSchema;
