const { Categories, Products } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const productsByCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Categories.findByPk(id, {
            include: {
                model: Products,
                as: "products",
                attributes: ["id_product", "title", "price", "stock", "description"],
            }
        });

        if (!category) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                `No se encontró una categoría con el ID ${id}.`,
                "categories_products",
                404
            );
        }

        if (category.products.length === 0) {
            return responseHelper.successResponse(
                res,
                [],
                "categories_products_empty"
            );
        }

        return responseHelper.successResponse(
            res,
            category.products,
            "categories_products"
        );

    } catch (error) {
        console.error("Error al obtener productos de la categoría:", error);

        return responseHelper.errorResponse(
            res,
            "server_error",
            error.message,
            "categories_products",
            500
        );
    }
};

module.exports = productsByCategory;
