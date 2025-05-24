const Joi = require("joi");

const idParamSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        "any.required": "El parámetro 'id' es obligatorio.",
        "number.base": "El parámetro 'id' debe ser un número.",
        "number.integer": "El parámetro 'id' debe ser un número entero.",
        "number.positive": "El parámetro 'id' debe ser un número positivo."
    })
});

module.exports = idParamSchema;