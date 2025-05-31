const Joi = require('joi');

const categoryUpdateSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        'string.base': `'name' debe ser un texto`,
        'string.empty': `'name' no puede estar vacío`,
        'any.required': `'name' es obligatorio`,
    }),
});

module.exports = categoryUpdateSchema;
