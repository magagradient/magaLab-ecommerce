const Joi = require('joi');

const assignRelationSchema = Joi.object({
    ids: Joi.array()
        .items(Joi.number().integer().positive().messages({
            'number.base': `"ids" debe contener solo números`,
            'number.integer': `"ids" debe contener solo enteros positivos`
        }))
        .min(1)
        .required()
        .messages({
            'array.base': `"ids" debe ser un array`,
            'array.min': `"ids" debe tener al menos un elemento`,
            'any.required': `"ids" es obligatorio`
        })
});

// Schema que ya tenés para actualizar varias relaciones en body
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
    ).optional()
}).messages({
    'object.base': 'El cuerpo de la solicitud debe ser un objeto JSON válido.'
});

// **Nuevo schema para validar los params de la ruta assignRelation**
const assignRelationParamsSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'number.base': '"idProduct" debe ser un número',
        'number.integer': '"idProduct" debe ser un entero',
        'number.positive': '"idProduct" debe ser un número positivo',
        'any.required': '"idProduct" es obligatorio'
    }),
    relationType: Joi.string().valid('keywords', 'colors', 'styles', 'themes').required().messages({
        'string.base': '"relationType" debe ser una cadena de texto',
        'any.only': '"relationType" debe ser uno de [keywords, colors, styles, themes]',
        'any.required': '"relationType" es obligatorio'
    })
});

module.exports = {
    assignRelationSchema,
    updateRelationsSchema,
    assignRelationParamsSchema
};
