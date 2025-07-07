const Joi = require("joi");

const productStylesCreateSchema = Joi.object({
    style_ids: Joi.array().items(
        Joi.number().integer().positive().required().messages({
            "number.base": "'style_ids' debe contener números.",
            "number.integer": "'style_ids' debe contener enteros.",
            "number.positive": "'style_ids' debe contener números positivos.",
            "any.required": "'style_ids' es obligatorio."
        })
    ).min(1).required().messages({
        "array.base": "'style_ids' debe ser un array.",
        "array.min": "Debe enviar al menos un estilo.",
        "any.required": "'style_ids' es obligatorio."
    }),
});

module.exports = productStylesCreateSchema;
