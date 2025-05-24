const Joi = require('joi');

const updateRelationsSchema = Joi.object({
    keywords: Joi.array().items(
        Joi.number().integer().messages({
            'number.base': `"keywords" debe contener solo números`,
            'number.integer': `"keywords" debe contener solo enteros`
        })
    ).optional(),

    colors: Joi.array().items(
        Joi.number().integer().messages({
            'number.base': `"colors" debe contener solo números`,
            'number.integer': `"colors" debe contener solo enteros`
        })
    ).optional(),

    styles: Joi.array().items(
        Joi.number().integer().messages({
            'number.base': `"styles" debe contener solo números`,
            'number.integer': `"styles" debe contener solo enteros`
        })
    ).optional(),

    themes: Joi.array().items(
        Joi.number().integer().messages({
            'number.base': `"themes" debe contener solo números`,
            'number.integer': `"themes" debe contener solo enteros`
        })
    ).optional(),

    id_series: Joi.number()
        .integer()
        .positive()
        .allow(null)
        .optional()
        .messages({
            'number.base': `"id_series" debe ser un número`,
            'number.integer': `"id_series" debe ser un entero`,
            'number.positive': `"id_series" debe ser un número positivo`,
        }),

    id_category: Joi.number()
        .integer()
        .positive()
        .allow(null)
        .optional()
        .messages({
            'number.base': `"id_category" debe ser un número`,
            'number.integer': `"id_category" debe ser un entero`,
            'number.positive': `"id_category" debe ser un número positivo`,
        }),

    images: Joi.array().items(
        Joi.object({
            url: Joi.string()
                .uri()
                .required()
                .messages({
                    'string.uri': `"url" debe ser una URL válida`,
                    'any.required': `"url" es obligatorio para cada imagen`
                }),
            description: Joi.string()
                .allow('', null)
                .optional()
        })
    ).optional(),

}).messages({
    'object.base': 'El cuerpo de la solicitud debe ser un objeto JSON válido.'
});

module.exports = updateRelationsSchema;
