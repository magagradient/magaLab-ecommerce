const { Categories } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        if (!name || typeof name !== "string" || name.trim() === "") {
            return responseHelper.errorResponse(
                res,
                "invalid_data",
                "El campo 'name' es obligatorio y debe ser un string no vacío.",
                "categories_update",
                400
            );
        }

        const category = await Categories.findByPk(id);

        if (!category) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                `No se encontró una categoría con el ID ${id}.`,
                "categories_update",
                404
            );
        }

        // Verificamos si el nuevo nombre ya existe en otra categoría
        const existingCategory = await Categories.findOne({
            where: { name: name.trim() },
        });

        if (existingCategory && existingCategory.id_category !== category.id_category) {
            return responseHelper.errorResponse(
                res,
                "duplicate_category",
                `Ya existe otra categoría con el nombre '${name}'.`,
                "categories_update",
                409
            );
        }

        await category.update({ name: name.trim() });

        return responseHelper.successResponse(res, category, "categories_update");

    } catch (error) {
        console.error("Error al actualizar la categoría:", error);

        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "categories_update",
            500
        );
    }
};

module.exports = update;
