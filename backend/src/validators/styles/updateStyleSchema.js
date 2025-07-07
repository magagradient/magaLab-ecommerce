const Joi = require("joi");

const updateStyleSchema = Joi.object({
    name: Joi.string().trim().min(1).max(100).required().messages({
        "string.base": "El nombre debe ser una cadena de texto",
        "string.empty": "El nombre no puede estar vacío",
        "string.min": "El nombre debe tener al menos 1 carácter",
        "string.max": "El nombre no puede superar los 100 caracteres",
        "any.required": "El nombre es obligatorio"
    })
});

module.exports = updateStyleSchema;
