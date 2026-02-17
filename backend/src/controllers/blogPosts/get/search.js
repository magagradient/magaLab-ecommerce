const { BlogPosts } = require("../../../database/indexModels");
const responseHelper = require('../../../utils/responseHelper');
const { Op } = require("sequelize");

const search = async (req, res) => {
    const { query } = req.query; 

    if (!query) {
        return responseHelper.errorResponse(res, "query_missing", "Se debe proporcionar un término de búsqueda.", "blogPosts_search", 400);
    }

    try {
        const blogPosts = await BlogPosts.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${query}%` } },
                    { content: { [Op.like]: `%${query}%` } }
                ]
            },
            attributes: ["id_post", "title", "content", "author_id", "created_at", "updated_at"],
            raw: true,
        });

        if (blogPosts.length === 0) {
            return responseHelper.successResponse(res, [], "blogPosts_search");
        }

        return responseHelper.successResponse(res, blogPosts, "blogPosts_search");

    } catch (error) {
        return responseHelper.errorResponse(res, "server_error", error.message, "blogPosts_search", 500);
    }
};

module.exports = search;
