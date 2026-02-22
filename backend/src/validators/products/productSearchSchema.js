const Joi = require('joi');

const productSearchSchema = Joi.object({
  q: Joi.string().min(1).max(200).required().messages({
    'string.base': 'El parámetro "q" debe ser un texto.',
    'string.empty': 'El parámetro "q" no puede estar vacío.',
    'string.min': 'El parámetro "q" debe tener al menos 1 carácter.',
    'any.required': 'El parámetro "q" es obligatorio.'
  })
});

module.exports = productSearchSchema;
