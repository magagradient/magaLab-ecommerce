const Joi = require("joi");

const confirmPasswordResetSchema = Joi.object({
    token: Joi.string().required().messages({
        "any.required": "'token' es obligatorio.",
        "string.base": "'token' debe ser texto.",
        "string.empty": "'token' no puede estar vacío.",
    }),
    new_password: Joi.string().min(6).required().messages({
        "any.required": "'new_password' es obligatorio.",
        "string.min": "'new_password' debe tener al menos 6 caracteres.",
        "string.empty": "'new_password' no puede estar vacío.",
    }),
});

module.exports = confirmPasswordResetSchema;
