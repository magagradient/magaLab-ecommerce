const { BlogPosts } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');

const index = async (req, res) => {
    try {
        const blogPosts = await BlogPosts.findAll({
            attributes: ["id_post", "title", "content", "author_id", "created_at", "updated_at"],
            raw: true,
        });

        if (blogPosts.length === 0) {
            return responseHelper.successResponse(res, [], "blogPosts_index");
        }

        return responseHelper.successResponse(res, blogPosts, "blogPosts_index");

    } catch (error) {
        return responseHelper.errorResponse(res, "server_error", error.message, "blogPosts_index", 500);
    }
};

module.exports = index;
