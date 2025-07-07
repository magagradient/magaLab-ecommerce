const Joi = require("joi");

const createBlogPostSchema = Joi.object({
    // si falta o es muy corto: devuelve error de validación.
    title: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            "string.base": "El título debe ser un texto.",
            "string.empty": "El título no puede estar vacío.",
            "string.min": "El título debe tener al menos 3 caracteres.",
            "string.max": "El título no puede superar los 255 caracteres.",
            "any.required": "El título es obligatorio."
        }),


    // si está vacío o falta: error de validación.
    content: Joi.string()
        .min(10)
        .required()
        .messages({
            "string.base": "El contenido debe ser un texto.",
            "string.empty": "El contenido no puede estar vacío.",
            "string.min": "El contenido debe tener al menos 10 caracteres.",
            "any.required": "El contenido es obligatorio."
        }),

    // si se manda un string, negativo o no se manda: error.
    author_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "El ID del autor debe ser un número.",
            "number.integer": "El ID del autor debe ser un número entero.",
            "number.positive": "El ID del autor debe ser un número positivo.",
            "any.required": "El ID del autor es obligatorio."
        })
});

module.exports = createBlogPostSchema;
