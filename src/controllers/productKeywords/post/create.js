const { ProductKeywords } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    const { id_product, id_keyword } = req.body;

    try {
        const exists = await ProductKeywords.findOne({
            where: { id_product, id_keyword }
        });

        if (exists) {
            return responseHelper.errorResponse(
                res,
                "duplicate_error",
                "La keyword ya está asignada a este producto.",
                "product_keywords_create",
                409 // Conflict
            );
        }

        const result = await ProductKeywords.create({ id_product, id_keyword });

        return responseHelper.successResponse(res, result, "product_keywords_create", 201);
    } catch (error) {
        console.error("Error al asignar keyword:", error);
        return responseHelper.errorResponse(
            res,
            "create_error",
            error.message,
            "product_keywords_create",
            400
        );
    }
};

module.exports = create;
