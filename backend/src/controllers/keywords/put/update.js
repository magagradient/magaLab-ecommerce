const { Keywords } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const keyword = await Keywords.findByPk(id);
        if (!keyword) return responseHelper.errorResponse(res, "not_found", "Keyword no encontrada", "keywords_update", 404);

        await keyword.update({ name });
        return responseHelper.successResponse(res, keyword, "keywords_update");
    } catch (error) {
        console.error("Error al actualizar keyword:", error);
        return responseHelper.errorResponse(res, "update_error", error.message, "keywords_update", 400);
    }
};

module.exports = update;
