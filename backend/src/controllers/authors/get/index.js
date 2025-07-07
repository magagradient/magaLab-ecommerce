const { Authors } = require("../../../database/indexModels"); 
const responseHelper = require('../../../utils/responseHelper'); 

const index = async (req, res) => {
    const timestamp = new Date().toISOString(); 

    try {
        const authors = await Authors.findAll({
            attributes: ["author_id", "name", "bio", "avatar_url", "created_at", "updated_at"], 
            order: [["created_at", "DESC"]], 
            raw: true, 
        });

        return responseHelper.successResponse(res, authors, "authors_index");

    } catch (error) {
        console.error("Error al obtener autores:", error);

        return responseHelper.errorResponse(res, "server_error", error.message, "authors_index", 500);
    }
};

module.exports = index;
