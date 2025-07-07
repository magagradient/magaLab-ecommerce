const Joi = require("joi");
const idParamSchema = require('../shared/idParamSchema');

const productImageParamsSchema = idParamSchema.keys({
    imageId: Joi.number().integer().positive().messages({
        'number.base': `'imageId' debe ser un número`,
        'number.integer': `'imageId' debe ser un número entero`,
        'number.positive': `'imageId' debe ser un número positivo`,
    }),
});

module.exports = productImageParamsSchema;