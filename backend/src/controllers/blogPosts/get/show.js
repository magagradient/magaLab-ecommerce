const { BlogPosts } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const show = async (req, res) => {
    const { id } = req.params;

    try {
        const blogPost = await BlogPosts.findByPk(id, {
            attributes: ["id_post", "title", "content", "author_id", "created_at", "updated_at"],
            raw: true,
        });

        if (!blogPost) {
            return responseHelper.errorResponse(res, "post_not_found", "Post no encontrado.", "blogPosts_show", 404);
        }

        return responseHelper.successResponse(res, blogPost, "blogPosts_show");

    } catch (error) {
        return responseHelper.errorResponse(res, "server_error", error.message, "blogPosts_show", 500);
    }
};

module.exports = show;
