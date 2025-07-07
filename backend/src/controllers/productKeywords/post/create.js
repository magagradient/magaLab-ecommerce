const { ProductKeywords, Products, Keywords } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const create = async (req, res) => {
    const { id_product, id_keyword } = req.body;

    try {
        // verificar si el producto existe
        const product = await Products.findByPk(id_product);
        if (!product) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                "El producto no existe.",
                "product_keywords_create",
                404
            );
        }

        // verificar si la keyword existe
        const keyword = await Keywords.findByPk(id_keyword);
        if (!keyword) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                "La keyword no existe.",
                "product_keywords_create",
                404
            );
        }

        // verificar si ya existe la relación
        const exists = await ProductKeywords.findOne({
            where: { id_product, id_keyword }
        });

        if (exists) {
            return responseHelper.errorResponse(
                res,
                "duplicate_error",
                "La keyword ya está asignada a este producto.",
                "product_keywords_create",
                409
            );
        }

        // Crear la relación
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
