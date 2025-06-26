const Joi = require("joi");

const createShoppingCartSchema = Joi.object({
    id_user: Joi.number().integer().positive().required().messages({
        "any.required": "'id_user' es obligatorio.",
        "number.base": "'id_user' debe ser un número.",
        "number.integer": "'id_user' debe ser un número entero.",
        "number.positive": "'id_user' debe ser un número positivo."
    })
});

module.exports = createShoppingCartSchema;
