const { Categories } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const show = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Categories.findByPk(id, {
            raw: true,
        });

        if (!category) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                `No se encontró una categoría con el ID ${id}.`,
                "categories_show",
                404
            );
        }

        return responseHelper.successResponse(res, category, "categories_show");

    } catch (error) {
        console.error("Error al obtener la categoría:", error);

        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "categories_show",
            500
        );
    }
};

module.exports = show;
