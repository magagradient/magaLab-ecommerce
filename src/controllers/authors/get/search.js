const { Authors } = require("../../../database/indexModels"); 
const responseHelper = require('../../../utils/responseHelper'); 

const search = async (req, res) => {
    const { query } = req.query; 
    const timestamp = new Date().toISOString(); 

    if (!query) {
        return responseHelper.errorResponse(res, "missing_query", "Se debe proporcionar un término de búsqueda.", "authors_search", 400);
    }

    try {
        const authors = await Authors.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { bio: { [Op.iLike]: `%${query}%` } }   
                ]
            },
            attributes: ["author_id", "name", "bio", "avatar_url", "created_at", "updated_at"], 
            raw: true, 
        });

        if (authors.length === 0) {
            return responseHelper.successResponse(res, [], "authors_search");
        }

        return responseHelper.successResponse(res, authors, "authors_search");

    } catch (error) {
        console.error("Error al buscar autores:", error);

        return responseHelper.errorResponse(res, "server_error", error.message, "authors_search", 500);
    }
};

module.exports = search;
