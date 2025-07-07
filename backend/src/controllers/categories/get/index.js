const { Categories } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const index = async (req, res) => {
    try {
        const categories = await Categories.findAll({
            attributes: ['id_category', 'name'], 
            order: [['name', 'ASC']], 
            raw: true, 
        });

        return responseHelper.successResponse(res, categories, "categories_index");

    } catch (error) {
        console.error("Error al obtener categorías:", error);

        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "categories_index",
            500
        );
    }
};

module.exports = index;
