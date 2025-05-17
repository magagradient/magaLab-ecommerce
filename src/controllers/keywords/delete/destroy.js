const { Keywords } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const keyword = await Keywords.findByPk(id);
        if (!keyword) return responseHelper.errorResponse(res, "not_found", "Keyword no encontrada", "keywords_destroy", 404);

        await keyword.destroy();
        return responseHelper.successResponse(res, null, "keywords_destroy");
    } catch (error) {
        console.error("Error al eliminar keyword:", error);
        return responseHelper.errorResponse(res, "delete_error", error.message, "keywords_destroy", 400);
    }
};

module.exports = destroy;
