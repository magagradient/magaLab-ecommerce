const Joi = require('joi');

const statusParamSchema = Joi.object({
    type: Joi.string()
        .valid('sold', 'available', 'deleted')
        .required()
        .messages({
            'any.only': `"type" debe ser uno de los siguientes valores: sold, available, deleted`,
            'any.required': `"type" es obligatorio`
        })
});

module.exports = statusParamSchema;
