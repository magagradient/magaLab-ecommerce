const { BlogPosts } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const create = async (req, res) => {
    const { title, content, author_id } = req.body;

    // Validación básica
    if (!title || !content || !author_id) {
        return responseHelper.errorResponse(res, "missing_fields", "El título, contenido y autor_id son obligatorios.", "blogPosts_create", 400);
    }

    try {
        const newPost = await BlogPosts.create({
            title,
            content,
            author_id,
            created_at: new Date(),
            updated_at: new Date(),
        });

        return responseHelper.successResponse(res, newPost, "blogPosts_create");

    } catch (error) {
        return responseHelper.errorResponse(res, "server_error", error.message, "blogPosts_create", 500);
    }
};

module.exports = create;
