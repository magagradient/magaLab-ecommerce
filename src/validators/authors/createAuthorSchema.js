const Joi = require("joi");

const createAuthorSchema = Joi.object({
    name: Joi.string().max(100).required(),
    bio: Joi.string().allow(null, "").max(1000),
    avatar_url: Joi.string().uri().allow(null, "")
});

module.exports = createAuthorSchema;
