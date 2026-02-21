const Joi = require('joi');

const productSearchSchema = Joi.object({
    term: Joi.string().min(1).max(200).required().messages({
        'string.base': 'El parámetro "query" debe ser un texto.',
        'string.base': 'El parámetro "term" debe ser un texto.',
        'any.required': 'El parámetro "term" es obligatorio.'
    })
});

module.exports = productSearchSchema;
