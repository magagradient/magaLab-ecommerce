const Joi = require("joi");

const requestPasswordResetSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "'email' debe tener un formato válido.",
        "any.required": "'email' es obligatorio.",
        "string.empty": "'email' no puede estar vacío.",
    }),
});

module.exports = requestPasswordResetSchema;
