const Joi = require("joi");

const productThemesCreateSchema = Joi.object({
    theme_ids: Joi.array().items(
        Joi.number().integer().positive().required().messages({
            "number.base": "'id_theme' debe ser un número.",
            "number.integer": "'id_theme' debe ser un número entero.",
            "number.positive": "'id_theme' debe ser un número positivo.",
            "any.required": "'id_theme' es obligatorio.",
        })
    ).min(1).required().messages({
        "array.base": "'theme_ids' debe ser un array.",
        "array.min": "Debe enviar al menos un id_theme.",
        "any.required": "'theme_ids' es obligatorio."
    }),
});

module.exports = productThemesCreateSchema;
