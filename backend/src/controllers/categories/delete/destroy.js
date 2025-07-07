const { Categories } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Categories.findByPk(id);

        if (!category) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                `No se encontró una categoría con el ID ${id}.`,
                "categories_delete",
                404
            );
        }

        await category.destroy();

        return responseHelper.successResponse(res, {}, "categories_delete");

    } catch (error) {
        console.error("Error al eliminar la categoría:", error);

        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "categories_delete",
            500
        );
    }
};

module.exports = destroy;
