const Joi = require('joi');

const productSearchSchema = Joi.object({
    query: Joi.string().min(1).max(200).required().messages({
        'string.base': 'El parámetro "query" debe ser un texto.',
        'string.empty': 'El parámetro "query" no puede estar vacío.',
        'string.min': 'El parámetro "query" debe tener al menos 1 carácter.',
        'any.required': 'El parámetro "query" es obligatorio.'
    })
});

module.exports = productSearchSchema;
