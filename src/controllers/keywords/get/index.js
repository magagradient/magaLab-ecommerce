const { Keywords } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        const keywords = await Keywords.findAll({ order: [["name", "ASC"]] });
        return responseHelper.successResponse(res, keywords, "keywords_index");
    } catch (error) {
        console.error("Error al obtener keywords:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "keywords_index", 500);
    }
};

module.exports = index;
