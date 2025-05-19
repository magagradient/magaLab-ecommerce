const { Products, Keywords, Styles, Colors, Themes, Series, ProductImages, Categories } = require("../../../database/indexModels");
const responseHelper = require("../../../utils/responseHelper");

const getRelations = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Products.findByPk(id, {
            include: [
                { model: Keywords, as: "keywords" },
                { model: Styles, as: "styles" },
                { model: Colors, as: "colors" },
                { model: Themes, as: "themes" },
                { model: Series, as: "series" },
                { model: ProductImages, as: "images" },
                { model: Categories, as: "category" }
            ]
        });

        if (!product) {
            return responseHelper.errorResponse(
                res,
                "not_found",
                "Producto no encontrado.",
                "products_getRelations",
                404
            );
        }

        const relations = {
            id: product.id_product,
            title: product.title || product.titulo || null,
            keywords: product.keywords,
            styles: product.styles,
            colors: product.colors,
            themes: product.themes,
            series: product.series,
            images: product.images,
            category: product.category
        };

        return responseHelper.successResponse(res, relations, "products_getRelations");

    } catch (error) {
        console.error("🔴 Error al obtener relaciones del producto:", error);
        return responseHelper.errorResponse(
            res,
            "server_error",
            "Error al obtener relaciones del producto.",
            "products_getRelations",
            500
        );
    }
};

module.exports = getRelations;
