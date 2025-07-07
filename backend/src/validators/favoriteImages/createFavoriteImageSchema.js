const Joi = require("joi");

const createFavoriteImageSchema = Joi.object({
    id_user: Joi.number().integer().positive().required().messages({
        "number.base": `"id_user" debe ser un número.`,
        "number.integer": `"id_user" debe ser un número entero.`,
        "number.positive": `"id_user" debe ser un número positivo.`,
        "any.required": `"id_user" es obligatorio.`,
    }),
    id_image: Joi.number().integer().positive().required().messages({
        "number.base": `"id_image" debe ser un número.`,
        "number.integer": `"id_image" debe ser un número entero.`,
        "number.positive": `"id_image" debe ser un número positivo.`,
        "any.required": `"id_image" es obligatorio.`,
    }),
});

module.exports = createFavoriteImageSchema;
