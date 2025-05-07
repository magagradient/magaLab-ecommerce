const { BlogPosts } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await BlogPosts.findByPk(id);

        if (!post) {
            return responseHelper.errorResponse(res, "not_found", "Post no encontrado.", "blogPosts_destroy", 404);
        }

        await post.destroy();

        return responseHelper.successResponse(res, post, "blogPosts_destroy");

    } catch (error) {
        return responseHelper.errorResponse(res, "server_error", error.message, "blogPosts_destroy", 500);
    }
};

module.exports = destroy;
