const Joi = require("joi");

const createBlogPostSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    content: Joi.string().min(10).required(),
    author_id: Joi.number().integer().positive().required()
});

module.exports = createBlogPostSchema;
