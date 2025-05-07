const { BlogPosts } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const byAuthor = async (req, res) => {
    const { authorId } = req.params;

    try {
        const blogPosts = await BlogPosts.findAll({
            where: { author_id: authorId },
            attributes: ["id_post", "title", "content", "author_id", "created_at", "updated_at"],
            raw: true,
        });

        if (blogPosts.length === 0) {
            return responseHelper.successResponse(res, [], "blogPosts_by_author");
        }

        return responseHelper.successResponse(res, blogPosts, "blogPosts_by_author");

    } catch (error) {
        return responseHelper.errorResponse(res, "server_error", error.message, "blogPosts_by_author", 500);
    }
};

module.exports = byAuthor;
