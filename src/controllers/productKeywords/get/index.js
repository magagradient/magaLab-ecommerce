const { ProductKeywords } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        const result = await ProductKeywords.findAll();
        return responseHelper.successResponse(res, result, "product_keywords_index");
    } catch (error) {
        console.error("Error al obtener relaciones:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "product_keywords_index", 500);
    }
};

module.exports = index;
