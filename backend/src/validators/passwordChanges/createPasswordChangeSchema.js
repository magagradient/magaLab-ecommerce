const Joi = require('joi');

const createPasswordChangeSchema = Joi.object({
    id_user: Joi.number().integer().positive().required().messages({
        'number.base': `'id_user' debe ser un número.`,
        'number.integer': `'id_user' debe ser un número entero.`,
        'number.positive': `'id_user' debe ser un número positivo.`,
        'any.required': `'id_user' es obligatorio.`,
    }),
    ip_address: Joi.string().max(50).required().messages({
        'string.base': `'ip_address' debe ser un texto.`,
        'string.max': `'ip_address' no puede superar 50 caracteres.`,
        'any.required': `'ip_address' es obligatorio.`,
    }),
});

module.exports = createPasswordChangeSchema;
