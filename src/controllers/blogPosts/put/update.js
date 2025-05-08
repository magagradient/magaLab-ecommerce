const { BlogPosts } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const update = async (req, res) => {
    const { id } = req.params;
    const { title, content, author_id } = req.body;

    // Verificamos si se proporcionaron datos para la actualización
    if (!title && !content && !author_id) {
        return responseHelper.errorResponse(res, "missing_fields", "Debes proporcionar al menos un campo para actualizar.", "blogPosts_update", 400);
    }

    try {
        const post = await BlogPosts.findByPk(id);

        if (!post) {
            return responseHelper.errorResponse(res, "not_found", "Post no encontrado.", "blogPosts_update", 404);
        }

        // Actualizamos solo los campos que hayan sido enviados
        await post.update({
            title: title ?? post.title,
            content: content ?? post.content,
            author_id: author_id ?? post.author_id,
            updated_at: new Date(),
        });

        return responseHelper.successResponse(res, post, "blogPosts_update");

    } catch (error) {
        return responseHelper.errorResponse(res, "server_error", error.message, "blogPosts_update", 500);
    }
};

module.exports = update;
