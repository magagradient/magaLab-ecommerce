const Joi = require("joi");

const createProductImageSchema = Joi.object({
    image_url: Joi.string().uri().max(255).required()
        .messages({
            "string.base": `"image_url" debe ser una cadena de texto.`,
            "string.uri": `"image_url" debe ser una URL válida.`,
            "string.max": `"image_url" debe tener máximo 255 caracteres.`,
            "any.required": `"image_url" es obligatorio.`,
        }),
});

module.exports = createProductImageSchema;
