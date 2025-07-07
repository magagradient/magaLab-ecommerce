const Joi = require("joi");

const deleteByUserAndImageParamsSchema = Joi.object({
    id_user: Joi.number().integer().positive().required().messages({
        "number.base": `'user_id' debe ser un número`,
        "number.integer": `'user_id' debe ser un número entero`,
        "number.positive": `'user_id' debe ser un número positivo`,
        "any.required": `'user_id' es obligatorio`
    }),
    id_image: Joi.number().integer().positive().required().messages({
        "number.base": `'image_id' debe ser un número`,
        "number.integer": `'image_id' debe ser un número entero`,
        "number.positive": `'image_id' debe ser un número positivo`,
        "any.required": `'image_id' es obligatorio`
    })
});

module.exports = deleteByUserAndImageParamsSchema;