const Joi = require("joi");

const updateBlogPostSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(255)
        .messages({
            "string.base": "El título debe ser un texto.",
            "string.empty": "El título no puede estar vacío.",
            "string.min": "El título debe tener al menos 3 caracteres.",
            "string.max": "El título no puede superar los 255 caracteres.",
        }),

    content: Joi.string()
        .min(10)
        .messages({
            "string.base": "El contenido debe ser un texto.",
            "string.empty": "El contenido no puede estar vacío.",
            "string.min": "El contenido debe tener al menos 10 caracteres.",
        }),

    author_id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El ID del autor debe ser un número.",
            "number.integer": "El ID del autor debe ser un número entero.",
            "number.positive": "El ID del autor debe ser un número positivo.",
        })
})
    // si no viene al menos un campo: lanza error.
    .min(1)
    .messages({
        "object.min": "Debe proporcionarse al menos un campo para actualizar."
    });

module.exports = updateBlogPostSchema;
