const { Categories } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    const { name } = req.body;

    try {
        if (!name || typeof name !== "string" || name.trim() === "") {
            return responseHelper.errorResponse(
                res,
                "invalid_data",
                "El campo 'name' es obligatorio y debe ser un string no vacío.",
                "categories_create",
                400
            );
        }

        const [category, created] = await Categories.findOrCreate({
            where: { name: name.trim() },
            defaults: { name: name.trim() },
        });

        if (!created) {
            return responseHelper.errorResponse(
                res,
                "duplicate_category",
                `Ya existe una categoría con el nombre '${name}'.`,
                "categories_create",
                409
            );
        }

        return responseHelper.successResponse(res, category, "categories_create");

    } catch (error) {
        console.error("Error al crear la categoría:", error);

        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "categories_create",
            500
        );
    }
};

module.exports = create;
