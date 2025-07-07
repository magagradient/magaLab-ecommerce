const { Keywords } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    const { name } = req.body;

    try {
        const keyword = await Keywords.create({ name });
        return responseHelper.successResponse(res, keyword, "keywords_create", 201);
    } catch (error) {
        console.error("Error al crear keyword:", error);
        return responseHelper.errorResponse(res, "create_error", error.message, "keywords_create", 400);
    }
};

module.exports = create;
