const Joi = require("joi");

const passwordResetRequestSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Formato de email inválido.",
        "any.required": "El email es obligatorio.",
    }),
});

module.exports = passwordResetRequestSchema;
