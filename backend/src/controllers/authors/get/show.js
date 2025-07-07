const { Authors } = require("../../../database/indexModels"); 
const responseHelper = require('../../../utils/responseHelper');

const show = async (req, res) => {
    const { id } = req.params; 
    const timestamp = new Date().toISOString(); 
    try {
        const author = await Authors.findOne({
            where: { author_id: id }, 
            attributes: ["author_id", "name", "bio", "avatar_url", "created_at", "updated_at"], 
            raw: true, 
        });

        if (!author) {
            return responseHelper.errorResponse(res, "author_not_found", "El autor no fue encontrado.", "authors_show", 404);
        }

        return responseHelper.successResponse(res, author, "authors_show");

    } catch (error) {
        console.error("Error al obtener el autor:", error);

        return responseHelper.errorResponse(res, "server_error", error.message, "authors_show", 500);
    }
};

module.exports = show;
