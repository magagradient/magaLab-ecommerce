const Joi = require("joi");

const updateAuthorSchema = Joi.object({
    name: Joi.string().max(100),
    bio: Joi.string().allow(null, "").max(1000),
    avatar_url: Joi.string().uri().allow(null, "")
}).min(1); // mínimo un campo obligatorio para evitar PUT vacío

module.exports = updateAuthorSchema;
