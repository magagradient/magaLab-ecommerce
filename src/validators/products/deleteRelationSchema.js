const Joi = require("joi");

module.exports = Joi.object({
    idProduct: Joi.number().integer().positive().required().messages({
        "any.required": "El parámetro 'idProduct' es obligatorio.",
        "number.base": "El parámetro 'idProduct' debe ser un número.",
        "number.integer": "El parámetro 'idProduct' debe ser un número entero.",
        "number.positive": "El parámetro 'idProduct' debe ser positivo."
    }),
    relationType: Joi.string().valid("color", "theme", "style", "keyword").required().messages({
        "any.only": "El parámetro 'relationType' debe ser uno de: color, theme, style, keyword.",
        "any.required": "El parámetro 'relationType' es obligatorio."
    }),
    relationId: Joi.number().integer().positive().required().messages({
        "any.required": "El parámetro 'relationId' es obligatorio.",
        "number.base": "El parámetro 'relationId' debe ser un número.",
        "number.integer": "El parámetro 'relationId' debe ser entero.",
        "number.positive": "El parámetro 'relationId' debe ser positivo."
    })
});
