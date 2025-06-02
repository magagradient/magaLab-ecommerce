const Joi = require("joi");

const createKeywordSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.base": `"name" debe ser un texto.`,
            "string.empty": `"name" no puede estar vacío.`,
            "string.min": `"name" debe tener al menos 3 caracteres.`,
            "string.max": `"name" no puede tener más de 50 caracteres.`,
            "any.required": `"name" es obligatorio.`,
        }),
});

module.exports = createKeywordSchema;