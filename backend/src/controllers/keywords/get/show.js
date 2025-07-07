const { Keywords } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const show = async (req, res) => {
    const { id } = req.params;

    try {
        const keyword = await Keywords.findByPk(id);
        if (!keyword) return responseHelper.errorResponse(res, "not_found", "Keyword no encontrada", "keywords_show", 404);

        return responseHelper.successResponse(res, keyword, "keywords_show");
    } catch (error) {
        console.error("Error al buscar keyword:", error);
        return responseHelper.errorResponse(res, "server_error", error.message, "keywords_show", 500);
    }
};

module.exports = show;
