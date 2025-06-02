const Joi = require("joi");

const styleIdParamSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        "any.required": "El parámetro 'id' es requerido",
        "number.base": "'id' debe ser un número",
        "number.integer": "'id' debe ser un número entero",
        "number.positive": "'id' debe ser un número positivo"
    })
});

module.exports = styleIdParamSchema;